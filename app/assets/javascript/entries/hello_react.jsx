// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import clockIcon from '../counter/images/clock.png';
import './hello-react.sass'
import HelloExample from '../hello_example'

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <HelloExample/>
    </AppContainer>,
    document.getElementById('react-app')
  );
};

document.addEventListener('DOMContentLoaded', () => {
  render(HelloExample)
})

if (module.hot) {
  module.hot.accept('../hello_example', () => {
    render(HelloExample)
  })
}
