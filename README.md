# Oodi reservation screens

On-screen reservation client built for Helsingin Kaupunki. This app is used on small screens on libraries and other public spaces. It tells current reservation status and allow people to do reservation on the fly.

App uses Respa API:  
https://dev.hel.fi/apis/respa/

## Installation

Run `npm install`

## Development

Run `npm start`

## Requirements

- Node 8

## Using docker

If you don't want to install node you can run it inside Docker:
`docker run -it --network host -w /app -v $(pwd):/app -e HOST=0.0.0.0 -e PORT=80 node:8.11.4-jessie npm start`

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
