import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

const env = require('../../config/index');

const schema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            lowercase: true
        },
        lastName: {
            type: String,
            required: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            index: true,
            unique: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        confirmed: {
            type: Boolean,
            default: false
        },
        confirmationToken: {
            type: String,
            default: ''
        }
    },
    { timestamps: true }
);

schema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.setPassword = function setPassword(password) {
    this.passwordHash = bcrypt.hashSync(password, 10);
};

schema.methods.setConfirmationToken = function setConfirmationToken() {
    this.confirmationToken = this.generateJWT();
};

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
    return `${env.HOST.URL}/confirmation?token=${this.confirmationToken}`;
};

schema.methods.generateResetPasswordLink = function generateResetPasswordLink() {
    return `${env.HOST.URL}/reset_password?token=${this.generateResetPasswordToken()}`;
};

schema.methods.generateJWT = function generateJWT() {
    return jwt.sign(
        {
            email: this.email,
            confirmed: this.confirmed
        },
        env.AUTH.JWT_SECRET
    );
};

schema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
    return jwt.sign({ _id: this._id }, env.AUTH.JWT_SECRET, { expiresIn: '1h' });
};

schema.methods.toAuthJSON = function toAuthJSON() {
    return {
        email: this.email,
        confirmed: this.confirmed,
        token: this.generateJWT()
    };
};

schema.plugin(uniqueValidator, { message: 'This email is already taken' });

export default mongoose.model('User', schema);
