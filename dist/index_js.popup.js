"use strict";
(self["webpackChunkre_plugin"] = self["webpackChunkre_plugin"] || []).push([["index_js"],{

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _src_containers_Popup_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/containers/Popup.jsx */ "./src/containers/Popup.jsx");


var root = 'root';
var errorMsg = "Error: We could not locate element with id ".concat(root, " to mount!");
console.log("Mounting on ".concat(root, "!"));
var wrapper = document.getElementById(root);
wrapper ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.render)((0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_src_containers_Popup_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], null), wrapper) : console.log(errorMsg);

/***/ }),

/***/ "./src/components/Confirm.jsx":
/*!************************************!*\
  !*** ./src/components/Confirm.jsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Confirm)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var eliminateEvent = function eliminateEvent(callback) {
  return function (event) {
    return callback(event.target.value);
  };
};

var verifyCodeUrl = 'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1/auth/verify';
var resendCodeUrl = 'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1/auth/resend-code';
function Confirm(props) {
  var configurationFields = props.configurationFields,
      setConfigurationFields = props.setConfigurationFields;

  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      code = _useState2[0],
      setCode = _useState2[1];

  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      errorMessage = _useState4[0],
      setErrorMessage = _useState4[1];

  var verify = function verify() {
    axios__WEBPACK_IMPORTED_MODULE_2___default().post(verifyCodeUrl, {
      username: configurationFields.email,
      code: code
    }).then(function (r) {
      console.log(r.data.message);
      var newConfigurationFields = JSON.parse(JSON.stringify(configurationFields));
      newConfigurationFields.isLoggedIn = true;
      newConfigurationFields.needsVerification = false;
      setConfigurationFields(newConfigurationFields);
      chrome.storage.sync.set({
        configurationFields: newConfigurationFields
      });
    })["catch"](function (e) {
      console.log(e);
      setErrorMessage(e.response.data.message);
    });
  };

  var resendCode = function resendCode() {
    axios__WEBPACK_IMPORTED_MODULE_2___default().post(resendCodeUrl, {
      username: configurationFields.email
    }).then(function (r) {
      console.log(r.data.message);
      setErrorMessage(r.data.message);
    })["catch"](function (e) {
      console.log(e);
      setErrorMessage(e.response.data.message);
    });
  };

  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    id: "verify-container"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("h5", null, "Please Enter the Verification Code sent to your Email (", configurationFields.email, ")."), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    "for": "code"
  }, "Code:", (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    id: "code-input",
    name: "code",
    value: code,
    onInput: eliminateEvent(setCode)
  })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    type: "submit",
    id: "submit-verify",
    onClick: verify
  }, "Submit"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    id: "resend-code",
    onClick: resendCode
  }, "Resend Code"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, errorMessage));
}

/***/ }),

/***/ "./src/components/ListingData.jsx":
/*!****************************************!*\
  !*** ./src/components/ListingData.jsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ListingData)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _subroutines_scraper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../subroutines/scraper */ "./src/subroutines/scraper.js");
/* harmony import */ var _subroutines_math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../subroutines/math */ "./src/subroutines/math.js");
/* harmony import */ var _subroutines_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../subroutines/utils */ "./src/subroutines/utils.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var eliminateEvent = function eliminateEvent(e) {
  return e.target.value;
};

var tabSeparator = '\t';
function ListingData(props) {
  var configurationFields = props.configurationFields;

  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      price = _useState2[0],
      setPrice = _useState2[1];

  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      priceEstimate = _useState4[0],
      setPriceEstimate = _useState4[1];

  var _useState5 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
      _useState6 = _slicedToArray(_useState5, 2),
      taxes = _useState6[0],
      setTaxes = _useState6[1];

  var _useState7 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
      _useState8 = _slicedToArray(_useState7, 2),
      rentEstimate = _useState8[0],
      setRentEstimate = _useState8[1];

  var _useState9 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
      _useState10 = _slicedToArray(_useState9, 2),
      daysOnMarket = _useState10[0],
      setDaysOnMarket = _useState10[1];

  var _useState11 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
      _useState12 = _slicedToArray(_useState11, 2),
      address = _useState12[0],
      setAddress = _useState12[1];

  var _useState13 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
      _useState14 = _slicedToArray(_useState13, 2),
      specs = _useState14[0],
      setSpecs = _useState14[1];

  var _useState15 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(),
      _useState16 = _slicedToArray(_useState15, 2),
      href = _useState16[0],
      setHref = _useState16[1];

  var _useState17 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
      _useState18 = _slicedToArray(_useState17, 2),
      hasBeenCopied = _useState18[0],
      setHasBeenCopied = _useState18[1];

  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    console.log('Running scraper!');
    (0,_subroutines_scraper__WEBPACK_IMPORTED_MODULE_2__.runScraper)(function (res) {
      var results = res[0].result;
      console.log(results); // destructure the results

      setAddress(results.address);
      setPriceEstimate((0,_subroutines_math__WEBPACK_IMPORTED_MODULE_3__.toInt)(results.estimatePrice));
      setSpecs(results.bedsBath);
      setDaysOnMarket(results.daysOnMarket);
      setHref(results.href);
      setPrice((0,_subroutines_math__WEBPACK_IMPORTED_MODULE_3__.toInt)(results.purchasePrice));
      setTaxes((0,_subroutines_math__WEBPACK_IMPORTED_MODULE_3__.toInt)(results.monthlyTaxes));
      setRentEstimate((0,_subroutines_math__WEBPACK_IMPORTED_MODULE_3__.toInt)(results.monthlyRent));
    });
  }, []);
  console.log({
    price: price,
    taxes: taxes,
    rentEstimate: rentEstimate
  });

  var _calculateCOC = (0,_subroutines_math__WEBPACK_IMPORTED_MODULE_3__.calculateCOC)(configurationFields, price, taxes, rentEstimate),
      cashOnCash = _calculateCOC.cashOnCash;

  var getDataFields = function getDataFields() {
    return {
      purchasePrice: (0,_subroutines_utils__WEBPACK_IMPORTED_MODULE_4__.dollars)(price),
      monthlyTaxes: (0,_subroutines_utils__WEBPACK_IMPORTED_MODULE_4__.monthlyDollars)(taxes),
      monthlyRent: (0,_subroutines_utils__WEBPACK_IMPORTED_MODULE_4__.monthlyDollars)(rentEstimate),
      address: address,
      estimatePrice: (0,_subroutines_utils__WEBPACK_IMPORTED_MODULE_4__.dollars)(priceEstimate),
      bedsBath: specs,
      daysOnMarket: daysOnMarket,
      cashOnCash: cashOnCash,
      href: href
    };
  };

  var handleUpdate = function handleUpdate(field) {
    var stateFunction;

    if (field == 'price') {
      stateFunction = setPrice;
    } else if (field == 'taxes') {
      stateFunction = setTaxes;
    } else if (field == 'rent') {
      stateFunction = setRentEstimate;
    }

    return function (e) {
      setHasBeenCopied(false);
      stateFunction((0,_subroutines_math__WEBPACK_IMPORTED_MODULE_3__.toInt)(eliminateEvent(e)));
    };
  };

  var handleCopyClick = function handleCopyClick() {
    setHasBeenCopied(true);
    (0,_subroutines_utils__WEBPACK_IMPORTED_MODULE_4__.handleCopy)(getDataFields(), tabSeparator);
  };

  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    id: "data-container"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    "class": "top-half"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    "class": "link-container"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    id: "profile-button",
    "class": "link-button hidden"
  })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    "class": "data-field small-label"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    "class": "label-small"
  }, "Price:"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    "class": "value-small"
  }, "$", (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    "class": "input",
    type: "number",
    id: "price-input",
    placeholder: "Provide Offer Price",
    value: price,
    onInput: handleUpdate('price')
  }))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    "class": "data-field small-label"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    "class": "label-small"
  }, "Estimate:"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    "class": "value-small",
    id: "estimate-price"
  }, priceEstimate)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    "class": "data-field small-label"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    "class": "label-small"
  }, "Taxes ($/mo):"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    "class": "value-small"
  }, "$", (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    "class": "input",
    type: "number",
    id: "monthly-taxes-input",
    placeholder: "Provide Monthly Taxes",
    value: taxes,
    onInput: handleUpdate('taxes')
  }))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    "class": "data-field small-label"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    "class": "label-small"
  }, "Rent Estimate ($/mo):"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    "class": "value-small"
  }, "$", (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    "class": "input",
    type: "number",
    id: "rent-input",
    placeholder: "Provide Rent",
    value: rentEstimate,
    onInput: handleUpdate('rent')
  }))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    "class": "data-field small-label"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    "class": "label-small"
  }, "Days On Market:"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    "class": "value-small",
    id: "days-on-market"
  }, daysOnMarket)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    "class": "data-field small-label"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    "class": "label-small"
  }, "Address:"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    "class": "value-small",
    id: "address"
  }, address)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    "class": "data-field small-label"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    "class": "label-small"
  }, "Specs:"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    "class": "value-small",
    id: "specs"
  }, specs))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    "class": "bottom-half"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    "class": "data-field large-label"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    "class": "label-small"
  }, "Cash On Cash", (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
    target: "_blank",
    href: "https://rehacks.io/blog-new/a-chrome-extension-to-analyze-roi-of-a-rental-property-in-5-sec"
  }, "(?)"), ":"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    "class": "value-small ".concat(cashOnCash > 0 ? 'success' : 'error'),
    id: "cash-on-cash"
  }, cashOnCash.toLocaleString() + '%')), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    "class": "action-row data-field"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    "class": "label-large big-finger"
  }, "\u261E"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
    target: "_blank",
    id: "redfin-link",
    "class": "value-large",
    href: "https://www.google.com/search?q=".concat(encodeURIComponent(address + ' redfin'))
  }, "To Redfin")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    "class": "action-row data-field"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    "class": "label-large big-finger"
  }, "\u261E"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
    target: "_blank",
    id: "realtor-link",
    "class": "value-large",
    href: "https://www.google.com/search?q=".concat(encodeURIComponent(address + ' realtor'))
  }, "To Realtor")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    "class": "action-row data-field"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    "class": "label-large big-finger"
  }, "\u261E"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    id: "copy-button",
    "class": "link-button value-large",
    onClick: handleCopyClick
  }, hasBeenCopied ? "Copied!" : "Copy Data Fields")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    "class": "action-row data-field"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    "class": "label-large big-finger"
  }, "\u261E"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
    "class": "value-large",
    target: "_blank",
    href: "https://docs.google.com/forms/d/1E6h7AbJZxitYnMuT1J6eK-x9AA5CpYHE2Dd3qYghZUA/edit"
  }, "Provide Feedback!"))));
}

/***/ }),

/***/ "./src/components/Login.jsx":
/*!**********************************!*\
  !*** ./src/components/Login.jsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Login)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var eliminateEvent = function eliminateEvent(callback) {
  return function (event) {
    return callback(event.target.value);
  };
};

var loginUrl = 'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1/auth/login';
function Login(props) {
  var configurationFields = props.configurationFields,
      toSignup = props.toSignup,
      proceedWithGoogle = props.proceedWithGoogle,
      setConfigurationFields = props.setConfigurationFields;

  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      email = _useState2[0],
      setEmail = _useState2[1];

  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      password = _useState4[0],
      setPassword = _useState4[1];

  var _useState5 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
      _useState6 = _slicedToArray(_useState5, 2),
      errorMessage = _useState6[0],
      setErrorMessage = _useState6[1];

  var login = function login() {
    axios__WEBPACK_IMPORTED_MODULE_2___default().post(loginUrl, {
      username: email,
      password: password
    }).then(function (r) {
      console.log(r.data.message);
      var newConfigurationFields = JSON.parse(JSON.stringify(configurationFields));
      newConfigurationFields.isLoggedIn = true;
      newConfigurationFields.email = email;
      setConfigurationFields(newConfigurationFields);
      chrome.storage.sync.set({
        configurationFields: newConfigurationFields
      });
    })["catch"](function (e) {
      console.log(e);
      setErrorMessage(e.response.data.message);
    });
  };

  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    id: "login-container"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("h5", null, "Please Login With Email to use Plugin."), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    "for": "username"
  }, "Email:", (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    id: "email-input",
    name: "username",
    value: email,
    onInput: eliminateEvent(setEmail)
  })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    "for": "password"
  }, "Password:", (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    id: "password-input",
    name: "password",
    type: "password",
    value: password,
    onInput: eliminateEvent(setPassword)
  })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    type: "submit",
    id: "submit-login",
    onClick: login
  }, "Login"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    id: "login-with-google",
    onClick: proceedWithGoogle
  }, "Log In With Google"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("h5", null, "Not Signed Up?", ' ', (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    id: "signup-link",
    "class": "link",
    onClick: toSignup
  }, "Sign Up Here!")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, errorMessage));
}

/***/ }),

/***/ "./src/components/Signup.jsx":
/*!***********************************!*\
  !*** ./src/components/Signup.jsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Signup)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var eliminateEvent = function eliminateEvent(callback) {
  return function (event) {
    return callback(event.target.value);
  };
};

var signupUrl = 'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1/auth/sign-up';
function Signup(props) {
  var configurationFields = props.configurationFields,
      toLogin = props.toLogin,
      proceedWithGoogle = props.proceedWithGoogle,
      setConfigurationFields = props.setConfigurationFields;

  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      email = _useState2[0],
      setEmail = _useState2[1];

  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      password = _useState4[0],
      setPassword = _useState4[1];

  var _useState5 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
      _useState6 = _slicedToArray(_useState5, 2),
      errorMessage = _useState6[0],
      setErrorMessage = _useState6[1];

  var signUp = function signUp() {
    axios__WEBPACK_IMPORTED_MODULE_2___default().post(signupUrl, {
      username: email,
      password: password
    }).then(function (r) {
      console.log(r.data.message);
      var newConfigurationFields = JSON.parse(JSON.stringify(configurationFields));
      newConfigurationFields.email = email;
      newConfigurationFields.needsVerification = true;
      setConfigurationFields(newConfigurationFields);
      chrome.storage.sync.set({
        configurationFields: newConfigurationFields
      });
    })["catch"](function (e) {
      console.log(e);
      setErrorMessage(e.response.data.message);
    });
  };

  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    id: "signup-container"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("h5", null, "Please Signup With Email to use Plugin."), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    "for": "username"
  }, "Email:", (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    id: "email-input",
    name: "username",
    value: email,
    onInput: eliminateEvent(setEmail)
  })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    "for": "password"
  }, "Password:", (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    id: "password-input",
    name: "password",
    type: "password",
    value: password,
    onInput: eliminateEvent(setPassword)
  })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    type: "submit",
    id: "submit-signup",
    onClick: signUp
  }, "Sign Up"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    id: "signup-with-google",
    onClick: proceedWithGoogle
  }, "Sign Up With Google"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("h5", null, "Already Signed Up?", ' ', (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    id: "login-link",
    "class": "link",
    onClick: toLogin
  }, "Login Here!")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, errorMessage));
}

/***/ }),

/***/ "./src/containers/Popup.jsx":
/*!**********************************!*\
  !*** ./src/containers/Popup.jsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Popup)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _components_ListingData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/ListingData */ "./src/components/ListingData.jsx");
/* harmony import */ var _components_Signup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Signup */ "./src/components/Signup.jsx");
/* harmony import */ var _components_Login__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Login */ "./src/components/Login.jsx");
/* harmony import */ var _components_Confirm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Confirm */ "./src/components/Confirm.jsx");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var loginWithGoogleUrl = 'https://ostrich.auth.us-east-2.amazoncognito.com/login?client_id=70apbavl1fsobed4jt7l7ml18h&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://rehacks.io/ostrich-token';
function Popup(props) {
  console.log('Rendering Popup');

  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      configurationFields = _useState2[0],
      setConfigurationFields = _useState2[1];

  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showLogin = _useState4[0],
      setShowLogin = _useState4[1];

  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    chrome.storage.sync.get('configurationFields', function (data) {
      console.log(data.configurationFields);
      setConfigurationFields(data.configurationFields);
    });
  }, []);

  var proceedWithGoogle = function proceedWithGoogle() {
    return chrome.tabs.create({
      url: loginWithGoogleUrl
    });
  };

  if (!configurationFields) {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("h1", null, "Loading...");
  }

  if (configurationFields.isLoggedIn) {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_components_ListingData__WEBPACK_IMPORTED_MODULE_2__["default"], {
      configurationFields: configurationFields
    });
  }

  if (configurationFields.needsVerification) {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_components_Confirm__WEBPACK_IMPORTED_MODULE_5__["default"], {
      configurationFields: configurationFields,
      setConfigurationFields: setConfigurationFields
    });
  }

  if (showLogin) {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_components_Login__WEBPACK_IMPORTED_MODULE_4__["default"], {
      configurationFields: configurationFields,
      toSignup: function toSignup() {
        return setShowLogin(false);
      },
      setConfigurationFields: setConfigurationFields,
      proceedWithGoogle: proceedWithGoogle
    });
  } else {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_components_Signup__WEBPACK_IMPORTED_MODULE_3__["default"], {
      configurationFields: configurationFields,
      toLogin: function toLogin() {
        return setShowLogin(true);
      },
      setConfigurationFields: setConfigurationFields,
      proceedWithGoogle: proceedWithGoogle
    });
  }
}

/***/ }),

/***/ "./src/subroutines/math.js":
/*!*********************************!*\
  !*** ./src/subroutines/math.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calculateCOC": () => (/* binding */ calculateCOC),
/* harmony export */   "dollars": () => (/* binding */ dollars),
/* harmony export */   "monthlyDollars": () => (/* binding */ monthlyDollars),
/* harmony export */   "toInt": () => (/* binding */ toInt)
/* harmony export */ });
// turn anything with numbers into just a regular integer
var toInt = function toInt(n) {
  return parseInt(n.split('').filter(function (a) {
    return a.match(/[0-9.]/g);
  }).join(''));
};
var monthlyDollars = function monthlyDollars(n) {
  return isNaN(n) ? 'N/A' : "$".concat(n.toLocaleString(), "/mo");
};
var dollars = function dollars(n) {
  return isNaN(n) ? 'N/A' : "$".concat(n.toLocaleString());
}; // COC = [(Monthly Cash flow (MCF) x 12) / Initial Total Investment (ITI)] x 100

var CashOnCash = function CashOnCash(monthlyCashFlow, initialTotalInvestment) {
  return monthlyCashFlow * 12 / initialTotalInvestment * 100;
}; // ITI = 29% of Purchase Price(PP)(Which comes from Zillow)


var InitialTotalInvestment = function InitialTotalInvestment(configurationFields, purchasePrice) {
  return (configurationFields['down-payment'].value + configurationFields['closing-cost'].value) * purchasePrice;
}; // MCF = Monthly Gross Income(MGI)(comes from Zillow) - Monthly Expenses - Monthly Debt Service


var MonthlyCashFlow = function MonthlyCashFlow(configurationFields, monthlyGrossIncome, monthlyExpenses, monthlyDebtService) {
  return monthlyGrossIncome - monthlyGrossIncome * configurationFields.vacancy.value - monthlyExpenses - monthlyDebtService;
}; // Monthly Expenses = Taxes(comes from Zillow) + Insurance($60) + Vacancy(5% of MGI) + Property Management(4% of MGI)+ Capex(5% of MGI) + Repairs(5% of MGI) + Utilities($0)


var MonthlyExpenses = function MonthlyExpenses(configurationFields, taxes, monthlyGrossIncome) {
  var income = monthlyGrossIncome - configurationFields.vacancy.value * monthlyGrossIncome;
  var insurance = configurationFields.insurance.value;
  var propertyManagement = configurationFields.property.value * income;
  var capex = configurationFields.capex.value * income;
  var repairs = configurationFields.repairs.value * income;
  var utilities = configurationFields.utilities.value;
  return taxes + insurance + propertyManagement + capex + repairs + utilities;
}; // Monthly Debt Service = .61 % of Loan


var MonthlyDebtService = function MonthlyDebtService(configurationFields, loan) {
  // i
  var monthlyInterest = configurationFields['loan-interest'].value / 12; // n

  var months = configurationFields['loan-months'].value; // (1 + i)^-n

  var exponent = Math.pow(1 + monthlyInterest, -months); // 1 - (1 + i)^-n

  var denominator = 1 - exponent; // p * (i / (1 - (1 + i)^-n))

  return loan * (monthlyInterest / denominator);
}; // Loan = 75% of Purchase Price(comes from Zillow)


var Loan = function Loan(configurationFields, purchasePrice) {
  return (1 - configurationFields['down-payment'].value) * purchasePrice;
};

var calculateCOC = function calculateCOC(configurationFields, purchasePrice, taxes, monthlyGrossIncome) {
  var loan = Loan(configurationFields, purchasePrice);
  var monthlyDebtService = MonthlyDebtService(configurationFields, loan);
  var monthlyExpenses = MonthlyExpenses(configurationFields, taxes, monthlyGrossIncome) + configurationFields['additional-monthly-expenses'].value;
  var initialTotalInvestment = InitialTotalInvestment(configurationFields, purchasePrice);
  var monthlyCashFlow = MonthlyCashFlow(configurationFields, monthlyGrossIncome, monthlyExpenses, monthlyDebtService);
  var cashOnCash = CashOnCash(monthlyCashFlow, initialTotalInvestment);
  return {
    cashOnCash: cashOnCash,
    monthlyExpenses: monthlyExpenses
  };
};

/***/ }),

/***/ "./src/subroutines/scraper.js":
/*!************************************!*\
  !*** ./src/subroutines/scraper.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "runScraper": () => (/* binding */ runScraper)
/* harmony export */ });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var runScraper = function runScraper(resultsHandler) {
  console.log('getting tab!', scrapeZillowElements);
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }).then(function (r) {
    var _r = _slicedToArray(r, 1),
        tab = _r[0];

    chrome.scripting.executeScript({
      target: {
        tabId: tab.id
      },
      "function": scrapeZillowElements
    }, resultsHandler);
  });
};

var scrapeZillowElements = function scrapeZillowElements() {
  console.log('runnin!');
  var purchasePriceSelectors = ['#details-page-container > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > div.ds-summary-row-container > div > div > span > span > span', '#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > div.ds-summary-row-container > div > div > span > span > span', '#ds-data-view > div.ds-chip-mobile.ds-chip-mobile-open > div.ds-home-details-chip > div.ds-summary-row-container > div > div > span > span > span', '#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.jRNYtf.ds-chip > div > div.Spacer-c11n-8-53-2__sc-17suqs2-0.ibzEYG > span.Text-c11n-8-53-2__sc-aiai24-0.iyRhoe', '#details-page-container > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div:nth-child(1) > div > div > div.hdp__sc-1s2b8ok-0.bhouud > div > span > span', '#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div:nth-child(1) > div > div > div.hdp__sc-1s2b8ok-0.bhouud > div > span > span'];
  var monthlyTaxesSelectors = ['#label-property-tax > div > span', '#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > div.ds-mortgage-row > div > span:nth-child(2)', '#ds-data-view > ul > li:nth-child(8) > div.hdp__sc-1j01zad-0.cRaELx > div.hdp__sc-1j01zad-1.kuboKK > div:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2) > span', '#details-page-container > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.data-view-container > div > div > div > ul > li:nth-child(16) > div > div:nth-child(2) > div > div > div.hdp__sc-1j01zad-1.hmkpQE > div > div.sc-kLwhqv.hfyMFa > span.Text-c11n-8-65-2__sc-aiai24-0.eUxMDw'];
  var monthlyRentSelectors = ['#ds-rental-home-values > div > div.ds-expandable-card-section-default-padding > div > div > div > span', '#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > p > span:nth-child(3) > span.Text-c11n-8-48-0__sc-aiai24-0.fGOvOB', '#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.ds-chip > div > div.hdp__sc-11h2l6b-2.kMgzZt.ds-chip-removable-content > p > span.hdp__sc-18p00c6-0.bNiRNy > span.Text-c11n-8-53-2__sc-aiai24-0.duChdW', '#ds-rental-home-values > div > div.hdp__sc-1j01zad-1.kuboKK > div > div > div > span', '#ds-rental-home-values > div > div.hdp__sc-1j01zad-1.hmkpQE > div > div > div > span'];
  var addressSelectors = ['#ds-chip-property-address', '#details-page-container > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div:nth-child(1) > div > div > div.hdp__sc-riwk6j-0.tLBoE > h1', '#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div:nth-child(1) > div > div > div.hdp__sc-riwk6j-0.tLBoE > h1'];
  var bedsBathSelectors = ['#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.FNtGJ.ds-chip > div > div.ds-summary-row-container > div > div > div > span', '#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.ds-chip > div > div.ds-summary-row-container > div > div > div > span', '#details-page-container > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div:nth-child(1) > div > div > div.hdp__sc-1s2b8ok-0.bhouud > div > div > span', '#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div:nth-child(1) > div > div > div.hdp__sc-1s2b8ok-0.bhouud > div > div > span'];
  var estimatePriceSelectors = ['#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.FNtGJ.ds-chip > div > div.sc-pbvBv.hmDgXL.ds-chip-removable-content > p > span.sc-pRhbc.ePDsLp > span:nth-child(2) > span', '#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.FNtGJ.ds-chip > div > div.hdp__qf5kuj-12.ivFlOG.ds-chip-removable-content > p > span.hdp__qf5kuj-9.iuGlLh > span:nth-child(2) > span', '#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.FNtGJ.ds-chip > div > div.sc-prqHV.gZvZRy.ds-chip-removable-content > p > span.sc-oTzDS.fotNMM > span:nth-child(2) > span', '#home-details-content > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div.ds-home-details-chip > p > span:nth-child(2) > span:nth-child(2) > span', '#ds-data-view > div.ds-chip-mobile.ds-chip-mobile-open > div.ds-home-details-chip > div.hdp__sc-11h2l6b-2.kMgzZt.ds-chip-removable-content > p > span.hdp__sc-18p00c6-0.bNiRNy > span.Text-c11n-8-53-2__sc-aiai24-0.duChdW', '#ds-container > div.ds-data-col.ds-white-bg.ds-data-col-data-forward > div.hdp__sc-1tsvzbc-1.ds-chip > div > div.hdp__sc-11h2l6b-2.kMgzZt.ds-chip-removable-content > p > span.hdp__sc-18p00c6-0.bNiRNy > span:nth-child(2) > span', '#details-page-container > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.summary-container > div > div:nth-child(1) > div > div > div.hdp__sc-13r9t6h-0.ds-chip-removable-content > span > div.hdp__sc-j76ge-1.buRXbo > span > span > span'];
  var daysOnMarketSelectors = ['#ds-data-view > ul > li:nth-child(3) > div > div > div.ds-expandable-card-section-default-padding > div.hdp__sc-1f3vlqq-0.jRmwCk > div:nth-child(1) > div.Text-c11n-8-48-0__sc-aiai24-0.fGOvOB', '#ds-data-view > ul > li:nth-child(3) > div > div > div.ds-expandable-card-section-default-padding > div.sc-ptScb.hfNvvF > div:nth-child(1) > div.Text-c11n-8-48-0__sc-aiai24-0.fGOvOB', '#ds-data-view > ul > li:nth-child(3) > div > div > div.ds-expandable-card-section-default-padding > div.sc-qWfkp.eXNcZI > div:nth-child(1) > div.Text-c11n-8-48-0__sc-aiai24-0.fGOvOB', '#ds-data-view > ul > li:nth-child(2) > div.ds-overview > div:nth-child(3) > div.hdp__sc-1j01zad-2.fAXLDd > div.hdp__sc-qe1dn6-0.jAEoY > div:nth-child(1) > div.Text-c11n-8-53-2__sc-aiai24-0.duChdW', '#ds-data-view > ul > li:nth-child(3) > div.ds-overview > div:nth-child(3) > div.hdp__sc-1j01zad-1.kuboKK > div.hdp__sc-qe1dn6-0.jAEoY > div:nth-child(1) > div.Text-c11n-8-53-2__sc-aiai24-0.duChdW', '#ds-data-view > ul > li:nth-child(3) > div:nth-child(2) > div > div:nth-child(3) > div.hdp__sc-1j01zad-1.kuboKK > div.hdp__sc-qe1dn6-0.jAEoY > div:nth-child(1) > div.Text-c11n-8-53-2__sc-aiai24-0.duChdW', '#ds-data-view > ul > li:nth-child(3) > div:nth-child(2) > div > div:nth-child(3) > div.hdp__sc-1j01zad-1.hmkpQE > div.hdp__sc-qe1dn6-0.kvrIiO > div:nth-child(1) > div.Text-c11n-8-62-5__sc-aiai24-0.eqgHgX', '#details-page-container > div > div > div.layout-wrapper > div.layout-container > div.data-column-container > div.data-view-container > div > div > div > ul > li:nth-child(3) > div > div:nth-child(2) > div > div > div.hdp__sc-1j01zad-1.hmkpQE > div.Spacer-c11n-8-65-2__sc-17suqs2-0.gWKNeX > dl > dd:nth-child(2)'];

  var scrapeElement = function scrapeElement(selectors, name) {
    var nill = 'N/A';
    var element = nill;
    var i = 0;

    while (element == nill && i < selectors.length) {
      try {
        element = document.querySelector(selectors[i]).innerHTML;
      } catch (error) {
        element = nill;
      }

      i += 1;
    }

    console.log({
      m: "select ".concat(name),
      element: element,
      selector: selectors[i]
    });
    return element;
  };

  var flattenHtml = function flattenHtml(el) {
    return el.replace(/<\/?[^>]*>/g, ' ').replace(/&[^;]*;/, ' ');
  };

  var host = window.location.host;
  var purchasePrice = flattenHtml(scrapeElement(purchasePriceSelectors, 'purchasePrice'));
  var monthlyTaxes = flattenHtml(scrapeElement(monthlyTaxesSelectors, 'monthlyTaxes'));
  var monthlyRent = flattenHtml(scrapeElement(monthlyRentSelectors, 'monthlyRent'));
  var address = flattenHtml(scrapeElement(addressSelectors, 'address'));
  var estimatePrice = flattenHtml(scrapeElement(estimatePriceSelectors, 'estimatePrice'));
  var bedsBath = flattenHtml(scrapeElement(bedsBathSelectors, 'bedsBath'));
  var daysOnMarket = flattenHtml(scrapeElement(daysOnMarketSelectors, 'daysOnMarket'));
  var href = document.location.href;
  var results = {
    purchasePrice: purchasePrice,
    monthlyTaxes: monthlyTaxes,
    monthlyRent: monthlyRent,
    address: address,
    estimatePrice: estimatePrice,
    bedsBath: bedsBath,
    daysOnMarket: daysOnMarket,
    href: href
  };
  return results;
};

/***/ }),

/***/ "./src/subroutines/utils.js":
/*!**********************************!*\
  !*** ./src/subroutines/utils.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dollars": () => (/* binding */ dollars),
/* harmony export */   "handleCopy": () => (/* binding */ handleCopy),
/* harmony export */   "monthlyDollars": () => (/* binding */ monthlyDollars)
/* harmony export */ });
var handleCopy = function handleCopy(calculations, csvSeparator) {
  var toCsv = function toCsv(obj) {
    return Object.keys(obj).reduce(function (acc, key) {
      return "".concat(acc).concat(obj[key]).concat(csvSeparator);
    }, '');
  };

  var copy = function copy(e) {
    e.preventDefault();
    var text = toCsv(calculations);
    console.log({
      m: 'handleCopy',
      text: text
    });

    if (e.clipboardData) {
      e.clipboardData.setData('text/plain', text);
    } else if (window.clipboardData) {
      window.clipboardData.setData('Text', text);
    }
  };

  window.addEventListener('copy', copy);
  document.execCommand('copy');
  window.removeEventListener('copy', copy);
};
var monthlyDollars = function monthlyDollars(n) {
  return isNaN(n) ? 'N/A' : "$".concat(n.toLocaleString(), "/mo");
};
var dollars = function dollars(n) {
  return isNaN(n) ? 'N/A' : "$".concat(n.toLocaleString());
};

/***/ })

}]);
//# sourceMappingURL=index_js.popup.js.map