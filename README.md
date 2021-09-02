# node-booking-movies-server

1. Run by Docker on Mac M1 (other device maybe need to remove `platform: linux/x86_64" in docker-compose.yml)`:

- Change the dbConfig in `./src/models/index.js` to `const dbConfig = require("../config/config.docker");`

- To start project from Docker: `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d`

- To stop project: `docker-compose -f docker-compose.yml -f docker-compose.dev.yml down`

- To tracking what process in terminal: `docker logs node-booking-movies-server_node-app_1 -f`

2. Run by local MySQL DB

- This is default of project when clone from Github

- Make sure the dbConfig in `./src/models/index.js` to `const dbConfig = require("../config/config.mysql");`

- Config infomations in `./src/config/config.mysql.js`

- Run project as normal
