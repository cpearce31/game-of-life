import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

console.log(window.innerWidth);
let cellSize = window.innerWidth > 750 ? 20 : 10;
let width = Math.floor((window.innerWidth / cellSize) * 0.8);
let height = Math.floor((window.innerHeight / cellSize) * 0.8);
if (width > 60) {
  width = 60;
}
if (height > 40) {
  height = 40;
}

ReactDOM.render(
  <App height={height} width={width} cellSize={cellSize}/>,
  document.getElementById('root')
);
