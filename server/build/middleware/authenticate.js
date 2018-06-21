'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = require('../../config/index.js');

exports.default = function (req, res, next) {
    var header = req.headers.authorization;
    var token = void 0;

    if (header) token = header.split(' ')[1];

    if (token) {
        _jsonwebtoken2.default.verify(token, env.AUTH.JWT_SECRET, function (err, decoded) {
            if (err) {
                res.status(401).json({ errors: { global: 'Invalid token' } });
            } else {
                _User2.default.findOne({ email: decoded.email }).then(function (user) {
                    req.currentUser = user;
                    next();
                });
            }
        });
    } else {
        res.status(401).json({ errors: { global: 'No token' } });
    }
};