Stripe.api_key = ENV['STRIPE_SECRET_KEY']

Rails.configuration.stripe = { 
    :publishable_key => 'STRIPE_PUBLISHABLE_KEY', 
    :secret_key => 'STRIPE_SECRET_KEY'
  }   