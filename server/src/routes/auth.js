import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import parseErrors from '../utils/parseErrors';
import { sendResetPasswordEmail } from '../email/resetPassword';
import { sendConfirmationEmail } from '../email/confirmEmail';

const env = require('../../config/index.js');

const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body.data;
    User.findOne({ email }).then((user) => {
        if (user && user.isValidPassword(password)) {
            res.json({ user: user.toAuthJSON() });
        } else {
            res.status(400).json({ errors: { global: 'Invalid credentials' } });
        }
    });
});

router.post('/signup', (req, res) => {
    const { email, firstName, lastName, password } = req.body.data;
    const user = new User({ email, firstName, lastName });
    user.setPassword(password);
    user.setConfirmationToken();
    user.save()
        .then((userRecord) => {
            sendConfirmationEmail(userRecord);
            res.json({ user: userRecord.toAuthJSON() });
        })
        .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.post('/confirmation', (req, res) => {
    const { token } = req.body;
    User.findOneAndUpdate({ confirmationToken: token }, { confirmationToken: '', confirmed: true }, { new: true })
        .then((user) => {
            if (user) {
                res.json({ user: user.toAuthJSON() });
            } else {
                res.status(400).json({});
            }
        });
});

router.post('/reset_password_request', (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            sendResetPasswordEmail(user);
            res.json({});
        } else {
            res.status(400).json({ errors: { global: 'Email does not exist' } });
        }
    });
});

router.post('/validate_token', (req, res) => {
    jwt.verify(req.body.token, env.AUTH.JWT_SECRET, (err) => {
        if (err) {
            res.status(401).json({});
        } else {
            res.json({});
        }
    });
});

router.post('/reset_password', (req, res) => {
    const { password, token } = req.body.data;
    jwt.verify(token, env.AUTH.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ errors: { global: 'Invalid token' } });
        } else {
            User.findOne({ _id: decoded._id }).then((user) => {
                if (user) {
                    user.setPassword(password);
                    user.save().then(() => res.json({}));
                } else {
                    res.status(404).json({ errors: { global: 'Invalid token' } });
                }
            });
        }
    });
});

export default router;
