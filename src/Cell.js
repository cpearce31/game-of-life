const React = require('react');

class Cell extends React.Component {
  render () {
    let spanStyle = {
      backgroundColor: this.props.alive ? 'blue' : '#d3d3d3'
    };
    return <span
      className='cell-inner'
      style={Object.assign({}, this.props.style, spanStyle)}
      onClick={this.props.onClick}
      data-row={this.props.row}
      data-col={this.props.col}
    ></span>;
  }
}

module.exports = Cell;
