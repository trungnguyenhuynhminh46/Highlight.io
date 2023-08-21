## Highlight - Game draw and guess

## Highlight

- Highlight.io is an engaging online multiplayer drawing and guessing game that brings together players from around the world in a fun and creative virtual environment. This project is our team's effort to build a web-based game that allows drawing and guessing. In hightlight.io, players take turns being artists and guessers in each round. The game consists of a series of rounds, where one player is designated the artist and tasked with drawing a given word or phrase on the digital canvas. The challenge lies in creating a clear representation of the word while considering the limited drawing tools available. Meanwhile, other players strive to guess the word correctly based on the evolving drawing in real-time. This multiplayer game is inspired by the game gartic.io by the way.

## Format file .env

- Front End environment variables

```
VITE_REACT_API_URL=yourapiurl
VITE_REACT_SOCKET_URL=yoursocketurl
VITE_REACT_CLIENT_DEV_URL=yourlocalclienturl
VITE_REACT_CLIENT_PROD_URL=yourhostedclienturl
VITE_REACT_GOOGLE_CLIENT_ID=yourgoogleclientid
```

- Back End environment variables

```
# SERVER
PORT=server_port

# DATABASE
DATABASE_USERNAME=db_name
DATABASE_PASSWORD=db_pw
DATABASE_NAME=db_name
DATABASE_HOST=db_host
DATABASE_PORT=db_post

# SOCKET
SOCKET_PORT=socket_port

# REDIS
REDIS_HOST=redis_host
REDIS_PORT=redis_port
TIME_EXPIRED_ONE_DAY=time_expired

# JWT
JWT_ACCESSKEY=jwt_key
JWT_ACCESSKEY_EXPIRE=jwt_expire_time
JWT_REFRESHKEY=jwt_refresh_key

# GOOGLE_OAUTH
GOOGLE_CLIENT_ID=google_client_id
GOOGLE_CLIENT_SECRET=google_client_secret
```
## Screenshots
![home_screen](https://github.com/trungnguyenhuynhminh46/Highlight.io/assets/58035150/4faf8d6d-94dc-46ee-95f7-5ae35dd4c1d5)
![rooms_screen](https://github.com/trungnguyenhuynhminh46/Highlight.io/assets/58035150/bc40e413-73db-4fcf-a923-ac090039ad83)
![create_rooms_screen](https://github.com/trungnguyenhuynhminh46/Highlight.io/assets/58035150/e9b48936-76de-43f9-a3ec-21911e890861)
![create_user_theme_screen](https://github.com/trungnguyenhuynhminh46/Highlight.io/assets/58035150/88fa130a-c761-420a-a707-df7669f33f75)
![edit_user_theme_screen](https://github.com/trungnguyenhuynhminh46/Highlight.io/assets/58035150/a49db110-f8e3-4ca6-a8ed-a7bb8395ebd9)
![host_playing_screen](https://github.com/trungnguyenhuynhminh46/Highlight.io/assets/58035150/ff834253-b93c-4c5b-91d1-6fe14976f407)
![choosers_playing_screen](https://github.com/trungnguyenhuynhminh46/Highlight.io/assets/58035150/ffd610af-7cbd-4526-a49b-635185039bdc)
![drawer_playing](https://github.com/trungnguyenhuynhminh46/Highlight.io/assets/58035150/14251452-24b7-4a4b-8a29-5fe6035f2ec5)
![choosers_playing](https://github.com/trungnguyenhuynhminh46/Highlight.io/assets/58035150/86726f67-5e12-4b95-9769-fdbb18cf3449)
![drawing](https://github.com/trungnguyenhuynhminh46/Highlight.io/assets/58035150/df7026ce-0029-4817-8b21-1f445f111fd7)


## Run the project

# Frontend

```sh
cd frontend
npm i
npm run dev
```

# Backend

```sh
cd backend
docker compose up
```

Have fun!
