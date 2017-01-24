const React = require('react');

class Cell extends React.Component {
  render () {
    let test = this.props.alive ? '#' : '.';
    return <span
      className='cell-inner'
      style={this.props.style}
      onClick={this.props.onClick}
      data-row={this.props.row}
      data-col={this.props.col}
    >{test}</span>;
  }
}

module.exports = Cell;
