import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
const app = express();

app.set("view engine", "ejs");

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("css"));

app.get("/", (req, res) => {
    res.render("mail");
});

app.post("/email-sent", (req, res) => {
    const { name, email, message } = req.body;

    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: name,
        text: `My name is ${name} and my message is ${message}`,
        html: `My name is ${name} and my message is ${message}`,
    };

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(400).json({ messgae: "Error" });
        }
        return res.status(200).json({ messgae: "Email Sent" });
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server Started at http://localhost:${process.env.PORT}`);
});