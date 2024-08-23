const gridSize = 9;
const steps = [];

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

export {isValid, isValidGrid, solveSudoku, steps,gridSize};