import Vue from 'vue'
import App from '../hello_vue'
import '../hello_vue/style.scss'

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(document.createElement('hello'))
  const app = new Vue(App).$mount('hello')
})
