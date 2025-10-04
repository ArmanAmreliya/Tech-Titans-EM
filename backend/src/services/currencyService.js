// src/services/currencyService.js
const axios = require('axios');

/**
 * Convert amount from source currency to target currency
 * @param {Number} amount - Amount to convert
 * @param {String} from - Source currency code (e.g., USD)
 * @param {String} to - Target currency code (e.g., INR)
 * @returns {Number} converted amount
 */
const convertCurrency = async (amount, from, to) => {
  try {
    if (from === to) return amount;

    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const rates = response.data.rates;

    if (!rates[to]) throw new Error(`Currency ${to} not supported`);

    const convertedAmount = amount * rates[to];
    return parseFloat(convertedAmount.toFixed(2)); // round to 2 decimals
  } catch (err) {
    console.error(err);
    throw new Error('Currency conversion failed');
  }
};

module.exports = { convertCurrency };
