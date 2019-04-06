const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    // get file extension
    let extname = path.extname(filePath);

    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    console.log(req.url);
    if (req.url === '/' || req.url === '/index.html') {

        fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        })
    } else if (req.url === '/gallery' || req.url === '/portfolio1.html') {

        fs.readFile(path.join(__dirname, 'portfolio1.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        })
    } else if (req.url === '/contact' || req.url === '/contact.html') {

        fs.readFile(path.join(__dirname, 'contact.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        })
    } else if (req.url.split('/')[1] === 'images') {
        let file = req.url.split('/')[2]
        fs.readFile(path.join(__dirname,  'images', file), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'content-type': contentType });
            res.end(content);
        })
    }
    else {

        fs.readFile(path.join(__dirname, '404.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        })
    }
});

const PORT = process.env.PORT || 5600;
server.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
})