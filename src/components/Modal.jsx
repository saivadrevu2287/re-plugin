import { h } from 'preact'

export default function Modal(props) {
  const { children, close } = props

  return (
    <div
      className="modal"
      onClick={(e) => {
        if (!e.path.map((e) => e.id).includes('modal-content')) {
          close()
        }
      }}
    >
      <div className="modal-content" id="modal-content" onClick={() => {}}>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}
