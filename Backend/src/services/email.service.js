const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 465,
    secure: true,

    auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY
    }
});


const sendmail = async (to, subject, text) => {

    try {

        const mailOptions = {
            from: "onboarding@resend.dev",
            to: to,
            subject: subject,
            text: text
        };

        await transporter.sendMail(mailOptions);

        console.log("Email sent successfully");

    } catch (error) {

        console.error("Error sending email:", error);
        throw error;

    }
};


module.exports = { sendmail };