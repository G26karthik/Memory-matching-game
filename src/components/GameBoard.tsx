import React, { useState, useEffect } from 'react';
import { GameLevel, GameState } from '../types';
import { getLevelCards } from '../data/techCards';
import '../styles/GameBoard.css';

const GameBoard: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flippedCards: [],
    score: 0,
    moves: 0,
    gameStarted: false,
    gameCompleted: false,
    level: 'easy',
    startTime: null,
    endTime: null,
  });

  const [showLevelSelect, setShowLevelSelect] = useState<boolean>(true);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  useEffect(() => {
    // Check if all cards are matched
    if (gameState.gameStarted && !gameState.gameCompleted && gameState.cards.length > 0) {
      const allMatched = gameState.cards.every(card => card.isMatched);
      if (allMatched) {
        const endTime = Date.now();
        setGameState(prev => ({
          ...prev,
          gameCompleted: true,
          endTime,
        }));
      }
    }
  }, [gameState.cards, gameState.gameStarted, gameState.gameCompleted]);

  const startGame = (level: GameLevel) => {
    const cards = getLevelCards(level);
    setGameState({
      cards,
      flippedCards: [],
      score: 0,
      moves: 0,
      gameStarted: true,
      gameCompleted: false,
      level,
      startTime: Date.now(),
      endTime: null,
    });
    setShowLevelSelect(false);
  };

  const handleCardClick = (id: number) => {
    // Ignore clicks if game is completed or card is already flipped/matched
    const card = gameState.cards.find(c => c.id === id);
    if (
      !gameState.gameStarted ||
      gameState.gameCompleted ||
      !card ||
      card.isFlipped ||
      card.isMatched ||
      gameState.flippedCards.length >= 2
    ) {
      return;
    }

    // Flip the card
    const updatedCards = gameState.cards.map(card =>
      card.id === id ? { ...card, isFlipped: true } : card
    );

    // Add card to flipped cards
    const flippedCards = [...gameState.flippedCards, id];

    // Update game state
    setGameState(prev => ({
      ...prev,
      cards: updatedCards,
      flippedCards,
    }));

    // If two cards are flipped, check for a match
    if (flippedCards.length === 2) {
      const firstCardId = flippedCards[0];
      const secondCardId = flippedCards[1];
      const firstCard = updatedCards.find(card => card.id === firstCardId);
      const secondCard = updatedCards.find(card => card.id === secondCardId);

      // Increment moves
      const moves = gameState.moves + 1;

      // Check if cards match
      if (firstCard && secondCard && firstCard.techName === secondCard.techName) {
        // Cards match
        setTimeout(() => {
          const matchedCards = updatedCards.map(card =>
            card.id === firstCardId || card.id === secondCardId
              ? { ...card, isMatched: true }
              : card
          );

          // Calculate score - more points for fewer moves
          const basePoints = 10;
          const levelMultiplier = gameState.level === 'easy' ? 1 : gameState.level === 'medium' ? 2 : 3;
          const score = gameState.score + basePoints * levelMultiplier;

          setGameState(prev => ({
            ...prev,
            cards: matchedCards,
            flippedCards: [],
            score,
            moves,
          }));
        }, 500);
      } else {
        // Cards don't match
        setTimeout(() => {
          const resetCards = updatedCards.map(card =>
            card.id === firstCardId || card.id === secondCardId
              ? { ...card, isFlipped: false }
              : card
          );

          setGameState(prev => ({
            ...prev,
            cards: resetCards,
            flippedCards: [],
            moves,
          }));
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setShowLevelSelect(true);
    setGameState(prev => ({
      ...prev,
      gameStarted: false,
      gameCompleted: false,
    }));
  };

  const getGridClass = () => {
    switch (gameState.level) {
      case 'easy':
        return 'grid-cols-4';
      case 'medium':
        return 'grid-cols-4 md:grid-cols-6';
      case 'hard':
        return 'grid-cols-4 md:grid-cols-6';
      default:
        return 'grid-cols-4';
    }
  };

  const formatTime = (milliseconds: number) => {
    if (!milliseconds) return '00:00';
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getElapsedTime = () => {
    if (!gameState.startTime) return 0;
    if (gameState.endTime) return gameState.endTime - gameState.startTime;
    return Date.now() - gameState.startTime;
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="game-container">
      {showLevelSelect ? (
        <div className="level-select">
          <h2 className="text-2xl font-bold mb-6">Tech Memory Match</h2>
          <p className="mb-4">Test your memory with this technology-themed matching game!</p>
          <button 
            className="instructions-button"
            onClick={toggleInstructions}
          >
            {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
          </button>
          
          {showInstructions && (
            <div className="instructions">
              <h3 className="text-xl font-bold mb-2">How to Play:</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>Click on cards to flip them over</li>
                <li>Find matching pairs of technology icons</li>
                <li>Match all pairs to complete the level</li>
                <li>Try to finish with the fewest moves and fastest time</li>
              </ul>
            </div>
          )}
          
          <div className="level-buttons">
            <button 
              className="level-button easy"
              onClick={() => startGame('easy')}
            >
              Easy (4x4)
            </button>
            <button 
              className="level-button medium"
              onClick={() => startGame('medium')}
            >
              Medium (6x4)
            </button>
            <button 
              className="level-button hard"
              onClick={() => startGame('hard')}
            >
              Hard (6x6)
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="game-header">
            <div className="game-info">
              <div className="info-item">
                <span className="info-label">Level:</span>
                <span className="info-value">{gameState.level.charAt(0).toUpperCase() + gameState.level.slice(1)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Score:</span>
                <span className="info-value">{gameState.score}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Moves:</span>
                <span className="info-value">{gameState.moves}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Time:</span>
                <span className="info-value">{formatTime(getElapsedTime())}</span>
              </div>
            </div>
            <button 
              className="reset-button"
              onClick={resetGame}
            >
              New Game
            </button>
          </div>

          {gameState.gameCompleted ? (
            <div className="game-completed">
              <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
              <p className="mb-2">You completed the {gameState.level} level!</p>
              <div className="stats">
                <div className="stat-item">
                  <span className="stat-label">Final Score:</span>
                  <span className="stat-value">{gameState.score}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Moves:</span>
                  <span className="stat-value">{gameState.moves}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Time:</span>
                  <span className="stat-value">{formatTime(getElapsedTime())}</span>
                </div>
              </div>
              <div className="action-buttons">
                <button 
                  className="play-again-button"
                  onClick={() => startGame(gameState.level)}
                >
                  Play Again
                </button>
                <button 
                  className="new-game-button"
                  onClick={resetGame}
                >
                  Choose Level
                </button>
              </div>
            </div>
          ) : (
            <div className={`card-grid ${getGridClass()}`}>
              {gameState.cards.map(card => (
                <div
                  key={card.id}
                  className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
                  onClick={() => handleCardClick(card.id)}
                >
                  <div className="card-inner">
                    <div className="card-front">
                      <div className="card-logo">?</div>
                    </div>
                    <div className="card-back">
                      <img 
                        src={card.imageUrl} 
                        alt={card.techName} 
                        className="card-image"
                      />
                      <div className="card-name">{card.techName}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GameBoard;
