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

export function sendConfirmationEmail(user) {
    const transport = setup();
    const email = {
        from: '"Boilerplate" <info@boilerplate.com.au>',
        to: user.email,
        subject: 'Confirm your Email',
        text: `
        Welcome to Boilerplate. Please, confirm your email.
        
        ${user.generateConfirmationUrl()}
        `
    };
    transport.sendMail(email);
}
