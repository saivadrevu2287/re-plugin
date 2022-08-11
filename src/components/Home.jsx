import { h } from 'preact'
import { parseJwt } from '../subroutines/utils'

export default function Home(props) {
  const { jwt, toProfile } = props

  return (
    <div>
      <h2>Automate your Real Estate Workflow with Ostrich Tool Suite!</h2>
      {jwt && <div>
        You are currently logged in as {parseJwt(jwt.id_token).email}
        <span onClick={toProfile}>Go to your profile.</span>
      </div>}
    </div>
  )
}
