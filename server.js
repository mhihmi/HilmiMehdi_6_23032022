const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Here is the server Response !');
});

server.listen(process.env.PORT || 3000);