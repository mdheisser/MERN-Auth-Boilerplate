'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (errors) {
    var result = {};

    _lodash2.default.forEach(errors, function (val, key) {
        result[key] = val.message;
    });

    return result;
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }