// import useState to be able to manage state in the components
import {useState} from "react";
// import App.css to add styles to the App
import './App.css';

function Square({value, onSquareClick}) {
  /**
   * React component for the playable Squares.
   * @param {char} value - Either 'X' or 'O'.
   * @param {function} onSquareClick - Function to be triggered on the OnClick event handler.
   * @returns {button} The final component for the playable Squares. 
   */
  return (
    <button 
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({xIsNext, squares, onPlay}) {
  // function for the Tic-Tac-Toe board

  // the winner property is to track the winner (the value returned by the calculateWinner() function)
  const winner = calculateWinner(squares);
  // status is used to display important information to the players (i.e. who won, whose turn it is)
  let status;

  // basic if statement to check if there was a winner or if the game is still in progress
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    // function used for handling the clicking of squares on the board
    // it takes i as the parameter for the index of the square that was clicked
    // will be passed as the onSquareClick prop to the onClick event handler

    // if the square we want to insert into already has a value
    // OR
    // if there is already a winner
    // => we exit the function early
    if (squares[i] || winner) {
      return;
    }

    // nextSquares is the array containing the values for the squares on the board
    const nextSquares = squares.slice();
    // basic if statement to check whose turn it is so we know what to insert in the clicked square
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // handler for the insertion of the symbol in the desired square
    onPlay(nextSquares);
  }

  return (
    // we define what the Board() function returns -> the actual Tic-Tac-Toe board components
    // below, when displaying the Square components we pass several props:
    // - the square which would be modified (the squares[index])
    // - an arrow function that calls handleClick with the index to be modified as a parameter
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  // main function for the Tic-Tac-Toe game
  // the history property is to track the game history
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // current move
  const [currentMove, setCurrentMove] = useState(0);
  // variable to store the current moves
  const currentSquares = history[currentMove];
  // the xIsNext property is to track whose turn it is
  const xIsNext = currentMove % 2 === 0;
  
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  // function that computes the winner

  // the lines variable contains the 'key' of all the possible square combinations for a win-check 
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
      // if we have a value on squares[a] and it is equal to squares[b] and squares[c] we return the symbol on square[a] (the winning symbol)
      return squares[a];
    }
  }
  // otherwise return null (no winner - yet)
  return null;
}