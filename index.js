import { render, h } from 'preact'
import App from './src/containers/App.jsx'

const root = 'root'
const errorMsg = `Error: We could not locate element with id ${root} to mount!`

console.log(`Mounting on ${root}!`)

const wrapper = document.getElementById(root)
wrapper ? render(<App />, wrapper) : console.log(errorMsg)
