# E Voting is an simple Ethereum DAPP

This E Voting system client is made using ReactJs and backend is made using Solidity having proper test written.

## Features
The account used to deploy the contract will be the admin account. 

- Add multiple teams standing for vote having fields (Team Name, Representative and Team description).
- User can login to his/her account using metamask and register for voting. User must provide first name, last name, email, UIDAI, date of birth (18 or above).
- User must be verified by the admin to give vote.
- After verification user is eligible to give vote to a team.
- After that user can see the result. 


## Dependency
- Node Js
- Truffle
First install [Node Js](https://nodejs.org/en/). As we use truffle so must have to install the truffle as a global or local dependency using npm 

    npm i truffle


## Test the contract
    
    truffle test

## Setup (For development)

### Deploy the smart contract in the ganache or the truffle

The truffle configure file configured as deploying the contract to ganache by changing that you can deploy it to truffle

    truffle develop

it will open a truffle console, then type

    migrate --reset

### React Client

Install all the dependency for react 

    npm install

To start the react development server

    npm start

Then go to http:localhost:3000 and enjoy 🥳.