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

    router.get('/inventoryPosition', (req, res) => {
        res.writeHead(httpStatus.OK, contentType.html);
        utils.getFile("views/inventoryPosition.html");
    });

    router.get('/login', (req, res) => {
        res.writeHead(httpStatus.OK, contentType.html);
        utils.getFile("views/login.html");
    });

    router.get('/settings', (req, res) => {
        res.writeHead(httpStatus.OK, contentType.html);
        utils.getFile("views/settings.html");
    });

