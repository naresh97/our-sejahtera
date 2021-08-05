# Our Sejahtera Contact Tracing App

This app was created to serve the need for easy to use contact tracing. The app aims to collect the minimum amount of information while still having robust contact tracing.

## Usage

The app should work as such:

1. Anyone can log into the app using their Telegram account
2. They may present their QR code to be scanned by others, and they may scan other QR codes as well. These will be registered as _Contacts_
3. Users may report being tested positive with COVID19, and the app will inform all their _Contacts_

## Development

### Prerequisites

- NodeJS
- Yarn

### Building

- Use `yarn install` to install the necessary packages
- Use `yarn start` to start app in development mode in [http://localhost:3000](http://localhost:3000)
- Use `yarn build` to build an optimized app for production.

### .env

Don't forget to copy the .env.template to .env and fill in the values
