import http from 'node:http';
import {readFile} from 'node:fs/promises';
const source=await readFile(new URL('../worker/index.js',import.meta.url),'utf8');
const {default:worker}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
http.createServer(async(req,res)=>{try{let body='';for await(const chunk of req){body+=chunk;if(body.length>26000){res.writeHead(413);res.end('Request too large');return}}const r=await worker.fetch(new Request('http://'+(req.headers.host||'localhost:8080')+req.url,{method:req.method,headers:req.headers,...(['GET','HEAD'].includes(req.method)?{}:{body})}));res.writeHead(r.status,Object.fromEntries(r.headers));res.end(Buffer.from(await r.arrayBuffer()))}catch{res.writeHead(500);res.end('Server error')}}).listen(Number(process.env.PORT||8080),process.env.HOST||'127.0.0.1',()=>console.log('Study Buddy: http://localhost:8080'));
