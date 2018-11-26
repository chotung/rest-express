'use strict'
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require('mongoose')
const app = express()

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/restapi/cities')

const dbSchema = new mongoose.Schema({
    city: String,
    location: {
        type: [Number],
        index: '2dsphere'
    },
    population: Number,
    state: String
})

const cities = mongoose.model('cities', dbSchema)

const routes = function(app) {
    app.use(bodyparser.json())
    
    app.use('/city', function(req, res, next){
        cities.find({}, function(err, data) {
            res.json(data)
        })
    })

    app.delete('/city:name', function(req, res, next) {
        cities.remove({ 
            city: req.params.name
        }, function(err){
            if(err) {
                return res.status
                .send({
                    message:'delete if failed'
                })
                res.json(req.body)
            }
        })
    })
}

const router = express.Router()
routes(router)

app.use('api/v1', router)

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is listening on port 3000")
})