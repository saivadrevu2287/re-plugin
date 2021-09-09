const configurationFields = {
  insurance: {value: 60, type: "dollars"},
  vacancy: {value: 0.05, type: "percent"},
  property: {value: 0.04, type: "percent"},
  capex: {value: 0.05, type: "percent"},
  repairs: {value: 0.05, type: "percent"},
  utilities: {value: 0, type: "dollars"},
  "down-payment": {value: 0.25, type: "percent"},
  "closing-cost": {value: 0.04, type: "percent"}
}

chrome.runtime.onInstalled.addListener(() => {
  console.log(configurationFields);
  chrome.storage.sync.set({ configurationFields });
});
