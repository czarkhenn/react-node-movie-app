# React Node Movie App ✨

A simple movie list viewer that that fetches data from omdb api. Supports searching for movie titles and viewing movie details.

### Tech Stack
- TypeScript
- React
- Node
- Express

## Local Development

### Pre requisites
- Docker

### Running Locally


#### Setup Environment Variables

Copy the contents of `.env.dev` file
```
[react-node-movie-app] touch .env && cp .env.dev .env
```

`Set your OMDB_API_KEY`
Get OMDB API Key [Here](https://www.omdbapi.com/apikey.aspx)

#### Building the app
```
[react-node-movie-app] make build
```

#### Running the app
```
[react-node-movie-app] make start
```

## Frontend
`localhost:3000`

## Backend
`localhost:5000`

#### Checking logs for frontend and backend
```
[react-node-movie-app] make logs-back
```

```
[react-node-movie-app] make logs-front
```

#### Restarting containers
```
[react-node-movie-app] make restart
```
