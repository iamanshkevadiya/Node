const { Router } = require('express');
const { getUser, Signup, Login, deleteUser, verifyUser, getAdmins, verifyAdmin } = require('../controller/user.controller');
const decode = require('../middleware/decodeJwt');
const { isSuperAdmin } = require('../middleware/admin');

const userRouter = Router();

userRouter.get("/", getUser);
userRouter.post("/signup", Signup);
userRouter.post("/login", Login);
userRouter.delete("/:id", decode, isSuperAdmin, deleteUser);
userRouter.get("/verify/:token/:otp", verifyUser);
userRouter.get("/all-admin", decode, isSuperAdmin, getAdmins);
userRouter.patch("/verifyadmin/:adminId", decode, isSuperAdmin, verifyAdmin);

module.exports = { userRouter };