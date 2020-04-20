# Server Back-End

The server back-end for this project is an express.js web server running on node.js. The server uses a mongoDB database, and uses mongoose to interface with the database.

The entry point to the back-end server is the `index.js` file. All mongoose models are stored in the `/models` directory. Routes are stored in the `/routes` directory and are then placed in a similar folder sturcture as they will be accessed. For example: routes that are found after the `/api/` route are stored in the `/api` directory.

## Routes

- `/`: This is the home route and should bring you to the home page of the webapp.
  - `api/`: This route servers publicly accessable REST APIs.
    - `sample/`: A sample REST API. Lets you access, post, change and delete data of the Sample model.

## Models

- **Sample**: Has a name(String, required), a message(String, required), and a date(Date, defualt: Time the sample was created).
