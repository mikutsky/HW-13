/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _newHTTP__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./newHTTP */ \"./newHTTP.js\");\n// import request from './newHTTP';\n // console.log(http.apiKey)\n//Модуль для работы с новостным API\n\nvar newsService = function () {\n  return {\n    topHeadlines: function topHeadlines() {\n      var country = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : \"ua\";\n      var category = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : \"general\";\n      var cb = arguments.length > 2 ? arguments[2] : undefined;\n      _newHTTP__WEBPACK_IMPORTED_MODULE_0__[\"request\"](\"\".concat(_newHTTP__WEBPACK_IMPORTED_MODULE_0__[\"apiUrl\"], \"/top-headlines?country=\").concat(country, \"&category=\").concat(category, \"&apiKey=\").concat(_newHTTP__WEBPACK_IMPORTED_MODULE_0__[\"apiKey\"]), cb);\n    },\n    everything: function everything(text, cb) {\n      _newHTTP__WEBPACK_IMPORTED_MODULE_0__[\"request\"](\"\".concat(_newHTTP__WEBPACK_IMPORTED_MODULE_0__[\"apiUrl\"], \"/everything?q=\").concat(text, \"&apiKey=\").concat(_newHTTP__WEBPACK_IMPORTED_MODULE_0__[\"apiKey\"]), cb);\n    }\n  };\n}(); //Функция формирует и отправляет запрос на сервер, по параметрам указанным\n//пользователем в форме\n\n\nfunction loadNews() {\n  var selectCountry = document.querySelector(\"#country\").value;\n  var selectCategory = document.querySelector(\"#category\").value;\n  var inputQuery = document.querySelector(\"#query\").value;\n  if (inputQuery === \"\") newsService.topHeadlines(selectCountry, selectCategory, onGetResponse);else newsService.everything(inputQuery, onGetResponse);\n} //Функция-обработчик полученного ответа от сервера\n\n\nfunction onGetResponse(err, res) {\n  if (err) {\n    alert(err);\n    return;\n  }\n\n  if (!res.articles.length) {\n    alert(\"Новостей не найдено\");\n    return;\n  }\n\n  renderNews(res.articles);\n} //Функция выводит полученный список новостей\n\n\nfunction renderNews(newsItems) {\n  var fragment = \"\";\n  newsItems.forEach(function (item) {\n    var el = newsTemplate(item);\n    fragment += el;\n  });\n  newsContainer.insertAdjacentHTML(\"afterbegin\", fragment);\n} //Функция подготавливает полученную новость, оборачивает в шаблон\n\n\nfunction newsTemplate() {\n  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},\n      url = _ref.url,\n      title = _ref.title,\n      description = _ref.description,\n      urlToImage = _ref.urlToImage;\n\n  return \"\\n    <div class=\\\"col s12\\\">\\n      <div class=\\\"card\\\">\\n        <div class=\\\"card-image\\\">\\n          <img src=\\\"\".concat(urlToImage, \"\\\">\\n          <span class=\\\"card-title\\\">\").concat(title || \"\", \"</span>\\n        </div>\\n        <div class=\\\"card-content\\\">\\n          <p>\").concat(description || \"\", \"</p>\\n        </div>\\n        <div class=\\\"card-action\\\">\\n          <a href=\\\"\").concat(url, \"\\\">Read more</a>\\n        </div>\\n      </div>\\n    </div>\\n  \");\n} //Получаем указатели на элементы инициализируем скрипты,\n//загружаем стартовые новости\n\n\nvar newsContainer = document.querySelector(\".news-container .row\");\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  M.AutoInit();\n  loadNews();\n}); //Устанавливаем событие на submit формы\n\ndocument.forms[0].addEventListener(\"submit\", function (el) {\n  el.preventDefault();\n  newsContainer.innerHTML = \"\";\n  loadNews();\n});\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./newHTTP.js":
/*!********************!*\
  !*** ./newHTTP.js ***!
  \********************/
/*! exports provided: request, apiKey, apiUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"request\", function() { return request; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"apiKey\", function() { return apiKey; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"apiUrl\", function() { return apiUrl; });\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar apiKey = \"a483e3dbc3fd4ca5a460d940ec87a00a\";\nvar apiUrl = \"https://newsapi.org/v2\";\n\nfunction request(_x, _x2) {\n  return _request.apply(this, arguments);\n}\n\nfunction _request() {\n  _request = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(url, options) {\n    var response;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return fetch(url, options).then(function (response) {\n              if (!response.ok) {\n                return Promise.reject(response);\n              }\n\n              return response.json();\n            });\n\n          case 2:\n            response = _context.sent;\n            return _context.abrupt(\"return\", response);\n\n          case 4:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _request.apply(this, arguments);\n}\n\n\n\n//# sourceURL=webpack:///./newHTTP.js?");

/***/ })

/******/ });