
// Import useful libraries.
// Our web application isn't so robust as to necessitate an express server.
const http = require('http');
// fs, file system, for reading files.
const fs   = require ('fs');
// For simplifying paths.
const url  = require ('url');
// There's no place like 127.0.0.1. There's no place like 127.0.0.1.
const hostname = '127.0.0.1';
// This port is chosen arbitrarily. Just point your browser to the same port.
const port = 3000;

// Create a web server with a few routes.
var server = http.createServer(function(request, response) {
    // path is the far right of the URL from the browser address bar.
    var path = url.parse(request.url).pathname;
    switch (path) {
        // For when users forget to append stepDad.html.
        case '/':
            response.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            response.write("Try appending stepDad.html to the url.");
            response.end();
            break;
        // Serve up stepDad.
        case '/stepDad.html':
            fs.readFile(__dirname + path, function(error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write(error);
                    response.end();
                } else {
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    response.write(data);
                    response.end();
                }
            });
            break;
        // Send users the actual curveParser.
        case '/curveParser.html':
            fs.readFile(__dirname + path, function(error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write(error);
                    response.end();
                } else {
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    response.write(data);
                    response.end();
                }
            });
            break;
        // paintBrush is necessary from drawing.
        // Feel free to show the HTML element and use a different image.
        case '/paintBrush.png':
            fs.readFile(__dirname + path, function(error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write(error);
                    response.end();
                } else {
                    response.writeHead(200, {
                        'Content-Type': 'image/png'
                    });
                    response.write(data);
                    response.end();
                }
            });
            break;
        // Shakka
        case '/favicon.ico':
            fs.readFile(__dirname + path, function(error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write(error);
                    response.end();
                } else {
                    response.writeHead(200, {
                        'Content-Type': 'image/x-icon'
                    });
                    response.write(data);
                    response.end();
                }
            });
            break;
        // In case someone types something wack into their browser address bar.
        default:
            response.writeHead(404);
            response.write("oops, not much here - 404");
            response.end();
            break;
    }
});

// Launch the server.
server.listen(port, hostname, () => {
  // Post a clue to the command line that it's working.
  console.log(`Server running at http://${hostname}:${port}/`);
});





