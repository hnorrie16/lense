/**
 * File for sending an email to the newly registered staff member
*/

module.exports = {
    //Semds email with magic link to newly registered staff's email address
    //Uses nodemailer service to send the email from a gmail account
    send_email: function (messageContent, email_address) {
        const nodemailer = require('nodemailer'); //dependency - nodemailer library

        //Sets up email service, creates transport
        //Sets up credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'visionstaffmanagement@gmail.com',
                pass: process.env.EMAIL_PASSWORD //passwrod retrieved from environmental variables
            }
        });

        //Email config
        const mailOptions = {
            from: 'visionstaffmanagement@gmail.com',
            //to: `justindorman6@gmail.com, zbresler16@gmail.com`,
            to: email_address,
            subject: 'Registration to Sleep Science System',
            text: messageContent
        };

        //Sends email
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(error)
                } else {
                    resolve('Email sent: ' + info.response)
                }
            })
        });
    }
}
