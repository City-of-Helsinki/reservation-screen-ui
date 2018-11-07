# Oodi reservation screens

On-screen reservation client built for Helsingin Kaupunki. This app is used on small screens on libraries and other public spaces. It tells current reservation status and allow people to do reservation on the fly.

App uses Respa API:  
https://dev.hel.fi/apis/respa/

To open the app you need to provide the resource id as GET parameter:  
`http://localhost/?resourceId=avtzqtz3bsca`

## Installation

Run `npm install`

## Development

Run `npm start`

## Testing

Unit tests are written for core selectors. They have some business logic. If you ever need to change these selectors please make sure tests pass.

Tests can be found on:  
`app/containers/HomePage/tests`

Tests uses mock API content.

To run tests: `env TZ='Europe/Helsinki' npm run test:watch`

You will need to define timezone to make tests pass.

## Requirements

- Node 8

## Using docker

If you don't want to install node you can run it inside Docker:
`docker run -it --network host -w /app -v $(pwd):/app -e HOST=0.0.0.0 -e PORT=80 node:8.11.4-jessie npm start`

## Debugging

You can override current time with url parameter:
`http://127.0.0.1/?date=2018-09-17T11:15:00+03:00`

You can also load local json-files:
`http://127.0.0.1/?resourceId=resources.json`

These file are located in `server/api`.

Or both:
`http://127.0.0.1/?date=2018-09-17T11:15:00+03:00&resourceId=resources.json`

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
