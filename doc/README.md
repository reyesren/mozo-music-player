# Mozo Music Player REST API Documentation

## User Login Api

### Create

- description: User signing up for the application
- request: `POST api/users`
  - content-type: `application/json`
  - body: object
    - username: (string) the user's username
    - password: (string) the user's password
- response: 200
  - content-type: `application/json`
  - body: object
    - user: object
      - id object
        - $oid: (string) user's id
      - username (string) user's username
      - email (string) user's email
      - firstName: (string) user's first name
      - lastName: (string) user's last name
      - favourites: (array) user's list of favourited playlists
- response: 422
  - body: object
    - error: (string) error message

```bash
$ curl -X POST 
    -H "Content-Type: `application/json`" 
    -d '{"username":"user","password":"pass"} 
    http://localhost:3000/api/users'
```

- description: User signing in to the application
- request: `POST /api/login`
  - content-type: `application/json`
    - body: object
      - username: (string) the user's username
      - password: (string) the user's password
- response: 200
  - content-type: `application/json`
  - body: object
    - message: (string) You logged in successfully!
    - user: object
      - id object
        - $oid: (string) user's id
      - username (string) user's username
      - email (string) user's email
      - firstName: (string) user's first name
      - lastName: (string) user's last name
      - favourites: (array) user's list of favourited playlists
    - error: (string) either "" or error message to user

```bash
$ curl -X POST 
       -H "Content-Type: `application/json`" 
       -d '{"username":"user","password":"pass"} 
       http://localhost:3000/api/login/'
```

### Read

- description: User checking if logged in to application
- request: `GET /api/logged_in`
- response: 200
  - content-type: `application/json`
  - body: either object
    - id object
      - $oid: (string) user's id
    - username (string) user's username
    - email (string) user's email
    - firstName: (string) user's first name
    - lastName: (string) user's last name
    - favourites: (array) user's list of favourited playlists

    or (bool) false

```bash
$ curl http://localhost:3000/api/logged_in'
```

### Delete

- description: User signing out of the application
- request: `DELETE /api/logout`
- response: 200

```bash
$ curl -X DELETE http://localhost:3000/api/logout'
```

## Users Api

### Create

- description: Creating a user
- request: `POST api/users`
  - content-type: `application/json`
  - body: object
    - username: (string) the user's username
    - password: (string) the user's password
- response: 200
  - content-type: `application/json`
  - body: object
    - user: object
      - id object
        - $oid: (string) user's id
      - username (string) user's username
      - email (string) user's email
      - firstName: (string) user's first name
      - lastName: (string) user's last name
      - favourites: (array) user's list of favourited playlists
- response: 422
  - body: object
    - error: (string) error message

```bash
$ curl -X POST 
    -H "Content-Type: `application/json`" 
    -d '{"username":"user","password":"pass"} 
    http://localhost:3000/api/users'
```

### Read

- description: Get the list of favourited playlists of user with specific id
- request: `GET /api/users/favourites/:id`
- response: 200
  - content-type: `application/json`
  - body: (list of strings) list of playlist ids

```bash
$ curl http://localhost:3000/api/users/favourites/1'
```

### Update
  
- description: Adding a playlist to user's favourites
- request: `PATCH /api/user/:id/`
  - content-type: `application/json`
  - body: object
    - favourites: (list of strings) list of playlist ids that are favourited by the user  
- response: 200
  - content-type: `application/json`
  - body: object
    - id object
      - $oid: (string) user's id
    - username (string) user's username
    - email (string) user's email
    - firstName: (string) user's first name
    - lastName: (string) user's last name
    - favourites: (array) user's list of favourited playlists
  
```bash
$ curl -X PATCH 
       -H 'Content-Type: application/json'
       -d '{"favourites": ["2dw1231"]} 
       http://localhost:3000/api/users/1'
```

## Songs Api

### Create

- description: create a new song
- request: `POST /api/songs/`
  - content-type: `application/json`
  - body: object
    - songName: (string) name of the song
    - artist: (string) name of the song's artist
    - length: (string) length of the song
    - user: (string) username of the user who's library the belongs to
    - songFile: (string) link to song file on the cloud
- response: 200
  - content-type: `application/json`
  - body: object
    - _id object
      - $oid: (string) song id
    - songName: (string) name of the song
    - artist: (string) name of the song's artist
    - length: (string) length of the song
    - user: (string) username of the user who's library the belongs to
    - songFile: (string) link to song file on the cloud
    - createdAt: (string) the date the song was created
    - updatedAt: (string) the date the song was updated
- response: 406
  - content-type: `application/json`
  - body: (string) Unable to add song to library!

```bash
$ curl -X POST 
       -H "Content-Type: `application/json`" 
       -d '{"songName": "song", "artist": "john" "length": "3:54", 
            "user": "mememe", "songFile": "https://mozo.s3.amazonaws.com/song.mp3", 
            "playlists": []} 
       http://localhost:3000/api/songs/'
```

### Read

- description: retrieve all songs
- request: `GET /api/songs`
- response: 200
  - content-type: `application/json`
  - body: list of objects
    - _id object
      - $oid: (string) song id
    - songName: (string) name of the song
    - artist: (string) name of the song's artist
    - length: (string) length of the song
    - user: (string) username of the user who's library the belongs to
    - songFile: (string) link to song file on the cloud
    - createdAt: (string) the date the song was created
    - updatedAt: (string) the date the song was updated
- response: 406
  - content-type: `application/json`
  - body: (string) invalid search criteria for songs!

```bash
$ curl http://localhost:3000/api/songs
```

### Update

- description: Adding a songs name or artist
- request: `PATCH /api/songs/:id/`
  - content-type: `application/json`
  - body: object
    - songName: (string) new song name
    - artist: (string) song's new artist's name
- response: 200
  - content-type: `application/json`
  - body: (string) success
- response: 406
  - content-type: `application/json`
  - body: (string) Unable to find the song you wish to update.
  
```bash
$ curl -X PATCH 
       -H 'Content-Type: application/json'
       -d '{"artist": ["bobby"]} 
       http://localhost:3000/api/songs/1'
```

### Delete
  
- description: delete the song id
- request: `DELETE /api/songs/:id`
- response: 200
  - content-type: `application/json`
  - body: (string) success
- response: 406
  - content-type: `application/json`
  - body: (string) Could not delete song!

```bash
$ curl -X DELETE
        http://localhost:3000/api/songs/0
```

## Playlists Api

### Create

- description: create a new playlist
- request: `POST /api/playlists/`
  - content-type: `application/json`
  - body: object
    - name (string) name of playlist
    - user (string) username of user who owns the playlist
    - access (string) either "public" or "private"
    - description (string) playlist description
    - num_views (int) number of views for a playlist
    - songs (list of strings) list of song ids
    - favourited_by (list of strings) list of user ids
- response: 200
  - content-type: `application/json`
  - body: object
    - _id object
      - $oid: (string) playlist id
    - name (string) name of playlist
    - user (string) username of user who owns the playlist
    - access (string) either "public" or "private"
    - description (string) playlist description
    - num_views (int) number of views for a playlist
    - songs (list of objects) list of songs
      - _id (string) song id
      - songName: (string) name of the song
      - artist: (string) name of the song's artist
      - length: (string) length of the song
      - user: (string) username of the user who's library the belongs to
      - songFile: (string) link to song file on the cloud
    - favourited_by (list of strings) list of user ids
    - createdAt: (string) the date the playlist was created
    - updatedAt: (string) the date the playlist was updated

```bash
$ curl -X POST 
       -H "Content-Type: `application/json`" 
       -d '{"name": "playlist", "user": "memem" "access": "public", 
            "description": "playlist description", "num_views": 0, 
            "songs": [], favourited_by: []} 
       http://localhost:3000/api/playlists/'
```

### Read

- description: retrieve all playlists
- request: `GET /api/playlists`
- response: 200
  - content-type: `application/json`
  - body: list of objects
    - _id object
      - $oid: (string) playlist id
    - name (string) name of playlist
    - user (string) username of user who owns the playlist
    - access (string) either "public" or "private"
    - description (string) playlist description
    - num_views (int) number of views for a playlist
    - songs (list of strings) list of song ids
    - favourited_by (list of strings) list of user ids
    - createdAt: (string) the date the playlist was created
    - updatedAt: (string) the date the playlist was updated

```bash
$ curl http://localhost:3000/api/playlists
```

- description: retrieve playlist by id
- request: `GET /api/playlists/:id`
- response: 200
  - content-type: `application/json`
  - body: object
    - _id object
      - $oid: (string) playlist id
    - name (string) name of playlist
    - user (string) username of user who owns the playlist
    - access (string) either "public" or "private"
    - description (string) playlist description
    - num_views (int) number of views for a playlist
    - songs (list of strings) list of song ids
    - favourited_by (list of strings) list of user ids
    - createdAt: (string) the date the playlist was created
    - updatedAt: (string) the date the playlist was updated

```bash
$ curl http://localhost:3000/api/playlists/1
```

### Update

- description: Adding a user's id to playlists list of users who favourited it
- request: `PATCH /api/playlists/:id/`
  - content-type: `application/json`
  - body: object
    - favourited_by: (list of strings) list of users' ids who favourited the playlist
- response: 200
  - content-type: `application/json`
  - body: object
    - _id object
      - $oid: (string) playlist id
    - name (string) name of playlist
    - user (string) username of user who owns the playlist
    - access (string) either "public" or "private"
    - description (string) playlist description
    - num_views (int) number of views for a playlist
    - songs (list of strings) list of song ids
    - favourited_by (list of strings) list of user ids
    - createdAt: (string) the date the playlist was created
    - updatedAt: (string) the date the playlist was updated
  
```bash
$ curl -X PATCH 
       -H 'Content-Type: application/json'
       -d '{"favourited_by": ["2dw1231"]} 
       http://localhost:3000/api/playlists/1'
```

### Delete
  
- description: delete the playlist id
- request: `DELETE /api/playlists/:id`
- response: 200
  - content-type: `application/json`
  - body: (string) playlist was successfully deleted

```bash
$ curl -X DELETE
        http://localhost:3000/api/playlists/0
```
