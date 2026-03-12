const fs = require('fs');
const path = require('path');

// Read the ESM file
const code = fs.readFileSync(path.join(__dirname, '../functions/api/reactions.js'), 'utf8');

// Replace the ESM export syntax with CommonJS
const cjsCode = code.replace(
  'export { onRequestGet, onRequestPost };',
  'module.exports = { onRequestGet, onRequestPost };'
);

// Write to a temporary file
fs.writeFileSync(path.join(__dirname, 'temp_reactions.js'), cjsCode);

module.exports = require('./temp_reactions.js');
