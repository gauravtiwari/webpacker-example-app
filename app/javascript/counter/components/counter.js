// A simple counter example
// The setup will be more complicated in modern apps built using React

const incrementNode = document.getElementById('increment');
const decrementNode = document.getElementById('decrement');
const inputNode = document.getElementById('counter');

const counter = {
  initialize() {
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
