// src/services/ocrService.js
const Tesseract = require('tesseract.js');
const fs = require('fs');

const processReceipt = async (imagePath) => {
  try {
    const result = await Tesseract.recognize(
      imagePath,
      'eng', // Language
      { logger: m => console.log(m) } // Optional progress logging
    );

    const text = result.data.text;

    // Simple parser (you can improve this with regex)
    const lines = text.split('\n').filter(l => l.trim() !== '');
    let amount = 0;
    let vendor = '';
    let description = lines.join(' ');

    // Try to detect amount (last number in the text)
    const amountMatches = text.match(/\d+(\.\d{1,2})?/g);
    if (amountMatches && amountMatches.length > 0) {
      amount = parseFloat(amountMatches[amountMatches.length - 1]);
    }

    // First line as vendor
    if (lines.length > 0) vendor = lines[0];

    return {
      vendor,
      amount,
      description,
      lines: lines.map(l => ({ description: l, amount: null })) // Optional: improve parsing
    };
  } catch (err) {
    console.error(err);
    throw new Error('Failed to process receipt');
  }
};

module.exports = { processReceipt };
