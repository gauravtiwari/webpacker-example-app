// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import clockIcon from './counter/images/clock.png';
import './entries/hello-react.sass'

const Hello = props => (
  <div className='react-app-wrapper'>
    <img src={clockIcon} alt="clock" />
    <p className='hello-react'>
      Hello! {props.name}!
    </p>
  </div>
)

Hello.defaultProps = {
  name: 'David'
}

Hello.propTypes = {
  name: React.PropTypes.string
}

export default Hello
