const express = require('express');
const config = require('./config/db');

const app = express();
const port = 3000;



app.get("/",(req,res) => {
    res.send("Hello world");
})

let server = app.listen(8081,() => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server listenning on host: ${host}, port: ${port}`);
});