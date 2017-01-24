const React = require('react');

let styles = {
  display: 'inline-block',
  backgroundColor: 'blue',
  color: 'white',
  borderRadius: 5,
  textAlign: 'center',
  padding: 10,
  userSelect: 'none',
  cursor: 'default',
  margin: 10
};

class MyButton extends React.Component {
  render () {
    return (<span style={Object.assign(styles, this.props.style)}
      onClick={this.props.onClick}
      >
      {this.props.text}
      </span>
    );
  }
}

module.exports = MyButton;
