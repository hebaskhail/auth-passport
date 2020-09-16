const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose')
const dotenv = require('dotenv').config();
const passport = require("passport");

var app = express();


//Connect to DB
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true , useUnifiedTopology : true })
.then(console.log("Connected to DB "))
.catch(err => console.log(err)) 


//Import Routes
var indexRouter = require('./routes/index');
var localRouter = require('./routes/routes')
var profileRouter = require('./routes/profile')

//set up view engine  
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());


//Routes Middleware
app.use('/', indexRouter);
app.use('/', localRouter);
app.use('/', profileRouter);



module.exports = app;




