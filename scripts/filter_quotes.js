const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '..', 'public', 'quotes.json');
const raw = fs.readFileSync(p, 'utf8');
const arr = JSON.parse(raw);
const allowed = arr.filter(q => {
  const author = (q.author || '').toLowerCase();
  const bio = (q.bio || '').toLowerCase();
  if (author.includes('donald trump')) return true;
  if (bio.includes('rapper')) return true;
  if (bio.includes('fashion')) return true;
  if (bio.includes('designer')) return true;
  if (bio.includes('jeweler')) return true;
  if (bio.includes('couture')) return true;
  // Some entries may include 'music' but also 'designer' in bio; covered above.
  return false;
});
fs.writeFileSync(p, JSON.stringify(allowed, null, 2), 'utf8');
console.log('FILTERED', { before: arr.length, after: allowed.length });
