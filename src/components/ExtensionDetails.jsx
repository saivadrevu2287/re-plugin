import { h } from 'preact'
import config from '../config'

export default function ExtensionDetails(props) {
  return (
    <div class="padding-section-dashboard">
      <div class="page-title-container">
        <h2>Ostrich Chrome Extension</h2>
      </div>
      <div class="ce_main-container">
        <p
          id="w-node-_8e9e2030-65cf-9533-99e2-41d9d3dbbbe4-fe285f03"
          class="ce_paragraph"
        >
          Click the extension icon on your Chrome Browser to instantly get the
          cash on cash analysis of a listing. <br />
          Use the extension to screen listings quickly or to find cash flowing
          markets.
          <br />
          <br />
          <br />
          <a target="_blank" href={config.pluginSetupPage}>
            See a 2 min video
          </a>
        </p>
        <div
          id="w-node-_0ec42e9a-ae6b-1ef9-e4f6-5285a3e2da4b-fe285f03"
          class="note_wrapper"
        >
          <div class="note_text">Note</div>
          <ul role="list" class="note_list-ul">
            <li class="note_list-li">
              If you are on the free plan, you get{' '}
              {config.plans['Tier 0'].pluginLookups} free uses every month
            </li>
            <li class="note_list-li">
              To get unlimited uses upgrade to Tier 1 or above
            </li>
          </ul>
        </div>
        <a
          id="w-node-_250e43ed-3caa-52a1-81cd-f1958440c0fb-fe285f03"
          href="https://chrome.google.com/webstore/detail/ostrich/aicgkflmidjkbcenllnnlbnfnmicpmgo"
          target="_blank"
          class="button w-button"
        >
          Download Chrome Extension
        </a>
      </div>
    </div>
  )
}
