import {useState} from "react";
import './App.css';

function Square({value, onSquareClick, winSquares, index, drawFlag}) {

  let winSquare = false;
  if (winSquares.includes(index)) {
    winSquare = true;
  }

  const classForThisSquare = winSquare ?
  'win_square' : drawFlag ?
  'draw_square' : 'square' 

  return (
    <button 
      className={classForThisSquare}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({xIsNext, squares, onPlay}) {
  const {winner, winIndexes} = calculateWinner(squares);
  let status;
  const board_content=[];

  let anyNull = val => val === null;
  let filteredSquares = squares.filter(anyNull);
  let drawFlag = false;

  if (winner) {
    status = "Winner: " + winner;
  } else if(filteredSquares.length === 0) {
    status = "Draw!";
    drawFlag = true;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {

    const allCoords = [
      [1,1],
      [1,2],
      [1,3],
      [2,1],
      [2,2],
      [2,3],
      [3,1],
      [3,2],
      [3,3]
    ]
    const moveCoords = allCoords[i];
    
    if (squares[i] || winner) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    const moveSymbol = nextSquares[i];
    onPlay(nextSquares, moveCoords, moveSymbol);
  }

  for (let i=0;i<=6;i+=3) {
    let row_content=[];
    for (let j=0;j<3;j++)
      {
        row_content.push(<Square 
          value={squares[j+i]}
          onSquareClick={() => handleClick(j+i)}
          key={j+i}
          winSquares={winIndexes}
          index={j+i}
          drawFlag={drawFlag}
          />);
      }
    board_content.push(<div className="board-row" key={i}>{row_content}</div>);
  }

  return (
    <>
      <div className="status">{status}</div>
      {board_content}
    </>
  );
}

export default function Game() {

  const [history, setHistory] = useState({
    square_history: [Array(9).fill(null)],
    symbolsHistory: Array(9).fill(null),
    coordHistory: Array(9).fill(null)
  })
  
  const [currentMove, setCurrentMove] = useState(0);
  
  const [isAscending, setIsAscending] = useState(true);

  const currentSquares = history.square_history[currentMove];

  const xIsNext = currentMove % 2 === 0;
  
  function handlePlay(nextSquares, moveCoords, moveSymbol) {

    const nextHistoryObject = {
      square_history: [...history.square_history.slice(0, currentMove + 1), nextSquares],
      symbolsHistory: [...history.symbolsHistory.slice(0, currentMove + 1), moveSymbol],
      coordHistory: [...history.coordHistory.slice(0, currentMove + 1), moveCoords]
    }
    setHistory({
      square_history: nextHistoryObject.square_history,
      symbolsHistory: nextHistoryObject.symbolsHistory,
      coordHistory: nextHistoryObject.coordHistory
    });

    setCurrentMove(nextHistoryObject.square_history.length-1);

  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.square_history.map((squares, move) => {

    const description = move > 0 ? `Go to move #${move} - ${history.symbolsHistory[move]} at [${history.coordHistory[move]}]` : 'Go to game start';

    return (
      <li key={move}>
        {move === currentMove ? (
          <>You are on move #{currentMove}</>
        ):(
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  }); 
  
  const sortedMoves = isAscending ? moves : moves.slice().reverse();
 
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button className="sort_button" onClick={() => setIsAscending(!isAscending)}>
          {isAscending ? 'Sort Moves Descending' : 'Sort Moves Ascending'}
        </button>
        <ol reversed={!isAscending} start={isAscending ? 0 : currentMove}>{sortedMoves}</ol>
      </div>
      
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i=0;i<lines.length;i++) {
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        "winner":squares[a],
        "winIndexes": [a,b,c]
      };
    }
  }
  return { winner: null, winIndexes: [] };
}