const express = require('express')
const app = express()
const PORT = 3005;
const Sequelize = require('sequelize');
const { User } = require('./models');
const ejs = require('ejs');

app.use(express.json())
app.use(express.urlencoded())

app.use(express.static('client'))

app.get('/ping', (req, res) => {
    //res.send(JSON.stringify('pong')
    res.json('pong')
})

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
})