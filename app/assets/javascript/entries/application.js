/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import { render } from 'react-dom'
import React from 'react'
import HelloReact from './hello_react'


document.addEventListener('DOMContentLoaded', () => {
  render(
    <HelloReact />,
    document.getElementById('hello_react')
  )


  import(/* webpackChunkName: "counter" */ '../counter').then(({ default: Counter }) => {
    render(
      <Counter />,
      document.getElementById('counter')
    )
  })
})

console.log('hello there')
