const express = require('express');
const app = express();
const port = 8080;

const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const users = require('./router/Users');
const publications = require('./router/Publications');


app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect(config.database, config.options);
    app.use('/users', users);
    app.use('/publications', publications);
    app.listen(port)
};

run().catch(e => {
    console.error(e)
});