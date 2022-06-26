// importScripts('ExtPay.js');
//
// console.log("Importing script");
// // this line is required in background.js to use ExtPay!
// const extpay = ExtPay('ostrich-plugin');
// extpay.startBackground();
//
// extpay.getUser().then(user => {
// 	console.log(user);
// });

const configurationFields = {
  insurance: {value: 60, type: "dollars"},
  vacancy: {value: 0.05, type: "percent"},
  property: {value: 0.04, type: "percent"},
  capex: {value: 0.05, type: "percent"},
  repairs: {value: 0.05, type: "percent"},
  utilities: {value: 0, type: "dollars"},
  "down-payment": {value: 0.25, type: "percent"},
  "closing-cost": {value: 0.04, type: "percent"},
  "loan-interest": {value: 0.041, type: "percent"},
  "loan-months": {value: 240, type: "months"},
	"additional-monthly-expenses": {value: 0, type: "dollars"},
  idToken: null,
  email: null,
  needsVerification: false,
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("configurationFields", (data) => {
    if ( data.configurationFields && data.configurationFields.isLoggedIn )  {
      console.log("This user was already logged in.");
    } else {
      console.log("This user was not already logged in.");
      const newUrl = "https://rehacks.io/blog-new/a-chrome-extension-to-analyze-roi-of-a-rental-property-in-5-sec"
      chrome.tabs.create({url: newUrl})
      chrome.storage.sync.set({ configurationFields });
    }
  })
});

chrome.webNavigation.onCompleted.addListener(function(details) {
  chrome.scripting.executeScript({
    target: { tabId: details.tabId },
    function: () => console.log("hello world on zillow?"),
  }, autoSignin(details));
}, {
  url: [{
      // Runs on example.com, example.net, but also example.foo.com
      hostContains: 'rehacks.io'
  }],
});

const autoSignin = (details) => () => {
  chrome.storage.sync.get("configurationFields", (data) => {
    console.log("Gonna run this time!", details)
    let url = details.url
    if ( url.match(/rehacks.io\/ostrich-token/) ) {
      const idToken = url.split('#')[1].split('&').find(e => e.match(/id_token/)).split('=')[1];
      const parsedId =  parseJwt(idToken);
      configurationFields.needsVerification = false;
      configurationFields.email = parsedId.email;
      chrome.storage.sync.set({ configurationFields });
    }
  })
}

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};
// https://rehacks.io/ostrich-token
