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
      const newUrl = "https://www.hgking.net"
      chrome.tabs.create({url: newUrl})
      chrome.storage.sync.set({ configurationFields });
    }
  })
});
