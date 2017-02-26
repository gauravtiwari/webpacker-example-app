// A simple counter example
// The setup will be more complicated in modern apps built using React

import clockIcon from '../../../assets/images/clock.png';
const incrementNode = document.getElementById('increment');
const decrementNode = document.getElementById('decrement');
const inputNode = document.getElementById('counter');
const iconNode = document.getElementById('icon');

const counter = {
  initialize() {
    iconNode.innerHTML = `<img src="${clockIcon}" alt="counter icon" />`
    incrementNode.addEventListener('click', (event) => {
      event.preventDefault();
      const currentValue = inputNode.value;
      inputNode.value = parseInt(currentValue, 0) + 1;
    });

    decrementNode.addEventListener('click', (event) => {
      event.preventDefault();
      const currentValue = inputNode.value;
      if (currentValue > 0) {
        inputNode.value = parseInt(currentValue, 0) - 1;
      }
    });
  }
};

export default counter;
