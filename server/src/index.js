import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import index from './routes/index';
import auth from './routes/auth';

const app = express();
const env = require('../config/index.js');
const mongoSanitize = require('express-mongo-sanitize');

// Compression
app.use(compression());

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB
app.use(mongoSanitize());
mongoose.Promise = Promise;
mongoose.connect(env.DATABASE.CONNECTION);

// Routes
app.use('/api', index);
app.use('/api/auth', auth);

// Serve app
app.listen(4000, () => console.log('Running on port 4000'));
