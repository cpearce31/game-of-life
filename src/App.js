import React, { Component } from 'react';
import './App.css';
import Cell from './Cell.js';

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

function buildBoard (board, cellSize) {
  let cells = [];
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      let alive = board[y][x] === 1;
      let cellStyle = {
        position: 'absolute',
        height: cellSize,
        width: cellSize,
        top: y * cellSize,
        left: x * cellSize
      };
      cells.push(<Cell
        row={y}
        col={x}
        alive={alive}
        size={cellSize}
        style={cellStyle}
        className='cell'
        key={'y' + y + 'x' + x}
      />);
    }
  }
  return cells;
}

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      width: 100,
      height: 80,
      paused: false,
      cellSize: 20,
      board: generateRandomBoard(4, 5)
    };
  }

  render () {
    return (
      <div>
        {buildBoard(this.state.board, this.state.cellSize)}
      </div>
    );
  }
}

export default App;
