import React, { Component } from 'react';
import './App.css';
import Cell from './Cell.js';

let cells = [];

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
                 coord[1] < board.length
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
      width: 20,
      height: 20,
      paused: false,
      cellSize: 20,
      board: generateRandomBoard(20, 20),
      cells: []
    };

    this.tick = this.tick.bind(this);
  }

  componentWillMount () {
    for (let y = 0; y < this.state.board.length; y++) {
      for (let x = 0; x < this.state.board[y].length; x++) {
        let cellStyle = {
          position: 'absolute',
          height: this.state.cellSize,
          width: this.state.cellSize,
          top: y * this.state.cellSize,
          left: x * this.state.cellSize
        };
        cells.push(<Cell
          row={y}
          col={x}
          alive={this.state.board[y][x] === 1} // May cause a bug if y/x dont persist
          size={this.state.cellSize}
          style={cellStyle}
          className='cell'
          key={'y' + y + 'x' + x}
        />);
      }
    }
  }

  tick () {
    console.log('tick fired. state: ');
    console.log(this.state);
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
    const t = setTimeout(this.tick, 1000);
  }

  render () {
    for (let i = 0; i < cells.length; i++) {
      let y = cells[i].props.row;
      let x = cells[i].props.col;
      cells[i] = React.cloneElement(cells[i], {
        alive: this.state.board[y][x] !== 0
      });
    }
    console.log('state inside reder:');
    console.log(this.state);
    return (
      <div>
        {cells}
      </div>
    );
  }
}

export default App;
