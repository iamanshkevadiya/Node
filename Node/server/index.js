const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const path = require('path');

const connectDB = require('./config/db');
const { userRouter } = require('./router/user.Router');
const productRouter = require('./router/product.Router');
const { commentRouter } = require('./router/comment.Route');
const cartRoute = require('./router/cart.Route');


app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

// Base router  
app.get("/", (req, res) => {
    res.status(202).json({ msg: 'Hello Node JS!' });
})


app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/comments", commentRouter);
app.use("/cart",cartRoute);


const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
    connectDB();
});