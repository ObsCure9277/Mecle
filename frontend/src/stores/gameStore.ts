import { create } from 'zustand';

export type LetterState = 'correct' | 'present' | 'absent' | 'empty';

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

   // Actions
   addLetter: (letter: string) => void;
   deleteLetter: () => void;
   submitGuess: () => Promise<void>;
   fetchDailyWord: () => Promise<void>;
   setCameraMode: (mode: 'orbit' | 'gameplay') => void;
   resetGame: () => Promise<void>;
}

const BACKEND_URL = 'http://localhost:8000';

// Initialize empty grid (6 rows × 5 columns)
const initializeGrid = (): TileData[][] => {
   return Array(6).fill(null).map(() =>
      Array(5).fill(null).map(() => ({ letter: '', state: 'empty' as LetterState }))
   );
};

export const useGameStore = create<GameState>((set, get) => ({
   targetWord: '',
   guesses: initializeGrid(),
   currentRow: 0,
   currentCol: 0,
   gameStatus: 'playing',
   cameraMode: 'orbit',

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

         set({
            guesses: newGuesses,
            currentRow: isWin || isLastRow ? currentRow : currentRow + 1,
            currentCol: 0,
            gameStatus: newStatus
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

         set({
            guesses: newGuesses,
            currentRow: isWin || isLastRow ? currentRow : currentRow + 1,
            currentCol: 0,
            gameStatus: newStatus
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
               cameraMode: 'gameplay'
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
            cameraMode: 'gameplay'
         });
      }
   }
}));
