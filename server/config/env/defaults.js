const awsParamEnv = require('aws-param-env');

awsParamEnv.load('/', { region: 'ap-southeast-2' });

const config = {
    HOST: {
        MODE: 'production',
        URL: ''
    },
    DATABASE: {
        CONNECTION: process.env.MernAuthDatabasePass
    },
    AUTH: {
        JWT_SECRET: process.env.MernAuthJWT
    },
    EMAIL: {
        HOST: 'smtp.mailtrap.io',
        PORT: '2525',
        USER: process.env.DevMailtrapUser,
        PASS: process.env.DevMailtrapPass
    }
};

// Set the current environment or default to 'development'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
config.env = process.env.NODE_ENV;

module.exports = config;
