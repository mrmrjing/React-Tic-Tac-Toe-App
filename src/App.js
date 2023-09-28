// Creates a component, which is a piece of reusable code that represents part of a UI, basically javascript functions that return markup
// export keyword: makes the function accessible outside of this file 
// default keyword: tells other files using your code that its the main function in the file  
// <button> is a jsx element (combi of js and html)
// className='square': button property that tells CSS how to style this button  

// fragments <> and </> are used to wrap adjacent JSX elements 
// prop are used to pass values from parent component to child component 
// {} are used to escape from jsx to js 

// In React, it’s conventional to use onSomething names for props which represent events and handleSomething for the function definitions which handle those events.

import {useState} from 'react'; 
// making an interactive component
function Square({value, onSquareClick}){
  return (
    <button className='square' onClick={onSquareClick}> 
      {value}
    </button>
  );
}
  
  // When the square is clicked, the code after the => “arrow” will run, calling handleClick(0).
  // () => handleClick(0) is an arrow function, which is a shorter way to define functions. onSquareClick={()=> handleClick()


function Board({xIsNext,squares,onPlay}){
  // Each time a player moves, xIsNext (a boolean) will be flipped to determine which player goes next and the game’s state will be saved. 
  // You’ll update the Board’s handleClick function to flip the value of xIsNext:
  function handleClick(i){
    if (calculateWinner(squares) || squares[i]){ 
      return;
    }
    const nextSquares = squares.slice();  // creates a copy of the squares array (nextSquares) with the JavaScript slice() Array method. 
    // Avoiding direct data mutation lets you keep previous versions of the data intact, and reuse them later.

    if (xIsNext){
      nextSquares[i] = 'X';  // updates the nextSquares array to add X to the first ([0] index) square.
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner" +" "+ winner; 
  } else {
    status = "Next Player: " + (xIsNext ? "X": "O");
  }
  return(
    <>
      <div className="board-row">{status}</div>
      <div className='board-row'> 
        <Square value = {squares[0]} onSquareClick={()=> handleClick(0)}/>   
        <Square value = {squares[1]} onSquareClick={()=> handleClick(1)}/> 
        <Square value = {squares[2]} onSquareClick={()=> handleClick(2)}/> 
      </div>
      <div className="board-row">
        <Square value = {squares[3]} onSquareClick={()=> handleClick(3)}/>
        <Square value = {squares[4]} onSquareClick={()=> handleClick(4)}/>
        <Square value = {squares[5]} onSquareClick={()=> handleClick(5)}/> 
      </div> 
      <div className="board-row">
        <Square value = {squares[6]} onSquareClick={()=> handleClick(6)}/>
        <Square value = {squares[7]} onSquareClick={()=> handleClick(7)}/>
        <Square value = {squares[8]} onSquareClick={()=> handleClick(8)}/> 
      </div> 
    </>
  );
}

export default function Game() {
  const[history,setHistory] = useState([Array(9).fill(null)]);
  const[currentMove,setCurrentMove] = useState(0); 
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0,currentMove+1),nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
}

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares,move) => { 
    let description;
    if (move>0){
      description = "Go to move #" + move; 
    } else { 
      description= 'Go to game start'; 
    }
  return ( 
    <li keys={move}>
      <button onClick={() => jumpTo(move)}>{description}</button>
    </li>
  );
  }); 
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// To collect data from multiple children, or to have two child components communicate with each other, declare the shared state in their parent component instead. 
// The parent component can pass that state back down to the children via props. This keeps the child components in sync with each other and with their parent.

// Declaring a winner by adding a helper function named calculateWinner that takes an array of 9 squares, checks for a winner and returns 'X' or 'O', or null

function calculateWinner(squares){ 
  const lines = [ 
    [0,1,2], 
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,5,6]
  ];
  for (let i = 0; i < lines.length; i++){
    const [a,b,c] = lines[i]; 
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

