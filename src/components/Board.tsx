import Square from "./Square";

interface BoardProps {
  squares: (string | null)[];
  onSquareClick: (index: number) => void;
}

export default function Board({ squares, onSquareClick }: BoardProps) {
  return (
    <div className="board">
      {squares.map((square, index) => {
        return <Square value={square} onClick={() => onSquareClick(index)} />;
      })}
    </div>
  );
}
