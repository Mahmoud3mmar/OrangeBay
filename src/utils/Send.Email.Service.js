import nodemailer from 'nodemailer';

const sendEmailService = async (
    {
        to = '',
        subject = 'No Reply',
        message = '<h1>No Reply</h1>',
        attachments = []
    }
)=> {
    const transporter = nodemailer.createTransport({
        host:process.env.NodeMailer_HOST ,
        port: 587,
        auth: {
            user: process.env.NodeMailer_USER,
            pass:  process.env.NodeMailer_PW
        }
    });
    const info = await transporter.sendMail({
        from: "OrangeBay <" + process.env.NodeMailer_USER + ">", // sender address
        to,
        subject,
        html: message, // html body
        attachments
    })
    return info.accepted.length ? true : false
}

export default sendEmailService