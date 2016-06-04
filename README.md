# hackhub-server

Backend server for HackHub, website for the eBay Classifieds Group TechHack Berlin 2016.

Provides a REST API that is used by [hackhub-client](https://github.com/pahund/hackhub-client)
to display the hackathon leaderboards.

## Requirements

* [Node.js](https://nodejs.org/), at least version 6.2.0
* [MongoDB](http://www.mongodb.com/), at least version 3.2.0, running locally on port 27017

## Installation

```
npm install
```

## Running in Production

```
npm start
```

## Running in local dev mode

```
npm run watch
```

## API

* `GET /api` – pings the server for a sign of life
* `GET /api/all` – returns all data for initial setup of the client
* `GET /api/update` – returns updated ranks and scores for hackers and teams
* `PUT /api/award/:codeName/:userName` – awards the achievement with `:codeName` to hacker with 
  `:userName` (with authentication)


