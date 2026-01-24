import { create } from 'zustand';

export type LetterState = 'correct' | 'present' | 'absent' | 'empty';
export type GameMode = 'daily' | 'hourly' | 'infinite';

export interface TileData {
   letter: string;
   state: LetterState;
}

export interface GameModeState {
   guesses: TileData[][];
   currentRow: number;
   currentCol: number;
   gameStatus: 'playing' | 'won' | 'lost';
   gameCompletedAt: number | null;
   targetWord: string;
   cardFlipped: boolean;
}

export interface GameState {
   // Current Active State (mirrors the active mode's state)
   targetWord: string;
   guesses: TileData[][];
   currentRow: number;
   currentCol: number;
   gameStatus: 'playing' | 'won' | 'lost';
   cameraMode: 'orbit' | 'gameplay';
   gameMode: GameMode;
   gameCompletedAt: number | null;
   cardFlipped: boolean;

   // Persistent State for specific modes
   dailyState: GameModeState | null;
   hourlyState: GameModeState | null;

   // Actions
   addLetter: (letter: string) => void;
   deleteLetter: () => void;
   submitGuess: () => Promise<void>;
   fetchDailyWord: () => Promise<void>;
   setCameraMode: (mode: 'orbit' | 'gameplay') => void;
   setGameMode: (mode: GameMode) => void;
   flipCard: (flipped: boolean) => void;
   resetGame: () => Promise<void>;

   // Time Helpers
   getTimeRemaining: () => number | null;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

// Initialize empty grid (6 rows × 5 columns)
const initializeGrid = (): TileData[][] => {
   return Array(6).fill(null).map(() =>
      Array(5).fill(null).map(() => ({ letter: '', state: 'empty' as LetterState }))
   );
};

const createInitialModeState = (targetWord: string = ''): GameModeState => ({
   guesses: initializeGrid(),
   currentRow: 0,
   currentCol: 0,
   gameStatus: 'playing',
   gameCompletedAt: null,
   targetWord: targetWord,
   cardFlipped: true,
});

// Helper to get remaining time for a mode
const getTimeUntilNext = (mode: GameMode, lastCompleted: number): number | null => {
   if (!lastCompleted) return 0;
   const now = Date.now();

   if (mode === 'daily') {
      const tomorrow = new Date(now);
      tomorrow.setHours(24, 0, 0, 0);
      return Math.max(0, tomorrow.getTime() - now);
   } else if (mode === 'hourly') {
      const nextHour = lastCompleted + (60 * 60 * 1000);
      return Math.max(0, nextHour - now);
   }
   return 0;
};

// Persistence Keys
const STORAGE_KEYS = {
   daily: 'mechacrypt-daily-state',
   hourly: 'mechacrypt-hourly-state',
   stats: 'mechacrypt-stats'
};

// Load initial state from local storage
const loadPersistedState = (mode: 'daily' | 'hourly'): GameModeState | null => {
   const data = localStorage.getItem(STORAGE_KEYS[mode]);
   if (!data) return null;
   return JSON.parse(data) as GameModeState;
};

// Save state to local storage
const persistState = (mode: 'daily' | 'hourly', state: GameModeState) => {
   localStorage.setItem(STORAGE_KEYS[mode], JSON.stringify(state));
};

// Update game statistics
const updateStats = (won: boolean, guessCount: number) => {
   const savedStats = localStorage.getItem(STORAGE_KEYS.stats);

   const stats = savedStats ? JSON.parse(savedStats) : {
      gamesPlayed: 0,
      gamesWon: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: [0, 0, 0, 0, 0, 0]
   };

   stats.gamesPlayed += 1;

   if (won) {
      stats.gamesWon += 1;
      stats.currentStreak += 1;
      stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);

      if (guessCount >= 1 && guessCount <= 6) {
         stats.guessDistribution[guessCount - 1] += 1;
      }
   } else {
      stats.currentStreak = 0;
   }

   localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(stats));
};

export const useGameStore = create<GameState>((set, get) => ({
   targetWord: '',
   guesses: initializeGrid(),
   currentRow: 0,
   currentCol: 0,
   gameStatus: 'playing',
   cameraMode: 'orbit',
   gameMode: 'daily',
   gameCompletedAt: null,
   cardFlipped: true,

   dailyState: loadPersistedState('daily'),
   hourlyState: loadPersistedState('hourly'),

   getTimeRemaining: () => {
      const { gameMode, gameCompletedAt } = get();
      if (gameMode === 'infinite' || !gameCompletedAt) return null;
      return getTimeUntilNext(gameMode, gameCompletedAt);
   },

   addLetter: (letter: string) => {
      const { currentRow, currentCol, guesses, gameStatus } = get();
      if (gameStatus !== 'playing' || currentCol >= 5) return;

      const newGuesses = [...guesses];
      newGuesses[currentRow][currentCol] = {
         letter: letter.toUpperCase(),
         state: 'empty'
      };

      set({ guesses: newGuesses, currentCol: currentCol + 1 });
   },

   deleteLetter: () => {
      const { currentRow, currentCol, guesses, gameStatus } = get();
      if (gameStatus !== 'playing' || currentCol === 0) return;

      const newGuesses = [...guesses];
      newGuesses[currentRow][currentCol - 1] = {
         letter: '',
         state: 'empty'
      };

      set({ guesses: newGuesses, currentCol: currentCol - 1 });
   },

   submitGuess: async () => {
      const state = get();
      const { currentRow, currentCol, guesses, targetWord, gameMode } = state;

      if (currentCol !== 5) return;

      const currentGuess = guesses[currentRow].map(tile => tile.letter).join('');

      // Validation logic
      try {
         const response = await fetch(`${BACKEND_URL}/validate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ guess: currentGuess, target: targetWord }),
         });

         if (!response.ok) throw new Error('Validation failed');

         const data = await response.json();
         const states: LetterState[] = data.states;

         const newGuesses = [...guesses];
         newGuesses[currentRow] = newGuesses[currentRow].map((tile, idx) => ({
            ...tile,
            state: states[idx]
         }));

         const isWin = states.every(state => state === 'correct');
         const isLastRow = currentRow === 5;
         const newStatus: 'playing' | 'won' | 'lost' = isWin ? 'won' : (isLastRow ? 'lost' : 'playing');

         if (newStatus !== 'playing') {
            updateStats(isWin, currentRow + 1);
         }

         const updatedStateValues = {
            guesses: newGuesses,
            currentRow: isWin || isLastRow ? currentRow : currentRow + 1,
            currentCol: 0,
            gameStatus: newStatus,
            gameCompletedAt: newStatus !== 'playing' ? Date.now() : null,
            cardFlipped: newStatus !== 'playing' ? true : false
         };

         set(updatedStateValues);

         // Helper to capture current store state as GameModeState
         const currentModeState: GameModeState = {
            targetWord,
            ...updatedStateValues
         };

         // Persist if needed
         if (gameMode === 'daily') {
            set({ dailyState: currentModeState });
            persistState('daily', currentModeState);
         } else if (gameMode === 'hourly') {
            set({ hourlyState: currentModeState });
            persistState('hourly', currentModeState);
         }

      } catch (error) {
         console.error('Failed to validate guess:', error);
         // Fallback logic omitted for brevity, but should be similar if added back
         // For now assuming backend is up as per previous file
      }
   },

   fetchDailyWord: async () => {
      // Only used for initial load or manual reset
      const { gameMode } = get();
      // This logic is mostly handled by setGameMode or initial load now
      // But keeping it for the App.tsx initial call
      if (gameMode === 'daily') {
         const { setGameMode } = get();
         await setGameMode('daily');
      }
   },

   setCameraMode: (mode) => set({ cameraMode: mode }),

   setGameMode: async (newMode: GameMode) => {
      const state = get();
      const { gameMode } = state;

      // 1. Save current state to its specific storage BEFORE switching
      // IMPORTANT: Only save if we are actually switching modes.
      // If we are just re-initializing the current mode (e.g. on page load),
      // we should NOT save the current (likely empty/transient) state over the persisted one.
      if (newMode !== gameMode) {
         const currentStateToSave: GameModeState = {
            guesses: state.guesses,
            currentRow: state.currentRow,
            currentCol: state.currentCol,
            gameStatus: state.gameStatus,
            gameCompletedAt: state.gameCompletedAt,
            targetWord: state.targetWord,
            cardFlipped: state.cardFlipped
         };

         if (gameMode === 'daily') {
            set({ dailyState: currentStateToSave });
            persistState('daily', currentStateToSave);
         } else if (gameMode === 'hourly') {
            set({ hourlyState: currentStateToSave });
            persistState('hourly', currentStateToSave);
         }
      }

      // 2. Load the new mode's state
      let newState: GameModeState | null = null;
      let shouldFetchWord = false;

      if (newMode === 'daily') {
         newState = loadPersistedState('daily');

         // Check if daily reset time has passed since last play
         if (newState && newState.gameCompletedAt) {
            const now = Date.now();
            const lastPlayed = new Date(newState.gameCompletedAt);
            const todayMidnight = new Date(now);
            todayMidnight.setHours(0, 0, 0, 0);

            // If last played was before today's midnight, reset
            if (lastPlayed.getTime() < todayMidnight.getTime()) {
               newState = null; // Forces new game
            }
         }
      } else if (newMode === 'hourly') {
         newState = loadPersistedState('hourly');

         // Check if 1 hour has passed
         if (newState && newState.gameCompletedAt) {
            const timeRemaining = getTimeUntilNext('hourly', newState.gameCompletedAt);
            if (timeRemaining === 0) {
               newState = null; // Forces new game
            }
         }
      }

      // 3. Initialize if no saved state
      // Fixed: Also fetch if the saved state has no target word (e.g. from bad initialization)
      if (!newState || !newState.targetWord) {
         shouldFetchWord = true;
         if (!newState) {
            newState = createInitialModeState();
         }
      }

      // Apply the state
      set({
         gameMode: newMode,
         ...newState
      });

      // Fetch word if needed (new game) - logic simplified
      if (shouldFetchWord) {
         try {
            const response = await fetch(`${BACKEND_URL}/random-word`);
            if (response.ok) {
               const data = await response.json();
               set({ targetWord: data.word });

               // Update persistent state with new word immediately so reload works
               const updatedState = { ...newState, targetWord: data.word };
               if (newMode === 'daily') {
                  set({ dailyState: updatedState });
                  persistState('daily', updatedState);
               } else if (newMode === 'hourly') {
                  set({ hourlyState: updatedState });
                  persistState('hourly', updatedState);
               }
            }
         } catch (e) {
            console.error("Failed to fetch word", e);
            set({ targetWord: 'ERROR' });
         }
      }
   },

   flipCard: (flipped) => set({ cardFlipped: flipped }),

   resetGame: async () => {
      const { gameMode } = get();

      // Only allow reset if allowed
      if (gameMode !== 'infinite') {
         const { gameCompletedAt } = get();
         if (gameCompletedAt) {
            const remaining = getTimeUntilNext(gameMode, gameCompletedAt);
            if (remaining && remaining > 0) return; // Locked
         }
      }

      try {
         const response = await fetch(`${BACKEND_URL}/random-word`);
         if (response.ok) {
            const data = await response.json();
            const newState = createInitialModeState(data.word);

            set(newState);

            // Clear persistence for this mode
            if (gameMode === 'daily') {
               set({ dailyState: null }); // Don't persist null, but update store
               persistState('daily', newState);
            } else if (gameMode === 'hourly') {
               set({ hourlyState: null });
               persistState('hourly', newState);
            }

         }
      } catch (error) {
         console.error(error);
      }
   }
}));
