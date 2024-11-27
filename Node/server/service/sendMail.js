const nodemailer = require("nodemailer");
const { errorMonitor } = require("nodemailer/lib/xoauth2");
require("dotenv").config();

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

const sandMail = async (to, subject, form) => {
    let mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        html: html,
    };
    await transport.sendMail(mailOptions, (err, result) => {
        if (err) {
            console.log("Error sending email", err);
        } else {
            console.log("Email sent successfully", result);
        }
    });
}

module.exports = sandMail;