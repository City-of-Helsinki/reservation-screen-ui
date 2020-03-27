# Oodi reservation screens

On-screen reservation client built for Helsingin Kaupunki. This app is used on small screens on libraries and other public spaces. It tells current reservation status and allow people to do reservation on the fly.

App uses Respa API:  
`https://dev.hel.fi/apis/respa/`

To open the app you need to provide the resource id and token as GET parameter:  
`http://localhost/?resourceId=avtzqtz3bsca&token=qwertyuiop`

This is the real meeting room at Oodi:  
`http://localhost/?resourceId=av5k4vxjxyha&token=qwertyuiop`

## Version management

This project has two repos. One Evermade's internal and one public:
https://github.com/City-of-Helsinki/reservation-screen-ui

## Deployment

When pushed to master branch on BitBucket the project is automatically build by Pipelines. Manual trigger is required to deploy the project to S3.

## Installation

Run `npm install`

## Development

Run `npm start`

## Developing with staging environment

Respa staging API is used for staging requests:  
`https://api.hel.fi/respa-test/v1/`

To test against staging environment use staging=true parameter:  
`http://localhost/?resourceId=avtzqtz3bsca&token=qwertyuiop&staging=true`

## Developing with local files

The easiest and the most convenient way of developing is to use local json-files to mock API responses. Check `server/api` folder for examples. You can easily alter and modify json-files and test different scenarios.

To test with local files use json filename as resourceId. Filename is automatically detected and data is loaded from local endpoint instead of the real API. Example:  
`http://localhost/?token=qwertyuiop&resourceId=resources.json`

## Debugging: override current date

To make testing easier it's possible to override the current time. That's handy when working with mock API responses. You can override current time with date-parameter:  
`http://localhost/?token=qwertyuiop&date=2018-09-17T11:15:00+03:00`

## Unit testing

Unit tests are written for core selectors. They have some business logic. If you ever need to change these selectors please make sure tests pass.

Tests can be found on:  
`app/containers/HomePage/tests`

Tests uses mock API content.

To run tests: `env TZ='Europe/Helsinki' npm run test:watch`

You will need to define timezone to make tests pass.

## Using docker

If you don't want to install node you can run it inside Docker:
`docker run -it --network host -w /app -v $(pwd):/app -e HOST=0.0.0.0 -e PORT=80 node:8.11.4-jessie npm start`

## Requirements

- Node 12

## Technology stack

This app is built on top of React Boilerplate 3.6.0. Key tools & libraries:

Core

- React
- React Router
- Redux
- Redux Saga
- Reselect
- ImmutableJS
- Styled Components

Unit Testing

- Jest
- Enzyme

Linting

- ESLint
- Prettier
- stylelint
