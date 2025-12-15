import { useEffect, useState } from "react";
import Board from "./Board";

export default function Game() {
  const [squares, setSquares] = useState<(string | null)[]>(
    Array(9).fill(null)
  );
  const [isXNext, setIsXNext] = useState(true);
  const [timer, setTimer] = useState(10);
  const [stop, setStop] = useState(false);
  
  function handleSquareClick(index: number) {
    if (stop) return;
    if (squares[index]) return;
    const nextSquares = [...squares];
    nextSquares[index] = isXNext ? "X" : "O";
    setSquares(nextSquares);
    setIsXNext((prev) => !prev);
    setTimer(10);
  }
  function handleReset() {
    setIsXNext(true);
    setSquares(Array(9).fill(null));
    setTimer(10);
    setStop(false);
  }

  useEffect(() => {
    if (!stop) {
      const timerId = setTimeout(() => {
        if (timer == 0) {
          setIsXNext((prev) => !prev);
          setTimer(10);
        } else {
          setTimer((time) => time - 1);
        }
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [timer, stop]);

  function handleStop() {
    setStop((stop) => !stop);
  }
  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      <h2>
        time for player {isXNext ? "X" : "O"}- {timer} sec
      </h2>
      <Board squares={squares} onSquareClick={handleSquareClick} />
      <p>Next Player: {isXNext ? "X" : "O"}</p>
      <button onClick={handleReset}>reset</button>
      <button onClick={handleStop}>{stop ? "resume" : "stop"}</button>
    </div>
  );
}
