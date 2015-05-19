# hapi-mongo-restful-service
This is just an example with the only the purpose of demoing an rest service created using Hapi framework and Mongodb.

The service has only one endpoint, /users, that accept the following payload structure: 

```json
{
  "users": [{
    "name": "Luca",
    "surname": "Di Vincenzo",
    "email": "luca.dv@gmail.com",
    "city": "Dallas",
    "state": "Texas",
    "password": "verysecure"
  }]
}
```

The endpoint will accept POST requests with a valid payload on the address http://localhost:8010/users

### Prerequisites 
You should have nodejs v0.10.32 or above installed, plus mongodb v2.6 or above. 

### Download dependencies
npm install 

### Run the server
node service

### Run tests
./node_modules/.bin/lab -v
make cov if you're on unix will give you coverage
make spec if you're on unix will give a more descriptive test output