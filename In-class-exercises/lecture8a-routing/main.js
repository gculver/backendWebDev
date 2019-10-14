// Requiring necessary Modules for application. 
const http = require('http'),
    httpStatus = require('http-status-codes')
    port = 3000,
    fs = require('fs'),
    /* app = http.createServer(),*/
    errorResponse = res => {
        res.writeHead(httpStatus.NOT_FOUND, {'Content-Type': 'text/html'});
        res.write("<h1>404 Error File Not Found</h1>");
        res.end();
    };
    /*routeMap = { "/": "views/index.html"};*/
    
    /* // Creating our responseMap for our routing aspect of application
    routeResponseMap = {
        "/":"<h1>This is the home page!</h1>",
        "/info": "<h1>This is the info page!</h1>",
        "/contact": "<h1>This is de contact page!</h1>",
        "/about": "<h1>We suck! Don't buy anything from us"
    };*/

// Using JSON stringfy to return JSON object
const getJSONString = obj => { return JSON.stringify(obj) };

    // Creating a server
    /*app.on("request", (req, res) => {
        res.writeHead(httpStatus.OK, {'Content-Type': 'text/html'});*/
        app = http.createServer((req, res) => {
            let url = req.url;
            if(url.indexOf('.html') !== -1) {
                res.writeHead(httpStatus.OK, {'Content-Type': 'text/html'});
                customReadFile(`./views${url}`, res);
            } else if(url.indexOf('.css') !== -1){
                res.writeHead(httpStatus.OK, { 'Content-Type': 'text/css'});
                customReadFile(`./public${url}`, res);
            } else if(url.indexOf('.js') !== -1) {
                res.writeHead(httpStatus.OK, {'Content-Type': 'text/js'});
                customReadFile(`./public${url}`, res);
            } else {
                errorResponse(res);
            }

        

        /*
        if(routeMap[req.url]) {
            fs.readFile(routeMap[req.url], (error, data) => {
                res.write(data);
                res.end();
            });
        } else {
            res.end("<h1>Sorry route not found!");
        }*/

        /*// Routing to the correct page
        if(routeResponseMap[req.url]) {
            res.end(routeResponseMap[req.url]);
        } else {
            res.end("<h1>This page does not exit.</h1>");
        }*/

        
        // Analyzing Data with different request methods
        console.log(`Method: ${getJSONString(req.method)}`);
        console.log(`URL: ${getJSONString(req.url)}`);
        console.log(`Headers: ${getJSONString(req.headers)}`);

        //create a response message
        /*let responseMessage = "<h1>Welcome to the new page</h1>";
        res.end(responseMessage);*/

    }).listen(port);

    console.log(`Server is running on port: ${port}!`);

    const customReadFile = (file_path, res) => {
        if(fs.existsSync(file_path)) {
            fs.readFile(file_path, (error, data) => {
                if(error) {
                    console.log(error);
                    errorResponse(res);
                    return;
                }
                res.write(data);
                res.end();
            });
        } else {
            errorResponse(res);
        }  
    };

    