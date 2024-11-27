const { Router } = require('express');
const { getUser, Signup, Login, deleteUser, verifyUser, getAdmins } = require('../controller/user.controller');
const decode = require('../middleware/decodejwt');
const { isSuperAdmin } = require('../middleware/admin');

const userRouter = Router();

userRouter.get("/", getUser);
userRouter.post("/signup", Signup);
userRouter.post("/login", Login);
userRouter.delete("/delete", deleteUser);
userRouter.get("/verify/:token/:otp", verifyUser);
userRouter.get("/all-admin", decode, isSuperAdmin, getAdmins);

module.exports = { userRouter };