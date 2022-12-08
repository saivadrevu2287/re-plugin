const configurationFields = {
  insurance: { value: 60, type: 'dollars' },
  vacancy: { value: 0.05, type: 'percent' },
  property: { value: 0.04, type: 'percent' },
  capex: { value: 0.05, type: 'percent' },
  repairs: { value: 0.05, type: 'percent' },
  utilities: { value: 0, type: 'dollars' },
  'down-payment': { value: 0.25, type: 'percent' },
  'closing-cost': { value: 0.04, type: 'percent' },
  'loan-interest': { value: 0.041, type: 'percent' },
  'loan-months': { value: 240, type: 'months' },
  'additional-monthly-expenses': { value: 0, type: 'dollars' },
  jwt: null,
  uses: [],
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get('configurationFields', (data) => {
    if (data.configurationFields && data.configurationFields.isLoggedIn) {
      console.log('This user was already logged in.')
    } else {
      console.log('This user was not already logged in.')
      const newUrl =
        'https://ostrch.notion.site/Ostrich-Extension-Tutorial-1c29f7df3db543c6b795c55f44ff9acb'
      chrome.tabs.create({ url: newUrl })
      chrome.storage.sync.set({ configurationFields })
    }
  })
})

chrome.webNavigation.onCompleted.addListener(
  function (details) {
    chrome.scripting.executeScript(
      {
        target: { tabId: details.tabId },
        function: () => console.log('hello world on zillow?'),
      },
      autoSignin(details)
    )
  },
  {
    url: [
      {
        // Runs on example.com, example.net, but also example.foo.com
        hostContains: 'ostrich.so',
      },
    ],
  }
)

const autoSignin = (details) => () => {
  chrome.storage.sync.get('configurationFields', (data) => {
    console.log('Watching for the autosignin')
    let url = details.url
    if (url.match(/ostrich.so/)) {
      console.log('Url matches!')

      if (url.split('#').length > 1) {
        const jwt = url
          .split('#')[1]
          .split('&')
          .map((e) => e.split('='))
          .reduce((acc, pair) => {
            acc[pair[0]] = pair[1]
            return acc
          }, {})

        if (jwt.id_token) {
          configurationFields.jwt = jwt
          console.log('loggingIn')
          chrome.storage.sync.set({ configurationFields })
        }
      }

      if (url.match(/\/logout.html/)) {
        configurationFields.jwt = null
        console.log('loggingOut')
        chrome.storage.sync.set({ configurationFields })
      }
    }
  })
}
