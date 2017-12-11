// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from 'react'

class Counter extends Component {
  state = {
    counter: 0
  }

  addCounter = () =>
    this.setState({ counter: this.state.counter + 1 })

  render () {
    return (
      <div className="counter">
        {this.state.counter}
        <button onClick={this.addCounter}> Add</button>
      </div>
    )
  }
}

export default Counter
