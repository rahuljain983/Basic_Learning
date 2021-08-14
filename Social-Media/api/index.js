const express = require('express');

const app = express();

const mongoose = require('mongoose');
const helmet = require('helmet');
const dotenv = require('dotenv');
const morgan = require('morgan');


const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

// Connecting the APP to Mongo
mongoose.connect(process.env.MONGO_URL);
mongoose.connection
        .once('open', () => console.log('success'))
        .on('error', () => console.log('error'));


// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Defining Routes
app.use("/api/users" , userRoute);
app.use("/api/auth",  authRoute);
app.use("/api/posts", postRoute);

// Starting the APP
app.listen(8800, () => {
    console.log('Hello world');
});