const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport')
const bodyParser = require('body-parser')
const scheduler = require('node-schedule');
// require('dotenv').config();

const router = require('./router/routes')
const jobs = require('./jobs/scheduler');

const app = express();

app.use(bodyParser.json())
app.use(cors())
router(app)

const server = http.createServer(app)
const port = 5000

console.log('Connecting to Local Database...');
mongoose.connect('mongodb://localhost/mod-5', { useNewUrlParser: true })

server.listen(port)
console.log(`NodeJS Server running on port ${port}.`);
