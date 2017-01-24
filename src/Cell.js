const React = require('react');

class Cell extends React.Component {
  render () {
    console.log(this.props);
    let test = this.props.alive ? '#' : '.';
    return <span className='cell-inner' style={this.props.style}>{test}</span>;
  }
}

module.exports = Cell;
