import { h, Fragment } from 'preact'

export default function Payments(props) {
  const { user } = props

  if (!user.billing_id) {
    return (
      <Fragment>
        <stripe-pricing-table
          pricing-table-id="prctbl_1MCR6NIDd9tdb2o18q1QOupw"
          publishable-key="pk_live_51LphqXIDd9tdb2o1bC0M6mYJVzh3dh4MIbiJQXJkvCKJglH39a4bZLzeIMFXoS5p0IYBLqaT75fnkkxls5Ly8d1W006sYTCuzP"
        ></stripe-pricing-table>
        <a href="/">Back to Markets!</a>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <h3>You're subscribed to {user.billing_id}</h3>
        <a href="https://billing.stripe.com/p/login/bIY8wx24h5mC1aM144">
          Manage Your Subscriptions
        </a>
        <br />
        <a href="/">Back to Markets!</a>
      </Fragment>
    )
  }
}
