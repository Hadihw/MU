const dotenv = require("dotenv");
dotenv.config({ path: '../.env' });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = stripe;