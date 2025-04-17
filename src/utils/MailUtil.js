const mailer = require('nodemailer')

const sendingMail = async (to, subject, text) => {

    const transporter = mailer.createTransport({
        service: "gmail",
        auth: {
            user: "abhaykhunt36@gmail.com",
            pass: "pqag bbsz sqsv dyyu"
        }
    })
    
    const mailOptions = {
        from: "abhaykhunt36@gmail.com",
        to: to,
        subject: subject,
        // text: text,
        html:text
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse

}

module.exports  = {
    sendingMail
}

// sendingMail("abhaykhunt2000@gmail.com","test mail","this is test mail")
