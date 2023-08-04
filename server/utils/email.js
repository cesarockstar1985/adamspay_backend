const nodemailer = require('nodemailer');

async function sendMail(to, text, subject) {

    const config = await mailtrapConfig();

    let transporter = nodemailer.createTransport(config);

    // Email content
    let mailOptions = { from: process.env.NOREPLY_EMAIL, to, subject, text, };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.log('Error occurred: ' + error.message);
    }
}

const mailtrapConfig = async () => {
    return {
        host: process.env.MAILTRAP_HOST,
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASSWORD
        }
      }
}

module.exports = {
    sendMail
}