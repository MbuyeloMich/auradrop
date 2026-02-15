const http=require('http');
const ports=[3000,3001,3002];
let i=0;
function test(){
  if(i>=ports.length){ console.error('NONE'); process.exit(2); }
  const port=ports[i++];
  const url='http://localhost:'+port+'/quotes.json';
  http.get(url,res=>{
    let s='';
    res.on('data',c=>s+=c);
    res.on('end',()=>{
      try{ const a=JSON.parse(s); console.log('PORT',port,'COUNT',a.length); process.exit(0);}catch(e){ console.error('PORT',port,'PARSE_ERR',e.message); test(); }
    });
  }).on('error',err=>{ console.error('PORT',port,'ERR',err.message); test(); });
}

test();
