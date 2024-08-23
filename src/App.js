import React, { useState } from 'react';

function App() {
  // Create an array of 9 elements (could be numbers or just undefined)
  const gridSize = 9;
  const [sudokuGrid, setSudokuGrid] = useState(
    Array.from({ length: gridSize }, () => Array(gridSize).fill(null))
  );
  const steps = [];
  const handleChange = (i, j, value) => {
    const newGrid = [...sudokuGrid];
    const parsedValue = parseInt(value, 10);
    newGrid[i][j] = isNaN(parsedValue) ? null : parsedValue;
    setSudokuGrid(newGrid);
  };
  function isValidGrid(grid) {
    const gridSize = 9;
  
    // Helper function to check if an array has duplicates ignoring null or 0 values
    const hasDuplicates = (array) => {
      const seen = new Set();
      for (let num of array) {
        if (num !== null && num !== 0) {
          if (seen.has(num)) {
            return true;
          }
          seen.add(num);
        }
      }
      return false;
    };
  
    // Check each row
    for (let row = 0; row < gridSize; row++) {
      if (hasDuplicates(grid[row])) {
        return false;
      }
    }
  
    // Check each column
    for (let col = 0; col < gridSize; col++) {
      const column = [];
      for (let row = 0; row < gridSize; row++) {
        column.push(grid[row][col]);
      }
      if (hasDuplicates(column)) {
        return false;
      }
    }
  
    // Check each 3x3 subgrid
    for (let startRow = 0; startRow < gridSize; startRow += 3) {
      for (let startCol = 0; startCol < gridSize; startCol += 3) {
        const subgrid = [];
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            subgrid.push(grid[startRow + row][startCol + col]);
          }
        }
        if (hasDuplicates(subgrid)) {
          return false;
        }
      }
    }
  
    // If no duplicates found, the grid is valid
    return true;
  }
  function isValid(grid, row, col, num) {
  
    // Check if num is not in the current row
    for (let x = 0; x < gridSize; x++) {
      if (grid[row][x] === num) {
        return false;
      }
    }
  
    // Check if num is not in the current column
    for (let x = 0; x < gridSize; x++) {
      if (grid[x][col] === num) {
        return false;
      }
    }
  
    // Check if num is not in the current 3x3 subgrid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[startRow + i][startCol + j] === num) {
          return false;
        }
      }
    }
  
    return true;
  }
  
  function solveSudoku(grid) {
  
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (grid[row][col] === null || grid[row][col] === 0) {
          // Try numbers 1 through 9
          for (let num = 1; num <= 9; num++) {
            if (isValid(grid, row, col, num)) {
              grid[row][col] = num;
              
              steps.push({
                row,
                col,
                value: num,
                grid: grid.map(row => [...row]),  // Clone the grid for the current state
              });

              // Recursively attempt to solve the rest of the grid
              if (solveSudoku(grid)) {
                return true;
              }
              steps.pop();

              // Backtrack if the number doesn't lead to a solution
              grid[row][col] = null;
            }
          }
  
          // If no number from 1 to 9 can be placed, return false
          return false;
        }
      }
    }
  
    // If the whole grid is filled correctly, return true
    return true;
  }
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
