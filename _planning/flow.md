1) postcode -> twilio -> posts to url
2) posts to sms route
3) validation via (api.postcodes.io/postcodes/:postcode) -> if not correct sends message validate
4) if validation is okay, add's an entry to 'requests' table with status incomplete, and chooses robot ->
  4a) rules for choosing robot
    1. find random robot that's not the last one
    2. if number had request before choose a different robot
  4b) (potentially send message saying 'Your future is being predicted...' - only if few requests with incomplete)
5) emit event 'Request added' -> gets oldest incomplete request
6) generates the prediction -> promise
  6a) fetching data
  6b) getting template
  6c) compiling together
7) store prediction text into requests table
8) call photon cloud thing and send it url, port, request_id
9) photon open a socket to tcp server and write id to it
10) tcp server fetches the request, streams it to photon (at this moment printer starts printing)
  10a) changes status of request in database to 'printing'
11) tcp server finishes, closes the socket, changes status of the request to 'complete'
