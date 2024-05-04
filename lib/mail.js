import { getUserEmail } from "@/data/user";
const nodemailer = require('nodemailer');

const domain = process.env.PUBLIC_APP_URL;
const SMPTP_EMAIL = process.env.SMTP_EMAIL;
const SMPTP_PASSWORD = process.env.SMTP_PASSWORD;

export const sendVerificationEmail = async (email, token) => {   
    try{
        const user = await getUserEmail(email);
        const { firstName } = user;

        const confirmLink = `${domain}/auth/new-verification?token=${token}`;

        let transporter = nodemailer.createTransport({
        service: 'gmail',
            auth: {
                user: SMPTP_EMAIL, 
                pass: SMPTP_PASSWORD, 
            }
        });

        let mailOptions = {
            from: SMPTP_EMAIL,
            to: email,
            subject: 'Confirm your Email',
            html: `<p>Hi ${firstName}!,
                        <br />
                        <p>This Confirmation Link will expire in 5 minutes</p>
                        <br />
                        </p><p>Please click <a href="${confirmLink}">here</a> to confirm your email.</p>`
        };

        await transporter.sendMail(mailOptions);

    }catch(error){
        console.error('Error sending email:', error);
    }
}


export const sendPasswordResetEmail = async (email, token) => {
    try {
        const user = await getUserEmail(email);
        const { firstName } = user;

        const resetLink = `${domain}/auth/new-password?token=${token}`;

        let transporter = nodemailer.createTransport({
        service: 'gmail',
            auth: {
                user: SMPTP_EMAIL, 
                pass: SMPTP_PASSWORD, 
            }
        });

        let mailOptions = {
            from: SMPTP_EMAIL,
            to: email,
            subject: 'Reset your Password',
            html: `<p>Hi ${firstName}!</p>
                    <br />
                    <p>This Reset password link will expire in 5 minutes.</p>
                    <br />
                    <p>Please click <a href="${resetLink}">here</a> to reset your password.</p>`
        };

        await transporter.sendMail(mailOptions);
        
    } catch (error) {
        console.error('Error sending email:', error);
    }    
}

export const AdminAccount = async ({ email, firstName, adminName, defaultPassword}) => {
    const started = 'http://localhost:3000/auth/sign-in';

    try {
        let transporter = nodemailer.createTransport({
        service: 'gmail',
            auth: {
                user: SMPTP_EMAIL, 
                pass: SMPTP_PASSWORD, 
            }
        });

        let mailOptions = {
            from: SMPTP_EMAIL,
            to: `${email}`,
            subject: 'Admin Account Created!',
            html: `<p>Hi ${firstName}!</p>
                    <br />
                    <p>Admin ${adminName}, Created an Account for you. See the credentials below.</p>
                    <br />
                    <strong>EMAIL: ${email}</strong> <br />
                    <strong>PASSWORD: ${defaultPassword}</strong>
                    <br />
                    <p>click <a href="${started}">here</a> to get started.</p>`
        };

        await transporter.sendMail(mailOptions);
        
    } catch (error) {
        console.error('Error sending email:', error);
    }    
}