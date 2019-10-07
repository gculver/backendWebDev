
// Defining Required Modules for application
const http = require('http'), 
    port = 3000,
    httpStatus = require('http-status-codes'),
    fs = require("fs");

// Error Response Code
    const errorResponse = res => {
        res.writeHead(httpStatus.NOT_FOUND, { "Content-Type": "text/html" });
        res.write("<h1> 404 File Not Found!</h1>");
        res.end();
    };

// Creating a server that serves as router for specific page requests of proposed application.
app = http.createServer((req, res) => {
    let url = req.url;
    
    if ( url.indexOf(".html") !== -1) {
        res.writeHead(httpStatus.OK, {
            "Content-Type": "text/html"
        });
        customReadFile(`./views${url}`, res);

    } else {
        errorResponse(res);
    }
}).listen(port);

// Utilizing File System module to ensure proper page is displayed.
const customReadFile = ( file_path, res ) => {
    if(fs.existsSync(file_path)) {
        fs.readFile(file_path, (error, data) => {
            if(error) {
                console.log(error);
                errorResponse(res);
                return;
            }
            res.write(data);
            res.end();
        })
    } else {
        errorResponsee(res);
    }
}



