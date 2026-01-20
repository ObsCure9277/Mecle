import { create } from 'zustand';

export type LetterState = 'correct' | 'present' | 'absent' | 'empty';
export type GameMode = 'daily' | 'hourly' | 'infinite';

export interface TileData {
   letter: string;
   state: LetterState;
}

export interface GameState {
   // Game data
   targetWord: string;
   guesses: TileData[][];
   currentRow: number;
   currentCol: number;
   gameStatus: 'playing' | 'won' | 'lost';
   cameraMode: 'orbit' | 'gameplay';
   gameMode: GameMode;
   gameCompletedAt: number | null; // Timestamp when game was completed
   cardFlipped: boolean; // Controls whether the FlipCard shows status side

   // Actions
   addLetter: (letter: string) => void;
   deleteLetter: () => void;
   submitGuess: () => Promise<void>;
   fetchDailyWord: () => Promise<void>;
   setCameraMode: (mode: 'orbit' | 'gameplay') => void;
   setGameMode: (mode: GameMode) => void;
   flipCard: (flipped: boolean) => void;
   resetGame: () => Promise<void>;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

// Initialize empty grid (6 rows × 5 columns)
const initializeGrid = (): TileData[][] => {
   return Array(6).fill(null).map(() =>
      Array(5).fill(null).map(() => ({ letter: '', state: 'empty' as LetterState }))
   );
};

// Update game statistics
const updateStats = (won: boolean, guessCount: number) => {
   const statsKey = 'mechacrypt-stats';
   const savedStats = localStorage.getItem(statsKey);

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

      // Update guess distribution (guessCount is 1-6, array index is 0-5)
      if (guessCount >= 1 && guessCount <= 6) {
         stats.guessDistribution[guessCount - 1] += 1;
      }
   } else {
      stats.currentStreak = 0;
   }

   localStorage.setItem(statsKey, JSON.stringify(stats));
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
   cardFlipped: true, // Start with card flipped to show status on game over

   addLetter: (letter: string) => {
      const { currentRow, currentCol, guesses, gameStatus } = get();

      // Prevent input if game is over or row is full
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

      // Prevent deletion if game is over or row is empty
      if (gameStatus !== 'playing' || currentCol === 0) return;

      const newGuesses = [...guesses];
      newGuesses[currentRow][currentCol - 1] = {
         letter: '',
         state: 'empty'
      };

      set({ guesses: newGuesses, currentCol: currentCol - 1 });
   },

   submitGuess: async () => {
      const { currentRow, currentCol, guesses, targetWord } = get();

      // Must have 5 letters to submit
      if (currentCol !== 5) return;

      const currentGuess = guesses[currentRow].map(tile => tile.letter).join('');

      try {
         // Call backend to validate guess
         const response = await fetch(`${BACKEND_URL}/validate`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               guess: currentGuess,
               target: targetWord
            }),
         });

         if (!response.ok) {
            throw new Error('Validation failed');
         }

         const data = await response.json();
         const states: LetterState[] = data.states;

         // Update tile states based on validation
         const newGuesses = [...guesses];
         newGuesses[currentRow] = newGuesses[currentRow].map((tile, idx) => ({
            ...tile,
            state: states[idx]
         }));

         // Check win condition
         const isWin = states.every(state => state === 'correct');
         const isLastRow = currentRow === 5;

         const newStatus = isWin ? 'won' : (isLastRow ? 'lost' : 'playing');

         // Update game statistics when game ends
         if (newStatus !== 'playing') {
            updateStats(isWin, currentRow + 1);
         }

         set({
            guesses: newGuesses,
            currentRow: isWin || isLastRow ? currentRow : currentRow + 1,
            currentCol: 0,
            gameStatus: newStatus,
            gameCompletedAt: newStatus !== 'playing' ? Date.now() : null,
            cardFlipped: newStatus !== 'playing' ? true : false
         });

      } catch (error) {
         console.error('Failed to validate guess:', error);
         // For development: Simple client-side validation
         const newGuesses = [...guesses];
         newGuesses[currentRow] = newGuesses[currentRow].map((tile, idx) => {
            const letter = tile.letter;
            const targetLetter = targetWord[idx];

            if (letter === targetLetter) {
               return { ...tile, state: 'correct' as LetterState };
            } else if (targetWord.includes(letter)) {
               return { ...tile, state: 'present' as LetterState };
            } else {
               return { ...tile, state: 'absent' as LetterState };
            }
         });

         const isWin = newGuesses[currentRow].every(tile => tile.state === 'correct');
         const isLastRow = currentRow === 5;
         const newStatus = isWin ? 'won' : (isLastRow ? 'lost' : 'playing');

         // Update game statistics when game ends
         if (newStatus !== 'playing') {
            updateStats(isWin, currentRow + 1);
         }

         set({
            guesses: newGuesses,
            currentRow: isWin || isLastRow ? currentRow : currentRow + 1,
            currentCol: 0,
            gameStatus: newStatus,
            gameCompletedAt: newStatus !== 'playing' ? Date.now() : null,
            cardFlipped: newStatus !== 'playing' ? true : false
         });
      }
   },

   fetchDailyWord: async () => {
      try {
         // Use random-word endpoint for a new word each game
         const response = await fetch(`${BACKEND_URL}/random-word`);

         if (!response.ok) {
            throw new Error('Failed to fetch word');
         }

         const data = await response.json();
         set({ targetWord: data.word });

      } catch (error) {
         console.error('Failed to fetch word:', error);
         // Fallback word for development
         set({ targetWord: 'CRYPT' });
      }
   },

   setCameraMode: (mode: 'orbit' | 'gameplay') => {
      set({ cameraMode: mode });
   },

   setGameMode: (mode: GameMode) => {
      set({ gameMode: mode });
   },

   flipCard: (flipped: boolean) => {
      set({ cardFlipped: flipped });
   },

   resetGame: async () => {
      // Fetch a new random word when resetting
      try {
         const response = await fetch(`${BACKEND_URL}/random-word`);
         if (response.ok) {
            const data = await response.json();
            set({
               targetWord: data.word,
               guesses: initializeGrid(),
               currentRow: 0,
               currentCol: 0,
               gameStatus: 'playing',
               cameraMode: 'gameplay',
               gameCompletedAt: null,
               cardFlipped: true
            });
         } else {
            throw new Error('Failed to fetch new word');
         }
      } catch (error) {
         console.error('Failed to fetch new word:', error);
         // Reset with current word as fallback
         set({
            guesses: initializeGrid(),
            currentRow: 0,
            currentCol: 0,
            gameStatus: 'playing',
            cameraMode: 'gameplay',
            gameCompletedAt: null,
            cardFlipped: true
         });
      }
   }
}));
