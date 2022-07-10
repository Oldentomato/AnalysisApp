const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const data = require('./routes/get_data')

const app = express();
const port = 3000;

app.listen(port, ()=>{
    console.log("Server running on port",port);
});

app.set('views',path.join(__dirname,'views'));
app.set("view engine","ejs");
app.engine("html",require("ejs").renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api",data);