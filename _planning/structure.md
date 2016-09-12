firmware

1) postcode -> twilio -> posts to url
2) posts to sms route
3) validation via (api.postcodes.io/postcodes/:postcode) -> if not correct sends message validate
4) if validation is okay, add's an entry to 'requests' table with status incomplete -> (potentially send message saying 'Your future is being predicted...')
5)
