const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    //server
    PORT: process.env.PORT,
    //mongodb
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    //admin
    ADMIN_FN: process.env.ADMIN_FN,
    ADMIN_LN: process.env.ADMIN_LN,
    ADMIN_E: process.env.ADMIN_E,
    ADMIN_PW: process.env.ADMIN_PW,
    //PayPal
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
};