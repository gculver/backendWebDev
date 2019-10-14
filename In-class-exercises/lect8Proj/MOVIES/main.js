const http = require('http'),
    httpStatus = require('http-status-codes'),
    port = 3000,
    router = require('./router'),
    contentType = require('./contentTypes'),
    utils = require('./utils');

    router.get("/", (req, res) => {
        res.writeHead(httpStatus.OK, contentType.html);
        utils.getFile("views/index.html", res);
    });
    router.get('/contact.html', (req, res) => {
        res.writeHead(httpStatus.OK, contentType.html);
        utils.getFile("views/contact.html", res);
    });
    router.get('/movies.html', (req, res) => {
        res.writeHead(httpStatus.OK, contentType.html);
        utils.getFile("views/movies.html", res);
    });

    router.get("/batman.jpg", (req, res) => {
        res.writeHead(httpStatus.OK, contentType.jpg);
        utils.getFile('public/images/batman.jpg', res);
    });

    router.get("/joker.jpg", (req, res) => {
        res.writeHead(httpStatus.OK, contentType.jpg);
        utils.getFile('public/images/joker.jpg', res);
    });

    router.get("/superman.jpg", (req, res) => {
        res.writeHead(httpStatus.OK, contentType.jpg);
        utils.getFile('public/images/superman.jpg', res);
    });

    http.createServer(router.handel).listen(port);

    console.log(`The server is running on ${port}`);