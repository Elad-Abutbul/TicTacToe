import { useEffect, useState } from "react";
import Board from "./Board";
import { GAME_CONSTANTS } from "../constants/GameConstants";

export default function Game() {
  const [squares, setSquares] = useState<("X" | "O" | null)[]>(
    Array(GAME_CONSTANTS.BOARD_SIZE).fill(null)
  );
  const [isXNext, setIsXNext] = useState(true);
  const [timer, setTimer] = useState(GAME_CONSTANTS.TURN_DURATION_SECONDS);
  const [stop, setStop] = useState(false);

  const pauseButtonLabel = stop ? GAME_CONSTANTS.RESUME : GAME_CONSTANTS.STOP;

  function calculateWinner(): "X" | "O" | null {
    for (const [a, b, c] of GAME_CONSTANTS.WINNING_LINES) {
      const value = squares[a];

      if (value && value === squares[b] && value === squares[c]) {
        return value;
      }
    }
    return null;
  }

  const winner = calculateWinner();

  function handleSquareClick(index: number) {
    if (stop || winner) return;
    if (squares[index]) return;
    const nextSquares = [...squares];
    nextSquares[index] = isXNext ? GAME_CONSTANTS.X : GAME_CONSTANTS.O;
    setSquares(nextSquares);
    setIsXNext((prev) => !prev);
    setTimer(GAME_CONSTANTS.TURN_DURATION_SECONDS);
  }

  function handleReset() {
    setIsXNext(true);
    setSquares(Array(GAME_CONSTANTS.BOARD_SIZE).fill(null));
    setTimer(GAME_CONSTANTS.TURN_DURATION_SECONDS);
    setStop(false);
  }

  useEffect(() => {
    if (stop || winner) return;

    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          setIsXNext((p) => !p);
          return GAME_CONSTANTS.TURN_DURATION_SECONDS;
        }
        return prev - 1;
      });
    }, GAME_CONSTANTS.TIMER_INTERVAL_MS);

    return () => clearInterval(id);
  }, [stop, winner]);

  function handleStop() {
    setStop((stop) => !stop);
  }
  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      <Board squares={squares} onSquareClick={handleSquareClick} />
      {winner ? (
        <h2>Winner: {winner}</h2>
      ) : (
        <>
          <h2>
            time for player {isXNext ? GAME_CONSTANTS.X : GAME_CONSTANTS.O} : {timer} sec
          </h2>
          <p>Next Player: {isXNext ? GAME_CONSTANTS.X : GAME_CONSTANTS.O}</p>
          <button onClick={handleStop}>{pauseButtonLabel}</button>
        </>
      )}

      <button onClick={handleReset}>reset</button>
    </div>
  );
}
