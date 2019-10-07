const http = require('http'),
    httpStatus = require('http-status-codes'),
    port = 3000,
    router = require('./router'),
    contentType = require('./contentTypes'),
    utils = require('./utils'),
    formidable = require('formidable');

    router.get("/", (req, res) => {
        res.writeHead(httpStatus.OK, contentType.html);
        utils.getFile("views/index.html", res);
    });

    router.get('/inventoryPosition.html', (req, res) => {
        res.writeHead(httpStatus.OK, contentType.html);
        utils.getFile("views/inventoryPosition.html",res);
    });

    router.get('/login.html', (req, res) => {
        res.writeHead(httpStatus.OK, contentType.html);
        utils.getFile("views/login.html",res);
    });

    router.get('/settings.html', (req, res) => {
        res.writeHead(httpStatus.OK, contentType.html);
        utils.getFile("views/settings.html",res);
    });

    router.get('/register.html', (req, res) => {
        res.writeHead(httpStatus.OK, contentType.html);
        utils.getFile("views/register.html",res);
    });

    router.get('/programLogo.png', (req, res) => {
        res.writeHead(httpStatus.OK, contentType.png);
        utils.getFile("public/images/programLogo.png", res);
    });

    // Add registered user to DB via POST
    router.POST('/register.html', (req, res) => {
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields) => {
            res.writeHead(httpStatus.OK, contentType.html);
            res.end(console.log({fields: fields}));
            var name = (JSON.stringify(fields.name));
            var email = JSON.stringify(fields.email);
            res.end(console.log(name + " " + email));
            
        });
        return;
      });



    http.createServer(router.handle).listen(port);

    console.log(`The server is running on ${port}`);

