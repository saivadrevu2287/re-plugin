import { render, h } from 'preact'
import Popup from './src/containers/Popup.jsx'

const root = 'root'
const errorMsg = `Error: We could not locate element with id ${root} to mount!`

console.log(`Mounting on ${root}!`)

const wrapper = document.getElementById(root)
wrapper ? render(<Popup />, wrapper) : console.log(errorMsg)
