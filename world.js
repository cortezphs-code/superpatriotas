(function(root){
'use strict';
const WIDTH=5200, GROUND=450;
const ground=[[0,920],[1080,1790],[1950,2850],[3020,3880],[4050,5200]];
const ledges=[[330,346,160],[710,285,140],[1250,342,140],[1510,270,150],[1840,338,130],[2180,338,150],[2510,276,160],[2910,335,135],[3250,340,160],[3550,275,170],[3940,337,130],[4280,337,160],[4580,276,160]];
const overlap=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
function create(){return{player:{x:70,y:GROUND-72,w:38,h:72,vx:0,vy:0,jumps:0,grounded:true,invincible:0,facing:1,big:false},platforms:[...ground.map(([x,end])=>({x,y:GROUND,w:end-x,h:100,ground:true})),...ledges.map(([x,y,w])=>({x,y,w,h:22}))],enemies:[560,1330,2260,3320,4430].map(x=>({x,origin:x,y:GROUND-64,w:44,h:64,dir:1,alive:true})),flags:[820,1610,2660,3650,4680].map(x=>({x,y:GROUND-62,w:40,h:62})),stars:[...ledges.flatMap(([x,y,w])=>[0,1,2].map(i=>({x:x+25+i*(w-50)/2,y:y-42,w:20,h:20,taken:false}))),...[220,610,1160,2070,3140,4200,4830].map(x=>({x,y:GROUND-42,w:20,h:20,taken:false}))],jewels:[300,1150,2120,3190,4210].map(x=>({x,y:GROUND-35,w:26,h:30,taken:false})),jewelsCollected:0,lives:3,score:0,time:0,checkpoint:70,state:'playing',message:'',notice:0};}
function resize(p,big){const feet=p.y+p.h,center=p.x+p.w/2;p.big=big;p.w=big?57:38;p.h=big?108:72;p.x=Math.max(0,Math.min(WIDTH-p.w,center-p.w/2));p.y=feet-p.h;}
function hurt(w,fall=false){const p=w.player;if(w.state!=='playing'||(!fall&&p.invincible>0))return;if(p.big&&!fall){resize(p,false);p.invincible=2;w.message='Você encolheu! Encontre outra joia.';w.notice=2;return;}w.lives--;resize(p,false);if(w.lives<=0){w.state='lost';return;}Object.assign(p,{x:w.checkpoint,y:GROUND-72,vx:0,vy:0,jumps:0,grounded:true,invincible:2});for(const gem of w.jewels)if(gem.x>=w.checkpoint)gem.taken=false;w.message='Perdeu uma vida! Procure uma joia.';w.notice=2;}
function step(w,input,dt){if(w.state!=='playing')return;const p=w.player;w.time+=dt;w.notice=Math.max(0,w.notice-dt);p.invincible=Math.max(0,p.invincible-dt);p.vx=((input.right?1:0)-(input.left?1:0))*260;if(p.vx)p.facing=Math.sign(p.vx);if(input.jump&&p.jumps<2){p.vy=p.jumps===0?-570:-510;p.jumps++;p.grounded=false;}input.jump=false;const oldY=p.y,oldBottom=p.y+p.h;p.vy=Math.min(800,p.vy+1500*dt);p.x=Math.max(0,Math.min(WIDTH-p.w,p.x+p.vx*dt));p.y+=p.vy*dt;p.grounded=false;
for(const platform of w.platforms){if(p.x+p.w>platform.x&&p.x<platform.x+platform.w&&oldY+p.h<=platform.y+1&&p.y+p.h>=platform.y&&p.vy>=0){p.y=platform.y-p.h;p.vy=0;p.jumps=0;p.grounded=true;}}
if(p.y>650){hurt(w,true);return;}
for(const s of w.stars)if(!s.taken&&overlap(p,s)){s.taken=true;w.score++;}
for(const gem of w.jewels)if(!gem.taken&&overlap(p,gem)){gem.taken=true;w.jewelsCollected++;if(!p.big){resize(p,true);p.invincible=Math.max(p.invincible,.8);}w.message='SUPER PATRIOTA! Você cresceu!';w.notice=2.5;}
for(const e of w.enemies){if(!e.alive)continue;e.x+=e.dir*65*dt;if(e.x>e.origin+85){e.x=e.origin+85;e.dir=-1;}if(e.x<e.origin-85){e.x=e.origin-85;e.dir=1;}if(overlap(p,e)){if(p.vy>0&&oldBottom<=e.y+16){e.alive=false;p.vy=-390;p.jumps=1;w.message='Obstáculo superado!';w.notice=1.5;}else{hurt(w);return;}}}
for(const f of w.flags)if(overlap(p,f)){hurt(w);return;}
for(const cp of [2040,4130])if(p.x>=cp&&w.checkpoint<cp&&p.grounded){w.checkpoint=cp;w.message='Ponto de retorno ativado!';w.notice=2;}
if(p.x>4940)w.state='won';
}
const api={create,step,hurt,overlap,WIDTH,GROUND};if(typeof module!=='undefined')module.exports=api;else root.PatriotasWorld=api;
})(typeof window!=='undefined'?window:globalThis);
