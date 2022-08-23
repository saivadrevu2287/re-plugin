import { render } from 'preact'

const entry = (container) => {
  setTimeout(() => {
    console.log("Running!!!")
    _gaq.push(['_setAccount', 'UA-208478356-1'])
    _gaq.push(['_trackPageview'])
  }, 1000)
  
  const root = 'root'
  const errorMsg = `Error: We could not locate element with id ${root} to mount!`

  console.log(`Mounting on ${root}!`)

  const wrapper = document.getElementById(root)
  wrapper ? render(container, wrapper) : console.log(errorMsg)
}

export default entry
