/******/ ;(() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ './node_modules/axios/index.js':
      /*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        module.exports = __webpack_require__(
          /*! ./lib/axios */ './node_modules/axios/lib/axios.js'
        )

        /***/
      },

    /***/ './node_modules/axios/lib/adapters/xhr.js':
      /*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        'use strict'

        var utils = __webpack_require__(
          /*! ./../utils */ './node_modules/axios/lib/utils.js'
        )
        var settle = __webpack_require__(
          /*! ./../core/settle */ './node_modules/axios/lib/core/settle.js'
        )
        var cookies = __webpack_require__(
          /*! ./../helpers/cookies */ './node_modules/axios/lib/helpers/cookies.js'
        )
        var buildURL = __webpack_require__(
          /*! ./../helpers/buildURL */ './node_modules/axios/lib/helpers/buildURL.js'
        )
        var buildFullPath = __webpack_require__(
          /*! ../core/buildFullPath */ './node_modules/axios/lib/core/buildFullPath.js'
        )
        var parseHeaders = __webpack_require__(
          /*! ./../helpers/parseHeaders */ './node_modules/axios/lib/helpers/parseHeaders.js'
        )
        var isURLSameOrigin = __webpack_require__(
          /*! ./../helpers/isURLSameOrigin */ './node_modules/axios/lib/helpers/isURLSameOrigin.js'
        )
        var transitionalDefaults = __webpack_require__(
          /*! ../defaults/transitional */ './node_modules/axios/lib/defaults/transitional.js'
        )
        var AxiosError = __webpack_require__(
          /*! ../core/AxiosError */ './node_modules/axios/lib/core/AxiosError.js'
        )
        var CanceledError = __webpack_require__(
          /*! ../cancel/CanceledError */ './node_modules/axios/lib/cancel/CanceledError.js'
        )
        var parseProtocol = __webpack_require__(
          /*! ../helpers/parseProtocol */ './node_modules/axios/lib/helpers/parseProtocol.js'
        )

        module.exports = function xhrAdapter(config) {
          return new Promise(function dispatchXhrRequest(resolve, reject) {
            var requestData = config.data
            var requestHeaders = config.headers
            var responseType = config.responseType
            var onCanceled
            function done() {
              if (config.cancelToken) {
                config.cancelToken.unsubscribe(onCanceled)
              }

              if (config.signal) {
                config.signal.removeEventListener('abort', onCanceled)
              }
            }

            if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
              delete requestHeaders['Content-Type'] // Let the browser set it
            }

            var request = new XMLHttpRequest()

            // HTTP basic authentication
            if (config.auth) {
              var username = config.auth.username || ''
              var password = config.auth.password
                ? unescape(encodeURIComponent(config.auth.password))
                : ''
              requestHeaders.Authorization =
                'Basic ' + btoa(username + ':' + password)
            }

            var fullPath = buildFullPath(config.baseURL, config.url)

            request.open(
              config.method.toUpperCase(),
              buildURL(fullPath, config.params, config.paramsSerializer),
              true
            )

            // Set the request timeout in MS
            request.timeout = config.timeout

            function onloadend() {
              if (!request) {
                return
              }
              // Prepare the response
              var responseHeaders =
                'getAllResponseHeaders' in request
                  ? parseHeaders(request.getAllResponseHeaders())
                  : null
              var responseData =
                !responseType ||
                responseType === 'text' ||
                responseType === 'json'
                  ? request.responseText
                  : request.response
              var response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config: config,
                request: request,
              }

              settle(
                function _resolve(value) {
                  resolve(value)
                  done()
                },
                function _reject(err) {
                  reject(err)
                  done()
                },
                response
              )

              // Clean up request
              request = null
            }

            if ('onloadend' in request) {
              // Use onloadend if available
              request.onloadend = onloadend
            } else {
              // Listen for ready state to emulate onloadend
              request.onreadystatechange = function handleLoad() {
                if (!request || request.readyState !== 4) {
                  return
                }

                // The request errored out and we didn't get a response, this will be
                // handled by onerror instead
                // With one exception: request that using file: protocol, most browsers
                // will return status as 0 even though it's a successful request
                if (
                  request.status === 0 &&
                  !(
                    request.responseURL &&
                    request.responseURL.indexOf('file:') === 0
                  )
                ) {
                  return
                }
                // readystate handler is calling before onerror or ontimeout handlers,
                // so we should call onloadend on the next 'tick'
                setTimeout(onloadend)
              }
            }

            // Handle browser request cancellation (as opposed to a manual cancellation)
            request.onabort = function handleAbort() {
              if (!request) {
                return
              }

              reject(
                new AxiosError(
                  'Request aborted',
                  AxiosError.ECONNABORTED,
                  config,
                  request
                )
              )

              // Clean up request
              request = null
            }

            // Handle low level network errors
            request.onerror = function handleError() {
              // Real errors are hidden from us by the browser
              // onerror should only fire if it's a network error
              reject(
                new AxiosError(
                  'Network Error',
                  AxiosError.ERR_NETWORK,
                  config,
                  request,
                  request
                )
              )

              // Clean up request
              request = null
            }

            // Handle timeout
            request.ontimeout = function handleTimeout() {
              var timeoutErrorMessage = config.timeout
                ? 'timeout of ' + config.timeout + 'ms exceeded'
                : 'timeout exceeded'
              var transitional = config.transitional || transitionalDefaults
              if (config.timeoutErrorMessage) {
                timeoutErrorMessage = config.timeoutErrorMessage
              }
              reject(
                new AxiosError(
                  timeoutErrorMessage,
                  transitional.clarifyTimeoutError
                    ? AxiosError.ETIMEDOUT
                    : AxiosError.ECONNABORTED,
                  config,
                  request
                )
              )

              // Clean up request
              request = null
            }

            // Add xsrf header
            // This is only done if running in a standard browser environment.
            // Specifically not if we're in a web worker, or react-native.
            if (utils.isStandardBrowserEnv()) {
              // Add xsrf header
              var xsrfValue =
                (config.withCredentials || isURLSameOrigin(fullPath)) &&
                config.xsrfCookieName
                  ? cookies.read(config.xsrfCookieName)
                  : undefined

              if (xsrfValue) {
                requestHeaders[config.xsrfHeaderName] = xsrfValue
              }
            }

            // Add headers to the request
            if ('setRequestHeader' in request) {
              utils.forEach(
                requestHeaders,
                function setRequestHeader(val, key) {
                  if (
                    typeof requestData === 'undefined' &&
                    key.toLowerCase() === 'content-type'
                  ) {
                    // Remove Content-Type if data is undefined
                    delete requestHeaders[key]
                  } else {
                    // Otherwise add header to the request
                    request.setRequestHeader(key, val)
                  }
                }
              )
            }

            // Add withCredentials to request if needed
            if (!utils.isUndefined(config.withCredentials)) {
              request.withCredentials = !!config.withCredentials
            }

            // Add responseType to request if needed
            if (responseType && responseType !== 'json') {
              request.responseType = config.responseType
            }

            // Handle progress if needed
            if (typeof config.onDownloadProgress === 'function') {
              request.addEventListener('progress', config.onDownloadProgress)
            }

            // Not all browsers support upload events
            if (
              typeof config.onUploadProgress === 'function' &&
              request.upload
            ) {
              request.upload.addEventListener(
                'progress',
                config.onUploadProgress
              )
            }

            if (config.cancelToken || config.signal) {
              // Handle cancellation
              // eslint-disable-next-line func-names
              onCanceled = function (cancel) {
                if (!request) {
                  return
                }
                reject(
                  !cancel || (cancel && cancel.type)
                    ? new CanceledError()
                    : cancel
                )
                request.abort()
                request = null
              }

              config.cancelToken && config.cancelToken.subscribe(onCanceled)
              if (config.signal) {
                config.signal.aborted
                  ? onCanceled()
                  : config.signal.addEventListener('abort', onCanceled)
              }
            }

            if (!requestData) {
              requestData = null
            }

            var protocol = parseProtocol(fullPath)

            if (
              protocol &&
              ['http', 'https', 'file'].indexOf(protocol) === -1
            ) {
              reject(
                new AxiosError(
                  'Unsupported protocol ' + protocol + ':',
                  AxiosError.ERR_BAD_REQUEST,
                  config
                )
              )
              return
            }

            // Send the request
            request.send(requestData)
          })
        }

        /***/
      },

    /***/ './node_modules/axios/lib/axios.js':
      /*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        'use strict'

        var utils = __webpack_require__(
          /*! ./utils */ './node_modules/axios/lib/utils.js'
        )
        var bind = __webpack_require__(
          /*! ./helpers/bind */ './node_modules/axios/lib/helpers/bind.js'
        )
        var Axios = __webpack_require__(
          /*! ./core/Axios */ './node_modules/axios/lib/core/Axios.js'
        )
        var mergeConfig = __webpack_require__(
          /*! ./core/mergeConfig */ './node_modules/axios/lib/core/mergeConfig.js'
        )
        var defaults = __webpack_require__(
          /*! ./defaults */ './node_modules/axios/lib/defaults/index.js'
        )

        /**
         * Create an instance of Axios
         *
         * @param {Object} defaultConfig The default config for the instance
         * @return {Axios} A new instance of Axios
         */
        function createInstance(defaultConfig) {
          var context = new Axios(defaultConfig)
          var instance = bind(Axios.prototype.request, context)

          // Copy axios.prototype to instance
          utils.extend(instance, Axios.prototype, context)

          // Copy context to instance
          utils.extend(instance, context)

          // Factory for creating new instances
          instance.create = function create(instanceConfig) {
            return createInstance(mergeConfig(defaultConfig, instanceConfig))
          }

          return instance
        }

        // Create the default instance to be exported
        var axios = createInstance(defaults)

        // Expose Axios class to allow class inheritance
        axios.Axios = Axios

        // Expose Cancel & CancelToken
        axios.CanceledError = __webpack_require__(
          /*! ./cancel/CanceledError */ './node_modules/axios/lib/cancel/CanceledError.js'
        )
        axios.CancelToken = __webpack_require__(
          /*! ./cancel/CancelToken */ './node_modules/axios/lib/cancel/CancelToken.js'
        )
        axios.isCancel = __webpack_require__(
          /*! ./cancel/isCancel */ './node_modules/axios/lib/cancel/isCancel.js'
        )
        axios.VERSION = __webpack_require__(
          /*! ./env/data */ './node_modules/axios/lib/env/data.js'
        ).version
        axios.toFormData = __webpack_require__(
          /*! ./helpers/toFormData */ './node_modules/axios/lib/helpers/toFormData.js'
        )

        // Expose AxiosError class
        axios.AxiosError = __webpack_require__(
          /*! ../lib/core/AxiosError */ './node_modules/axios/lib/core/AxiosError.js'
        )

        // alias for CanceledError for backward compatibility
        axios.Cancel = axios.CanceledError

        // Expose all/spread
        axios.all = function all(promises) {
          return Promise.all(promises)
        }
        axios.spread = __webpack_require__(
          /*! ./helpers/spread */ './node_modules/axios/lib/helpers/spread.js'
        )

        // Expose isAxiosError
        axios.isAxiosError = __webpack_require__(
          /*! ./helpers/isAxiosError */ './node_modules/axios/lib/helpers/isAxiosError.js'
        )

        module.exports = axios

        // Allow use of default import syntax in TypeScript
        module.exports['default'] = axios

        /***/
      },

    /***/ './node_modules/axios/lib/cancel/CancelToken.js':
      /*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        'use strict'

        var CanceledError = __webpack_require__(
          /*! ./CanceledError */ './node_modules/axios/lib/cancel/CanceledError.js'
        )

        /**
         * A `CancelToken` is an object that can be used to request cancellation of an operation.
         *
         * @class
         * @param {Function} executor The executor function.
         */
        function CancelToken(executor) {
          if (typeof executor !== 'function') {
            throw new TypeError('executor must be a function.')
          }

          var resolvePromise

          this.promise = new Promise(function promiseExecutor(resolve) {
            resolvePromise = resolve
          })

          var token = this

          // eslint-disable-next-line func-names
          this.promise.then(function (cancel) {
            if (!token._listeners) return

            var i
            var l = token._listeners.length

            for (i = 0; i < l; i++) {
              token._listeners[i](cancel)
            }
            token._listeners = null
          })

          // eslint-disable-next-line func-names
          this.promise.then = function (onfulfilled) {
            var _resolve
            // eslint-disable-next-line func-names
            var promise = new Promise(function (resolve) {
              token.subscribe(resolve)
              _resolve = resolve
            }).then(onfulfilled)

            promise.cancel = function reject() {
              token.unsubscribe(_resolve)
            }

            return promise
          }

          executor(function cancel(message) {
            if (token.reason) {
              // Cancellation has already been requested
              return
            }

            token.reason = new CanceledError(message)
            resolvePromise(token.reason)
          })
        }

        /**
         * Throws a `CanceledError` if cancellation has been requested.
         */
        CancelToken.prototype.throwIfRequested = function throwIfRequested() {
          if (this.reason) {
            throw this.reason
          }
        }

        /**
         * Subscribe to the cancel signal
         */

        CancelToken.prototype.subscribe = function subscribe(listener) {
          if (this.reason) {
            listener(this.reason)
            return
          }

          if (this._listeners) {
            this._listeners.push(listener)
          } else {
            this._listeners = [listener]
          }
        }

        /**
         * Unsubscribe from the cancel signal
         */

        CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
          if (!this._listeners) {
            return
          }
          var index = this._listeners.indexOf(listener)
          if (index !== -1) {
            this._listeners.splice(index, 1)
          }
        }

        /**
         * Returns an object that contains a new `CancelToken` and a function that, when called,
         * cancels the `CancelToken`.
         */
        CancelToken.source = function source() {
          var cancel
          var token = new CancelToken(function executor(c) {
            cancel = c
          })
          return {
            token: token,
            cancel: cancel,
          }
        }

        module.exports = CancelToken

        /***/
      },

    /***/ './node_modules/axios/lib/cancel/CanceledError.js':
      /*!********************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CanceledError.js ***!
  \********************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        'use strict'

        var AxiosError = __webpack_require__(
          /*! ../core/AxiosError */ './node_modules/axios/lib/core/AxiosError.js'
        )
        var utils = __webpack_require__(
          /*! ../utils */ './node_modules/axios/lib/utils.js'
        )

        /**
         * A `CanceledError` is an object that is thrown when an operation is canceled.
         *
         * @class
         * @param {string=} message The message.
         */
        function CanceledError(message) {
          // eslint-disable-next-line no-eq-null,eqeqeq
          AxiosError.call(
            this,
            message == null ? 'canceled' : message,
            AxiosError.ERR_CANCELED
          )
          this.name = 'CanceledError'
        }

        utils.inherits(CanceledError, AxiosError, {
          __CANCEL__: true,
        })

        module.exports = CanceledError

        /***/
      },

    /***/ './node_modules/axios/lib/cancel/isCancel.js':
      /*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
      /***/ (module) => {
        'use strict'

        module.exports = function isCancel(value) {
          return !!(value && value.__CANCEL__)
        }

        /***/
      },

    /***/ './node_modules/axios/lib/core/Axios.js':
      /*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        'use strict'

        var utils = __webpack_require__(
          /*! ./../utils */ './node_modules/axios/lib/utils.js'
        )
        var buildURL = __webpack_require__(
          /*! ../helpers/buildURL */ './node_modules/axios/lib/helpers/buildURL.js'
        )
        var InterceptorManager = __webpack_require__(
          /*! ./InterceptorManager */ './node_modules/axios/lib/core/InterceptorManager.js'
        )
        var dispatchRequest = __webpack_require__(
          /*! ./dispatchRequest */ './node_modules/axios/lib/core/dispatchRequest.js'
        )
        var mergeConfig = __webpack_require__(
          /*! ./mergeConfig */ './node_modules/axios/lib/core/mergeConfig.js'
        )
        var buildFullPath = __webpack_require__(
          /*! ./buildFullPath */ './node_modules/axios/lib/core/buildFullPath.js'
        )
        var validator = __webpack_require__(
          /*! ../helpers/validator */ './node_modules/axios/lib/helpers/validator.js'
        )

        var validators = validator.validators
        /**
         * Create a new instance of Axios
         *
         * @param {Object} instanceConfig The default config for the instance
         */
        function Axios(instanceConfig) {
          this.defaults = instanceConfig
          this.interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager(),
          }
        }

        /**
         * Dispatch a request
         *
         * @param {Object} config The config specific for this request (merged with this.defaults)
         */
        Axios.prototype.request = function request(configOrUrl, config) {
          /*eslint no-param-reassign:0*/
          // Allow for axios('example/url'[, config]) a la fetch API
          if (typeof configOrUrl === 'string') {
            config = config || {}
            config.url = configOrUrl
          } else {
            config = configOrUrl || {}
          }

          config = mergeConfig(this.defaults, config)

          // Set config.method
          if (config.method) {
            config.method = config.method.toLowerCase()
          } else if (this.defaults.method) {
            config.method = this.defaults.method.toLowerCase()
          } else {
            config.method = 'get'
          }

          var transitional = config.transitional

          if (transitional !== undefined) {
            validator.assertOptions(
              transitional,
              {
                silentJSONParsing: validators.transitional(validators.boolean),
                forcedJSONParsing: validators.transitional(validators.boolean),
                clarifyTimeoutError: validators.transitional(
                  validators.boolean
                ),
              },
              false
            )
          }

          // filter out skipped interceptors
          var requestInterceptorChain = []
          var synchronousRequestInterceptors = true
          this.interceptors.request.forEach(function unshiftRequestInterceptors(
            interceptor
          ) {
            if (
              typeof interceptor.runWhen === 'function' &&
              interceptor.runWhen(config) === false
            ) {
              return
            }

            synchronousRequestInterceptors =
              synchronousRequestInterceptors && interceptor.synchronous

            requestInterceptorChain.unshift(
              interceptor.fulfilled,
              interceptor.rejected
            )
          })

          var responseInterceptorChain = []
          this.interceptors.response.forEach(function pushResponseInterceptors(
            interceptor
          ) {
            responseInterceptorChain.push(
              interceptor.fulfilled,
              interceptor.rejected
            )
          })

          var promise

          if (!synchronousRequestInterceptors) {
            var chain = [dispatchRequest, undefined]

            Array.prototype.unshift.apply(chain, requestInterceptorChain)
            chain = chain.concat(responseInterceptorChain)

            promise = Promise.resolve(config)
            while (chain.length) {
              promise = promise.then(chain.shift(), chain.shift())
            }

            return promise
          }

          var newConfig = config
          while (requestInterceptorChain.length) {
            var onFulfilled = requestInterceptorChain.shift()
            var onRejected = requestInterceptorChain.shift()
            try {
              newConfig = onFulfilled(newConfig)
            } catch (error) {
              onRejected(error)
              break
            }
          }

          try {
            promise = dispatchRequest(newConfig)
          } catch (error) {
            return Promise.reject(error)
          }

          while (responseInterceptorChain.length) {
            promise = promise.then(
              responseInterceptorChain.shift(),
              responseInterceptorChain.shift()
            )
          }

          return promise
        }

        Axios.prototype.getUri = function getUri(config) {
          config = mergeConfig(this.defaults, config)
          var fullPath = buildFullPath(config.baseURL, config.url)
          return buildURL(fullPath, config.params, config.paramsSerializer)
        }

        // Provide aliases for supported request methods
        utils.forEach(
          ['delete', 'get', 'head', 'options'],
          function forEachMethodNoData(method) {
            /*eslint func-names:0*/
            Axios.prototype[method] = function (url, config) {
              return this.request(
                mergeConfig(config || {}, {
                  method: method,
                  url: url,
                  data: (config || {}).data,
                })
              )
            }
          }
        )

        utils.forEach(
          ['post', 'put', 'patch'],
          function forEachMethodWithData(method) {
            /*eslint func-names:0*/

            function generateHTTPMethod(isForm) {
              return function httpMethod(url, data, config) {
                return this.request(
                  mergeConfig(config || {}, {
                    method: method,
                    headers: isForm
                      ? {
                          'Content-Type': 'multipart/form-data',
                        }
                      : {},
                    url: url,
                    data: data,
                  })
                )
              }
            }

            Axios.prototype[method] = generateHTTPMethod()

            Axios.prototype[method + 'Form'] = generateHTTPMethod(true)
          }
        )

        module.exports = Axios

        /***/
      },

    /***/ './node_modules/axios/lib/core/AxiosError.js':
      /*!***************************************************!*\
  !*** ./node_modules/axios/lib/core/AxiosError.js ***!
  \***************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        'use strict'

        var utils = __webpack_require__(
          /*! ../utils */ './node_modules/axios/lib/utils.js'
        )

        /**
         * Create an Error with the specified message, config, error code, request and response.
         *
         * @param {string} message The error message.
         * @param {string} [code] The error code (for example, 'ECONNABORTED').
         * @param {Object} [config] The config.
         * @param {Object} [request] The request.
         * @param {Object} [response] The response.
         * @returns {Error} The created error.
         */
        function AxiosError(message, code, config, request, response) {
          Error.call(this)
          this.message = message
          this.name = 'AxiosError'
          code && (this.code = code)
          config && (this.config = config)
          request && (this.request = request)
          response && (this.response = response)
        }

        utils.inherits(AxiosError, Error, {
          toJSON: function toJSON() {
            return {
              // Standard
              message: this.message,
              name: this.name,
              // Microsoft
              description: this.description,
              number: this.number,
              // Mozilla
              fileName: this.fileName,
              lineNumber: this.lineNumber,
              columnNumber: this.columnNumber,
              stack: this.stack,
              // Axios
              config: this.config,
              code: this.code,
              status:
                this.response && this.response.status
                  ? this.response.status
                  : null,
            }
          },
        })

        var prototype = AxiosError.prototype
        var descriptors = {}

        ;[
          'ERR_BAD_OPTION_VALUE',
          'ERR_BAD_OPTION',
          'ECONNABORTED',
          'ETIMEDOUT',
          'ERR_NETWORK',
          'ERR_FR_TOO_MANY_REDIRECTS',
          'ERR_DEPRECATED',
          'ERR_BAD_RESPONSE',
          'ERR_BAD_REQUEST',
          'ERR_CANCELED',
          // eslint-disable-next-line func-names
        ].forEach(function (code) {
          descriptors[code] = { value: code }
        })

        Object.defineProperties(AxiosError, descriptors)
        Object.defineProperty(prototype, 'isAxiosError', { value: true })

        // eslint-disable-next-line func-names
        AxiosError.from = function (
          error,
          code,
          config,
          request,
          response,
          customProps
        ) {
          var axiosError = Object.create(prototype)

          utils.toFlatObject(error, axiosError, function filter(obj) {
            return obj !== Error.prototype
          })

          AxiosError.call(
            axiosError,
            error.message,
            code,
            config,
            request,
            response
          )

          axiosError.name = error.name

          customProps && Object.assign(axiosError, customProps)

          return axiosError
        }

        module.exports = AxiosError

        /***/
      },

    /***/ './node_modules/axios/lib/core/InterceptorManager.js':
      /*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        'use strict'

        var utils = __webpack_require__(
          /*! ./../utils */ './node_modules/axios/lib/utils.js'
        )

        function InterceptorManager() {
          this.handlers = []
        }

        /**
         * Add a new interceptor to the stack
         *
         * @param {Function} fulfilled The function to handle `then` for a `Promise`
         * @param {Function} rejected The function to handle `reject` for a `Promise`
         *
         * @return {Number} An ID used to remove interceptor later
         */
        InterceptorManager.prototype.use = function use(
          fulfilled,
          rejected,
          options
        ) {
          this.handlers.push({
            fulfilled: fulfilled,
            rejected: rejected,
            synchronous: options ? options.synchronous : false,
            runWhen: options ? options.runWhen : null,
          })
          return this.handlers.length - 1
        }

        /**
         * Remove an interceptor from the stack
         *
         * @param {Number} id The ID that was returned by `use`
         */
        InterceptorManager.prototype.eject = function eject(id) {
          if (this.handlers[id]) {
            this.handlers[id] = null
          }
        }

        /**
         * Iterate over all the registered interceptors
         *
         * This method is particularly useful for skipping over any
         * interceptors that may have become `null` calling `eject`.
         *
         * @param {Function} fn The function to call for each interceptor
         */
        InterceptorManager.prototype.forEach = function forEach(fn) {
          utils.forEach(this.handlers, function forEachHandler(h) {
            if (h !== null) {
              fn(h)
            }
          })
        }

        module.exports = InterceptorManager

        /***/
      },

    /***/ './node_modules/axios/lib/core/buildFullPath.js':
      /*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        'use strict'

        var isAbsoluteURL = __webpack_require__(
          /*! ../helpers/isAbsoluteURL */ './node_modules/axios/lib/helpers/isAbsoluteURL.js'
        )
        var combineURLs = __webpack_require__(
          /*! ../helpers/combineURLs */ './node_modules/axios/lib/helpers/combineURLs.js'
        )

        /**
         * Creates a new URL by combining the baseURL with the requestedURL,
         * only when the requestedURL is not already an absolute URL.
         * If the requestURL is absolute, this function returns the requestedURL untouched.
         *
         * @param {string} baseURL The base URL
         * @param {string} requestedURL Absolute or relative URL to combine
         * @returns {string} The combined full path
         */
        module.exports = function buildFullPath(baseURL, requestedURL) {
          if (baseURL && !isAbsoluteURL(requestedURL)) {
            return combineURLs(baseURL, requestedURL)
          }
          return requestedURL
        }

        /***/
      },

    /***/ './node_modules/axios/lib/core/dispatchRequest.js':
      /*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        'use strict'

        var utils = __webpack_require__(
          /*! ./../utils */ './node_modules/axios/lib/utils.js'
        )
        var transformData = __webpack_require__(
          /*! ./transformData */ './node_modules/axios/lib/core/transformData.js'
        )
        var isCancel = __webpack_require__(
          /*! ../cancel/isCancel */ './node_modules/axios/lib/cancel/isCancel.js'
        )
        var defaults = __webpack_require__(
          /*! ../defaults */ './node_modules/axios/lib/defaults/index.js'
        )
        var CanceledError = __webpack_require__(
          /*! ../cancel/CanceledError */ './node_modules/axios/lib/cancel/CanceledError.js'
        )

        /**
         * Throws a `CanceledError` if cancellation has been requested.
         */
        function throwIfCancellationRequested(config) {
          if (config.cancelToken) {
            config.cancelToken.throwIfRequested()
          }

          if (config.signal && config.signal.aborted) {
            throw new CanceledError()
          }
        }

        /**
         * Dispatch a request to the server using the configured adapter.
         *
         * @param {object} config The config that is to be used for the request
         * @returns {Promise} The Promise to be fulfilled
         */
        module.exports = function dispatchRequest(config) {
          throwIfCancellationRequested(config)

          // Ensure headers exist
          config.headers = config.headers || {}

          // Transform request data
          config.data = transformData.call(
            config,
            config.data,
            config.headers,
            config.transformRequest
          )

          // Flatten headers
          config.headers = utils.merge(
            config.headers.common || {},
            config.headers[config.method] || {},
            config.headers
          )

          utils.forEach(
            ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
            function cleanHeaderConfig(method) {
              delete config.headers[method]
            }
          )

          var adapter = config.adapter || defaults.adapter

          return adapter(config).then(
            function onAdapterResolution(response) {
              throwIfCancellationRequested(config)

              // Transform response data
              response.data = transformData.call(
                config,
                response.data,
                response.headers,
                config.transformResponse
              )

              return response
            },
            function onAdapterRejection(reason) {
              if (!isCancel(reason)) {
                throwIfCancellationRequested(config)

                // Transform response data
                if (reason && reason.response) {
                  reason.response.data = transformData.call(
                    config,
                    reason.response.data,
                    reason.response.headers,
                    config.transformResponse
                  )
                }
              }

              return Promise.reject(reason)
            }
          )
        }

        /***/
      },

    /***/ './node_modules/axios/lib/core/mergeConfig.js':
      /*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        'use strict'

        var utils = __webpack_require__(
          /*! ../utils */ './node_modules/axios/lib/utils.js'
        )

        /**
         * Config-specific merge-function which creates a new config-object
         * by merging two configuration objects together.
         *
         * @param {Object} config1
         * @param {Object} config2
         * @returns {Object} New object resulting from merging config2 to config1
         */
        module.exports = function mergeConfig(config1, config2) {
          // eslint-disable-next-line no-param-reassign
          config2 = config2 || {}
          var config = {}

          function getMergedValue(target, source) {
            if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
              return utils.merge(target, source)
            } else if (utils.isPlainObject(source)) {
              return utils.merge({}, source)
            } else if (utils.isArray(source)) {
              return source.slice()
            }
            return source
          }

          // eslint-disable-next-line consistent-return
          function mergeDeepProperties(prop) {
            if (!utils.isUndefined(config2[prop])) {
              return getMergedValue(config1[prop], config2[prop])
            } else if (!utils.isUndefined(config1[prop])) {
              return getMergedValue(undefined, config1[prop])
            }
          }

          // eslint-disable-next-line consistent-return
          function valueFromConfig2(prop) {
            if (!utils.isUndefined(config2[prop])) {
              return getMergedValue(undefined, config2[prop])
            }
          }

          // eslint-disable-next-line consistent-return
          function defaultToConfig2(prop) {
            if (!utils.isUndefined(config2[prop])) {
              return getMergedValue(undefined, config2[prop])
            } else if (!utils.isUndefined(config1[prop])) {
              return getMergedValue(undefined, config1[prop])
            }
          }

          // eslint-disable-next-line consistent-return
          function mergeDirectKeys(prop) {
            if (prop in config2) {
              return getMergedValue(config1[prop], config2[prop])
            } else if (prop in config1) {
              return getMergedValue(undefined, config1[prop])
            }
          }

          var mergeMap = {
            url: valueFromConfig2,
            method: valueFromConfig2,
            data: valueFromConfig2,
            baseURL: defaultToConfig2,
            transformRequest: defaultToConfig2,
            transformResponse: defaultToConfig2,
            paramsSerializer: defaultToConfig2,
            timeout: defaultToConfig2,
            timeoutMessage: defaultToConfig2,
            withCredentials: defaultToConfig2,
            adapter: defaultToConfig2,
            responseType: defaultToConfig2,
            xsrfCookieName: defaultToConfig2,
            xsrfHeaderName: defaultToConfig2,
            onUploadProgress: defaultToConfig2,
            onDownloadProgress: defaultToConfig2,
            decompress: defaultToConfig2,
            maxContentLength: defaultToConfig2,
            maxBodyLength: defaultToConfig2,
            beforeRedirect: defaultToConfig2,
            transport: defaultToConfig2,
            httpAgent: defaultToConfig2,
            httpsAgent: defaultToConfig2,
            cancelToken: defaultToConfig2,
            socketPath: defaultToConfig2,
            responseEncoding: defaultToConfig2,
            validateStatus: mergeDirectKeys,
          }

          utils.forEach(
            Object.keys(config1).concat(Object.keys(config2)),
            function computeConfigValue(prop) {
              var merge = mergeMap[prop] || mergeDeepProperties
              var configValue = merge(prop)
              ;(utils.isUndefined(configValue) && merge !== mergeDirectKeys) ||
                (config[prop] = configValue)
            }
          )

          return config
        }

        /***/
      },

    /***/ './node_modules/axios/lib/core/settle.js':
      /*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        'use strict'

        var AxiosError = __webpack_require__(
          /*! ./AxiosError */ './node_modules/axios/lib/core/AxiosError.js'
        )

        /**
         * Resolve or reject a Promise based on response status.
         *
         * @param {Function} resolve A function that resolves the promise.
         * @param {Function} reject A function that rejects the promise.
         * @param {object} response The response.
         */
        module.exports = function settle(resolve, reject, response) {
          var validateStatus = response.config.validateStatus
          if (
            !response.status ||
            !validateStatus ||
            validateStatus(response.status)
          ) {
            resolve(response)
          } else {
            reject(
              new AxiosError(
                'Request failed with status code ' + response.status,
                [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][
                  Math.floor(response.status / 100) - 4
                ],
                response.config,
                response.request,
                response
              )
            )
          }
        }

        /***/
      },

    /***/ './node_modules/axios/lib/core/transformData.js':
      /*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        'use strict'

        var utils = __webpack_require__(
          /*! ./../utils */ './node_modules/axios/lib/utils.js'
        )
        var defaults = __webpack_require__(
          /*! ../defaults */ './node_modules/axios/lib/defaults/index.js'
        )

        /**
         * Transform the data for a request or a response
         *
         * @param {Object|String} data The data to be transformed
         * @param {Array} headers The headers for the request or response
         * @param {Array|Function} fns A single function or Array of functions
         * @returns {*} The resulting transformed data
         */
        module.exports = function transformData(data, headers, fns) {
          var context = this || defaults
          /*eslint no-param-reassign:0*/
          utils.forEach(fns, function transform(fn) {
            data = fn.call(context, data, headers)
          })

          return data
        }

        /***/
      },

    /***/ './node_modules/axios/lib/defaults/index.js':
      /*!**************************************************!*\
  !*** ./node_modules/axios/lib/defaults/index.js ***!
  \**************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        'use strict'

        var utils = __webpack_require__(
          /*! ../utils */ './node_modules/axios/lib/utils.js'
        )
        var normalizeHeaderName = __webpack_require__(
          /*! ../helpers/normalizeHeaderName */ './node_modules/axios/lib/helpers/normalizeHeaderName.js'
        )
        var AxiosError = __webpack_require__(
          /*! ../core/AxiosError */ './node_modules/axios/lib/core/AxiosError.js'
        )
        var transitionalDefaults = __webpack_require__(
          /*! ./transitional */ './node_modules/axios/lib/defaults/transitional.js'
        )
        var toFormData = __webpack_require__(
          /*! ../helpers/toFormData */ './node_modules/axios/lib/helpers/toFormData.js'
        )

        var DEFAULT_CONTENT_TYPE = {
          'Content-Type': 'application/x-www-form-urlencoded',
        }

        function setContentTypeIfUnset(headers, value) {
          if (
            !utils.isUndefined(headers) &&
            utils.isUndefined(headers['Content-Type'])
          ) {
            headers['Content-Type'] = value
          }
        }

        function getDefaultAdapter() {
          var adapter
          if (typeof XMLHttpRequest !== 'undefined') {
            // For browsers use XHR adapter
            adapter = __webpack_require__(
              /*! ../adapters/xhr */ './node_modules/axios/lib/adapters/xhr.js'
            )
          } else if (
            typeof process !== 'undefined' &&
            Object.prototype.toString.call(process) === '[object process]'
          ) {
            // For node use HTTP adapter
            adapter = __webpack_require__(
              /*! ../adapters/http */ './node_modules/axios/lib/adapters/xhr.js'
            )
          }
          return adapter
        }

        function stringifySafely(rawValue, parser, encoder) {
          if (utils.isString(rawValue)) {
            try {
              ;(parser || JSON.parse)(rawValue)
              return utils.trim(rawValue)
            } catch (e) {
              if (e.name !== 'SyntaxError') {
                throw e
              }
            }
          }

          return (encoder || JSON.stringify)(rawValue)
        }

        var defaults = {
          transitional: transitionalDefaults,

          adapter: getDefaultAdapter(),

          transformRequest: [
            function transformRequest(data, headers) {
              normalizeHeaderName(headers, 'Accept')
              normalizeHeaderName(headers, 'Content-Type')

              if (
                utils.isFormData(data) ||
                utils.isArrayBuffer(data) ||
                utils.isBuffer(data) ||
                utils.isStream(data) ||
                utils.isFile(data) ||
                utils.isBlob(data)
              ) {
                return data
              }
              if (utils.isArrayBufferView(data)) {
                return data.buffer
              }
              if (utils.isURLSearchParams(data)) {
                setContentTypeIfUnset(
                  headers,
                  'application/x-www-form-urlencoded;charset=utf-8'
                )
                return data.toString()
              }

              var isObjectPayload = utils.isObject(data)
              var contentType = headers && headers['Content-Type']

              var isFileList

              if (
                (isFileList = utils.isFileList(data)) ||
                (isObjectPayload && contentType === 'multipart/form-data')
              ) {
                var _FormData = this.env && this.env.FormData
                return toFormData(
                  isFileList ? { 'files[]': data } : data,
                  _FormData && new _FormData()
                )
              } else if (
                isObjectPayload ||
                contentType === 'application/json'
              ) {
                setContentTypeIfUnset(headers, 'application/json')
                return stringifySafely(data)
              }

              return data
            },
          ],

          transformResponse: [
            function transformResponse(data) {
              var transitional = this.transitional || defaults.transitional
              var silentJSONParsing =
                transitional && transitional.silentJSONParsing
              var forcedJSONParsing =
                transitional && transitional.forcedJSONParsing
              var strictJSONParsing =
                !silentJSONParsing && this.responseType === 'json'

              if (
                strictJSONParsing ||
                (forcedJSONParsing && utils.isString(data) && data.length)
              ) {
                try {
                  return JSON.parse(data)
                } catch (e) {
                  if (strictJSONParsing) {
                    if (e.name === 'SyntaxError') {
                      throw AxiosError.from(
                        e,
                        AxiosError.ERR_BAD_RESPONSE,
                        this,
                        null,
                        this.response
                      )
                    }
                    throw e
                  }
                }
              }

              return data
            },
          ],

          /**
           * A timeout in milliseconds to abort a request. If set to 0 (default) a
           * timeout is not created.
           */
          timeout: 0,

          xsrfCookieName: 'XSRF-TOKEN',
          xsrfHeaderName: 'X-XSRF-TOKEN',

          maxContentLength: -1,
          maxBodyLength: -1,

          env: {
            FormData: __webpack_require__(
              /*! ./env/FormData */ './node_modules/axios/lib/helpers/null.js'
            ),
          },

          validateStatus: function validateStatus(status) {
            return status >= 200 && status < 300
          },

          headers: {
            common: {
              Accept: 'application/json, text/plain, */*',
            },
          },
        }

        utils.forEach(
          ['delete', 'get', 'head'],
          function forEachMethodNoData(method) {
            defaults.headers[method] = {}
          }
        )

        utils.forEach(
          ['post', 'put', 'patch'],
          function forEachMethodWithData(method) {
            defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE)
          }
        )

        module.exports = defaults

        /***/
      },

    /***/ './node_modules/axios/lib/defaults/transitional.js':
      /*!*********************************************************!*\
  !*** ./node_modules/axios/lib/defaults/transitional.js ***!
  \*********************************************************/
      /***/ (module) => {
        'use strict'

        module.exports = {
          silentJSONParsing: true,
          forcedJSONParsing: true,
          clarifyTimeoutError: false,
        }

        /***/
      },

    /***/ './node_modules/axios/lib/env/data.js':
      /*!********************************************!*\
  !*** ./node_modules/axios/lib/env/data.js ***!
  \********************************************/
      /***/ (module) => {
        module.exports = {
          version: '0.27.2',
        }

        /***/
      },

    /***/ './node_modules/axios/lib/helpers/bind.js':
      /*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
      /***/ (module) => {
        'use strict'

        module.exports = function bind(fn, thisArg) {
          return function wrap() {
            var args = new Array(arguments.length)
            for (var i = 0; i < args.length; i++) {
              args[i] = arguments[i]
            }
            return fn.apply(thisArg, args)
          }
        }

        /***/
      },

    /***/ './node_modules/axios/lib/helpers/buildURL.js':
      /*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        'use strict'

        var utils = __webpack_require__(
          /*! ./../utils */ './node_modules/axios/lib/utils.js'
        )

        function encode(val) {
          return encodeURIComponent(val)
            .replace(/%3A/gi, ':')
            .replace(/%24/g, '$')
            .replace(/%2C/gi, ',')
            .replace(/%20/g, '+')
            .replace(/%5B/gi, '[')
            .replace(/%5D/gi, ']')
        }

        /**
         * Build a URL by appending params to the end
         *
         * @param {string} url The base of the url (e.g., http://www.google.com)
         * @param {object} [params] The params to be appended
         * @returns {string} The formatted url
         */
        module.exports = function buildURL(url, params, paramsSerializer) {
          /*eslint no-param-reassign:0*/
          if (!params) {
            return url
          }

          var serializedParams
          if (paramsSerializer) {
            serializedParams = paramsSerializer(params)
          } else if (utils.isURLSearchParams(params)) {
            serializedParams = params.toString()
          } else {
            var parts = []

            utils.forEach(params, function serialize(val, key) {
              if (val === null || typeof val === 'undefined') {
                return
              }

              if (utils.isArray(val)) {
                key = key + '[]'
              } else {
                val = [val]
              }

              utils.forEach(val, function parseValue(v) {
                if (utils.isDate(v)) {
                  v = v.toISOString()
                } else if (utils.isObject(v)) {
                  v = JSON.stringify(v)
                }
                parts.push(encode(key) + '=' + encode(v))
              })
            })

            serializedParams = parts.join('&')
          }

          if (serializedParams) {
            var hashmarkIndex = url.indexOf('#')
            if (hashmarkIndex !== -1) {
              url = url.slice(0, hashmarkIndex)
            }

            url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
          }

          return url
        }

        /***/
      },

    /***/ './node_modules/axios/lib/helpers/combineURLs.js':
      /*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
      /***/ (module) => {
        'use strict'

        /**
         * Creates a new URL by combining the specified URLs
         *
         * @param {string} baseURL The base URL
         * @param {string} relativeURL The relative URL
         * @returns {string} The combined URL
         */
        module.exports = function combineURLs(baseURL, relativeURL) {
          return relativeURL
            ? baseURL.replace(/\/+$/, '') +
                '/' +
                relativeURL.replace(/^\/+/, '')
            : baseURL
        }

        /***/
      },

    /***/ './node_modules/axios/lib/helpers/cookies.js':
      /*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        'use strict'

        var utils = __webpack_require__(
          /*! ./../utils */ './node_modules/axios/lib/utils.js'
        )

        module.exports = utils.isStandardBrowserEnv()
          ? // Standard browser envs support document.cookie
            (function standardBrowserEnv() {
              return {
                write: function write(
                  name,
                  value,
                  expires,
                  path,
                  domain,
                  secure
                ) {
                  var cookie = []
                  cookie.push(name + '=' + encodeURIComponent(value))

                  if (utils.isNumber(expires)) {
                    cookie.push('expires=' + new Date(expires).toGMTString())
                  }

                  if (utils.isString(path)) {
                    cookie.push('path=' + path)
                  }

                  if (utils.isString(domain)) {
                    cookie.push('domain=' + domain)
                  }

                  if (secure === true) {
                    cookie.push('secure')
                  }

                  document.cookie = cookie.join('; ')
                },

                read: function read(name) {
                  var match = document.cookie.match(
                    new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')
                  )
                  return match ? decodeURIComponent(match[3]) : null
                },

                remove: function remove(name) {
                  this.write(name, '', Date.now() - 86400000)
                },
              }
            })()
          : // Non standard browser env (web workers, react-native) lack needed support.
            (function nonStandardBrowserEnv() {
              return {
                write: function write() {},
                read: function read() {
                  return null
                },
                remove: function remove() {},
              }
            })()

        /***/
      },

    /***/ './node_modules/axios/lib/helpers/isAbsoluteURL.js':
      /*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
      /***/ (module) => {
        'use strict'

        /**
         * Determines whether the specified URL is absolute
         *
         * @param {string} url The URL to test
         * @returns {boolean} True if the specified URL is absolute, otherwise false
         */
        module.exports = function isAbsoluteURL(url) {
          // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
          // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
          // by any combination of letters, digits, plus, period, or hyphen.
          return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url)
        }

        /***/
      },

    /***/ './node_modules/axios/lib/helpers/isAxiosError.js':
      /*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        'use strict'

        var utils = __webpack_require__(
          /*! ./../utils */ './node_modules/axios/lib/utils.js'
        )

        /**
         * Determines whether the payload is an error thrown by Axios
         *
         * @param {*} payload The value to test
         * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
         */
        module.exports = function isAxiosError(payload) {
          return utils.isObject(payload) && payload.isAxiosError === true
        }

        /***/
      },

    /***/ './node_modules/axios/lib/helpers/isURLSameOrigin.js':
      /*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        'use strict'

        var utils = __webpack_require__(
          /*! ./../utils */ './node_modules/axios/lib/utils.js'
        )

        module.exports = utils.isStandardBrowserEnv()
          ? // Standard browser envs have full support of the APIs needed to test
            // whether the request URL is of the same origin as current location.
            (function standardBrowserEnv() {
              var msie = /(msie|trident)/i.test(navigator.userAgent)
              var urlParsingNode = document.createElement('a')
              var originURL

              /**
               * Parse a URL to discover it's components
               *
               * @param {String} url The URL to be parsed
               * @returns {Object}
               */
              function resolveURL(url) {
                var href = url

                if (msie) {
                  // IE needs attribute set twice to normalize properties
                  urlParsingNode.setAttribute('href', href)
                  href = urlParsingNode.href
                }

                urlParsingNode.setAttribute('href', href)

                // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
                return {
                  href: urlParsingNode.href,
                  protocol: urlParsingNode.protocol
                    ? urlParsingNode.protocol.replace(/:$/, '')
                    : '',
                  host: urlParsingNode.host,
                  search: urlParsingNode.search
                    ? urlParsingNode.search.replace(/^\?/, '')
                    : '',
                  hash: urlParsingNode.hash
                    ? urlParsingNode.hash.replace(/^#/, '')
                    : '',
                  hostname: urlParsingNode.hostname,
                  port: urlParsingNode.port,
                  pathname:
                    urlParsingNode.pathname.charAt(0) === '/'
                      ? urlParsingNode.pathname
                      : '/' + urlParsingNode.pathname,
                }
              }

              originURL = resolveURL(window.location.href)

              /**
               * Determine if a URL shares the same origin as the current location
               *
               * @param {String} requestURL The URL to test
               * @returns {boolean} True if URL shares the same origin, otherwise false
               */
              return function isURLSameOrigin(requestURL) {
                var parsed = utils.isString(requestURL)
                  ? resolveURL(requestURL)
                  : requestURL
                return (
                  parsed.protocol === originURL.protocol &&
                  parsed.host === originURL.host
                )
              }
            })()
          : // Non standard browser envs (web workers, react-native) lack needed support.
            (function nonStandardBrowserEnv() {
              return function isURLSameOrigin() {
                return true
              }
            })()

        /***/
      },

    /***/ './node_modules/axios/lib/helpers/normalizeHeaderName.js':
      /*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        'use strict'

        var utils = __webpack_require__(
          /*! ../utils */ './node_modules/axios/lib/utils.js'
        )

        module.exports = function normalizeHeaderName(headers, normalizedName) {
          utils.forEach(headers, function processHeader(value, name) {
            if (
              name !== normalizedName &&
              name.toUpperCase() === normalizedName.toUpperCase()
            ) {
              headers[normalizedName] = value
              delete headers[name]
            }
          })
        }

        /***/
      },

    /***/ './node_modules/axios/lib/helpers/null.js':
      /*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/null.js ***!
  \************************************************/
      /***/ (module) => {
        // eslint-disable-next-line strict
        module.exports = null

        /***/
      },

    /***/ './node_modules/axios/lib/helpers/parseHeaders.js':
      /*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        'use strict'

        var utils = __webpack_require__(
          /*! ./../utils */ './node_modules/axios/lib/utils.js'
        )

        // Headers whose duplicates are ignored by node
        // c.f. https://nodejs.org/api/http.html#http_message_headers
        var ignoreDuplicateOf = [
          'age',
          'authorization',
          'content-length',
          'content-type',
          'etag',
          'expires',
          'from',
          'host',
          'if-modified-since',
          'if-unmodified-since',
          'last-modified',
          'location',
          'max-forwards',
          'proxy-authorization',
          'referer',
          'retry-after',
          'user-agent',
        ]

        /**
         * Parse headers into an object
         *
         * ```
         * Date: Wed, 27 Aug 2014 08:58:49 GMT
         * Content-Type: application/json
         * Connection: keep-alive
         * Transfer-Encoding: chunked
         * ```
         *
         * @param {String} headers Headers needing to be parsed
         * @returns {Object} Headers parsed into an object
         */
        module.exports = function parseHeaders(headers) {
          var parsed = {}
          var key
          var val
          var i

          if (!headers) {
            return parsed
          }

          utils.forEach(headers.split('\n'), function parser(line) {
            i = line.indexOf(':')
            key = utils.trim(line.substr(0, i)).toLowerCase()
            val = utils.trim(line.substr(i + 1))

            if (key) {
              if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
                return
              }
              if (key === 'set-cookie') {
                parsed[key] = (parsed[key] ? parsed[key] : []).concat([val])
              } else {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val
              }
            }
          })

          return parsed
        }

        /***/
      },

    /***/ './node_modules/axios/lib/helpers/parseProtocol.js':
      /*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseProtocol.js ***!
  \*********************************************************/
      /***/ (module) => {
        'use strict'

        module.exports = function parseProtocol(url) {
          var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url)
          return (match && match[1]) || ''
        }

        /***/
      },

    /***/ './node_modules/axios/lib/helpers/spread.js':
      /*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
      /***/ (module) => {
        'use strict'

        /**
         * Syntactic sugar for invoking a function and expanding an array for arguments.
         *
         * Common use case would be to use `Function.prototype.apply`.
         *
         *  ```js
         *  function f(x, y, z) {}
         *  var args = [1, 2, 3];
         *  f.apply(null, args);
         *  ```
         *
         * With `spread` this example can be re-written.
         *
         *  ```js
         *  spread(function(x, y, z) {})([1, 2, 3]);
         *  ```
         *
         * @param {Function} callback
         * @returns {Function}
         */
        module.exports = function spread(callback) {
          return function wrap(arr) {
            return callback.apply(null, arr)
          }
        }

        /***/
      },

    /***/ './node_modules/axios/lib/helpers/toFormData.js':
      /*!******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/toFormData.js ***!
  \******************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        'use strict'

        var utils = __webpack_require__(
          /*! ../utils */ './node_modules/axios/lib/utils.js'
        )

        /**
         * Convert a data object to FormData
         * @param {Object} obj
         * @param {?Object} [formData]
         * @returns {Object}
         **/

        function toFormData(obj, formData) {
          // eslint-disable-next-line no-param-reassign
          formData = formData || new FormData()

          var stack = []

          function convertValue(value) {
            if (value === null) return ''

            if (utils.isDate(value)) {
              return value.toISOString()
            }

            if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
              return typeof Blob === 'function'
                ? new Blob([value])
                : Buffer.from(value)
            }

            return value
          }

          function build(data, parentKey) {
            if (utils.isPlainObject(data) || utils.isArray(data)) {
              if (stack.indexOf(data) !== -1) {
                throw Error('Circular reference detected in ' + parentKey)
              }

              stack.push(data)

              utils.forEach(data, function each(value, key) {
                if (utils.isUndefined(value)) return
                var fullKey = parentKey ? parentKey + '.' + key : key
                var arr

                if (value && !parentKey && typeof value === 'object') {
                  if (utils.endsWith(key, '{}')) {
                    // eslint-disable-next-line no-param-reassign
                    value = JSON.stringify(value)
                  } else if (
                    utils.endsWith(key, '[]') &&
                    (arr = utils.toArray(value))
                  ) {
                    // eslint-disable-next-line func-names
                    arr.forEach(function (el) {
                      !utils.isUndefined(el) &&
                        formData.append(fullKey, convertValue(el))
                    })
                    return
                  }
                }

                build(value, fullKey)
              })

              stack.pop()
            } else {
              formData.append(parentKey, convertValue(data))
            }
          }

          build(obj)

          return formData
        }

        module.exports = toFormData

        /***/
      },

    /***/ './node_modules/axios/lib/helpers/validator.js':
      /*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        'use strict'

        var VERSION = __webpack_require__(
          /*! ../env/data */ './node_modules/axios/lib/env/data.js'
        ).version
        var AxiosError = __webpack_require__(
          /*! ../core/AxiosError */ './node_modules/axios/lib/core/AxiosError.js'
        )

        var validators = {}

        // eslint-disable-next-line func-names
        ;[
          'object',
          'boolean',
          'number',
          'function',
          'string',
          'symbol',
        ].forEach(function (type, i) {
          validators[type] = function validator(thing) {
            return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type
          }
        })

        var deprecatedWarnings = {}

        /**
         * Transitional option validator
         * @param {function|boolean?} validator - set to false if the transitional option has been removed
         * @param {string?} version - deprecated version / removed since version
         * @param {string?} message - some message with additional info
         * @returns {function}
         */
        validators.transitional = function transitional(
          validator,
          version,
          message
        ) {
          function formatMessage(opt, desc) {
            return (
              '[Axios v' +
              VERSION +
              "] Transitional option '" +
              opt +
              "'" +
              desc +
              (message ? '. ' + message : '')
            )
          }

          // eslint-disable-next-line func-names
          return function (value, opt, opts) {
            if (validator === false) {
              throw new AxiosError(
                formatMessage(
                  opt,
                  ' has been removed' + (version ? ' in ' + version : '')
                ),
                AxiosError.ERR_DEPRECATED
              )
            }

            if (version && !deprecatedWarnings[opt]) {
              deprecatedWarnings[opt] = true
              // eslint-disable-next-line no-console
              console.warn(
                formatMessage(
                  opt,
                  ' has been deprecated since v' +
                    version +
                    ' and will be removed in the near future'
                )
              )
            }

            return validator ? validator(value, opt, opts) : true
          }
        }

        /**
         * Assert object's properties type
         * @param {object} options
         * @param {object} schema
         * @param {boolean?} allowUnknown
         */

        function assertOptions(options, schema, allowUnknown) {
          if (typeof options !== 'object') {
            throw new AxiosError(
              'options must be an object',
              AxiosError.ERR_BAD_OPTION_VALUE
            )
          }
          var keys = Object.keys(options)
          var i = keys.length
          while (i-- > 0) {
            var opt = keys[i]
            var validator = schema[opt]
            if (validator) {
              var value = options[opt]
              var result = value === undefined || validator(value, opt, options)
              if (result !== true) {
                throw new AxiosError(
                  'option ' + opt + ' must be ' + result,
                  AxiosError.ERR_BAD_OPTION_VALUE
                )
              }
              continue
            }
            if (allowUnknown !== true) {
              throw new AxiosError(
                'Unknown option ' + opt,
                AxiosError.ERR_BAD_OPTION
              )
            }
          }
        }

        module.exports = {
          assertOptions: assertOptions,
          validators: validators,
        }

        /***/
      },

    /***/ './node_modules/axios/lib/utils.js':
      /*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        'use strict'

        var bind = __webpack_require__(
          /*! ./helpers/bind */ './node_modules/axios/lib/helpers/bind.js'
        )

        // utils is a library of generic helper functions non-specific to axios

        var toString = Object.prototype.toString

        // eslint-disable-next-line func-names
        var kindOf = (function (cache) {
          // eslint-disable-next-line func-names
          return function (thing) {
            var str = toString.call(thing)
            return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase())
          }
        })(Object.create(null))

        function kindOfTest(type) {
          type = type.toLowerCase()
          return function isKindOf(thing) {
            return kindOf(thing) === type
          }
        }

        /**
         * Determine if a value is an Array
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is an Array, otherwise false
         */
        function isArray(val) {
          return Array.isArray(val)
        }

        /**
         * Determine if a value is undefined
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if the value is undefined, otherwise false
         */
        function isUndefined(val) {
          return typeof val === 'undefined'
        }

        /**
         * Determine if a value is a Buffer
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Buffer, otherwise false
         */
        function isBuffer(val) {
          return (
            val !== null &&
            !isUndefined(val) &&
            val.constructor !== null &&
            !isUndefined(val.constructor) &&
            typeof val.constructor.isBuffer === 'function' &&
            val.constructor.isBuffer(val)
          )
        }

        /**
         * Determine if a value is an ArrayBuffer
         *
         * @function
         * @param {Object} val The value to test
         * @returns {boolean} True if value is an ArrayBuffer, otherwise false
         */
        var isArrayBuffer = kindOfTest('ArrayBuffer')

        /**
         * Determine if a value is a view on an ArrayBuffer
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
         */
        function isArrayBufferView(val) {
          var result
          if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
            result = ArrayBuffer.isView(val)
          } else {
            result = val && val.buffer && isArrayBuffer(val.buffer)
          }
          return result
        }

        /**
         * Determine if a value is a String
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a String, otherwise false
         */
        function isString(val) {
          return typeof val === 'string'
        }

        /**
         * Determine if a value is a Number
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Number, otherwise false
         */
        function isNumber(val) {
          return typeof val === 'number'
        }

        /**
         * Determine if a value is an Object
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is an Object, otherwise false
         */
        function isObject(val) {
          return val !== null && typeof val === 'object'
        }

        /**
         * Determine if a value is a plain Object
         *
         * @param {Object} val The value to test
         * @return {boolean} True if value is a plain Object, otherwise false
         */
        function isPlainObject(val) {
          if (kindOf(val) !== 'object') {
            return false
          }

          var prototype = Object.getPrototypeOf(val)
          return prototype === null || prototype === Object.prototype
        }

        /**
         * Determine if a value is a Date
         *
         * @function
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Date, otherwise false
         */
        var isDate = kindOfTest('Date')

        /**
         * Determine if a value is a File
         *
         * @function
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a File, otherwise false
         */
        var isFile = kindOfTest('File')

        /**
         * Determine if a value is a Blob
         *
         * @function
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Blob, otherwise false
         */
        var isBlob = kindOfTest('Blob')

        /**
         * Determine if a value is a FileList
         *
         * @function
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a File, otherwise false
         */
        var isFileList = kindOfTest('FileList')

        /**
         * Determine if a value is a Function
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Function, otherwise false
         */
        function isFunction(val) {
          return toString.call(val) === '[object Function]'
        }

        /**
         * Determine if a value is a Stream
         *
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a Stream, otherwise false
         */
        function isStream(val) {
          return isObject(val) && isFunction(val.pipe)
        }

        /**
         * Determine if a value is a FormData
         *
         * @param {Object} thing The value to test
         * @returns {boolean} True if value is an FormData, otherwise false
         */
        function isFormData(thing) {
          var pattern = '[object FormData]'
          return (
            thing &&
            ((typeof FormData === 'function' && thing instanceof FormData) ||
              toString.call(thing) === pattern ||
              (isFunction(thing.toString) && thing.toString() === pattern))
          )
        }

        /**
         * Determine if a value is a URLSearchParams object
         * @function
         * @param {Object} val The value to test
         * @returns {boolean} True if value is a URLSearchParams object, otherwise false
         */
        var isURLSearchParams = kindOfTest('URLSearchParams')

        /**
         * Trim excess whitespace off the beginning and end of a string
         *
         * @param {String} str The String to trim
         * @returns {String} The String freed of excess whitespace
         */
        function trim(str) {
          return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '')
        }

        /**
         * Determine if we're running in a standard browser environment
         *
         * This allows axios to run in a web worker, and react-native.
         * Both environments support XMLHttpRequest, but not fully standard globals.
         *
         * web workers:
         *  typeof window -> undefined
         *  typeof document -> undefined
         *
         * react-native:
         *  navigator.product -> 'ReactNative'
         * nativescript
         *  navigator.product -> 'NativeScript' or 'NS'
         */
        function isStandardBrowserEnv() {
          if (
            typeof navigator !== 'undefined' &&
            (navigator.product === 'ReactNative' ||
              navigator.product === 'NativeScript' ||
              navigator.product === 'NS')
          ) {
            return false
          }
          return (
            typeof window !== 'undefined' && typeof document !== 'undefined'
          )
        }

        /**
         * Iterate over an Array or an Object invoking a function for each item.
         *
         * If `obj` is an Array callback will be called passing
         * the value, index, and complete array for each item.
         *
         * If 'obj' is an Object callback will be called passing
         * the value, key, and complete object for each property.
         *
         * @param {Object|Array} obj The object to iterate
         * @param {Function} fn The callback to invoke for each item
         */
        function forEach(obj, fn) {
          // Don't bother if no value provided
          if (obj === null || typeof obj === 'undefined') {
            return
          }

          // Force an array if not already something iterable
          if (typeof obj !== 'object') {
            /*eslint no-param-reassign:0*/
            obj = [obj]
          }

          if (isArray(obj)) {
            // Iterate over array values
            for (var i = 0, l = obj.length; i < l; i++) {
              fn.call(null, obj[i], i, obj)
            }
          } else {
            // Iterate over object keys
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj)
              }
            }
          }
        }

        /**
         * Accepts varargs expecting each argument to be an object, then
         * immutably merges the properties of each object and returns result.
         *
         * When multiple objects contain the same key the later object in
         * the arguments list will take precedence.
         *
         * Example:
         *
         * ```js
         * var result = merge({foo: 123}, {foo: 456});
         * console.log(result.foo); // outputs 456
         * ```
         *
         * @param {Object} obj1 Object to merge
         * @returns {Object} Result of all merge properties
         */
        function merge(/* obj1, obj2, obj3, ... */) {
          var result = {}
          function assignValue(val, key) {
            if (isPlainObject(result[key]) && isPlainObject(val)) {
              result[key] = merge(result[key], val)
            } else if (isPlainObject(val)) {
              result[key] = merge({}, val)
            } else if (isArray(val)) {
              result[key] = val.slice()
            } else {
              result[key] = val
            }
          }

          for (var i = 0, l = arguments.length; i < l; i++) {
            forEach(arguments[i], assignValue)
          }
          return result
        }

        /**
         * Extends object a by mutably adding to it the properties of object b.
         *
         * @param {Object} a The object to be extended
         * @param {Object} b The object to copy properties from
         * @param {Object} thisArg The object to bind function to
         * @return {Object} The resulting value of object a
         */
        function extend(a, b, thisArg) {
          forEach(b, function assignValue(val, key) {
            if (thisArg && typeof val === 'function') {
              a[key] = bind(val, thisArg)
            } else {
              a[key] = val
            }
          })
          return a
        }

        /**
         * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
         *
         * @param {string} content with BOM
         * @return {string} content value without BOM
         */
        function stripBOM(content) {
          if (content.charCodeAt(0) === 0xfeff) {
            content = content.slice(1)
          }
          return content
        }

        /**
         * Inherit the prototype methods from one constructor into another
         * @param {function} constructor
         * @param {function} superConstructor
         * @param {object} [props]
         * @param {object} [descriptors]
         */

        function inherits(constructor, superConstructor, props, descriptors) {
          constructor.prototype = Object.create(
            superConstructor.prototype,
            descriptors
          )
          constructor.prototype.constructor = constructor
          props && Object.assign(constructor.prototype, props)
        }

        /**
         * Resolve object with deep prototype chain to a flat object
         * @param {Object} sourceObj source object
         * @param {Object} [destObj]
         * @param {Function} [filter]
         * @returns {Object}
         */

        function toFlatObject(sourceObj, destObj, filter) {
          var props
          var i
          var prop
          var merged = {}

          destObj = destObj || {}

          do {
            props = Object.getOwnPropertyNames(sourceObj)
            i = props.length
            while (i-- > 0) {
              prop = props[i]
              if (!merged[prop]) {
                destObj[prop] = sourceObj[prop]
                merged[prop] = true
              }
            }
            sourceObj = Object.getPrototypeOf(sourceObj)
          } while (
            sourceObj &&
            (!filter || filter(sourceObj, destObj)) &&
            sourceObj !== Object.prototype
          )

          return destObj
        }

        /*
         * determines whether a string ends with the characters of a specified string
         * @param {String} str
         * @param {String} searchString
         * @param {Number} [position= 0]
         * @returns {boolean}
         */
        function endsWith(str, searchString, position) {
          str = String(str)
          if (position === undefined || position > str.length) {
            position = str.length
          }
          position -= searchString.length
          var lastIndex = str.indexOf(searchString, position)
          return lastIndex !== -1 && lastIndex === position
        }

        /**
         * Returns new array from array like object
         * @param {*} [thing]
         * @returns {Array}
         */
        function toArray(thing) {
          if (!thing) return null
          var i = thing.length
          if (isUndefined(i)) return null
          var arr = new Array(i)
          while (i-- > 0) {
            arr[i] = thing[i]
          }
          return arr
        }

        // eslint-disable-next-line func-names
        var isTypedArray = (function (TypedArray) {
          // eslint-disable-next-line func-names
          return function (thing) {
            return TypedArray && thing instanceof TypedArray
          }
        })(
          typeof Uint8Array !== 'undefined' && Object.getPrototypeOf(Uint8Array)
        )

        module.exports = {
          isArray: isArray,
          isArrayBuffer: isArrayBuffer,
          isBuffer: isBuffer,
          isFormData: isFormData,
          isArrayBufferView: isArrayBufferView,
          isString: isString,
          isNumber: isNumber,
          isObject: isObject,
          isPlainObject: isPlainObject,
          isUndefined: isUndefined,
          isDate: isDate,
          isFile: isFile,
          isBlob: isBlob,
          isFunction: isFunction,
          isStream: isStream,
          isURLSearchParams: isURLSearchParams,
          isStandardBrowserEnv: isStandardBrowserEnv,
          forEach: forEach,
          merge: merge,
          extend: extend,
          trim: trim,
          stripBOM: stripBOM,
          inherits: inherits,
          toFlatObject: toFlatObject,
          kindOf: kindOf,
          kindOfTest: kindOfTest,
          endsWith: endsWith,
          toArray: toArray,
          isTypedArray: isTypedArray,
          isFileList: isFileList,
        }

        /***/
      },

    /***/ './src/api/auth.js':
      /*!*************************!*\
  !*** ./src/api/auth.js ***!
  \*************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ login: () => /* binding */ login,
          /* harmony export */ refreshToken: () => /* binding */ refreshToken,
          /* harmony export */
        })
        /* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! axios */ './node_modules/axios/index.js')
        /* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            axios__WEBPACK_IMPORTED_MODULE_0__
          )

        var login = function login(
          backendUrl,
          loginPayload,
          successCallback,
          errorCallback
        ) {
          return axios__WEBPACK_IMPORTED_MODULE_0___default()
            .post(''.concat(backendUrl, '/auth/login'), loginPayload)
            .then(function (response) {
              return successCallback(response.data)
            })
            ['catch'](function (err) {
              console.log(err)

              if (err.response) {
                errorCallback(err.response.data.message)
              } else {
                errorCallback(err.message)
              }
            })
        }
        var refreshToken = function refreshToken(
          backendUrl,
          refreshObject,
          successCallback,
          errorCallback
        ) {
          return axios__WEBPACK_IMPORTED_MODULE_0___default()
            .post(''.concat(backendUrl, '/auth/refresh'), refreshObject)
            .then(function (response) {
              return successCallback(response.data)
            })
            ['catch'](function (err) {
              console.log(err)

              if (err.response) {
                errorCallback(err.response.data.message)
              } else {
                errorCallback(err.message)
              }
            })
        }

        /***/
      },

    /***/ './src/api/user.js':
      /*!*************************!*\
  !*** ./src/api/user.js ***!
  \*************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ getUserData: () => /* binding */ getUserData,
          /* harmony export */
        })
        /* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! axios */ './node_modules/axios/index.js')
        /* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            axios__WEBPACK_IMPORTED_MODULE_0__
          )

        var getUserData = function getUserData(
          backendUrl,
          successCallback,
          errorCallback
        ) {
          return axios__WEBPACK_IMPORTED_MODULE_0___default()
            .get(''.concat(backendUrl, '/api/users'))
            .then(function (response) {
              return successCallback(response.data)
            })
            ['catch'](function (err) {
              console.log(err)
              errorCallback(err.message)
            })
        }

        /***/
      },

    /***/ './src/build/entry.js':
      /*!****************************!*\
  !*** ./src/build/entry.js ***!
  \****************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        })
        /* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! preact */ './node_modules/preact/dist/preact.module.js'
          )

        var entry = function entry(container) {
          setTimeout(function () {
            console.log('Running!!!')

            _gaq.push(['_setAccount', 'UA-208478356-1'])

            _gaq.push(['_trackPageview'])
          }, 1000)
          var root = 'root'
          var errorMsg = 'Error: We could not locate element with id '.concat(
            root,
            ' to mount!'
          )
          console.log('Mounting on '.concat(root, '!'))
          var wrapper = document.getElementById(root)
          wrapper
            ? (0, preact__WEBPACK_IMPORTED_MODULE_0__.render)(
                container,
                wrapper
              )
            : console.log(errorMsg)
        }

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = entry

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
        'use strict'
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
        /* harmony import */ var _subroutines_utils__WEBPACK_IMPORTED_MODULE_3__ =
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

        function Confirm(props) {
          var backendUrl = props.backendUrl,
            handleVerifyResults = props.handleVerifyResults
          var handoverEmail =
            (0,
            _subroutines_utils__WEBPACK_IMPORTED_MODULE_3__.parseQueryParams)(
              window.location.search
            ).email || props.email

          var _useState = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            _useState2 = _slicedToArray(_useState, 2),
            code = _useState2[0],
            setCode = _useState2[1]

          var _useState3 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(handoverEmail),
            _useState4 = _slicedToArray(_useState3, 2),
            email = _useState4[0],
            setEmail = _useState4[1]

          var _useState5 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            _useState6 = _slicedToArray(_useState5, 2),
            errorMessage = _useState6[0],
            setErrorMessage = _useState6[1]

          var verify = function verify() {
            setErrorMessage('')
            axios__WEBPACK_IMPORTED_MODULE_2___default()
              .post(''.concat(backendUrl, '/auth/verify'), {
                username: email,
                code: code,
              })
              .then(handleVerifyResults(email))
              ['catch'](function (e) {
                if (e.response.data) {
                  setErrorMessage(e.response.data.message)
                } else {
                  setErrorMessage(e.message)
                }
              })
          }

          var resendCode = function resendCode() {
            axios__WEBPACK_IMPORTED_MODULE_2___default()
              .post(''.concat(backendUrl, '/auth/resend-code'), {
                username: email,
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
              className: 'flex around',
            },
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'align-center super-margin-top dashboard-container third break-to-full padded',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'h4',
                {
                  className: 'personal-margin-bottom personal-margin-top',
                },
                'Verify'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'h6',
                null,
                'Please Enter the Verification Code',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('br', null),
                'sent to your Email (',
                email,
                ').'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  className:
                    'thin-container ostrich-container personal-space-bottom',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                  name: 'username',
                  className: 'three-fourths personal-margin-bottom',
                  placeholder: 'Email',
                  value: email,
                  onInput: eliminateEvent(setEmail),
                }),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                  name: 'code',
                  className: 'three-fourths personal-margin-bottom',
                  placeholder: 'Code',
                  value: code,
                  onInput: eliminateEvent(setCode),
                }),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'button',
                  {
                    className: 'four-fifths ostrich-button',
                    type: 'submit',
                    onClick: verify,
                  },
                  'Submit'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'p',
                  {
                    class: 'error',
                  },
                  errorMessage
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'button',
                  {
                    className: 'four-fifths ostrich-button',
                    onClick: resendCode,
                  },
                  'Resend Code'
                )
              )
            )
          )
        }

        /***/
      },

    /***/ './src/components/ConfirmForgotPassword.jsx':
      /*!**************************************************!*\
  !*** ./src/components/ConfirmForgotPassword.jsx ***!
  \**************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        'use strict'
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
        /* harmony import */ var _subroutines_utils__WEBPACK_IMPORTED_MODULE_3__ =
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

        function Confirm(props) {
          var backendUrl = props.backendUrl,
            handleConfirmForgotPasswordResults =
              props.handleConfirmForgotPasswordResults
          var handoverEmail =
            (0,
            _subroutines_utils__WEBPACK_IMPORTED_MODULE_3__.parseQueryParams)(
              window.location.search
            ).email || props.email

          var _useState = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            _useState2 = _slicedToArray(_useState, 2),
            code = _useState2[0],
            setCode = _useState2[1]

          var _useState3 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(handoverEmail),
            _useState4 = _slicedToArray(_useState3, 2),
            email = _useState4[0],
            setEmail = _useState4[1]

          var _useState5 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            _useState6 = _slicedToArray(_useState5, 2),
            password = _useState6[0],
            setPassword = _useState6[1]

          var _useState7 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            _useState8 = _slicedToArray(_useState7, 2),
            confirmPassword = _useState8[0],
            setConfirmPassword = _useState8[1]

          var _useState9 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            _useState10 = _slicedToArray(_useState9, 2),
            errorMessage = _useState10[0],
            setErrorMessage = _useState10[1]

          var confirmForgotPassword = function confirmForgotPassword() {
            if (password != confirmPassword) {
              setErrorMessage('Passwords do not match!')
            } else {
              setErrorMessage('')
              axios__WEBPACK_IMPORTED_MODULE_2___default()
                .post(''.concat(backendUrl, '/auth/confirm-forgot-password'), {
                  username: email,
                  password: password,
                  code: code,
                })
                .then(handleConfirmForgotPasswordResults(email))
                ['catch'](function (e) {
                  setErrorMessage(e.response.data.message)
                })
            }
          }

          var resendCode = function resendCode() {
            setErrorMessage('')
            axios__WEBPACK_IMPORTED_MODULE_2___default()
              .post(''.concat(backendUrl, '/auth/resend-code'), {
                username: email,
              })
              .then(function (r) {
                setErrorMessage(r.data.message)
              })
              ['catch'](function (e) {
                if (e.response.data) {
                  setErrorMessage(e.response.data.message)
                } else {
                  setErrorMessage(e.message)
                }
              })
          }

          return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
            'div',
            {
              className: 'flex around',
            },
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'align-center super-margin-top dashboard-container third break-to-full padded',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'h4',
                {
                  className: 'personal-margin-bottom personal-margin-top',
                },
                'Confirm Password'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  className:
                    'thin-container ostrich-container personal-space-bottom',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                  name: 'username',
                  className: 'three-fourths personal-margin-bottom',
                  value: email,
                  placeholder: 'Email',
                  onInput: eliminateEvent(setEmail),
                }),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                  name: 'password',
                  type: 'password',
                  placeholder: 'New Password',
                  className: 'three-fourths personal-margin-bottom',
                  value: password,
                  onInput: eliminateEvent(setPassword),
                }),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                  name: 'confirm-password',
                  className: 'three-fourths personal-margin-bottom',
                  type: 'password',
                  placeholder: 'Confirm Password',
                  value: confirmPassword,
                  onInput: eliminateEvent(setConfirmPassword),
                }),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                  name: 'code',
                  className: 'three-fourths personal-margin-bottom',
                  value: code,
                  placeholder: 'Code',
                  onInput: eliminateEvent(setCode),
                }),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'button',
                  {
                    className: 'ostrich-button four-fifths',
                    type: 'submit',
                    onClick: confirmForgotPassword,
                  },
                  'Submit'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'p',
                  {
                    class: 'error',
                  },
                  errorMessage
                )
              )
            )
          )
        }

        /***/
      },

    /***/ './src/components/EditEmailForm.jsx':
      /*!******************************************!*\
  !*** ./src/components/EditEmailForm.jsx ***!
  \******************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ EditEmailForm,
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

        function EditEmailForm(props) {
          var backendUrl = props.backendUrl,
            setSuccessfulSubmition = props.setSuccessfulSubmition,
            scheduledEmail = props.scheduledEmail,
            selectedMarket = props.selectedMarket

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
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.min_price : '0'
            ),
            _useState6 = _slicedToArray(_useState5, 2),
            minPrice = _useState6[0],
            setMinPrice = _useState6[1]

          var _useState7 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.max_price : '0'
            ),
            _useState8 = _slicedToArray(_useState7, 2),
            maxPrice = _useState8[0],
            setMaxPrice = _useState8[1]

          var _useState9 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.search_param : '0'
            ),
            _useState10 = _slicedToArray(_useState9, 2),
            searchParams = _useState10[0],
            setSearchParams = _useState10[1]

          var _useState11 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.no_bedrooms : '0'
            ),
            _useState12 = _slicedToArray(_useState11, 2),
            numBedrooms = _useState12[0],
            setNumBedrooms = _useState12[1]

          var _useState13 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.no_bathrooms : '0'
            ),
            _useState14 = _slicedToArray(_useState13, 2),
            numBathrooms = _useState14[0],
            setNumBathrooms = _useState14[1]

          var _useState15 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.notes : '0'
            ),
            _useState16 = _slicedToArray(_useState15, 2),
            notes = _useState16[0],
            setNotes = _useState16[1]

          var _useState17 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.insurance : '0'
            ),
            _useState18 = _slicedToArray(_useState17, 2),
            insurance = _useState18[0],
            setInsurance = _useState18[1]

          var _useState19 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.vacancy : '0'
            ),
            _useState20 = _slicedToArray(_useState19, 2),
            vacancy = _useState20[0],
            setVacancy = _useState20[1]

          var _useState21 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.property_management : '0'
            ),
            _useState22 = _slicedToArray(_useState21, 2),
            propertyManagement = _useState22[0],
            setPropertyManagement = _useState22[1]

          var _useState23 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.capex : '0'
            ),
            _useState24 = _slicedToArray(_useState23, 2),
            capex = _useState24[0],
            setCapex = _useState24[1]

          var _useState25 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.repairs : '0'
            ),
            _useState26 = _slicedToArray(_useState25, 2),
            repairs = _useState26[0],
            setRepairs = _useState26[1]

          var _useState27 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.utilities : '0'
            ),
            _useState28 = _slicedToArray(_useState27, 2),
            utilities = _useState28[0],
            setUtilities = _useState28[1]

          var _useState29 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.down_payment : '0'
            ),
            _useState30 = _slicedToArray(_useState29, 2),
            downPayment = _useState30[0],
            setDownPayment = _useState30[1]

          var _useState31 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.closing_cost : '0'
            ),
            _useState32 = _slicedToArray(_useState31, 2),
            closingCosts = _useState32[0],
            setClosingCosts = _useState32[1]

          var _useState33 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.loan_interest : '0'
            ),
            _useState34 = _slicedToArray(_useState33, 2),
            loanInterest = _useState34[0],
            setLoanInterest = _useState34[1]

          var _useState35 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.loan_months : '0'
            ),
            _useState36 = _slicedToArray(_useState35, 2),
            loanMonths = _useState36[0],
            setLoanMonths = _useState36[1]

          var _useState37 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.additional_monthly_expenses : '0'
            ),
            _useState38 = _slicedToArray(_useState37, 2),
            additionalMonthlyExpenses = _useState38[0],
            setAdditionalMonthlyExpenses = _useState38[1]

          ;(0, preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(
            function () {
              setSuccessMessage('')
            },
            [selectedMarket]
          )
          ;(0, preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(
            function () {
              setMinPrice(scheduledEmail ? scheduledEmail.min_price : '0')
              setMaxPrice(scheduledEmail ? scheduledEmail.max_price : '0')
              setSearchParams(
                scheduledEmail ? scheduledEmail.search_param : '0'
              )
              setNumBedrooms(scheduledEmail ? scheduledEmail.no_bedrooms : '0')
              setNumBathrooms(
                scheduledEmail ? scheduledEmail.no_bathrooms : '0'
              )
              setNotes(scheduledEmail ? scheduledEmail.notes : '0')
              setInsurance(scheduledEmail ? scheduledEmail.insurance : '0')
              setVacancy(scheduledEmail ? scheduledEmail.vacancy : '0')
              setPropertyManagement(
                scheduledEmail ? scheduledEmail.property_management : '0'
              )
              setCapex(scheduledEmail ? scheduledEmail.capex : '0')
              setRepairs(scheduledEmail ? scheduledEmail.repairs : '0')
              setUtilities(scheduledEmail ? scheduledEmail.utilities : '0')
              setDownPayment(scheduledEmail ? scheduledEmail.down_payment : '0')
              setClosingCosts(
                scheduledEmail ? scheduledEmail.closing_cost : '0'
              )
              setLoanInterest(
                scheduledEmail ? scheduledEmail.loan_interest : '0'
              )
              setLoanMonths(scheduledEmail ? scheduledEmail.loan_months : '0')
              setAdditionalMonthlyExpenses(
                scheduledEmail
                  ? scheduledEmail.additional_monthly_expenses
                  : '0'
              )
            },
            [scheduledEmail]
          )

          if (!scheduledEmail) {
            return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('div', null)
          }

          var flipHideCocCalculations = function flipHideCocCalculations() {
            return setHideCocCalculations(!hideCocCalculations)
          }

          var scheduleEmail = function scheduleEmail() {
            if (!notes) {
              setErrorMessage('Missing Title!')
              return
            }

            if (!searchParams) {
              setErrorMessage('Missing Location!')
              return
            }

            if (!searchParams.match(/\w County, [A-Z]{2}/)) {
              setErrorMessage(
                'Location must exactly match "___ County, [State Code]"!'
              )
              return
            }

            if (!insurance && 0 != insurance) {
              setErrorMessage('Missing insurance!')
              return
            }

            if (!vacancy && 0 != vacancy) {
              setErrorMessage('Missing vacancy!')
              return
            }

            if (!propertyManagement && 0 != propertyManagement) {
              setErrorMessage('Missing propertyManagement!')
              return
            }

            if (!repairs && 0 != repairs) {
              setErrorMessage('Missing repairs!')
              return
            }

            if (!capex && 0 != capex) {
              setErrorMessage('Missing capex!')
              return
            }

            if (!utilities && 0 != utilities) {
              setErrorMessage('Missing utilities!')
              return
            }

            if (!parseFloat(downPayment)) {
              setErrorMessage(
                'Down Payment cannot be 0. Use a small number instead, like 0.0001'
              )
              return
            }

            if (!parseFloat(closingCosts)) {
              setErrorMessage(
                'Closing Cost cannot be 0. Use a small number instead, like 0.0001'
              )
              return
            }

            if (!parseFloat(loanInterest)) {
              setErrorMessage(
                'Loan Interest cannot be 0. If you are buying all cash, enter .0001'
              )
              return
            }

            if (!parseFloat(loanMonths)) {
              setErrorMessage(
                'Loan Months cannot be 0. Use a small number instead, like 0.0001'
              )
              return
            }

            if (!additionalMonthlyExpenses && 0 != additionalMonthlyExpenses) {
              setErrorMessage('Missing additionalMonthlyExpenses!')
              return
            }

            try {
              axios__WEBPACK_IMPORTED_MODULE_2___default()
                .put(''.concat(backendUrl, '/api/emailers'), {
                  id: scheduledEmail.id,
                  insurance: parseFloat(insurance),
                  vacancy: parseFloat(vacancy),
                  property_management: parseFloat(propertyManagement),
                  capex: parseFloat(capex),
                  repairs: parseFloat(repairs),
                  utilities: parseFloat(utilities),
                  down_payment: parseFloat(downPayment),
                  closing_cost: parseFloat(closingCosts),
                  loan_interest: parseFloat(loanInterest),
                  loan_months: parseFloat(loanMonths),
                  additional_monthly_expenses: parseFloat(
                    additionalMonthlyExpenses
                  ),
                  min_price: parseFloat(minPrice),
                  max_price: parseFloat(maxPrice),
                  search_param: searchParams,
                  no_bedrooms: parseFloat(numBedrooms),
                  no_bathrooms: parseFloat(numBathrooms),
                  notes: notes,
                  frequency: 'Daily',
                })
                .then(function (r) {
                  setSuccessfulSubmition(Math.random())
                  setSuccessMessage('Market updated.')
                })
                ['catch'](function (e) {
                  if (e.response.data) {
                    setErrorMessage(e.response.data.message)
                  } else {
                    setErrorMessage(e.message)
                  }
                })
            } catch (error) {
              setErrorMessage(error.message)
            }
          }

          var cocCalculationParams = (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
            preact__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            null,
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'insurance-input',
                },
                'Insurance',
                ' ',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    title:
                      'Enter the per month number you will pay for insurance. Usually this is $60-$80 per month for a single family.',
                  },
                  '(i)'
                ),
                ':'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: insurance,
                onInput: eliminateEvent(setInsurance),
              }),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '$/mo')
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'vacancy-input',
                },
                'Vacancy',
                ' ',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    title:
                      'This is a monthly expense. Enter as a percent of monthly gross income. Usually this is 6-8%',
                  },
                  '(i)'
                ),
                ':'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: vacancy,
                onInput: eliminateEvent(setVacancy),
              }),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '%/mo')
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'property-input',
                },
                'Property Management',
                ' ',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    title:
                      'This is a monthly expense. Enter as a percent of monthly gross income. Usually this is 8-12%',
                  },
                  '(i)'
                ),
                ':'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: propertyManagement,
                onInput: eliminateEvent(setPropertyManagement),
              }),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '%/mo')
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'capex-input',
                },
                'Capex',
                ' ',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    title:
                      'This is a monthly expense. Enter as a percent of monthly gross income. Usually this is 5-15% depending on the condition of the property',
                  },
                  '(i)'
                ),
                ':'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: capex,
                onInput: eliminateEvent(setCapex),
              }),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '%/mo')
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'repairs-input',
                },
                'Repairs',
                ' ',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    title:
                      'This is a monthly expense. Enter as a percent of monthly gross income. Usually this is 5-10% depending on the condition of the property',
                  },
                  '(i)'
                ),
                ':'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: repairs,
                onInput: eliminateEvent(setRepairs),
              }),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '%/mo')
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'utilities-input',
                },
                'Utilities',
                ' ',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    title:
                      'This is a monthly expense. For a single-family rental, the tenants pay for utilities usually, so put 0. Double check with your broker once',
                  },
                  '(i)'
                ),
                ':'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: utilities,
                onInput: eliminateEvent(setUtilities),
              }),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '$/mo')
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'down-payment-input',
                },
                'Down Payment',
                ' ',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    title:
                      'This is the downpayment % for the loan as required by your bank. Usually this is 20% but check with your lender once',
                  },
                  '(i)'
                ),
                ':'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: downPayment,
                onInput: eliminateEvent(setDownPayment),
              }),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '%')
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'closing-cost-input',
                },
                'Closing Cost',
                ' ',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    title:
                      'This is the one time cost to close the loan on the property. It includes any bank fees, lawyer fees, appraisal fees etc. Usually it is 3-5% and calculated on the offer price',
                  },
                  '(i)'
                ),
                ':'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: closingCosts,
                onInput: eliminateEvent(setClosingCosts),
              }),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '%')
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'loan-interest-input',
                },
                'Loan Interest',
                ' ',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    title: 'Enter the interest rate charged by your bank',
                  },
                  '(i)'
                ),
                ':'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: loanInterest,
                onInput: eliminateEvent(setLoanInterest),
              }),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '%')
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'loan-months-input',
                },
                'Loan Months',
                ' ',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    title:
                      'Enter the number of months the loan is for. For example - if the loan is for 30 years, enter 360 months',
                  },
                  '(i)'
                ),
                ':'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: loanMonths,
                onInput: eliminateEvent(setLoanMonths),
              }),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, 'mos')
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'additional-monthly-expenses-input',
                },
                'Additional Monthly Expenses',
                ' ',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    title: 'Enter any additional expenses per month',
                  },
                  '(i)'
                ),
                ':'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: additionalMonthlyExpenses,
                onInput: eliminateEvent(setAdditionalMonthlyExpenses),
              }),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '$/mo')
            )
          )
          return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
            'div',
            {
              className: 'padded',
            },
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'search-params-input',
                },
                'Title:'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                value: notes,
                className: 'half',
                placeholder: 'e.g. High Cash Market',
                onInput: eliminateEvent(setNotes),
              })
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'search-params-input',
                },
                'County:'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                value: searchParams,
                className: 'half',
                placeholder: 'e.g. Essex County, NJ',
                onInput: eliminateEvent(setSearchParams),
              })
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'min-price-input',
                },
                'Minimum Price:'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                className: 'half',
                value: minPrice,
                placeholder: 'e.g. 100000',
                onInput: eliminateEvent(setMinPrice),
              })
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'max-price-input',
                },
                'Maximum Price:'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                className: 'half',
                value: maxPrice,
                placeholder: 'e.g. 300000',
                onInput: eliminateEvent(setMaxPrice),
              })
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'num-bedrooms-input',
                },
                'Num. Bedrooms (minimum):'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                className: 'half',
                value: numBedrooms,
                placeholder: 'e.g. 3',
                onInput: eliminateEvent(setNumBedrooms),
              })
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'num-bedrooms-input',
                },
                'Num. Bathrooms (minimum):'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                className: 'half',
                value: numBathrooms,
                placeholder: 'e.g. 2',
                onInput: eliminateEvent(setNumBathrooms),
              })
            ),
            cocCalculationParams,
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'p',
              {
                className: 'error',
              },
              errorMessage
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'p',
              {
                className: 'success',
              },
              successMessage
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className: 'flex around',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'button',
                {
                  className: 'ostrich-button',
                  onClick: scheduleEmail,
                },
                'Update'
              )
            )
          )
        }

        /***/
      },

    /***/ './src/components/EmailerDashboard.jsx':
      /*!*********************************************!*\
  !*** ./src/components/EmailerDashboard.jsx ***!
  \*********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ EmailerDashboard,
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
        /* harmony import */ var _ScheduleEmailForm__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./ScheduleEmailForm */ './src/components/ScheduleEmailForm.jsx'
          )
        /* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! axios */ './node_modules/axios/index.js')
        /* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default =
          /*#__PURE__*/ __webpack_require__.n(
            axios__WEBPACK_IMPORTED_MODULE_3__
          )
        /* harmony import */ var _EmailerDetails__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ./EmailerDetails */ './src/components/EmailerDetails.jsx'
          )
        /* harmony import */ var _EditEmailForm__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! ./EditEmailForm */ './src/components/EditEmailForm.jsx'
          )
        /* harmony import */ var _subroutines_math__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! ../subroutines/math */ './src/subroutines/math.js'
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

        var allowedMarkets = function allowedMarkets(billing_id) {
          return billing_id == 'Tier 1'
            ? 1
            : billing_id == 'Tier 2'
            ? 1
            : billing_id == 'Tier 3'
            ? 3
            : 0
        }

        var scheduleNewMarketKey = 'new'
        function EmailerDashboard(props) {
          var backendUrl = props.backendUrl,
            user = props.user,
            toPayments = props.toPayments

          var _useState = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
            _useState2 = _slicedToArray(_useState, 2),
            showModal = _useState2[0],
            setShowModal = _useState2[1]

          var _useState3 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            _useState4 = _slicedToArray(_useState3, 2),
            errorMessage = _useState4[0],
            setErrorMessage = _useState4[1]

          var _useState5 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
            _useState6 = _slicedToArray(_useState5, 2),
            scheduledEmails = _useState6[0],
            setScheduledEmails = _useState6[1]

          var _useState7 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduleNewMarketKey
            ),
            _useState8 = _slicedToArray(_useState7, 2),
            selectedMarket = _useState8[0],
            setSelectedMarket = _useState8[1]

          var _useState9 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
            _useState10 = _slicedToArray(_useState9, 2),
            loadingState = _useState10[0],
            setLoadingState = _useState10[1]

          var _useState11 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
            _useState12 = _slicedToArray(_useState11, 2),
            successfulSubmition = _useState12[0],
            setSuccessfulSubmition = _useState12[1]

          var _useState13 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
            _useState14 = _slicedToArray(_useState13, 2),
            maxSize = _useState14[0],
            setMaxSize = _useState14[1]

          ;(0, preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(
            function () {
              if (user) {
                var newMaxSize = allowedMarkets(user.billing_id)
                setMaxSize(newMaxSize)
                axios__WEBPACK_IMPORTED_MODULE_3___default()
                  .get(''.concat(backendUrl, '/api/emailers'))
                  .then(function (r) {
                    r.data.sort(function (a, b) {
                      return b.id - a.id
                    })
                    setScheduledEmails(r.data)
                    setLoadingState(false)

                    if (r.data.length > 0 && r.data.length >= newMaxSize) {
                      setSelectedMarket(r.data[0].notes)
                    }

                    if (r.data.length == 0) {
                      setSelectedMarket(scheduleNewMarketKey)
                    }
                  })
                  ['catch'](function (e) {
                    setLoadingState(false)

                    if (e.response.data) {
                      setErrorMessage(e.response.data.message)
                    } else {
                      setErrorMessage(e.message)
                    }
                  })
              }

              setLoadingState(true)
            },
            [user, successfulSubmition]
          )
          var scheduledEmailList = scheduledEmails.map(function (
            scheduledEmail,
            i
          ) {
            return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                onClick: function onClick() {
                  setSelectedMarket(scheduledEmail.notes)
                  setShowModal(true)
                },
                key: i,
                className: 'padded-double '
                  .concat(
                    scheduledEmails[i].notes == selectedMarket
                      ? 'gray'
                      : 'hover-item',
                    ' border-bottom border-right\n        '
                  )
                  .concat(i + 1 > maxSize ? 'error' : ''),
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'h6',
                null,
                scheduledEmail.notes
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'p',
                null,
                scheduledEmail.search_param
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'p',
                null,
                '$',
                (0, _subroutines_math__WEBPACK_IMPORTED_MODULE_6__.nFormatter)(
                  scheduledEmail.min_price
                ),
                '-$',
                (0, _subroutines_math__WEBPACK_IMPORTED_MODULE_6__.nFormatter)(
                  scheduledEmail.max_price
                )
              ),
              i + 1 > maxSize &&
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'p',
                  null,
                  'Exceeded Max count per plan; Market Disabled.'
                )
            )
          })
          var emailerDetails =
            selectedMarket == scheduleNewMarketKey
              ? (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  {
                    className: 'padded',
                  },
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'h5',
                    null,
                    'Schedule a New Email'
                  ),
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'p',
                    null,
                    'Once you save your parameters below, you will get an email daily at around 10am ET with the newest properties and their expected cash flow.'
                  )
                )
              : (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  _EmailerDetails__WEBPACK_IMPORTED_MODULE_4__['default'],
                  {
                    backendUrl: backendUrl,
                    setSuccessfulSubmition: setSuccessfulSubmition,
                    scheduledEmail: scheduledEmails.find(function (emailer) {
                      return emailer.notes == selectedMarket
                    }),
                    isAllowedToDuplicate: scheduledEmails.length < maxSize,
                  }
                )
          var emailerForm =
            selectedMarket == scheduleNewMarketKey
              ? (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  _ScheduleEmailForm__WEBPACK_IMPORTED_MODULE_2__['default'],
                  {
                    backendUrl: backendUrl,
                    selectedMarket: selectedMarket,
                    setSuccessfulSubmition: setSuccessfulSubmition,
                  }
                )
              : (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  _EditEmailForm__WEBPACK_IMPORTED_MODULE_5__['default'],
                  {
                    backendUrl: backendUrl,
                    selectedMarket: selectedMarket,
                    setSuccessfulSubmition: setSuccessfulSubmition,
                    scheduledEmail: scheduledEmails.find(function (emailer) {
                      return emailer.notes == selectedMarket
                    }),
                  }
                )
          var tierMessage =
            user && user.billing_id
              ? (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  preact__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                  null,
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'p',
                    null,
                    'You are subscribed to ',
                    user.billing_id,
                    ': On this plan',
                    ' ',
                    maxSize == 1
                      ? '1 market is'
                      : ''.concat(maxSize, ' markets are'),
                    ' allowed.',
                    ' ',
                    (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                      'a',
                      {
                        href: '/payments.html',
                      },
                      'Change plan here'
                    ),
                    '.'
                  ),
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'h6',
                    null,
                    'A market can mean anything like a zipcode, county, city, borough etc. For simplicity we consider a county as a market',
                    ' '
                  )
                )
              : (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'h6',
                  null,
                  'You are not subscribed! ',
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'a',
                    {
                      href: '/payments.html',
                    },
                    'Change plan here'
                  ),
                  '.'
                )
          return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
            preact__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            null,
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'h4',
              {
                className: 'padded',
              },
              'Targeted Markets'
            ),
            tierMessage,
            showModal &&
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  className: 'modal flex around wrap show-on-small full',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  {
                    className: 'padded',
                  },
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'button',
                    {
                      class: 'plain-button',
                      onClick: function onClick() {
                        return setShowModal(false)
                      },
                    },
                    'Close'
                  )
                ),
                emailerDetails,
                emailerForm
              ),
            !showModal &&
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  className: 'show-on-small',
                },
                scheduledEmails.length < maxSize &&
                  !loadingState &&
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'div',
                    {
                      onClick: function onClick() {
                        setSelectedMarket(scheduleNewMarketKey)
                        setShowModal(true)
                      },
                      key: 'create',
                      className:
                        'padded-double border-right border-bottom border-top '.concat(
                          selectedMarket == scheduleNewMarketKey
                            ? 'gray'
                            : 'hover-item'
                        ),
                    },
                    (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('h5', null, '+'),
                    (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                      'p',
                      null,
                      'Schedule notifications for a market'
                    )
                  ),
                scheduledEmailList
              ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className: 'hide-on-small',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  className: 'flex dashboard-container',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  {
                    className: 'fourth',
                  },
                  scheduledEmails.length < maxSize &&
                    !loadingState &&
                    (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                      'div',
                      {
                        onClick: function onClick() {
                          setSelectedMarket(scheduleNewMarketKey)
                          setShowModal(true)
                        },
                        key: 'create',
                        className:
                          'padded-double border-right border-bottom '.concat(
                            selectedMarket == scheduleNewMarketKey
                              ? 'gray'
                              : 'hover-item'
                          ),
                      },
                      (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                        'h5',
                        null,
                        '+'
                      ),
                      (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                        'p',
                        null,
                        'Schedule notifications for a market'
                      )
                    ),
                  scheduledEmailList
                ),
                !loadingState &&
                  maxSize != 0 &&
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'div',
                    {
                      className: 'personal-space-top-double full flex around',
                    },
                    (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                      'div',
                      {
                        className: 'three-fourths',
                      },
                      emailerDetails,
                      emailerForm
                    )
                  )
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

    /***/ './src/components/EmailerDetails.jsx':
      /*!*******************************************!*\
  !*** ./src/components/EmailerDetails.jsx ***!
  \*******************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ EmailerDetails,
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

        function EmailerDetails(props) {
          var backendUrl = props.backendUrl,
            setSuccessfulSubmition = props.setSuccessfulSubmition,
            scheduledEmail = props.scheduledEmail,
            small = props.small,
            isAllowedToDuplicate = props.isAllowedToDuplicate

          var _useState = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            _useState2 = _slicedToArray(_useState, 2),
            errorMessage = _useState2[0],
            setErrorMessage = _useState2[1]

          var _useState3 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.min_price : null
            ),
            _useState4 = _slicedToArray(_useState3, 2),
            minPrice = _useState4[0],
            setMinPrice = _useState4[1]

          var _useState5 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.max_price : null
            ),
            _useState6 = _slicedToArray(_useState5, 2),
            maxPrice = _useState6[0],
            setMaxPrice = _useState6[1]

          var _useState7 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.search_param : null
            ),
            _useState8 = _slicedToArray(_useState7, 2),
            searchParams = _useState8[0],
            setSearchParams = _useState8[1]

          var _useState9 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.no_bedrooms : null
            ),
            _useState10 = _slicedToArray(_useState9, 2),
            numBedrooms = _useState10[0],
            setNumBedrooms = _useState10[1]

          var _useState11 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.no_bathrooms : null
            ),
            _useState12 = _slicedToArray(_useState11, 2),
            numBathrooms = _useState12[0],
            setNumBathrooms = _useState12[1]

          var _useState13 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.notes : null
            ),
            _useState14 = _slicedToArray(_useState13, 2),
            notes = _useState14[0],
            setNotes = _useState14[1]

          var _useState15 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.insurance : null
            ),
            _useState16 = _slicedToArray(_useState15, 2),
            insurance = _useState16[0],
            setInsurance = _useState16[1]

          var _useState17 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.vacancy : null
            ),
            _useState18 = _slicedToArray(_useState17, 2),
            vacancy = _useState18[0],
            setVacancy = _useState18[1]

          var _useState19 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.property_management : null
            ),
            _useState20 = _slicedToArray(_useState19, 2),
            propertyManagement = _useState20[0],
            setPropertyManagement = _useState20[1]

          var _useState21 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.capex : null
            ),
            _useState22 = _slicedToArray(_useState21, 2),
            capex = _useState22[0],
            setCapex = _useState22[1]

          var _useState23 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.repairs : null
            ),
            _useState24 = _slicedToArray(_useState23, 2),
            repairs = _useState24[0],
            setRepairs = _useState24[1]

          var _useState25 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.utilities : null
            ),
            _useState26 = _slicedToArray(_useState25, 2),
            utilities = _useState26[0],
            setUtilities = _useState26[1]

          var _useState27 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.down_payment : null
            ),
            _useState28 = _slicedToArray(_useState27, 2),
            downPayment = _useState28[0],
            setDownPayment = _useState28[1]

          var _useState29 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.closing_cost : null
            ),
            _useState30 = _slicedToArray(_useState29, 2),
            closingCosts = _useState30[0],
            setClosingCosts = _useState30[1]

          var _useState31 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.loan_interest : null
            ),
            _useState32 = _slicedToArray(_useState31, 2),
            loanInterest = _useState32[0],
            setLoanInterest = _useState32[1]

          var _useState33 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.loan_months : null
            ),
            _useState34 = _slicedToArray(_useState33, 2),
            loanMonths = _useState34[0],
            setLoanMonths = _useState34[1]

          var _useState35 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(
              scheduledEmail ? scheduledEmail.additional_monthly_expenses : null
            ),
            _useState36 = _slicedToArray(_useState35, 2),
            additionalMonthlyExpenses = _useState36[0],
            setAdditionalMonthlyExpenses = _useState36[1]

          ;(0, preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(
            function () {
              setMinPrice(scheduledEmail ? scheduledEmail.min_price : null)
              setMaxPrice(scheduledEmail ? scheduledEmail.max_price : null)
              setSearchParams(
                scheduledEmail ? scheduledEmail.search_param : null
              )
              setNumBedrooms(scheduledEmail ? scheduledEmail.no_bedrooms : null)
              setNumBathrooms(
                scheduledEmail ? scheduledEmail.no_bathrooms : null
              )
              setNotes(scheduledEmail ? scheduledEmail.notes : null)
              setInsurance(scheduledEmail ? scheduledEmail.insurance : null)
              setVacancy(scheduledEmail ? scheduledEmail.vacancy : null)
              setPropertyManagement(
                scheduledEmail ? scheduledEmail.property_management : null
              )
              setCapex(scheduledEmail ? scheduledEmail.capex : null)
              setRepairs(scheduledEmail ? scheduledEmail.repairs : null)
              setUtilities(scheduledEmail ? scheduledEmail.utilities : null)
              setDownPayment(
                scheduledEmail ? scheduledEmail.down_payment : null
              )
              setClosingCosts(
                scheduledEmail ? scheduledEmail.closing_cost : null
              )
              setLoanInterest(
                scheduledEmail ? scheduledEmail.loan_interest : null
              )
              setLoanMonths(scheduledEmail ? scheduledEmail.loan_months : null)
              setAdditionalMonthlyExpenses(
                scheduledEmail
                  ? scheduledEmail.additional_monthly_expenses
                  : null
              )
            },
            [scheduledEmail]
          )

          if (!scheduledEmail) {
            return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'h4',
              null,
              'Loading Market Record...'
            )
          }

          var deleteEmail = function deleteEmail() {
            axios__WEBPACK_IMPORTED_MODULE_2___default()
              ['delete'](
                ''
                  .concat(backendUrl, '/api/emailers/')
                  .concat(scheduledEmail.id)
              )
              .then(function (r) {
                setSuccessfulSubmition(Math.random())
                setErrorMessage('')
              })
              ['catch'](function (e) {
                setErrorMessage(e.response.data.message)
              })
          }

          var duplicateEmail = function duplicateEmail() {
            axios__WEBPACK_IMPORTED_MODULE_2___default()
              .post(''.concat(backendUrl, '/api/emailers'), {
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
                no_bathrooms: parseInt(numBathrooms),
                notes: ''.concat(notes, ' Clone'),
                frequency: 'Daily',
              })
              .then(function (r) {
                setSuccessfulSubmition(Math.random())
                setSuccessMessage('Market Duplicated.')
              })
              ['catch'](function (e) {
                if (e.response.data) {
                  setErrorMessage(e.response.data.message)
                } else {
                  setErrorMessage(e.message)
                }
              })
          }

          return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
            'div',
            {
              className: 'padded',
            },
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'h5',
              null,
              scheduledEmail.notes
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className: 'show-on-small',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'p',
                null,
                '$',
                scheduledEmail.min_price,
                ' - $',
                scheduledEmail.max_price
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'p',
                null,
                scheduledEmail.search_param
              )
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'button',
              {
                onClick: deleteEmail,
                className: 'personal-margin-top',
              },
              'Delete'
            ),
            isAllowedToDuplicate &&
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'button',
                {
                  onClick: duplicateEmail,
                  className: 'personal-margin-top personal-margin-left',
                },
                'Duplicate'
              )
          )
        }

        /***/
      },

    /***/ './src/components/ForgotPassword.jsx':
      /*!*******************************************!*\
  !*** ./src/components/ForgotPassword.jsx ***!
  \*******************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ ForgotPassword,
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

        function ForgotPassword(props) {
          var backendUrl = props.backendUrl,
            handleForgotPasswordResults = props.handleForgotPasswordResults

          var _useState = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            _useState2 = _slicedToArray(_useState, 2),
            email = _useState2[0],
            setEmail = _useState2[1]

          var _useState3 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            _useState4 = _slicedToArray(_useState3, 2),
            errorMessage = _useState4[0],
            setErrorMessage = _useState4[1]

          var forgotPassword = function forgotPassword() {
            setErrorMessage('')
            axios__WEBPACK_IMPORTED_MODULE_2___default()
              .post(''.concat(backendUrl, '/auth/forgot-password'), {
                username: email,
              })
              .then(handleForgotPasswordResults(email))
              ['catch'](function (e) {
                if (e.response.data) {
                  setErrorMessage(e.response.data.message)
                } else {
                  setErrorMessage(e.message)
                }
              })
          }

          return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
            'div',
            {
              className: 'flex around',
            },
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'align-center super-margin-top dashboard-container third break-to-full padded',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'h4',
                {
                  className: 'personal-margin-bottom personal-margin-top',
                },
                'Forgot Password'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  className:
                    'thin-container ostrich-container personal-space-bottom',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  null,
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                    name: 'username',
                    className: 'three-fourths personal-margin-bottom',
                    value: email,
                    placeholder: 'Email',
                    onInput: eliminateEvent(setEmail),
                  })
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'button',
                  {
                    className: 'ostrich-button four-fifths',
                    type: 'submit',
                    onClick: forgotPassword,
                  },
                  'Submit'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'p',
                  {
                    class: 'error',
                  },
                  errorMessage
                )
              )
            )
          )
        }

        /***/
      },

    /***/ './src/components/Header.jsx':
      /*!***********************************!*\
  !*** ./src/components/Header.jsx ***!
  \***********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ Header,
          /* harmony export */
        })
        /* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! preact */ './node_modules/preact/dist/preact.module.js'
          )

        function Header(props) {
          var toHome = props.toHome,
            children = props.children
          return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
            preact__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            null,
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className: 'navbar',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  className: 'nav-inner',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'a',
                  {
                    onClick: toHome,
                    className: 'brand-link w-inline-block',
                  },
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('img', {
                    src: '/logo.png',
                    loading: 'lazy',
                    srcset:
                      '/logo-p-500.png 500w, /logo-p-800.png 800w, /logo-p-1080.png 1080w, /logo-p-1600.png 1600w, /logo-p-2000.png 2000w, /logo-p-2600.png 2600w, /logo.png 2825w',
                    sizes: '70px',
                    alt: '',
                    className: 'nav-logo',
                  })
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  {
                    id: 'w-node-df2c582d-9a89-1fcc-9fe7-0e0f1f59e3a2-f8b0799e',
                    className: 'navbar-btn-container',
                  },
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'div',
                    {
                      className: 'flex centered-items',
                    },
                    (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                      'a',
                      {
                        href: 'mailto:v@ostrich.so',
                        className: 'personal-space-right',
                      },
                      'Need Help?'
                    ),
                    children
                  )
                )
              )
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
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ Home,
          /* harmony export */
        })
        /* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! preact */ './node_modules/preact/dist/preact.module.js'
          )
        /* harmony import */ var _Splash__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./Splash */ './src/components/Splash.jsx')
        /* harmony import */ var _Profile__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! ./Profile */ './src/components/Profile.jsx')

        function Home(props) {
          var jwt = props.jwt,
            user = props.user,
            backendUrl = props.backendUrl
          return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
            preact__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            null,
            !jwt &&
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                _Splash__WEBPACK_IMPORTED_MODULE_1__['default'],
                null
              ),
            jwt &&
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                _Profile__WEBPACK_IMPORTED_MODULE_2__['default'],
                {
                  user: user,
                  backendUrl: backendUrl,
                }
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
        'use strict'
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
        /* harmony import */ var _subroutines_utils__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../subroutines/utils */ './src/subroutines/utils.js'
          )
        /* harmony import */ var _api_auth__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! ../api/auth */ './src/api/auth.js')
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

        function Login(props) {
          var backendUrl = props.backendUrl,
            handleLoginResults = props.handleLoginResults,
            proceedWithGoogle = props.proceedWithGoogle,
            toSignup = props.toSignup,
            toForgotPassword = props.toForgotPassword
          var emailFromQp = (0,
          _subroutines_utils__WEBPACK_IMPORTED_MODULE_2__.parseQueryParams)(
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

          var loginAction = function loginAction() {
            setErrorMessage('')
            ;(0, _api_auth__WEBPACK_IMPORTED_MODULE_3__.login)(
              backendUrl,
              {
                username: email,
                password: password,
              },
              handleLoginResults(email),
              setErrorMessage
            )
          }

          return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
            'div',
            {
              className: 'flex around',
            },
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'align-center super-margin-top dashboard-container third break-to-full padded',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'h4',
                {
                  className: 'personal-margin-bottom personal-margin-top',
                },
                'Login'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  className:
                    'thin-container ostrich-container personal-space-bottom align-center',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                  name: 'username',
                  className: 'three-fourths personal-margin-bottom',
                  placeholder: 'Email',
                  value: email,
                  onInput: eliminateEvent(setEmail),
                }),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                  name: 'password',
                  type: 'password',
                  className: 'three-fourths personal-margin-bottom',
                  placeholder: 'Password',
                  value: password,
                  onInput: eliminateEvent(setPassword),
                }),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'button',
                  {
                    className: 'ostrich-button four-fifths personal-margin-top',
                    type: 'submit',
                    onClick: loginAction,
                  },
                  'Login'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'p',
                  {
                    class: 'error',
                  },
                  errorMessage
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  {
                    className: 'personal-margin-bottom personal-margin-top',
                  },
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'span',
                    {
                      onClick: toForgotPassword,
                      className: 'blue-text',
                    },
                    'Forgot Password'
                  )
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'button',
                  {
                    className:
                      'plain-button four-fifths personal-margin-bottom',
                    onClick: proceedWithGoogle,
                  },
                  'Continue With Google'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  null,
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'a',
                    {
                      className: 'four-fifths',
                      onClick: toSignup,
                    },
                    'Go to Signup'
                  )
                )
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
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ Logout,
          /* harmony export */
        })
        /* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! preact */ './node_modules/preact/dist/preact.module.js'
          )

        function Logout(props) {
          return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
            'header',
            {
              className: 'section_header1 bg-purple',
            },
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className: 'padding-global',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  className: 'container-large',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  {
                    className: 'padding-section-small',
                  },
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'div',
                    {
                      className: 'w-layout-grid header1_component-copy',
                    },
                    (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                      'div',
                      {
                        id: 'w-node-ceee6e35-be19-e9cc-f01f-a590743015ff-34c18b3d',
                        className: 'header1_content-copy',
                      },
                      (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                        'h1',
                        null,
                        'You are successfully Logged out!'
                      ),
                      (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                        'div',
                        null,
                        (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                          'div',
                          null,
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'a',
                            {
                              href: '/',
                              className: 'button_upgrade w-button',
                            },
                            'Return Home'
                          )
                        )
                      )
                    )
                  )
                )
              )
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
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ Profile,
          /* harmony export */
        })
        /* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! preact */ './node_modules/preact/dist/preact.module.js'
          )

        function Profile(props) {
          var user = props.user

          if (!user) {
            return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              preact__WEBPACK_IMPORTED_MODULE_0__.Fragment,
              null,
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'h3',
                null,
                'Loading...'
              )
            )
          }

          var price = !user.billing_id
            ? 0
            : user.billing_id == 'Tier 1'
            ? 8.99
            : user.billing_id == 'Tier 2'
            ? 14.99
            : user.billing_id == 'Tier 3'
            ? 19.99
            : 0
          var emailerInfo = !user.billing_id
            ? 'No Access on Free Tier'
            : user.billing_id == 'Tier 1'
            ? '1 Location, 8 listings everyday'
            : user.billing_id == 'Tier 2'
            ? '1 Locations, 20 listings  per location per day max'
            : user.billing_id == 'Tier 3'
            ? '3 locations, 20 listings  per location per day max'
            : ''
          var pluginInfo = !user.billing_id
            ? '10 free uses'
            : 'Unlimited Searches'
          var upgradeOrChange = !user.billing_id ? 'Upgrade' : 'Change'
          var emailerButton = !user.billing_id
            ? ''
            : (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'a',
                {
                  href: '/dashboard',
                  className: 'button_upgrade w-button',
                },
                'Add a Market'
              )
          var detailsMessage = !user.billing_id
            ? (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                preact__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                null,
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'p',
                  null,
                  'You are currently subscribed to Tier 0. Meaning you have 10 free uses per month of the Chrome plugin. Please upgrade below for unlimited plugin use and access to the emailer feature.'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'p',
                  null,
                  'Make sure you are using the same email on the upgrade screen that you signed up with.'
                )
              )
            : (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                preact__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                null,
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'p',
                  null,
                  'In this Tier, you get unlimited usage of the Chrome Extension and also the emailer feature. Add a market below.'
                )
              )
          var paymentLink = '/payments.html'
          var billingTier = user.billing_id ? user.billing_id : 'Free Tier'
          return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
            preact__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            null,
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'header',
              {
                className: 'section_header1 bg-purple',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  className: 'padding-global',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  {
                    className: 'container-large',
                  },
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'div',
                    {
                      className: 'padding-section-small',
                    },
                    (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                      'div',
                      {
                        className: 'w-layout-grid header1_component-copy',
                      },
                      (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                        'div',
                        {
                          id: 'w-node-ceee6e35-be19-e9cc-f01f-a590743015ff-34c18b3d',
                          className: 'header1_content-copy',
                        },
                        (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                          'h1',
                          null,
                          'You are successfully Logged in!'
                        ),
                        (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                          'div',
                          null,
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'div',
                            {
                              className: 'heading-style-h6 text-color-black',
                            },
                            'Your Current Tier'
                          ),
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'div',
                            {
                              className: 'current-text',
                            },
                            billingTier
                          )
                        )
                      )
                    )
                  )
                )
              )
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'section',
              {
                className: 'section_pricing',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  className: 'padding-global',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  {
                    className: 'container-large',
                  },
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'div',
                    {
                      className: 'padding-section-large',
                    },
                    (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                      'div',
                      {
                        className: 'w-layout-grid current-plan_component',
                      },
                      (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                        'div',
                        {
                          className: 'pricing18_plan-_current',
                        },
                        (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                          'div',
                          {
                            className: 'pricing18_content',
                          },
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'div',
                            {
                              className: 'pricing18_content-top',
                            },
                            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                              'div',
                              {
                                className: 'text-align-center',
                              },
                              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                                'div',
                                {
                                  className: 'heading-style-h6',
                                },
                                billingTier
                              ),
                              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                                'div',
                                {
                                  className: 'heading-style-h1',
                                },
                                '$',
                                price,
                                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                                  'span',
                                  {
                                    className: 'heading-style-h4',
                                  },
                                  '/mo'
                                )
                              )
                            ),
                            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                              'div',
                              {
                                className: 'pricing18_feature-list',
                              },
                              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                                'div',
                                {
                                  id: 'w-node-c6127a99-2c7d-7493-6196-05c1a292bcf7-34c18b3d',
                                  className: 'pricing_feature-heading',
                                },
                                'Plugin'
                              ),
                              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                                'div',
                                {
                                  id: 'w-node-c6127a99-2c7d-7493-6196-05c1a292bcf9-34c18b3d',
                                  className: 'pricing18_feature',
                                },
                                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                                  'div',
                                  {
                                    className: 'pricing18_icon-wrapper',
                                  },
                                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                                    'img',
                                    {
                                      src: 'https://uploads-ssl.webflow.com/624380709031623bfe4aee60/6243807090316232dc4aee70_icon_check.svg',
                                      loading: 'lazy',
                                      alt: '',
                                      className: 'icon-1x1-xsmall',
                                    }
                                  )
                                ),
                                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                                  'div',
                                  null,
                                  pluginInfo
                                )
                              ),
                              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                                'div',
                                {
                                  id: 'w-node-c6127a99-2c7d-7493-6196-05c1a292bcfe-34c18b3d',
                                  className: 'pricing_feature-heading',
                                },
                                'Emailer'
                              ),
                              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                                'div',
                                {
                                  id: 'w-node-c6127a99-2c7d-7493-6196-05c1a292bd00-34c18b3d',
                                  className: 'pricing18_feature',
                                },
                                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                                  'div',
                                  null,
                                  emailerInfo
                                )
                              )
                            )
                          )
                        ),
                        (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                          'div',
                          {
                            className: 'current_tier',
                          },
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'div',
                            {
                              className: 'current_tier-text',
                            },
                            'Your Tier'
                          )
                        )
                      ),
                      (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                        'div',
                        {
                          id: 'w-node-_6abca0f8-2ab1-4eba-cf07-0e4bb4136682-34c18b3d',
                          className: 'upgrade-plan_container',
                        },
                        (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                          'div',
                          {
                            className: 'current_tier-header',
                          },
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'h2',
                            null,
                            upgradeOrChange,
                            ' Tier to Get More'
                          ),
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'div',
                            {
                              className: 'text-size-medium',
                            },
                            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                              'p',
                              null,
                              'You are logged in as ',
                              user.email
                            ),
                            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                              'br',
                              null
                            ),
                            detailsMessage
                          )
                        ),
                        (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                          'a',
                          {
                            href: paymentLink,
                          },
                          upgradeOrChange,
                          ' Plan'
                        ),
                        emailerButton
                      )
                    )
                  )
                )
              )
            )
          )
        }

        /***/
      },

    /***/ './src/components/ScheduleEmailForm.jsx':
      /*!**********************************************!*\
  !*** ./src/components/ScheduleEmailForm.jsx ***!
  \**********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ ScheduleEmailForm,
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

        function ScheduleEmailForm(props) {
          var backendUrl = props.backendUrl,
            setSuccessfulSubmition = props.setSuccessfulSubmition,
            selectedMarket = props.selectedMarket

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
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
            _useState6 = _slicedToArray(_useState5, 2),
            hideCocCalculations = _useState6[0],
            setHideCocCalculations = _useState6[1]

          var _useState7 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
            _useState8 = _slicedToArray(_useState7, 2),
            minPrice = _useState8[0],
            setMinPrice = _useState8[1]

          var _useState9 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
            _useState10 = _slicedToArray(_useState9, 2),
            maxPrice = _useState10[0],
            setMaxPrice = _useState10[1]

          var _useState11 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
            _useState12 = _slicedToArray(_useState11, 2),
            searchParams = _useState12[0],
            setSearchParams = _useState12[1]

          var _useState13 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
            _useState14 = _slicedToArray(_useState13, 2),
            numBedrooms = _useState14[0],
            setNumBedrooms = _useState14[1]

          var _useState15 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
            _useState16 = _slicedToArray(_useState15, 2),
            numBathrooms = _useState16[0],
            setNumBathrooms = _useState16[1]

          var _useState17 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            _useState18 = _slicedToArray(_useState17, 2),
            notes = _useState18[0],
            setNotes = _useState18[1]

          var _useState19 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
            _useState20 = _slicedToArray(_useState19, 2),
            insurance = _useState20[0],
            setInsurance = _useState20[1]

          var _useState21 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
            _useState22 = _slicedToArray(_useState21, 2),
            vacancy = _useState22[0],
            setVacancy = _useState22[1]

          var _useState23 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
            _useState24 = _slicedToArray(_useState23, 2),
            propertyManagement = _useState24[0],
            setPropertyManagement = _useState24[1]

          var _useState25 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
            _useState26 = _slicedToArray(_useState25, 2),
            capex = _useState26[0],
            setCapex = _useState26[1]

          var _useState27 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
            _useState28 = _slicedToArray(_useState27, 2),
            repairs = _useState28[0],
            setRepairs = _useState28[1]

          var _useState29 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
            _useState30 = _slicedToArray(_useState29, 2),
            utilities = _useState30[0],
            setUtilities = _useState30[1]

          var _useState31 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
            _useState32 = _slicedToArray(_useState31, 2),
            downPayment = _useState32[0],
            setDownPayment = _useState32[1]

          var _useState33 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
            _useState34 = _slicedToArray(_useState33, 2),
            closingCosts = _useState34[0],
            setClosingCosts = _useState34[1]

          var _useState35 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
            _useState36 = _slicedToArray(_useState35, 2),
            loanInterest = _useState36[0],
            setLoanInterest = _useState36[1]

          var _useState37 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
            _useState38 = _slicedToArray(_useState37, 2),
            loanMonths = _useState38[0],
            setLoanMonths = _useState38[1]

          var _useState39 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
            _useState40 = _slicedToArray(_useState39, 2),
            additionalMonthlyExpenses = _useState40[0],
            setAdditionalMonthlyExpenses = _useState40[1]

          ;(0, preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(
            function () {
              setSuccessMessage('')
            },
            [selectedMarket]
          )

          var flipHideCocCalculations = function flipHideCocCalculations() {
            return setHideCocCalculations(!hideCocCalculations)
          }

          var scheduleEmail = function scheduleEmail() {
            if (!notes) {
              setErrorMessage('Missing Title!')
              return
            }

            if (!searchParams) {
              setErrorMessage('Missing Location!')
              return
            }

            if (!searchParams.match(/\w County, [A-Z]{2}/)) {
              setErrorMessage(
                'Location must exactly match "___ County, [State Code]"!'
              )
              return
            }

            if (!insurance && 0 != insurance) {
              setErrorMessage('Missing insurance!')
              return
            }

            if (!vacancy && 0 != vacancy) {
              setErrorMessage('Missing vacancy!')
              return
            }

            if (!propertyManagement && 0 != propertyManagement) {
              setErrorMessage('Missing propertyManagement!')
              return
            }

            if (!repairs && 0 != repairs) {
              setErrorMessage('Missing repairs!')
              return
            }

            if (!capex && 0 != capex) {
              setErrorMessage('Missing capex!')
              return
            }

            if (!utilities && 0 != utilities) {
              setErrorMessage('Missing utilities!')
              return
            }

            if (!parseFloat(downPayment)) {
              setErrorMessage(
                'Down Payment cannot be 0. Use a small number instead, like 0.0001'
              )
              return
            }

            if (!parseFloat(closingCosts)) {
              setErrorMessage(
                'Closing Cost cannot be 0. Use a small number instead, like 0.0001'
              )
              return
            }

            if (!parseFloat(loanInterest)) {
              setErrorMessage(
                'Loan Interest cannot be 0. If you are buying all cash, enter .001'
              )
              return
            }

            if (!parseFloat(loanMonths)) {
              setErrorMessage(
                'Loan Months cannot be 0. Use a small number instead, like 0.0001'
              )
              return
            }

            if (!additionalMonthlyExpenses && 0 != additionalMonthlyExpenses) {
              setErrorMessage('Missing additionalMonthlyExpenses!')
              return
            }

            try {
              axios__WEBPACK_IMPORTED_MODULE_2___default()
                .post(''.concat(backendUrl, '/api/emailers'), {
                  insurance: parseFloat(insurance),
                  vacancy: parseFloat(vacancy),
                  property_management: parseFloat(propertyManagement),
                  capex: parseFloat(capex),
                  repairs: parseFloat(repairs),
                  utilities: parseFloat(utilities),
                  down_payment: parseFloat(downPayment),
                  closing_cost: parseFloat(closingCosts),
                  loan_interest: parseFloat(loanInterest),
                  loan_months: parseFloat(loanMonths),
                  additional_monthly_expenses: parseFloat(
                    additionalMonthlyExpenses
                  ),
                  min_price: parseFloat(minPrice),
                  max_price: parseFloat(maxPrice),
                  search_param: searchParams,
                  no_bedrooms: parseFloat(numBedrooms),
                  no_bathrooms: parseFloat(numBathrooms),
                  notes: notes,
                  frequency: 'Daily',
                })
                .then(function (r) {
                  setSuccessfulSubmition(Math.random())
                  setSuccessMessage(
                    'Market Submitted. Expect a daily email at 10AM ET.'
                  )
                })
                ['catch'](function (e) {
                  if (e.response.data) {
                    setErrorMessage(e.response.data.message)
                  } else {
                    setErrorMessage(e.message)
                  }
                })
            } catch (error) {
              setErrorMessage(error.message)
            }
          }

          var cocCalculationParams = (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
            preact__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            null,
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'insurance-input',
                },
                'Insurance',
                ' ',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    title:
                      'Enter the per month number you will pay for insurance. Usually this is $60-$80 per month for a single family.',
                  },
                  '(i)'
                ),
                ':'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: insurance,
                onInput: eliminateEvent(setInsurance),
              }),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '$/mo')
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'vacancy-input',
                },
                'Vacancy',
                ' ',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    title:
                      'This is a monthly expense. Enter as a percent of monthly gross income. Usually this is 6-8%',
                  },
                  '(i)'
                ),
                ':'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: vacancy,
                onInput: eliminateEvent(setVacancy),
              }),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '%/mo')
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'property-input',
                },
                'Property Management',
                ' ',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    title:
                      'This is a monthly expense. Enter as a percent of monthly gross income. Usually this is 8-12%',
                  },
                  '(i)'
                ),
                ':'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: propertyManagement,
                onInput: eliminateEvent(setPropertyManagement),
              }),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '%/mo')
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'capex-input',
                },
                'Capex',
                ' ',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    title:
                      'This is a monthly expense. Enter as a percent of monthly gross income. Usually this is 5-15% depending on the condition of the property',
                  },
                  '(i)'
                ),
                ':'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: capex,
                onInput: eliminateEvent(setCapex),
              }),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '%/mo')
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'repairs-input',
                },
                'Repairs',
                ' ',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    title:
                      'This is a monthly expense. Enter as a percent of monthly gross income. Usually this is 5-10% depending on the condition of the property',
                  },
                  '(i)'
                ),
                ':'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: repairs,
                onInput: eliminateEvent(setRepairs),
              }),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '%/mo')
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'utilities-input',
                },
                'Utilities',
                ' ',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    title:
                      'This is a monthly expense. For a single-family rental, the tenants pay for utilities usually, so put 0. Double check with your broker once',
                  },
                  '(i)'
                ),
                ':'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: utilities,
                onInput: eliminateEvent(setUtilities),
              }),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '$/mo')
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'down-payment-input',
                },
                'Down Payment',
                ' ',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    title:
                      'This is the downpayment % for the loan as required by your bank. Usually this is 20% but check with your lender once',
                  },
                  '(i)'
                ),
                ':'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: downPayment,
                onInput: eliminateEvent(setDownPayment),
              }),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '%')
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'closing-cost-input',
                },
                'Closing Cost',
                ' ',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    title:
                      'This is the one time cost to close the loan on the property. It includes any bank fees, lawyer fees, appraisal fees etc. Usually it is 3-5% and calculated on the offer price',
                  },
                  '(i)'
                ),
                ':'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: closingCosts,
                onInput: eliminateEvent(setClosingCosts),
              }),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '%')
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'loan-interest-input',
                },
                'Loan Interest',
                ' ',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    title: 'Enter the interest rate charged by your bank',
                  },
                  '(i)'
                ),
                ':'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: loanInterest,
                onInput: eliminateEvent(setLoanInterest),
              }),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '%')
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'loan-months-input',
                },
                'Loan Months',
                ' ',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    title:
                      'Enter the number of months the loan is for. For example - if the loan is for 30 years, enter 360 months',
                  },
                  '(i)'
                ),
                ':'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: loanMonths,
                onInput: eliminateEvent(setLoanMonths),
              }),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, 'mos')
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'additional-monthly-expenses-input',
                },
                'Additional Monthly Expenses',
                ' ',
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    title: 'Enter any additional expenses per month',
                  },
                  '(i)'
                ),
                ':'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: additionalMonthlyExpenses,
                onInput: eliminateEvent(setAdditionalMonthlyExpenses),
              }),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('b', null, '$/mo')
            )
          )
          return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
            'div',
            {
              className: 'padded',
            },
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'search-params-input',
                },
                'Title:'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                value: notes,
                class: 'half',
                onInput: eliminateEvent(setNotes),
                placeholder: 'e.g. High Cash Market',
              })
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'search-params-input',
                },
                'County:'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                value: searchParams,
                class: 'half',
                placeholder: 'e.g. Essex County, NJ',
                onInput: eliminateEvent(setSearchParams),
              })
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'min-price-input',
                },
                'Minimum Price:'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: minPrice,
                placeholder: 'e.g. 100000',
                onInput: eliminateEvent(setMinPrice),
              })
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'max-price-input',
                },
                'Maximum Price:'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: maxPrice,
                placeholder: 'e.g. 300000',
                onInput: eliminateEvent(setMaxPrice),
              })
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'num-bedrooms-input',
                },
                'Num. Bedrooms (minimum):'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: numBedrooms,
                placeholder: 'e.g. 3',
                onInput: eliminateEvent(setNumBedrooms),
              })
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'flex wrap between centered-items personal-space-bottom',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'label',
                {
                  className: 'third align-left',
                  htmlFor: 'num-bedrooms-input',
                },
                'Num. Bathrooms (minimum):'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                type: 'number',
                class: 'half',
                value: numBathrooms,
                placeholder: 'e.g. 2',
                onInput: eliminateEvent(setNumBathrooms),
              })
            ),
            cocCalculationParams,
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'p',
              {
                className: 'error',
              },
              errorMessage
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'p',
              {
                className: 'success',
              },
              successMessage
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className: 'flex around',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'button',
                {
                  className: 'ostrich-button',
                  onClick: scheduleEmail,
                },
                'Submit'
              )
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
        'use strict'
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

        function Signup(props) {
          var proceedWithGoogle = props.proceedWithGoogle,
            backendUrl = props.backendUrl,
            handleSignupResults = props.handleSignupResults,
            toLogin = props.toLogin

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
              setErrorMessage('')
              axios__WEBPACK_IMPORTED_MODULE_3___default()
                .post(''.concat(backendUrl, '/auth/sign-up'), {
                  username: email,
                  password: password,
                })
                .then(handleSignupResults(email))
                ['catch'](function (e) {
                  if (e.response.data) {
                    setErrorMessage(e.response.data.message)
                  } else {
                    setErrorMessage(e.message)
                  }
                })
            }
          }

          return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
            'div',
            {
              className: 'flex around',
            },
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'div',
              {
                className:
                  'align-center super-margin-top dashboard-container third break-to-full padded',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'h4',
                {
                  className: 'personal-margin-bottom personal-margin-top',
                },
                'Signup'
              ),
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  className:
                    'thin-container ostrich-container personal-space-bottom',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                  name: 'username',
                  className: 'three-fourths personal-margin-bottom',
                  placeholder: 'Email',
                  value: email,
                  onInput: eliminateEvent(setEmail),
                }),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                  name: 'password',
                  type: 'password',
                  className: 'three-fourths personal-margin-bottom',
                  placeholder: 'Password',
                  value: password,
                  onInput: eliminateEvent(setPassword),
                }),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('input', {
                  name: 'confirm-password',
                  className: 'three-fourths personal-margin-bottom',
                  type: 'password',
                  placeholder: 'Confirm Password',
                  value: confirmPassword,
                  onInput: eliminateEvent(setConfirmPassword),
                }),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'span',
                  {
                    class: 'text-size-small w-form-label',
                    for: 'checkbox',
                  },
                  'By registering, you agree to the',
                  ' ',
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'a',
                    {
                      href: 'https://www.notion.so/ostrch/Terms-of-Use-035e32f803d542459ad3429e6b42eeee',
                      target: '_blank',
                      class: 'form_text-bold',
                    },
                    'Terms'
                  ),
                  ' ',
                  'and',
                  ' ',
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'a',
                    {
                      href: 'https://www.notion.so/ostrch/Privacy-Policy-acd58fee6ce447d885f0551edf014158',
                      target: '_blank',
                      class: 'form_text-bold',
                    },
                    'Privacy Policy'
                  )
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'button',
                  {
                    className: 'four-fifths ostrich-button personal-margin-top',
                    type: 'submit',
                    onClick: signUp,
                  },
                  'Signup'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'p',
                  {
                    class: 'error',
                  },
                  errorMessage
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'button',
                  {
                    className:
                      'plain-button four-fifths personal-margin-bottom personal-margin-top',
                    onClick: proceedWithGoogle,
                  },
                  'Continue With Google'
                ),
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  null,
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'a',
                    {
                      className: 'four-fifths',
                      onClick: toLogin,
                    },
                    'Go to Login'
                  )
                )
              )
            )
          )
        }

        /***/
      },

    /***/ './src/components/Splash.jsx':
      /*!***********************************!*\
  !*** ./src/components/Splash.jsx ***!
  \***********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ Splash,
          /* harmony export */
        })
        /* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! preact */ './node_modules/preact/dist/preact.module.js'
          )

        function Splash(props) {
          return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
            preact__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            null,
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'header',
              {
                class: 'section_header1',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  class: 'padding-global',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  {
                    class: 'container-large',
                  },
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'div',
                    {
                      class: 'padding-section-large',
                    },
                    (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                      'div',
                      {
                        class: 'w-layout-grid header1_component',
                      },
                      (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                        'div',
                        {
                          id: 'w-node-_609eae99-230f-41f2-7495-de347fdf3a66-f8b0799e',
                          class: 'header1_content',
                        },
                        (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                          'h1',
                          null,
                          'The fastest way ever to analyze rentals'
                        ),
                        (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                          'p',
                          {
                            class: 'text-size-medium',
                          },
                          'A daily email that delivers the cash flow analysis of the newest properties in your market',
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('br', null)
                        ),
                        (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                          'div',
                          {
                            class: 'button-group',
                          },
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'a',
                            {
                              href: '/signup',
                              class: 'button w-button',
                            },
                            'Try Ostrich for Free'
                          )
                        )
                      ),
                      (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                        'div',
                        {
                          class: 'header1_image-wrapper',
                        },
                        (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('img', {
                          src: '/guy-with-charts.svg',
                          loading: 'lazy',
                          alt: '',
                        })
                      )
                    )
                  )
                )
              )
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'section',
              {
                class: 'section_plugin',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  class: 'padding-global',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  {
                    class: 'container-large',
                  },
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'div',
                    {
                      class: 'padding-section-large',
                    },
                    (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                      'div',
                      {
                        class: 'w-layout-grid layout1_component',
                      },
                      (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                        'div',
                        {
                          id: 'w-node-_6ea6296a-cb90-e88d-339b-0fc6f268787d-f8b0799e',
                          class: 'layout1_content',
                        },
                        (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                          'h2',
                          null,
                          'Ostrich Chrome Plugin'
                        ),
                        (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                          'p',
                          {
                            class: 'text-size-medium',
                          },
                          'Speed up your workflow!',
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'br',
                            null
                          ),
                          'Get the cash flow analysis of a single family property while you are checking out a Zillow listing'
                        ),
                        (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                          'div',
                          {
                            class: 'plugin_steps',
                          },
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'div',
                            {
                              class: 'plugin_step-wrapper',
                            },
                            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('img', {
                              src: '/gis_step.png',
                              loading: 'lazy',
                              alt: '',
                              class: 'step_icon',
                            }),
                            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                              'div',
                              null,
                              "After the extension is downloaded. Pin it to your Chrome Toolbar so it's visible at all times."
                            )
                          ),
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'div',
                            {
                              class: 'plugin_step-wrapper',
                            },
                            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('img', {
                              src: '/gis_step.png',
                              loading: 'lazy',
                              alt: '',
                              class: 'step_icon',
                            }),
                            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                              'div',
                              null,
                              'Sign up using Email or Gmail'
                            )
                          ),
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'div',
                            {
                              class: 'plugin_step-wrapper',
                            },
                            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('img', {
                              src: '/gis_step.png',
                              loading: 'lazy',
                              alt: '',
                              class: 'step_icon',
                            }),
                            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                              'div',
                              null,
                              'After logging in, right-click on the extension Icon, select options and enter your expense assumptions and Save'
                            )
                          ),
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'div',
                            {
                              class: 'plugin_step-wrapper',
                            },
                            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('img', {
                              src: '/gis_step.png',
                              loading: 'lazy',
                              alt: '',
                              class: 'step_icon',
                            }),
                            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                              'div',
                              null,
                              'Head to Zillow and find a listing for sale you like'
                            )
                          ),
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'div',
                            {
                              class: 'plugin_step-wrapper',
                            },
                            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('img', {
                              src: '/gis_step.png',
                              loading: 'lazy',
                              alt: '',
                              class: 'step_icon',
                            }),
                            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                              'div',
                              null,
                              'Click on the extension icon to get the cash flow projection for year 1'
                            )
                          )
                        ),
                        (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                          'a',
                          {
                            href: 'https://chrome.google.com/webstore/detail/ostrich/aicgkflmidjkbcenllnnlbnfnmicpmgo',
                            class: 'button secondary w-button',
                          },
                          'Get Plugin'
                        )
                      ),
                      (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                        'div',
                        {
                          class: 'layout1_image-wrapper',
                        },
                        (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('img', {
                          src: '/plugin_ss.jpg',
                          loading: 'lazy',
                          srcset:
                            '/plugin_ss-p-500.jpg 500w, /plugin_ss-p-800.jpg 800w, /plugin_ss-p-1080.jpg 1080w, /plugin_ss.jpg 1131w',
                          sizes: '100vw',
                          alt: '',
                        })
                      )
                    )
                  )
                )
              )
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'section',
              {
                class: 'section_emailer',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                'div',
                {
                  class: 'padding-global',
                },
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                  'div',
                  {
                    class: 'container-large',
                  },
                  (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                    'div',
                    {
                      class: 'padding-section-large',
                    },
                    (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                      'div',
                      {
                        class: 'process-container-2',
                      },
                      (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                        'div',
                        {
                          class: 'process-title-wrap-2',
                        },
                        (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                          'h2',
                          null,
                          'Premium Ostrich Emailer'
                        ),
                        (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                          'p',
                          {
                            class: 'text-size-medium',
                          },
                          'Emailer is a premium feature of Ostrich, which sends deals(only single family) in your market per your search criteria. Just enter your location and financial assumptions and the emailer will send you properties that showed up in your market in the last 24 hours'
                        )
                      ),
                      (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                        'div',
                        {
                          class: 'w-layout-grid process-grid-2',
                        },
                        (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                          'div',
                          {
                            class: 'process-card-primary-2',
                          },
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'div',
                            {
                              class: 'feature-icon-square-2',
                            },
                            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                              'div',
                              null,
                              '1'
                            )
                          ),
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'h3',
                            null,
                            'Create Your Account'
                          ),
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'p',
                            {
                              class: 'emailer_text',
                            },
                            'Sign up for an account on our platform and get started'
                          ),
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('img', {
                            src: 'https://uploads-ssl.webflow.com/6110b06f10260e518f5d3077/6110b1396056a5e6b0bd01f9_Dot%20Wave.svg',
                            loading: 'lazy',
                            alt: '',
                            class: 'process-arrow-01',
                          })
                        ),
                        (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                          'div',
                          {
                            class: 'process-card-primary-2',
                          },
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'div',
                            {
                              class: 'feature-icon-square-2 feature-icon',
                            },
                            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                              'div',
                              {
                                class: 'text-block',
                              },
                              '2'
                            )
                          ),
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'h3',
                            null,
                            'Save Your Alert'
                          ),
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'p',
                            {
                              class: 'emailer_text',
                            },
                            'Enter your market and the financial assumptions (Loan, expenses etc) and save the alert'
                          ),
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)('img', {
                            src: 'https://uploads-ssl.webflow.com/6110b06f10260e518f5d3077/6110b1396056a5e6b0bd01f9_Dot%20Wave.svg',
                            loading: 'lazy',
                            alt: '',
                            class: 'process-arrow-01',
                          })
                        ),
                        (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                          'div',
                          {
                            class: 'process-card-primary-2',
                          },
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'div',
                            {
                              class: 'feature-icon-square-2',
                            },
                            (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                              'div',
                              null,
                              '3'
                            )
                          ),
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'h3',
                            null,
                            'Get Daily Emails'
                          ),
                          (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                            'p',
                            {
                              class: 'emailer_text',
                            },
                            'Now you will get emails everyday around 3:30 pm ET with any listings and their cash flow return analysis'
                          )
                        )
                      ),
                      (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
                        'a',
                        {
                          href: '/signup',
                          class: 'button w-button',
                        },
                        'Buy Emailer'
                      )
                    )
                  )
                )
              )
            )
          )
        }

        /***/
      },

    /***/ './src/hooks/useLogin.js':
      /*!*******************************!*\
  !*** ./src/hooks/useLogin.js ***!
  \*******************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        })
        /* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! preact/hooks */ './node_modules/preact/hooks/dist/hooks.module.js'
          )
        /* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! axios */ './node_modules/axios/index.js')
        /* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default =
          /*#__PURE__*/ __webpack_require__.n(
            axios__WEBPACK_IMPORTED_MODULE_1__
          )
        /* harmony import */ var _subroutines_utils__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../subroutines/utils */ './src/subroutines/utils.js'
          )
        /* harmony import */ var _api_user__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! ../api/user */ './src/api/user.js')
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

        var useLogin = function useLogin(backendUrl, setErrorMessage, toLogin) {
          var _useState = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
            _useState2 = _slicedToArray(_useState, 2),
            jwt = _useState2[0],
            setJwt = _useState2[1]

          var _useState3 = (0,
            preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
            _useState4 = _slicedToArray(_useState3, 2),
            user = _useState4[0],
            setUser = _useState4[1] // when we get a jwt, get your user information

          ;(0, preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useEffect)(
            function () {
              console.log(jwt)

              if (!jwt) {
                return
              }

              axios__WEBPACK_IMPORTED_MODULE_1___default().defaults.headers.common.Authorization =
                'Bearer '.concat(jwt.id_token)
              ;(0, _api_user__WEBPACK_IMPORTED_MODULE_3__.getUserData)(
                backendUrl,
                function (data) {
                  return setUser(data)
                },
                function (e) {
                  return setErrorMessage(e.response.data.message)
                }
              )
            },
            [jwt]
          )
          ;(0, preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useEffect)(
            function () {
              // login when there is login with google
              if (window.location.hash) {
                console.log('hash')
                var token = (0,
                _subroutines_utils__WEBPACK_IMPORTED_MODULE_2__.parseQueryParams)(
                  window.location.hash
                )
                console.log(token)

                if (token.id_token) {
                  setJwt(token)
                  ;(0,
                  _subroutines_utils__WEBPACK_IMPORTED_MODULE_2__.setCookie)(
                    token
                  )
                }
              } // login when there is a cookie
              else if (document.cookie) {
                console.log('cookie')
                var cookies = (0,
                _subroutines_utils__WEBPACK_IMPORTED_MODULE_2__.parseCookies)(
                  document.cookie
                )

                if (cookies.token) {
                  var _token = JSON.parse(cookies.token)

                  setJwt(_token)
                } else {
                  toLogin()
                }
              }
            },
            []
          )
          return {
            user: user,
            jwt: jwt,
            setJwt: setJwt,
          }
        }

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = useLogin

        /***/
      },

    /***/ './src/subroutines/math.js':
      /*!*********************************!*\
  !*** ./src/subroutines/math.js ***!
  \*********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ calculateCOC: () => /* binding */ calculateCOC,
          /* harmony export */ dollars: () => /* binding */ dollars,
          /* harmony export */ monthlyDollars: () =>
            /* binding */ monthlyDollars,
          /* harmony export */ nFormatter: () => /* binding */ nFormatter,
          /* harmony export */ toInt: () => /* binding */ toInt,
          /* harmony export */
        })
        // turn anything with numbers into just a regular integer
        var toInt = function toInt(n) {
          return parseInt(
            n
              .split('')
              .filter(function (a) {
                return a.match(/[0-9.]/g)
              })
              .join('')
          )
        }
        var monthlyDollars = function monthlyDollars(n) {
          return isNaN(n) ? 'N/A' : '$'.concat(n.toLocaleString(), '/mo')
        }
        var dollars = function dollars(n) {
          return isNaN(n) ? 'N/A' : '$'.concat(n.toLocaleString())
        } // COC = [(Monthly Cash flow (MCF) x 12) / Initial Total Investment (ITI)] x 100

        var CashOnCash = function CashOnCash(
          monthlyCashFlow,
          initialTotalInvestment
        ) {
          return ((monthlyCashFlow * 12) / initialTotalInvestment) * 100
        } // ITI = 29% of Purchase Price(PP)(Which comes from Zillow)

        var InitialTotalInvestment = function InitialTotalInvestment(
          configurationFields,
          purchasePrice
        ) {
          return (
            (configurationFields['down-payment'].value +
              configurationFields['closing-cost'].value) *
            purchasePrice
          )
        } // MCF = Monthly Gross Income(MGI)(comes from Zillow) - Monthly Expenses - Monthly Debt Service

        var MonthlyCashFlow = function MonthlyCashFlow(
          configurationFields,
          monthlyGrossIncome,
          monthlyExpenses,
          monthlyDebtService
        ) {
          return (
            monthlyGrossIncome -
            monthlyGrossIncome * configurationFields.vacancy.value -
            monthlyExpenses -
            monthlyDebtService
          )
        } // Monthly Expenses = Taxes(comes from Zillow) + Insurance($60) + Vacancy(5% of MGI) + Property Management(4% of MGI)+ Capex(5% of MGI) + Repairs(5% of MGI) + Utilities($0)

        var MonthlyExpenses = function MonthlyExpenses(
          configurationFields,
          taxes,
          monthlyGrossIncome
        ) {
          var income =
            monthlyGrossIncome -
            configurationFields.vacancy.value * monthlyGrossIncome
          var insurance = configurationFields.insurance.value
          var propertyManagement = configurationFields.property.value * income
          var capex = configurationFields.capex.value * income
          var repairs = configurationFields.repairs.value * income
          var utilities = configurationFields.utilities.value
          return (
            taxes + insurance + propertyManagement + capex + repairs + utilities
          )
        } // Monthly Debt Service = .61 % of Loan

        var MonthlyDebtService = function MonthlyDebtService(
          configurationFields,
          loan
        ) {
          // i
          var monthlyInterest = configurationFields['loan-interest'].value / 12 // n

          var months = configurationFields['loan-months'].value // (1 + i)^-n

          var exponent = Math.pow(1 + monthlyInterest, -months) // 1 - (1 + i)^-n

          var denominator = 1 - exponent // p * (i / (1 - (1 + i)^-n))

          return loan * (monthlyInterest / denominator)
        } // Loan = 75% of Purchase Price(comes from Zillow)

        var Loan = function Loan(configurationFields, purchasePrice) {
          return (1 - configurationFields['down-payment'].value) * purchasePrice
        }

        var calculateCOC = function calculateCOC(
          configurationFields,
          purchasePrice,
          taxes,
          monthlyGrossIncome
        ) {
          var loan = Loan(configurationFields, purchasePrice)
          var monthlyDebtService = MonthlyDebtService(configurationFields, loan)
          var monthlyExpenses =
            MonthlyExpenses(configurationFields, taxes, monthlyGrossIncome) +
            configurationFields['additional-monthly-expenses'].value
          var initialTotalInvestment = InitialTotalInvestment(
            configurationFields,
            purchasePrice
          )
          var monthlyCashFlow = MonthlyCashFlow(
            configurationFields,
            monthlyGrossIncome,
            monthlyExpenses,
            monthlyDebtService
          )
          var cashOnCash = CashOnCash(monthlyCashFlow, initialTotalInvestment)
          return {
            cashOnCash: cashOnCash,
            monthlyExpenses: monthlyExpenses,
          }
        }
        var nFormatter = function nFormatter(num, digits) {
          var lookup = [
            {
              value: 1,
              symbol: '',
            },
            {
              value: 1e3,
              symbol: 'k',
            },
            {
              value: 1e6,
              symbol: 'M',
            },
            {
              value: 1e9,
              symbol: 'G',
            },
            {
              value: 1e12,
              symbol: 'T',
            },
            {
              value: 1e15,
              symbol: 'P',
            },
            {
              value: 1e18,
              symbol: 'E',
            },
          ]
          var rx = /\.0+$|(\.[0-9]*[1-9])0+$/
          var item = lookup
            .slice()
            .reverse()
            .find(function (item) {
              return num >= item.value
            })
          return item
            ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
            : '0'
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
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ dollars: () => /* binding */ dollars,
          /* harmony export */ handleCopy: () => /* binding */ handleCopy,
          /* harmony export */ monthlyDollars: () =>
            /* binding */ monthlyDollars,
          /* harmony export */ parseCookies: () => /* binding */ parseCookies,
          /* harmony export */ parseJwt: () => /* binding */ parseJwt,
          /* harmony export */ parseQueryParams: () =>
            /* binding */ parseQueryParams,
          /* harmony export */ setCookie: () => /* binding */ setCookie,
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
        var parseCookies = function parseCookies(cookies) {
          return cookies
            .split('; ')
            .map(function (e) {
              return e.split('=')
            })
            .reduce(function (acc, pair) {
              acc[pair[0]] = pair[1]
              return acc
            }, {})
        }
        var setCookie = function setCookie(token) {
          var today = new Date()
          var tomorrow = new Date(today)
          tomorrow.setDate(tomorrow.getDate() + 1)
          var strigifiedToken = JSON.stringify(token)
          var expireDate = tomorrow.toUTCString()
          document.cookie = 'token='
            .concat(strigifiedToken, ';expires=')
            .concat(expireDate)
        }

        /***/
      },

    /***/ './node_modules/preact/dist/preact.module.js':
      /*!***************************************************!*\
  !*** ./node_modules/preact/dist/preact.module.js ***!
  \***************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ Component: () => /* binding */ _,
          /* harmony export */ Fragment: () => /* binding */ d,
          /* harmony export */ cloneElement: () => /* binding */ B,
          /* harmony export */ createContext: () => /* binding */ D,
          /* harmony export */ createElement: () => /* binding */ v,
          /* harmony export */ createRef: () => /* binding */ p,
          /* harmony export */ h: () => /* binding */ v,
          /* harmony export */ hydrate: () => /* binding */ q,
          /* harmony export */ isValidElement: () => /* binding */ i,
          /* harmony export */ options: () => /* binding */ l,
          /* harmony export */ render: () => /* binding */ S,
          /* harmony export */ toChildArray: () => /* binding */ A,
          /* harmony export */
        })
        var n,
          l,
          u,
          i,
          t,
          o,
          r,
          f,
          e = {},
          c = [],
          s =
            /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i
        function a(n, l) {
          for (var u in l) n[u] = l[u]
          return n
        }
        function h(n) {
          var l = n.parentNode
          l && l.removeChild(n)
        }
        function v(l, u, i) {
          var t,
            o,
            r,
            f = {}
          for (r in u)
            'key' == r ? (t = u[r]) : 'ref' == r ? (o = u[r]) : (f[r] = u[r])
          if (
            (arguments.length > 2 &&
              (f.children = arguments.length > 3 ? n.call(arguments, 2) : i),
            'function' == typeof l && null != l.defaultProps)
          )
            for (r in l.defaultProps)
              void 0 === f[r] && (f[r] = l.defaultProps[r])
          return y(l, f, t, o, null)
        }
        function y(n, i, t, o, r) {
          var f = {
            type: n,
            props: i,
            key: t,
            ref: o,
            __k: null,
            __: null,
            __b: 0,
            __e: null,
            __d: void 0,
            __c: null,
            __h: null,
            constructor: void 0,
            __v: null == r ? ++u : r,
          }
          return null == r && null != l.vnode && l.vnode(f), f
        }
        function p() {
          return { current: null }
        }
        function d(n) {
          return n.children
        }
        function _(n, l) {
          ;(this.props = n), (this.context = l)
        }
        function k(n, l) {
          if (null == l) return n.__ ? k(n.__, n.__.__k.indexOf(n) + 1) : null
          for (var u; l < n.__k.length; l++)
            if (null != (u = n.__k[l]) && null != u.__e) return u.__e
          return 'function' == typeof n.type ? k(n) : null
        }
        function b(n) {
          var l, u
          if (null != (n = n.__) && null != n.__c) {
            for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++)
              if (null != (u = n.__k[l]) && null != u.__e) {
                n.__e = n.__c.base = u.__e
                break
              }
            return b(n)
          }
        }
        function m(n) {
          ;((!n.__d && (n.__d = !0) && t.push(n) && !g.__r++) ||
            r !== l.debounceRendering) &&
            ((r = l.debounceRendering) || o)(g)
        }
        function g() {
          for (var n; (g.__r = t.length); )
            (n = t.sort(function (n, l) {
              return n.__v.__b - l.__v.__b
            })),
              (t = []),
              n.some(function (n) {
                var l, u, i, t, o, r
                n.__d &&
                  ((o = (t = (l = n).__v).__e),
                  (r = l.__P) &&
                    ((u = []),
                    ((i = a({}, t)).__v = t.__v + 1),
                    j(
                      r,
                      t,
                      i,
                      l.__n,
                      void 0 !== r.ownerSVGElement,
                      null != t.__h ? [o] : null,
                      u,
                      null == o ? k(t) : o,
                      t.__h
                    ),
                    z(u, t),
                    t.__e != o && b(t)))
              })
        }
        function w(n, l, u, i, t, o, r, f, s, a) {
          var h,
            v,
            p,
            _,
            b,
            m,
            g,
            w = (i && i.__k) || c,
            A = w.length
          for (u.__k = [], h = 0; h < l.length; h++)
            if (
              null !=
              (_ = u.__k[h] =
                null == (_ = l[h]) || 'boolean' == typeof _
                  ? null
                  : 'string' == typeof _ ||
                    'number' == typeof _ ||
                    'bigint' == typeof _
                  ? y(null, _, null, null, _)
                  : Array.isArray(_)
                  ? y(d, { children: _ }, null, null, null)
                  : _.__b > 0
                  ? y(_.type, _.props, _.key, null, _.__v)
                  : _)
            ) {
              if (
                ((_.__ = u),
                (_.__b = u.__b + 1),
                null === (p = w[h]) ||
                  (p && _.key == p.key && _.type === p.type))
              )
                w[h] = void 0
              else
                for (v = 0; v < A; v++) {
                  if ((p = w[v]) && _.key == p.key && _.type === p.type) {
                    w[v] = void 0
                    break
                  }
                  p = null
                }
              j(n, _, (p = p || e), t, o, r, f, s, a),
                (b = _.__e),
                (v = _.ref) &&
                  p.ref != v &&
                  (g || (g = []),
                  p.ref && g.push(p.ref, null, _),
                  g.push(v, _.__c || b, _)),
                null != b
                  ? (null == m && (m = b),
                    'function' == typeof _.type && _.__k === p.__k
                      ? (_.__d = s = x(_, s, n))
                      : (s = P(n, _, p, w, b, s)),
                    'function' == typeof u.type && (u.__d = s))
                  : s && p.__e == s && s.parentNode != n && (s = k(p))
            }
          for (u.__e = m, h = A; h--; )
            null != w[h] &&
              ('function' == typeof u.type &&
                null != w[h].__e &&
                w[h].__e == u.__d &&
                (u.__d = k(i, h + 1)),
              N(w[h], w[h]))
          if (g) for (h = 0; h < g.length; h++) M(g[h], g[++h], g[++h])
        }
        function x(n, l, u) {
          for (var i, t = n.__k, o = 0; t && o < t.length; o++)
            (i = t[o]) &&
              ((i.__ = n),
              (l =
                'function' == typeof i.type
                  ? x(i, l, u)
                  : P(u, i, i, t, i.__e, l)))
          return l
        }
        function A(n, l) {
          return (
            (l = l || []),
            null == n ||
              'boolean' == typeof n ||
              (Array.isArray(n)
                ? n.some(function (n) {
                    A(n, l)
                  })
                : l.push(n)),
            l
          )
        }
        function P(n, l, u, i, t, o) {
          var r, f, e
          if (void 0 !== l.__d) (r = l.__d), (l.__d = void 0)
          else if (null == u || t != o || null == t.parentNode)
            n: if (null == o || o.parentNode !== n) n.appendChild(t), (r = null)
            else {
              for (f = o, e = 0; (f = f.nextSibling) && e < i.length; e += 2)
                if (f == t) break n
              n.insertBefore(t, o), (r = o)
            }
          return void 0 !== r ? r : t.nextSibling
        }
        function C(n, l, u, i, t) {
          var o
          for (o in u)
            'children' === o || 'key' === o || o in l || H(n, o, null, u[o], i)
          for (o in l)
            (t && 'function' != typeof l[o]) ||
              'children' === o ||
              'key' === o ||
              'value' === o ||
              'checked' === o ||
              u[o] === l[o] ||
              H(n, o, l[o], u[o], i)
        }
        function $(n, l, u) {
          '-' === l[0]
            ? n.setProperty(l, u)
            : (n[l] =
                null == u
                  ? ''
                  : 'number' != typeof u || s.test(l)
                  ? u
                  : u + 'px')
        }
        function H(n, l, u, i, t) {
          var o
          n: if ('style' === l)
            if ('string' == typeof u) n.style.cssText = u
            else {
              if (('string' == typeof i && (n.style.cssText = i = ''), i))
                for (l in i) (u && l in u) || $(n.style, l, '')
              if (u) for (l in u) (i && u[l] === i[l]) || $(n.style, l, u[l])
            }
          else if ('o' === l[0] && 'n' === l[1])
            (o = l !== (l = l.replace(/Capture$/, ''))),
              (l =
                l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2)),
              n.l || (n.l = {}),
              (n.l[l + o] = u),
              u
                ? i || n.addEventListener(l, o ? T : I, o)
                : n.removeEventListener(l, o ? T : I, o)
          else if ('dangerouslySetInnerHTML' !== l) {
            if (t) l = l.replace(/xlink(H|:h)/, 'h').replace(/sName$/, 's')
            else if (
              'href' !== l &&
              'list' !== l &&
              'form' !== l &&
              'tabIndex' !== l &&
              'download' !== l &&
              l in n
            )
              try {
                n[l] = null == u ? '' : u
                break n
              } catch (n) {}
            'function' == typeof u ||
              (null != u && (!1 !== u || ('a' === l[0] && 'r' === l[1]))
                ? n.setAttribute(l, u)
                : n.removeAttribute(l))
          }
        }
        function I(n) {
          this.l[n.type + !1](l.event ? l.event(n) : n)
        }
        function T(n) {
          this.l[n.type + !0](l.event ? l.event(n) : n)
        }
        function j(n, u, i, t, o, r, f, e, c) {
          var s,
            h,
            v,
            y,
            p,
            k,
            b,
            m,
            g,
            x,
            A,
            P,
            C,
            $ = u.type
          if (void 0 !== u.constructor) return null
          null != i.__h &&
            ((c = i.__h), (e = u.__e = i.__e), (u.__h = null), (r = [e])),
            (s = l.__b) && s(u)
          try {
            n: if ('function' == typeof $) {
              if (
                ((m = u.props),
                (g = (s = $.contextType) && t[s.__c]),
                (x = s ? (g ? g.props.value : s.__) : t),
                i.__c
                  ? (b = (h = u.__c = i.__c).__ = h.__E)
                  : ('prototype' in $ && $.prototype.render
                      ? (u.__c = h = new $(m, x))
                      : ((u.__c = h = new _(m, x)),
                        (h.constructor = $),
                        (h.render = O)),
                    g && g.sub(h),
                    (h.props = m),
                    h.state || (h.state = {}),
                    (h.context = x),
                    (h.__n = t),
                    (v = h.__d = !0),
                    (h.__h = [])),
                null == h.__s && (h.__s = h.state),
                null != $.getDerivedStateFromProps &&
                  (h.__s == h.state && (h.__s = a({}, h.__s)),
                  a(h.__s, $.getDerivedStateFromProps(m, h.__s))),
                (y = h.props),
                (p = h.state),
                v)
              )
                null == $.getDerivedStateFromProps &&
                  null != h.componentWillMount &&
                  h.componentWillMount(),
                  null != h.componentDidMount && h.__h.push(h.componentDidMount)
              else {
                if (
                  (null == $.getDerivedStateFromProps &&
                    m !== y &&
                    null != h.componentWillReceiveProps &&
                    h.componentWillReceiveProps(m, x),
                  (!h.__e &&
                    null != h.shouldComponentUpdate &&
                    !1 === h.shouldComponentUpdate(m, h.__s, x)) ||
                    u.__v === i.__v)
                ) {
                  ;(h.props = m),
                    (h.state = h.__s),
                    u.__v !== i.__v && (h.__d = !1),
                    (h.__v = u),
                    (u.__e = i.__e),
                    (u.__k = i.__k),
                    u.__k.forEach(function (n) {
                      n && (n.__ = u)
                    }),
                    h.__h.length && f.push(h)
                  break n
                }
                null != h.componentWillUpdate &&
                  h.componentWillUpdate(m, h.__s, x),
                  null != h.componentDidUpdate &&
                    h.__h.push(function () {
                      h.componentDidUpdate(y, p, k)
                    })
              }
              if (
                ((h.context = x),
                (h.props = m),
                (h.__v = u),
                (h.__P = n),
                (A = l.__r),
                (P = 0),
                'prototype' in $ && $.prototype.render)
              )
                (h.state = h.__s),
                  (h.__d = !1),
                  A && A(u),
                  (s = h.render(h.props, h.state, h.context))
              else
                do {
                  ;(h.__d = !1),
                    A && A(u),
                    (s = h.render(h.props, h.state, h.context)),
                    (h.state = h.__s)
                } while (h.__d && ++P < 25)
              ;(h.state = h.__s),
                null != h.getChildContext &&
                  (t = a(a({}, t), h.getChildContext())),
                v ||
                  null == h.getSnapshotBeforeUpdate ||
                  (k = h.getSnapshotBeforeUpdate(y, p)),
                (C =
                  null != s && s.type === d && null == s.key
                    ? s.props.children
                    : s),
                w(n, Array.isArray(C) ? C : [C], u, i, t, o, r, f, e, c),
                (h.base = u.__e),
                (u.__h = null),
                h.__h.length && f.push(h),
                b && (h.__E = h.__ = null),
                (h.__e = !1)
            } else
              null == r && u.__v === i.__v
                ? ((u.__k = i.__k), (u.__e = i.__e))
                : (u.__e = L(i.__e, u, i, t, o, r, f, c))
            ;(s = l.diffed) && s(u)
          } catch (n) {
            ;(u.__v = null),
              (c || null != r) &&
                ((u.__e = e), (u.__h = !!c), (r[r.indexOf(e)] = null)),
              l.__e(n, u, i)
          }
        }
        function z(n, u) {
          l.__c && l.__c(u, n),
            n.some(function (u) {
              try {
                ;(n = u.__h),
                  (u.__h = []),
                  n.some(function (n) {
                    n.call(u)
                  })
              } catch (n) {
                l.__e(n, u.__v)
              }
            })
        }
        function L(l, u, i, t, o, r, f, c) {
          var s,
            a,
            v,
            y = i.props,
            p = u.props,
            d = u.type,
            _ = 0
          if (('svg' === d && (o = !0), null != r))
            for (; _ < r.length; _++)
              if (
                (s = r[_]) &&
                'setAttribute' in s == !!d &&
                (d ? s.localName === d : 3 === s.nodeType)
              ) {
                ;(l = s), (r[_] = null)
                break
              }
          if (null == l) {
            if (null === d) return document.createTextNode(p)
            ;(l = o
              ? document.createElementNS('http://www.w3.org/2000/svg', d)
              : document.createElement(d, p.is && p)),
              (r = null),
              (c = !1)
          }
          if (null === d) y === p || (c && l.data === p) || (l.data = p)
          else {
            if (
              ((r = r && n.call(l.childNodes)),
              (a = (y = i.props || e).dangerouslySetInnerHTML),
              (v = p.dangerouslySetInnerHTML),
              !c)
            ) {
              if (null != r)
                for (y = {}, _ = 0; _ < l.attributes.length; _++)
                  y[l.attributes[_].name] = l.attributes[_].value
              ;(v || a) &&
                ((v &&
                  ((a && v.__html == a.__html) || v.__html === l.innerHTML)) ||
                  (l.innerHTML = (v && v.__html) || ''))
            }
            if ((C(l, p, y, o, c), v)) u.__k = []
            else if (
              ((_ = u.props.children),
              w(
                l,
                Array.isArray(_) ? _ : [_],
                u,
                i,
                t,
                o && 'foreignObject' !== d,
                r,
                f,
                r ? r[0] : i.__k && k(i, 0),
                c
              ),
              null != r)
            )
              for (_ = r.length; _--; ) null != r[_] && h(r[_])
            c ||
              ('value' in p &&
                void 0 !== (_ = p.value) &&
                (_ !== l.value ||
                  ('progress' === d && !_) ||
                  ('option' === d && _ !== y.value)) &&
                H(l, 'value', _, y.value, !1),
              'checked' in p &&
                void 0 !== (_ = p.checked) &&
                _ !== l.checked &&
                H(l, 'checked', _, y.checked, !1))
          }
          return l
        }
        function M(n, u, i) {
          try {
            'function' == typeof n ? n(u) : (n.current = u)
          } catch (n) {
            l.__e(n, i)
          }
        }
        function N(n, u, i) {
          var t, o
          if (
            (l.unmount && l.unmount(n),
            (t = n.ref) &&
              ((t.current && t.current !== n.__e) || M(t, null, u)),
            null != (t = n.__c))
          ) {
            if (t.componentWillUnmount)
              try {
                t.componentWillUnmount()
              } catch (n) {
                l.__e(n, u)
              }
            t.base = t.__P = null
          }
          if ((t = n.__k))
            for (o = 0; o < t.length; o++)
              t[o] && N(t[o], u, 'function' != typeof n.type)
          i || null == n.__e || h(n.__e), (n.__e = n.__d = void 0)
        }
        function O(n, l, u) {
          return this.constructor(n, u)
        }
        function S(u, i, t) {
          var o, r, f
          l.__ && l.__(u, i),
            (r = (o = 'function' == typeof t) ? null : (t && t.__k) || i.__k),
            (f = []),
            j(
              i,
              (u = ((!o && t) || i).__k = v(d, null, [u])),
              r || e,
              e,
              void 0 !== i.ownerSVGElement,
              !o && t
                ? [t]
                : r
                ? null
                : i.firstChild
                ? n.call(i.childNodes)
                : null,
              f,
              !o && t ? t : r ? r.__e : i.firstChild,
              o
            ),
            z(f, u)
        }
        function q(n, l) {
          S(n, l, q)
        }
        function B(l, u, i) {
          var t,
            o,
            r,
            f = a({}, l.props)
          for (r in u)
            'key' == r ? (t = u[r]) : 'ref' == r ? (o = u[r]) : (f[r] = u[r])
          return (
            arguments.length > 2 &&
              (f.children = arguments.length > 3 ? n.call(arguments, 2) : i),
            y(l.type, f, t || l.key, o || l.ref, null)
          )
        }
        function D(n, l) {
          var u = {
            __c: (l = '__cC' + f++),
            __: n,
            Consumer: function (n, l) {
              return n.children(l)
            },
            Provider: function (n) {
              var u, i
              return (
                this.getChildContext ||
                  ((u = []),
                  ((i = {})[l] = this),
                  (this.getChildContext = function () {
                    return i
                  }),
                  (this.shouldComponentUpdate = function (n) {
                    this.props.value !== n.value && u.some(m)
                  }),
                  (this.sub = function (n) {
                    u.push(n)
                    var l = n.componentWillUnmount
                    n.componentWillUnmount = function () {
                      u.splice(u.indexOf(n), 1), l && l.call(n)
                    }
                  })),
                n.children
              )
            },
          }
          return (u.Provider.__ = u.Consumer.contextType = u)
        }
        ;(n = c.slice),
          (l = {
            __e: function (n, l, u, i) {
              for (var t, o, r; (l = l.__); )
                if ((t = l.__c) && !t.__)
                  try {
                    if (
                      ((o = t.constructor) &&
                        null != o.getDerivedStateFromError &&
                        (t.setState(o.getDerivedStateFromError(n)),
                        (r = t.__d)),
                      null != t.componentDidCatch &&
                        (t.componentDidCatch(n, i || {}), (r = t.__d)),
                      r)
                    )
                      return (t.__E = t)
                  } catch (l) {
                    n = l
                  }
              throw n
            },
          }),
          (u = 0),
          (i = function (n) {
            return null != n && void 0 === n.constructor
          }),
          (_.prototype.setState = function (n, l) {
            var u
            ;(u =
              null != this.__s && this.__s !== this.state
                ? this.__s
                : (this.__s = a({}, this.state))),
              'function' == typeof n && (n = n(a({}, u), this.props)),
              n && a(u, n),
              null != n && this.__v && (l && this.__h.push(l), m(this))
          }),
          (_.prototype.forceUpdate = function (n) {
            this.__v && ((this.__e = !0), n && this.__h.push(n), m(this))
          }),
          (_.prototype.render = d),
          (t = []),
          (o =
            'function' == typeof Promise
              ? Promise.prototype.then.bind(Promise.resolve())
              : setTimeout),
          (g.__r = 0),
          (f = 0)
        //# sourceMappingURL=preact.module.js.map

        /***/
      },

    /***/ './node_modules/preact/hooks/dist/hooks.module.js':
      /*!********************************************************!*\
  !*** ./node_modules/preact/hooks/dist/hooks.module.js ***!
  \********************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ useCallback: () => /* binding */ T,
          /* harmony export */ useContext: () => /* binding */ q,
          /* harmony export */ useDebugValue: () => /* binding */ x,
          /* harmony export */ useEffect: () => /* binding */ _,
          /* harmony export */ useErrorBoundary: () => /* binding */ V,
          /* harmony export */ useImperativeHandle: () => /* binding */ A,
          /* harmony export */ useLayoutEffect: () => /* binding */ h,
          /* harmony export */ useMemo: () => /* binding */ F,
          /* harmony export */ useReducer: () => /* binding */ d,
          /* harmony export */ useRef: () => /* binding */ s,
          /* harmony export */ useState: () => /* binding */ y,
          /* harmony export */
        })
        /* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! preact */ './node_modules/preact/dist/preact.module.js'
          )
        var t,
          u,
          r,
          o,
          i = 0,
          c = [],
          f = [],
          e = preact__WEBPACK_IMPORTED_MODULE_0__.options.__b,
          a = preact__WEBPACK_IMPORTED_MODULE_0__.options.__r,
          v = preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed,
          l = preact__WEBPACK_IMPORTED_MODULE_0__.options.__c,
          m = preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount
        function p(t, r) {
          preact__WEBPACK_IMPORTED_MODULE_0__.options.__h &&
            preact__WEBPACK_IMPORTED_MODULE_0__.options.__h(u, t, i || r),
            (i = 0)
          var o = u.__H || (u.__H = { __: [], __h: [] })
          return t >= o.__.length && o.__.push({ __V: f }), o.__[t]
        }
        function y(n) {
          return (i = 1), d(z, n)
        }
        function d(n, r, o) {
          var i = p(t++, 2)
          return (
            (i.t = n),
            i.__c ||
              ((i.__ = [
                o ? o(r) : z(void 0, r),
                function (n) {
                  var t = i.t(i.__[0], n)
                  i.__[0] !== t && ((i.__ = [t, i.__[1]]), i.__c.setState({}))
                },
              ]),
              (i.__c = u)),
            i.__
          )
        }
        function _(r, o) {
          var i = p(t++, 3)
          !preact__WEBPACK_IMPORTED_MODULE_0__.options.__s &&
            w(i.__H, o) &&
            ((i.__ = r), (i.u = o), u.__H.__h.push(i))
        }
        function h(r, o) {
          var i = p(t++, 4)
          !preact__WEBPACK_IMPORTED_MODULE_0__.options.__s &&
            w(i.__H, o) &&
            ((i.__ = r), (i.u = o), u.__h.push(i))
        }
        function s(n) {
          return (
            (i = 5),
            F(function () {
              return { current: n }
            }, [])
          )
        }
        function A(n, t, u) {
          ;(i = 6),
            h(
              function () {
                return 'function' == typeof n
                  ? (n(t()),
                    function () {
                      return n(null)
                    })
                  : n
                  ? ((n.current = t()),
                    function () {
                      return (n.current = null)
                    })
                  : void 0
              },
              null == u ? u : u.concat(n)
            )
        }
        function F(n, u) {
          var r = p(t++, 7)
          return w(r.__H, u)
            ? ((r.__V = n()), (r.u = u), (r.__h = n), r.__V)
            : r.__
        }
        function T(n, t) {
          return (
            (i = 8),
            F(function () {
              return n
            }, t)
          )
        }
        function q(n) {
          var r = u.context[n.__c],
            o = p(t++, 9)
          return (
            (o.c = n),
            r ? (null == o.__ && ((o.__ = !0), r.sub(u)), r.props.value) : n.__
          )
        }
        function x(t, u) {
          preact__WEBPACK_IMPORTED_MODULE_0__.options.useDebugValue &&
            preact__WEBPACK_IMPORTED_MODULE_0__.options.useDebugValue(
              u ? u(t) : t
            )
        }
        function V(n) {
          var r = p(t++, 10),
            o = y()
          return (
            (r.__ = n),
            u.componentDidCatch ||
              (u.componentDidCatch = function (n) {
                r.__ && r.__(n), o[1](n)
              }),
            [
              o[0],
              function () {
                o[1](void 0)
              },
            ]
          )
        }
        function b() {
          for (var t; (t = c.shift()); )
            if (t.__P)
              try {
                t.__H.__h.forEach(j), t.__H.__h.forEach(k), (t.__H.__h = [])
              } catch (u) {
                ;(t.__H.__h = []),
                  preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(u, t.__v)
              }
        }
        ;(preact__WEBPACK_IMPORTED_MODULE_0__.options.__b = function (n) {
          ;(u = null), e && e(n)
        }),
          (preact__WEBPACK_IMPORTED_MODULE_0__.options.__r = function (n) {
            a && a(n), (t = 0)
            var o = (u = n.__c).__H
            o &&
              (r === u
                ? ((o.__h = []),
                  (u.__h = []),
                  o.__.forEach(function (n) {
                    ;(n.__V = f), (n.u = void 0)
                  }))
                : (o.__h.forEach(j), o.__h.forEach(k), (o.__h = []))),
              (r = u)
          }),
          (preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed = function (t) {
            v && v(t)
            var i = t.__c
            i &&
              i.__H &&
              (i.__H.__h.length &&
                ((1 !== c.push(i) &&
                  o ===
                    preact__WEBPACK_IMPORTED_MODULE_0__.options
                      .requestAnimationFrame) ||
                  (
                    (o =
                      preact__WEBPACK_IMPORTED_MODULE_0__.options
                        .requestAnimationFrame) ||
                    function (n) {
                      var t,
                        u = function () {
                          clearTimeout(r),
                            g && cancelAnimationFrame(t),
                            setTimeout(n)
                        },
                        r = setTimeout(u, 100)
                      g && (t = requestAnimationFrame(u))
                    }
                  )(b)),
              i.__H.__.forEach(function (n) {
                n.u && (n.__H = n.u),
                  n.__V !== f && (n.__ = n.__V),
                  (n.u = void 0),
                  (n.__V = f)
              })),
              (r = u = null)
          }),
          (preact__WEBPACK_IMPORTED_MODULE_0__.options.__c = function (t, u) {
            u.some(function (t) {
              try {
                t.__h.forEach(j),
                  (t.__h = t.__h.filter(function (n) {
                    return !n.__ || k(n)
                  }))
              } catch (r) {
                u.some(function (n) {
                  n.__h && (n.__h = [])
                }),
                  (u = []),
                  preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(r, t.__v)
              }
            }),
              l && l(t, u)
          }),
          (preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount = function (t) {
            m && m(t)
            var u,
              r = t.__c
            r &&
              r.__H &&
              (r.__H.__.forEach(function (n) {
                try {
                  j(n)
                } catch (n) {
                  u = n
                }
              }),
              u && preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(u, r.__v))
          })
        var g = 'function' == typeof requestAnimationFrame
        function j(n) {
          var t = u,
            r = n.__c
          'function' == typeof r && ((n.__c = void 0), r()), (u = t)
        }
        function k(n) {
          var t = u
          ;(n.__c = n.__()), (u = t)
        }
        function w(n, t) {
          return (
            !n ||
            n.length !== t.length ||
            t.some(function (t, u) {
              return t !== n[u]
            })
          )
        }
        function z(n, t) {
          return 'function' == typeof t ? t(n) : t
        }
        //# sourceMappingURL=hooks.module.js.map

        /***/
      },

    /***/ './node_modules/preact-router/dist/preact-router.mjs':
      /*!***********************************************************!*\
  !*** ./node_modules/preact-router/dist/preact-router.mjs ***!
  \***********************************************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ Link: () => /* binding */ E,
          /* harmony export */ Route: () => /* binding */ L,
          /* harmony export */ Router: () => /* binding */ D,
          /* harmony export */ default: () => /* binding */ D,
          /* harmony export */ exec: () => /* binding */ s,
          /* harmony export */ getCurrentUrl: () => /* binding */ R,
          /* harmony export */ route: () => /* binding */ $,
          /* harmony export */ useRouter: () => /* binding */ C,
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
        var a = {}
        function c(n, t) {
          for (var r in t) n[r] = t[r]
          return n
        }
        function s(n, t, r) {
          var i,
            o = /(?:\?([^#]*))?(#.*)?$/,
            e = n.match(o),
            u = {}
          if (e && e[1])
            for (var f = e[1].split('&'), c = 0; c < f.length; c++) {
              var s = f[c].split('=')
              u[decodeURIComponent(s[0])] = decodeURIComponent(
                s.slice(1).join('=')
              )
            }
          ;(n = d(n.replace(o, ''))), (t = d(t || ''))
          for (var h = Math.max(n.length, t.length), v = 0; v < h; v++)
            if (t[v] && ':' === t[v].charAt(0)) {
              var l = t[v].replace(/(^:|[+*?]+$)/g, ''),
                p = (t[v].match(/[+*?]+$/) || a)[0] || '',
                m = ~p.indexOf('+'),
                y = ~p.indexOf('*'),
                U = n[v] || ''
              if (!U && !y && (p.indexOf('?') < 0 || m)) {
                i = !1
                break
              }
              if (((u[l] = decodeURIComponent(U)), m || y)) {
                u[l] = n.slice(v).map(decodeURIComponent).join('/')
                break
              }
            } else if (t[v] !== n[v]) {
              i = !1
              break
            }
          return (!0 === r.default || !1 !== i) && u
        }
        function h(n, t) {
          return n.rank < t.rank ? 1 : n.rank > t.rank ? -1 : n.index - t.index
        }
        function v(n, t) {
          return (
            (n.index = t),
            (n.rank = (function (n) {
              return n.props.default ? 0 : d(n.props.path).map(l).join('')
            })(n)),
            n.props
          )
        }
        function d(n) {
          return n.replace(/(^\/+|\/+$)/g, '').split('/')
        }
        function l(n) {
          return ':' == n.charAt(0)
            ? 1 + '*+?'.indexOf(n.charAt(n.length - 1)) || 4
            : 5
        }
        var p = {},
          m = [],
          y = [],
          U = null,
          g = { url: R() },
          k = (0, preact__WEBPACK_IMPORTED_MODULE_0__.createContext)(g)
        function C() {
          var n = (0, preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useContext)(k)
          if (n === g) {
            var t = (0, preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)()[1]
            ;(0, preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(
              function () {
                return (
                  y.push(t),
                  function () {
                    return y.splice(y.indexOf(t), 1)
                  }
                )
              },
              []
            )
          }
          return [n, $]
        }
        function R() {
          var n
          return (
            '' +
            ((n =
              U && U.location
                ? U.location
                : U && U.getCurrentLocation
                ? U.getCurrentLocation()
                : 'undefined' != typeof location
                ? location
                : p).pathname || '') +
            (n.search || '')
          )
        }
        function $(n, t) {
          return (
            void 0 === t && (t = !1),
            'string' != typeof n && n.url && ((t = n.replace), (n = n.url)),
            (function (n) {
              for (var t = m.length; t--; ) if (m[t].canRoute(n)) return !0
              return !1
            })(n) &&
              (function (n, t) {
                void 0 === t && (t = 'push'),
                  U && U[t]
                    ? U[t](n)
                    : 'undefined' != typeof history &&
                      history[t + 'State'] &&
                      history[t + 'State'](null, null, n)
              })(n, t ? 'replace' : 'push'),
            I(n)
          )
        }
        function I(n) {
          for (var t = !1, r = 0; r < m.length; r++) m[r].routeTo(n) && (t = !0)
          return t
        }
        function M(n) {
          if (n && n.getAttribute) {
            var t = n.getAttribute('href'),
              r = n.getAttribute('target')
            if (t && t.match(/^\//g) && (!r || r.match(/^_?self$/i)))
              return $(t)
          }
        }
        function b(n) {
          return (
            n.stopImmediatePropagation && n.stopImmediatePropagation(),
            n.stopPropagation && n.stopPropagation(),
            n.preventDefault(),
            !1
          )
        }
        function W(n) {
          if (!(n.ctrlKey || n.metaKey || n.altKey || n.shiftKey || n.button)) {
            var t = n.target
            do {
              if ('a' === t.localName && t.getAttribute('href')) {
                if (t.hasAttribute('data-native') || t.hasAttribute('native'))
                  return
                if (M(t)) return b(n)
              }
            } while ((t = t.parentNode))
          }
        }
        var w = !1
        function D(n) {
          n.history && (U = n.history), (this.state = { url: n.url || R() })
        }
        c((D.prototype = new preact__WEBPACK_IMPORTED_MODULE_0__.Component()), {
          shouldComponentUpdate: function (n) {
            return (
              !0 !== n.static ||
              n.url !== this.props.url ||
              n.onChange !== this.props.onChange
            )
          },
          canRoute: function (n) {
            var t = (0, preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(
              this.props.children
            )
            return void 0 !== this.g(t, n)
          },
          routeTo: function (n) {
            this.setState({ url: n })
            var t = this.canRoute(n)
            return this.p || this.forceUpdate(), t
          },
          componentWillMount: function () {
            this.p = !0
          },
          componentDidMount: function () {
            var n = this
            w ||
              ((w = !0),
              U ||
                addEventListener('popstate', function () {
                  I(R())
                }),
              addEventListener('click', W)),
              m.push(this),
              U &&
                (this.u = U.listen(function (t) {
                  var r = t.location || t
                  n.routeTo('' + (r.pathname || '') + (r.search || ''))
                })),
              (this.p = !1)
          },
          componentWillUnmount: function () {
            'function' == typeof this.u && this.u(),
              m.splice(m.indexOf(this), 1)
          },
          componentWillUpdate: function () {
            this.p = !0
          },
          componentDidUpdate: function () {
            this.p = !1
          },
          g: function (n, t) {
            n = n.filter(v).sort(h)
            for (var r = 0; r < n.length; r++) {
              var i = n[r],
                o = s(t, i.props.path, i.props)
              if (o) return [i, o]
            }
          },
          render: function (n, t) {
            var e,
              u,
              f = n.onChange,
              a = t.url,
              s = this.c,
              h = this.g(
                (0, preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(
                  n.children
                ),
                a
              )
            if (
              (h &&
                (u = (0, preact__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(
                  h[0],
                  c(c({ url: a, matches: (e = h[1]) }, e), {
                    key: void 0,
                    ref: void 0,
                  })
                )),
              a !== (s && s.url))
            ) {
              c(
                g,
                (s = this.c =
                  {
                    url: a,
                    previous: s && s.url,
                    current: u,
                    path: u ? u.props.path : null,
                    matches: e,
                  })
              ),
                (s.router = this),
                (s.active = u ? [u] : [])
              for (var v = y.length; v--; ) y[v]({})
              'function' == typeof f && f(s)
            }
            return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              k.Provider,
              { value: s },
              u
            )
          },
        })
        var E = function (n) {
            return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(
              'a',
              c({ onClick: W }, n)
            )
          },
          L = function (n) {
            return (0, preact__WEBPACK_IMPORTED_MODULE_0__.h)(n.component, n)
          }
        //# sourceMappingURL=preact-router.module.js.map

        /***/
      },

    /******/
  }
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {}
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId]
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    })
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    )
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/compat get default export */
  /******/ ;(() => {
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = (module) => {
      /******/ var getter =
        module && module.__esModule
          ? /******/ () => module['default']
          : /******/ () => module
      /******/ __webpack_require__.d(getter, { a: getter })
      /******/ return getter
      /******/
    }
    /******/
  })() /* webpack/runtime/define property getters */
  /******/
  /******/
  /******/
  ;(() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          })
          /******/
        }
        /******/
      }
      /******/
    }
    /******/
  })() /* webpack/runtime/hasOwnProperty shorthand */
  /******/
  /******/
  /******/
  ;(() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop)
    /******/
  })() /* webpack/runtime/make namespace object */
  /******/
  /******/
  /******/
  ;(() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module',
        })
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', { value: true })
      /******/
    }
    /******/
  })()
  /******/
  /************************************************************************/
  var __webpack_exports__ = {}
  // This entry need to be wrapped in an IIFE because it need to be in strict mode.
  ;(() => {
    'use strict'
    /*!********************************!*\
  !*** ./src/containers/App.jsx ***!
  \********************************/
    __webpack_require__.r(__webpack_exports__)
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
    /* harmony import */ var _build_entry__WEBPACK_IMPORTED_MODULE_3__ =
      __webpack_require__(/*! ../build/entry */ './src/build/entry.js')
    /* harmony import */ var _subroutines_utils__WEBPACK_IMPORTED_MODULE_4__ =
      __webpack_require__(
        /*! ../subroutines/utils */ './src/subroutines/utils.js'
      )
    /* harmony import */ var _hooks_useLogin__WEBPACK_IMPORTED_MODULE_5__ =
      __webpack_require__(/*! ../hooks/useLogin */ './src/hooks/useLogin.js')
    /* harmony import */ var _components_Login__WEBPACK_IMPORTED_MODULE_6__ =
      __webpack_require__(
        /*! ../components/Login */ './src/components/Login.jsx'
      )
    /* harmony import */ var _components_Signup__WEBPACK_IMPORTED_MODULE_7__ =
      __webpack_require__(
        /*! ../components/Signup */ './src/components/Signup.jsx'
      )
    /* harmony import */ var _components_Confirm__WEBPACK_IMPORTED_MODULE_8__ =
      __webpack_require__(
        /*! ../components/Confirm */ './src/components/Confirm.jsx'
      )
    /* harmony import */ var _components_EmailerDashboard__WEBPACK_IMPORTED_MODULE_9__ =
      __webpack_require__(
        /*! ../components/EmailerDashboard */ './src/components/EmailerDashboard.jsx'
      )
    /* harmony import */ var _components_Home__WEBPACK_IMPORTED_MODULE_10__ =
      __webpack_require__(/*! ../components/Home */ './src/components/Home.jsx')
    /* harmony import */ var _components_Logout__WEBPACK_IMPORTED_MODULE_11__ =
      __webpack_require__(
        /*! ../components/Logout */ './src/components/Logout.jsx'
      )
    /* harmony import */ var _components_ForgotPassword__WEBPACK_IMPORTED_MODULE_12__ =
      __webpack_require__(
        /*! ../components/ForgotPassword */ './src/components/ForgotPassword.jsx'
      )
    /* harmony import */ var _components_ConfirmForgotPassword__WEBPACK_IMPORTED_MODULE_13__ =
      __webpack_require__(
        /*! ../components/ConfirmForgotPassword */ './src/components/ConfirmForgotPassword.jsx'
      )
    /* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_14__ =
      __webpack_require__(
        /*! ../components/Header */ './src/components/Header.jsx'
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

    var loginWithGoogleUrl =
      'https://ostrich.auth.us-east-2.amazoncognito.com/login?client_id=70apbavl1fsobed4jt7l7ml18h&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://ostrich.so/'
    var backendUrl = 'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1'
    var emailerLink =
      'https://ostrch.notion.site/Ostrich-Emailer-08759238028f4964805e86eb8dca5cbd'

    function App(props) {
      var _useState = (0, preact_hooks__WEBPACK_IMPORTED_MODULE_2__.useState)(),
        _useState2 = _slicedToArray(_useState, 2),
        errorMessage = _useState2[0],
        setErrorMessage = _useState2[1]

      var _useLogin = (0,
        _hooks_useLogin__WEBPACK_IMPORTED_MODULE_5__['default'])(
          backendUrl,
          setErrorMessage,
          function () {}
        ),
        user = _useLogin.user,
        jwt = _useLogin.jwt,
        setJwt = _useLogin.setJwt

      var handleLoginResults = function handleLoginResults(_) {
        return function (r) {
          setJwt(r)
          ;(0, _subroutines_utils__WEBPACK_IMPORTED_MODULE_4__.setCookie)(r)
          var jwtHash = r
            ? Object.keys(r)
                .map(function (key) {
                  return ''.concat(key, '=').concat(r[key])
                })
                .join('&')
            : ''
          window.location.replace('/#'.concat(jwtHash))
        }
      }

      var toSignup = function toSignup() {
        return (0, preact_router__WEBPACK_IMPORTED_MODULE_0__.route)('/signup')
      }

      var toLogin = function toLogin() {
        return (0, preact_router__WEBPACK_IMPORTED_MODULE_0__.route)('/login')
      }

      var toEmailerDashboard = function toEmailerDashboard() {
        return (0, preact_router__WEBPACK_IMPORTED_MODULE_0__.route)(
          '/dashboard'
        )
      }

      var toHome = function toHome() {
        return (0, preact_router__WEBPACK_IMPORTED_MODULE_0__.route)('/')
      }

      var toForgotPassword = function toForgotPassword() {
        return (0, preact_router__WEBPACK_IMPORTED_MODULE_0__.route)(
          '/forgot-password'
        )
      }

      var proceedWithGoogle = function proceedWithGoogle() {
        return (window.location.href = loginWithGoogleUrl)
      }

      var logout = '/logout.html'

      var handleVerifyResults = function handleVerifyResults(email) {
        return function (r) {
          return (0, preact_router__WEBPACK_IMPORTED_MODULE_0__.route)(
            '/login?email='.concat(email),
            true
          )
        }
      }

      var handleSignupResults = function handleSignupResults(email) {
        return function (r) {
          return (0, preact_router__WEBPACK_IMPORTED_MODULE_0__.route)(
            '/confirm?email='.concat(email),
            true
          )
        }
      }

      var handleForgotPasswordResults = function handleForgotPasswordResults(
        email
      ) {
        return function (r) {
          return (0, preact_router__WEBPACK_IMPORTED_MODULE_0__.route)(
            '/confirm-forgot-password?email='.concat(email),
            true
          )
        }
      }

      var handleConfirmForgotPasswordResults =
        function handleConfirmForgotPasswordResults(email) {
          return function (r) {
            return (0, preact_router__WEBPACK_IMPORTED_MODULE_0__.route)(
              '/login?email='.concat(email),
              true
            )
          }
        }

      var loginOrLogout = jwt
        ? (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
            preact__WEBPACK_IMPORTED_MODULE_1__.Fragment,
            null,
            (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
              'a',
              {
                href: logout,
                className: 'link-button',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                'button',
                {
                  className: 'ostrich-button personal-margin-right',
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
                href: '/login',
                className: 'link-button',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                'button',
                {
                  className: 'plain-button personal-margin-right',
                },
                'Login'
              )
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
              'a',
              {
                href: '/signup',
                className: 'link-button',
              },
              (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
                'button',
                {
                  className: 'ostrich-button personal-margin-right',
                },
                ' ',
                'Signup'
              )
            )
          )
      return (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
        preact__WEBPACK_IMPORTED_MODULE_1__.Fragment,
        null,
        (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
          _components_Header__WEBPACK_IMPORTED_MODULE_14__['default'],
          {
            children: loginOrLogout,
            toHome: toHome,
          }
        ),
        (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
          'main',
          {
            className: 'personal-space-top content',
          },
          (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
            preact_router__WEBPACK_IMPORTED_MODULE_0__['default'],
            null,
            (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
              _components_Login__WEBPACK_IMPORTED_MODULE_6__['default'],
              {
                path: '/login',
                backendUrl: backendUrl,
                handleLoginResults: handleLoginResults,
                toSignup: toSignup,
                proceedWithGoogle: proceedWithGoogle,
                toForgotPassword: toForgotPassword,
              }
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
              _components_Signup__WEBPACK_IMPORTED_MODULE_7__['default'],
              {
                path: '/signup',
                backendUrl: backendUrl,
                handleSignupResults: handleSignupResults,
                toLogin: toLogin,
                proceedWithGoogle: proceedWithGoogle,
              }
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
              _components_Confirm__WEBPACK_IMPORTED_MODULE_8__['default'],
              {
                path: '/confirm',
                backendUrl: backendUrl,
                handleVerifyResults: handleVerifyResults,
              }
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
              _components_EmailerDashboard__WEBPACK_IMPORTED_MODULE_9__[
                'default'
              ],
              {
                path: '/dashboard',
                jwt: jwt,
                backendUrl: backendUrl,
                user: user,
              }
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
              _components_Logout__WEBPACK_IMPORTED_MODULE_11__['default'],
              {
                path: '/logout',
                backendUrl: backendUrl,
              }
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
              _components_ForgotPassword__WEBPACK_IMPORTED_MODULE_12__[
                'default'
              ],
              {
                path: '/forgot-password',
                backendUrl: backendUrl,
                handleForgotPasswordResults: handleForgotPasswordResults,
              }
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
              _components_ConfirmForgotPassword__WEBPACK_IMPORTED_MODULE_13__[
                'default'
              ],
              {
                path: '/confirm-forgot-password',
                backendUrl: backendUrl,
                handleConfirmForgotPasswordResults:
                  handleConfirmForgotPasswordResults,
              }
            ),
            (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(
              _components_Home__WEBPACK_IMPORTED_MODULE_10__['default'],
              {
                path: '/',
                backendUrl: backendUrl,
                jwt: jwt,
                user: user,
                toEmailerDashboard: toEmailerDashboard,
              }
            )
          )
        )
      )
    }

    ;(0, _build_entry__WEBPACK_IMPORTED_MODULE_3__['default'])(
      (0, preact__WEBPACK_IMPORTED_MODULE_1__.h)(App, null)
    )
  })()

  /******/
})()
//# sourceMappingURL=app.js.map
