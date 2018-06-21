import nodemailer from 'nodemailer';

const env = require('../../config/index');

function setup() {
    return nodemailer.createTransport({
        host: env.EMAIL.HOST,
        port: env.EMAIL.PORT,
        auth: {
            user: env.EMAIL.USER,
            pass: env.EMAIL.PASS
        }
    });
}

export function sendResetPasswordEmail(user) {
    const transport = setup();
    const email = {
        from: '"Boilerplate" <info@boilerplate.com.au>',
        to: user.email,
        subject: 'Reset Your Password',
        text: `
        To reset your password, visit the link below.
        
        ${user.generateResetPasswordLink()}
        `
    };
    transport.sendMail(email);
}
