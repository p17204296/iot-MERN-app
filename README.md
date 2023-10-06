# IOT-MERN-app

MongoDB, Express, React, NodeJS

## Objectives

The goal is to build a full stack application consisting of two pages, Industries and IoT devices. The Requirements of this app are:

Industries Page:
UI application should be able to support:

- Listing the supported industries. (Search and ordering features are optional)
- Management endpoints to create, update and delete industries.
- The must have entities to define a new industry:
- Unique identifier number that increases automatically (required)
- Industry name (required)

IoT Devices Page:
The application should be able to support:

- Listing all the devices and be able to filter by industry. (Search and ordering features are optional)
- Management endpoints to create, update and delete devices.
- The must have entities to define a new device is:
- Unique identifier that is increased automatically (required)
- Device name (required)
- Warehouse addition time (required)
- Fee of the device (required, min: 0)
- Linked industry (required, select from list of industries created)

## Set up Back-End Server

- Install nodeJS

- cd into server directory: `cd .\server\`

### Set up Environment Variables for server

- Rename the .env.example file to `.env` in here is where we store the PORT the MONGO_URI for the database TEST_MONGO_URI the test database

- To install the server end dependencies enter: `npm install`

**To Run Backend Server**
Enter in terminal `npm run dev`

- Should be running on Port 8000 (http://localhost:8000)

**To Run Tests**
Enter in terminal `npm run test`

- This will run the unit and integration tests
- The coverage report is available in coverage directory in `index.html` under server

## Set up Front-End Client

- cd out of backend and cd into frontend client directory: `cd ..\client\`

### Set up Environment Variables for client

- Rename the .env.example file to `.env` in here is where we store the `REACT_APP_API_URL` which is the server (backend) URL

  > **Note**: If you come across problems in powershell enter this command in terminal `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned`

- To install the front end dependencies enter: `npm install`

**To Run Client Server**
Enter in terminal `npm start`

- Should be running on Port 3000 (http://localhost:3000)
