export const injectCode = (src) => {
  const script = document.createElement('script')
  // This is why it works!
  script.src = src
  script.onload = function () {
    console.log('script injected')
    this.remove()
  }

  // This script runs before the <head> element is created,
  // so we add the script to <html> instead.
  nullthrows(document.head || document.documentElement).appendChild(script)
}

export const registerTrackinOnButtons = () => {
  injectCode(chrome.runtime.getURL('/ga.js'))
  var _gaq = _gaq || []
  _gaq.push(['_setAccount', 'UA-208478356-1'])
  _gaq.push(['_trackPageview'])

  function track(e) {
    _gaq.push(['_trackEvent', e.target.id, 'clicked'])
  }

  var buttons = document.querySelectorAll('button')
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', track)
  }

  var inputs = document.querySelectorAll('input')
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', track)
  }

  var links = document.querySelectorAll('a')
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', track)
  }
}
