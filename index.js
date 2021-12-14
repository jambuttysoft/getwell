const express = require('express');

require('dotenv').config();

// import sequelize from './db.js';

const router = require('./router.js');

const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api', router);
app.use(express.static('public'));


const start = async () => {
    try {
        // await sequelize.authenticate();
        // await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
    } catch (e) {
        console.log('Error server', e);
    }
}

start();

