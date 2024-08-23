function App() {
  // Create an array of 9 elements (could be numbers or just undefined)
  const sudokuGrid = Array.from({ length: 9 }, (_, rowIndex) => 
    Array.from({ length: 9 },()=>0)
  );
  function solve(){
    console.log(sudokuGrid);
  }
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
