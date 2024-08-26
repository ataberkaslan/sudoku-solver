import React, { useState } from 'react';
import {isValidGrid,solveSudoku,steps,gridSize} from "./utils";
import { ToastContainer, toast,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  const [sudokuGrid, setSudokuGrid] = useState(
    Array.from({ length: gridSize }, () => Array(gridSize).fill(null))
  );
  const [activeGrid, setActiveGrid] = useState([-1,-1])
  const handleChange = (i, j, value) => {
    const newGrid = [...sudokuGrid];
    const parsedValue = parseInt(value, 10);
    newGrid[i][j] = isNaN(parsedValue) ? null : parsedValue;
    setSudokuGrid(newGrid);
  };
  function solveStep(){
    steps.splice(0,steps.length);
    const newGrid = sudokuGrid.map(row => [...row]);
    const tempGrid = sudokuGrid.map(row => [...row]);
    if(!isValidGrid(newGrid)){
      
      toast.error('Not a valid grid!', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
        });

      return;
    }
    if (solveSudoku(newGrid) && isValidGrid(newGrid)) {
      if(!steps.length){
        setActiveGrid([-1,-1])
        toast.success('Sudoku solved successfully', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
          });
          return;
      }
      setActiveGrid([steps[0].row,steps[0].col])
      tempGrid[steps[0].row][steps[0].col] = steps[0].value;
      setSudokuGrid(tempGrid);
    }


  }
  function solve(){
    steps.splice(0,steps.length);
    const newGrid = sudokuGrid.map(row => [...row]);
    if(!isValidGrid(newGrid)){
      
      toast.error('Not a valid grid!', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
        });

      return;
    }
    if (solveSudoku(newGrid) && isValidGrid(newGrid)) {
      
      toast.success('Sudoku solved successfully', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
        });
      setSudokuGrid(newGrid);
    }
  }
  function clearGrid(){
    setSudokuGrid(Array.from({ length: gridSize },() => Array(gridSize).fill(null)));
    steps.splice(0,steps.length)
    toast.info('Sudoku cleared!', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Slide,
      });
    }
  
  return (
    <div className="App">
      <ToastContainer />
      <div className='container'>
      <div className='title'>Sudoku Solver</div>
      <div className="sudoku">
        {sudokuGrid.map((row, i) => (
          <div key={i} className="sudoku-row">
            {row.map((value, j) => (
              <div key={j} className="sudoku-column">
                <input className={i+"-"+j + (i == activeGrid[0] && j == activeGrid[1] ? " active" : "")} value={value !== null ? value : ''} type="number" onChange={(e)=>{handleChange(i,j,e.target.value)}} max={9} min={1}/>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="buttons">
        <button className='solve-btn' onClick={()=>solve()}>Solve Grid</button>
        <button className='step-btn round-btn' onClick={()=>solveStep()}><svg fill='#325aaf' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 2"><g data-name="arrowhead-right"><rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0"/><path d="M18.78 11.37l-4.78-6a1 1 0 0 0-1.41-.15 1 1 0 0 0-.15 1.41L16.71 12l-4.48 5.37a1 1 0 0 0 .13 1.41A1 1 0 0 0 13 19a1 1 0 0 0 .77-.36l5-6a1 1 0 0 0 .01-1.27z"/><path d="M7 5.37a1 1 0 0 0-1.61 1.26L9.71 12l-4.48 5.36a1 1 0 0 0 .13 1.41A1 1 0 0 0 6 19a1 1 0 0 0 .77-.36l5-6a1 1 0 0 0 0-1.27z"/></g></g></svg></button>
        <button className='clear-btn round-btn' onClick={() => clearGrid()} ><svg xmlns="http://www.w3.org/2000/svg" className="icon-game-control" viewBox="0 0 30 31"><path fill="#325aaf" fillRule="evenodd" d="M27.13 25.11a1 1 0 01.12 2h-6.9a1 1 0 01-.11-2H27.13zM21.48 4.08l.17.14.16.15 3.76 3.76a4 4 0 01.15 5.5l-.15.16-11.32 11.32h2.04a1 1 0 011 .89v.11a1 1 0 01-.88 1H6.52a3 3 0 01-1.98-.74l-.14-.14-2.23-2.22a4 4 0 01-.15-5.5l.15-.16L16.15 4.37a4 4 0 015.33-.29zm-11.52 9.3l-6.38 6.38a2 2 0 00-.11 2.7l.11.13 2.23 2.23a1 1 0 00.58.28l.13.01h4.9l5.13-5.13-6.59-6.6zm7.87-7.82l-.14.1-.13.13-6.18 6.18 6.59 6.6 6.19-6.2a2 2 0 00.11-2.7l-.11-.12-3.77-3.76a2 2 0 00-2.56-.22z"></path></svg></button>
      </div>
      </div>
    </div>
  );
}


export default App;
