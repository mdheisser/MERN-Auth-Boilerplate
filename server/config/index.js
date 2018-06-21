const merge = require('lodash/merge');

// Load our own defaults which will grab from process.env
const config = require('./env/defaults');

// Only try this if we're not on Production
if (process.env.NODE_ENV !== 'production') {

    // Load environment-specific settings
    let localConfig = {};

    try {
        // The environment file might not exist
        localConfig = require(`./env/${config.env}`);
        localConfig = localConfig || {};
    } catch(err) {
        localConfig = {};
    }

    // Merge the config files, localConfig will override defaults
    merge(config, localConfig);
}

module.exports = config;
