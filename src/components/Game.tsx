import { useEffect, useState } from "react";
import Board from "./Board";

export default function Game() {
  const [squares, setSquares] = useState<(string | null)[]>(
    Array(9).fill(null)
  );
  const [isXNext, setIsXNext] = useState(true);
  const [timer, setTimer] = useState(10);
  const [stop, setStop] = useState(false);

  function calculateWinner(): "X" | "O" | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const a = lines[i][0];
      const b = lines[i][1];
      const c = lines[i][2];

      if (
        squares[a] !== null &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a] as "X" | "O";
      }
    }

    return null;
  }

  const winner = calculateWinner();

  useEffect(() => {
    if (winner) setStop(true);
  }, [winner]);

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
    if (stop || winner) return;
    const timerId = setTimeout(() => {
      if (timer === 0) {
        setIsXNext((prev) => !prev);
        setTimer(10);
      } else {
        setTimer((prev) => prev - 1);
      }
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timer, stop, winner]);

  function handleStop() {
    setStop((stop) => !stop);
  }
  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      {winner && <h2>Winner: {winner}</h2>}
      {winner ? (
        ""
      ) : (
        <h2>
          time for player {isXNext ? "X" : "O"}- {timer} sec
        </h2>
      )}
      <Board squares={squares} onSquareClick={handleSquareClick} />
      {winner ? "" : <p>Next Player: {isXNext ? "X" : "O"}</p>}
      <button onClick={handleReset}>reset</button>
      {winner ? (
        ""
      ) : (
        <button onClick={handleStop}>{stop ? "resume" : "stop"}</button>
      )}
    </div>
  );
}
