const express = require('express');
app = express();
port = 3000;

// Middleware function with logging request path
app.use((req, res, next) => {
    console.log(`request is made too: ${req.url}`);
    next();
});

app.get("/contact", (req, res) => {
    res.send('Contact Page');
});

// Set up GET Route for default Page
app.get("/", (req, res) => {
// Issue response from the server to the client with res.send
    res.send('Hello World!ll');
});

// Handling request through express POST Method
app.post('/movies', (req, res) => {
    res.send("Posted Succesfully");
});

// Route to get URL parameters
app.post("/movies/:name/:year", (req, res) => {
    let movie = req.params;
    console.log(`Posted movie name: ${movie.name}, year:${movie.year}`);
    res.send(req.params);
});

// set application to listen to port
app.listen(port, () => {
    console.log(`The server is running on ${port}`);
});