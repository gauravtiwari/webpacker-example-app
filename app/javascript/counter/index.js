// Initialize the counter code when DOM is ready
import './styles/style.sass';
import './styles/container.css';
import counter from './components/counter';

document.addEventListener('DOMContentLoaded', () => {
  counter.initialize();
});
