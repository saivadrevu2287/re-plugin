import { h } from 'preact'

export default function Settings(props) {
  const { user } = props

  return (
    <div class="padding-section-dashboard">
      <div class="page-title-container">
        <h2>Your Account</h2>
      </div>
      <div class="table_container">
        <div class="table_wrapper">
          <div class="table_row-group">
            <div class="table_row">
              <div
                id="w-node-_6765cd08-0f11-7e06-0d5c-16b2b6b00f76-b1a44aae"
                class="table_cell left"
              >
                <div>Email</div>
              </div>
              <div
                id="w-node-_50bf0cf3-b192-2cf1-e3f7-76d569a8c148-b1a44aae"
                class="table_cell"
              >
                <div class="table_email-text">{user.email}</div>
              </div>
            </div>
          </div>
          <div class="table_row-group">
            <div class="table_row">
              <div
                id="w-node-e89b7c5c-533f-1543-603e-929b838b707b-b1a44aae"
                class="table_cell left"
              >
                <div>Tier</div>
              </div>
              <div
                id="w-node-e89b7c5c-533f-1543-603e-929b838b707e-b1a44aae"
                class="table_cell"
              >
                <div class="table_email-text">{user.billing_id}</div>
              </div>
            </div>
          </div>
          <div class="table_row-group">
            <div class="table_row">
              <div
                id="w-node-_902834ff-409e-6c2b-d4d9-18d384be576a-b1a44aae"
                class="table_cell left"
              >
                <div>Cancel Your Plan</div>
              </div>
              <div
                id="w-node-_902834ff-409e-6c2b-d4d9-18d384be576d-b1a44aae"
                class="table_cell"
              >
                <a href="/payments.html" class="table_link">
                  Cancel Plan
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
