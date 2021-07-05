# To Do List (MERN Re-write)

This is a re-write of my To Do List application (located at [To Do List - Github](https://github.com/alihamzamohammed/TodoList))  
The backend API is built with Express.js and Mongoose, with data storage in MongoDB.  
The frontend is built in React, and is an almost identical replica of the original frontend.

This project is currently a Work In Progress (currently testing). However, the backend API and frontend is completely working. The repository can be cloned, and the dev branch compiles.

## Requirements

For development and compiling, you will need nodejs and node package manager (npm) installed on your system.

### MongoDB

Ensure MongoDB is installed on your system, and is accessible from other applications.  
Configuration for this will come in the future.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

  This process will be identical for other Linux distributions with package managers, substitute `apt` with your OS' package manager.

- #### Other Operating Systems

  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

### Other Dependencies

This project depends on:

- Express.js
- React
- Mongoose
- Cors
- Jest

All required dependeinces can be installed by running `npm install`.

## Getting Started

Download the latest release from Github packages, if one exists.  
To compile yourself:

1. Clone repository
2. Run `npm install` to install all required dependencies
3. Run `npm run build` to get a working static copy of the frontend. `npm start` does not need to be used, as Express.js handles serving the frontend from the `public` directory.  
   `npm start` can be used to start the React live server, for development.
4. The full server can be started by running `node server.js`, this connects to MongoDB, and simultaneously serves the backend and frontend routes.

Currently, the listening port for the Express.js server can be changed in `server.js`. A better solution will be added shortly. These settings are most likely to be placed in `settings.ini`, or an alternative configuration file.  
Full unit and integration tests will also be created for the backend and frontend, as well as UI tests in Selenium.  
This project contains a WSGI server-compatible executable in `bin/`, for use with production-grade web servers.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Authors

- **Ali Hamza Mohammed** - _All of it_ - [alihamzamohammed](https://github.com/alihamzamohammed)
