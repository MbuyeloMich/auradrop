const fs = require('fs');
const path = require('path');
const p = path.join(__dirname,'..','public','quotes.json');
let arr = JSON.parse(fs.readFileSync(p,'utf8'));

// Fisher-Yates shuffle
for (let i = arr.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

fs.writeFileSync(p, JSON.stringify(arr, null, 2), 'utf8');
console.log('SHUFFLED', arr.length);
