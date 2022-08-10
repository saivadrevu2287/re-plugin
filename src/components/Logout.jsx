import { h } from 'preact'
import { useEffect } from 'preact/hooks'

export default function Logout(props) {
  const { setJwt } = props
  useEffect(() => {
    setJwt(null)
  }, [])
  return (
    <div>
      <h2>You are logged out!</h2>
      <a href="/login">Log Back In</a>
      <a href="/">Return Home</a>
    </div>
  )
}
