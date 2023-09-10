
## How to run
1. Run `npm i`
2. Copy `.env.sample` and create `.env` at root folder
3. Run `npm run start:dev`

## Below is my thought process

### Modularization
I am using nestjs that works as spring boot framework but for typescript. This framework supports injecting dependencies.

### Logging
I am using Logger module from nestjs to intercept all http request and response. CorrelationId is added as well for tracing purpose in a distributed environment.

### Error Handling
All error is captured and logged then throw back to the root module to be handled automatically by nestjs as a 500 response

### Functionality
GET
Paste in browser url
`http://localhost:3000/api/v1/vehicles/1234/battery`
`http://localhost:3000/api/v1/vehicles/1234/fuel`

POST
Open web developer console and paste below code
fetch('http://localhost:3000/api/v1/vehicles/1234/engine', { method: 'POST', body: JSON.stringify({action: 'START'}), headers: { 'content-type': 'application/json' } })

### Code Style and Quality
Eslint


### Testing
Did not have time to work on this but well ..... Just unit test and integration test. Automation test is a different beast

### Documentation
Did not have time
