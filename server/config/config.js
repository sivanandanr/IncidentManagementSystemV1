const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    MONGODB_PORT: process.env.MONGODB_PORT || 27017,
    MONGODB_NAME: process.env.MONGODB_NAME || "incidentsysemDB",
    MONGO_INITDB_ROOT_USERNAME: process.env.MONGO_INITDB_ROOT_USERNAME || "mongousradmin",
    MONGO_INITDB_ROOT_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD || "mongopassadmin",
    NODE_ENV: process.env.NODE_ENV
};