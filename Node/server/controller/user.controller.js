const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const sandMail = require('../service/sendMail');
const otps = new Map();

const Signup = async (req, res) => {

    let { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }
        else {
            let hash = await bcrypt.hash(password, 10);
            req.body.password = hash;
            let user = await User.create(req.body);
            let data = {
                email: user.email,
                id: user.id,
                role: user.role,
                username: user.username,
                isActive: user.isActive,
            }
            let token = await jwt.sign(data, 'private-key');

            let otp = Math.round(Math.random * 10000);
            console.log(otp);

            otps.set(email, otp);
            console.log(otps);

            let html = `<div> 
                <h1>Hello ${user.username}</h1>
                <a href=localhost:8090/user/verify/${token}/${otp}> verify</a>
            </div>`;
            console.log(`<a href=localhost:8090/user/verify/${token}/${otp}> verify</a>
            </div>`);

            try {
                await sandMail(email, "verify", html);
            } catch (error) {
                return res.status(400).json({ message: error.message });
            }

            return res.status(201).json({
                msg: 'user Created',
                token: token,
                isVerified: user.isVerified,
            });
        }
    } catch (error) {
        res.status(500).json({ msg: "err", error: error.message });
    }
};


const Login = async (req, res) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ msg: "User not found" });
    }

    let match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ msg: "Invalid Pasword" });
    }
    let data = {
        email: user.email,
        id: user.id,
        role: user.role,
        username: user.username,
        isActive: user.isActive,
    }
    let token = await jwt.sign(data, 'private-key');
    return res.status(200).json({
        msg: 'User logged in',
        token: token,
        isVerified: user.isVerified,
        isActive: user.isActive,
    });
};

const getUser = async (req, res) => {
    let users = await User.find();
    res.status(200).json(users);
};

const deleteUser = async (req, res) => {
    let { id } = req.params;
    try {
        let user = await User.findByIdAndDelete(id);
        res.status(200).json({ msg: "user Deleted", user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "err deleting user", error });
    }
};

let verifyUser = async (req, res) => {
    let { token, otp } = req.params;
    let decode = await jwt.verify(token, 'private-key');
    if (!decode) {
        return res.status(403).json({ msg: "err" });
    }
    let oldOtp = otps.get(decode.email)

    if (otp == oldOtp) {
        let data = await User.findByIdAndUpdate(decode.id, { isVerified: true }, { new: true });
        res.status(200).json({ msg: "User Verified", data });
    }
    else {
        res.status(403).json({ msg: "Invalid OTP" });
    }
};

const getAdmins = async (req, res) => {
    try {
        let data = await User.find({ role: "ADMIN" });
        res.send(202).json(data);
    } catch (error) {
        res.send(404).json({ err: error.message });
    }
};

// verify admin by superadmin
const verifyAdmin = async (req, res) => {
    let { adminId } = req.params;
    try {
        let user = await User.findByIdAndUpdate(adminId, { isAdmin: true }, { new: true });
        try {
            await sendMail(user.email, "account approvel", "<h1>account approved</h1>");
        } catch (error) {
            console.log(error.message);
        }
        res.status(200).json({ msg: "User verified as admin", user });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

module.exports = { Signup, Login, getUser, deleteUser, verifyUser, getAdmins, verifyAdmin };