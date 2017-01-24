const React = require('react');

let styles = {
  display: 'block',
  backgroundColor: 'turqoise',
  borderRadius: 5
};

class MyButton extends React.Component {
  render () {
    return (<span style={Object.assign(styles, this.props.style)}>
      {this.props.text}
      </span>
    );
  }
}

module.exports = Button;
