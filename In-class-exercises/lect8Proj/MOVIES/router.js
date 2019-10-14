const httpStatus = require('http-status-codes'),
    contentType = require('./contentTypes'),
    utils = require('./utils');

    const routes = {
        GET: {},
        Post: {}
    };

    exports.handel = (req, res) => {
        try {
            routes[req.method][req.url](req, res);
        } catch (e) {
            res.writeHead(httpStatus.OK, contentType.html);
            utils.getFile("views/error.html", res);
        }
    };

    exports.get = (url, action) => {
        routes["GET"][url] = action;
    };

    exports.Post = (url, action) => {
        routes["Post"][url] = action;
    };