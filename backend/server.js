const express = require('express');
//cors is some middleware still not sure what it does. 
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
////not sure what this does
app.use(cors());
app.use(express.json());




////////CONNECTING TO MONGODB & MONGOOSE
// need to add uri to environment varibales. 
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!")
});
////////////I still need to close mongoDB somewhere...




///Router for the root path
const userRouter = require(__dirname + '/routes/users');
app.use('/', userRouter);
////

const adminRouter = require(__dirname + '/routes/admin');
app.use('/', adminRouter);

app.listen(port, () => {
    console.log(`Server is runing on port: ${port}`);
});

