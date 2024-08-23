function App() {
  // Create an array of 9 elements (could be numbers or just undefined)
  const sudokuGrid = Array.from({ length: 9 }, (_, rowIndex) => 
    Array.from({ length: 9 },()=>0)
  );

  function isValid(grid, row, col, num) {
    const gridSize = 9;
  
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
    const gridSize = 9;
  
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (grid[row][col] === null || grid[row][col] === 0) {
          // Try numbers 1 through 9
          for (let num = 1; num <= 9; num++) {
            if (isValid(grid, row, col, num)) {
              grid[row][col] = num;
  
              // Recursively attempt to solve the rest of the grid
              if (solveSudoku(grid)) {
                return true;
              }
  
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
    if (solveSudoku(sudokuGrid)) {
      console.log("Sudoku solved successfully:");
      console.log(sudokuGrid);
    } else {
      console.log("No solution exists.");
    }
  }
  /*function solve(){
    sudokuGrid.forEach(row => {
      row.forEach(cell => {
        if(cell >= 0 && cell < 10){
          if(cell === 0){

          }
        }else{
         console.warn("Values are not in bounds."); 
        }
      })
    });
  }*/
  return (
    <div className="App">
      <div className="sudoku">
        {sudokuGrid.map((row, i) => (
          <div key={i} className="sudoku-row">
            {row.map((_, j) => (
              <div key={j} className="sudoku-column">
                <input className={i+"-"+j} type="number" onChange={(e)=>{sudokuGrid[i][j] = parseInt(e.target.value)}} max={9} min={1}/>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="solve-btn">
        <button onClick={()=>solve()}>Solve</button>
      </div>
    </div>
  );
}


export default App;
