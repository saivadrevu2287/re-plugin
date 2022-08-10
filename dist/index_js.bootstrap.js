'use strict'
;(self['webpackChunkre_plugin'] = self['webpackChunkre_plugin'] || []).push([
  ['index_js'],
  {
    /***/ './index.js':
      /*!******************!*\
  !*** ./index.js ***!
  \******************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__)
        /* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! preact */ './node_modules/preact/dist/preact.module.js'
          )
        /* harmony import */ var _src_App_jsx__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./src/App.jsx */ './src/App.jsx')

        var root = 'root'
        var errorMsg = 'Error: We could not locate element with id '.concat(
          root,
          ' to mount!'
        )
        console.log('Mounting on '.concat(root, '!'))
        var wrapper = document.getElementById(root)
        wrapper
          ? (0, preact__WEBPACK_IMPORTED_MODULE_0__.render)(
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                _src_App_jsx__WEBPACK_IMPORTED_MODULE_1__['default'],
                null
              ),
              wrapper
            )
          : console.log(errorMsg)

        /***/
      },

    /***/ './src/App.jsx':
      /*!*********************!*\
  !*** ./src/App.jsx ***!
  \*********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ App,
          /* harmony export */
        })
        /* harmony import */ var preact_router__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! preact-router */ './node_modules/preact-router/dist/preact-router.mjs'
          )
        /* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! preact */ './node_modules/preact/dist/preact.module.js'
          )
        /* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! preact/hooks */ './node_modules/preact/hooks/dist/hooks.module.js'
          )
        /* harmony import */ var _components_Login__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./components/Login */ './src/components/Login.jsx'
          )
        /* harmony import */ var _components_Signup__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ./components/Signup */ './src/components/Signup.jsx'
          )
        /* harmony import */ var _components_Confirm__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! ./components/Confirm */ './src/components/Confirm.jsx'
          )
        /* harmony import */ var _components_Profile__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! ./components/Profile */ './src/components/Profile.jsx'
          )
        /* harmony import */ var _components_Home__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            /*! ./components/Home */ './src/components/Home.jsx'
          )
        /* harmony import */ var _components_Logout__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            /*! ./components/Logout */ './src/components/Logout.jsx'
          )
        function _slicedToArray(arr, i) {
          return (
            _arrayWithHoles(arr) ||
            _iterableToArrayLimit(arr, i) ||
            _unsupportedIterableToArray(arr, i) ||
            _nonIterableRest()
          )
        }

        function _nonIterableRest() {
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
          )
        }

        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return
          if (typeof o === 'string') return _arrayLikeToArray(o, minLen)
          var n = Object.prototype.toString.call(o).slice(8, -1)
          if (n === 'Object' && o.constructor) n = o.constructor.name
          if (n === 'Map' || n === 'Set') return Array.from(o)
          if (
            n === 'Arguments' ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return _arrayLikeToArray(o, minLen)
        }

        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length
          for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i]
          }
          return arr2
        }

        function _iterableToArrayLimit(arr, i) {
          var _i =
            arr == null
              ? null
              : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) ||
                arr['@@iterator']
          if (_i == null) return
          var _arr = []
          var _n = true
          var _d = false
          var _s, _e
          try {
            for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value)
              if (i && _arr.length === i) break
            }
          } catch (err) {
            _d = true
            _e = err
          } finally {
            try {
              if (!_n && _i['return'] != null) _i['return']()
            } finally {
              if (_d) throw _e
            }
          }
          return _arr
        }

        function _arrayWithHoles(arr) {
          if (Array.isArray(arr)) return arr
        }

        function App(props) {
          var _useState = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useState)(null),
            _useState2 = _slicedToArray(_useState, 2),
            jwt = _useState2[0],
            setJwt = _useState2[1]

          ;(0, preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useEffect)(
            function () {},
            [jwt]
          )
          var loginOrLogout = jwt
            ? (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                preact__WEBPACK_IMPORTED_MODULE_1__.Fragment,
                null,
                (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                  'a',
                  {
                    href: '/profile',
                  },
                  (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                    'div',
                    {
                      className: 'nav-link-button ostrich-button',
                    },
                    'Profile'
                  )
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                  'a',
                  {
                    href: '/logout',
                  },
                  (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                    'div',
                    {
                      className: 'nav-link-button ostrich-button',
                    },
                    'Logout'
                  )
                )
              )
            : (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                preact__WEBPACK_IMPORTED_MODULE_1__.Fragment,
                null,
                (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                  'a',
                  {
                    href: '/',
                  },
                  (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                    'div',
                    {
                      className: 'nav-link-button ostrich-button',
                    },
                    ' Home'
                  )
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                  'a',
                  {
                    href: '/login',
                  },
                  (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                    'div',
                    {
                      className: 'nav-link-button ostrich-button',
                    },
                    'Login'
                  )
                )
              )
          return (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
            'div',
            null,
            (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
              'nav',
              {
                className: 'ostrich-container',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                'div',
                {
                  className: 'logo-container',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)('img', {
                  src: '/images/ostrich.new.png',
                  alt: 'ostrich',
                  height: '68px',
                }),
                (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                  'span',
                  null,
                  'Ostrich Real Estate Tools'
                )
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                'div',
                {
                  className: 'nav-link-buttons',
                },
                loginOrLogout
              )
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
              'main',
              null,
              (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                preact_router__WEBPACK_IMPORTED_MODULE_0__['default'],
                null,
                (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                  _components_Login__WEBPACK_IMPORTED_MODULE_3__['default'],
                  {
                    path: '/login',
                    setJwt: setJwt,
                  }
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                  _components_Signup__WEBPACK_IMPORTED_MODULE_4__['default'],
                  {
                    path: '/signup',
                  }
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                  _components_Confirm__WEBPACK_IMPORTED_MODULE_5__['default'],
                  {
                    path: '/confirm',
                  }
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                  _components_Profile__WEBPACK_IMPORTED_MODULE_6__['default'],
                  {
                    path: '/profile',
                    jwt: jwt,
                  }
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                  _components_Logout__WEBPACK_IMPORTED_MODULE_8__['default'],
                  {
                    path: '/logout',
                  }
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                  _components_Home__WEBPACK_IMPORTED_MODULE_7__['default'],
                  {
                    path: '/',
                  }
                )
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                'footer',
                {
                  class: 'align-center ostrich-container',
                },
                'Ostrich Tools Ltd.'
              )
            )
          )
        }

        /***/
      },

    /***/ './src/components/Confirm.jsx':
      /*!************************************!*\
  !*** ./src/components/Confirm.jsx ***!
  \************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ Confirm,
          /* harmony export */
        })
        /* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! preact */ './node_modules/preact/dist/preact.module.js'
          )
        /* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! preact/hooks */ './node_modules/preact/hooks/dist/hooks.module.js'
          )
        /* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! axios */ './node_modules/axios/index.js')
        /* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default =
          /*#__PURE__*/ __webpack_require__.n(
            axios__WEBPACK_IMPORTED_MODULE_2__
          )
        /* harmony import */ var preact_router__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! preact-router */ './node_modules/preact-router/dist/preact-router.mjs'
          )
        /* harmony import */ var _subroutines_utils__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ../subroutines/utils */ './src/subroutines/utils.js'
          )
        function _slicedToArray(arr, i) {
          return (
            _arrayWithHoles(arr) ||
            _iterableToArrayLimit(arr, i) ||
            _unsupportedIterableToArray(arr, i) ||
            _nonIterableRest()
          )
        }

        function _nonIterableRest() {
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
          )
        }

        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return
          if (typeof o === 'string') return _arrayLikeToArray(o, minLen)
          var n = Object.prototype.toString.call(o).slice(8, -1)
          if (n === 'Object' && o.constructor) n = o.constructor.name
          if (n === 'Map' || n === 'Set') return Array.from(o)
          if (
            n === 'Arguments' ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return _arrayLikeToArray(o, minLen)
        }

        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length
          for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i]
          }
          return arr2
        }

        function _iterableToArrayLimit(arr, i) {
          var _i =
            arr == null
              ? null
              : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) ||
                arr['@@iterator']
          if (_i == null) return
          var _arr = []
          var _n = true
          var _d = false
          var _s, _e
          try {
            for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value)
              if (i && _arr.length === i) break
            }
          } catch (err) {
            _d = true
            _e = err
          } finally {
            try {
              if (!_n && _i['return'] != null) _i['return']()
            } finally {
              if (_d) throw _e
            }
          }
          return _arr
        }

        function _arrayWithHoles(arr) {
          if (Array.isArray(arr)) return arr
        }

        var eliminateEvent = function eliminateEvent(callback) {
          return function (event) {
            return callback(event.target.value)
          }
        }

        var verifyCodeUrl =
          'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1/auth/verify'
        var resendCodeUrl =
          'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1/auth/resend-code'
        function Confirm(props) {
          var emailFromQp = (0,
          _subroutines_utils__WEBPACK_IMPORTED_MODULE_4__.parseQueryParams)(
            window.location.search
          ).email

          var _useState = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            _useState2 = _slicedToArray(_useState, 2),
            code = _useState2[0],
            setCode = _useState2[1]

          var _useState3 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            _useState4 = _slicedToArray(_useState3, 2),
            errorMessage = _useState4[0],
            setErrorMessage = _useState4[1]

          var verify = function verify() {
            axios__WEBPACK_IMPORTED_MODULE_2___default()
              .post(verifyCodeUrl, {
                username: emailFromQp,
                code: code,
              })
              .then(function (r) {
                ;(0,
                preact_router__WEBPACK_IMPORTED_MODULE_3__.route)('/login?email='.concat(emailFromQp), true)
              })
              ['catch'](function (e) {
                setErrorMessage(e.response.data.message)
              })
          }

          var resendCode = function resendCode() {
            axios__WEBPACK_IMPORTED_MODULE_2___default()
              .post(resendCodeUrl, {
                username: emailFromQp,
              })
              .then(function (r) {
                setErrorMessage(r.data.message)
              })
              ['catch'](function (e) {
                setErrorMessage(e.response.data.message)
              })
          }

          return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
            'div',
            {
              id: 'verify-container',
            },
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'h5',
              null,
              'Please Enter the Verification Code sent to your Email (',
              emailFromQp,
              ').'
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                id: 'login-email-container',
                class: 'form-input-container',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  htmlFor: 'code',
                },
                'Code:'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                id: 'code-input',
                name: 'code',
                class: 'input',
                value: code,
                onInput: eliminateEvent(setCode),
              })
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'button',
              {
                type: 'submit',
                id: 'submit-verify',
                onClick: verify,
              },
              'Submit'
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'button',
              {
                id: 'resend-code',
                onClick: resendCode,
              },
              'Resend Code'
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'p',
              {
                class: 'error',
              },
              errorMessage
            )
          )
        }

        /***/
      },

    /***/ './src/components/Home.jsx':
      /*!*********************************!*\
  !*** ./src/components/Home.jsx ***!
  \*********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ Home,
          /* harmony export */
        })
        /* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! preact */ './node_modules/preact/dist/preact.module.js'
          )

        function Home(props) {
          return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
            'div',
            null,
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'h2',
              null,
              'Automate your Real Estate Workflow with Ostrich Tool Suite!'
            )
          )
        }

        /***/
      },

    /***/ './src/components/Login.jsx':
      /*!**********************************!*\
  !*** ./src/components/Login.jsx ***!
  \**********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ Login,
          /* harmony export */
        })
        /* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! preact */ './node_modules/preact/dist/preact.module.js'
          )
        /* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! preact/hooks */ './node_modules/preact/hooks/dist/hooks.module.js'
          )
        /* harmony import */ var preact_router__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! preact-router */ './node_modules/preact-router/dist/preact-router.mjs'
          )
        /* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! axios */ './node_modules/axios/index.js')
        /* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default =
          /*#__PURE__*/ __webpack_require__.n(
            axios__WEBPACK_IMPORTED_MODULE_3__
          )
        /* harmony import */ var _subroutines_utils__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ../subroutines/utils */ './src/subroutines/utils.js'
          )
        function _slicedToArray(arr, i) {
          return (
            _arrayWithHoles(arr) ||
            _iterableToArrayLimit(arr, i) ||
            _unsupportedIterableToArray(arr, i) ||
            _nonIterableRest()
          )
        }

        function _nonIterableRest() {
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
          )
        }

        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return
          if (typeof o === 'string') return _arrayLikeToArray(o, minLen)
          var n = Object.prototype.toString.call(o).slice(8, -1)
          if (n === 'Object' && o.constructor) n = o.constructor.name
          if (n === 'Map' || n === 'Set') return Array.from(o)
          if (
            n === 'Arguments' ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return _arrayLikeToArray(o, minLen)
        }

        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length
          for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i]
          }
          return arr2
        }

        function _iterableToArrayLimit(arr, i) {
          var _i =
            arr == null
              ? null
              : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) ||
                arr['@@iterator']
          if (_i == null) return
          var _arr = []
          var _n = true
          var _d = false
          var _s, _e
          try {
            for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value)
              if (i && _arr.length === i) break
            }
          } catch (err) {
            _d = true
            _e = err
          } finally {
            try {
              if (!_n && _i['return'] != null) _i['return']()
            } finally {
              if (_d) throw _e
            }
          }
          return _arr
        }

        function _arrayWithHoles(arr) {
          if (Array.isArray(arr)) return arr
        }

        var eliminateEvent = function eliminateEvent(callback) {
          return function (event) {
            return callback(event.target.value)
          }
        }

        var loginUrl =
          'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1/auth/login'
        function Login(props) {
          var setJwt = props.setJwt
          var emailFromQp = (0,
          _subroutines_utils__WEBPACK_IMPORTED_MODULE_4__.parseQueryParams)(
            window.location.search
          ).email

          var _useState = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(emailFromQp),
            _useState2 = _slicedToArray(_useState, 2),
            email = _useState2[0],
            setEmail = _useState2[1]

          var _useState3 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            _useState4 = _slicedToArray(_useState3, 2),
            password = _useState4[0],
            setPassword = _useState4[1]

          var _useState5 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            _useState6 = _slicedToArray(_useState5, 2),
            errorMessage = _useState6[0],
            setErrorMessage = _useState6[1]

          var login = function login() {
            axios__WEBPACK_IMPORTED_MODULE_3___default()
              .post(loginUrl, {
                username: email,
                password: password,
              })
              .then(function (r) {
                setJwt(r.data)
                ;(0,
                preact_router__WEBPACK_IMPORTED_MODULE_2__.route)('/profile', true)
              })
              ['catch'](function (e) {
                setErrorMessage(e.response.data.message)
              })
          }

          return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
            'div',
            {
              className: 'align-center super-margin-top',
            },
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('h4', null, 'Login'),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className: 'thin-container ostrich-container',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  id: 'login-email-container',
                  class: 'form-input-container',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'label',
                  {
                    htmlFor: 'username',
                  },
                  'Email:'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  null,
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                    id: 'email-input',
                    name: 'username',
                    class: 'input',
                    value: email,
                    onInput: eliminateEvent(setEmail),
                  })
                )
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  id: 'login-email-container',
                  class: 'form-input-container',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'label',
                  {
                    htmlFor: 'password',
                  },
                  'Password:'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  null,
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                    id: 'password-input',
                    name: 'password',
                    type: 'password',
                    class: 'input',
                    value: password,
                    onInput: eliminateEvent(setPassword),
                  })
                )
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'p',
                null,
                errorMessage
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'button',
                {
                  className: 'ostrich-button',
                  type: 'submit',
                  id: 'submit-login',
                  onClick: login,
                },
                'Login'
              )
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'a',
              {
                href: '/google',
              },
              'Continue With Google'
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'h6',
              null,
              'Not Signed Up? ',
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'a',
                {
                  href: '/signup',
                },
                'Sign up here!'
              )
            )
          )
        }

        /***/
      },

    /***/ './src/components/Logout.jsx':
      /*!***********************************!*\
  !*** ./src/components/Logout.jsx ***!
  \***********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ Logout,
          /* harmony export */
        })
        /* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! preact */ './node_modules/preact/dist/preact.module.js'
          )
        /* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! preact/hooks */ './node_modules/preact/hooks/dist/hooks.module.js'
          )

        function Logout(props) {
          var setJwt = props.setJwt
          ;(0, preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(
            function () {
              setJwt(null)
            },
            []
          )
          return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
            'div',
            null,
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'h2',
              null,
              'You are logged out!'
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'a',
              {
                href: '/login',
              },
              'Log Back In'
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'a',
              {
                href: '/',
              },
              'Return Home'
            )
          )
        }

        /***/
      },

    /***/ './src/components/Profile.jsx':
      /*!************************************!*\
  !*** ./src/components/Profile.jsx ***!
  \************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ Profile,
          /* harmony export */
        })
        /* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! preact */ './node_modules/preact/dist/preact.module.js'
          )
        /* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! preact/hooks */ './node_modules/preact/hooks/dist/hooks.module.js'
          )
        /* harmony import */ var preact_router__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! preact-router */ './node_modules/preact-router/dist/preact-router.mjs'
          )
        /* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! axios */ './node_modules/axios/index.js')
        /* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default =
          /*#__PURE__*/ __webpack_require__.n(
            axios__WEBPACK_IMPORTED_MODULE_3__
          )
        /* harmony import */ var _subroutines_utils__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ../subroutines/utils */ './src/subroutines/utils.js'
          )
        function _slicedToArray(arr, i) {
          return (
            _arrayWithHoles(arr) ||
            _iterableToArrayLimit(arr, i) ||
            _unsupportedIterableToArray(arr, i) ||
            _nonIterableRest()
          )
        }

        function _nonIterableRest() {
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
          )
        }

        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return
          if (typeof o === 'string') return _arrayLikeToArray(o, minLen)
          var n = Object.prototype.toString.call(o).slice(8, -1)
          if (n === 'Object' && o.constructor) n = o.constructor.name
          if (n === 'Map' || n === 'Set') return Array.from(o)
          if (
            n === 'Arguments' ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return _arrayLikeToArray(o, minLen)
        }

        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length
          for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i]
          }
          return arr2
        }

        function _iterableToArrayLimit(arr, i) {
          var _i =
            arr == null
              ? null
              : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) ||
                arr['@@iterator']
          if (_i == null) return
          var _arr = []
          var _n = true
          var _d = false
          var _s, _e
          try {
            for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value)
              if (i && _arr.length === i) break
            }
          } catch (err) {
            _d = true
            _e = err
          } finally {
            try {
              if (!_n && _i['return'] != null) _i['return']()
            } finally {
              if (_d) throw _e
            }
          }
          return _arr
        }

        function _arrayWithHoles(arr) {
          if (Array.isArray(arr)) return arr
        }

        var eliminateEvent = function eliminateEvent(callback) {
          return function (event) {
            return callback(event.target.value)
          }
        }

        var backendUrl =
          'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1/api'
        function Profile(props) {
          var jwt = props.jwt

          var _useState = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            _useState2 = _slicedToArray(_useState, 2),
            errorMessage = _useState2[0],
            setErrorMessage = _useState2[1]

          var _useState3 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            _useState4 = _slicedToArray(_useState3, 2),
            successMessage = _useState4[0],
            setSuccessMessage = _useState4[1]

          var _useState5 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
            _useState6 = _slicedToArray(_useState5, 2),
            scheduledEmails = _useState6[0],
            setScheduledEmails = _useState6[1]

          var _useState7 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
            _useState8 = _slicedToArray(_useState7, 2),
            searchResults = _useState8[0],
            setSearchResults = _useState8[1]

          var _useState9 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(60),
            _useState10 = _slicedToArray(_useState9, 2),
            insurance = _useState10[0],
            setInsurance = _useState10[1]

          var _useState11 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(5),
            _useState12 = _slicedToArray(_useState11, 2),
            vacancy = _useState12[0],
            setVacancy = _useState12[1]

          var _useState13 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(4),
            _useState14 = _slicedToArray(_useState13, 2),
            propertyManagement = _useState14[0],
            setPropertyManagement = _useState14[1]

          var _useState15 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(5),
            _useState16 = _slicedToArray(_useState15, 2),
            capex = _useState16[0],
            setCapex = _useState16[1]

          var _useState17 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(5),
            _useState18 = _slicedToArray(_useState17, 2),
            repairs = _useState18[0],
            setRepairs = _useState18[1]

          var _useState19 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
            _useState20 = _slicedToArray(_useState19, 2),
            utilities = _useState20[0],
            setUtilities = _useState20[1]

          var _useState21 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(25),
            _useState22 = _slicedToArray(_useState21, 2),
            downPayment = _useState22[0],
            setDownPayment = _useState22[1]

          var _useState23 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(4),
            _useState24 = _slicedToArray(_useState23, 2),
            closingCosts = _useState24[0],
            setClosingCosts = _useState24[1]

          var _useState25 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(4),
            _useState26 = _slicedToArray(_useState25, 2),
            loanInterest = _useState26[0],
            setLoanInterest = _useState26[1]

          var _useState27 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(240),
            _useState28 = _slicedToArray(_useState27, 2),
            loanMonths = _useState28[0],
            setLoanMonths = _useState28[1]

          var _useState29 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
            _useState30 = _slicedToArray(_useState29, 2),
            additionalMonthlyExpenses = _useState30[0],
            setAdditionalMonthlyExpenses = _useState30[1]

          var _useState31 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
            _useState32 = _slicedToArray(_useState31, 2),
            hideCocCalculations = _useState32[0],
            setHideCocCalculations = _useState32[1]

          var _useState33 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
            _useState34 = _slicedToArray(_useState33, 2),
            minPrice = _useState34[0],
            setMinPrice = _useState34[1]

          var _useState35 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
            _useState36 = _slicedToArray(_useState35, 2),
            maxPrice = _useState36[0],
            setMaxPrice = _useState36[1]

          var _useState37 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
            _useState38 = _slicedToArray(_useState37, 2),
            searchParams = _useState38[0],
            setSearchParams = _useState38[1]

          var _useState39 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
            _useState40 = _slicedToArray(_useState39, 2),
            numBedrooms = _useState40[0],
            setNumBedrooms = _useState40[1]

          var email = (0,
          _subroutines_utils__WEBPACK_IMPORTED_MODULE_4__.parseJwt)(
            jwt.id_token
          ).email

          var loadScheduledEmails = function loadScheduledEmails() {
            axios__WEBPACK_IMPORTED_MODULE_3___default()
              .get(''.concat(backendUrl, '/emailers'))
              .then(function (r) {
                setScheduledEmails(r.data)
              })
              ['catch'](function (e) {
                setErrorMessage(e.response.data.message)
              })
          }

          var formatNumber = function formatNumber(number) {
            return number ? '$'.concat(number.toLocaleString()) : 'x'
          }

          var submitScheduledEmails = function submitScheduledEmails() {
            try {
              axios__WEBPACK_IMPORTED_MODULE_3___default()
                .post(''.concat(backendUrl, '/emailers'), {
                  insurance: parseInt(insurance),
                  vacancy: parseInt(vacancy),
                  property_management: parseInt(propertyManagement),
                  capex: parseInt(capex),
                  repairs: parseInt(repairs),
                  utilities: parseInt(utilities),
                  down_payment: parseInt(downPayment),
                  closing_cost: parseInt(closingCosts),
                  loan_interest: parseInt(loanInterest),
                  loan_months: parseInt(loanMonths),
                  additional_monthly_expenses: parseInt(
                    additionalMonthlyExpenses
                  ),
                  min_price: parseInt(minPrice),
                  max_price: parseInt(maxPrice),
                  search_param: searchParams,
                  no_bedrooms: parseInt(numBedrooms),
                  frequency: 'Daily',
                })
                .then(function (r) {
                  setSuccessMessage(Math.random())
                })
                ['catch'](function (e) {
                  setSearchResults(null)
                  setErrorMessage(e.response.data.message)
                })
            } catch (error) {
              setErrorMessage(error.message)
            }
          }

          var testEmailerParams = function testEmailerParams() {
            if (!searchParams) {
              setErrorMessage('Need to fill out Search Parameters')
            } else {
              axios__WEBPACK_IMPORTED_MODULE_3___default()
                .get(
                  ''
                    .concat(
                      backendUrl,
                      '/emailers/test-search-param?search_param='
                    )
                    .concat(encodeURI(searchParams), '&min_price=')
                    .concat(minPrice, '&max_price=')
                    .concat(maxPrice, '&no_bedrooms=')
                    .concat(numBedrooms)
                )
                .then(function (r) {
                  setSearchResults(r.data)
                  setErrorMessage('')
                })
                ['catch'](function (e) {
                  setSearchResults(null)
                  setErrorMessage(e.response.data.message)
                })
            }
          }

          ;(0, preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(
            function () {
              axios__WEBPACK_IMPORTED_MODULE_3___default().defaults.headers.common.Authorization =
                'Bearer '.concat(jwt.id_token)
              loadScheduledEmails()
            },
            [successMessage]
          )
          var scheduledEmailList = !scheduledEmails
            ? (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'h3',
                null,
                'Loading...'
              )
            : scheduledEmails.map(function (scheduledEmail, i) {
                var handleDeleteButton = function handleDeleteButton() {
                  axios__WEBPACK_IMPORTED_MODULE_3___default()
                    ['delete'](
                      ''
                        .concat(backendUrl, '/emailers/')
                        .concat(scheduledEmail.id)
                    )
                    .then(function (r) {
                      setSuccessMessage(Math.random())
                    })
                    ['catch'](function (e) {
                      setSearchResults(null)
                      setErrorMessage(e.response.data.message)
                    })
                }

                return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  {
                    key: i,
                    className: 'scheduled-emailer-element',
                  },
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'p',
                    null,
                    scheduledEmail.search_param,
                    ',',
                    ' ',
                    formatNumber(scheduledEmail.min_price),
                    '-',
                    formatNumber(scheduledEmail.max_price)
                  ),
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'button',
                    {
                      className: 'ostrich-button',
                      onClick: handleDeleteButton,
                    },
                    'Delete'
                  )
                )
              })

          var flipHideCocCalculations = function flipHideCocCalculations() {
            return setHideCocCalculations(!hideCocCalculations)
          }

          var cocCalculationParams =
            !hideCocCalculations &&
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              null,
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  id: 'insurance-container',
                  className: 'form-input-container',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'label',
                  {
                    htmlFor: 'insurance-input',
                  },
                  'Insurance:'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  null,
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                    id: 'insurance-input',
                    type: 'number',
                    class: 'input',
                    value: insurance,
                    onInput: eliminateEvent(setInsurance),
                  }),
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '$')
                )
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  id: 'vacancy-container',
                  className: 'form-input-container',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'label',
                  {
                    htmlFor: 'vacancy-input',
                  },
                  'Vacancy:'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  null,
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                    id: 'vacancy-input',
                    type: 'number',
                    class: 'input',
                    value: vacancy,
                    onInput: eliminateEvent(setVacancy),
                  }),
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '%')
                )
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  id: 'property-container',
                  className: 'form-input-container',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'label',
                  {
                    htmlFor: 'property-input',
                  },
                  'Property Management:'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  null,
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                    id: 'property-input',
                    type: 'number',
                    class: 'input',
                    value: propertyManagement,
                    onInput: eliminateEvent(setPropertyManagement),
                  }),
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '%')
                )
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  id: 'capex-container',
                  className: 'form-input-container',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'label',
                  {
                    htmlFor: 'capex-input',
                  },
                  'Capex:'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  null,
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                    id: 'capex-input',
                    type: 'number',
                    class: 'input',
                    value: capex,
                    onInput: eliminateEvent(setCapex),
                  }),
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '%')
                )
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  id: 'repairs-container',
                  className: 'form-input-container',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'label',
                  {
                    htmlFor: 'repairs-input',
                  },
                  'Repairs:'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  null,
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                    id: 'repairs-input',
                    type: 'number',
                    class: 'input',
                    value: repairs,
                    onInput: eliminateEvent(setRepairs),
                  }),
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '%')
                )
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  id: 'utilities-container',
                  className: 'form-input-container',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'label',
                  {
                    htmlFor: 'utilities-input',
                  },
                  'Utilities:'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  null,
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                    id: 'utilities-input',
                    type: 'number',
                    class: 'input',
                    value: utilities,
                    onInput: eliminateEvent(setUtilities),
                  }),
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '$')
                )
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  id: 'down-payment-container',
                  className: 'form-input-container',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'label',
                  {
                    htmlFor: 'down-payment-input',
                  },
                  'Down Payment:'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  null,
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                    id: 'down-payment-input',
                    type: 'number',
                    class: 'input',
                    value: downPayment,
                    onInput: eliminateEvent(setDownPayment),
                  }),
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '%')
                )
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  id: 'closing-cost-container',
                  className: 'form-input-container',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'label',
                  {
                    htmlFor: 'closing-cost-input',
                  },
                  'Closing Cost:'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  null,
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                    id: 'closing-cost-input',
                    type: 'number',
                    class: 'input',
                    value: closingCosts,
                    onInput: eliminateEvent(setClosingCosts),
                  }),
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '%')
                )
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  id: 'loan-interest-container',
                  className: 'form-input-container',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'label',
                  {
                    htmlFor: 'loan-interest-input',
                  },
                  'Loan Interest:'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  null,
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                    id: 'loan-interest-input',
                    type: 'number',
                    class: 'input',
                    value: loanInterest,
                    onInput: eliminateEvent(setLoanInterest),
                  }),
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '%')
                )
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  id: 'loan-months-container',
                  className: 'form-input-container',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'label',
                  {
                    htmlFor: 'loan-months-input',
                  },
                  'Loan Months:'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  null,
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                    id: 'loan-months-input',
                    type: 'number',
                    class: 'input',
                    value: loanMonths,
                    onInput: eliminateEvent(setLoanMonths),
                  }),
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, 'mos')
                )
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  id: 'additional-monthly-expenses-container',
                  className: 'form-input-container',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'label',
                  {
                    htmlFor: 'additional-monthly-expenses-input',
                  },
                  'Additional Monthly Expenses:'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  null,
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                    id: 'additional-monthly-expenses-input',
                    type: 'number',
                    class: 'input',
                    value: additionalMonthlyExpenses,
                    onInput: eliminateEvent(setAdditionalMonthlyExpenses),
                  }),
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '$')
                )
              )
            )
          var searchResultsElements =
            searchResults &&
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              null,
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'h5',
                null,
                'Search Results'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'p',
                null,
                'If you are okay with these results, press submit!'
              ),
              searchResults.map(function (address, i) {
                return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  {
                    key: i,
                    className: 'scheduled-emailer-element',
                  },
                  address
                )
              })
            )
          return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
            'div',
            {
              className: 'page',
            },
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className: 'card',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'h5',
                null,
                'Welcome!'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('h5', null, email)
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className: 'profile-container align-center',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  className: 'fourty-five break-to-full',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'h5',
                  null,
                  'Schedule a New Email'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  {
                    className: 'ostrich-container padded',
                  },
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'div',
                    {
                      id: 'search-params-container',
                      className: 'form-input-container',
                    },
                    (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                      'label',
                      {
                        htmlFor: 'search-params-input',
                      },
                      'Search Parameters:'
                    ),
                    (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                      'div',
                      null,
                      (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                        id: 'search-params-input',
                        value: searchParams,
                        class: 'input',
                        onInput: eliminateEvent(setSearchParams),
                      })
                    )
                  ),
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'div',
                    {
                      id: 'min-price-container',
                      className: 'form-input-container',
                    },
                    (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                      'label',
                      {
                        htmlFor: 'min-price-input',
                      },
                      'Minimum Price:'
                    ),
                    (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                      'div',
                      null,
                      (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                        id: 'min-price-input',
                        type: 'number',
                        class: 'input',
                        value: minPrice,
                        onInput: eliminateEvent(setMinPrice),
                      }),
                      (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '$')
                    )
                  ),
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'div',
                    {
                      id: 'max-price-container',
                      className: 'form-input-container',
                    },
                    (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                      'label',
                      {
                        htmlFor: 'max-price-input',
                      },
                      'Maximum Price:'
                    ),
                    (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                      'div',
                      null,
                      (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                        id: 'max-price-input',
                        type: 'number',
                        class: 'input',
                        value: maxPrice,
                        onInput: eliminateEvent(setMaxPrice),
                      }),
                      (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '$')
                    )
                  ),
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'div',
                    {
                      id: 'num-bedrooms-container',
                      className: 'form-input-container',
                    },
                    (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                      'label',
                      {
                        htmlFor: 'num-bedrooms-input',
                      },
                      'Num. Bedrooms:'
                    ),
                    (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                      'div',
                      null,
                      (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                        id: 'num-bedrooms-input',
                        type: 'number',
                        class: 'input',
                        value: numBedrooms,
                        onInput: eliminateEvent(setNumBedrooms),
                      })
                    )
                  ),
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'span',
                    {
                      onClick: flipHideCocCalculations,
                      className: 'plain-button ostrich-button',
                    },
                    hideCocCalculations ? 'Show' : 'Hide',
                    ' Calculation Params'
                  ),
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'div',
                    {
                      className: 'personal-space-top',
                    },
                    cocCalculationParams
                  ),
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'div',
                    {
                      className: 'buttons',
                    },
                    (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                      'button',
                      {
                        className: 'ostrich-button',
                        onClick: submitScheduledEmails,
                      },
                      'Submit'
                    ),
                    (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                      'button',
                      {
                        className: 'ostrich-button',
                        onClick: testEmailerParams,
                      },
                      'Test these params!'
                    )
                  )
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('br', null),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'h6',
                  null,
                  'Hint: Test your search before submitting. This will help you dial in your parameters.'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('br', null),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('br', null)
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  className: 'two-fifths break-to-full',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'h5',
                  null,
                  'Scheduled Emails \u2709\uFE0F'
                ),
                scheduledEmailList,
                searchResultsElements
              )
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'p',
              {
                className: 'error',
              },
              errorMessage
            )
          )
        }

        /***/
      },

    /***/ './src/components/Signup.jsx':
      /*!***********************************!*\
  !*** ./src/components/Signup.jsx ***!
  \***********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ Signup,
          /* harmony export */
        })
        /* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! preact */ './node_modules/preact/dist/preact.module.js'
          )
        /* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! preact/hooks */ './node_modules/preact/hooks/dist/hooks.module.js'
          )
        /* harmony import */ var preact_router__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! preact-router */ './node_modules/preact-router/dist/preact-router.mjs'
          )
        /* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! axios */ './node_modules/axios/index.js')
        /* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default =
          /*#__PURE__*/ __webpack_require__.n(
            axios__WEBPACK_IMPORTED_MODULE_3__
          )
        function _slicedToArray(arr, i) {
          return (
            _arrayWithHoles(arr) ||
            _iterableToArrayLimit(arr, i) ||
            _unsupportedIterableToArray(arr, i) ||
            _nonIterableRest()
          )
        }

        function _nonIterableRest() {
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
          )
        }

        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return
          if (typeof o === 'string') return _arrayLikeToArray(o, minLen)
          var n = Object.prototype.toString.call(o).slice(8, -1)
          if (n === 'Object' && o.constructor) n = o.constructor.name
          if (n === 'Map' || n === 'Set') return Array.from(o)
          if (
            n === 'Arguments' ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return _arrayLikeToArray(o, minLen)
        }

        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length
          for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i]
          }
          return arr2
        }

        function _iterableToArrayLimit(arr, i) {
          var _i =
            arr == null
              ? null
              : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) ||
                arr['@@iterator']
          if (_i == null) return
          var _arr = []
          var _n = true
          var _d = false
          var _s, _e
          try {
            for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value)
              if (i && _arr.length === i) break
            }
          } catch (err) {
            _d = true
            _e = err
          } finally {
            try {
              if (!_n && _i['return'] != null) _i['return']()
            } finally {
              if (_d) throw _e
            }
          }
          return _arr
        }

        function _arrayWithHoles(arr) {
          if (Array.isArray(arr)) return arr
        }

        var eliminateEvent = function eliminateEvent(callback) {
          return function (event) {
            return callback(event.target.value)
          }
        }

        var signupUrl =
          'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1/auth/sign-up'
        function Signup(props) {
          var proceedWithGoogle = props.proceedWithGoogle

          var _useState = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            _useState2 = _slicedToArray(_useState, 2),
            email = _useState2[0],
            setEmail = _useState2[1]

          var _useState3 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            _useState4 = _slicedToArray(_useState3, 2),
            password = _useState4[0],
            setPassword = _useState4[1]

          var _useState5 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            _useState6 = _slicedToArray(_useState5, 2),
            confirmPassword = _useState6[0],
            setConfirmPassword = _useState6[1]

          var _useState7 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            _useState8 = _slicedToArray(_useState7, 2),
            errorMessage = _useState8[0],
            setErrorMessage = _useState8[1]

          var signUp = function signUp() {
            if (password != confirmPassword) {
              setErrorMessage('Passwords do not match!')
            } else {
              axios__WEBPACK_IMPORTED_MODULE_3___default()
                .post(signupUrl, {
                  username: email,
                  password: password,
                })
                .then(function (r) {
                  ;(0,
                  preact_router__WEBPACK_IMPORTED_MODULE_2__.route)('/confirm?email='.concat(email), true)
                })
                ['catch'](function (e) {
                  setErrorMessage(e.response.data.message)
                })
            }
          }

          return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
            'div',
            {
              className: 'align-center super-margin-top',
            },
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('h4', null, 'Sign Up'),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className: 'thin-container ostrich-container',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  id: 'login-email-container',
                  class: 'form-input-container',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'label',
                  {
                    htmlFor: 'username',
                  },
                  'Email:'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  null,
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                    id: 'email-input',
                    name: 'username',
                    class: 'input',
                    value: email,
                    onInput: eliminateEvent(setEmail),
                  })
                )
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  id: 'login-email-container',
                  class: 'form-input-container',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'label',
                  {
                    htmlFor: 'password',
                  },
                  'Password:'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  null,
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                    id: 'password-input',
                    name: 'password',
                    type: 'password',
                    class: 'input',
                    value: password,
                    onInput: eliminateEvent(setPassword),
                  })
                )
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  id: 'login-email-container',
                  class: 'form-input-container',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'label',
                  {
                    htmlFor: 'confirm-password',
                  },
                  'Confirm Password:'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  null,
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                    id: 'password-input',
                    name: 'confirm-password',
                    type: 'password',
                    value: confirmPassword,
                    onInput: eliminateEvent(setConfirmPassword),
                  })
                )
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'p',
                null,
                errorMessage
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'button',
                {
                  className: 'ostrich-button',
                  type: 'submit',
                  id: 'submit-signup',
                  onClick: signUp,
                },
                'Sign Up'
              )
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'a',
              {
                href: '/google',
              },
              'Continue With Google'
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'h6',
              null,
              'Already Signed Up? ',
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'a',
                {
                  href: '/login',
                },
                'Log in here!'
              )
            )
          )
        }

        /***/
      },

    /***/ './src/subroutines/utils.js':
      /*!**********************************!*\
  !*** ./src/subroutines/utils.js ***!
  \**********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ dollars: () => /* binding */ dollars,
          /* harmony export */ handleCopy: () => /* binding */ handleCopy,
          /* harmony export */ monthlyDollars: () =>
            /* binding */ monthlyDollars,
          /* harmony export */ parseJwt: () => /* binding */ parseJwt,
          /* harmony export */ parseQueryParams: () =>
            /* binding */ parseQueryParams,
          /* harmony export */
        })
        var handleCopy = function handleCopy(calculations, csvSeparator) {
          var toCsv = function toCsv(obj) {
            return Object.keys(obj).reduce(function (acc, key) {
              return ''.concat(acc).concat(obj[key]).concat(csvSeparator)
            }, '')
          }

          var copy = function copy(e) {
            e.preventDefault()
            var text = toCsv(calculations)
            console.log({
              m: 'handleCopy',
              text: text,
            })

            if (e.clipboardData) {
              e.clipboardData.setData('text/plain', text)
            } else if (window.clipboardData) {
              window.clipboardData.setData('Text', text)
            }
          }

          window.addEventListener('copy', copy)
          document.execCommand('copy')
          window.removeEventListener('copy', copy)
        }
        var monthlyDollars = function monthlyDollars(n) {
          return isNaN(n) ? 'N/A' : '$'.concat(n.toLocaleString(), '/mo')
        }
        var dollars = function dollars(n) {
          return isNaN(n) ? 'N/A' : '$'.concat(n.toLocaleString())
        }
        var parseJwt = function parseJwt(token) {
          var base64Url = token.split('.')[1]
          var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
          var jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
              })
              .join('')
          )
          return JSON.parse(jsonPayload)
        }
        var parseQueryParams = function parseQueryParams(search) {
          return search
            .slice(1)
            .split('&')
            .map(function (e) {
              return e.split('=')
            })
            .reduce(function (acc, pair) {
              acc[pair[0]] = pair[1]
              return acc
            }, {})
        }

        /***/
      },
  },
])
//# sourceMappingURL=index_js.bootstrap.js.map
