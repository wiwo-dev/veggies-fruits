const handleError = (err) => {
  // Note: Node.js API does not throw exceptions, and instead prefers the
  // asynchronous style of error handling described below.
  //
  // An error from the Stripe API or an otherwise asynchronous error
  // will be available as the first argument of any Stripe method's callback:
  // E.g. stripe.customers.create({...}, function(err, result) {});
  //
  // Or in the form of a rejected promise.
  // E.g. stripe.customers.create({...}).then(
  //        function(result) {},
  //        function(err) {}
  //      );

  switch (err.type) {
    case "StripeCardError":
      // A declined card error
      err.message; // => e.g. "Your card's expiration year is invalid."
      break;
    case "StripeRateLimitError":
      // Too many requests made to the API too quickly
      break;
    case "StripeInvalidRequestError":
      // Invalid parameters were supplied to Stripe's API
      break;
    case "StripeAPIError":
      // An error occurred internally with Stripe's API
      break;
    case "StripeConnectionError":
      // Some kind of error occurred during the HTTPS communication
      break;
    case "StripeAuthenticationError":
      // You probably used an incorrect API key
      break;
    default:
      // Handle any other types of unexpected errors
      break;
  }
};
