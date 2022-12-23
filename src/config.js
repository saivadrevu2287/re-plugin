const config = {
  backendUrl: 'https://q0sku06vtg.execute-api.us-east-2.amazonaws.com/v1',
  loginWithGoogleUrl:
    'https://ostrich.auth.us-east-2.amazoncognito.com/login?client_id=70apbavl1fsobed4jt7l7ml18h&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://ostrich.so/',
  stripeBillingUrl: 'https://billing.stripe.com/p/login/bIY8wx24h5mC1aM144',
  getStartedButtonMessage: 'Use your login email address on the next page',
  pluginTutorialPage:
    'https://ostrch.notion.site/Ostrich-Extension-Tutorial-1c29f7df3db543c6b795c55f44ff9acb',
  pluginSetupPage:
    'https://ostrch.notion.site/Ostrich-Plugin-Setup-1c29f7df3db543c6b795c55f44ff9acb',
  plans: {
    'Tier 0': {
      price: 0,
      locations: 0,
      pluginLookups: 10,
    },
    'Tier 1': {
      price: 8.99,
      locations: 1,
      pluginLookups: 'Unlimited',
    },
    'Tier 2': {
      price: 14.99,
      locations: 1,
      pluginLookups: 'Unlimited',
    },
    'Tier 3': {
      price: 19.99,
      locations: 3,
      pluginLookups: 'Unlimited',
    },
  },
  pricingPage: '/pricing.html',
  frontendUrl: 'https://ostrich.so',
}

export default config
