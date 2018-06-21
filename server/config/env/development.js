const awsParamEnv = require('aws-param-env');

awsParamEnv.load('/', { region: 'ap-southeast-2' });

const config = {
    HOST: {
        MODE: 'development',
        URL: 'http://localhost:3000'
    },
    DATABASE: {
        CONNECTION: 'mongodb://localhost/mern_auth_boilerplate'
    },
    AUTH: {
        JWT_SECRET: 'mysupersecretkey'
    }
};

module.exports = config;
