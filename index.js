
const express= require('express')
const mongoose = require('mongoose')
const routes= require('./routes')

//Conectar Mongo
mongoose.Promise= global.Promise;
mongoose.connect('mongodb://localhost/restapis',{
    // useNewUrlParser:true
})
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',routes())

app.listen(5000);