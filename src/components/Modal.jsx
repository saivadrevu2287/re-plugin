import { h } from 'preact'

export default function Modal(props) {
  const { children } = props

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}
