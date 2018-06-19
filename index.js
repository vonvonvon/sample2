'use strict'

const apiai = require('apiai')
const express = require('express')
const bodyParser = require('body-parser')

const actionHandler = require('./action-handler')
const config_const = require('./config.json') // Dialogflow constants

const app = express()
const apiaiFulfillment = apiai(process.env.API_AI_CLIENT_ACCESS_TOKEN 
    || config_const.API_AI_CLIENT_ACCESS_TOKEN)

app.set('port', process.env.PORT || 3001);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/webhook', (req, res) => {
    let data = req.body
    if (data.status.code === 200) {
        console.log(`\n\n------------------- NEW LOG -------------------\n`)
        actionHandler.handleRequest(res, data)
    }
})

app.listen(app.get('port'), () => {
    console.log(`listening on port`, app.get('port'))
})