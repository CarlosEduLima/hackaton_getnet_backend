const transporter = require('../config/mailer');

const sendEmail = (destiny, origin, subject, html) => {
    transporter.sendMail({
        to: destiny,
        from: origin,
        subject: subject,
        html: html
    }, (err) => {
        if (err)
            return res.status(400).send({ error: 'cannot send forgot password' });
        return res.send();
    });
}

module.exports = sendEmail;