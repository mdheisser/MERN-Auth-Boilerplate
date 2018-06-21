'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var env = require('../config/index.js');
var mongoSanitize = require('express-mongo-sanitize');

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

// MongoDB
app.use(mongoSanitize());
_mongoose2.default.Promise = _bluebird2.default;
_mongoose2.default.connect(env.DATABASE.CONNECTION);

// Use routes
app.use('/api', _index2.default);
app.use('/api/auth', _auth2.default);

// Serve app
app.listen(4000, function () {
  return console.log('Running on localhost:4000');
});