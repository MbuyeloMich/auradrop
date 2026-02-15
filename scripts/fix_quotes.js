const fs=require('fs');
const path=require('path');
const p=path.join(__dirname,'..','public','quotes.json');
let s=fs.readFileSync(p,'utf8');
let arr=JSON.parse(s);
arr=arr.map(q=>{
  const bio = q.bio || '';
  const m = bio.match(/\((\d{4})[–-](\d{4})\)/);
  if(m){
    const span = m[0];
    if(!/\(\d{4}[–-]\d{4}\)/.test(q.author)){
      q.author = q.author + ' ' + span;
    }
    q.bio = q.bio.replace(span,'').replace(/,\s*,/g,',').replace(/\s+,/g,',').replace(/\(,|,\)/g,'').trim();
    if(q.bio.endsWith(',')) q.bio = q.bio.slice(0,-1).trim();
  }
  return q;
});
fs.writeFileSync(p,JSON.stringify(arr,null,2),'utf8');
console.log('FIXED', arr.length);
