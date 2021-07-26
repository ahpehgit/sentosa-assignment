# sentosa-assignment
 
## Developer Info
 - Alex Peh (ahpeh@hotmail.com)
 
## Requirements
- npm
- mongodb

## Install
- Run **npm install** to download dependencies
- Install mongodb

## Run
- create a .env file with the values:
> SERVER=http://localhost:3000
> MONGO_HOSTNAME=localhost
> TOKEN_SECRET=somesecret
- npm start
##### or with Docker installed
- create a .env file with the values:
> SERVER=http://localhost:3000
> MONGO_HOSTNAME=mongoserver
> PORT=3001
> TOKEN_SECRET=somesecret
- docker-compose build
- docker-compose up
- go to http://localhost:3000

## Test
- npm test (test using jest)

## Others
- Swagger at SERVER/api-docs/
- Cloud design at cloud folder