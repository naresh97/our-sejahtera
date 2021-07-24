# SSR Contact Tracing App

This app was created to serve the need for easy to use contact tracing. 

## Usage
The app should work as such:

1. Group/Organization leaders will be created an account on the app.
2. Upon logging in, they will see a QR code that they can display
3. Their members can scan this QR code, in order to create their own accounts. This way, there each member has a "parent" member, and all memberships can be traced.
4. Upon creating their account, new members will also have a QR Code they can display.
5. Other members can scan each other QR codes in order to register a *Contact* in the backend.
6. All *Contacts* between members can be retrievable from the backend at a later time.

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