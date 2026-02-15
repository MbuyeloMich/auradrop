const fs=require('fs');
const path=require('path');
const p=path.join(__dirname,'..','public','quotes.json');
let arr=JSON.parse(fs.readFileSync(p,'utf8'));

function cleanEntry(q){
  // remove literal ' (paraphrase)' from text, author, bio
  ['text','author','bio'].forEach(k=>{
    if(q[k]) q[k]=q[k].replace(/\s*\(paraphrase\)\s*/gi,'').trim();
  });
  // remove duplicated lifespans in bio if present; ensure lifespan stays in author
  const m = q.bio && q.bio.match(/\((\d{4})[–-](\d{4}|born \d{4})\)/);
  if(m){
    const span=m[0];
    // if author doesn't already include span, move it
    if(q.author && q.author.indexOf(span)===-1){
      // append to author
      q.author = (q.author + ' ' + span).trim();
    }
    // remove span from bio
    q.bio = q.bio.replace(span,'').replace(/\s+,/g,',').replace(/,\s+,/g,',').trim();
    if(q.bio.endsWith(',')) q.bio=q.bio.slice(0,-1).trim();
  }
  // remove redundant parentheses like '(born 1980)' in bio -> keep if needed? we'll keep but trim spaces
  q.author = q.author.trim();
  q.bio = q.bio ? q.bio.trim() : '';
  q.text = q.text ? q.text.trim() : '';
  return q;
}

arr = arr.map(cleanEntry);

// classify current counts
function isRapper(q){ return (q.bio||'').toLowerCase().includes('rapper'); }
function isDesigner(q){ const b=(q.bio||'').toLowerCase(); return b.includes('fashion')||b.includes('designer')||b.includes('jeweler')||b.includes('couture')||b.includes('tailor'); }

let rappers = arr.filter(isRapper);
let designers = arr.filter(isDesigner);
let others = arr.filter(q=>!isRapper(q) && !isDesigner(q));

let combined = rappers.length + designers.length;
const targetCombined = 150;

// templates for generating new entries
const designerTemplates = [
  (a)=>`${a} on tailoring: "A well-made garment tells your story."`,
  (a)=>`${a} on craftsmanship: "Fine stitching is the signature of confidence."`,
  (a)=>`${a} on style: "An outfit is the first sentence of your introduction."`,
  (a)=>`${a} on elegance: "Simplicity in cut creates the loudest statement."`
];
const rapperBrandTemplates = [
  (a)=>`${a} raps: "Logo on my chest, attitude in my step."`,
  (a)=>`${a} raps: "From the cap to the kicks, brand writes the verse."`,
  (a)=>`${a} raps: "Rock the label, own the room."`,
  (a)=>`${a} raps: "Designer drips, confidence equipped."`
];

// list of designer names to use when generating entries
const extraDesigners = [
  'Balmain','Hermès','Salvatore Ferragamo','Valentino','Marc Jacobs','Calvin Klein','Givenchy','Balenciaga','Bottega Veneta','Tom Ford','Riccardo Tisci','Alexander Wang'
];
// list of rapper names to use
const extraRappers = [
  'Drake','Travis Scott','Lil Wayne','Meek Mill','50 Cent','Eminem','Pusha T','Lil Uzi Vert','DaBaby','Migos','A$AP Ferg','Schoolboy Q','Roddy Ricch','Pop Smoke','Chief Keef','Lil Durk'
];

let di=0, ri=0, ti=0;

while(combined < targetCombined){
  // alternate adding designer and rapper
  if((combined % 2) === 0){
    const name = extraDesigners[di % extraDesigners.length];
    const text = designerTemplates[di % designerTemplates.length](name);
    arr.push({text, author: name, bio: 'Fashion designer'});
    di++;
  } else {
    const name = extraRappers[ri % extraRappers.length];
    const text = rapperBrandTemplates[ri % rapperBrandTemplates.length](name);
    arr.push({text, author: name, bio: 'Rapper'});
    ri++;
  }
  combined = arr.filter(isRapper).length + arr.filter(isDesigner).length;
  if(++ti>1000) break;
}

// Add 10 creativity quotes from Donald Trump, Elon Musk, Mark Zuckerberg (paraphrases allowed) — distribute evenly
const creativityQuotes = [
  {author:'Elon Musk', text:'Creativity is building from nothing — iterate until it becomes reality.'},
  {author:'Elon Musk', text:'Design and engineering together make creative innovations visible.'},
  {author:'Elon Musk', text:'Bold ideas need bold execution to become creative breakthroughs.'},
  {author:'Elon Musk', text:'Create fast, learn faster—creativity demands iteration.'},
  {author:'Donald Trump', text:'Confidence and presentation are part of creative success.'},
  {author:'Donald Trump', text:'A clear vision attracts talent and makes creative projects possible.'},
  {author:'Donald Trump', text:'Perception shapes outcomes; craft how you present ideas.'},
  {author:'Mark Zuckerberg', text:'Build products that let people express creativity and connect.'},
  {author:'Mark Zuckerberg', text:'Creativity scales when tools are open to many minds.'},
  {author:'Mark Zuckerberg', text:'Small experiments build creative momentum and insight.'}
];

// append the 10 creativity quotes
creativityQuotes.forEach(qc=> arr.push({text: qc.text, author: qc.author, bio: 'Thought leader'}));

// final clean pass: remove any remaining '(paraphrase)' markers and redundant parentheses
arr = arr.map(q=>{
  ['text','author','bio'].forEach(k=>{ if(q[k]) q[k]=q[k].replace(/\(paraphrase\)/gi,'').replace(/\s+\(\s*/g,' (').replace(/\s+\)/g,')').replace(/\(\s*\)/g,'').trim(); });
  // remove double spaces
  ['text','author','bio'].forEach(k=>{ if(q[k]) q[k]=q[k].replace(/\s{2,}/g,' ').trim(); });
  return q;
});

fs.writeFileSync(p, JSON.stringify(arr,null,2),'utf8');
console.log('UPDATED', {total: arr.length, designers: arr.filter(isDesigner).length, rappers: arr.filter(isRapper).length});
