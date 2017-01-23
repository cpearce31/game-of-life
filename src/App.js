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
      width: 20,
      height: 20,
      paused: false,
      cellSize: 20,
      board: generateRandomBoard(20, 20),
      cells: []
    };
  }

  componentWillMount () {
    this.setState({
      cells: buildBoard(this.state.board, this.state.cellSize)
    });
  }

  tick () {
    let cells = this.state.cells;
    let offset = this.state.width;
    for (let i = 0; i < cells.length; i++) {
      let count = 0;
      let neighbors = [
        cells[i - offset - 1],
        cells[i - offset],
        cells[i - offset + 1],
        cells[i - 1],
        cells[i + i],
        cells[i + offset - 1],
        cells[i + offset],
        cells[i + offset + 1]
      ];
      for (let j = 0; j < neighbors.length; j++) {
        if (neighbors[i].props.alive) {
          count++;
        }
      }
    }
  }

  render () {
    return (
      <div>
        {this.state.cells}
      </div>
    );
  }

  componentDidMount () {
    console.log(this.props);
  }
}

export default App;
