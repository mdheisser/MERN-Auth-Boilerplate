'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _parseErrors = require('../utils/parseErrors');

var _parseErrors2 = _interopRequireDefault(_parseErrors);

var _resetPassword = require('../email/resetPassword');

var _confirmEmail = require('../email/confirmEmail');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = require('../../config/index.js');

var router = _express2.default.Router();

router.post('/login', function (req, res) {
    var _req$body$data = req.body.data,
        email = _req$body$data.email,
        password = _req$body$data.password;

    _User2.default.findOne({ email: email }).then(function (user) {
        if (user && user.isValidPassword(password)) {
            res.json({ user: user.toAuthJSON() });
        } else {
            res.status(400).json({ errors: { global: 'Invalid credentials' } });
        }
    });
});

router.post('/signup', function (req, res) {
    var _req$body$data2 = req.body.data,
        email = _req$body$data2.email,
        firstName = _req$body$data2.firstName,
        lastName = _req$body$data2.lastName,
        password = _req$body$data2.password;

    var user = new _User2.default({ email: email, firstName: firstName, lastName: lastName });
    user.setPassword(password);
    user.setConfirmationToken();
    user.save().then(function (userRecord) {
        (0, _confirmEmail.sendConfirmationEmail)(userRecord);
        res.json({ user: userRecord.toAuthJSON() });
    }).catch(function (err) {
        return res.status(400).json({ errors: (0, _parseErrors2.default)(err.errors) });
    });
});

router.post('/confirmation', function (req, res) {
    var token = req.body.token;

    _User2.default.findOneAndUpdate({ confirmationToken: token }, { confirmationToken: '', confirmed: true }, { new: true }).then(function (user) {
        if (user) {
            res.json({ user: user.toAuthJSON() });
        } else {
            res.status(400).json({});
        }
    });
});

router.post('/reset_password_request', function (req, res) {
    _User2.default.findOne({ email: req.body.email }).then(function (user) {
        if (user) {
            (0, _resetPassword.sendResetPasswordEmail)(user);
            res.json({});
        } else {
            res.status(400).json({ errors: { global: 'Email does not exist' } });
        }
    });
});

router.post('/validate_token', function (req, res) {
    _jsonwebtoken2.default.verify(req.body.token, env.AUTH.JWT_SECRET, function (err) {
        if (err) {
            res.status(401).json({});
        } else {
            res.json({});
        }
    });
});

router.post('/reset_password', function (req, res) {
    var _req$body$data3 = req.body.data,
        password = _req$body$data3.password,
        token = _req$body$data3.token;

    _jsonwebtoken2.default.verify(token, env.AUTH.JWT_SECRET, function (err, decoded) {
        if (err) {
            res.status(401).json({ errors: { global: 'Invalid token' } });
        } else {
            _User2.default.findOne({ _id: decoded._id }).then(function (user) {
                if (user) {
                    user.setPassword(password);
                    user.save().then(function () {
                        return res.json({});
                    });
                } else {
                    res.status(404).json({ errors: { global: 'Invalid token' } });
                }
            });
        }
    });
});

exports.default = router;