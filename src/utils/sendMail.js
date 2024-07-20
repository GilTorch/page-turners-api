const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'infotorch2014@gmail.com', 
    pass: process.env.GMAIL_APP_PASSWORD
  }
});


const generateHtml = (message) => {

    return `
  <h1>OTP VERIFICATION CODE</h2>
  <p>${message}</p>
  `
}

// async..await is not allowed in global scope, must use a wrapper
 function sendEmail({ from, to, subject, text}) {
  // send mail with defined transport object
      return  transporter.sendMail({
        from: from || 'Page Turner 📖 <infotorch2014@gmail.com>', // sender address
        // to: "bar@example.com, baz@example.com", // list of receivers
        to: to || 'infotorch2014@gmail.com',
        subject: subject || "OTP Verification Code ✔", // Subject line
        text,
        html: generateHtml(text)
      });
  
}

module.exports = sendEmail