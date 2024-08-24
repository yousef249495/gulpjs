// server.js
const StaticServer = require('static-server');
const server = new StaticServer({
    rootPath: './dist/',  // required, the root of the server file tree
    port: 200
});

function startServer() {
    return new Promise((resolve, reject) => {
        server.start(function () {
            console.log('Server listening to', server.port);
            resolve(); // Resolve the promise once the server starts
        });
    });
}

module.exports = startServer;