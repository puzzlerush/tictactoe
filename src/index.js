import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

function getWinner(squares) {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  for (let i = 0; i < winConditions.length; i++) {
    const [x, y, z] = winConditions[i];
    if (squares[x] == squares[y] && squares[y] == squares[z]) {
      return squares[x];
    }
  }
  return false;
}

function boardFull(squares) {
  let full = true;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) {
      full = false;
    }
  }
  return full;
}

function ResetBoard(props) {
  return (
    <button className="btn btn-danger mt-3" onClick={() => props.onClick()}>
      Reset Board
    </button>
  );
}

function Square(props) {
  return (
    <button 
      className="square btn btn-secondary" 
      onClick={() => props.onClick()}
    >
      <span style={{fontSize: "3vmin"}}>{props.value}</span>
    </button>
  );
}

function Board(props) {
  const defaultSquares = [ null, null, null, 
                           null, null, null, 
                           null, null, null, ];
  
  const [squares, setSquares] = useState(defaultSquares);
  const [xToMove, setXToMove] = useState(true);
  
  function makeMove(i) {
    const newSquares = [...squares];
    if (getWinner(newSquares) || newSquares[i] != null) {
      return;
    }
    newSquares[i] = xToMove ? "X" : "O";
    setSquares(newSquares);
    setXToMove(!xToMove);
  }
  
  function reset() {
    setSquares(defaultSquares);
  }
  
  function drawSquare(i) {
    return (
      <Square 
        value={squares[i]}
        onClick={() => makeMove(i)}
      />
    );
  }
  
  let winner = getWinner(squares);
  let full = boardFull(squares);
  let message;
  if (winner) {
    message = winner + ' WINS!';
  } else if (full) {
    message = 'TIE';  
  }
  else {
    message = (xToMove ? 'X' : 'O') + ' TO MOVE';
  }
  
  return (
    <div className="wrapper">
      <div className="message">{message}</div>
      <div>
        {drawSquare(0)}
        {drawSquare(1)}
        {drawSquare(2)}
      </div>
      <div>
        {drawSquare(3)}
        {drawSquare(4)}
        {drawSquare(5)}
      </div>
      <div>
        {drawSquare(6)}
        {drawSquare(7)}
        {drawSquare(8)}
      </div>
      <ResetBoard onClick={() => reset()}/>
    </div>
  );
}

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);
