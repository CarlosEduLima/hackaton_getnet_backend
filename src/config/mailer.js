const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  });

  transporter.use('compile', hbs({
      viewEngine: 'handlebars',
      viewPath: path.resolve('../src/resources'),
      extName:'.html'
  }));

  module.exports = transporter;