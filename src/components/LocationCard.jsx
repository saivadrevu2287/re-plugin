import { h } from 'preact'
import { nFormatter } from '../subroutines/math'
import { deleteEmailer, saveEmailer } from '../api/emailer'

export default function LocationCard(props) {
  const {
    backendUrl,
    emailer,
    handleEdit,
    disabled,
    setSuccessMessage,
    setErrorMessage,
    handleCopy,
    canCopy,
  } = props

  const deleteEmail = () =>
    deleteEmailer(
      backendUrl,
      emailer.id,
      (r) => {
        setSuccessMessage(`Deleted ${emailer.notes} successfully`)
        setErrorMessage('')
      },
      (e) => {
        setSuccessMessage('')
        setErrorMessage(e.response.data.message)
      }
    )

  return (
    <div className="location_card">
      <div
        id="w-node-_2194b220-64a9-f152-0cea-9321643447d2-1f172029"
        className="location_card-header"
      >
        <div className="location_location-text">{emailer.notes}</div>
        <div className="location_button-group">
          <button onClick={handleEdit} className="location_edit">
            Edit
          </button>
          <button onClick={deleteEmail} className="location_delete">
            Delete
          </button>
        </div>
      </div>
      {disabled && (
        <p className="error">Exceeded Max count per plan; Market Disabled.</p>
      )}
      <div
        id="w-node-_838e775f-63cd-4fbd-9ef9-eaccdfa71140-1f172029"
        className="location_card-value-group"
      >
        <div className="location_card-label">County</div>
        <div className="location_card-value">{emailer.search_param}</div>
      </div>
      <div
        id="w-node-_457642bc-8d74-ee69-33a9-98fbf1ef1702-1f172029"
        className="location_card-bottom"
      >
        <div className="location_card-value-group is-bottom">
          <div className="location_card-label">Minimum Price</div>
          <div className="location_card-value">
            ${nFormatter(emailer.min_price)}
          </div>
        </div>
        <div className="location_card-value-group is-bottom">
          <div className="location_card-label">Maximum Price</div>
          <div className="location_card-value">
            ${nFormatter(emailer.max_price)}
          </div>
        </div>
        <div className="location_card-value-group is-bottom">
          <div className="location_card-label">Bedrooms (Minimum)</div>
          <div className="location_card-value">{emailer.no_bedrooms}</div>
        </div>
        <div className="location_card-value-group is-bottom">
          <div className="location_card-label">Bathrooms (Minimum)</div>
          <div className="location_card-value">{emailer.no_bathrooms}</div>
        </div>
        {canCopy && (
            <button onClick={handleCopy} className="location_edit">
              Clone Market
            </button>
          )}
      </div>
    </div>
  )
}
