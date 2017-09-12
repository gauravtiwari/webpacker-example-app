import React, { Component } from 'react'
import PropTypes from 'prop-types'
import logo from './react.png'
import './style.sass'

class HelloReact extends Component {
  componentDidMount() {
    this._node.style.fontSize = '25px'
  }

  handleOnClick = () =>
    console.log('I Clicked')

  render () {
    return (
      <div className="hello-react">
        <p ref={node => (this._node = node)}>Hello {this.props.name}!</p>
        <img onClick={this.handleOnClick} src={logo} className="react-logo" alt="React" />
      </div>
    )
  }
}

HelloReact.defaultProps = {
  name: 'React'
}

HelloReact.propTypes = {
  name: PropTypes.string
}

export default HelloReact
