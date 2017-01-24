import React, { Component } from 'react';
import './App.css';
import Cell from './Cell.js';
import MyButton from './MyButton.js';

let cells = [];

function generateClearBoard (height, width) {
  let board = [];
  let row = [];
  for (let i = 0; i < width; i++) {
    row.push(0);
  }
  for (let i = 0; i < height; i++) {
    board.push(row);
  }
  return board;
}

function generateRandomBoard (height, width) {
  let board = [];
  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      row.push(Math.round(Math.random()));
    }
    board.push(row);
  }
  return board;
}

function countLiveNeighbors (y, x, board) {
  function getAdjacentCoords (y, x, board) {
    const possibleCoords = [
      [y - 1, x - 1],
      [y, x - 1],
      [y + 1, x - 1],
      [y - 1, x],
      [y + 1, x],
      [y - 1, x + 1],
      [y, x + 1],
      [y + 1, x + 1]
    ];
    return possibleCoords.filter(
      (coord) => coord[0] >= 0 &&
                 coord[1] >= 0 &&
                 coord[0] < board.length &&
                 coord[1] < board[0].length
    );
  }
  let coords = getAdjacentCoords(y, x, board);
  let count = 0;
  for (let i = 0; i < coords.length; i++) {
    count += board[coords[i][0]][coords[i][1]];
  }
  return count;
}

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      width: 60,
      height: 40,
      paused: false,
      cellSize: 20,
      board: generateRandomBoard(40, 60),
      cells: [],
      interval: null
    };

    this.tick = this.tick.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
    this.handleGenClick = this.handleGenClick.bind(this);
  }

  componentWillMount () {
    for (let y = 0; y < this.state.board.length; y++) {
      for (let x = 0; x < this.state.board[y].length; x++) {
        let cellStyle = {
          border: '1px solid black',
          position: 'absolute',
          height: this.state.cellSize,
          width: this.state.cellSize,
          top: y * this.state.cellSize,
          left: x * this.state.cellSize,
          userSelect: 'none'
        };
        cells.push(<Cell
          row={y}
          col={x}
          alive={this.state.board[y][x] === 1} // May cause a bug if y/x dont persist
          size={this.state.cellSize}
          style={cellStyle}
          className='cell'
          key={'y' + y + 'x' + x}
          onClick={this.handleCellClick}
        />);
      }
    }
  }

  handleGenClick () {
    this.setState({
      board: generateRandomBoard(this.state.height, this.state.width)
    });
  }

  handlePauseClick () {
    if (this.state.paused) {
      this.setState({
        interval: setInterval(this.tick, 200),
        paused: false
      });
    } else {
      clearInterval(this.state.interval);
      this.setState({
        interval: null,
        paused: true
      });
    }
  }

  handleClearClick () {
    clearInterval(this.state.interval);
    this.setState({
      board: generateClearBoard(this.state.height, this.state.width),
      paused: true
    });
  }

  handleCellClick (e) {
    let changed = JSON.parse(JSON.stringify(this.state.board));
    let target = changed[e.target.dataset.row][e.target.dataset.col];
    changed[e.target.dataset.row][e.target.dataset.col] = target ? 0 : 1;
    this.setState({
      board: changed
    });
  }

  tick () {
    let newBoard = JSON.parse(JSON.stringify(this.state.board));
    for (let y = 0; y < this.state.height; y++) {
      for (let x = 0; x < this.state.width; x++) {
        let n = countLiveNeighbors(y, x, this.state.board);
        let c = this.state.board[y][x];
        // console.log('c: ' + c + ' n: ' + n);
        if (n < 2 && c === 1) {
          newBoard[y][x] = 0;
        } else if (n > 3 && c === 1) {
          newBoard[y][x] = 0;
        } else if (c === 1) {
          newBoard[y][x] = 1;
        } else if (n === 3 && c === 0) {
          newBoard[y][x] = 1;
        }
      }
    }
    this.setState({
      board: newBoard
    });
  }

  componentDidMount () {
    this.setState({
      interval: setInterval(this.tick, 200)
    });
  }

  render () {
    let boardStyle = {
      height: (this.state.cellSize * this.state.height) + 2,
      width: this.state.cellSize * this.state.width,
      position: 'relative'

    };

    for (let i = 0; i < cells.length; i++) {
      let y = cells[i].props.row;
      let x = cells[i].props.col;
      cells[i] = React.cloneElement(cells[i], {
        alive: this.state.board[y][x] !== 0
      });
    }
    return (
      <div className='container'>
        <div className='innerContainer'>
          <div className='cellWrapper' style={boardStyle}>
            {cells}
          </div>
          <div className='controlWrapper'>
            <span className='hintText'>Click on a cell to change it's value!</span>
            <MyButton text='Clear' onClick={this.handleClearClick}/>
            <MyButton text='Random' onClick={this.handleGenClick}/>
            <MyButton text={this.state.paused ? 'Start' : 'Pause'}
              onClick={this.handlePauseClick}/>
            <span className='hintText'>
              <a href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life">
                Read about Conway's Game of Life.
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
