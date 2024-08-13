const http = require('http'); // Import Node.js core module

const server = http.createServer(function (req, res) {  // create web server
    // check the URL of the current request
    if (req.url == '/') {
        // set response header
        res.writeHead(200, { 'Content-Type': 'text/html' });
        // set response content
        res.write('<html><body><p>This is home Page.</p></body></html>');
        res.end();
    }
    else if (req.url == "/student") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>This is student Page.</p></body></html>');
        res.end();
    }
    else if (req.url == "/admin") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>This is admin Page.</p></body></html>');
        res.end();
    }
    else if (req.url == "/data") {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ message: "Hello World JSON" }));
        res.end();
    }
    else {
        res.end('Invalid Request!');
    }
});

server.listen(8900); //6 - listen for any incoming requests
console.log('Node.js web server at port 8900 is running..');
