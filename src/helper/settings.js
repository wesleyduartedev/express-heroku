const env = require('env-var');

const exceptForTests = process.env.NODE_ENV !== 'test';

module.exports = {
    PORT: env
        .get('PORT')
        .asIntPositive(),

    MONGO: {
        SRV: env
            .get('MONGO_SRV')
            .required(exceptForTests)
            .asString()
    }
};