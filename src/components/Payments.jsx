import { h, Fragment } from 'preact'
import PlanDetails from './PlanDetails'

export default function Payments(props) {
  const { user, isPayments } = props

  const stripeOptions = <Fragment>
  <h3>You're subscribed to Tier 0</h3>
  <p>
    You are currently subscribed to Tier 0. Meaning you have 10 free uses
    per month of the Chrome plugin. Please upgrade below for unlimited
    plugin use and access to the emailer feature.
  </p>
  <p>
    Make sure you are using the same email on the upgrade screen that you
    signed up with.
  </p>
  <stripe-pricing-table
    pricing-table-id="prctbl_1MCR6NIDd9tdb2o18q1QOupw"
    publishable-key="pk_live_51LphqXIDd9tdb2o1bC0M6mYJVzh3dh4MIbiJQXJkvCKJglH39a4bZLzeIMFXoS5p0IYBLqaT75fnkkxls5Ly8d1W006sYTCuzP"
  ></stripe-pricing-table>
</Fragment>


  if ( isPayments ) {
    // if payments page and logged out, show only options
    if ( !user ) {
      return <PlanDetails user={user} paymentsPageLink='/' />
    }
    // if payments page and tier 0, show stripe options
    else if (!user.billing_id || user.billing_id == 'Tier 0') {
      return stripeOptions
    }
    // if payments page and tier 1, show options with buttons
    else {
      return <PlanDetails user={user} paymentsPageLink='https://billing.stripe.com/p/login/bIY8wx24h5mC1aM144' />
    }
  } else {
    if ( !user ) {
      return <h1>Loading</h1>
    }
    if (!user.billing_id || user.billing_id == 'Tier 0') {
      // if plan page, and tier 0 show only options
      return <PlanDetails user={user} paymentsPageLink='/payments.html' />
    } 
    else {
      // if plan page and tier 1 show options with buttons
      return <PlanDetails user={user} paymentsPageLink='https://billing.stripe.com/p/login/bIY8wx24h5mC1aM144' />
    }
  }
}
