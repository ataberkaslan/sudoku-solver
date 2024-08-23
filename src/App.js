import React, { useState } from 'react';
import {isValid,isValidGrid,solveSudoku,steps,gridSize} from "./utils";

function App() {
  
  const [sudokuGrid, setSudokuGrid] = useState(
    Array.from({ length: gridSize }, () => Array(gridSize).fill(null))
  );
  
  const handleChange = (i, j, value) => {
    const newGrid = [...sudokuGrid];
    const parsedValue = parseInt(value, 10);
    newGrid[i][j] = isNaN(parsedValue) ? null : parsedValue;
    setSudokuGrid(newGrid);
  };
  
  function solve(){
    const newGrid = sudokuGrid.map(row => [...row]);
    if(!isValidGrid(newGrid)){
      console.error("Not valid grid!");
      return;
    }
    if (solveSudoku(newGrid) && isValidGrid(newGrid)) {
      console.log("Sudoku solved successfully:");
      setSudokuGrid(newGrid);
    }
  }
  return (
    <div className="App">
      <div className='title'>Sudoku Solver</div>
      <div className="sudoku">
        {sudokuGrid.map((row, i) => (
          <div key={i} className="sudoku-row">
            {row.map((value, j) => (
              <div key={j} className="sudoku-column">
                <input className={i+"-"+j} value={value !== null ? value : ''} type="number" onChange={(e)=>{handleChange(i,j,e.target.value)}} max={9} min={1}/>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="buttons">
        <button className='solve-btn' onClick={()=>solve()}>Solve</button>
        <button className='clear-btn' onClick={()=>setSudokuGrid(Array.from({ length: gridSize }, () => Array(gridSize).fill(null)))}><svg xmlns="http://www.w3.org/2000/svg" class="icon-game-control" viewBox="0 0 30 31"><path fill="#325aaf" fill-rule="evenodd" d="M27.13 25.11a1 1 0 01.12 2h-6.9a1 1 0 01-.11-2H27.13zM21.48 4.08l.17.14.16.15 3.76 3.76a4 4 0 01.15 5.5l-.15.16-11.32 11.32h2.04a1 1 0 011 .89v.11a1 1 0 01-.88 1H6.52a3 3 0 01-1.98-.74l-.14-.14-2.23-2.22a4 4 0 01-.15-5.5l.15-.16L16.15 4.37a4 4 0 015.33-.29zm-11.52 9.3l-6.38 6.38a2 2 0 00-.11 2.7l.11.13 2.23 2.23a1 1 0 00.58.28l.13.01h4.9l5.13-5.13-6.59-6.6zm7.87-7.82l-.14.1-.13.13-6.18 6.18 6.59 6.6 6.19-6.2a2 2 0 00.11-2.7l-.11-.12-3.77-3.76a2 2 0 00-2.56-.22z"></path></svg></button>
      </div>
    </div>
  );
}


export default App;
