import React from 'react'
import PropTypes from 'prop-types'
import logo from './react.png'
import './style.sass'

const staticImages = require.context('../images/', true)
const imagePath = (name) => staticImages(name, true)

const HelloReact = props => (
  <div className="hello-react">
    <p>Hello {props.name}!</p>
    <img src={imagePath('./react.png')} className="react-logo" alt="React" />
  </div>
)

HelloReact.defaultProps = {
  name: 'React'
}

HelloReact.propTypes = {
  name: PropTypes.string
}

export default HelloReact
