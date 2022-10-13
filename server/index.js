require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const fileUpload = require('express-fileupload');


const router = require('./routes/index')


const PORT = process.env.PORT || 8080;

const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));

app.use('/api', router);

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://hacker:ASqx49P_PgtQ7J2@cluster0.mqe3npb.mongodb.net/?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`server is running on ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();
