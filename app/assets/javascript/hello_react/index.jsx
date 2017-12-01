import React, { Component } from 'react'
import PropTypes from 'prop-types'
import logo from './react.png'
import Image2 from './forward-partners.svg';

// and use it like any other React Component
import style from './style.sass'
import 'bootstrap/dist/css/bootstrap.css'

class HelloReact extends Component {
  componentDidMount() {
    this._node.style.fontSize = '25px'
  }

  handleOnClick = () =>
    console.log('I Clicked')

  render () {
    return (
      <div className={style["hello-react"]}>
        <Image2 width={100} />
        <p className="btn btn-danger" ref={node => (this._node = node)}>Hello {this.props.name}!</p>
        <img onClick={this.handleOnClick} src={logo} className={style["react-logo"]} alt="React" />
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
