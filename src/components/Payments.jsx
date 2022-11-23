import { h, Fragment } from 'preact'

export default function Payments(props) {
  const { user, toHome } = props

  if (!user.billing_id) {
    return (
      <Fragment>
        <stripe-pricing-table
          pricing-table-id="prctbl_1LsMgdIDd9tdb2o1PjxLTPTI"
          publishable-key="pk_test_51LphqXIDd9tdb2o1WL2DLd67yiEEvXhzsF07hhqaSt54zAPmzJvtX5HiwC8yialHn58n8i8q2YsIMTZESKGlRMNB00H6i2uXpi"
        ></stripe-pricing-table>
        <a href="/email.html">Back to Markets!</a>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <h3>You're subscribed to {user.billing_id}</h3>
        <a href="https://billing.stripe.com/p/login/test_eVa17v7v95kM0Vi8ww">
          Manage Your Subscriptions
        </a>
        <br />
        <a href="/email.html">Back to Markets!</a>
      </Fragment>
    )
  }
}
