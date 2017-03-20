/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 751);
/******/ })
/************************************************************************/
/******/ ({

/***/ 375:
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./app/javascript/counter/index.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./styles/style.sass */ 635);

__webpack_require__(/*! ./styles/container.css */ 634);

var _counter = __webpack_require__(/*! ./components/counter */ 479);

var _counter2 = _interopRequireDefault(_counter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  _counter2.default.initialize();
}); // Initialize the counter code when DOM is ready

/***/ }),

/***/ 479:
/* unknown exports provided */
/* all exports used */
/*!******************************************************!*\
  !*** ./app/javascript/counter/components/counter.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// A simple counter example

var incrementNode = document.getElementById('increment');
var decrementNode = document.getElementById('decrement');
var inputNode = document.getElementById('counter');

var counter = {
  initialize: function initialize() {
    incrementNode.addEventListener('click', function (event) {
      event.preventDefault();
      var currentValue = inputNode.value;
      inputNode.value = parseInt(currentValue, 0) + 1;
    });

    decrementNode.addEventListener('click', function (event) {
      event.preventDefault();
      var currentValue = inputNode.value;
      if (currentValue > 0) {
        inputNode.value = parseInt(currentValue, 0) - 1;
      }
    });
  }
};

exports.default = counter;

/***/ }),

/***/ 634:
/* unknown exports provided */
/* all exports used */
/*!*****************************************************!*\
  !*** ./app/javascript/counter/styles/container.css ***!
  \*****************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 635:
/* unknown exports provided */
/* all exports used */
/*!**************************************************!*\
  !*** ./app/javascript/counter/styles/style.sass ***!
  \**************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 751:
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./app/javascript/bundles/counter.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ../counter */ 375);

/***/ })

/******/ });
//# sourceMappingURL=counter.js.map