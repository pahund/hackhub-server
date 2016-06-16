# hackhub-server

Backend server for HackHub, website for the eBay Classifieds Group TechHack Berlin 2016.

Provides a REST API that is used by [hackhub-client](https://github.com/pahund/hackhub-client)
to display the hackathon leaderboards.

## Requirements

* [Node.js](https://nodejs.org/), at least version 6.2.0
* [MongoDB](http://www.mongodb.com/), at least version 3.2.0, running locally on port 27017

## Database Setup

Create a database named `hackhub` on your MongoDB server and import the data from the 
[data](data) folder with these commands:

```
mongoimport --db hackhub --collection achievements --jsonArray --file data/achievements.json
mongoimport --db hackhub --collection hackers --jsonArray --file data/hackers.json
mongoimport --db hackhub --collection teams --jsonArray --file data/teams.json
mongoimport --db hackhub --collection topics --jsonArray --file data/topics.json
mongoimport --db hackhub --collection scheduleitems --jsonArray --file data/scheduleItems.json
```

## Installation

Install the software with npm:

```
npm install
```

After installation, you need to create a file `credentials.json` in the project root dir that
is used for authentication of API requests with write usecases.

To create the file, run the `createCredentials` script like so:

```
node createCredentials.js
```

Copy the credentials shown on the console, you need this for authenticating your requests.

## Running in Production

Spawn a [pm2](http://pm2.keymetrics.io/) process named “HackHub”:

```
npm start
```

Restart the process:

```
npm run restart
```

Stop the process:

```
npm run stop
```

Delete the process:

```
npm run delete
```

Tail the log file:

```
npm run logs
```

Log files are located in the `logs` directory below the project root.

*Note:* If Ingo's server says “npm command not found”, do this: 

```
nvm use 6.2.1
```

## Running in Local Dev Mode

This starts the server with [nodemon](http://nodemon.io/) and restarts automatically when source code is changed:

```
npm run watch
```

## API

* `GET /api` – pings the server for a sign of life
* `GET /api/all` – returns all data for initial setup of the client
* `GET /api/schedule` – returns array of schedule items
* `GET /api/update` – returns updated scores for teams
* `PUT /api/bump/:slackChannel` – increases score of team with `:slackChannel` by 1 (with authentication)
* `PUT /api/award/:codeName/:slackChannel` – awards the achievement with `:codeName` to team with 
  `:slackChannel` (with authentication)


