
# Sudoku Solver

This project is a Sudoku solver application built using React. It allows users to input a Sudoku puzzle and solves it using a recursive backtracking algorithm. The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of Contents

- [Sudoku Solver](#sudoku-solver)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [How to Use the Sudoku Solver](#how-to-use-the-sudoku-solver)
  - [Features](#features)
  - [Scripts](#scripts)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

To get started with this project, you'll need to have Node.js and npm installed. If you don't have them installed, you can download them from [Node.js](https://nodejs.org/).

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ataberkaslan/sudoku-solver
   cd sudoku-solver
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

## Usage

Once the dependencies are installed, you can start the development server:

```bash
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### How to Use the Sudoku Solver

1. Enter the Sudoku puzzle into the grid.
2. Click the "Solve" button.
3. The solved Sudoku puzzle will be displayed in the grid.

## Features

- **Interactive Sudoku Grid:** Users can input numbers into a 9x9 grid.
- **Sudoku Solving Algorithm:** The app uses a recursive backtracking algorithm to solve the Sudoku puzzle.
- **Real-time Display:** As soon as the puzzle is solved, the solution is displayed in the grid.

## Scripts

In the project directory, you can run the following scripts:

- **`npm start`**: Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- **`npm test`**: Launches the test runner in interactive watch mode.
- **`npm run build`**: Builds the app for production to the `build` folder.
- **`npm run eject`**: Ejects the project from `create-react-app` configuration. **Use with caution** as this action is irreversible.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

1. Fork the project
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request

## License

This project is open-source and available under the [MIT License](LICENSE.md).
