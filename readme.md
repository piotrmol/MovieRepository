# MovieFinder API

## Installation

App can be installed and run in two ways - using npm or using docker.

#### Installing with npm  

**Pre requirements:**  
Installed node v14.5.0 or highier  
**Installation:**  
Go to the root of project and type:  
```
npm install
npm start
```


#### Installing with docker:  
**Pre requirements:**  
Installed docker  
**Installation:**  
Go to the root of project and type:
```
docker build -t moviefinder:piotrmol .
docker run -it --rm -p 3000:3000 moviefinder:piotrmol
```

After installation app is running on http://localhost:3000

## API Endpoints

**Get list of movies [GET]**
```
http://localhost/3000/movie
```
Two optional query parameters can be provided:
- duration: how long the movie should be(given in minutes)
- genres: list of genres separated by comas

### Example request 
```
curl --location --request GET 'http://localhost:3000/movie?genres=Crime,Drama&duration=120' \
--header 'Accept: application/json'
```

**Save new movie [POST]**
```
http://localhost/3000:movie
```
Requires json body. Model: 
```
{
  title: string;
  year: number;
  runtime: number;
  genres: string[];
  director: string;
  actors?: string;
  plot?: string;
  posterUrl?: string;
}
```
### Example request 
```
curl --location --request POST 'http://localhost:3000/movie' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Title",
    "year": 123,
    "runtime": 1234,
    "genres": ["Comedy"],
    "director": "Xyz",
    "plot": "plot",
    "actors": "John Travolta",
    "posterUrl": "url.pl"
}'
```

**Available Genres [GET]**
```
http://localhost/3000:genres
```
### Example request 
```
curl --location --request GET 'http://localhost:3000/genres'
```