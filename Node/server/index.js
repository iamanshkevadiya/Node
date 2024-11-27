const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const { userRouter } = require('./router/user.Router');

const app = express();
app.use(cors());
app.use(express.json());

// Base router  
app.get("/", (req, res) => {
    res.status(202).json({ msg: 'Hello Node JS!' });
})
app.use('/user', userRouter);


const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
    connectDB();
});