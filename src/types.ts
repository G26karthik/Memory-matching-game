export interface Card {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
  techName: string;
}

export type GameLevel = 'easy' | 'medium' | 'hard';

export interface GameState {
  cards: Card[];
  flippedCards: number[];
  score: number;
  moves: number;
  gameStarted: boolean;
  gameCompleted: boolean;
  level: GameLevel;
  startTime: number | null;
  endTime: number | null;
}
