/**
 * Format a number as currency
 * @param {number|string} amount - The amount to format
 * @param {string} currency - The currency code (default: 'USD')
 * @param {string} locale - The locale to use for formatting (default: 'en-US')
 * @returns {string} - The formatted currency string
 */
export const formatCurrency = (amount, currency = "USD", locale = "en-US") => {
  if (amount === null || amount === undefined || amount === "") {
    return "$0.00";
  }

  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numericAmount)) {
    return "$0.00";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(numericAmount);
};

/**
 * Parse currency string to number
 * @param {string} currencyString - The currency string to parse
 * @returns {number} - The parsed number
 */
export const parseCurrency = (currencyString) => {
  if (!currencyString) return 0;

  // Remove currency symbols and spaces, then parse
  const cleanString = currencyString.replace(/[^0-9.-]+/g, "");
  const parsed = parseFloat(cleanString);

  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Add two currency amounts
 * @param {number|string} amount1 - First amount
 * @param {number|string} amount2 - Second amount
 * @returns {number} - The sum
 */
export const addCurrency = (amount1, amount2) => {
  const num1 =
    typeof amount1 === "string" ? parseCurrency(amount1) : amount1 || 0;
  const num2 =
    typeof amount2 === "string" ? parseCurrency(amount2) : amount2 || 0;

  return Math.round((num1 + num2) * 100) / 100; // Round to 2 decimal places
};

/**
 * Subtract currency amounts
 * @param {number|string} amount1 - Amount to subtract from
 * @param {number|string} amount2 - Amount to subtract
 * @returns {number} - The difference
 */
export const subtractCurrency = (amount1, amount2) => {
  const num1 =
    typeof amount1 === "string" ? parseCurrency(amount1) : amount1 || 0;
  const num2 =
    typeof amount2 === "string" ? parseCurrency(amount2) : amount2 || 0;

  return Math.round((num1 - num2) * 100) / 100; // Round to 2 decimal places
};

/**
 * Calculate percentage of an amount
 * @param {number|string} amount - The base amount
 * @param {number} percentage - The percentage (e.g., 10 for 10%)
 * @returns {number} - The calculated percentage amount
 */
export const calculatePercentage = (amount, percentage) => {
  const num = typeof amount === "string" ? parseCurrency(amount) : amount || 0;
  return Math.round(((num * percentage) / 100) * 100) / 100; // Round to 2 decimal places
};
