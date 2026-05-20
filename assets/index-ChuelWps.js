const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/GLTFLoader-CGtRWvqK.js","assets/three.module-C7ia6f3T.js","assets/OrbitControls-Bk8Ii4mF.js"])))=>i.map(i=>d[i]);
import{r as x,S as st,T as ut,P as xt,X as gt,a as mt,R as ft}from"./icons-B-7KeCwf.js";import{r as ht}from"./vendor-DsR6lZ_U.js";import{u as ve,w as yt}from"./xlsx-DrgRuPKf.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))p(o);new MutationObserver(o=>{for(const b of o)if(b.type==="childList")for(const u of b.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&p(u)}).observe(document,{childList:!0,subtree:!0});function d(o){const b={};return o.integrity&&(b.integrity=o.integrity),o.referrerPolicy&&(b.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?b.credentials="include":o.crossOrigin==="anonymous"?b.credentials="omit":b.credentials="same-origin",b}function p(o){if(o.ep)return;o.ep=!0;const b=d(o);fetch(o.href,b)}})();var lt={exports:{}},Ve={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bt=x,vt=Symbol.for("react.element"),jt=Symbol.for("react.fragment"),St=Object.prototype.hasOwnProperty,kt=bt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Ct={key:!0,ref:!0,__self:!0,__source:!0};function ct(n,t,d){var p,o={},b=null,u=null;d!==void 0&&(b=""+d),t.key!==void 0&&(b=""+t.key),t.ref!==void 0&&(u=t.ref);for(p in t)St.call(t,p)&&!Ct.hasOwnProperty(p)&&(o[p]=t[p]);if(n&&n.defaultProps)for(p in t=n.defaultProps,t)o[p]===void 0&&(o[p]=t[p]);return{$$typeof:vt,type:n,key:b,ref:u,props:o,_owner:kt.current}}Ve.Fragment=jt;Ve.jsx=ct;Ve.jsxs=ct;lt.exports=Ve;var e=lt.exports,Ze={},tt=ht;Ze.createRoot=tt.createRoot,Ze.hydrateRoot=tt.hydrateRoot;const wt="modulepreload",Tt=function(n){return"/"+n},nt={},Xe=function(t,d,p){let o=Promise.resolve();if(d&&d.length>0){document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),j=(u==null?void 0:u.nonce)||(u==null?void 0:u.getAttribute("nonce"));o=Promise.allSettled(d.map(C=>{if(C=Tt(C),C in nt)return;nt[C]=!0;const S=C.endsWith(".css"),s=S?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${C}"]${s}`))return;const l=document.createElement("link");if(l.rel=S?"stylesheet":wt,S||(l.as="script"),l.crossOrigin="",l.href=C,j&&l.setAttribute("nonce",j),document.head.appendChild(l),S)return new Promise((w,a)=>{l.addEventListener("load",w),l.addEventListener("error",()=>a(new Error(`Unable to preload CSS for ${C}`)))})}))}function b(u){const j=new Event("vite:preloadError",{cancelable:!0});if(j.payload=u,window.dispatchEvent(j),!j.defaultPrevented)throw u}return o.then(u=>{for(const j of u||[])j.status==="rejected"&&b(j.reason);return t().catch(b)})},Dt=`
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;touch-action:manipulation}
body{overflow-x:hidden;-webkit-overflow-scrolling:touch}
input,select,textarea{font-size:16px !important}
@media(max-width:768px){
  body{padding-bottom:env(safe-area-inset-bottom,0)}
  .desktop-only{display:none !important}
  input,select,textarea{font-size:16px !important}
}
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600&family=Barlow+Condensed:wght@400;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
@keyframes spin{to{transform:rotate(360deg)}}@keyframes spinR{to{transform:rotate(-360deg)}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}
@keyframes pulseGlow{0%,100%{filter:drop-shadow(0 0 4px #F97316)}50%{filter:drop-shadow(0 0 18px #F97316)}}
@keyframes twinkle{0%,100%{opacity:.1}50%{opacity:.9}}
@keyframes letterIn{0%{opacity:0;transform:translateY(38px) skewY(8deg)}100%{opacity:1;transform:translateY(0)}}
@keyframes subIn{0%{opacity:0;letter-spacing:.8em}100%{opacity:1;letter-spacing:.36em}}
@keyframes glowPulse{0%,100%{box-shadow:0 0 28px rgba(249,115,22,.5)}50%{box-shadow:0 0 70px rgba(249,115,22,1)}}
@keyframes wave{0%{transform:scale(.2);opacity:.9}100%{transform:scale(3);opacity:0}}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes sonarWave{0%{r:6;opacity:.9}100%{r:28;opacity:0}}
@keyframes prismRay{0%{opacity:0;transform:scaleY(0)}100%{opacity:.75;transform:scaleY(1)}}
@keyframes mountainGlow{0%,100%{filter:drop-shadow(0 0 4px rgba(249,115,22,.3))}50%{filter:drop-shadow(0 0 18px rgba(249,115,22,.8))}}
@keyframes cityFlicker{0%,100%{opacity:.5}50%{opacity:1}}
@keyframes grassTrack{0%,100%{transform:rotateX(0)}50%{transform:rotateX(22deg)}}
@keyframes scrollLine{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
@keyframes shimmer{0%{left:-60%}100%{left:160%}}
@keyframes siteLight{0%,100%{opacity:.5}50%{opacity:1}}
@keyframes rayIn{0%{transform:scaleY(0);opacity:0}60%{transform:scaleY(1.1)}100%{transform:scaleY(1);opacity:1}}
@keyframes dustPuff{0%{opacity:.6;transform:scale(1)}100%{opacity:0;transform:scale(2.5) translate(4px,-8px)}}
`,v="#F97316",Ge=[["#010108","#03011a","#140506","#220400"],["#040115","#0a041c","#200b04","#d45808"],["#0a1225","#183050","#7a2006","#ff8c00"],["#163050","#234e80","#60a0c0","#ffc440"],["#0048a0","#1070c0","#54a0c0","#c0e0ff"],["#122040","#235070","#b06030","#e89030"],["#240a00","#501600","#b03000","#ff3800"],["#010106","#040818","#070e18","#100318"]],rt=n=>[1,3,5].map(t=>parseInt(n.slice(t,t+2),16)),Pt=(n,t,d)=>{const p=rt(n),o=rt(t);return`rgb(${p.map((b,u)=>Math.round(b+(o[u]-b)*d)).join(",")})`};function Et(n){const t=n*(Ge.length-1),d=Math.min(Ge.length-2,Math.floor(t)),p=t-d;return Ge[d].map((o,b)=>Pt(o,Ge[d+1][b],p))}function At(n){const t=n.trim().split(/\s+/).map(o=>o.split(",").map(Number)),d=t.map(o=>o[0]),p=t.map(o=>o[1]);return{x:Math.min(...d),y:Math.min(...p),w:Math.max(...d)-Math.min(...d),h:Math.max(...p)-Math.min(...p)}}const Ee=(n,t,d)=>Math.max(t,Math.min(d,n)),Ie=(n,t,d)=>Ee((n-t)/(d-t),0,1),Ye=["211,0 533,0 600,0 622,31 589,59 589,248 111,248 111,203 61,203 61,126 111,64 211,0","111,259 589,259 589,303 689,303 733,414 733,526 644,537 589,537 467,537 411,537 278,537 222,492 156,470 50,437 39,359 56,281 111,259","156,481 278,548 411,548 589,548 644,548 700,548 700,620 633,681 578,714 422,720 278,720 222,720 178,720 144,692 133,648 117,603 133,548 156,481","822,120 822,359 989,359 1000,314 1000,126 822,120"],Rt=Ye.map(At),dt=[[.08,.28,.2,.4,.34,.54],[.16,.36,.28,.48,.42,.62],[.26,.46,.38,.58,.5,.7],[.2,.4,.32,.52,.44,.64]];function Mt({scrollP:n}){const t=Et(n),d=n*6,p=dt.map(([S,s,l,w,a,T])=>({pileP:Ie(n,S,s),tubeP:Ie(n,l,w),panelP:Ie(n,a,T)})),o=p.reduce((S,s)=>S+(s.pileP+s.tubeP+s.panelP)/3,0)/p.length,b=Math.round(p.reduce((S,s)=>S+s.panelP,0)/p.length*100),u=d>5?Ee((d-5)*2.5,0,1):0,j=o<.12?"SITE CLEARED":o<.35?"PILE INSTALLATION":o<.56?"TORQUE TUBE & RACKING":o<.78?"MODULE PLACEMENT":"COMMISSIONING",C="linear-gradient(to bottom,"+t[0]+","+t[1]+" 55%,"+t[2]+" 85%,transparent)";return e.jsxs("div",{style:{position:"fixed",inset:0,zIndex:0,overflow:"hidden",background:"#010108"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,height:"28%",background:C,transition:"background 1.4s"}}),u>0&&e.jsx("div",{style:{position:"absolute",inset:0,background:"rgba(0,5,18,"+u*.55+")"}}),e.jsxs("svg",{viewBox:"0 0 1200 720",style:{position:"absolute",inset:0,width:"100%",height:"100%",display:"block"},children:[e.jsxs("defs",{children:[e.jsx("pattern",{id:"pileGrid",x:"0",y:"0",width:"20",height:"10",patternUnits:"userSpaceOnUse",children:e.jsx("circle",{cx:"10",cy:"5",r:"2",fill:"#505850",opacity:".88"})}),e.jsxs("pattern",{id:"rackGrid",x:"0",y:"0",width:"20",height:"10",patternUnits:"userSpaceOnUse",children:[e.jsx("rect",{x:"0",y:"3.8",width:"20",height:"2.4",fill:"#7a9896",opacity:".82"}),e.jsx("circle",{cx:"10",cy:"5",r:"2",fill:"#96b2b0",opacity:".88"})]}),e.jsxs("pattern",{id:"panelGrid",x:"0",y:"0",width:"20",height:"10",patternUnits:"userSpaceOnUse",children:[e.jsx("rect",{x:".5",y:".5",width:"19",height:"9",fill:"#1a304e",rx:".3",opacity:".82"}),e.jsx("line",{x1:"10",y1:".5",x2:"10",y2:"9.5",stroke:"rgba(60,110,170,.35)",strokeWidth:".6"})]}),Ye.map((S,s)=>e.jsx("clipPath",{id:"cp-z"+s,children:e.jsx("polygon",{points:S})},s)),e.jsx("filter",{id:"blurM",children:e.jsx("feGaussianBlur",{stdDeviation:"3"})}),e.jsxs("radialGradient",{id:"vig",cx:"50%",cy:"50%",r:"58%",children:[e.jsx("stop",{offset:"36%",stopColor:"transparent"}),e.jsx("stop",{offset:"72%",stopColor:"rgba(0,0,0,.22)"}),e.jsx("stop",{offset:"100%",stopColor:"rgba(0,0,0,.92)"})]})]}),p.map((S,s)=>{const l=Ye[s],w=Rt[s],a=w.w*S.pileP,T=w.w*S.tubeP,E=w.w*S.panelP,completion=(S.pileP+S.tubeP+S.panelP)/3;return e.jsxs("g",{children:[S.pileP>.01&&e.jsxs("g",{clipPath:"url(#cp-z"+s+")",children:[e.jsx("clipPath",{id:"pi-"+s,children:e.jsx("rect",{x:w.x-2,y:w.y-2,width:Ee(a+2,0,w.w+4),height:w.h+4})}),e.jsx("g",{clipPath:"url(#pi-"+s+")",opacity:Math.min(1,S.pileP*3),children:e.jsx("polygon",{points:l,fill:"url(#pileGrid)"})})]}),S.tubeP>.01&&e.jsxs("g",{clipPath:"url(#cp-z"+s+")",children:[e.jsx("clipPath",{id:"tu-"+s,children:e.jsx("rect",{x:w.x-2,y:w.y-2,width:Ee(T+2,0,w.w+4),height:w.h+4})}),e.jsx("g",{clipPath:"url(#tu-"+s+")",opacity:Math.min(1,S.tubeP*2.5),children:e.jsx("polygon",{points:l,fill:"url(#rackGrid)"})})]}),S.panelP>.01&&e.jsxs("g",{clipPath:"url(#cp-z"+s+")",children:[e.jsx("clipPath",{id:"pa-"+s,children:e.jsx("rect",{x:w.x-2,y:w.y-2,width:Ee(E+2,0,w.w+4),height:w.h+4})}),e.jsx("g",{clipPath:"url(#pa-"+s+")",opacity:Math.min(1,S.panelP*2),children:e.jsx("polygon",{points:l,fill:"url(#panelGrid)"})})]}),e.jsx("polygon",{points:l,fill:"none",stroke:"rgba(249,115,22,.2)",strokeWidth:"1",opacity:.2+completion*.3})]},s)}),e.jsx("rect",{x:"0",y:"0",width:"1200",height:"720",fill:"url(#vig)"}),e.jsx("text",{x:"1162",y:"100",textAnchor:"end",fill:"rgba(249,115,22,.5)",fontSize:"7.5",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"2",children:j}),n>.12&&e.jsxs("g",{opacity:Ee((n-.12)*6,0,1),children:[e.jsx("rect",{x:"36",y:"103",width:"90",height:"25",fill:"rgba(0,0,0,.55)",rx:"2"}),e.jsx("text",{x:"48",y:"119",fill:"rgba(249,115,22,.78)",fontSize:"9",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"1",children:"INSTALLED"}),e.jsxs("text",{x:"118",y:"119",textAnchor:"end",fill:"#F97316",fontSize:"12",fontFamily:"'Bebas Neue',sans-serif",children:[b,"%"]})]})]})]})}const Ke="data:image/webp;base64,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";function Bt({src:n,height:t}){const d=x.useRef(null),[p,o]=x.useState(!1),[b,u]=x.useState(!1);return x.useEffect(()=>{const j=d.current;if(!j)return;let C=!1,S,s,l,w;return Promise.all([Xe(()=>import("./three.module-C7ia6f3T.js"),[]),Xe(()=>import("./GLTFLoader-CGtRWvqK.js"),__vite__mapDeps([0,1])),Xe(()=>import("./OrbitControls-Bk8Ii4mF.js"),__vite__mapDeps([2,1]))]).then(([a,T,E])=>{if(C||!d.current)return;const M=T.GLTFLoader,O=E.OrbitControls,$=j.clientWidth,ae=t,ne=new a.Scene,G=new a.PerspectiveCamera(45,$/ae,.1,5e3);S=new a.WebGLRenderer({antialias:!0,alpha:!0}),S.setSize($,ae),S.setPixelRatio(Math.min(window.devicePixelRatio,2)),a.sRGBEncoding!==void 0&&(S.outputEncoding=a.sRGBEncoding),j.appendChild(S.domElement),ne.add(new a.HemisphereLight(16777215,2105392,1.1));const z=new a.DirectionalLight(16777215,1.2);z.position.set(40,80,60),ne.add(z);const X=new a.DirectionalLight(16769717,.5);X.position.set(-40,20,-30),ne.add(X),s=new O(G,S.domElement),s.enableDamping=!0,s.dampingFactor=.08,s.autoRotate=!0,s.autoRotateSpeed=.5,s.enablePan=!1,new M().load(n,le=>{if(C)return;const re=le.scene,ce=new a.Box3().setFromObject(re),q=ce.getSize(new a.Vector3),je=ce.getCenter(new a.Vector3);re.position.sub(je);const de=Math.max(q.x,q.y,q.z),K=de/(2*Math.tan(Math.PI*G.fov/360));G.position.set(K*1.4,K*.75,K*1.4),G.near=Math.max(de/100,.01),G.far=de*20,G.updateProjectionMatrix(),s.target.set(0,0,0),s.minDistance=K*.5,s.maxDistance=K*3,s.update(),ne.add(re),u(!0)},void 0,()=>o(!0));const se=()=>{l=requestAnimationFrame(se),s.update(),S.render(ne,G)};se(),w=()=>{if(!d.current)return;const le=d.current.clientWidth;G.aspect=le/ae,G.updateProjectionMatrix(),S.setSize(le,ae)},window.addEventListener("resize",w)}).catch(()=>o(!0)),()=>{C=!0,l&&cancelAnimationFrame(l),w&&window.removeEventListener("resize",w),s&&s.dispose(),S&&(S.dispose(),j.contains(S.domElement)&&j.removeChild(S.domElement))}},[n,t]),e.jsxs("div",{ref:d,style:{width:"100%",height:t,position:"relative",cursor:"grab"},children:[!b&&!p&&e.jsx("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(249,115,22,.55)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:"3px",textTransform:"uppercase"},children:"Loading site model…"}),p&&e.jsx("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(249,115,22,.6)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:"2px",textTransform:"uppercase"},children:"Model unavailable"})]})}function zt({on:n}){const t={animation:n?"pulse 1.4s ease-in-out infinite":"none",transformOrigin:"center"},d={animation:n?"pulseGlow 1.8s ease-in-out infinite":"none"},p={animation:n?"spin 3s linear infinite":"none",transformOrigin:"32px 32px"},o={animation:n?"spinR 4.5s linear infinite":"none",transformOrigin:"32px 32px"};return e.jsxs("svg",{width:"64",height:"64",viewBox:"0 0 64 64",fill:"none",children:[e.jsx("defs",{children:e.jsxs("radialGradient",{id:"og",cx:"38%",cy:"32%",children:[e.jsx("stop",{offset:"0%",stopColor:"#FFE082"}),e.jsx("stop",{offset:"100%",stopColor:"#F97316"})]})}),e.jsx("g",{style:t,children:e.jsx("circle",{cx:"32",cy:"32",r:"10",fill:"url(#og)",style:d})}),e.jsxs("g",{style:p,children:[e.jsx("ellipse",{cx:"32",cy:"32",rx:"26",ry:"9",stroke:"#F97316",strokeWidth:"1.5",fill:"none",opacity:".65"}),e.jsx("circle",{cx:"58",cy:"32",r:"5",fill:"#F97316"})]}),e.jsxs("g",{style:o,children:[e.jsx("ellipse",{cx:"32",cy:"32",rx:"20",ry:"8",stroke:"#EAB308",strokeWidth:"1",fill:"none",opacity:".45",transform:"rotate(55,32,32)"}),e.jsx("circle",{cx:"32",cy:"12",r:"3.5",fill:"#EAB308"})]}),n&&[0,60,120,180,240,300].map(b=>{const u=b*Math.PI/180;return e.jsx("line",{x1:32+13*Math.cos(u),y1:32+13*Math.sin(u),x2:32+18*Math.cos(u),y2:32+18*Math.sin(u),stroke:"#EAB308",strokeWidth:"1.5",strokeLinecap:"round"},b)})]})}function Ft({on:n}){const t={animation:n?"pulse 1.4s ease-in-out infinite":"none",transformOrigin:"center"};return e.jsxs("svg",{width:"64",height:"64",viewBox:"0 0 64 64",fill:"none",children:[e.jsx("circle",{cx:"32",cy:"32",r:"15",fill:"#FFD700",style:t}),e.jsx("circle",{cx:"32",cy:"32",r:"11",fill:"#FF9800"}),n&&e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"28",cy:"29",r:"2.5",fill:"#333"}),e.jsx("circle",{cx:"36",cy:"29",r:"2.5",fill:"#333"}),e.jsx("path",{d:"M27 37 Q32 43 37 37",stroke:"#333",strokeWidth:"2.5",fill:"none",strokeLinecap:"round"})]}),[0,45,90,135,180,225,270,315].map((d,p)=>{const o=d*Math.PI/180,b=32+18*Math.cos(o),u=32+18*Math.sin(o),j=32+26*Math.cos(o),C=32+26*Math.sin(o),S=n?"bounce "+(.55+p*.08)+"s ease-in-out infinite":"none",s=b+"px "+u+"px";return e.jsx("line",{x1:b,y1:u,x2:j,y2:C,stroke:"#FFD700",strokeWidth:"2.5",strokeLinecap:"round",style:{animation:S,transformOrigin:s}},d)})]})}function Ot({on:n}){const t={animation:n?"pulse 1.4s ease-in-out infinite":"none",transformOrigin:"center"},d={animation:n?"pulseGlow 1.8s ease-in-out infinite":"none"};return e.jsxs("svg",{width:"64",height:"64",viewBox:"0 0 64 64",fill:"none",children:[e.jsx("circle",{cx:"32",cy:"13",r:"8",fill:"#F97316",style:{...t,...d}}),n&&[0,45,90,135,180,225,270,315].map(p=>{const o=p*Math.PI/180;return e.jsx("line",{x1:32+10*Math.cos(o),y1:13+10*Math.sin(o),x2:32+15*Math.cos(o),y2:13+15*Math.sin(o),stroke:"#F97316",strokeWidth:"2",strokeLinecap:"round"},p)}),[-18,-7,4,15,26].map((p,o)=>{const b=n?"grassTrack "+(2+o*.28)+"s ease-in-out infinite":"none",u=32+p+"px 40px";return e.jsxs("g",{style:{animation:b,transformOrigin:u},children:[e.jsx("rect",{x:32+p-4,y:"28",width:"8",height:"12",rx:"1",fill:"#1e3a5f",stroke:"#4a90d9",strokeWidth:".8"}),e.jsx("line",{x1:32+p-4,y1:"31",x2:32+p+4,y2:"31",stroke:"#4a90d9",strokeWidth:".5",opacity:".7"}),e.jsx("line",{x1:32+p-4,y1:"34",x2:32+p+4,y2:"34",stroke:"#4a90d9",strokeWidth:".5",opacity:".7"}),e.jsx("line",{x1:32+p,y1:"28",x2:32+p,y2:"40",stroke:"#4a90d9",strokeWidth:".7"}),e.jsx("rect",{x:32+p-1,y:"40",width:"2",height:"8",fill:"#555"})]},o)})]})}function It({on:n}){const t={animation:n?"pulse 1.4s ease-in-out infinite":"none",transformOrigin:"center"};return e.jsxs("svg",{width:"64",height:"64",viewBox:"0 0 64 64",fill:"none",children:[e.jsx("rect",{x:"4",y:"44",width:"11",height:"22",fill:"#1e3a5f",rx:"1"}),e.jsx("rect",{x:"17",y:"34",width:"13",height:"32",fill:"#265a8a",rx:"1"}),e.jsx("rect",{x:"32",y:"40",width:"9",height:"26",fill:"#1e3a5f",rx:"1"}),e.jsx("rect",{x:"43",y:"28",width:"15",height:"38",fill:"#265a8a",rx:"1"}),n&&[[6,50],[8,56],[19,40],[22,48],[34,46],[45,34],[48,42],[54,36]].map(([d,p],o)=>{const b="cityFlicker "+(1+o*.2)+"s ease-in-out infinite",u=o*.15+"s";return e.jsx("rect",{x:d,y:p,width:"3",height:"3",fill:"#FFD700",opacity:".8",style:{animation:b,animationDelay:u}},o)}),e.jsx("rect",{x:"5",y:"42",width:"9",height:"3",fill:"#F97316",rx:".5",opacity:n?1:.4}),e.jsx("rect",{x:"18",y:"32",width:"11",height:"3",fill:"#F97316",rx:".5",opacity:n?1:.4}),e.jsx("rect",{x:"33",y:"38",width:"7",height:"3",fill:"#F97316",rx:".5",opacity:n?1:.4}),e.jsx("rect",{x:"44",y:"26",width:"13",height:"3",fill:"#F97316",rx:".5",opacity:n?1:.4}),e.jsx("circle",{cx:"32",cy:"11",r:"7",fill:"#EAB308",style:t}),n&&e.jsx("circle",{cx:"32",cy:"11",r:"12",stroke:"#EAB308",strokeWidth:"1.5",fill:"none",style:{animation:"wave 2s ease-out infinite"}})]})}function Lt({on:n}){const t={animation:n?"pulse 1.4s ease-in-out infinite":"none",transformOrigin:"center"},d={animation:n?"pulseGlow 1.8s ease-in-out infinite":"none"};return e.jsxs("svg",{width:"64",height:"64",viewBox:"0 0 64 64",fill:"none",children:[e.jsx("path",{d:"M6 62 L32 16 L58 62Z",fill:"#1e3a5f",stroke:"#4a90d9",strokeWidth:"1"}),e.jsx("path",{d:"M24 62 L40 36 L56 62Z",fill:"#142f52"}),e.jsx("path",{d:"M32 16 L27 28 L37 28Z",fill:"white",opacity:".6"}),n&&e.jsx("g",{style:{animation:"mountainGlow 2s ease-in-out infinite"},children:[0,1,2,3].map(p=>{const o="rotate(-22,"+(12+p*9)+","+(52+p*2)+")";return e.jsx("rect",{x:9+p*9,y:50+p*2,width:"6",height:"4",fill:"#F97316",rx:".5",transform:o,opacity:".85"},p)})}),e.jsx("circle",{cx:"54",cy:"13",r:"8",fill:"#F97316",style:{...d,...t}}),n&&[0,45,90,135,180,225,270,315].map(p=>{const o=p*Math.PI/180;return e.jsx("line",{x1:54+10*Math.cos(o),y1:13+10*Math.sin(o),x2:54+15*Math.cos(o),y2:13+15*Math.sin(o),stroke:"#F97316",strokeWidth:"2",strokeLinecap:"round"},p)})]})}function Nt({on:n}){const t={animation:n?"pulse 1.4s ease-in-out infinite":"none",transformOrigin:"center"};return e.jsxs("svg",{width:"64",height:"64",viewBox:"0 0 64 64",fill:"none",children:[e.jsx("circle",{cx:"32",cy:"32",r:"8",fill:"#F97316",style:t}),[0,1,2,3,4,5,6,7].map(d=>{const p=n?"spin "+(3+d*.3)+"s linear infinite":"none";return e.jsx("g",{style:{animation:p,transformOrigin:"32px 32px"},children:e.jsx("circle",{cx:32+22*Math.cos(d/8*2*Math.PI),cy:32+22*Math.sin(d/8*2*Math.PI),r:d%2===0?4.5:3,fill:d%2===0?"#F97316":"#EAB308",opacity:".85"})},d)}),n&&e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"32",cy:"32",r:"14",stroke:"#F97316",strokeWidth:"1",fill:"none",style:{animation:"wave 1.8s ease-out infinite"}}),e.jsx("circle",{cx:"32",cy:"32",r:"14",stroke:"#F97316",strokeWidth:"1",fill:"none",style:{animation:"wave 1.8s ease-out infinite",animationDelay:".6s"}})]})]})}function Wt({on:n}){return e.jsxs("svg",{width:"64",height:"64",viewBox:"0 0 64 64",fill:"none",children:[e.jsx("circle",{cx:"32",cy:"32",r:"6",fill:"#F97316"}),n?[1,2,3].map(t=>{const d="sonarWave "+t*.65+"s ease-out infinite",p=t*.26+"s";return e.jsx("circle",{cx:"32",cy:"32",r:"6",stroke:"#F97316",strokeWidth:2.5-t*.4,fill:"none",style:{animation:d,animationDelay:p}},t)}):[1,2,3].map(t=>e.jsx("circle",{cx:"32",cy:"32",r:6+t*9,stroke:"#F97316",strokeWidth:2-t*.4,fill:"none",opacity:.35-t*.08},t)),e.jsx("path",{d:"M4 32 H18 L22 22 L26 42 L30 30 L34 32 H60",stroke:n?"#EAB308":"#F97316",strokeWidth:"1.5",fill:"none",opacity:n?1:.4,style:n?{animation:"pulse 1s ease-in-out infinite",transformOrigin:"32px 32px"}:{}})]})}function Ht({on:n}){const t={animation:n?"pulse 1.4s ease-in-out infinite":"none",transformOrigin:"center"},d={animation:n?"pulseGlow 1.8s ease-in-out infinite":"none"};return e.jsxs("svg",{width:"64",height:"64",viewBox:"0 0 64 64",fill:"none",children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"pg2",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#4a90d9",stopOpacity:".4"}),e.jsx("stop",{offset:"100%",stopColor:"#F97316",stopOpacity:".4"})]})}),e.jsx("path",{d:"M32 6 L62 58 L2 58Z",stroke:"#4a90d9",strokeWidth:"2",fill:"url(#pg2)"}),n&&["#FF4444","#FF9900","#FFD700","#44FF44","#4499FF","#AA44FF"].map((p,o)=>{const b=o*.09+"s";return e.jsx("line",{x1:"32",y1:"14",x2:2+o*12,y2:"58",stroke:p,strokeWidth:"2",opacity:".7",style:{animation:"prismRay .6s ease forwards",animationDelay:b,transformOrigin:"32px 14px"}},o)}),e.jsx("circle",{cx:"32",cy:"8",r:"6",fill:"#F97316",style:{...t,...d}})]})}function qt({on:n}){const t={animation:n?"pulse 1.4s ease-in-out infinite":"none",transformOrigin:"center"},d={animation:n?"spinR 5s linear infinite":"none",transformOrigin:"24px 32px"},p={animation:n?"spin 5s linear infinite":"none",transformOrigin:"40px 32px"};return e.jsxs("svg",{width:"64",height:"64",viewBox:"0 0 64 64",fill:"none",children:[e.jsx("circle",{cx:"24",cy:"32",r:"16",stroke:"#1e3a5f",strokeWidth:"2",fill:"none",style:d}),e.jsx("circle",{cx:"40",cy:"32",r:"16",stroke:"#F97316",strokeWidth:"2",fill:"none",style:p}),e.jsx("path",{d:"M32 19 Q40 25 40 32 Q40 39 32 45 Q24 39 24 32 Q24 25 32 19Z",fill:"#F97316",opacity:n?.45:.2}),e.jsx("circle",{cx:"32",cy:"32",r:"6",fill:"#F97316",style:t}),n&&e.jsx("circle",{cx:"32",cy:"32",r:"10",stroke:"#EAB308",strokeWidth:"1",fill:"none",style:{animation:"wave 2s ease-out infinite"}})]})}function Qt({type:n,on:t}){return n==="orbital"?e.jsx(zt,{on:t}):n==="sunny"?e.jsx(Ft,{on:t}):n==="tracker"?e.jsx(Ot,{on:t}):n==="city"?e.jsx(It,{on:t}):n==="mountain"?e.jsx(Lt,{on:t}):n==="swarm"?e.jsx(Nt,{on:t}):n==="pulse"?e.jsx(Wt,{on:t}):n==="prism"?e.jsx(Ht,{on:t}):n==="unity"?e.jsx(qt,{on:t}):null}function Gt({phase:n,prog:t}){const d=t+"%";return e.jsxs("div",{style:{position:"fixed",inset:0,zIndex:1e3,overflow:"hidden",background:"#010108"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:"50%",background:"#010108",zIndex:20,transition:"transform .95s cubic-bezier(.76,0,.24,1)",transform:n>=5?"translateY(-102%)":"translateY(0)"}}),e.jsx("div",{style:{position:"absolute",top:"50%",left:0,right:0,bottom:0,background:"#010108",zIndex:20,transition:"transform .95s cubic-bezier(.76,0,.24,1)",transform:n>=5?"translateY(102%)":"translateY(0)"}}),n>=1&&e.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,height:"40%",zIndex:2,opacity:Ee((n-1)*.7,0,1),transition:"opacity .8s"},children:e.jsxs("svg",{viewBox:"0 0 1200 280",preserveAspectRatio:"xMidYMax slice",style:{width:"100%",height:"100%"},children:[e.jsx("rect",{width:"1200",height:"280",fill:"#8a7248"}),e.jsx("path",{d:"M 28,20 L 300,14 L 308,0 L 660,0 L 658,16 L 720,8 L 1070,4 L 1078,200 L 725,205 L 610,240 L 86,245 L 30,200 Z",fill:"rgba(180,68,24,0.75)"}),Ye.map((o,b)=>{const u=o.trim().split(/\s+/).map(j=>{const C=j.split(",");return C[0]+","+Math.max(0,parseFloat(C[1])-440)}).join(" ");return e.jsx("polygon",{points:u,fill:"rgba(0,0,0,.55)",stroke:"rgba(200,80,24,.4)",strokeWidth:"1.5"},b)})]})}),n>=1&&e.jsx("div",{style:{position:"absolute",bottom:"30%",left:0,right:0,height:"30%",background:"radial-gradient(ellipse 80% 60% at 50% 100%,rgba(249,115,22,.32) 0%,transparent 70%)",zIndex:3,opacity:n>=4?0:1,transition:"opacity .5s"}}),n>=1&&e.jsx("div",{style:{position:"absolute",left:"50%",bottom:"33%",zIndex:4,transform:"translateX(-50%)",opacity:n>=4?0:1,transition:"opacity .4s"},children:e.jsx("div",{style:{width:86,height:86,borderRadius:"50%",background:"radial-gradient(circle at 38% 32%,#FFE082,#F97316)",animation:"glowPulse 2s ease-in-out infinite",position:"relative",boxShadow:"0 0 60px 30px rgba(249,115,22,.4)"},children:n>=2&&[0,30,60,90,120,150,180,210,240,270,300,330].map(o=>{const b="linear-gradient(to bottom,"+(o%60===0?"#EAB308":"#F97316")+",transparent)",u="translate(-50%,43px) rotate("+o+"deg)",j=o/360*.4+"s";return e.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",width:2,height:48,background:b,transformOrigin:"top center",transform:u,animation:"rayIn .55s ease forwards",animationDelay:j,opacity:0}},o)})})}),n>=2&&e.jsx("div",{style:{position:"absolute",bottom:"52%",left:0,right:0,display:"flex",justifyContent:"center",gap:5,zIndex:5,opacity:n>=4?0:1,transition:"opacity .4s"},children:"SUNRISE".split("").map((o,b)=>{const u=.35+b*.06+"s";return e.jsx("span",{style:{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(42px,9vw,98px)",color:"#F5F0EB",display:"inline-block",animation:"letterIn .55s cubic-bezier(.34,1.56,.64,1) forwards",animationDelay:u,opacity:0,textShadow:"0 0 40px rgba(249,115,22,.7)"},children:o},b)})}),n>=2&&e.jsx("div",{style:{position:"absolute",bottom:"46%",left:0,right:0,textAlign:"center",zIndex:5,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(11px,1.8vw,15px)",letterSpacing:".36em",color:"#F97316",textTransform:"uppercase",animation:"subIn .8s ease .5s both",opacity:n>=4?0:1,transition:"opacity .4s"},children:"CONSTRUCTION & DEVELOPMENT"}),n>=3&&e.jsxs("div",{style:{position:"absolute",bottom:"30%",left:"50%",transform:"translateX(-50%)",width:"min(440px,72vw)",zIndex:5,opacity:n>=4?0:1,transition:"opacity .4s"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:".2em",color:"#ccc",textShadow:"0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)",textTransform:"uppercase",marginBottom:9},children:[e.jsx("span",{children:"Deploying Solar Field"}),e.jsxs("span",{style:{color:"#F97316",fontWeight:700},children:[Math.round(t),"%"]})]}),e.jsxs("div",{style:{height:3,background:"rgba(255,255,255,.07)",borderRadius:2,overflow:"hidden",position:"relative"},children:[e.jsx("div",{style:{position:"absolute",inset:"0 auto 0 0",width:d,background:"linear-gradient(to right,#F97316,#EAB308)",transition:"width .1s",boxShadow:"0 0 14px rgba(249,115,22,.9)"}}),e.jsx("div",{style:{position:"absolute",inset:"0 auto 0 0",width:"36%",background:"linear-gradient(to right,transparent,rgba(255,255,255,.35),transparent)",animation:"shimmer 1.6s ease-in-out infinite"}})]}),e.jsx("div",{style:{display:"flex",gap:18,marginTop:10,fontFamily:"'Barlow Condensed',sans-serif",fontSize:10,letterSpacing:".18em",textTransform:"uppercase"},children:["Piles","Trackers","Modules","Electrical"].map((o,b)=>e.jsxs("span",{style:{color:t>b*22+12?"#F97316":"#333",transition:"color .4s"},children:[t>b*22+12?"✓ ":"",o]},o))})]}),n>=4&&e.jsx("div",{style:{position:"absolute",bottom:"24%",left:0,right:0,textAlign:"center",zIndex:5,fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,letterSpacing:".3em",color:"#22C55E",textTransform:"uppercase",opacity:n>=5?0:1,transition:"opacity .3s"},children:"⬤  SOLAR FIELD ONLINE"})]})}function Ut({p:n,i:t}){const[d,p]=x.useState(!1),[o,b]=x.useState(!1),u=x.useRef();return x.useEffect(()=>{const j=new IntersectionObserver(([C])=>{C.isIntersecting&&(b(!0),j.disconnect())},{threshold:.15});return u.current&&j.observe(u.current),()=>j.disconnect()},[]),e.jsxs("div",{ref:u,onMouseEnter:()=>p(!0),onMouseLeave:()=>p(!1),onClick:()=>p(j=>!j),style:{background:d?"rgba(249,115,22,.07)":"rgba(8,8,20,.22)",backdropFilter:"blur(14px)",borderLeft:"3px solid "+(d?v:"rgba(249,115,22,.2)"),border:"1px solid rgba(255,255,255,.05)",borderLeftWidth:3,borderLeftColor:d?v:"rgba(249,115,22,.2)",padding:"30px 26px",cursor:"pointer",transition:"all .35s cubic-bezier(.34,1.56,.64,1)",transform:o?d?"translateX(4px)":"translateX(0)":"translateX(-18px)",opacity:o?1:0,transitionDelay:t*.06+"s",position:"relative",overflow:"hidden"},children:[d&&e.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(135deg,transparent 35%,rgba(249,115,22,.06) 50%,transparent 65%)",animation:"shimmer 1.5s ease-in-out infinite"}}),e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",width:78,height:78,marginBottom:14,background:d?"rgba(249,115,22,.13)":"rgba(255,255,255,.03)",border:"1px solid "+(d?"rgba(249,115,22,.5)":"rgba(249,115,22,.15)"),transition:"all .3s",clipPath:"polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)"},children:e.jsx(Qt,{type:n.icon,on:d})}),e.jsxs("div",{style:{fontFamily:"'Bebas Neue',sans-serif",fontSize:40,color:d?v:"#F5F0EB",lineHeight:1,transition:"color .3s"},children:[n.mw,e.jsx("span",{style:{fontSize:19,color:"rgba(245,240,235,.45)"},children:"MW"})]}),e.jsx("div",{style:{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",margin:"9px 0 4px",color:"#F5F0EB"},children:n.name}),e.jsx("div",{style:{fontSize:12,color:"#ccc",textShadow:"0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"1.5px"},children:n.loc}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginTop:16,paddingTop:14,borderTop:"1px solid rgba(255,255,255,.06)"},children:[e.jsx("div",{style:{flex:1,height:3,background:"rgba(249,115,22,.1)",borderRadius:2,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",background:"linear-gradient(to right,#F97316,#EAB308)",width:o?n.fill*100+"%":0,transition:"width 1.2s ease",transitionDelay:.3+t*.07+"s"}})}),e.jsxs("span",{style:{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:"1.5px",textTransform:"uppercase",color:"#ccc",textShadow:"0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)",whiteSpace:"nowrap"},children:[n.mods," Modules"]})]})]})}function Yt({c:n,ci:t}){const[d,p]=x.useState(!1);return e.jsxs("div",{onMouseEnter:()=>p(!0),onMouseLeave:()=>p(!1),style:{background:d?"rgba(249,115,22,.07)":"rgba(8,8,20,.18)",backdropFilter:"blur(14px)",padding:"48px 36px",position:"relative",overflow:"hidden",transition:"transform .4s cubic-bezier(.34,1.56,.64,1)",transform:d?"translateY(-5px)":"translateY(0)",border:"1px solid rgba(255,255,255,.05)",borderBottom:"3px solid "+(d?v:"transparent")},children:[e.jsx("div",{style:{fontFamily:"'Bebas Neue',sans-serif",fontSize:75,color:"rgba(249,115,22,"+(d?.16:.05)+")",lineHeight:1,position:"absolute",top:16,right:22,transition:"color .4s"},children:n.n}),e.jsx("div",{style:{width:48,height:48,background:"rgba(249,115,22,.1)",border:"1px solid rgba(249,115,22,.22)",display:"flex",alignItems:"center",justifyContent:"center",clipPath:"polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",marginBottom:24},children:e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:v,strokeWidth:"1.5",children:[t===0&&e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M9 12l2 2 4-4"}),e.jsx("circle",{cx:"12",cy:"12",r:"9"})]}),t===1&&e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),e.jsx("circle",{cx:"9",cy:"7",r:"4"}),e.jsx("path",{d:"M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"})]}),t===2&&e.jsxs(e.Fragment,{children:[e.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}),e.jsx("path",{d:"M8 21h8M12 17v4"})]})]})}),e.jsx("div",{style:{fontFamily:"'Barlow Condensed',sans-serif",fontSize:19,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",marginBottom:12},children:n.t}),e.jsx("p",{style:{fontSize:15,fontWeight:300,color:"#777",lineHeight:1.7},children:n.b})]})}const Jt=[{n:"01",t:"ISNet Compliance",b:"Full ISNetworld compliance ensuring safety protocols, training records, and insurance coverage meet the most stringent standards for utility-scale solar."},{n:"02",t:"Apprenticeship Enabled",b:"Certified apprenticeship programs combining site experience with technical training to build skilled local labor pools for every region we operate."},{n:"03",t:"EPC Subcontracting",b:"Precision tracking installation, pile driving, and mechanical assembly for utility-scale EPCs with industry-leading accuracy and zero schedule slippage."}],Vt=[{mw:"210",name:"Grimes Solar",loc:"Iola, TX",mods:"500,000",fill:1,icon:"orbital"},{mw:"135",name:"Happy Solar",loc:"White County, AR",mods:"285,000",fill:.57,icon:"sunny"},{mw:"80",name:"Grasshopper Solar",loc:"Chase City, VA",mods:"78,000",fill:.16,icon:"tracker"},{mw:"50",name:"Salt City Solar",loc:"Ross County, OH",mods:"125,000",fill:.25,icon:"city"},{mw:"50",name:"Whitehorn Solar",loc:"Gretna, VA",mods:"180,000",fill:.36,icon:"mountain"},{mw:"6.7",name:"Locust Solar",loc:"Cortland, NY",mods:"15,000",fill:.03,icon:"swarm"},{mw:"4.8",name:"Remsen Solar",loc:"E. Syracuse, NY",mods:"10,000",fill:.02,icon:"pulse"},{mw:"4.4",name:"Taft Solar",loc:"E. Syracuse, NY",mods:"10,000",fill:.02,icon:"prism"},{mw:"2.93",name:"Union Solar",loc:"Union, ME",mods:"8,000",fill:.016,icon:"unity"}];function Pe({children:n,id:t,style:d={}}){const p=x.useRef(),[o,b]=x.useState(!1);return x.useEffect(()=>{const u=new IntersectionObserver(([j])=>{j.isIntersecting&&(b(!0),u.disconnect())},{threshold:.06});return p.current&&u.observe(p.current),()=>u.disconnect()},[]),e.jsx("section",{id:t,ref:p,style:{position:"relative",zIndex:5,padding:"clamp(36px,6vw,96px) clamp(14px,4vw,48px)",transition:"opacity .8s,transform .8s",opacity:o?1:0,transform:o?"translateY(0)":"translateY(28px)",color:"#F5F0EB",...d},children:n})}const ge="#f5c518",Xt="#c9a000",Le="'Agency FB','Arial Narrow',sans-serif",et=window.storage||{get:async()=>null,set:async()=>null,delete:async()=>null,list:async()=>({keys:[]})},te=()=>Math.random().toString(36).slice(2,10),it=()=>new Date().toISOString();async function _(n){try{const t=await et.get(n);return t?JSON.parse(t.value):null}catch{return null}}async function Y(n,t){try{await et.set(n,JSON.stringify(t))}catch(d){console.error("storage set error",d)}}const Je=["#e74c3c","#3498db","#2ecc71","#9b59b6","#e67e22","#1abc9c","#34495e","#f39c12"];function at({toasts:n,remove:t}){return e.jsx("div",{style:{position:"fixed",top:16,right:16,zIndex:9999,display:"flex",flexDirection:"column",gap:8},children:n.map(d=>e.jsxs("div",{style:{background:d.type==="error"?"#dc2626":d.type==="warning"?"#d97706":"#16a34a",color:"#fff",padding:"12px 20px",borderRadius:6,fontFamily:Le,fontSize:14,display:"flex",alignItems:"center",gap:10,boxShadow:"0 4px 20px rgba(0,0,0,.3)",animation:"slideIn .3s ease",minWidth:250},children:[e.jsx("span",{style:{flex:1},children:d.msg}),e.jsx(gt,{size:16,style:{cursor:"pointer",opacity:.7},onClick:()=>t(d.id)})]},d.id))})}function Kt(){const[n,t]=x.useState([]),d=x.useCallback((o,b="info")=>{const u=te();t(j=>[...j,{id:u,msg:o,type:b}]),setTimeout(()=>t(j=>j.filter(C=>C.id!==u)),5e3)},[]),p=x.useCallback(o=>t(b=>b.filter(u=>u.id!==o)),[]);return{toasts:n,add:d,remove:p}}function Zt({onDone:n}){const[t,d]=x.useState(0);return x.useEffect(()=>{const p=[setTimeout(()=>d(1),400),setTimeout(()=>d(2),1200),setTimeout(()=>d(3),2200),setTimeout(()=>d(4),3400),setTimeout(()=>n(),5e3)];return()=>p.forEach(clearTimeout)},[n]),e.jsxs("div",{style:{position:"fixed",inset:0,background:"#0a0a0a",zIndex:1e4,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:Le},children:[e.jsx(st,{size:64,color:ge,style:{transform:t>=1?"scale(1)":"scale(0)",transition:"transform .8s cubic-bezier(.34,1.56,.64,1)",opacity:t>=1?1:0}}),e.jsxs("div",{style:{marginTop:28,fontSize:36,letterSpacing:6,fontWeight:700,color:"#fff",opacity:t>=2?1:0,transform:t>=2?"translateY(0)":"translateY(20px)",transition:"all .7s ease"},children:["Clear",e.jsx("span",{style:{color:ge},children:"Screen"})," HR"]}),e.jsx("div",{style:{width:200,height:2,background:"#333",marginTop:20,borderRadius:2,overflow:"hidden",opacity:t>=3?1:0,transition:"opacity .4s"},children:e.jsx("div",{style:{width:t>=3?"100%":"0%",height:"100%",background:"linear-gradient(90deg,transparent,"+ge+",transparent)",transition:"width 1.2s ease"}})}),e.jsx("div",{style:{marginTop:24,fontSize:13,letterSpacing:3,color:"#666",opacity:t>=4?1:0,transition:"opacity .8s"},children:"Made by Dustin Hanson"})]})}function _t({profiles:n,onSelect:t,onCreate:d,onDelete:p}){const[o,b]=x.useState(!1),[u,j]=x.useState(""),[C,S]=x.useState(null);return e.jsxs("div",{style:{position:"fixed",inset:0,background:"#0f0f0f",zIndex:9e3,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:Le,padding:20},children:[e.jsx(st,{size:36,color:ge}),e.jsxs("div",{style:{fontSize:28,letterSpacing:4,fontWeight:700,color:"#fff",marginTop:12},children:["Clear",e.jsx("span",{style:{color:ge},children:"Screen"})," HR"]}),e.jsx("div",{style:{fontSize:13,letterSpacing:2,color:"#888",marginTop:6,marginBottom:36},children:"SELECT PROFILE"}),e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:16,justifyContent:"center",maxWidth:600},children:[n.map((s,l)=>e.jsxs("div",{style:{width:m?120:140,background:"#1a1a1a",border:"1px solid #333",borderRadius:8,padding:"20px 16px",textAlign:"center",cursor:"pointer",transition:"all .2s",position:"relative"},onClick:function(){t(s)},onMouseEnter:function(w){w.currentTarget.style.borderColor=ge},onMouseLeave:function(w){w.currentTarget.style.borderColor="#333"},children:[e.jsx("div",{style:{width:48,height:48,borderRadius:"50%",background:Je[l%Je.length],display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px",fontSize:20,fontWeight:700,color:"#fff"},children:s.name.slice(0,2).toUpperCase()}),e.jsx("div",{style:{color:"#fff",fontSize:15,fontWeight:600},children:s.name}),e.jsx("div",{style:{position:"absolute",top:6,right:6,cursor:"pointer",opacity:.4,transition:"opacity .2s"},onClick:function(w){w.stopPropagation(),S(s.id)},onMouseEnter:function(w){w.currentTarget.style.opacity=1},onMouseLeave:function(w){w.currentTarget.style.opacity=.4},children:e.jsx(ut,{size:14,color:"#f66"})}),C===s.id&&e.jsxs("div",{style:{position:"absolute",inset:0,background:"rgba(0,0,0,.9)",borderRadius:8,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8},onClick:function(w){w.stopPropagation()},children:[e.jsx("div",{style:{color:"#f66",fontSize:12,letterSpacing:1},children:"DELETE?"}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx("div",{style:{background:"#f66",color:"#fff",padding:"4px 14px",borderRadius:4,cursor:"pointer",fontSize:12},onClick:function(){p(s.id),S(null)},children:"Yes"}),e.jsx("div",{style:{background:"#333",color:"#fff",padding:"4px 14px",borderRadius:4,cursor:"pointer",fontSize:12},onClick:function(){S(null)},children:"No"})]})]})]},s.id)),e.jsxs("div",{style:{width:m?120:140,background:"#1a1a1a",border:"2px dashed #444",borderRadius:8,padding:"20px 16px",textAlign:"center",cursor:"pointer",transition:"all .2s",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},onClick:function(){b(!0)},onMouseEnter:function(s){s.currentTarget.style.borderColor=ge},onMouseLeave:function(s){s.currentTarget.style.borderColor="#444"},children:[e.jsx(xt,{size:28,color:"#888"}),e.jsx("div",{style:{color:"#888",fontSize:13,marginTop:6},children:"New Profile"})]})]}),o&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9500},onClick:()=>b(!1),children:e.jsxs("div",{style:{background:"#1a1a1a",border:"1px solid #333",borderRadius:8,padding:28,width:"90%",maxWidth:320},onClick:s=>s.stopPropagation(),children:[e.jsx("div",{style:{color:"#fff",fontSize:16,fontWeight:600,marginBottom:16},children:"New Profile"}),e.jsx("input",{value:u,onChange:s=>j(s.target.value),placeholder:"Profile name",style:{width:"100%",background:"#0f0f0f",border:"1px solid #444",color:"#fff",padding:"10px 14px",borderRadius:4,fontSize:14,fontFamily:Le,outline:"none",boxSizing:"border-box"},autoFocus:!0,onKeyDown:s=>{s.key==="Enter"&&u.trim()&&(d(u.trim()),j(""),b(!1))}}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:16},children:[e.jsx("div",{style:{flex:1,background:ge,color:"#000",padding:"10px 0",borderRadius:4,textAlign:"center",cursor:"pointer",fontWeight:700,fontSize:13},onClick:()=>{u.trim()&&(d(u.trim()),j(""),b(!1))},children:"Create"}),e.jsx("div",{style:{flex:1,background:"#333",color:"#fff",padding:"10px 0",borderRadius:4,textAlign:"center",cursor:"pointer",fontSize:13},onClick:()=>b(!1),children:"Cancel"})]})]})})]})}const $t=`ClearScreen HR Terms & Conditions

1. Acceptance of Terms: By using ClearScreen HR, you agree to these terms.
2. License: Limited, non-transferable license for internal business use only.
3. Intellectual Property: ClearScreen HR is the exclusive intellectual property of Dustin Hanson and is shared in good faith. Use constitutes acceptance of all Terms & Conditions. This software is provided 'as-is' without warranty of any kind.
4. Data Responsibility: User is solely responsible for data accuracy and compliance.
5. No Legal Advice: This software does not constitute legal or compliance advice.
6. Confidentiality: All employee data must be handled per applicable privacy laws.
7. DOT Compliance: Software assists with but does not guarantee DOT compliance.
8. SAMHSA Guidelines: Random selection uses CSPRNG but user must verify compliance.
9. MRO Process: Software facilitates but does not replace qualified MRO review.
10. Record Retention: User responsible for meeting retention requirements.
11. Data Security: User must implement appropriate access controls.
12. Liability Limitation: No liability for errors, omissions, or compliance failures.
13. Indemnification: User indemnifies developer against all claims.
14. Modifications: Terms may be updated; continued use implies acceptance.
15. Severability: Invalid provisions do not affect remaining terms.
16. Governing Law: Governed by applicable federal and state laws.
17. Dispute Resolution: Disputes resolved through binding arbitration.
18. Export Controls: User must comply with applicable export laws.
19. Third-Party Services: EmailJS integration governed by their own terms.
20. Audit Rights: Developer may audit usage for compliance with these terms.
21. Training: User responsible for training personnel on proper software use.
22. Backup: User responsible for maintaining adequate data backups.
23. Updates: No obligation to provide updates or new features.
24. Support: Support provided at developer's discretion.
25. Termination: License may be terminated for violation of terms.`;function en({onAccept:n}){const[t,d]=x.useState(!1),[p,o]=x.useState(!1);return e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9900,padding:20,fontFamily:Le},children:p?e.jsxs("div",{style:{background:"#fff",borderRadius:8,padding:28,maxWidth:600,maxHeight:"80vh",overflow:"auto",width:"100%"},children:[e.jsx("div",{style:{fontSize:18,fontWeight:700,marginBottom:16},children:"Terms & Conditions"}),e.jsx("pre",{style:{whiteSpace:"pre-wrap",fontSize:13,lineHeight:1.7,color:"#444"},children:$t}),e.jsx("div",{style:{background:ge,color:"#000",padding:"12px 0",borderRadius:4,textAlign:"center",cursor:"pointer",fontWeight:700,marginTop:20},onClick:()=>o(!1),children:"Close"})]}):e.jsxs("div",{style:{background:"#fff",borderRadius:8,padding:28,maxWidth:480,width:"100%"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:16},children:[e.jsx(mt,{size:24,color:"#d97706"}),e.jsx("div",{style:{fontSize:18,fontWeight:700},children:"Important Disclaimer"})]}),e.jsxs("p",{style:{fontSize:14,lineHeight:1.7,color:"#555",marginBottom:16},children:["ClearScreen HR is a screening management tool designed to assist with drug testing program administration. It is ",e.jsx("strong",{children:"not a substitute"})," for legal counsel, qualified MRO review, or official compliance mechanisms."]}),e.jsx("p",{style:{fontSize:14,lineHeight:1.7,color:"#555",marginBottom:20},children:"Users are solely responsible for ensuring compliance with DOT 49 CFR Part 40, SAMHSA guidelines, and all applicable federal, state, and local regulations."}),e.jsxs("label",{style:{display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer",marginBottom:20},children:[e.jsx("input",{type:"checkbox",checked:t,onChange:b=>d(b.target.checked),style:{marginTop:3,accentColor:ge}}),e.jsxs("span",{style:{fontSize:13,color:"#555"},children:["I have read and agree to the ",e.jsx("span",{style:{color:Xt,cursor:"pointer",textDecoration:"underline"},onClick:b=>{b.preventDefault(),o(!0)},children:"Terms & Conditions"})]})]}),e.jsx("div",{style:{background:t?ge:"#ddd",color:t?"#000":"#999",padding:"12px 0",borderRadius:4,textAlign:"center",cursor:t?"pointer":"default",fontWeight:700,fontSize:14,transition:"all .2s"},onClick:()=>t&&n(),children:"Accept & Continue"})]})})}function tn({onExit:n,portalUser:t}){const[d,p]=x.useState(!t),[o,b]=x.useState("profiles"),[u,j]=x.useState([]),[C,S]=x.useState(null),[s,l]=x.useState("dashboard"),[w,a]=x.useState(typeof window<"u"&&window.innerWidth<768),[T,E]=x.useState(!1),[M,O]=x.useState(!1),{toasts:$,add:ae,remove:ne}=Kt(),[G,z]=x.useState([]),[X,se]=x.useState([]),[le,re]=x.useState([]),[ce,q]=x.useState({companyName:"",logo:null,autoEnabled:!1,autoInterval:24,autoUnit:"hours",emailService:"",emailTemplate:"",emailKey:""}),[je,de]=x.useState(!1),[K,pe]=x.useState(""),[be,I]=x.useState("all"),[ee,Q]=x.useState(null),[ue,L]=x.useState(null),[me,fe]=x.useState(null),[Ne,J]=x.useState(new Date().getMonth()),[Ae,Se]=x.useState(new Date().getFullYear()),[we,Te]=x.useState("monthly"),[Re,ie]=x.useState(1),[Me,He]=x.useState(null),[Be,ze]=x.useState(null),[qe,Qe]=x.useState(null),[he,Fe]=x.useState(null);x.useEffect(()=>{const D=()=>a(window.innerWidth<768);return window.addEventListener("resize",D),()=>window.removeEventListener("resize",D)},[]),x.useEffect(function(){_("profiles").then(function(D){var A=D||[];if(j(A),t&&!C){var U=A.find(function(W){return W.name===t});if(U)S(U),l("dashboard");else{var N={id:te(),name:t,color:"#F97316"},H=A.concat([N]);j(H),Y("profiles",H),S(N),l("dashboard")}}})},[]),x.useEffect(()=>{if(!C)return;const D=C.id;Promise.all([_("profile_"+D+"_employees"),_("profile_"+D+"_screenings"),_("profile_"+D+"_drugtests"),_("profile_"+D+"_settings"),_("profile_"+D+"_accepted")]).then(function(A){var U=A[0],N=A[1],H=A[2],W=A[3],r=A[4];z(U||[]),se(N||[]),re(H||[]),W&&q(function(h){return Object.assign({},h,W)}),de(!!r),t?(de(!0),b("app"),Y("profile_"+D+"_accepted",!0)):b(r?"app":"disclaimer")}).catch(function(A){console.error("load err",A),b(t?"app":"disclaimer")})},[C]);const oe=C&&C.id?C.id:null,xe=D=>{se(D),oe&&Y("profile_"+oe+"_screenings",D)},Oe=D=>{re(D),oe&&Y("profile_"+oe+"_drugtests",D)},De=D=>{const A={id:te(),name:D,color:Je[u.length%Je.length]},U=[...u,A];j(U),Y("profiles",U),ae("Profile created","info")},ke=D=>{const A=u.filter(U=>U.id!==D);j(A),Y("profiles",A),["employees","screenings","drugtests","settings","accepted"].forEach(U=>et.delete("profile_"+D+"_"+U)),ae("Profile deleted","warning")},R=function(D){S(D),l("dashboard")};x.useEffect(()=>{if(!ce.autoEnabled||!oe)return;const D={minutes:6e4,hours:36e5,days:864e5,weeks:6048e5}[ce.autoUnit]||36e5,A=ce.autoInterval*D,U=setInterval(()=>{const N=G.filter(i=>!i.exempt);if(N.length===0)return;const H=new Uint32Array(1);crypto.getRandomValues(H);const W=N[H[0]%N.length],r={id:te(),employeeId:W.id,employeeName:W.name,type:"random",status:"open",date:it(),result:null,signature:null,notes:"",mroNotes:"",auto:!0},h={id:te(),employeeId:W.id,employeeName:W.name,type:"random",date:it(),scheduledDate:null,result:"pending",mroNotes:"",auto:!0,screeningId:r.id};xe([...X,r]),Oe([...le,h]),ae("Auto-scheduled: "+W.name,"info")},A);return()=>clearInterval(U)},[ce.autoEnabled,ce.autoInterval,ce.autoUnit,G,oe]);const g=()=>{de(!0),b("app"),oe&&Y("profile_"+oe+"_accepted",!0)},c="@keyframes spin{to{transform:rotate(360deg)}}@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}";if(G.filter(D=>!D.exempt),le.filter(D=>D.result==="pending"),le.filter(D=>D.result==="pass"),le.filter(D=>D.result==="fail"),X.filter(D=>D.status==="open"||D.status==="in-progress"),X.filter(D=>D.status==="completed"),G.filter(D=>{if(be==="active"&&D.exempt||be==="exempt"&&!D.exempt||be==="management"&&!D.management)return!1;if(K){const A=K.toLowerCase();return(D.name||"").toLowerCase().includes(A)||(D.id||"").toLowerCase().includes(A)||(D.title||"").toLowerCase().includes(A)||(D.department||"").toLowerCase().includes(A)}return!0}),d)return e.jsxs("div",{children:[e.jsx("style",{children:c}),e.jsx(Zt,{onDone:()=>p(!1)})]});if(o==="profiles")return t?e.jsx("div",{style:{position:"fixed",inset:0,background:"#0f0f0f",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:Le,zIndex:9e3},children:e.jsx("div",{style:{color:ge,fontSize:16,letterSpacing:2},children:"Loading profile..."})}):e.jsxs("div",{children:[e.jsx("style",{children:c}),e.jsx(_t,{profiles:u,onSelect:R,onCreate:De,onDelete:ke}),e.jsx(at,{toasts:$,remove:ne})]});if(o==="disclaimer")return e.jsxs("div",{children:[e.jsx("style",{children:c}),e.jsx(en,{onAccept:g}),e.jsx(at,{toasts:$,remove:ne})]})}var Z="#F97316",We="#111",nn="#f4f4f0",ye="'Barlow Condensed','Arial Narrow',sans-serif",ot=["Work Trucks","PD10","ATV/Buggies","Skidsteer W/Forks","Telehandler","MiniEx","Klemm Drill"];function rn({onExit:n,portalUser:t}){var[d,p]=x.useState(function(){if(t)return{id:"portal_"+t,name:t,username:t,accountType:"admin"};try{var i=localStorage.getItem("eq_user");return i?JSON.parse(i):null}catch{return null}}),[o,b]=x.useState([]),[u,j]=x.useState(null),[C,S]=x.useState([]),[s,l]=x.useState([]),[w,a]=x.useState([]),[T,E]=x.useState([]),[M,O]=x.useState("projects"),[$,ae]=x.useState(typeof window<"u"&&window.innerWidth<768),[ne,G]=x.useState(!1),[z,X]=x.useState([]),[se,le]=x.useState(""),[re,ce]=x.useState(""),[q,je]=x.useState(!1),[de,K]=x.useState(""),[pe,be]=x.useState([]),[I,ee]=x.useState(null),[Q,ue]=x.useState(null),[L,me]=x.useState(""),[fe,Ne]=x.useState("#3498db"),[J,Ae]=x.useState("all"),[Se,we]=x.useState(""),[Te,Re]=x.useState("");function ie(i,f){var B=te();X(function(Ce){return Ce.concat([{id:B,msg:i,type:f||"info"}])}),setTimeout(function(){X(function(Ce){return Ce.filter(function(pt){return pt.id!==B})})},4e3)}function Me(i){for(var f=5381,B=0;B<i.length;B++)f=(f<<5)+f+i.charCodeAt(B),f=f&f;return Math.abs(f).toString(36)}x.useEffect(function(){var i=function(){ae(window.innerWidth<768)};return window.addEventListener("resize",i),function(){window.removeEventListener("resize",i)}},[]),x.useEffect(function(){_("eq_projects").then(function(i){b(i||[])}),_("eq_users").then(function(i){be(i||[])})},[]),x.useEffect(function(){u&&(_("eq_equip_"+u.id).then(function(i){S(i||[])}),_("eq_tools_"+u.id).then(function(i){l(i||[])}),_("eq_eqlog_"+u.id).then(function(i){a(i||[])}),_("eq_toollog_"+u.id).then(function(i){E(i||[])}))},[u]);function He(i){b(i),Y("eq_projects",i)}function Be(i){S(i),u&&Y("eq_equip_"+u.id,i)}function ze(i){l(i),u&&Y("eq_tools_"+u.id,i)}function qe(i){a(i),u&&Y("eq_eqlog_"+u.id,i)}function Qe(i){E(i),u&&Y("eq_toollog_"+u.id,i)}function he(i,f){var B={id:te(),date:new Date().toISOString(),user:d?d.name:"Unknown",action:i,item:f.type||f.name||"",detail:JSON.stringify(f)};qe(w.concat([B]))}function Fe(i,f){var B={id:te(),date:new Date().toISOString(),user:d?d.name:"Unknown",action:i,item:f.name||"",serial:f.serial||"",detail:JSON.stringify(f)};Qe(T.concat([B]))}function oe(){K("");var i=pe.find(function(f){return f.username===se&&f.passwordHash===Me(re)});if(!i){K("Invalid credentials");return}p(i),localStorage.setItem("eq_user",JSON.stringify(i))}function xe(){if(K(""),!se.trim()||!re.trim()){K("Fill all fields");return}if(pe.find(function(B){return B.username===se})){K("Username taken");return}var i={id:te(),name:se,username:se,passwordHash:Me(re),createdAt:new Date().toISOString()},f=pe.concat([i]);be(f),Y("eq_users",f),p(i),localStorage.setItem("eq_user",JSON.stringify(i)),ie("Welcome!")}function Oe(){localStorage.removeItem("eq_user"),p(null)}function De(){if(L.trim()){var i={id:te(),name:L.trim(),color:fe,createdAt:new Date().toISOString()};He(o.concat([i])),me(""),ie("Project created")}}function ke(i){var f=!C.find(function(B){return B.id===i.id});f?(Be(C.concat([i])),he("ADDED",i),ie("Equipment added")):(Be(C.map(function(B){return B.id===i.id?i:B})),he("UPDATED",i),ie("Equipment updated")),ee(null)}function R(i){var f=C.find(function(B){return B.id===i});Be(C.filter(function(B){return B.id!==i})),f&&he("REMOVED",f),ie("Removed","warning")}function g(i){var f=!s.find(function(B){return B.id===i.id});f?(ze(s.concat([i])),Fe("ADDED",i),ie("Tool added")):(ze(s.map(function(B){return B.id===i.id?i:B})),Fe("UPDATED",i),ie("Tool updated")),ue(null)}function c(i){var f=i.status==="working"?"broken":"working",B=Object.assign({},i,{status:f,statusChangedAt:new Date().toISOString(),statusChangedBy:d?d.name:"Unknown"});ze(s.map(function(Ce){return Ce.id===i.id?B:Ce})),Fe(f==="broken"?"MARKED BROKEN":"MARKED WORKING",B),ie(i.name+" → "+f)}function D(){try{var i=ve.book_new();ve.book_append_sheet(i,ve.json_to_sheet(C.map(function(f){return{Type:f.type,Qty:f.qty,RentalCompany:f.rental,Rep:f.rep,Phone:f.phone,DayIn:f.dayIn,EstDayOut:f.dayOut,Notes:f.notes||""}})),"Equipment"),ve.book_append_sheet(i,ve.json_to_sheet(s.map(function(f){return{Name:f.name,Serial:f.serial,Cost:f.cost,Acquired:f.acquired,Status:f.status,LastChanged:f.statusChangedAt||"",ChangedBy:f.statusChangedBy||""}})),"Tools & Inventory"),ve.book_append_sheet(i,ve.json_to_sheet(w.map(function(f){return{Date:new Date(f.date).toLocaleString(),User:f.user,Action:f.action,Item:f.item}})),"Equipment Log"),ve.book_append_sheet(i,ve.json_to_sheet(T.map(function(f){return{Date:new Date(f.date).toLocaleString(),User:f.user,Action:f.action,Item:f.item,Serial:f.serial||""}})),"Tooling Log"),yt(i,"EquipmentManager_"+(u?u.name:"export")+".xlsx"),ie("Excel exported")}catch{ie("Export failed","error")}}var A={width:"100%",padding:"10px 12px",border:"1px solid #ddd",borderRadius:4,fontSize:16,fontFamily:ye,outline:"none",boxSizing:"border-box",marginBottom:10},U=new Date().toISOString().slice(0,10);if(!d)return e.jsx("div",{style:{position:"fixed",inset:0,background:We,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:ye,zIndex:2e3},children:e.jsxs("div",{style:{width:"90%",maxWidth:360,background:"#fff",borderRadius:12,padding:m?24:32},children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:24},children:[e.jsx("div",{style:{fontSize:28,fontWeight:700,letterSpacing:3},children:"SRC&D"}),e.jsx("div",{style:{fontSize:12,color:"#888",letterSpacing:2},children:"EQUIPMENT MANAGER"})]}),de&&e.jsx("div",{style:{background:"#fee",color:"#c00",padding:8,borderRadius:4,marginBottom:10,fontSize:13},children:de}),e.jsx("input",{value:se,onChange:function(i){le(i.target.value)},placeholder:"Username",style:A}),e.jsx("input",{type:"password",value:re,onChange:function(i){ce(i.target.value)},placeholder:"Password",style:A,onKeyDown:function(i){i.key==="Enter"&&(q?xe():oe())}}),e.jsx("div",{style:{display:"flex",gap:8},children:e.jsx("div",{onClick:function(){q?xe():oe()},style:{flex:1,padding:12,background:Z,borderRadius:4,textAlign:"center",cursor:"pointer",fontWeight:700,fontSize:14,letterSpacing:2,color:"#fff"},children:q?"SIGN UP":"SIGN IN"})}),e.jsx("div",{style:{textAlign:"center",marginTop:12,fontSize:13,color:"#888"},children:e.jsx("span",{onClick:function(){je(!q),K("")},style:{color:Z,cursor:"pointer"},children:q?"← Back to Login":"Create Account →"})})]})});var N=C.filter(function(i){if(J!=="all"&&i.type!==J)return!1;if(Se){var f=Se.toLowerCase();return(i.type||"").toLowerCase().indexOf(f)>=0||(i.rental||"").toLowerCase().indexOf(f)>=0||(i.rep||"").toLowerCase().indexOf(f)>=0}return!0}),H=s.filter(function(i){if(!Te)return!0;var f=Te.toLowerCase();return(i.name||"").toLowerCase().indexOf(f)>=0||(i.serial||"").toLowerCase().indexOf(f)>=0}),W=C.filter(function(i){return i.dayOut&&i.dayOut<U}),r=[{id:"projects",label:"Projects",ico:"📁"},{id:"equipment",label:"Equipment",ico:"🚜"},{id:"tools",label:"Tools",ico:"🔧"},{id:"records",label:"Records",ico:"📊"}],h=e.jsxs("div",{style:{width:$?260:200,background:We,color:"#fff",display:"flex",flexDirection:"column",flexShrink:0,fontFamily:ye,height:"100%"},children:[e.jsxs("div",{style:{padding:"14px 12px",borderBottom:"1px solid #222"},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",gap:8},children:e.jsx("div",{style:{fontSize:13,fontWeight:700},children:d.name})}),u&&e.jsx("div",{style:{marginTop:8,padding:"4px 8px",background:u.color+"22",borderLeft:"3px solid "+u.color,borderRadius:3,fontSize:11,color:"#ccc"},children:u.name})]}),e.jsx("div",{style:{flex:1,padding:"6px 0"},children:r.map(function(i){return e.jsxs("div",{onClick:function(){O(i.id),G(!1)},style:{display:"flex",alignItems:"center",gap:8,padding:"9px 12px",cursor:"pointer",color:M===i.id?Z:"#aaa",background:M===i.id?"rgba(249,115,22,.08)":"transparent",borderRight:M===i.id?"3px solid "+Z:"3px solid transparent",fontSize:13,letterSpacing:1},children:[e.jsx("span",{children:i.ico}),i.label]},i.id)})}),e.jsxs("div",{style:{padding:10,borderTop:"1px solid #222"},children:[e.jsx("div",{onClick:Oe,style:{padding:"6px 10px",background:"#222",borderRadius:4,textAlign:"center",cursor:"pointer",fontSize:11,color:"#aaa",marginBottom:4},children:"Sign Out"}),n&&e.jsx("div",{onClick:n,style:{padding:"6px 10px",background:"#333",borderRadius:4,textAlign:"center",cursor:"pointer",fontSize:11,color:"#aaa"},children:"✕ Exit"})]})]});return e.jsxs("div",{style:{position:"fixed",inset:0,display:"flex",fontFamily:ye,overflow:"hidden",background:nn,zIndex:2e3},children:[!$&&h,e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"},children:[e.jsxs("div",{style:{background:We,color:"#fff",padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[$&&e.jsx("span",{onClick:function(){G(!0)},style:{fontSize:20,cursor:"pointer"},children:"☰"}),e.jsx("span",{style:{fontWeight:700,letterSpacing:2,fontSize:14},children:(r.find(function(i){return i.id===M})||{label:""}).label.toUpperCase()})]}),e.jsx("div",{style:{display:"flex",gap:6,alignItems:"center"},children:u&&M!=="projects"&&e.jsx("div",{onClick:D,style:{padding:"4px 10px",background:"#222",borderRadius:3,cursor:"pointer",fontSize:10,color:"#aaa",letterSpacing:1},children:"Export XLSX"})})]}),e.jsxs("div",{style:{flex:1,overflow:"auto",padding:$?12:"20px 28px"},children:[M==="projects"&&e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:22,fontWeight:700,letterSpacing:2,marginBottom:16},children:"PROJECTS"}),e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:16},children:[e.jsx("input",{value:L,onChange:function(i){me(i.target.value)},placeholder:"New project",style:{flex:1,padding:"8px 12px",border:"1px solid #ddd",borderRadius:4,fontSize:13,fontFamily:ye,outline:"none"},onKeyDown:function(i){i.key==="Enter"&&De()}}),e.jsx("input",{type:"color",value:fe,onChange:function(i){Ne(i.target.value)},style:{width:38,height:38,border:"none",cursor:"pointer",borderRadius:4}}),e.jsx("div",{onClick:De,style:{padding:"8px 16px",background:Z,color:"#fff",borderRadius:4,cursor:"pointer",fontWeight:700,fontSize:12},children:"+ CREATE"})]}),o.map(function(i){return e.jsxs("div",{onClick:function(){j(i),O("equipment")},style:{background:"#fff",borderRadius:8,padding:16,marginBottom:8,cursor:"pointer",borderLeft:"4px solid "+i.color,transition:"transform .15s"},onMouseEnter:function(f){f.currentTarget.style.transform="translateY(-2px)"},onMouseLeave:function(f){f.currentTarget.style.transform="translateY(0)"},children:[e.jsx("div",{style:{fontWeight:700,fontSize:15},children:i.name}),e.jsxs("div",{style:{fontSize:11,color:"#888",marginTop:4},children:["Created ",new Date(i.createdAt).toLocaleDateString()]})]},i.id)}),o.length===0&&e.jsx("div",{style:{textAlign:"center",padding:30,color:"#aaa"},children:"No projects yet"})]}),M==="equipment"&&!u&&e.jsxs("div",{style:{textAlign:"center",padding:40,color:"#888"},children:["Select a project",e.jsx("br",{}),e.jsx("span",{onClick:function(){O("projects")},style:{color:Z,cursor:"pointer"},children:"← Projects"})]}),M==="equipment"&&u&&e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8},children:[e.jsxs("div",{style:{fontSize:22,fontWeight:700,letterSpacing:2},children:[u.name," — EQUIPMENT"]}),e.jsx("div",{onClick:function(){ee({id:te(),type:"Work Trucks",qty:1,rental:"",rep:"",phone:"",dayIn:U,dayOut:"",notes:""})},style:{padding:"8px 16px",background:Z,color:"#fff",borderRadius:4,cursor:"pointer",fontWeight:700,fontSize:12},children:"+ Add Equipment"})]}),W.length>0&&e.jsxs("div",{style:{background:"#fee",border:"1px solid #fcc",borderRadius:6,padding:"10px 14px",marginBottom:12,fontSize:13,color:"#c00",display:"flex",alignItems:"center",gap:8},children:["⚠ ",W.length," equipment past estimated day out"]}),e.jsxs("div",{style:{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"},children:[e.jsx("input",{value:Se,onChange:function(i){we(i.target.value)},placeholder:"Search...",style:{flex:1,minWidth:150,padding:"7px 10px",border:"1px solid #ddd",borderRadius:4,fontSize:12,fontFamily:ye,outline:"none"}}),e.jsx("div",{onClick:function(){Ae("all")},style:{padding:"6px 12px",borderRadius:4,fontSize:11,fontWeight:600,cursor:"pointer",background:J==="all"?Z:"#fff",color:J==="all"?"#fff":"#666",border:"1px solid "+(J==="all"?Z:"#ddd")},children:"All"}),ot.map(function(i){return e.jsx("div",{onClick:function(){Ae(J===i?"all":i)},style:{padding:"6px 10px",borderRadius:4,fontSize:11,fontWeight:600,cursor:"pointer",background:J===i?Z:"#fff",color:J===i?"#fff":"#666",border:"1px solid "+(J===i?Z:"#ddd")},children:i},i)})]}),N.map(function(i){var f=i.dayOut&&i.dayOut<U;return e.jsxs("div",{style:{background:"#fff",borderRadius:6,padding:"12px 16px",marginBottom:6,borderLeft:"3px solid "+(f?"#ef4444":Z)},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:6},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{fontWeight:700,fontSize:14},children:[i.type," ",e.jsxs("span",{style:{fontWeight:400,color:"#888"},children:["× ",i.qty]})]}),e.jsxs("div",{style:{fontSize:12,color:"#555",marginTop:2},children:[i.rental," · ",i.rep," · ",i.phone]}),e.jsxs("div",{style:{fontSize:11,color:"#888",marginTop:2},children:["In: ",i.dayIn," → Out: ",i.dayOut||"TBD",f&&e.jsx("span",{style:{color:"#ef4444",fontWeight:700},children:" OVERDUE"})]})]}),e.jsxs("div",{style:{display:"flex",gap:4},children:[e.jsx("div",{onClick:function(){ee(Object.assign({},i))},style:{padding:"4px 10px",background:"#f0f0ec",borderRadius:3,cursor:"pointer",fontSize:10,fontWeight:600},children:"Edit"}),e.jsx("div",{onClick:function(){R(i.id)},style:{padding:"4px 10px",background:"#fee",color:"#c00",borderRadius:3,cursor:"pointer",fontSize:10},children:"Remove"})]})]}),i.notes&&e.jsxs("div",{style:{fontSize:11,color:"#888",marginTop:4},children:["Notes: ",i.notes]})]},i.id)}),N.length===0&&e.jsx("div",{style:{background:"#fff",borderRadius:6,padding:20,color:"#aaa",textAlign:"center"},children:"No equipment"})]}),M==="tools"&&!u&&e.jsxs("div",{style:{textAlign:"center",padding:40,color:"#888"},children:["Select a project",e.jsx("br",{}),e.jsx("span",{onClick:function(){O("projects")},style:{color:Z,cursor:"pointer"},children:"← Projects"})]}),M==="tools"&&u&&e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8},children:[e.jsx("div",{style:{fontSize:22,fontWeight:700,letterSpacing:2},children:"TOOLS & INVENTORY"}),e.jsx("div",{onClick:function(){ue({id:te(),name:"",serial:"",cost:"",acquired:U,status:"working",statusChangedAt:"",statusChangedBy:""})},style:{padding:"8px 16px",background:Z,color:"#fff",borderRadius:4,cursor:"pointer",fontWeight:700,fontSize:12},children:"+ Add Tool"})]}),e.jsx("input",{value:Te,onChange:function(i){Re(i.target.value)},placeholder:"Search tools...",style:{width:"100%",padding:"8px 12px",border:"1px solid #ddd",borderRadius:4,fontSize:12,fontFamily:ye,outline:"none",marginBottom:12,boxSizing:"border-box"}}),H.map(function(i){return e.jsx("div",{style:{background:"#fff",borderRadius:6,padding:"12px 16px",marginBottom:6,borderLeft:"3px solid "+(i.status==="working"?"#22c55e":"#ef4444")},children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:6},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:14},children:i.name}),e.jsxs("div",{style:{fontSize:12,color:"#555",marginTop:2},children:["SN: ",i.serial," · $",i.cost," · Acquired: ",i.acquired]}),i.statusChangedAt&&e.jsxs("div",{style:{fontSize:10,color:"#888",marginTop:2},children:["Status changed: ",new Date(i.statusChangedAt).toLocaleString()," by ",i.statusChangedBy]})]}),e.jsxs("div",{style:{display:"flex",gap:4,alignItems:"center"},children:[e.jsx("div",{onClick:function(){c(i)},style:{padding:"4px 12px",borderRadius:3,cursor:"pointer",fontSize:11,fontWeight:700,background:i.status==="working"?"#dcfce7":"#fee",color:i.status==="working"?"#16a34a":"#dc2626"},children:i.status==="working"?"✓ Working":"✕ Broken"}),e.jsx("div",{onClick:function(){ue(Object.assign({},i))},style:{padding:"4px 10px",background:"#f0f0ec",borderRadius:3,cursor:"pointer",fontSize:10},children:"Edit"})]})]})},i.id)}),H.length===0&&e.jsx("div",{style:{background:"#fff",borderRadius:6,padding:20,color:"#aaa",textAlign:"center"},children:"No tools"})]}),M==="records"&&e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:8},children:[e.jsx("div",{style:{fontSize:22,fontWeight:700,letterSpacing:2},children:"RECORDS & LOGS"}),u&&e.jsx("div",{onClick:D,style:{padding:"8px 16px",background:Z,color:"#fff",borderRadius:4,cursor:"pointer",fontWeight:700,fontSize:12},children:"📊 Export XLSX"})]}),!u&&e.jsx("div",{style:{color:"#888",textAlign:"center",padding:20},children:"Select a project first"}),u&&e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:16,fontWeight:700,letterSpacing:1,marginBottom:8},children:["EQUIPMENT LOG (",w.length,")"]}),e.jsxs("div",{style:{background:"#fff",borderRadius:6,overflow:"hidden",marginBottom:20},children:[w.slice().reverse().slice(0,30).map(function(i){return e.jsxs("div",{style:{padding:"8px 12px",borderBottom:"1px solid #f0f0ec",fontSize:12,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4},children:[e.jsxs("div",{children:[e.jsx("span",{style:{fontWeight:600},children:i.action})," — ",i.item]}),e.jsxs("div",{style:{color:"#888"},children:[i.user," · ",new Date(i.date).toLocaleString()]})]},i.id)}),w.length===0&&e.jsx("div",{style:{padding:16,color:"#aaa",textAlign:"center"},children:"No equipment logs"})]}),e.jsxs("div",{style:{fontSize:16,fontWeight:700,letterSpacing:1,marginBottom:8},children:["TOOLING LOG (",T.length,")"]}),e.jsxs("div",{style:{background:"#fff",borderRadius:6,overflow:"hidden"},children:[T.slice().reverse().slice(0,30).map(function(i){return e.jsxs("div",{style:{padding:"8px 12px",borderBottom:"1px solid #f0f0ec",fontSize:12,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4},children:[e.jsxs("div",{children:[e.jsx("span",{style:{fontWeight:600},children:i.action})," — ",i.item,i.serial?" ("+i.serial+")":""]}),e.jsxs("div",{style:{color:"#888"},children:[i.user," · ",new Date(i.date).toLocaleString()]})]},i.id)}),T.length===0&&e.jsx("div",{style:{padding:16,color:"#aaa",textAlign:"center"},children:"No tooling logs"})]})]})]})]}),$&&e.jsx("div",{style:{background:We,display:"flex",justifyContent:"space-around",padding:"8px 0",borderTop:"1px solid #222",flexShrink:0},children:r.map(function(i){return e.jsxs("div",{onClick:function(){O(i.id)},style:{display:"flex",flexDirection:"column",alignItems:"center",gap:1,cursor:"pointer",color:M===i.id?Z:"#888",fontSize:9},children:[e.jsx("span",{style:{fontSize:16},children:i.ico}),i.label]},i.id)})})]}),$&&ne&&e.jsxs("div",{children:[e.jsx("div",{onClick:function(){G(!1)},style:{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:900}}),e.jsx("div",{style:{position:"fixed",top:0,left:0,bottom:0,width:260,zIndex:901,background:We},children:h})]}),I&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:7e3,padding:16},children:e.jsxs("div",{style:{background:"#fff",borderRadius:10,padding:20,width:"95vw",maxWidth:460,maxHeight:"85vh",overflow:"auto",fontFamily:ye},onClick:function(i){i.stopPropagation()},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:14},children:[e.jsx("div",{style:{fontSize:16,fontWeight:700},children:C.find(function(i){return i.id===I.id})?"Edit Equipment":"Add Equipment"}),e.jsx("span",{onClick:function(){ee(null)},style:{cursor:"pointer",color:"#888",fontSize:18},children:"✕"})]}),e.jsx("div",{style:{fontSize:10,letterSpacing:2,color:"#888",marginBottom:4},children:"TYPE *"}),e.jsx("select",{value:I.type,onChange:function(i){ee(Object.assign({},I,{type:i.target.value}))},style:A,children:ot.map(function(i){return e.jsx("option",{value:i,children:i},i)})}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,letterSpacing:2,color:"#888",marginBottom:4},children:"QTY"}),e.jsx("input",{type:"number",min:"1",value:I.qty,onChange:function(i){ee(Object.assign({},I,{qty:parseInt(i.target.value)||1}))},style:A})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,letterSpacing:2,color:"#888",marginBottom:4},children:"PHONE *"}),e.jsx("input",{value:I.phone,onChange:function(i){ee(Object.assign({},I,{phone:i.target.value}))},placeholder:"Rep phone",style:A})]})]}),e.jsx("div",{style:{fontSize:10,letterSpacing:2,color:"#888",marginBottom:4},children:"RENTAL COMPANY *"}),e.jsx("input",{value:I.rental,onChange:function(i){ee(Object.assign({},I,{rental:i.target.value}))},placeholder:"Company name",style:A}),e.jsx("div",{style:{fontSize:10,letterSpacing:2,color:"#888",marginBottom:4},children:"REPRESENTATIVE *"}),e.jsx("input",{value:I.rep,onChange:function(i){ee(Object.assign({},I,{rep:i.target.value}))},placeholder:"Rep name",style:A}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,letterSpacing:2,color:"#888",marginBottom:4},children:"DAY IN"}),e.jsx("input",{type:"date",value:I.dayIn,onChange:function(i){ee(Object.assign({},I,{dayIn:i.target.value}))},style:A})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,letterSpacing:2,color:"#888",marginBottom:4},children:"EST. DAY OUT"}),e.jsx("input",{type:"date",value:I.dayOut,onChange:function(i){ee(Object.assign({},I,{dayOut:i.target.value}))},style:A})]})]}),e.jsx("div",{style:{fontSize:10,letterSpacing:2,color:"#888",marginBottom:4},children:"NOTES"}),e.jsx("textarea",{value:I.notes||"",onChange:function(i){ee(Object.assign({},I,{notes:i.target.value}))},rows:2,style:Object.assign({},A,{resize:"vertical"})}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:6},children:[e.jsx("div",{onClick:function(){if(!I.rental||!I.rep||!I.phone){ie("Fill rental company, rep, and phone","error");return}ke(I)},style:{flex:1,padding:12,background:Z,color:"#fff",borderRadius:4,textAlign:"center",cursor:"pointer",fontWeight:700,fontSize:14},children:"SAVE"}),e.jsx("div",{onClick:function(){ee(null)},style:{padding:"12px 16px",background:"#eee",borderRadius:4,cursor:"pointer",fontSize:13},children:"Cancel"})]})]})}),Q&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:7e3,padding:16},children:e.jsxs("div",{style:{background:"#fff",borderRadius:10,padding:20,width:"95vw",maxWidth:420,fontFamily:ye},onClick:function(i){i.stopPropagation()},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:14},children:[e.jsx("div",{style:{fontSize:16,fontWeight:700},children:s.find(function(i){return i.id===Q.id})?"Edit Tool":"Add Tool"}),e.jsx("span",{onClick:function(){ue(null)},style:{cursor:"pointer",color:"#888",fontSize:18},children:"✕"})]}),e.jsx("div",{style:{fontSize:10,letterSpacing:2,color:"#888",marginBottom:4},children:"TOOL NAME *"}),e.jsx("input",{value:Q.name,onChange:function(i){ue(Object.assign({},Q,{name:i.target.value}))},placeholder:"e.g. Impact Driver",style:A}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,letterSpacing:2,color:"#888",marginBottom:4},children:"SERIAL NUMBER"}),e.jsx("input",{value:Q.serial,onChange:function(i){ue(Object.assign({},Q,{serial:i.target.value}))},style:A})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,letterSpacing:2,color:"#888",marginBottom:4},children:"COST ($)"}),e.jsx("input",{type:"number",value:Q.cost,onChange:function(i){ue(Object.assign({},Q,{cost:i.target.value}))},style:A})]})]}),e.jsx("div",{style:{fontSize:10,letterSpacing:2,color:"#888",marginBottom:4},children:"DATE ACQUIRED"}),e.jsx("input",{type:"date",value:Q.acquired,onChange:function(i){ue(Object.assign({},Q,{acquired:i.target.value}))},style:A}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:6},children:[e.jsx("div",{onClick:function(){if(!Q.name){ie("Enter tool name","error");return}g(Q)},style:{flex:1,padding:12,background:Z,color:"#fff",borderRadius:4,textAlign:"center",cursor:"pointer",fontWeight:700,fontSize:14},children:"SAVE"}),e.jsx("div",{onClick:function(){ue(null)},style:{padding:"12px 16px",background:"#eee",borderRadius:4,cursor:"pointer",fontSize:13},children:"Cancel"})]})]})}),e.jsx("div",{style:{position:"fixed",top:16,right:16,zIndex:9999,display:"flex",flexDirection:"column",gap:6},children:z.map(function(i){return e.jsx("div",{style:{background:i.type==="error"?"#dc2626":i.type==="warning"?"#d97706":"#16a34a",color:"#fff",padding:"10px 16px",borderRadius:6,fontFamily:ye,fontSize:13,boxShadow:"0 4px 16px rgba(0,0,0,.3)",minWidth:200},children:i.msg},i.id)})})]})}function an(n,t,d,p,o,b){const C=p>8?p-8:0,S=n*d;if(o==="Prevailing Wage"){const s=(n+t)*b;return s*8+s*1.5*C}return(n+t+S)*8+((n+S)*1.5+t)*C}function _e(n){const t={};t.systemKW=n.systemSizeMW*1e3,t.systemWDC=n.systemSizeMW*1e6,t.payrollTaxPct=n.ficaSS+n.medical+n.futa+n.suta+n.workersComp+n.umbrella+n.genLiability+n.payrollService,[{key:"admin",base:n.adminRate,fringe:0},{key:"generalLabor",base:n.generalLaborRate,fringe:n.generalLaborFringe},{key:"generalLaborApp",base:n.generalLaborRate,fringe:n.generalLaborFringe},{key:"telehandlerOp",base:n.telehandlerOpRate,fringe:n.telehandlerOpFringe},{key:"telehandlerOpApp",base:n.telehandlerOpRate,fringe:n.telehandlerOpFringe},{key:"pileDriverOp",base:n.pileDriverOpRate,fringe:n.pileDriverOpFringe},{key:"pileDriverOpApp",base:n.pileDriverOpRate,fringe:n.pileDriverOpFringe},{key:"skidSteerOp",base:n.skidSteerOpRate,fringe:n.skidSteerOpFringe},{key:"skidSteerOpApp",base:n.skidSteerOpRate,fringe:n.skidSteerOpFringe}].forEach(({key:S,base:s,fringe:l})=>{t[`${S}DayRate`]=an(s,l,t.payrollTaxPct,n.workHoursPerDay,n.wageType,n.pwMultiplier),t[`${S}HourlyRate`]=t[`${S}DayRate`]/n.workHoursPerDay});const p=n.fuelEfficiency;t.pileDriverFuelPerDay=n.pileDriverGalHr*n.workHoursPerDay*p*n.dieselPerGallon,t.skidSteerFuelPerDay=n.skidSteerGalHr*n.workHoursPerDay*p*n.dieselPerGallon,t.telehandlerFuelPerDay=n.telehandlerGalHr*n.workHoursPerDay*p*n.dieselPerGallon,t.companyTruckFuelPerDay=n.companyTruckGalHr*n.workHoursPerDay*p*n.dieselPerGallon,t.utvFuelPerDay=n.utvGalHr*n.workHoursPerDay*p*n.dieselPerGallon,t.totalPiles=n.rackingPiles+n.inverterPiles+n.cabPiles+n.combinerBoxPiles+n.loadBreakPiles;const o=n.estDriveTime+n.estTransitionTime;t.pileManhours=Math.ceil(o*t.totalPiles/60),t.pileAdjustedManhours=Math.round(t.pileManhours/n.pileEfficiency),t.pileDaysToComplete=Math.max(1,Math.ceil(Math.ceil(t.pileAdjustedManhours/n.numExcavators)/n.workHoursPerDay)),t.pilesPerDayPerMachine=t.totalPiles/t.pileDaysToComplete,t.pileCalendarDays=Math.ceil(t.pileDaysToComplete*7/n.workdaysInWeek),t.pileTotalStaff=n.pileSkidSteerOps+n.pileGroundMan+n.pileAdditionalLaborers+n.numExcavators+Math.round(n.pileAdditionalLaborers*n.apprenticeReqPct),t.pileTotalManHours=t.pileTotalStaff*t.pileDaysToComplete*n.workHoursPerDay;const b=n.pileAdditionalLaborers+n.pileGroundMan-Math.floor((n.pileAdditionalLaborers+n.pileGroundMan)*n.apprenticeReqPct),u=Math.ceil((n.pileAdditionalLaborers+n.pileGroundMan)*n.apprenticeReqPct);t.pileLaborCost=b*t.generalLaborDayRate*t.pileDaysToComplete+u*t.generalLaborAppDayRate*t.pileDaysToComplete+n.numExcavators*t.pileDriverOpDayRate*t.pileDaysToComplete+n.pileSkidSteerOps*t.skidSteerOpDayRate*t.pileDaysToComplete,t.pilePerDiemCost=n.includeHotelPerDiem?t.pileTotalStaff*n.perDiem*n.perDiemPct*t.pileCalendarDays:0,t.pileEquipRental=n.numExcavators*n.pileDriverEquipDaily*t.pileCalendarDays+n.pileSkidSteerOps*n.skidSteerEquipDaily*t.pileCalendarDays,t.pileFuelCost=n.numExcavators*t.pileDriverFuelPerDay*t.pileDaysToComplete+n.pileSkidSteerOps*t.skidSteerFuelPerDay*t.pileDaysToComplete,t.pileScopeTotal=t.pileLaborCost+t.pilePerDiemCost+t.pileEquipRental+t.pileFuelCost,t.linearFeetRacking=n.calculateByModules?Math.ceil((n.moduleWidth+1)*n.moduleCount/12):n.manualLinearFeet,t.rackingManhours=Math.ceil(t.linearFeetRacking/n.rackingLfPerHourPerMan),t.rackingAdjustedManhours=Math.ceil(t.rackingManhours/n.rackingEfficiency),t.rackingDaysToComplete=Math.max(1,Math.ceil(Math.ceil(t.rackingAdjustedManhours/n.rackingTotalWorkers)/n.workHoursPerDay)),t.rackingCalendarDays=Math.ceil(t.rackingDaysToComplete*7/n.workdaysInWeek),t.rackingManHours=n.rackingTotalWorkers*t.rackingDaysToComplete*n.workHoursPerDay,t.rackingLaborCost=n.rackingGeneralLabor*t.generalLaborDayRate*t.rackingDaysToComplete+n.rackingGeneralLaborApp*t.generalLaborAppDayRate*t.rackingDaysToComplete+n.rackingTelehandlerOps*t.telehandlerOpDayRate*t.rackingDaysToComplete+n.rackingSkidSteerOps*t.skidSteerOpDayRate*t.rackingDaysToComplete,t.rackingPerDiemCost=n.includeHotelPerDiem?n.rackingTotalWorkers*n.perDiem*n.perDiemPct*t.rackingCalendarDays:0,t.rackingEquipRental=n.rackingSkidSteerOps*n.skidSteerEquipDaily*t.rackingCalendarDays+n.rackingTelehandlerOps*n.telehandlerEquipDaily*t.rackingCalendarDays+1*n.companyTruckEquipDaily*t.rackingCalendarDays,t.rackingFuelCost=n.rackingSkidSteerOps*t.skidSteerFuelPerDay*t.rackingDaysToComplete+n.rackingTelehandlerOps*t.telehandlerFuelPerDay*t.rackingDaysToComplete+1*t.companyTruckFuelPerDay*t.rackingDaysToComplete,t.rackingScopeTotal=t.rackingLaborCost+t.rackingPerDiemCost+t.rackingEquipRental+t.rackingFuelCost,t.moduleCount=n.moduleCount,t.moduleManhours=Math.ceil(t.moduleCount/n.modulesPerHourPerMan),t.moduleAdjustedManhours=Math.ceil(t.moduleManhours/n.moduleEfficiency),t.moduleDaysToComplete=Math.max(1,Math.ceil(Math.ceil(t.moduleAdjustedManhours/n.moduleTotalWorkers)/n.workHoursPerDay)),t.moduleCalendarDays=Math.ceil(t.moduleDaysToComplete*7/n.workdaysInWeek),t.moduleManHours=n.moduleTotalWorkers*t.moduleDaysToComplete*n.workHoursPerDay,t.moduleLaborCost=n.moduleGeneralLabor*t.generalLaborDayRate*t.moduleDaysToComplete+n.moduleGeneralLaborApp*t.generalLaborAppDayRate*t.moduleDaysToComplete+n.moduleSkidSteerOps*t.skidSteerOpDayRate*t.moduleDaysToComplete,t.modulePerDiemCost=n.includeHotelPerDiem?n.moduleTotalWorkers*n.perDiem*n.perDiemPct*t.moduleCalendarDays:0,t.moduleEquipRental=n.moduleSkidSteerOps*n.skidSteerEquipDaily*t.moduleCalendarDays,t.moduleFuelCost=n.moduleSkidSteerOps*t.skidSteerFuelPerDay*t.moduleDaysToComplete,t.moduleScopeTotal=t.moduleLaborCost+t.modulePerDiemCost+t.moduleEquipRental+t.moduleFuelCost,t.qcPileHours=Math.ceil(n.qcPileMultiplier*t.totalPiles),t.qcRackingHours=Math.ceil(n.qcRackMultiplier*t.linearFeetRacking),t.qcModuleHours=Math.ceil(n.qcModuleMultiplier*t.moduleCount),t.qcTotalHours=t.qcPileHours+t.qcRackingHours+t.qcModuleHours,t.qcWorkdays=Math.ceil(Math.ceil(t.qcTotalHours/n.qcNumMen)/n.workHoursPerDay),t.qcCalendarDays=Math.ceil(t.qcWorkdays*7/n.workdaysInWeek),t.qcManHours=n.qcNumMen*t.qcWorkdays*n.workHoursPerDay;const j=n.qcNumMen-n.qcApprentices;t.qcLaborCost=j*t.generalLaborDayRate*t.qcWorkdays+n.qcApprentices*t.generalLaborDayRate*t.qcWorkdays,t.qcPerDiemCost=n.includeHotelPerDiem?n.qcNumMen*n.perDiem*n.perDiemPct*t.qcCalendarDays:0,t.qcScopeTotal=t.qcLaborCost+t.qcPerDiemCost,t.matHandlWorkDays=t.pileDaysToComplete+3,t.matHandlCalendarDays=Math.ceil(t.matHandlWorkDays*7/n.workdaysInWeek),t.matHandlManHours=n.matHandlCrewSize*t.matHandlWorkDays*n.workHoursPerDay,t.matHandlLaborCost=n.matHandlAdmin*t.adminDayRate*t.matHandlWorkDays+n.matHandlGeneralLabor*t.generalLaborHourlyRate*t.matHandlWorkDays*n.workHoursPerDay+n.matHandlTeleOps*t.telehandlerOpHourlyRate*t.matHandlWorkDays*n.workHoursPerDay+n.matHandlSkidOps*t.skidSteerOpHourlyRate*t.matHandlWorkDays*n.workHoursPerDay,t.matHandlPerDiemCost=n.includeHotelPerDiem?n.matHandlCrewSize*n.perDiem*n.perDiemPct*t.matHandlCalendarDays:0,t.matHandlEquipRental=n.matHandlSkidOps*n.skidSteerEquipDaily*t.matHandlCalendarDays+n.matHandlTeleOps*n.telehandlerEquipDaily*t.matHandlCalendarDays,t.matHandlFuelCost=n.matHandlSkidOps*t.skidSteerFuelPerDay*t.matHandlWorkDays+n.matHandlTeleOps*t.telehandlerFuelPerDay*t.matHandlWorkDays,t.matHandlScopeTotal=t.matHandlLaborCost+t.matHandlPerDiemCost+t.matHandlEquipRental+t.matHandlFuelCost,t.totalCalendarDays=t.pileCalendarDays+t.rackingCalendarDays+t.moduleCalendarDays+6,t.totalWorkDays=t.pileDaysToComplete+t.rackingDaysToComplete+t.moduleDaysToComplete+4,t.totalMonths=t.totalCalendarDays/30.44,t.totalManHoursAll=t.pileTotalManHours+t.rackingManHours+t.moduleManHours+t.qcManHours+t.matHandlManHours,t.cartsUtvCost=n.gcCartsRate*n.gcCartsQty*t.totalCalendarDays,t.cartsUtvFuelCost=t.utvFuelPerDay*n.gcCartsQty*t.totalWorkDays,t.maintenanceCost=n.gcMaintenanceRate*t.totalMonths,t.sanitaryCost=n.gcSanitaryRate*n.gcSanitaryQty*t.totalCalendarDays,t.safetyCost=n.gcSafetyRate*t.totalManHoursAll,t.siteOfficeCost=n.gcSiteOfficeRate*t.totalMonths,t.smallToolsCost=n.gcSmallToolsRate*t.totalManHoursAll,t.fuelDeliveryCost=n.gcFuelDeliveryRate,t.pileSurveyCost=n.gcPileSurveyRate*t.totalPiles,t.addlMobSurveyCost=n.gcAddlMobRate,t.twistBarsCost=n.gcTwistBarsRate*n.gcTwistBarsQty,t.payrollCost=n.gcPayrollRate*n.gcPayrollQty*t.totalWorkDays,t.gcTotalCost=t.cartsUtvCost+t.cartsUtvFuelCost+t.maintenanceCost+t.sanitaryCost+t.safetyCost+t.siteOfficeCost+t.smallToolsCost+t.fuelDeliveryCost+t.pileSurveyCost+t.addlMobSurveyCost+t.twistBarsCost+t.payrollCost;const C=(S,s,l,w,a,T)=>{if(s===0)return 0;const E=S*n.mgmtBurdenMultiplier,M=Math.ceil(l*w),O=8+(n.workHoursPerDay-8)*1.5,$=T?l*w*n.mgmtPerDiem:0;return E*s*M*O+$};return t.mgmtSuperCost=C(n.mgmtSuperRate,n.mgmtSuperQty,t.totalCalendarDays,n.mgmtPctOnSite,!1,n.mgmtSuperPerDiem),t.mgmtForemanCost=C(n.mgmtForemanRate,n.mgmtForemanQty,t.totalCalendarDays,n.mgmtPctOnSite,!1,n.mgmtForemanPerDiem),t.mgmtSafetyCost=C(n.mgmtSafetyRate,n.mgmtSafetyQty,t.totalCalendarDays,n.mgmtPctOnSite,!1,n.mgmtSafetyPerDiem),t.mgmtTotalCost=t.mgmtSuperCost+t.mgmtForemanCost+t.mgmtSafetyCost,t.mobCompanyTruckCost=n.mobCompanyTruckRate*n.mobCompanyTruckQty*(n.milesFromHQ/n.mobMPH),t.mobTrailerCost=n.mobTrailerRate*n.mobTrailerQty*(n.milesFromHQ*2),t.mobRentalEquipCost=n.mobRentalEquipRate*n.mobRentalEquipQty*(n.mobExtraMobs+1),t.mobLaborCost=t.generalLaborHourlyRate*(n.milesFromHQ/n.mobMPH),t.mobPerDiemCost=n.perDiem*3,t.mobTotalCost=t.mobCompanyTruckCost+t.mobTrailerCost+t.mobRentalEquipCost+t.mobLaborCost+t.mobPerDiemCost,t.wasteTotal=n.wasteDumpsterQty*n.wasteDumpsterEmptied*n.wasteDumpsterRate*2,t.totalFuelCost=t.pileFuelCost+t.rackingFuelCost+t.moduleFuelCost+t.matHandlFuelCost+t.cartsUtvFuelCost,t.subtotalCost=t.gcTotalCost+t.mgmtTotalCost+t.mobTotalCost+t.wasteTotal+t.matHandlScopeTotal+t.pileScopeTotal+t.qcScopeTotal+t.rackingScopeTotal+t.moduleScopeTotal,t.contingencyAmt=t.subtotalCost*n.contingencyPct,t.subtotalWithContingency=t.subtotalCost+t.contingencyAmt,t.markupAmt=t.subtotalWithContingency*n.markupPct/(1-n.markupPct),t.preBondTotal=t.subtotalWithContingency+t.markupAmt,t.bondAmt=t.preBondTotal*n.bondPct,t.postBondTotal=t.preBondTotal+t.bondAmt,t.dollarPerWatt=t.preBondTotal/t.systemWDC,t.dollarPerWattWithBond=t.postBondTotal/t.systemWDC,t.totalApprenticeHours=u*t.pileDaysToComplete*n.workHoursPerDay+n.rackingGeneralLaborApp*t.rackingDaysToComplete*n.workHoursPerDay+n.moduleGeneralLaborApp*t.moduleDaysToComplete*n.workHoursPerDay+n.qcApprentices*t.qcWorkdays*n.workHoursPerDay,t.apprenticePct=t.totalManHoursAll>0?t.totalApprenticeHours/t.totalManHoursAll:0,t.apprenticeMet=t.apprenticePct>=n.apprenticeReqPct,t.manHoursPerMW=t.totalManHoursAll/n.systemSizeMW,t}const on={projectName:"",projectLocation:"",clientName:"",clientContact:"",bidDate:"",systemSizeMW:5,milesFromHQ:500,workdaysInWeek:5,workHoursPerDay:10,apprenticeReqPct:.15,perDiem:125,perDiemPct:1,wageType:"Union",pwMultiplier:1,includeHotelPerDiem:!0,status:"Draft",adminRate:30,generalLaborRate:25.2,generalLaborFringe:9.85,telehandlerOpRate:34.73,telehandlerOpFringe:12.12,pileDriverOpRate:38.61,pileDriverOpFringe:12.18,skidSteerOpRate:34.73,skidSteerOpFringe:12.12,ficaSS:.062,medical:.0145,futa:.06,suta:.05,workersComp:.09,umbrella:.01,genLiability:.01,payrollService:.01,pileDriverEquipDaily:734,skidSteerEquipDaily:145,telehandlerEquipDaily:175,companyTruckEquipDaily:67,pileDriverGalHr:2,skidSteerGalHr:3.2,telehandlerGalHr:1.5,companyTruckGalHr:1.55,utvGalHr:1,fuelEfficiency:.8,dieselPerGallon:5.089,rackingPiles:2e3,inverterPiles:0,cabPiles:10,combinerBoxPiles:20,loadBreakPiles:0,estDriveTime:3,estTransitionTime:3,pileEfficiency:1.1,numExcavators:2,pileSkidSteerOps:1,pileGroundMan:2,pileAdditionalLaborers:5,moduleCount:1e4,moduleWidth:47.88,calculateByModules:!0,manualLinearFeet:4e4,rackingLfPerHourPerMan:17,rackingEfficiency:1,rackingTotalWorkers:20,rackingGeneralLabor:8,rackingGeneralLaborApp:7,rackingTelehandlerOps:1,rackingSkidSteerOps:4,modulesPerHourPerMan:13,moduleEfficiency:1,moduleTotalWorkers:12,moduleGeneralLabor:4,moduleGeneralLaborApp:5,moduleSkidSteerOps:3,qcPileMultiplier:.085,qcRackMultiplier:.009,qcModuleMultiplier:.008,qcNumMen:3,qcApprentices:1,matHandlCrewSize:4,matHandlAdmin:1,matHandlGeneralLabor:1,matHandlTeleOps:1,matHandlSkidOps:1,gcCartsRate:52,gcCartsQty:5,gcMaintenanceRate:2e3,gcSanitaryRate:4,gcSanitaryQty:4,gcSafetyRate:.75,gcSiteOfficeRate:2500,gcSmallToolsRate:2.5,gcFuelDeliveryRate:1e3,gcPileSurveyRate:6,gcAddlMobRate:1e3,gcTwistBarsRate:200,gcTwistBarsQty:2,gcPayrollRate:137.5,gcPayrollQty:6,mgmtBurdenMultiplier:1.3,mgmtPerDiem:135,mgmtPctOnSite:.89,mgmtSuperRate:57.69,mgmtSuperQty:1,mgmtSuperPerDiem:!0,mgmtForemanRate:54.68,mgmtForemanQty:1,mgmtForemanPerDiem:!0,mgmtSafetyRate:30,mgmtSafetyQty:1,mgmtSafetyPerDiem:!0,mobMPH:40,mobCompanyTruckRate:6.7,mobCompanyTruckQty:1,mobTrailerRate:.5,mobTrailerQty:1,mobRentalEquipRate:500,mobRentalEquipQty:19,mobExtraMobs:1,wasteDumpsterQty:6,wasteDumpsterEmptied:1,wasteDumpsterRate:1e3,contingencyPct:.03,markupPct:.2,bondPct:.02};async function sn(){try{return await _("precon_bids")||[]}catch{return[]}}async function ln(n){try{await Y("precon_bids",n)}catch(t){console.error(t)}}const P=n=>"$"+Number(n||0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),cn=n=>{const t=Number(n||0);return t>=1e6?"$"+(t/1e6).toFixed(2)+"M":t>=1e3?"$"+(t/1e3).toFixed(1)+"K":P(t)},F=(n,t=0)=>Number(n||0).toLocaleString("en-US",{minimumFractionDigits:t,maximumFractionDigits:t}),Ue=n=>(Number(n||0)*100).toFixed(1)+"%";function y({label:n,value:t,onChange:d,type:p="number",step:o,min:b,suffix:u,prefix:j,disabled:C,options:S,wide:s}){return S?e.jsxs("div",{className:`fld ${s?"wide":""}`,children:[e.jsx("label",{children:n}),e.jsx("select",{value:t,onChange:l=>d(l.target.value),children:S.map(l=>e.jsx("option",{value:l,children:l},l))})]}):p==="checkbox"?e.jsx("div",{className:"fld chk",children:e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",checked:t,onChange:l=>d(l.target.checked),disabled:C}),e.jsx("span",{children:n})]})}):e.jsxs("div",{className:`fld ${s?"wide":""}`,children:[e.jsx("label",{children:n}),e.jsxs("div",{className:"inp-w",children:[j&&e.jsx("span",{className:"fx",children:j}),e.jsx("input",{type:p,value:t,onChange:l=>d(p==="number"?parseFloat(l.target.value)||0:l.target.value),step:o||(p==="number"?"any":void 0),min:b,disabled:C}),u&&e.jsx("span",{className:"fx",children:u})]})]})}function k({label:n,value:t,sub:d,hl:p,warn:o}){return e.jsxs("div",{className:`rrow${p?" hl":""}${o?" warn":""}${d?" sub":""}`,children:[e.jsx("span",{className:"rl",children:n}),e.jsx("span",{className:"rv",children:t})]})}function V({title:n,children:t,accent:d,className:p=""}){return e.jsxs("div",{className:`card ${p}`,style:d?{borderTopColor:d}:{},children:[e.jsx("h3",{children:n}),t]})}const $e={Draft:{color:"#6b7a90",bg:"#161c28",icon:"✎"},Submitted:{color:"#4a9eff",bg:"#0f1e35",icon:"↗"},Awarded:{color:"#4ae68a",bg:"#0f2a1c",icon:"✓"},Lost:{color:"#ff6b6b",bg:"#2a1010",icon:"✗"},Revision:{color:"#f5a623",bg:"#2a1f0a",icon:"⟳"}},dn=[{id:"overview",label:"Project"},{id:"rates",label:"Rates"},{id:"pile",label:"Piles"},{id:"racking",label:"Racking"},{id:"modules",label:"Modules"},{id:"qaqc",label:"QA/QC"},{id:"gc",label:"GC & Mgmt"},{id:"summary",label:"Summary"}];function pn({project:n,onSave:t,onBack:d,onExit:p}){const[o,b]=x.useState(n.params),[u,j]=x.useState("overview"),[C,S]=x.useState(!1),s=x.useCallback((a,T)=>{b(E=>({...E,[a]:T})),S(!0)},[]),l=x.useMemo(()=>_e(o),[o]),w=()=>{t({...n,params:o,lastModified:Date.now(),totalPrice:l.preBondTotal,systemMW:o.systemSizeMW,dollarPerWatt:l.dollarPerWatt}),S(!1)};return e.jsxs("div",{className:"editor",children:[e.jsxs("div",{className:"ed-top",children:[e.jsx("button",{className:"btn-back",onClick:d,children:"← Projects"}),e.jsxs("div",{className:"ed-title",children:[e.jsx("h2",{children:o.projectName||"Untitled Bid"}),e.jsxs("span",{className:"ed-mw",children:[o.systemSizeMW," MW DC"]})]}),e.jsxs("div",{className:"ed-actions",children:[e.jsx("div",{className:"ed-price",children:P(l.preBondTotal)}),e.jsx("button",{onClick:function(){window.__srcExportProposal(o,l)},style:{padding:"8px 14px",marginRight:8,borderRadius:6,border:"none",cursor:"pointer",background:"#F97316",color:"#fff",fontWeight:700,fontSize:12},children:"📄 Proposal"}),e.jsx("button",{onClick:function(){window.__srcExportPlan(o,l)},style:{padding:"8px 14px",marginRight:8,borderRadius:6,border:"none",cursor:"pointer",background:"#0a0a14",color:"#fff",fontWeight:700,fontSize:12},children:"🗂 Plan"}),e.jsx("button",{className:`btn-save ${C?"pulse":""}`,onClick:w,children:C?"Save Changes":"Saved ✓"})]})]}),e.jsx("div",{className:"tabs",children:dn.map(a=>e.jsx("button",{className:u===a.id?"active":"",onClick:()=>j(a.id),children:a.label},a.id))}),e.jsxs("div",{className:"ed-body",children:[u==="overview"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"g2",children:[e.jsxs(V,{title:"Project Details",children:[e.jsx(y,{label:"Project Name",value:o.projectName,onChange:a=>s("projectName",a),type:"text",wide:!0}),e.jsx(y,{label:"Project Location",value:o.projectLocation,onChange:a=>s("projectLocation",a),type:"text",wide:!0}),e.jsx(y,{label:"Client Name",value:o.clientName,onChange:a=>s("clientName",a),type:"text",wide:!0}),e.jsx(y,{label:"Client Contact",value:o.clientContact,onChange:a=>s("clientContact",a),type:"text",wide:!0}),e.jsx(y,{label:"Bid Date",value:o.bidDate,onChange:a=>s("bidDate",a),type:"date",wide:!0}),e.jsx(y,{label:"System Size",value:o.systemSizeMW,onChange:a=>s("systemSizeMW",a),suffix:"MW DC",step:.01}),e.jsx(y,{label:"Miles from HQ",value:o.milesFromHQ,onChange:a=>s("milesFromHQ",a),suffix:"mi"}),e.jsx(y,{label:"Status",value:o.status,onChange:a=>s("status",a),options:Object.keys($e)})]}),e.jsxs(V,{title:"Work Schedule & Labor",children:[e.jsx(y,{label:"Workdays / Week",value:o.workdaysInWeek,onChange:a=>s("workdaysInWeek",a),min:1}),e.jsx(y,{label:"Hours / Day",value:o.workHoursPerDay,onChange:a=>s("workHoursPerDay",a),min:1}),e.jsx(y,{label:"Wage Type",value:o.wageType,onChange:a=>s("wageType",a),options:["Union","Prevailing Wage"]}),e.jsx(y,{label:"PW Multiplier",value:o.pwMultiplier,onChange:a=>s("pwMultiplier",a),step:.1}),e.jsx(y,{label:"Apprentice Req %",value:o.apprenticeReqPct,onChange:a=>s("apprenticeReqPct",a),step:.01}),e.jsx(y,{label:"Per Diem",value:o.perDiem,onChange:a=>s("perDiem",a),prefix:"$",suffix:"/day"}),e.jsx(y,{label:"Per Diem Distribution",value:o.perDiemPct,onChange:a=>s("perDiemPct",a),step:.01}),e.jsx(y,{label:"Include Hotel/Per Diem?",value:o.includeHotelPerDiem,onChange:a=>s("includeHotelPerDiem",a),type:"checkbox"})]})]}),e.jsx(V,{title:"Calculated Overview",children:e.jsxs("div",{className:"g4",children:[e.jsxs("div",{className:"stat-box",children:[e.jsx("div",{className:"stat-val",children:F(l.totalCalendarDays)}),e.jsx("div",{className:"stat-lbl",children:"Calendar Days"})]}),e.jsxs("div",{className:"stat-box",children:[e.jsx("div",{className:"stat-val",children:F(l.totalWorkDays)}),e.jsx("div",{className:"stat-lbl",children:"Work Days"})]}),e.jsxs("div",{className:"stat-box",children:[e.jsx("div",{className:"stat-val",children:F(l.totalManHoursAll)}),e.jsx("div",{className:"stat-lbl",children:"Man-Hours"})]}),e.jsxs("div",{className:"stat-box",children:[e.jsx("div",{className:"stat-val",children:F(l.manHoursPerMW,0)}),e.jsx("div",{className:"stat-lbl",children:"Man-Hr/MW"})]}),e.jsxs("div",{className:"stat-box",children:[e.jsx("div",{className:"stat-val",children:Ue(l.apprenticePct)}),e.jsx("div",{className:"stat-lbl",children:"Apprentice %"})]}),e.jsxs("div",{className:`stat-box ${l.apprenticeMet?"met":"unmet"}`,children:[e.jsx("div",{className:"stat-val",children:l.apprenticeMet?"✓ MET":"✗ NOT MET"}),e.jsx("div",{className:"stat-lbl",children:"IRA Req"})]})]})})]}),u==="rates"&&e.jsxs("div",{className:"g2",children:[e.jsxs(V,{title:"Base Hourly Rates",children:[e.jsx(y,{label:"Admin",value:o.adminRate,onChange:a=>s("adminRate",a),prefix:"$",suffix:"/hr"}),e.jsx(y,{label:"General Labor",value:o.generalLaborRate,onChange:a=>s("generalLaborRate",a),prefix:"$",suffix:"/hr"}),e.jsx(y,{label:"GL Fringe",value:o.generalLaborFringe,onChange:a=>s("generalLaborFringe",a),prefix:"$",suffix:"/hr"}),e.jsx(y,{label:"Telehandler Op",value:o.telehandlerOpRate,onChange:a=>s("telehandlerOpRate",a),prefix:"$",suffix:"/hr"}),e.jsx(y,{label:"Tele Fringe",value:o.telehandlerOpFringe,onChange:a=>s("telehandlerOpFringe",a),prefix:"$",suffix:"/hr"}),e.jsx(y,{label:"Pile Driver Op",value:o.pileDriverOpRate,onChange:a=>s("pileDriverOpRate",a),prefix:"$",suffix:"/hr"}),e.jsx(y,{label:"PD Fringe",value:o.pileDriverOpFringe,onChange:a=>s("pileDriverOpFringe",a),prefix:"$",suffix:"/hr"}),e.jsx(y,{label:"Skid Steer Op",value:o.skidSteerOpRate,onChange:a=>s("skidSteerOpRate",a),prefix:"$",suffix:"/hr"}),e.jsx(y,{label:"Skid Fringe",value:o.skidSteerOpFringe,onChange:a=>s("skidSteerOpFringe",a),prefix:"$",suffix:"/hr"}),e.jsx("hr",{className:"div"}),e.jsx(k,{label:"Payroll Tax Total",value:Ue(l.payrollTaxPct),hl:!0})]}),e.jsxs(V,{title:"Computed Day Rates & Equipment",children:[e.jsx(k,{label:"Admin/day",value:P(l.adminDayRate)}),e.jsx(k,{label:"General Labor/day",value:P(l.generalLaborDayRate)}),e.jsx(k,{label:"Telehandler Op/day",value:P(l.telehandlerOpDayRate)}),e.jsx(k,{label:"Pile Driver Op/day",value:P(l.pileDriverOpDayRate)}),e.jsx(k,{label:"Skid Steer Op/day",value:P(l.skidSteerOpDayRate)}),e.jsx("hr",{className:"div"}),e.jsx(y,{label:"PD Equipment",value:o.pileDriverEquipDaily,onChange:a=>s("pileDriverEquipDaily",a),prefix:"$",suffix:"/day"}),e.jsx(y,{label:"Skid Steer",value:o.skidSteerEquipDaily,onChange:a=>s("skidSteerEquipDaily",a),prefix:"$",suffix:"/day"}),e.jsx(y,{label:"Telehandler",value:o.telehandlerEquipDaily,onChange:a=>s("telehandlerEquipDaily",a),prefix:"$",suffix:"/day"}),e.jsx(y,{label:"Company Truck",value:o.companyTruckEquipDaily,onChange:a=>s("companyTruckEquipDaily",a),prefix:"$",suffix:"/day"}),e.jsx("hr",{className:"div"}),e.jsx(y,{label:"Diesel $/gal",value:o.dieselPerGallon,onChange:a=>s("dieselPerGallon",a),prefix:"$"}),e.jsx(y,{label:"Fuel Efficiency",value:o.fuelEfficiency,onChange:a=>s("fuelEfficiency",a),step:.05})]})]}),u==="pile"&&e.jsxs("div",{className:"g2",children:[e.jsxs(V,{title:"Pile Counts & Production",children:[e.jsx(y,{label:"Racking Piles",value:o.rackingPiles,onChange:a=>s("rackingPiles",a)}),e.jsx(y,{label:"Inverter Piles",value:o.inverterPiles,onChange:a=>s("inverterPiles",a)}),e.jsx(y,{label:"CAB Piles",value:o.cabPiles,onChange:a=>s("cabPiles",a)}),e.jsx(y,{label:"Combiner Box Piles",value:o.combinerBoxPiles,onChange:a=>s("combinerBoxPiles",a)}),e.jsx(y,{label:"Load Break Piles",value:o.loadBreakPiles,onChange:a=>s("loadBreakPiles",a)}),e.jsx("hr",{className:"div"}),e.jsx(y,{label:"Drive Time (min)",value:o.estDriveTime,onChange:a=>s("estDriveTime",a)}),e.jsx(y,{label:"Transition Time (min)",value:o.estTransitionTime,onChange:a=>s("estTransitionTime",a)}),e.jsx(y,{label:"Efficiency",value:o.pileEfficiency,onChange:a=>s("pileEfficiency",a),step:.1}),e.jsx(y,{label:"# Pile Drivers",value:o.numExcavators,onChange:a=>s("numExcavators",a)}),e.jsx("hr",{className:"div"}),e.jsx(y,{label:"Skid Steer Ops",value:o.pileSkidSteerOps,onChange:a=>s("pileSkidSteerOps",a)}),e.jsx(y,{label:"Ground Men",value:o.pileGroundMan,onChange:a=>s("pileGroundMan",a)}),e.jsx(y,{label:"Addl Laborers",value:o.pileAdditionalLaborers,onChange:a=>s("pileAdditionalLaborers",a)})]}),e.jsxs(V,{title:"Pile Results",children:[e.jsx(k,{label:"Total Piles",value:F(l.totalPiles),hl:!0}),e.jsx(k,{label:"Manhours Needed",value:F(l.pileManhours)}),e.jsx(k,{label:"Adjusted Manhours",value:F(l.pileAdjustedManhours)}),e.jsx(k,{label:"Days to Complete",value:F(l.pileDaysToComplete)}),e.jsx(k,{label:"Calendar Days",value:F(l.pileCalendarDays)}),e.jsx(k,{label:"Piles/Day",value:F(l.pilesPerDayPerMachine,1)}),e.jsx("hr",{className:"div"}),e.jsx(k,{label:"Labor",value:P(l.pileLaborCost),sub:!0}),e.jsx(k,{label:"Per Diem",value:P(l.pilePerDiemCost),sub:!0}),e.jsx(k,{label:"Equipment",value:P(l.pileEquipRental),sub:!0}),e.jsx(k,{label:"Fuel",value:P(l.pileFuelCost),sub:!0}),e.jsx(k,{label:"Pile Total",value:P(l.pileScopeTotal),hl:!0}),e.jsx(k,{label:"$/Pile",value:P(l.pileScopeTotal/l.totalPiles)}),e.jsx(k,{label:"$/Wdc",value:"$"+(l.pileScopeTotal/l.systemWDC).toFixed(4)})]})]}),u==="racking"&&e.jsxs("div",{className:"g2",children:[e.jsxs(V,{title:"Racking Parameters",children:[e.jsx(y,{label:"Calculate by Modules?",value:o.calculateByModules,onChange:a=>s("calculateByModules",a),type:"checkbox"}),e.jsx(y,{label:"Module Count",value:o.moduleCount,onChange:a=>s("moduleCount",a)}),e.jsx(y,{label:"Module Width (in)",value:o.moduleWidth,onChange:a=>s("moduleWidth",a),step:.01,suffix:"in"}),!o.calculateByModules&&e.jsx(y,{label:"Manual LF",value:o.manualLinearFeet,onChange:a=>s("manualLinearFeet",a)}),e.jsx("hr",{className:"div"}),e.jsx(y,{label:"LF/Hr/Man",value:o.rackingLfPerHourPerMan,onChange:a=>s("rackingLfPerHourPerMan",a)}),e.jsx(y,{label:"Efficiency",value:o.rackingEfficiency,onChange:a=>s("rackingEfficiency",a),step:.1}),e.jsx(y,{label:"Total Workers",value:o.rackingTotalWorkers,onChange:a=>s("rackingTotalWorkers",a)}),e.jsx("hr",{className:"div"}),e.jsx(y,{label:"GL Journeymen",value:o.rackingGeneralLabor,onChange:a=>s("rackingGeneralLabor",a)}),e.jsx(y,{label:"GL Apprentice",value:o.rackingGeneralLaborApp,onChange:a=>s("rackingGeneralLaborApp",a)}),e.jsx(y,{label:"Telehandler Ops",value:o.rackingTelehandlerOps,onChange:a=>s("rackingTelehandlerOps",a)}),e.jsx(y,{label:"Skid Steer Ops",value:o.rackingSkidSteerOps,onChange:a=>s("rackingSkidSteerOps",a)})]}),e.jsxs(V,{title:"Racking Results",children:[e.jsx(k,{label:"Linear Feet",value:F(l.linearFeetRacking),hl:!0}),e.jsx(k,{label:"Manhours",value:F(l.rackingManhours)}),e.jsx(k,{label:"Days to Complete",value:F(l.rackingDaysToComplete)}),e.jsx(k,{label:"Calendar Days",value:F(l.rackingCalendarDays)}),e.jsx(k,{label:"Man-Hours",value:F(l.rackingManHours)}),e.jsx(k,{label:"LF/Day",value:F(l.linearFeetRacking/l.rackingDaysToComplete,0)}),e.jsx("hr",{className:"div"}),e.jsx(k,{label:"Labor",value:P(l.rackingLaborCost),sub:!0}),e.jsx(k,{label:"Per Diem",value:P(l.rackingPerDiemCost),sub:!0}),e.jsx(k,{label:"Equipment",value:P(l.rackingEquipRental),sub:!0}),e.jsx(k,{label:"Fuel",value:P(l.rackingFuelCost),sub:!0}),e.jsx(k,{label:"Racking Total",value:P(l.rackingScopeTotal),hl:!0}),e.jsx(k,{label:"$/LF",value:P(l.rackingScopeTotal/l.linearFeetRacking)}),e.jsx(k,{label:"$/Wdc",value:"$"+(l.rackingScopeTotal/l.systemWDC).toFixed(4)})]})]}),u==="modules"&&e.jsxs("div",{className:"g2",children:[e.jsxs(V,{title:"Module Parameters",children:[e.jsx(k,{label:"Module Count",value:F(l.moduleCount),hl:!0}),e.jsx(y,{label:"Modules/Hr/Man",value:o.modulesPerHourPerMan,onChange:a=>s("modulesPerHourPerMan",a)}),e.jsx(y,{label:"Efficiency",value:o.moduleEfficiency,onChange:a=>s("moduleEfficiency",a),step:.1}),e.jsx(y,{label:"Total Workers",value:o.moduleTotalWorkers,onChange:a=>s("moduleTotalWorkers",a)}),e.jsx("hr",{className:"div"}),e.jsx(y,{label:"GL Journeymen",value:o.moduleGeneralLabor,onChange:a=>s("moduleGeneralLabor",a)}),e.jsx(y,{label:"GL Apprentice",value:o.moduleGeneralLaborApp,onChange:a=>s("moduleGeneralLaborApp",a)}),e.jsx(y,{label:"Skid Steer Ops",value:o.moduleSkidSteerOps,onChange:a=>s("moduleSkidSteerOps",a)})]}),e.jsxs(V,{title:"Module Results",children:[e.jsx(k,{label:"Manhours",value:F(l.moduleManhours)}),e.jsx(k,{label:"Days to Complete",value:F(l.moduleDaysToComplete)}),e.jsx(k,{label:"Calendar Days",value:F(l.moduleCalendarDays)}),e.jsx(k,{label:"Man-Hours",value:F(l.moduleManHours)}),e.jsx(k,{label:"Modules/Day",value:F(l.moduleCount/l.moduleDaysToComplete,0)}),e.jsx("hr",{className:"div"}),e.jsx(k,{label:"Labor",value:P(l.moduleLaborCost),sub:!0}),e.jsx(k,{label:"Per Diem",value:P(l.modulePerDiemCost),sub:!0}),e.jsx(k,{label:"Equipment",value:P(l.moduleEquipRental),sub:!0}),e.jsx(k,{label:"Fuel",value:P(l.moduleFuelCost),sub:!0}),e.jsx(k,{label:"Module Total",value:P(l.moduleScopeTotal),hl:!0}),e.jsx(k,{label:"$/Module",value:P(l.moduleScopeTotal/l.moduleCount)})]})]}),u==="qaqc"&&e.jsxs("div",{className:"g2",children:[e.jsxs(V,{title:"QA/QC Multipliers",children:[e.jsx(y,{label:"Pile Mult",value:o.qcPileMultiplier,onChange:a=>s("qcPileMultiplier",a),step:.001}),e.jsx(y,{label:"Rack Mult",value:o.qcRackMultiplier,onChange:a=>s("qcRackMultiplier",a),step:.001}),e.jsx(y,{label:"Module Mult",value:o.qcModuleMultiplier,onChange:a=>s("qcModuleMultiplier",a),step:.001}),e.jsx(y,{label:"QC Staff",value:o.qcNumMen,onChange:a=>s("qcNumMen",a)}),e.jsx(y,{label:"Apprentices",value:o.qcApprentices,onChange:a=>s("qcApprentices",a)})]}),e.jsxs(V,{title:"QA/QC Results",children:[e.jsx(k,{label:"Pile QC Hrs",value:F(l.qcPileHours),sub:!0}),e.jsx(k,{label:"Rack QC Hrs",value:F(l.qcRackingHours),sub:!0}),e.jsx(k,{label:"Module QC Hrs",value:F(l.qcModuleHours),sub:!0}),e.jsx(k,{label:"Total QC Hours",value:F(l.qcTotalHours),hl:!0}),e.jsx(k,{label:"Work Days",value:F(l.qcWorkdays)}),e.jsx(k,{label:"Man-Hours",value:F(l.qcManHours)}),e.jsx("hr",{className:"div"}),e.jsx(k,{label:"Labor",value:P(l.qcLaborCost),sub:!0}),e.jsx(k,{label:"Per Diem",value:P(l.qcPerDiemCost),sub:!0}),e.jsx(k,{label:"QA/QC Total",value:P(l.qcScopeTotal),hl:!0})]})]}),u==="gc"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"g2",children:[e.jsxs(V,{title:"General Conditions",children:[e.jsx(y,{label:"Carts/UTV Rate",value:o.gcCartsRate,onChange:a=>s("gcCartsRate",a),prefix:"$",suffix:"/day"}),e.jsx(y,{label:"Carts Qty",value:o.gcCartsQty,onChange:a=>s("gcCartsQty",a)}),e.jsx(y,{label:"Maintenance $/mo",value:o.gcMaintenanceRate,onChange:a=>s("gcMaintenanceRate",a),prefix:"$"}),e.jsx(y,{label:"Sanitary Rate",value:o.gcSanitaryRate,onChange:a=>s("gcSanitaryRate",a),prefix:"$"}),e.jsx(y,{label:"Sanitary Qty",value:o.gcSanitaryQty,onChange:a=>s("gcSanitaryQty",a)}),e.jsx(y,{label:"Safety $/man-hr",value:o.gcSafetyRate,onChange:a=>s("gcSafetyRate",a),prefix:"$"}),e.jsx(y,{label:"Site Office $/mo",value:o.gcSiteOfficeRate,onChange:a=>s("gcSiteOfficeRate",a),prefix:"$"}),e.jsx(y,{label:"Small Tools $/hr",value:o.gcSmallToolsRate,onChange:a=>s("gcSmallToolsRate",a),prefix:"$"}),e.jsx(y,{label:"Pile Survey $/pile",value:o.gcPileSurveyRate,onChange:a=>s("gcPileSurveyRate",a),prefix:"$"}),e.jsx(y,{label:"Payroll $/person",value:o.gcPayrollRate,onChange:a=>s("gcPayrollRate",a),prefix:"$"}),e.jsx(y,{label:"Payroll # ppl",value:o.gcPayrollQty,onChange:a=>s("gcPayrollQty",a)}),e.jsx("hr",{className:"div"}),e.jsx(k,{label:"GC Total",value:P(l.gcTotalCost),hl:!0})]}),e.jsxs(V,{title:"Management",children:[e.jsx(y,{label:"Burden Mult",value:o.mgmtBurdenMultiplier,onChange:a=>s("mgmtBurdenMultiplier",a),step:.1}),e.jsx(y,{label:"Mgmt Per Diem",value:o.mgmtPerDiem,onChange:a=>s("mgmtPerDiem",a),prefix:"$"}),e.jsx(y,{label:"% On Site",value:o.mgmtPctOnSite,onChange:a=>s("mgmtPctOnSite",a),step:.01}),e.jsx("hr",{className:"div"}),e.jsx(y,{label:"Super Rate",value:o.mgmtSuperRate,onChange:a=>s("mgmtSuperRate",a),prefix:"$"}),e.jsx(y,{label:"Super Qty",value:o.mgmtSuperQty,onChange:a=>s("mgmtSuperQty",a)}),e.jsx(y,{label:"Foreman Rate",value:o.mgmtForemanRate,onChange:a=>s("mgmtForemanRate",a),prefix:"$"}),e.jsx(y,{label:"Foreman Qty",value:o.mgmtForemanQty,onChange:a=>s("mgmtForemanQty",a)}),e.jsx(y,{label:"Safety Rate",value:o.mgmtSafetyRate,onChange:a=>s("mgmtSafetyRate",a),prefix:"$"}),e.jsx(y,{label:"Safety Qty",value:o.mgmtSafetyQty,onChange:a=>s("mgmtSafetyQty",a)}),e.jsx("hr",{className:"div"}),e.jsx(k,{label:"Mgmt Total",value:P(l.mgmtTotalCost),hl:!0})]})]}),e.jsxs("div",{className:"g2",children:[e.jsxs(V,{title:"Mobilization",children:[e.jsx(y,{label:"Truck Rate",value:o.mobCompanyTruckRate,onChange:a=>s("mobCompanyTruckRate",a),prefix:"$",suffix:"/mi"}),e.jsx(y,{label:"Trailer Rate",value:o.mobTrailerRate,onChange:a=>s("mobTrailerRate",a),prefix:"$",suffix:"/mi"}),e.jsx(y,{label:"Rental Equip Rate",value:o.mobRentalEquipRate,onChange:a=>s("mobRentalEquipRate",a),prefix:"$"}),e.jsx(y,{label:"Rental Equip Qty",value:o.mobRentalEquipQty,onChange:a=>s("mobRentalEquipQty",a)}),e.jsx(y,{label:"Extra Mobs",value:o.mobExtraMobs,onChange:a=>s("mobExtraMobs",a)}),e.jsx(k,{label:"Mob Total",value:P(l.mobTotalCost),hl:!0})]}),e.jsxs(V,{title:"Waste Management",children:[e.jsx(y,{label:"Dumpster Qty",value:o.wasteDumpsterQty,onChange:a=>s("wasteDumpsterQty",a)}),e.jsx(y,{label:"Emptied/Mo",value:o.wasteDumpsterEmptied,onChange:a=>s("wasteDumpsterEmptied",a)}),e.jsx(y,{label:"Rate",value:o.wasteDumpsterRate,onChange:a=>s("wasteDumpsterRate",a),prefix:"$"}),e.jsx(k,{label:"Waste Total",value:P(l.wasteTotal),hl:!0})]})]})]}),u==="summary"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"hero",children:[e.jsx("div",{className:"hero-label",children:"TOTAL BID PRICE"}),e.jsx("div",{className:"hero-big",children:P(l.preBondTotal)}),e.jsxs("div",{className:"hero-sub",children:[(l.dollarPerWatt*100).toFixed(2),"¢/Wdc  ·  ",o.systemSizeMW," MW DC"]}),e.jsxs("div",{className:"hero-bond",children:["With ",Ue(o.bondPct)," Bond: ",e.jsx("strong",{children:P(l.postBondTotal)})," (",(l.dollarPerWattWithBond*100).toFixed(2),"¢/Wdc)"]}),(()=>{const a=[{l:"Piles",v:l.pileScopeTotal,c:"#4a7cff"},{l:"Racking",v:l.rackingScopeTotal,c:"#4ae68a"},{l:"Modules",v:l.moduleScopeTotal,c:"#f5a623"},{l:"QA/QC",v:l.qcScopeTotal,c:"#e04a7a"},{l:"Mat Handl",v:l.matHandlScopeTotal,c:"#9b59b6"},{l:"GC",v:l.gcTotalCost,c:"#3498db"},{l:"Mgmt",v:l.mgmtTotalCost,c:"#1abc9c"},{l:"Mob",v:l.mobTotalCost,c:"#e67e22"},{l:"Waste",v:l.wasteTotal,c:"#95a5a6"}],T=a.reduce((E,M)=>E+M.v,0);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"scope-bar",children:a.map(E=>e.jsx("div",{style:{width:`${E.v/T*100}%`,background:E.c}},E.l))}),e.jsx("div",{className:"scope-leg",children:a.map(E=>e.jsxs("span",{children:[e.jsx("i",{style:{background:E.c}}),E.l," ",Ue(E.v/T)]},E.l))})]})})()]}),e.jsxs("div",{className:"g2",children:[e.jsxs(V,{title:"Cost Breakdown",children:[e.jsx(k,{label:"General Conditions",value:P(l.gcTotalCost)}),e.jsx(k,{label:"Management",value:P(l.mgmtTotalCost)}),e.jsx(k,{label:"Mobilization",value:P(l.mobTotalCost)}),e.jsx(k,{label:"Waste Management",value:P(l.wasteTotal)}),e.jsx(k,{label:"Material Handling",value:P(l.matHandlScopeTotal)}),e.jsx(k,{label:"Pile Driving",value:P(l.pileScopeTotal)}),e.jsx(k,{label:"QA/QC",value:P(l.qcScopeTotal)}),e.jsx(k,{label:"Racking",value:P(l.rackingScopeTotal)}),e.jsx(k,{label:"Modules",value:P(l.moduleScopeTotal)}),e.jsx("hr",{className:"div"}),e.jsx(k,{label:"Subtotal",value:P(l.subtotalCost),hl:!0})]}),e.jsxs(V,{title:"Financials",children:[e.jsx(y,{label:"Contingency %",value:o.contingencyPct,onChange:a=>s("contingencyPct",a),step:.01}),e.jsx(k,{label:"Contingency",value:P(l.contingencyAmt),sub:!0}),e.jsx(k,{label:"Sub + Contingency",value:P(l.subtotalWithContingency)}),e.jsx("hr",{className:"div"}),e.jsx(y,{label:"Markup %",value:o.markupPct,onChange:a=>s("markupPct",a),step:.01}),e.jsx(k,{label:"Markup",value:P(l.markupAmt),sub:!0}),e.jsx(k,{label:"Pre-Bond Total",value:P(l.preBondTotal),hl:!0}),e.jsx("hr",{className:"div"}),e.jsx(y,{label:"Bond %",value:o.bondPct,onChange:a=>s("bondPct",a),step:.01}),e.jsx(k,{label:"Bond",value:P(l.bondAmt),sub:!0}),e.jsx(k,{label:"Post-Bond Total",value:P(l.postBondTotal),hl:!0}),e.jsx("hr",{className:"div"}),e.jsx(k,{label:"$/Wdc Pre-Bond",value:"$"+l.dollarPerWatt.toFixed(4)}),e.jsx(k,{label:"$/Wdc Post-Bond",value:"$"+l.dollarPerWattWithBond.toFixed(4)}),e.jsx(k,{label:"Total Fuel Cost",value:P(l.totalFuelCost)})]})]})]})]})]})}function un({projects:n,onOpen:t,onCreate:d,onDuplicate:p,onDelete:o,onExit:b}){const u=x.useMemo(()=>{let j=0,C=0,S=0,s=0;return n.forEach(l=>{const w=_e(l.params);j+=w.preBondTotal,C+=l.params.systemSizeMW,l.params.status==="Awarded"&&S++,l.params.status!=="Lost"&&s++}),{totalVal:j,totalMW:C,awarded:S,active:s,total:n.length}},[n]);return e.jsxs("div",{className:"dash",children:[e.jsxs("div",{className:"dash-head",children:[e.jsxs("div",{children:[e.jsx("h1",{children:"⚡ Mechanical Bid Dashboard"}),e.jsx("p",{className:"dash-sub",children:"Solar construction bid management"})]}),e.jsx("button",{className:"btn-new",onClick:d,children:"+ New Bid"})]}),n.length>0&&e.jsxs("div",{className:"dash-stats",children:[e.jsxs("div",{className:"ds",children:[e.jsx("div",{className:"ds-v",children:u.total}),e.jsx("div",{className:"ds-l",children:"Total Bids"})]}),e.jsxs("div",{className:"ds",children:[e.jsx("div",{className:"ds-v",children:u.active}),e.jsx("div",{className:"ds-l",children:"Active"})]}),e.jsxs("div",{className:"ds",children:[e.jsx("div",{className:"ds-v",children:u.awarded}),e.jsx("div",{className:"ds-l",children:"Awarded"})]}),e.jsxs("div",{className:"ds",children:[e.jsxs("div",{className:"ds-v",children:[F(u.totalMW,1)," MW"]}),e.jsx("div",{className:"ds-l",children:"Total Capacity"})]}),e.jsxs("div",{className:"ds accent",children:[e.jsx("div",{className:"ds-v",children:cn(u.totalVal)}),e.jsx("div",{className:"ds-l",children:"Pipeline Value"})]})]}),n.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:"⚡"}),e.jsx("h2",{children:"No bids yet"}),e.jsx("p",{children:"Create your first mechanical bid to get started."}),e.jsx("button",{className:"btn-new lg",onClick:d,children:"+ Create First Bid"})]}):e.jsx("div",{className:"proj-grid",children:n.sort((j,C)=>(C.lastModified||0)-(j.lastModified||0)).map(j=>{const C=_e(j.params),S=$e[j.params.status]||$e.Draft;return e.jsxs("div",{className:"proj-card",onClick:()=>t(j.id),children:[e.jsxs("div",{className:"pc-top",children:[e.jsxs("div",{className:"pc-status",style:{color:S.color,background:S.bg},children:[S.icon," ",j.params.status]}),e.jsxs("div",{className:"pc-actions",onClick:s=>s.stopPropagation(),children:[e.jsx("button",{title:"Duplicate",onClick:()=>p(j.id),children:"⧉"}),e.jsx("button",{title:"Delete",className:"del",onClick:()=>o(j.id),children:"✕"})]})]}),e.jsx("h3",{className:"pc-name",children:j.params.projectName||"Untitled"}),e.jsx("div",{className:"pc-loc",children:j.params.projectLocation||"No location"}),e.jsx("div",{className:"pc-client",children:j.params.clientName||"No client"}),e.jsxs("div",{className:"pc-metrics",children:[e.jsxs("div",{children:[e.jsx("span",{className:"pc-mv",children:j.params.systemSizeMW}),e.jsx("span",{className:"pc-ml",children:"MW"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"pc-mv",children:F(C.totalPiles)}),e.jsx("span",{className:"pc-ml",children:"Piles"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"pc-mv",children:F(C.totalWorkDays)}),e.jsx("span",{className:"pc-ml",children:"Days"})]})]}),e.jsx("div",{className:"pc-price",children:P(C.preBondTotal)}),e.jsxs("div",{className:"pc-watt",children:[(C.dollarPerWatt*100).toFixed(2),"¢/Wdc"]}),j.lastModified&&e.jsxs("div",{className:"pc-date",children:["Updated ",new Date(j.lastModified).toLocaleDateString()]})]},j.id)})})]})}function xn({onExit:n,portalUser:t}){const[d,p]=x.useState([]),[o,b]=x.useState(null),[u,j]=x.useState(!0),[C,S]=x.useState(null);x.useEffect(()=>{sn().then(E=>{p(E),j(!1)})},[]),x.useEffect(()=>{u||ln(d)},[d,u]);const s=()=>{const E="bid_"+Date.now()+"_"+Math.random().toString(36).slice(2,6),M={id:E,params:{...on,projectName:"New Bid "+(d.length+1),bidDate:new Date().toISOString().split("T")[0]},lastModified:Date.now(),totalPrice:0};p(O=>[...O,M]),b(E)},l=E=>{p(M=>M.map(O=>O.id===E.id?E:O))},w=E=>{const M=d.find(ae=>ae.id===E);if(!M)return;const O="bid_"+Date.now()+"_"+Math.random().toString(36).slice(2,6),$={...M,id:O,params:{...M.params,projectName:M.params.projectName+" (Copy)",status:"Draft"},lastModified:Date.now()};p(ae=>[...ae,$])},a=E=>{p(M=>M.filter(O=>O.id!==E)),S(null),o===E&&b(null)},T=d.find(E=>E.id===o);return u?e.jsx("div",{className:"app",style:{position:"fixed",inset:0,zIndex:2e3},children:e.jsx("div",{className:"loading",children:"Loading bids…"})}):e.jsxs("div",{className:"app",style:{position:"fixed",inset:0,zIndex:2e3,overflow:"auto"},children:[e.jsx("style",{children:`
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
.app{font-family:'Agency FB','Arial Narrow',sans-serif;background:#f5f4f0;color:#333;min-height:100vh;}
.loading{display:flex;align-items:center;justify-content:center;height:100vh;font-size:16px;color:#888;}

/* DASHBOARD */
.dash{max-width:1200px;margin:0 auto;padding:20px;}
.dash-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;flex-wrap:wrap;gap:12px;}
.dash-head h1{font-size:24px;font-weight:700;color:#1a1a1a;letter-spacing:2px;text-transform:uppercase;}
.dash-sub{font-size:13px;color:#888;margin-top:2px;letter-spacing:1px;}
.btn-new{font-family:'Agency FB','Arial Narrow',sans-serif;font-size:14px;font-weight:700;padding:10px 20px;border:none;border-radius:4px;background:#c41e2e;color:#fff;cursor:pointer;transition:all .2s;letter-spacing:1px;text-transform:uppercase;}
.btn-new:hover{background:#a01020;box-shadow:0 4px 16px rgba(196,30,46,.25);}
.btn-new.lg{padding:14px 32px;font-size:16px;}

.dash-stats{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:24px;}
@media(max-width:700px){.dash-stats{grid-template-columns:repeat(3,1fr);}}
.ds{background:#fff;border:1px solid #e8e6e0;border-radius:8px;padding:14px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.04);}
.ds.accent{border-color:#d4a820;background:#fffdf5;}
.ds-v{font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:700;color:#1a1a1a;}
.ds.accent .ds-v{color:#c41e2e;}
.ds-l{font-size:11px;color:#888;margin-top:2px;text-transform:uppercase;letter-spacing:1px;}

.empty-state{text-align:center;padding:80px 20px;}
.empty-icon{font-size:48px;margin-bottom:16px;}
.empty-state h2{font-size:20px;color:#1a1a1a;margin-bottom:6px;}
.empty-state p{color:#888;margin-bottom:20px;}

.proj-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px;}
.proj-card{background:#fff;border:1px solid #e8e6e0;border-radius:10px;padding:18px;cursor:pointer;transition:all .2s;position:relative;box-shadow:0 1px 3px rgba(0,0,0,.04);}
.proj-card:hover{border-color:#d4a820;transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.08);}
.pc-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;}
.pc-status{font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:1px;}
.pc-actions{display:flex;gap:4px;}
.pc-actions button{font-size:14px;background:transparent;border:1px solid #e8e6e0;color:#aaa;width:28px;height:28px;border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;}
.pc-actions button:hover{border-color:#d4a820;color:#c41e2e;}
.pc-actions button.del:hover{border-color:#c41e2e;color:#c41e2e;}
.pc-name{font-size:17px;font-weight:700;color:#1a1a1a;margin-bottom:3px;letter-spacing:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.pc-loc{font-size:12px;color:#888;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.pc-client{font-size:12px;color:#aaa;margin-bottom:12px;}
.pc-metrics{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:12px;}
.pc-mv{font-family:'JetBrains Mono',monospace;font-size:15px;font-weight:600;color:#333;}
.pc-ml{font-size:10px;color:#aaa;margin-left:4px;text-transform:uppercase;}
.pc-price{font-family:'JetBrains Mono',monospace;font-size:20px;font-weight:700;color:#c41e2e;}
.pc-watt{font-family:'JetBrains Mono',monospace;font-size:12px;color:#d4a820;margin-top:2px;}
.pc-date{font-size:11px;color:#ccc;margin-top:8px;}

/* CONFIRM MODAL */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:999;display:flex;align-items:center;justify-content:center;padding:20px;}
.modal{background:#fff;border:1px solid #e8e6e0;border-radius:12px;padding:28px;max-width:380px;width:100%;text-align:center;box-shadow:0 12px 40px rgba(0,0,0,.15);}
.modal h3{font-size:17px;color:#1a1a1a;margin-bottom:8px;letter-spacing:1px;}
.modal p{font-size:13px;color:#888;margin-bottom:20px;}
.modal-btns{display:flex;gap:10px;justify-content:center;}
.modal-btns button{font-family:'Agency FB','Arial Narrow',sans-serif;font-size:14px;font-weight:700;padding:9px 20px;border:none;border-radius:6px;cursor:pointer;letter-spacing:1px;}
.btn-cancel{background:#f0ede8;color:#666;}
.btn-danger{background:#c41e2e;color:#fff;}
.btn-danger:hover{background:#a01020;}
.btn-exit{font-family:'Agency FB','Arial Narrow',sans-serif;font-size:12px;font-weight:600;padding:7px 14px;border:1px solid #e0d0d0;border-radius:6px;background:transparent;color:#c41e2e;cursor:pointer;transition:all .15s;white-space:nowrap;}
.btn-exit:hover{border-color:#c41e2e;background:#fef5f5;}

/* EDITOR */
.editor{min-height:100vh;}
.ed-top{display:flex;align-items:center;gap:16px;padding:12px 20px;background:#fff;border-bottom:1px solid #e8e6e0;position:sticky;top:0;z-index:100;flex-wrap:wrap;box-shadow:0 1px 3px rgba(0,0,0,.04);}
.btn-back{font-family:'Agency FB','Arial Narrow',sans-serif;font-size:13px;font-weight:600;padding:7px 14px;border:1px solid #e8e6e0;border-radius:6px;background:transparent;color:#888;cursor:pointer;transition:all .15s;white-space:nowrap;}
.btn-back:hover{border-color:#d4a820;color:#1a1a1a;}
.ed-title{flex:1;min-width:120px;}
.ed-title h2{font-size:17px;font-weight:700;color:#1a1a1a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:1px;}
.ed-mw{font-family:'JetBrains Mono',monospace;font-size:12px;color:#888;}
.ed-actions{display:flex;align-items:center;gap:12px;}
.ed-price{font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:700;color:#c41e2e;}
.btn-save{font-family:'Agency FB','Arial Narrow',sans-serif;font-size:13px;font-weight:700;padding:8px 16px;border:none;border-radius:6px;background:#f0ede8;color:#888;cursor:pointer;transition:all .15s;white-space:nowrap;letter-spacing:1px;}
.btn-save.pulse{background:#c41e2e;color:#fff;animation:pulse-glow 2s infinite;}
@keyframes pulse-glow{0%,100%{box-shadow:0 0 0 rgba(196,30,46,0);}50%{box-shadow:0 0 12px rgba(196,30,46,.35);}}

.tabs{display:flex;gap:2px;padding:6px 14px;background:#faf9f6;overflow-x:auto;border-bottom:1px solid #e8e6e0;-ms-overflow-style:none;scrollbar-width:none;}
.tabs::-webkit-scrollbar{display:none;}
.tabs button{font-family:'Agency FB','Arial Narrow',sans-serif;font-size:13px;font-weight:600;padding:8px 14px;border:none;border-radius:6px;background:transparent;color:#aaa;cursor:pointer;white-space:nowrap;transition:all .15s;letter-spacing:1px;}
.tabs button:hover{color:#666;background:#f0ede8;}
.tabs button.active{color:#1a1a1a;background:#fff;box-shadow:inset 0 -2px 0 #c41e2e;}

.ed-body{padding:16px;max-width:1100px;margin:0 auto;}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.g4{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;}
@media(max-width:700px){.g2,.g4{grid-template-columns:1fr;}.g4{grid-template-columns:repeat(3,1fr);}}

.card{background:#fff;border:1px solid #e8e6e0;border-top:3px solid #d4a820;border-radius:8px;padding:16px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,.03);}
.card h3{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#d4a820;margin-bottom:12px;}

.stat-box{background:#faf9f6;border:1px solid #e8e6e0;border-radius:8px;padding:10px;text-align:center;}
.stat-box.met{border-color:#2a8a3a;background:#f0faf2;}.stat-box.met .stat-val{color:#1a7a2e;}
.stat-box.unmet{border-color:#c41e2e;background:#fef5f5;}.stat-box.unmet .stat-val{color:#c41e2e;}
.stat-val{font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:700;color:#1a1a1a;}
.stat-lbl{font-size:10px;color:#aaa;text-transform:uppercase;letter-spacing:1px;margin-top:2px;}

.fld{margin-bottom:8px;}
.fld label{display:block;font-size:12px;font-weight:600;color:#888;margin-bottom:2px;letter-spacing:.5px;}
.fld.chk label{display:flex;align-items:center;gap:7px;cursor:pointer;font-size:13px;color:#555;}
.fld.chk input[type=checkbox]{width:15px;height:15px;accent-color:#c41e2e;}
.inp-w{display:flex;align-items:center;background:#faf9f6;border:1px solid #e0ddd6;border-radius:6px;overflow:hidden;transition:border .15s;}
.inp-w:focus-within{border-color:#d4a820;}
.inp-w .fx{font-size:11px;color:#bbb;padding:0 7px;font-family:'JetBrains Mono',monospace;}
.inp-w input,select{font-family:'Agency FB','Arial Narrow',sans-serif;font-size:14px;color:#333;background:transparent;border:none;outline:none;padding:7px 9px;width:100%;}
select{background:#faf9f6;border:1px solid #e0ddd6;border-radius:6px;padding:7px 9px;font-family:'Agency FB','Arial Narrow',sans-serif;font-size:14px;color:#333;}
input[type=number]::-webkit-inner-spin-button{opacity:.3;}
input[type=date]{color:#333;}
input[type=date]::-webkit-calendar-picker-indicator{filter:none;}

.rrow{display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid #f0ede8;font-size:14px;}
.rrow.sub{padding-left:12px;}.rrow.sub .rl{color:#ccc;font-size:13px;}
.rrow .rl{color:#888;}.rrow .rv{font-family:'JetBrains Mono',monospace;font-weight:600;color:#444;font-size:13px;}
.rrow.hl{background:#fffdf5;border-radius:6px;padding:7px 10px;margin:3px -10px;border:1px solid #f0e8d0;}.rrow.hl .rl{color:#1a1a1a;font-weight:700;}.rrow.hl .rv{color:#c41e2e;font-size:14px;}
.rrow.warn .rv{color:#d4a820;}
.div{border:none;border-top:1px solid #f0ede8;margin:10px 0;}

.hero{background:#fff;border:1px solid #e8e6e0;border-radius:12px;padding:28px;text-align:center;margin-bottom:16px;box-shadow:0 2px 8px rgba(0,0,0,.04);}
.hero-label{font-size:11px;color:#d4a820;text-transform:uppercase;letter-spacing:2px;font-weight:700;}
.hero-big{font-family:'JetBrains Mono',monospace;font-size:34px;font-weight:700;color:#c41e2e;margin:4px 0;}
.hero-sub{font-family:'JetBrains Mono',monospace;font-size:14px;color:#d4a820;margin:2px 0;}
.hero-bond{font-size:12px;color:#aaa;margin-top:10px;}
.hero-bond strong{color:#c41e2e;}

.scope-bar{display:flex;gap:2px;height:8px;border-radius:4px;overflow:hidden;margin:14px 0 6px;}
.scope-bar div{min-width:3px;transition:width .3s;}
.scope-leg{display:flex;flex-wrap:wrap;gap:6px 10px;justify-content:center;}
.scope-leg span{font-size:10px;color:#888;display:flex;align-items:center;gap:4px;}
.scope-leg i{width:7px;height:7px;border-radius:2px;display:inline-block;}
      `}),C&&e.jsx("div",{className:"modal-overlay",onClick:()=>S(null),children:e.jsxs("div",{className:"modal",onClick:E=>E.stopPropagation(),children:[e.jsx("h3",{children:"Delete this bid?"}),e.jsx("p",{children:"This action cannot be undone. The bid and all its data will be permanently removed."}),e.jsxs("div",{className:"modal-btns",children:[e.jsx("button",{className:"btn-cancel",onClick:()=>S(null),children:"Cancel"}),e.jsx("button",{className:"btn-danger",onClick:()=>a(C),children:"Delete"})]})]})}),T?e.jsx(pn,{project:T,onSave:l,onBack:()=>b(null),onExit:n}):e.jsx(un,{projects:d,onOpen:b,onCreate:s,onDuplicate:w,onDelete:E=>S(E),onExit:n})]})}function gn(){const[n,t]=x.useState(!0),[d,p]=x.useState(0),[o,b]=x.useState(0),[u,j]=x.useState(0),[C,S]=x.useState(4e3),[s,l]=x.useState(typeof window<"u"?window.innerWidth<768:!1),[w,a]=x.useState("landing"),[T,E]=x.useState(null),[M,O]=x.useState(""),[$,ae]=x.useState(""),[ne,G]=x.useState(""),[z,X]=x.useState({name:"",email:"",phone:"",position:"",experience:"",message:""}),[se,le]=x.useState(!1),[re,ce]=x.useState(""),[q,je]=x.useState([]),[de,K]=x.useState([]),[pe,be]=x.useState([]),[I,ee]=x.useState({heroTitle:"WE DOMINATE SOLAR",heroSub:"The technical powerhouse delivering dominance, precision, and efficiency for the nation's largest utility-scale projects.",contactEmail:"Kaleb.LeBaron@sunriseconstructionco.com",contactPhone:"+1 (619) 870-4491",contactAddr:"12856 N Hwy 183 Ste B PMB 2011 Austin TX 78750",portalTitle:"EMPLOYEE PORTAL"}),[Q,ue]=x.useState("invite"),[L,me]=x.useState({name:"",email:"",role:"member",tools:["field","equipment","hr","precon","compliance","hse","stakeholders"]}),[fe,Ne]=x.useState(""),[J,Ae]=x.useState("");function Se(r){for(var h=5381,i=0;i<r.length;i++)h=(h<<5)+h+r.charCodeAt(i),h=h&h;return Math.abs(h).toString(36)}x.useEffect(function(){_("portal_users").then(function(i){if(!i||i.length===0){var f={id:te(),name:"Dustin Hanson",email:"dustin.hanson@sunriseconstructionco.com",role:"admin",tools:["field","equipment","hr","precon","compliance","hse","stakeholders","admin"],passwordHash:Se("admin123"),createdAt:new Date().toISOString()};je([f]),Y("portal_users",[f])}else je(i)}),_("portal_invites").then(function(i){K(i||[])}),_("portal_requests").then(function(i){be(i||[])});try{var r=new URLSearchParams(window.location.search),h=r.get("invite");h&&(a("login"),O("You have an invitation! Set a password below to create your account."),window._pendingInvite=h)}catch{}_("portal_site").then(function(i){i&&ee(function(f){return Object.assign({},f,i)})})},[]);function we(r){je(r),Y("portal_users",r)}function Te(r){K(r),Y("portal_invites",r)}function Re(r){be(r),Y("portal_requests",r)}function ie(r){ee(r),Y("portal_site",r)}function Me(){if(O(""),!re.trim()||!ne.trim()){O("Enter email and password");return}if(re.indexOf("@sunriseconstructionco.com")<0){O("Only @sunriseconstructionco.com emails allowed");return}var r=q.find(function(h){return h.email===re&&h.passwordHash===Se(ne)});if(!r){O("Invalid credentials or no account. Contact admin for invite.");return}E(r),a("dashboard")}function He(r){O("");try{var h=JSON.parse(atob(r));if(!h||!h.email){O("Invalid invite");return}if(q.find(function(f){return f.email===h.email})){O("Account already exists. Sign in.");return}if(!ne.trim()){O("Set a password");return}var i={id:te(),name:h.name||"",email:h.email,role:h.role||"member",tools:h.tools||[],passwordHash:Se(ne),createdAt:new Date().toISOString(),invitedBy:h.invitedBy||""};we(q.concat([i])),Te(de.map(function(f){return f.email===h.email?Object.assign({},f,{used:!0}):f})),E(i),a("dashboard")}catch{O("Invalid invite link")}}function Be(){if(!(!L.email||L.email.indexOf("@sunriseconstructionco.com")<0)&&!q.find(function(f){return f.email===L.email})){var r={id:te(),name:L.name,email:L.email,role:L.role,tools:L.tools,createdAt:new Date().toISOString(),invitedBy:T?T.name:"Admin",used:!1};Te(de.concat([r]));var h=btoa(JSON.stringify({name:r.name,email:r.email,role:r.role,tools:r.tools,invitedBy:r.invitedBy})),i=window.location.origin+window.location.pathname+"?invite="+h;window.open("https://mail.google.com/mail/?view=cm&fs=1&to="+encodeURIComponent(r.email)+"&su="+encodeURIComponent("SRC%26D Employee Portal Invitation")+"&body="+encodeURIComponent(`You have been invited to the SRC%26D Employee Portal.

Click to join:
`+i),"_blank"),me({name:"",email:"",role:"member",tools:["field","equipment","hr","precon","compliance","hse","stakeholders"]})}}function ze(){if(!(!J||!fe.trim())){var r={id:te(),userId:T?T.id:"",userName:T?T.name:"",userEmail:T?T.email:"",tool:J,reason:fe,status:"pending",createdAt:new Date().toISOString()};Re(pe.concat([r])),Ae(""),Ne("")}}function qe(r){var h=pe.find(function(f){return f.id===r});if(h){Re(pe.map(function(f){return f.id===r?Object.assign({},f,{status:"approved"}):f}));var i=q.map(function(f){if(f.id===h.userId){var B=f.tools?f.tools.concat([h.tool]):[h.tool];return Object.assign({},f,{tools:B})}return f});we(i),T&&T.id===h.userId&&E(Object.assign({},T,{tools:(T.tools||[]).concat([h.tool])}))}}function Qe(r){Re(pe.map(function(h){return h.id===r?Object.assign({},h,{status:"denied"}):h}))}var he=T&&T.role==="admin",Fe=T&&T.tools?T.tools:[];function oe(r){return he||Fe.indexOf(r)>=0}var xe={field:"Field Manager",equipment:"Equipment Manager",hr:"HR Solutions",precon:"PreCon Controls",compliance:"Compliance Center",hse:"HS&E",stakeholders:"Stakeholder Reports"};const Oe=x.useRef();x.useEffect(()=>{const r=()=>l(window.innerWidth<768);return window.addEventListener("resize",r),()=>window.removeEventListener("resize",r)},[]),x.useEffect(()=>{const r=[setTimeout(()=>p(1),320),setTimeout(()=>p(2),1050),setTimeout(()=>p(3),1850),setTimeout(()=>p(4),3100),setTimeout(()=>p(5),3550),setTimeout(()=>t(!1),4500)];let h=0;const i=setInterval(()=>{h=Math.min(100,h+Math.random()*5.5+2),b(h),h>=100&&clearInterval(i)},80);return()=>{r.forEach(clearTimeout),clearInterval(i)}},[]),x.useEffect(()=>{if(n)return;const r=Oe.current;if(!r)return;const h=()=>{j(r.scrollTop),S(r.scrollHeight)};return r.addEventListener("scroll",h,{passive:!0}),setTimeout(h,100),()=>r.removeEventListener("scroll",h)},[n]);const De=typeof window<"u"?window.innerHeight:700,ke=C>De?u/Math.max(C-De,1):0,R={fontFamily:"'Bebas Neue',sans-serif"},g={fontFamily:"'Barlow Condensed',sans-serif"},c=s,D=dt.map(([r,h,i,f,B,Ce])=>({pileP:Ie(ke,r,h),tubeP:Ie(ke,i,f),panelP:Ie(ke,B,Ce)})),A=D.reduce((r,h)=>r+(h.pileP+h.tubeP+h.panelP)/3,0)/D.length,U=A<.15?"SITE PREP":A<.35?"PILE INSTALL":A<.55?"RACKING":A<.75?"MODULES":"OPERATIONAL",N={width:"100%",background:"rgba(8,8,20,.7)",border:"1px solid rgba(255,255,255,.08)",color:"#F5F0EB",padding:"12px 16px",fontFamily:"'Barlow',sans-serif",fontSize:16,outline:"none",borderRadius:0,WebkitAppearance:"none"},H=r=>{r.target.style.borderColor="rgba(249,115,22,.5)",r.target.style.boxShadow="0 0 0 3px rgba(249,115,22,.08)"},W=r=>{r.target.style.borderColor="rgba(255,255,255,.08)",r.target.style.boxShadow=""};return e.jsxs("div",{style:{position:"fixed",inset:0,fontFamily:"'Barlow',sans-serif"},children:[e.jsx("style",{children:Dt}),n&&e.jsx(Gt,{phase:d,prog:o}),e.jsxs("div",{ref:Oe,style:{position:"absolute",inset:0,overflowY:"scroll",overflowX:"hidden"},children:[e.jsx(Mt,{scrollP:ke}),e.jsxs("nav",{style:{position:"fixed",top:0,left:0,right:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"space-between",padding:c?"14px 20px":"16px 40px",background:"rgba(2,2,12,.85)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(249,115,22,.1)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,flexShrink:0,marginRight:c?0:20},children:[e.jsx("img",{src:Ke,alt:"SRC",style:{width:c?36:48,height:c?36:48,objectFit:"contain"}}),e.jsxs("div",{children:[e.jsx("div",{style:{...R,fontSize:c?17:21,letterSpacing:"4px",color:"#F5F0EB",lineHeight:1},children:"SUNRISE"}),e.jsx("div",{style:{...g,fontSize:c?7:9,letterSpacing:"2px",color:v,textTransform:"uppercase",whiteSpace:"nowrap"},children:"Construction & Development"})]})]}),!c&&e.jsx("div",{style:{display:"flex",gap:22},children:["Safety","Capabilities","Portfolio","Careers","Contact"].map(r=>e.jsx("a",{href:"#"+r.toLowerCase(),style:{...g,fontSize:12,letterSpacing:"2px",textTransform:"uppercase",color:"#CCC8C2",whiteSpace:"nowrap",textDecoration:"none",transition:"color .2s"},onMouseEnter:h=>h.target.style.color=v,onMouseLeave:h=>h.target.style.color="#CCC8C2",children:r},r))}),w==="landing"&&e.jsx("div",{style:{...g,fontSize:c?10:12,letterSpacing:c?"1px":"2px",textTransform:"uppercase",color:"#CCC8C2",cursor:"pointer",transition:"color .2s",whiteSpace:"nowrap"},onClick:function(){a("login")},onMouseEnter:r=>r.target.style.color=v,onMouseLeave:r=>r.target.style.color="#CCC8C2",children:"Employee Portal"}),w!=="landing"&&e.jsx("div",{style:{...g,fontSize:c?10:12,letterSpacing:c?"1px":"2px",textTransform:"uppercase",color:"#CCC8C2",cursor:"pointer",transition:"color .2s",whiteSpace:"nowrap"},onClick:function(){a("landing"),E(null)},onMouseEnter:r=>r.target.style.color=v,onMouseLeave:r=>r.target.style.color="#CCC8C2",children:"Back to Site"}),e.jsx("a",{href:"#contact",style:{background:v,color:"#1a1206",...g,fontSize:c?11:13,fontWeight:700,letterSpacing:c?"2px":"3px",textTransform:"uppercase",textDecoration:"none",padding:c?"8px 12px":"10px 26px",clipPath:"polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",transition:"background .2s",whiteSpace:"nowrap"},onMouseEnter:r=>r.target.style.background="#FB923C",onMouseLeave:r=>r.target.style.background=v,children:c?"Get In Touch":"Partner Now"})]}),w==="landing"&&!c&&e.jsx("div",{style:{position:"fixed",top:76,right:20,zIndex:90,...g,fontSize:9,letterSpacing:"4px",textTransform:"uppercase",color:"rgba(249,115,22,.5)"},children:U}),w==="login"&&e.jsx("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",zIndex:10,padding:c?"80px 16px 40px":"120px 48px"},children:e.jsxs("div",{style:{width:c?"100%":420,maxWidth:"95vw",background:"rgba(8,8,20,.88)",backdropFilter:"blur(18px)",border:"1px solid rgba(249,115,22,.15)",padding:c?"36px 28px":"48px 40px"},children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:32},children:[e.jsx("img",{src:Ke,alt:"SRC&D",style:{width:72,height:72,objectFit:"contain",marginBottom:16}}),e.jsx("div",{style:{...R,fontSize:28,letterSpacing:"4px",color:"#F5F0EB"},children:I.portalTitle}),e.jsx("div",{style:{...g,fontSize:12,letterSpacing:"3px",color:v,textTransform:"uppercase",marginTop:4},children:"Sunrise Construction & Development"})]}),M&&e.jsx("div",{style:{background:"rgba(239,68,68,.12)",border:"1px solid rgba(239,68,68,.3)",color:"#EF4444",padding:"10px 14px",marginBottom:16,fontSize:13,...g,letterSpacing:"1px"},children:M}),e.jsxs("div",{style:{marginBottom:16},children:[e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"3px",textTransform:"uppercase",color:v,marginBottom:6},children:"EMAIL"}),e.jsx("input",{value:re,onChange:function(r){ce(r.target.value)},style:{...N},onFocus:H,onBlur:W,placeholder:"name@sunriseconstructionco.com"})]}),e.jsxs("div",{style:{marginBottom:24},children:[e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"3px",textTransform:"uppercase",color:v,marginBottom:6},children:"PASSWORD"}),e.jsx("input",{type:"password",value:ne,onChange:function(r){G(r.target.value)},style:{...N},onFocus:H,onBlur:W,placeholder:"Enter password",onKeyDown:function(r){r.key==="Enter"&&Me()}})]}),e.jsx("div",{style:{cursor:"pointer",background:v,color:"#1a1206",textAlign:"center",...g,fontSize:14,fontWeight:700,letterSpacing:"3px",textTransform:"uppercase",padding:"14px 0",clipPath:"polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)",transition:"background .2s"},onClick:Me,onMouseEnter:function(r){r.target.style.background="#FB923C"},onMouseLeave:function(r){r.target.style.background=v},children:"Sign In"}),window._pendingInvite&&e.jsx("div",{style:{cursor:"pointer",background:"#22c55e",color:"#fff",textAlign:"center",...g,fontSize:14,fontWeight:700,letterSpacing:"3px",textTransform:"uppercase",padding:"14px 0",marginTop:12,transition:"background .2s"},onClick:function(){He(window._pendingInvite),window._pendingInvite=null},children:"ACCEPT INVITE & CREATE ACCOUNT"}),e.jsx("div",{style:{textAlign:"center",marginTop:20,...g,fontSize:11,letterSpacing:"1.5px",color:"#555"},children:"Invite-only access · @sunriseconstructionco.com"}),e.jsx("div",{style:{textAlign:"center",marginTop:8,...g,fontSize:11,color:"#555"},children:"Default admin: dustin.hanson@sunriseconstructionco.com / admin123"})]})}),w==="dashboard"&&e.jsx("div",{style:{minHeight:"100vh",position:"relative",zIndex:10,padding:c?"76px 14px 32px":"120px 48px 80px"},children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto"},children:[e.jsxs("div",{style:{marginBottom:c?28:40},children:[e.jsxs("div",{style:{...g,fontSize:12,letterSpacing:"4px",textTransform:"uppercase",color:v,marginBottom:8,display:"flex",alignItems:"center",gap:12},children:[e.jsx("div",{style:{width:22,height:1,background:v}}),"Welcome back"]}),e.jsx("div",{style:{...R,fontSize:c?"clamp(32px,8vw,48px)":"clamp(36px,5vw,56px)",letterSpacing:2,color:"#F5F0EB",textShadow:"0 2px 8px rgba(0,0,0,1)"},children:T?T.name.toUpperCase():"OPERATOR"}),e.jsxs("div",{style:{...g,fontSize:13,color:"#888",letterSpacing:"1.5px",marginTop:4},children:[T?T.email:""," · ",T?T.role.toUpperCase():"MEMBER"]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:c?"1fr":"repeat(4, 1fr)",gap:c?14:20},children:[[{key:"field",label:"Field Manager",icon:"F",desc:"Daily logs, crew tracking & site progress"},{key:"equipment",label:"Equipment Manager",icon:"E",desc:"Asset tracking, maintenance & utilization"},{key:"hr",label:"HR Solutions",icon:"H",desc:"Onboarding, payroll & employee records"},{key:"precon",label:"PreCon Controls",icon:"P",desc:"Estimating, takeoffs & bid management"},{key:"sitemap",label:"Site Map",icon:"M",desc:"Drawing import & live site progress"},{key:"compliance",label:"Compliance Center",icon:"C",desc:"ISNet, licensing & regulatory docs"},{key:"hse",label:"HS&E",icon:"S",desc:"Safety incidents, training & audits"},{key:"stakeholders",label:"Stakeholder Reports",icon:"R",desc:"Owner updates, financials & milestones"}].filter(function(r){return oe(r.key)}).map(function(r){return e.jsxs("div",{onClick:function(){a(r.key)},style:{background:"rgba(8,8,20,.72)",backdropFilter:"blur(12px)",border:"1px solid rgba(249,115,22,.12)",padding:c?"24px 18px":"32px 28px",cursor:"pointer",transition:"all .3s",position:"relative",overflow:"hidden"},onMouseEnter:function(h){h.currentTarget.style.borderColor="rgba(249,115,22,.4)",h.currentTarget.style.background="rgba(249,115,22,.06)",h.currentTarget.style.transform="translateY(-4px)"},onMouseLeave:function(h){h.currentTarget.style.borderColor="rgba(249,115,22,.12)",h.currentTarget.style.background="rgba(8,8,20,.72)",h.currentTarget.style.transform="translateY(0)"},children:[e.jsx("div",{style:{...R,fontSize:c?36:48,color:v,opacity:.18,position:"absolute",top:c?12:16,right:c?14:20,lineHeight:1},children:r.icon}),e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"3px",textTransform:"uppercase",color:v,marginBottom:8},children:"MODULE"}),e.jsx("div",{style:{...R,fontSize:c?20:26,letterSpacing:"2px",color:"#F5F0EB",marginBottom:8},children:r.label.toUpperCase()}),e.jsx("div",{style:{...g,fontSize:12,color:"#888",letterSpacing:"1px",lineHeight:1.5},children:r.desc}),e.jsxs("div",{style:{marginTop:16,...g,fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:v,display:"flex",alignItems:"center",gap:6},children:["Launch ",e.jsx("span",{style:{fontSize:14},children:"→"})]})]},r.key)}),he&&e.jsxs("div",{onClick:function(){a("admin")},style:{background:"rgba(8,8,20,.72)",backdropFilter:"blur(12px)",border:"1px solid rgba(249,115,22,.12)",padding:c?"24px 18px":"32px 28px",cursor:"pointer",transition:"all .3s",position:"relative",overflow:"hidden"},onMouseEnter:function(r){r.currentTarget.style.borderColor="rgba(249,115,22,.4)",r.currentTarget.style.background="rgba(249,115,22,.06)",r.currentTarget.style.transform="translateY(-4px)"},onMouseLeave:function(r){r.currentTarget.style.borderColor="rgba(249,115,22,.12)",r.currentTarget.style.background="rgba(8,8,20,.72)",r.currentTarget.style.transform="translateY(0)"},children:[e.jsx("div",{style:{...R,fontSize:c?36:48,color:v,opacity:.18,position:"absolute",top:c?12:16,right:c?14:20,lineHeight:1},children:"⚙"}),e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"3px",textTransform:"uppercase",color:"#EF4444",marginBottom:8},children:"ADMIN"}),e.jsx("div",{style:{...R,fontSize:c?20:26,letterSpacing:"2px",color:"#F5F0EB",marginBottom:8},children:"ADMIN DASHBOARD"}),e.jsx("div",{style:{...g,fontSize:12,color:"#888",letterSpacing:"1px",lineHeight:1.5},children:"Users, invites, access & site editor"}),e.jsxs("div",{style:{marginTop:16,...g,fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"#EF4444",display:"flex",alignItems:"center",gap:6},children:["Manage ",e.jsx("span",{style:{fontSize:14},children:"→"})]})]}),!he&&e.jsxs("div",{onClick:function(){a("request")},style:{background:"rgba(8,8,20,.72)",backdropFilter:"blur(12px)",border:"1px dashed rgba(249,115,22,.25)",padding:c?"24px 18px":"32px 28px",cursor:"pointer",transition:"all .3s"},onMouseEnter:function(r){r.currentTarget.style.borderColor="rgba(249,115,22,.4)"},onMouseLeave:function(r){r.currentTarget.style.borderColor="rgba(249,115,22,.25)"},children:[e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"3px",textTransform:"uppercase",color:"#888",marginBottom:8},children:"NEED ACCESS?"}),e.jsx("div",{style:{...R,fontSize:c?20:26,letterSpacing:"2px",color:"#F5F0EB",marginBottom:8},children:"REQUEST ACCESS"}),e.jsx("div",{style:{...g,fontSize:12,color:"#888",letterSpacing:"1px",lineHeight:1.5},children:"Request access to additional tools"})]})]}),e.jsx("div",{style:{marginTop:c?28:40,textAlign:"center"},children:e.jsx("div",{style:{display:"inline-block",cursor:"pointer",...g,fontSize:12,letterSpacing:"2px",textTransform:"uppercase",color:"#777",transition:"color .2s"},onClick:function(){a("landing"),E(null)},onMouseEnter:function(r){r.target.style.color=v},onMouseLeave:function(r){r.target.style.color="#777"},children:"← Sign Out & Return to Site"})})]})}),w==="admin"&&he&&e.jsx("div",{style:{minHeight:"100vh",position:"relative",zIndex:10,padding:c?"76px 14px 32px":"120px 48px 80px"},children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto"},children:[e.jsx("div",{style:{cursor:"pointer",display:"inline-flex",alignItems:"center",gap:8,...g,fontSize:12,letterSpacing:"2px",textTransform:"uppercase",color:v,marginBottom:28},onClick:function(){a("dashboard")},children:"← Back to Dashboard"}),e.jsx("div",{style:{...R,fontSize:c?"clamp(32px,8vw,48px)":"clamp(40px,5vw,64px)",letterSpacing:2,color:"#F5F0EB",textShadow:"0 2px 8px rgba(0,0,0,1)",marginBottom:24},children:"ADMIN DASHBOARD"}),e.jsx("div",{style:{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"},children:["invite","users","requests","editor"].map(function(r){return e.jsx("div",{onClick:function(){ue(r)},style:{padding:"8px 18px",...g,fontSize:12,letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer",background:Q===r?v:"rgba(8,8,20,.72)",color:Q===r?"#1a1206":"#aaa",border:"1px solid "+(Q===r?v:"rgba(249,115,22,.15)"),transition:"all .2s"},children:r==="editor"?"Site Editor":r},r)})}),Q==="invite"&&e.jsxs("div",{style:{background:"rgba(8,8,20,.72)",backdropFilter:"blur(12px)",border:"1px solid rgba(249,115,22,.12)",padding:c?24:32},children:[e.jsx("div",{style:{...R,fontSize:22,letterSpacing:2,color:"#F5F0EB",marginBottom:20},children:"INVITE USER"}),e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"3px",textTransform:"uppercase",color:v,marginBottom:4},children:"NAME"}),e.jsx("input",{value:L.name,onChange:function(r){me(Object.assign({},L,{name:r.target.value}))},style:{...N},onFocus:H,onBlur:W,placeholder:"Full name"})]}),e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"3px",textTransform:"uppercase",color:v,marginBottom:4},children:"EMAIL"}),e.jsx("input",{value:L.email,onChange:function(r){me(Object.assign({},L,{email:r.target.value}))},style:{...N},onFocus:H,onBlur:W,placeholder:"name@sunriseconstructionco.com"})]}),e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"3px",textTransform:"uppercase",color:v,marginBottom:4},children:"ROLE"}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx("div",{onClick:function(){me(Object.assign({},L,{role:"member"}))},style:{padding:"8px 18px",...g,fontSize:12,letterSpacing:"2px",cursor:"pointer",background:L.role==="member"?v:"transparent",color:L.role==="member"?"#1a1206":"#888",border:"1px solid "+(L.role==="member"?v:"#444")},children:"Member"}),e.jsx("div",{onClick:function(){me(Object.assign({},L,{role:"admin"}))},style:{padding:"8px 18px",...g,fontSize:12,letterSpacing:"2px",cursor:"pointer",background:L.role==="admin"?v:"transparent",color:L.role==="admin"?"#1a1206":"#888",border:"1px solid "+(L.role==="admin"?v:"#444")},children:"Admin"})]})]}),e.jsxs("div",{style:{marginBottom:16},children:[e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"3px",textTransform:"uppercase",color:v,marginBottom:6},children:"TOOL ACCESS"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6},children:Object.keys(xe).map(function(r){var h=L.tools.indexOf(r)>=0;return e.jsx("div",{onClick:function(){var i=h?L.tools.filter(function(f){return f!==r}):L.tools.concat([r]);me(Object.assign({},L,{tools:i}))},style:{padding:"6px 14px",...g,fontSize:11,letterSpacing:"1px",cursor:"pointer",background:h?"rgba(249,115,22,.15)":"transparent",color:h?v:"#666",border:"1px solid "+(h?v:"#444"),transition:"all .2s"},children:xe[r]},r)})})]}),e.jsx("div",{style:{cursor:"pointer",background:v,color:"#1a1206",textAlign:"center",...g,fontSize:14,fontWeight:700,letterSpacing:"3px",textTransform:"uppercase",padding:"14px 0"},onClick:Be,children:"SEND INVITE VIA GMAIL"})]}),Q==="users"&&e.jsxs("div",{style:{background:"rgba(8,8,20,.72)",backdropFilter:"blur(12px)",border:"1px solid rgba(249,115,22,.12)",padding:c?16:24},children:[e.jsxs("div",{style:{...R,fontSize:22,letterSpacing:2,color:"#F5F0EB",marginBottom:16},children:["USERS (",q.length,")"]}),q.map(function(r){return e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,.06)",flexWrap:"wrap",gap:8},children:[e.jsxs("div",{children:[e.jsx("div",{style:{...g,fontSize:14,color:"#F5F0EB",fontWeight:600},children:r.name}),e.jsxs("div",{style:{...g,fontSize:11,color:"#888"},children:[r.email," · ",r.role]}),e.jsxs("div",{style:{...g,fontSize:10,color:"#555",marginTop:2},children:["Tools: ",(r.tools||[]).join(", ")]})]}),e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx("div",{onClick:function(){var h=q.map(function(i){return i.id===r.id?Object.assign({},i,{role:i.role==="admin"?"member":"admin"}):i});we(h)},style:{padding:"4px 12px",...g,fontSize:10,letterSpacing:"1px",cursor:"pointer",background:r.role==="admin"?"rgba(59,130,246,.15)":"rgba(234,179,8,.15)",color:r.role==="admin"?"#60a5fa":"#eab308"},children:r.role==="admin"?"Demote":"Promote"}),r.email!=="dustin.hanson@sunriseconstructionco.com"&&e.jsx("div",{onClick:function(){we(q.filter(function(h){return h.id!==r.id}))},style:{padding:"4px 12px",...g,fontSize:10,letterSpacing:"1px",cursor:"pointer",background:"rgba(239,68,68,.12)",color:"#ef4444"},children:"Remove"})]})]},r.id)})]}),Q==="requests"&&e.jsxs("div",{style:{background:"rgba(8,8,20,.72)",backdropFilter:"blur(12px)",border:"1px solid rgba(249,115,22,.12)",padding:c?16:24},children:[e.jsx("div",{style:{...R,fontSize:22,letterSpacing:2,color:"#F5F0EB",marginBottom:16},children:"ACCESS REQUESTS"}),pe.filter(function(r){return r.status==="pending"}).length===0&&e.jsx("div",{style:{...g,fontSize:13,color:"#888"},children:"No pending requests"}),pe.slice().reverse().map(function(r){return e.jsx("div",{style:{padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,.06)"},children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{...g,fontSize:14,color:"#F5F0EB"},children:[r.userName," requests ",e.jsx("span",{style:{color:v},children:xe[r.tool]||r.tool})]}),e.jsx("div",{style:{...g,fontSize:11,color:"#888"},children:r.reason}),e.jsx("div",{style:{...g,fontSize:10,color:"#555"},children:new Date(r.createdAt).toLocaleDateString()})]}),r.status==="pending"&&e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx("div",{onClick:function(){qe(r.id)},style:{padding:"4px 14px",...g,fontSize:11,cursor:"pointer",background:"rgba(34,197,94,.15)",color:"#22c55e"},children:"Approve"}),e.jsx("div",{onClick:function(){Qe(r.id)},style:{padding:"4px 14px",...g,fontSize:11,cursor:"pointer",background:"rgba(239,68,68,.12)",color:"#ef4444"},children:"Deny"})]}),r.status!=="pending"&&e.jsx("div",{style:{...g,fontSize:11,color:r.status==="approved"?"#22c55e":"#ef4444"},children:r.status.toUpperCase()})]})},r.id)})]}),Q==="editor"&&e.jsxs("div",{style:{background:"rgba(8,8,20,.72)",backdropFilter:"blur(12px)",border:"1px solid rgba(249,115,22,.12)",padding:c?16:24},children:[e.jsx("div",{style:{...R,fontSize:22,letterSpacing:2,color:"#F5F0EB",marginBottom:16},children:"SITE EDITOR"}),e.jsx("div",{style:{...g,fontSize:11,color:"#888",marginBottom:16},children:"Changes save automatically. Refresh to see updates on landing page."}),[{k:"heroTitle",l:"HERO TITLE"},{k:"heroSub",l:"HERO SUBTITLE"},{k:"contactEmail",l:"CONTACT EMAIL"},{k:"contactPhone",l:"CONTACT PHONE"},{k:"contactAddr",l:"CONTACT ADDRESS"},{k:"portalTitle",l:"PORTAL LOGIN TITLE"}].map(function(r){return e.jsxs("div",{style:{marginBottom:14},children:[e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"3px",textTransform:"uppercase",color:v,marginBottom:4},children:r.l}),r.k==="heroSub"||r.k==="contactAddr"?e.jsx("textarea",{value:I[r.k]||"",onChange:function(h){var i=Object.assign({},I);i[r.k]=h.target.value,ie(i)},rows:2,style:{...N,resize:"vertical"}}):e.jsx("input",{value:I[r.k]||"",onChange:function(h){var i=Object.assign({},I);i[r.k]=h.target.value,ie(i)},style:{...N},onFocus:H,onBlur:W})]},r.k)})]})]})}),w==="request"&&!he&&e.jsx("div",{style:{minHeight:"100vh",position:"relative",zIndex:10,padding:c?"76px 14px 32px":"120px 48px 80px"},children:e.jsxs("div",{style:{maxWidth:600,margin:"0 auto"},children:[e.jsx("div",{style:{cursor:"pointer",display:"inline-flex",alignItems:"center",gap:8,...g,fontSize:12,letterSpacing:"2px",textTransform:"uppercase",color:v,marginBottom:28},onClick:function(){a("dashboard")},children:"← Back"}),e.jsx("div",{style:{...R,fontSize:c?28:40,letterSpacing:2,color:"#F5F0EB",textShadow:"0 2px 8px rgba(0,0,0,1)",marginBottom:24},children:"REQUEST ACCESS"}),e.jsxs("div",{style:{background:"rgba(8,8,20,.72)",backdropFilter:"blur(12px)",border:"1px solid rgba(249,115,22,.12)",padding:c?24:32},children:[e.jsxs("div",{style:{marginBottom:16},children:[e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"3px",textTransform:"uppercase",color:v,marginBottom:6},children:"SELECT TOOL"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6},children:Object.keys(xe).filter(function(r){return!oe(r)}).map(function(r){return e.jsx("div",{onClick:function(){Ae(r)},style:{padding:"6px 14px",...g,fontSize:11,letterSpacing:"1px",cursor:"pointer",background:J===r?"rgba(249,115,22,.15)":"transparent",color:J===r?v:"#666",border:"1px solid "+(J===r?v:"#444")},children:xe[r]},r)})}),Object.keys(xe).filter(function(r){return!oe(r)}).length===0&&e.jsx("div",{style:{...g,fontSize:13,color:"#22c55e"},children:"You have access to all tools!"})]}),e.jsxs("div",{style:{marginBottom:16},children:[e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"3px",textTransform:"uppercase",color:v,marginBottom:4},children:"REASON"}),e.jsx("textarea",{value:fe,onChange:function(r){Ne(r.target.value)},rows:3,style:{...N,resize:"vertical"},placeholder:"Why do you need access to this tool?"})]}),e.jsx("div",{style:{cursor:"pointer",background:J&&fe.trim()?v:"#444",color:J&&fe.trim()?"#1a1206":"#888",textAlign:"center",...g,fontSize:14,fontWeight:700,letterSpacing:"3px",textTransform:"uppercase",padding:"14px 0"},onClick:function(){J&&fe.trim()&&ze()},children:"SUBMIT REQUEST"})]}),pe.filter(function(r){return r.userId===(T?T.id:"")}).length>0&&e.jsxs("div",{style:{marginTop:20},children:[e.jsx("div",{style:{...g,fontSize:12,letterSpacing:"2px",color:"#888",marginBottom:8},children:"YOUR REQUESTS"}),pe.filter(function(r){return r.userId===(T?T.id:"")}).map(function(r){return e.jsxs("div",{style:{background:"rgba(8,8,20,.5)",padding:"10px 14px",marginBottom:6,display:"flex",justifyContent:"space-between",...g,fontSize:12},children:[e.jsx("span",{style:{color:"#F5F0EB"},children:xe[r.tool]||r.tool}),e.jsx("span",{style:{color:r.status==="approved"?"#22c55e":r.status==="denied"?"#ef4444":"#eab308"},children:r.status.toUpperCase()})]},r.id)})]})]})}),w==="sitemap"&&e.jsx(window.__SrcSiteMap,{onExit:function(){a("dashboard")}}),w==="precon"&&e.jsx(xn,{onExit:function(){a("dashboard")},portalUser:T&&T.name?T.name:T}),w==="equipment"&&e.jsx(rn,{onExit:function(){a("dashboard")},portalUser:T&&T.name?T.name:T}),w==="field"&&e.jsxs("div",{style:{position:"fixed",inset:0,zIndex:2e3,background:"#0a0a0a"},children:[e.jsx("iframe",{src:"https://daily-task-tracker-a9c72.web.app",style:{width:"100%",height:"100%",border:"none"},allow:"camera;microphone;fullscreen",title:"Field Reporting"}),e.jsx("div",{onClick:function(){a("dashboard")},style:{position:"fixed",top:16,right:16,zIndex:2001,width:40,height:40,borderRadius:"50%",background:"rgba(0,0,0,0.85)",border:"1px solid rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff",fontSize:18,fontFamily:"'Agency FB','Arial Narrow',sans-serif",backdropFilter:"blur(8px)",transition:"all .2s"},onMouseEnter:function(r){r.currentTarget.style.background="rgba(249,115,22,0.9)",r.currentTarget.style.transform="scale(1.1)"},onMouseLeave:function(r){r.currentTarget.style.background="rgba(0,0,0,0.85)",r.currentTarget.style.transform="scale(1)"},children:"✕"})]}),w==="hr"&&e.jsx(tn,{onExit:function(){a("dashboard")},portalUser:T&&T.name?T.name:T}),["compliance","hse","stakeholders"].includes(w)&&e.jsx("div",{style:{minHeight:"100vh",position:"relative",zIndex:10,padding:c?"76px 14px 32px":"120px 48px 80px"},children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto"},children:[e.jsx("div",{style:{cursor:"pointer",display:"inline-flex",alignItems:"center",gap:8,...g,fontSize:12,letterSpacing:"2px",textTransform:"uppercase",color:v,marginBottom:28,transition:"opacity .2s"},onClick:()=>a("dashboard"),onMouseEnter:r=>r.currentTarget.style.opacity=".7",onMouseLeave:r=>r.currentTarget.style.opacity="1",children:"← Back to Dashboard"}),e.jsx("div",{style:{...R,fontSize:c?"clamp(32px,8vw,48px)":"clamp(40px,5vw,64px)",letterSpacing:2,color:"#F5F0EB",textShadow:"0 2px 8px rgba(0,0,0,1)",marginBottom:16},children:{field:"FIELD MANAGER",equipment:"EQUIPMENT MANAGER",precon:"PRECON CONTROLS",compliance:"COMPLIANCE CENTER",hse:"HS&E",stakeholders:"STAKEHOLDER REPORTS"}[w]}),e.jsx("div",{style:{...g,fontSize:14,color:"#888",letterSpacing:"1.5px"},children:"Module content coming soon."})]})}),w==="landing"&&e.jsxs(e.Fragment,{children:[e.jsxs("section",{style:{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",position:"relative",padding:c?"90px 24px 60px":"120px 48px 80px",zIndex:5},children:[e.jsxs("div",{style:{maxWidth:c?"100%":1200,margin:"0 auto",width:"100%"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:16,...g,fontSize:c?10:12,letterSpacing:"4px",textTransform:"uppercase",color:v},children:[e.jsx("div",{style:{width:28,height:1,background:v}}),"Elite Solar Subcontractor"]}),e.jsxs("h1",{style:{...R,fontSize:c?"clamp(58px,16vw,88px)":"clamp(70px,10.5vw,155px)",lineHeight:.9,letterSpacing:2,color:"#F5F0EB",textShadow:"0 2px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9)"},children:[e.jsx("span",{style:{display:"block",WebkitTextFillColor:"transparent",WebkitTextStroke:"1px rgba(245,240,235,.18)"},children:"WE"}),e.jsx("span",{style:{display:"block",color:"#F5F0EB",textShadow:"0 0 80px rgba(249,115,22,.28)"},children:"DOMINATE"}),e.jsx("span",{style:{display:"block",WebkitTextFillColor:"transparent",WebkitTextStroke:"1px rgba(245,240,235,.18)"},children:"SOLAR"})]}),e.jsx("p",{style:{fontSize:c?15:17,fontWeight:300,color:"#CCC8C2",maxWidth:460,lineHeight:1.75,margin:c?"18px 0":"26px 0"},children:"The technical powerhouse delivering dominance, precision, and efficiency for the nation's largest utility-scale projects."}),e.jsxs("div",{style:{display:"flex",gap:c?14:20,alignItems:"center",flexWrap:"wrap"},children:[e.jsx("a",{href:"#contact",style:{display:"inline-flex",alignItems:"center",gap:10,background:v,color:"#1a1206",...g,fontSize:c?12:14,fontWeight:700,letterSpacing:"3px",textTransform:"uppercase",textDecoration:"none",padding:c?"13px 24px":"15px 34px",clipPath:"polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)",transition:"all .25s"},onMouseEnter:r=>{r.currentTarget.style.background="#FB923C"},onMouseLeave:r=>{r.currentTarget.style.background=v},children:"Partner Now →"}),e.jsx("a",{href:"#portfolio",style:{...g,fontSize:c?12:13,letterSpacing:"2.5px",textTransform:"uppercase",color:"#CCC8C2",textDecoration:"none",borderBottom:"1px solid rgba(255,255,255,.2)",paddingBottom:3,transition:"color .2s"},children:"View Portfolio →"})]}),c?e.jsx("div",{style:{display:"flex",gap:32,marginTop:36,paddingTop:28,borderTop:"1px solid rgba(255,255,255,.06)"},children:[{n:"500+",l:"MW Installed"},{n:"1.2M+",l:"Modules Placed"},{n:"9",l:"States"}].map(r=>e.jsxs("div",{children:[e.jsx("div",{style:{...R,fontSize:32,color:v,lineHeight:1},children:r.n}),e.jsx("div",{style:{...g,fontSize:9,letterSpacing:"2px",textTransform:"uppercase",color:"#ccc",textShadow:"0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)",marginTop:3},children:r.l})]},r.n))}):e.jsx("div",{style:{position:"absolute",right:48,bottom:"14%",display:"flex",flexDirection:"column",gap:26},children:[{n:"500+",l:"Megawatts Installed"},{n:"1.2M+",l:"Modules Placed"}].map(r=>e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("div",{style:{...R,fontSize:50,color:v,lineHeight:1,textShadow:"0 0 30px rgba(249,115,22,.4)"},children:r.n}),e.jsx("div",{style:{...g,fontSize:11,letterSpacing:"3px",textTransform:"uppercase",color:"#ccc",textShadow:"0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)",marginTop:4},children:r.l})]},r.n))})]}),!c&&e.jsxs("div",{style:{position:"absolute",bottom:34,left:48,display:"flex",alignItems:"center",gap:12,...g,fontSize:11,letterSpacing:"3px",textTransform:"uppercase",color:"#bbb",textShadow:"0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)"},children:[e.jsx("div",{style:{width:38,height:1,background:"#333",overflow:"hidden",position:"relative"},children:e.jsx("div",{style:{position:"absolute",inset:0,background:v,animation:"scrollLine 2s ease-in-out infinite"}})}),"Scroll"]})]}),e.jsx(Pe,{id:"stats",style:{padding:c?"32px 20px":"56px 48px"},children:e.jsxs("div",{style:{maxWidth:1100,margin:"0 auto",background:"rgba(2,2,12,.82)",backdropFilter:"blur(16px)",border:"1px solid rgba(249,115,22,.1)",padding:c?"28px 20px":"46px 40px"},children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:c?22:32},children:[e.jsxs("div",{style:{...g,fontSize:c?10:11,letterSpacing:"4px",textTransform:"uppercase",color:v,marginBottom:8,display:"inline-flex",alignItems:"center",gap:12},children:[e.jsx("div",{style:{width:22,height:1,background:v}}),"Our Team's Track Record",e.jsx("div",{style:{width:22,height:1,background:v}})]}),e.jsx("div",{style:{...g,fontSize:c?12:14,fontWeight:300,color:"#999",letterSpacing:".5px",maxWidth:680,margin:"0 auto",lineHeight:1.55},children:"Built and installed by the people who run SRC&D — combined field experience from utility-scale solar projects our team has personally delivered."})]}),c?e.jsx("div",{style:{display:"flex",justifyContent:"space-around",gap:16},children:[{n:"500+",l:"MW Our Team Installed"},{n:"1.2M+",l:"Modules Team Placed"},{n:"9",l:"States Worked"}].map(r=>e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{...R,fontSize:38,color:"#F5F0EB",lineHeight:1},children:r.n}),e.jsx("div",{style:{...g,fontSize:9,letterSpacing:"2px",textTransform:"uppercase",color:"#ccc",textShadow:"0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)",marginTop:6},children:r.l})]},r.n))}):e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr auto 1fr auto 1fr",alignItems:"center"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{...R,fontSize:66,color:"#F5F0EB",lineHeight:1},children:"500+"}),e.jsx("div",{style:{...g,fontSize:12,letterSpacing:"3.5px",textTransform:"uppercase",color:"#ccc",textShadow:"0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)",marginTop:8},children:"Megawatts Our Team Installed"})]}),e.jsx("div",{style:{width:1,height:70,background:"linear-gradient(to bottom,transparent,rgba(249,115,22,.4),transparent)",margin:"0 16px"}}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{...R,fontSize:66,color:"#F5F0EB",lineHeight:1},children:"1.2M+"}),e.jsx("div",{style:{...g,fontSize:12,letterSpacing:"3.5px",textTransform:"uppercase",color:"#ccc",textShadow:"0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)",marginTop:8},children:"Modules Team Placed"})]}),e.jsx("div",{style:{width:1,height:70,background:"linear-gradient(to bottom,transparent,rgba(249,115,22,.4),transparent)",margin:"0 16px"}}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{...R,fontSize:66,color:"#F5F0EB",lineHeight:1},children:"9"}),e.jsx("div",{style:{...g,fontSize:12,letterSpacing:"3.5px",textTransform:"uppercase",color:"#ccc",textShadow:"0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)",marginTop:8},children:"States Team Worked"})]})]})]})}),e.jsx(Pe,{id:"safety",children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto"},children:[e.jsxs("div",{style:{...g,fontSize:11,letterSpacing:"4px",textTransform:"uppercase",color:v,marginBottom:14,display:"flex",alignItems:"center",gap:12},children:[e.jsx("div",{style:{width:22,height:1,background:v}}),"Our Commitment"]}),e.jsx("h2",{style:{...R,fontSize:"clamp(36px,8vw,76px)",letterSpacing:2,marginBottom:c?28:48,color:"#F5F0EB",textShadow:"0 2px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9)"},children:"SAFETY & QUALITY FIRST"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:c?"1fr":"1fr 1fr",gap:c?32:68,alignItems:"center"},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:c?15:17,fontWeight:300,color:"#CCC8C2",lineHeight:1.8,marginBottom:18},children:"Getting it done right the first time through leading communication and transparency."}),e.jsx("p",{style:{fontSize:c?15:17,fontWeight:300,color:"#CCC8C2",lineHeight:1.8,marginBottom:c?20:28},children:"Our commitment to excellence drives every pile we drive and every module we secure — with zero compromise."}),e.jsx("div",{children:["ISNetworld Certified","OSHA Compliant","Apprenticeship Enabled","Safety First Promise","Zero Tolerance"].map(r=>e.jsx("span",{style:{display:"inline-block",padding:"6px 14px",border:"1px solid rgba(249,115,22,.28)",fontSize:c?9:11,letterSpacing:"2px",textTransform:"uppercase",color:v,...g,background:"rgba(249,115,22,.05)",clipPath:"polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",margin:"3px 2px"},children:r},r))})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:c?"1fr 1fr":"1fr 1fr 1fr",gap:c?6:10},children:[{n:"100%",l:"Compliance",hi:!1},{n:"0",l:"Incidents",hi:!0},{n:"A+",l:"Safety Rating",hi:!1},{n:"24/7",l:"Oversight",hi:!1},{n:`CREW
FIRST`,l:"Culture",hi:!1},{n:`TOP
TIER`,l:"Training",hi:!1}].map(r=>e.jsxs("div",{style:{height:c?80:102,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:r.hi?"rgba(249,115,22,.08)":"rgba(8,8,20,.55)",backdropFilter:"blur(8px)",border:"1px solid "+(r.hi?"rgba(249,115,22,.4)":"rgba(249,115,22,.18)"),transition:"all .3s"},children:[e.jsx("div",{style:{...R,fontSize:r.n.includes(`
`)?c?16:22:c?22:30,color:v,lineHeight:1.1,textAlign:"center",whiteSpace:"pre-line"},children:r.n}),e.jsx("div",{style:{...g,fontSize:c?8:10,letterSpacing:"1px",textTransform:"uppercase",color:"#ccc",textShadow:"0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)",marginTop:3},children:r.l})]},r.l))})]})]})}),e.jsx(Pe,{id:"capabilities",children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto"},children:[e.jsxs("div",{style:{...g,fontSize:11,letterSpacing:"4px",textTransform:"uppercase",color:v,marginBottom:14,display:"flex",alignItems:"center",gap:12},children:[e.jsx("div",{style:{width:22,height:1,background:v}}),"What We Deliver"]}),e.jsx("h2",{style:{...R,fontSize:"clamp(36px,8vw,76px)",letterSpacing:2,marginBottom:c?24:48,color:"#F5F0EB",textShadow:"0 2px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9)"},children:"CAPABILITIES"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:c?"1fr":"repeat(3,1fr)",gap:2},children:Jt.map((r,h)=>e.jsx(Yt,{c:r,ci:h},h))})]})}),e.jsx(Pe,{id:"portfolio",children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:c?24:48,flexWrap:"wrap",gap:14},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{...g,fontSize:11,letterSpacing:"4px",textTransform:"uppercase",color:v,marginBottom:12,display:"flex",alignItems:"center",gap:12},children:[e.jsx("div",{style:{width:22,height:1,background:v}}),"Track Record"]}),e.jsx("h2",{style:{...R,fontSize:"clamp(36px,8vw,76px)",letterSpacing:2,color:"#F5F0EB",textShadow:"0 2px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9)"},children:"PROJECT PORTFOLIO"}),e.jsx("p",{style:{...g,fontSize:c?14:16,lineHeight:1.7,color:"#ccc",textShadow:"0 1px 4px rgba(0,0,0,0.9)",marginBottom:c?20:32,maxWidth:600},children:"Our core team has been key contributors on the following projects."})]}),!c&&e.jsx("p",{style:{maxWidth:280,fontSize:15,fontWeight:300,color:"#ccc",textShadow:"0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)",lineHeight:1.7}})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:c?"1fr":s?"1fr 1fr":"repeat(3,1fr)",gap:2},children:Vt.map((r,h)=>e.jsx(Ut,{p:r,i:h},r.name))})]})}),e.jsx(Pe,{id:"tracking",children:e.jsxs("div",{style:{maxWidth:1400,margin:"0 auto",display:"grid",gridTemplateColumns:c?"1fr":"1fr 1fr 1fr",gap:c?16:40,alignItems:"stretch"},children:[e.jsxs("div",{style:{background:"rgba(8,8,20,.65)",backdropFilter:"blur(14px)",border:"1px solid rgba(249,115,22,.1)",padding:c?18:26},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:12},children:[e.jsx("span",{style:{...g,fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"#bbb",textShadow:"0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)"},children:"Task"}),e.jsx("div",{style:{display:"flex",gap:c?3:4},children:["Wk 1","Wk 2","Wk 3"].map(r=>e.jsx("span",{style:{...g,fontSize:9,letterSpacing:"1px",textTransform:"uppercase",color:"#bbb",textShadow:"0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)",width:c?40:56,textAlign:"center"},children:r},r))})]}),[{n:"Pile Driving",c:3,a:0,e:0},{n:"Tracker Assy",c:2,a:1,e:0},{n:"Torque Tubes",c:1,a:1,e:1},{n:"Module Install",c:0,a:1,e:2},{n:"Electrical",c:0,a:0,e:3}].map(r=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8},children:[e.jsx("span",{style:{...g,fontSize:c?10:12,letterSpacing:"1px",textTransform:"uppercase",color:"#CCC8C2",minWidth:c?80:108},children:r.n}),e.jsx("div",{style:{display:"flex",gap:c?3:4},children:[...Array(r.c).fill("c"),...Array(r.a).fill("a"),...Array(r.e).fill("p")].map((h,i)=>e.jsx("div",{style:{width:c?40:56,height:c?18:24,borderRadius:3,background:h==="c"?"linear-gradient(135deg,#16A34A,#22C55E)":h==="a"?"linear-gradient(135deg,#F97316,#EAB308)":"#1E1E1E",border:h==="p"?"1px solid rgba(255,255,255,.07)":"none"}},i))})]},r.n)),e.jsx("div",{style:{display:"flex",gap:14,marginTop:14,flexWrap:"wrap"},children:[["#22C55E","Complete"],[v,"Active"],["#1E1E1E","Pending"]].map(([r,h])=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,...g,fontSize:10,letterSpacing:"1.5px",textTransform:"uppercase",color:"#ccc",textShadow:"0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)"},children:[e.jsx("div",{style:{width:10,height:10,borderRadius:2,background:r,border:r==="#1E1E1E"?"1px solid rgba(255,255,255,.1)":"none"}}),h]},h))})]}),e.jsxs("div",{style:{position:"relative",overflow:"hidden",border:"1px solid rgba(249,115,22,.18)",background:"rgba(8,8,20,.65)",backdropFilter:"blur(8px)",marginBottom:24},children:[e.jsx(Bt,{src:"/models/midway.glb",height:c?240:340}),e.jsx("div",{style:{position:"absolute",top:10,left:12,fontFamily:"'Barlow Condensed',sans-serif",fontSize:9,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(249,115,22,.7)",pointerEvents:"none"},children:"▲ LIVE SITE MODEL"}),e.jsx("div",{style:{position:"absolute",bottom:10,right:12,fontFamily:"'Barlow Condensed',sans-serif",fontSize:9,letterSpacing:"1.5px",textTransform:"uppercase",color:"rgba(249,115,22,.55)",pointerEvents:"none"},children:"MIDWAY · 11/4/25"}),e.jsx("div",{style:{position:"absolute",inset:0,background:"radial-gradient(ellipse at center,transparent 55%,rgba(0,0,0,.45) 100%)",pointerEvents:"none"}})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{...g,fontSize:11,letterSpacing:"4px",textTransform:"uppercase",color:v,marginBottom:14,display:"flex",alignItems:"center",gap:12},children:[e.jsx("div",{style:{width:22,height:1,background:v}}),"Real-Time Precision"]}),e.jsx("h2",{style:{...R,fontSize:"clamp(30px,6vw,66px)",letterSpacing:2,marginBottom:18,color:"#F5F0EB",textShadow:"0 2px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9)"},children:"TRACKING ACCURACY"}),e.jsx("p",{style:{fontSize:c?14:16,fontWeight:300,color:"#777",lineHeight:1.8,marginBottom:12},children:"Precision is the backbone of utility-scale operations. Our industry-leading production tracking provides EPCs with absolute transparency."}),e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:14,background:"rgba(249,115,22,.07)",border:"1px solid rgba(249,115,22,.2)",padding:c?"14px 20px":"18px 28px",marginTop:c?16:28,clipPath:"polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)"},children:[e.jsxs("div",{style:{...R,fontSize:c?38:50,color:v,lineHeight:1},children:["99.8",e.jsx("span",{style:{fontSize:c?18:24},children:"%"})]}),e.jsxs("div",{style:{...g,fontSize:c?10:12,letterSpacing:"2px",textTransform:"uppercase",color:"#CCC8C2"},children:["Production",e.jsx("br",{}),"Tracking Accuracy"]})]})]})]})}),e.jsxs("div",{style:{background:v,padding:c?"20px 20px":"28px 48px",display:"flex",alignItems:"center",justifyContent:"center",gap:c?12:34,flexWrap:"wrap",position:"relative",zIndex:5},children:[["National Coverage","Utility-Scale","ISNet Compliant","Safety First"].map(r=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,...g,fontSize:c?10:13,letterSpacing:c?"2px":"3px",textTransform:"uppercase",color:"#F97316",textShadow:"0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)",fontWeight:700},children:[e.jsx("div",{style:{width:4,height:4,background:"#080808",borderRadius:"50%"}}),r]},r)),e.jsx("a",{href:"#contact",style:{background:"#080808",color:v,padding:c?"10px 20px":"12px 32px",...g,fontSize:c?11:13,fontWeight:700,letterSpacing:"3px",textTransform:"uppercase",textDecoration:"none",clipPath:"polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)"},onMouseEnter:r=>r.currentTarget.style.background="#1a1a1a",onMouseLeave:r=>r.currentTarget.style.background="#080808",children:"Partner Now →"})]}),e.jsx(Pe,{id:"contact",children:e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:c?"1fr":"1fr 1fr",gap:c?36:88},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{...g,fontSize:11,letterSpacing:"4px",textTransform:"uppercase",color:v,marginBottom:14,display:"flex",alignItems:"center",gap:12},children:[e.jsx("div",{style:{width:22,height:1,background:v}}),"Make a Connection"]}),e.jsx("h2",{style:{...R,fontSize:"clamp(32px,7vw,66px)",letterSpacing:2,marginBottom:c?20:34,color:"#F5F0EB",textShadow:"0 2px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9)"},children:"GET IN TOUCH"}),[{l:"Headquarters",v:`12856 N Hwy 183, Ste B PMB 2011
Austin, TX 78750`},{l:"Phone",v:"+1 (619) 870-4491"},{l:"Email",v:"Kaleb.LeBaron@sunriseconstructionco.com"}].map(r=>e.jsxs("div",{style:{padding:"16px 0",borderBottom:"1px solid rgba(255,255,255,.06)"},children:[e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"3px",textTransform:"uppercase",color:v,marginBottom:4},children:r.l}),e.jsx("div",{style:{fontSize:c?13:15,fontWeight:300,color:"#F5F0EB",whiteSpace:"pre-line",wordBreak:"break-all"},children:r.v})]},r.l))]}),e.jsxs("div",{children:[e.jsxs("div",{style:{...g,fontSize:11,letterSpacing:"4px",textTransform:"uppercase",color:v,marginBottom:18,display:"flex",alignItems:"center",gap:12},children:[e.jsx("div",{style:{width:22,height:1,background:v}}),"Start a Conversation"]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12},children:["First Name","Last Name"].map(r=>e.jsxs("div",{children:[e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"#ccc",textShadow:"0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)",marginBottom:6},children:r}),e.jsx("input",{placeholder:r==="First Name"?"John":"Smith",style:N,onFocus:H,onBlur:W})]},r))}),["Company / EPC","Email"].map(r=>e.jsxs("div",{children:[e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"#ccc",textShadow:"0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)",marginBottom:6},children:r}),e.jsx("input",{type:r==="Email"?"email":"text",placeholder:r==="Email"?"john@company.com":"Company Name",style:N,onFocus:H,onBlur:W})]},r)),e.jsxs("div",{children:[e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"2px",textTransform:"uppercase",color:"#ccc",textShadow:"0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)",marginBottom:6},children:"Project Details"}),e.jsx("textarea",{placeholder:"MW capacity, location, timeline...",style:{...N,minHeight:c?80:105,resize:"vertical"},onFocus:H,onBlur:W})]}),e.jsx("button",{onMouseEnter:r=>{r.currentTarget.style.background="#FB923C"},onMouseLeave:r=>{r.currentTarget.style.background=v},style:{display:"inline-flex",alignItems:"center",gap:10,background:v,color:"#1a1206",...g,fontSize:c?12:14,fontWeight:700,letterSpacing:"3px",textTransform:"uppercase",padding:c?"13px 24px":"15px 34px",border:"none",cursor:"pointer",clipPath:"polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)",transition:"all .25s",alignSelf:"flex-start"},children:"Send Message →"})]})]})]})}),e.jsx(Pe,{id:"careers",children:e.jsxs("div",{style:{maxWidth:900,margin:"0 auto"},children:[e.jsxs("div",{style:{...g,fontSize:12,letterSpacing:"4px",textTransform:"uppercase",color:v,marginBottom:14,display:"flex",alignItems:"center",gap:12},children:[e.jsx("div",{style:{width:22,height:1,background:v}}),"Join Our Team"]}),e.jsx("h2",{style:{...R,fontSize:"clamp(36px,8vw,76px)",letterSpacing:2,marginBottom:c?16:24,color:"#F5F0EB",textShadow:"0 2px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9)"},children:"CAREERS"}),e.jsx("p",{style:{...g,fontSize:c?14:16,lineHeight:1.8,color:"#ccc",textShadow:"0 1px 4px rgba(0,0,0,0.9)",marginBottom:c?24:36,maxWidth:600},children:"We're building the future of solar energy across 9 states. If you're ready to join a team that's installed 500+ MW and placed 1.2M+ modules, we want to hear from you."}),se?e.jsxs("div",{style:{background:"rgba(34,197,94,.12)",border:"1px solid rgba(34,197,94,.3)",padding:c?"24px 20px":"32px 28px",textAlign:"center"},children:[e.jsx("div",{style:{...R,fontSize:28,letterSpacing:2,color:"#22c55e",marginBottom:8},children:"APPLICATION RECEIVED"}),e.jsx("div",{style:{...g,fontSize:14,color:"#ccc"},children:"Thank you for your interest. Our team will review your application and reach out if there's a match."}),e.jsx("div",{onClick:function(){le(!1),X({name:"",email:"",phone:"",position:"",experience:"",message:""})},style:{display:"inline-block",marginTop:16,...g,fontSize:12,letterSpacing:"2px",color:v,cursor:"pointer"},children:"Submit Another Application"})]}):e.jsxs("div",{style:{display:"grid",gridTemplateColumns:c?"1fr":"1fr 1fr",gap:c?12:20},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:14},children:[e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"3px",textTransform:"uppercase",color:v,marginBottom:6},children:"FULL NAME *"}),e.jsx("input",{value:z.name,onChange:function(r){X(Object.assign({},z,{name:r.target.value}))},style:{...N},onFocus:H,onBlur:W,placeholder:"Your full name"})]}),e.jsxs("div",{style:{marginBottom:14},children:[e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"3px",textTransform:"uppercase",color:v,marginBottom:6},children:"EMAIL *"}),e.jsx("input",{value:z.email,onChange:function(r){X(Object.assign({},z,{email:r.target.value}))},style:{...N},onFocus:H,onBlur:W,placeholder:"your@email.com"})]}),e.jsxs("div",{style:{marginBottom:14},children:[e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"3px",textTransform:"uppercase",color:v,marginBottom:6},children:"PHONE"}),e.jsx("input",{value:z.phone,onChange:function(r){X(Object.assign({},z,{phone:r.target.value}))},style:{...N},onFocus:H,onBlur:W,placeholder:"(xxx) xxx-xxxx"})]}),e.jsxs("div",{style:{marginBottom:14},children:[e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"3px",textTransform:"uppercase",color:v,marginBottom:6},children:"POSITION OF INTEREST"}),e.jsxs("select",{value:z.position,onChange:function(r){X(Object.assign({},z,{position:r.target.value}))},style:{...N,appearance:"auto"},onFocus:H,onBlur:W,children:[e.jsx("option",{value:"",children:"Select a position..."}),e.jsx("option",{value:"Civil Foreman",children:"Civil Foreman"}),e.jsx("option",{value:"Pile Crew Lead",children:"Pile Crew Lead"}),e.jsx("option",{value:"Tracker Installer",children:"Tracker Installer"}),e.jsx("option",{value:"Electrician",children:"Electrician"}),e.jsx("option",{value:"Equipment Operator",children:"Equipment Operator"}),e.jsx("option",{value:"Site Superintendent",children:"Site Superintendent"}),e.jsx("option",{value:"Project Manager",children:"Project Manager"}),e.jsx("option",{value:"Safety Manager",children:"Safety Manager"}),e.jsx("option",{value:"QA/QC Inspector",children:"QA/QC Inspector"}),e.jsx("option",{value:"Field Engineer",children:"Field Engineer"}),e.jsx("option",{value:"General Laborer",children:"General Laborer"}),e.jsx("option",{value:"Other",children:"Other"})]})]})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:14},children:[e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"3px",textTransform:"uppercase",color:v,marginBottom:6},children:"YEARS OF EXPERIENCE"}),e.jsxs("select",{value:z.experience,onChange:function(r){X(Object.assign({},z,{experience:r.target.value}))},style:{...N,appearance:"auto"},onFocus:H,onBlur:W,children:[e.jsx("option",{value:"",children:"Select..."}),e.jsx("option",{value:"0-1",children:"0-1 years"}),e.jsx("option",{value:"2-4",children:"2-4 years"}),e.jsx("option",{value:"5-9",children:"5-9 years"}),e.jsx("option",{value:"10+",children:"10+ years"})]})]}),e.jsxs("div",{style:{marginBottom:14},children:[e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"3px",textTransform:"uppercase",color:v,marginBottom:6},children:"TELL US ABOUT YOURSELF"}),e.jsx("textarea",{value:z.message,onChange:function(r){X(Object.assign({},z,{message:r.target.value}))},rows:4,style:{...N,resize:"vertical"},onFocus:H,onBlur:W,placeholder:"Relevant skills, certifications, availability..."})]}),e.jsxs("div",{style:{marginBottom:14},children:[e.jsx("div",{style:{...g,fontSize:10,letterSpacing:"3px",textTransform:"uppercase",color:v,marginBottom:6},children:"RESUME (PDF)"}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",background:"rgba(249,115,22,.06)",border:"1px dashed rgba(249,115,22,.3)",cursor:"pointer",transition:"background .2s"},onMouseEnter:function(r){r.currentTarget.style.background="rgba(249,115,22,.12)"},onMouseLeave:function(r){r.currentTarget.style.background="rgba(249,115,22,.06)"},children:[e.jsx("span",{style:{...g,fontSize:13,color:v,letterSpacing:"1px"},children:"Upload Resume"}),e.jsx("input",{type:"file",accept:".pdf,.doc,.docx",style:{display:"none"},onChange:function(r){r.target.files&&r.target.files[0]&&X(Object.assign({},z,{resume:r.target.files[0].name}))}}),z.resume&&e.jsx("span",{style:{...g,fontSize:11,color:"#888"},children:z.resume})]})]})]}),e.jsxs("div",{style:{gridColumn:c?"1":"1 / -1",marginTop:c?8:16},children:[e.jsx("div",{onClick:function(){if(!(!z.name||!z.email)){var r=Object.assign({},z,{id:te(),submittedAt:new Date().toISOString()});_("career_submissions").then(function(h){Y("career_submissions",(h||[]).concat([r]))}),le(!0)}},style:{cursor:z.name&&z.email?"pointer":"default",background:z.name&&z.email?v:"rgba(249,115,22,.3)",color:z.name&&z.email?"#1a1206":"#888",textAlign:"center",...g,fontSize:15,fontWeight:700,letterSpacing:"3px",textTransform:"uppercase",padding:"16px 0",clipPath:"polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)",transition:"background .2s"},children:"SUBMIT APPLICATION"}),e.jsx("div",{style:{textAlign:"center",marginTop:12,...g,fontSize:11,color:"#666",letterSpacing:"1px"},children:"We are an equal opportunity employer. All positions require travel to project sites across the US."})]})]})]})}),e.jsxs("footer",{style:{background:"rgba(1,1,6,.96)",padding:c?"28px 20px":"38px 48px",borderTop:"1px solid rgba(249,115,22,.1)",display:"flex",alignItems:c?"flex-start":"center",flexDirection:c?"column":"row",justifyContent:"space-between",flexWrap:"wrap",gap:c?16:18,position:"relative",zIndex:5},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,opacity:.7},children:[e.jsx("img",{src:Ke,alt:"SRC",style:{width:36,height:36,objectFit:"contain"}}),e.jsxs("div",{children:[e.jsx("div",{style:{...R,fontSize:16,letterSpacing:"4px",color:"#F5F0EB",lineHeight:1},children:"SUNRISE"}),e.jsx("div",{style:{...g,fontSize:8,letterSpacing:"3px",color:v,textTransform:"uppercase"},children:"Construction & Development"})]})]}),e.jsxs("div",{style:{...g,fontSize:c?9:11,letterSpacing:"2px",textTransform:"uppercase",color:"#ddd",textShadow:"0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)",textAlign:c?"left":"center"},children:["© 2026 Sunrise Construction & Development. All Rights Reserved.",!c&&e.jsx("br",{}),c?" ":"","Elite Subcontracting for Utility-Scale Solar Dominance."]}),!c&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[e.jsx("div",{style:{padding:"7px 14px",border:"1px solid rgba(249,115,22,.25)",...g,fontSize:10,letterSpacing:"2.5px",textTransform:"uppercase",color:v},children:"ISNet Compliant"}),e.jsx("div",{style:{...g,fontSize:11,letterSpacing:"2px",textTransform:"uppercase",color:"#ddd",textShadow:"0 1px 3px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,1)"},children:"National Coverage"})]})]})]})]})]})}window.storage={async get(n){try{const t=localStorage.getItem("src_"+n);return t?{key:n,value:t}:null}catch{return null}},async set(n,t){try{return localStorage.setItem("src_"+n,typeof t=="string"?t:JSON.stringify(t)),{key:n,value:t}}catch{return null}},async delete(n){try{return localStorage.removeItem("src_"+n),{key:n,deleted:!0}}catch{return null}},async list(n){try{const t=[];for(let d=0;d<localStorage.length;d++){const p=localStorage.key(d);p.startsWith("src_"+(n||""))&&t.push(p.replace("src_",""))}return{keys:t}}catch{return{keys:[]}}}};Ze.createRoot(document.getElementById("root")).render(e.jsx(ft.StrictMode,{children:e.jsx(gn,{})}));

;(function(){try{
var React=x;
var useState=x.useState,useEffect=x.useEffect,useRef=x.useRef,useCallback=x.useCallback,useMemo=x.useMemo;
if(!window.storage){window.storage={get:function(k){var v=localStorage.getItem(k);return Promise.resolve(v==null?null:{value:v})},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}return Promise.resolve()}};}
const STAGES = [{
  key: "bores",
  label: "Bores",
  color: "#dc2626",
  level: 1
}, {
  key: "piles",
  label: "Piles",
  color: "#e86a10",
  level: 2
}, {
  key: "postCaps",
  label: "Post Caps",
  color: "#eab308",
  level: 3
}, {
  key: "torqueTube",
  label: "Torque Tube",
  color: "#0891b2",
  level: 4
}, {
  key: "modules",
  label: "Modules",
  color: "#16a34a",
  level: 5
}];
function stageByLevel(l) {
  return STAGES.find(s => s.level === l) || null;
}
function PileIcon({
  s = 14,
  color
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "9.5",
    y: "3",
    width: "2",
    height: "18",
    fill: color
  }), /*#__PURE__*/React.createElement("rect", {
    x: "12.5",
    y: "3",
    width: "2",
    height: "18",
    fill: color
  }), /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "9.5",
    width: "8",
    height: "2.5",
    rx: ".5",
    fill: color
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "17",
    x2: "19",
    y2: "17",
    stroke: color,
    strokeWidth: "1.2",
    strokeDasharray: "2 1.5",
    opacity: ".5"
  }));
}
function TorqueTubeIcon({
  s = 14,
  color
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("g", {
    transform: "rotate(90 12 12)"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "10",
    width: "18",
    height: "4",
    rx: "2",
    fill: color
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "12",
    r: "2.2",
    fill: color,
    opacity: ".65"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "12",
    r: "2.2",
    fill: color,
    opacity: ".65"
  })));
}
function BoreIcon({
  s = 14,
  color
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "7",
    stroke: color,
    strokeWidth: "1.5",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3",
    fill: color,
    opacity: ".55"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 4L12 6",
    stroke: color,
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 18L12 20",
    stroke: color,
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 12L6 12",
    stroke: color,
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 12L20 12",
    stroke: color,
    strokeWidth: "1.2"
  }));
}
function PostCapIcon({
  s = 14,
  color
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "12",
    width: "6",
    height: "9",
    rx: ".5",
    fill: color,
    opacity: ".4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "8",
    width: "12",
    height: "5",
    rx: "1.5",
    fill: color
  }), /*#__PURE__*/React.createElement("rect", {
    x: "7",
    y: "7",
    width: "10",
    height: "2",
    rx: "1",
    fill: color,
    opacity: ".65"
  }));
}
function ModuleIcon({
  s = 14,
  color
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "5",
    width: "18",
    height: "14",
    rx: "1.5",
    fill: color
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "9.5",
    x2: "21",
    y2: "9.5",
    stroke: "#fff",
    strokeWidth: ".5",
    opacity: ".3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "14.5",
    x2: "21",
    y2: "14.5",
    stroke: "#fff",
    strokeWidth: ".5",
    opacity: ".3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "9",
    y1: "5",
    x2: "9",
    y2: "19",
    stroke: "#fff",
    strokeWidth: ".5",
    opacity: ".3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15",
    y1: "5",
    x2: "15",
    y2: "19",
    stroke: "#fff",
    strokeWidth: ".5",
    opacity: ".3"
  }));
}
const ICON_MAP = {
  bores: BoreIcon,
  piles: PileIcon,
  postCaps: PostCapIcon,
  torqueTube: TorqueTubeIcon,
  modules: ModuleIcon
};
function calcPcts(levels) {
  const t = levels.length;
  if (!t) return {
    _overall: 0
  };
  const r = {};
  STAGES.forEach(st => {
    r[st.key] = levels.filter(l => l >= st.level).length / t * 100;
  });
  r._overall = levels.reduce((a, b) => a + b, 0) / t / 5 * 100;
  return r;
}
function rowStarts(rl) {
  const s = [0];
  for (let i = 0; i < rl.length; i++) s.push(s[i] + rl[i]);
  return s;
}

/* ============================================================
   PDF / image ingest + computer-vision pipeline
   ============================================================ */

const PDFJS_VER = "3.11.174";
async function ensurePdfJs() {
  if (window.pdfjsLib) return window.pdfjsLib;
  await new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = `/assets/pdf.min.js`;
    s.onload = res;
    s.onerror = rej;
    document.head.appendChild(s);
  });
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = `/assets/pdf.worker.min.js`;
  return window.pdfjsLib;
}
async function fileToCanvas(file, pdfScale = 2) {
  if (file.type === "application/pdf" || /\.pdf$/i.test(file.name)) {
    const pdfjs = await ensurePdfJs();
    const buf = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({
      data: buf
    }).promise;
    const page = await pdf.getPage(1);
    let viewport = page.getViewport({
      scale: pdfScale
    });
    // Cap to a max long edge so detection stays interactive on large drawings.
    const maxEdge = 4000;
    const longest = Math.max(viewport.width, viewport.height);
    if (longest > maxEdge) {
      viewport = page.getViewport({
        scale: pdfScale * (maxEdge / longest)
      });
    }
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    await page.render({
      canvasContext: canvas.getContext("2d"),
      viewport
    }).promise;
    return canvas;
  }
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext("2d").drawImage(img, 0, 0);
    return canvas;
  } finally {
    URL.revokeObjectURL(url);
  }
}

// Find enclosed light regions (the interior of every dark-outlined marker).
// Works for circles regardless of fill color (including pure white) because we
// segment on "is this pixel surrounded by darker pixels" rather than on color.
function detectPoints(canvas, opts = {}) {
  const {
    darkV = 0.40,
    // V <= darkV is treated as the outline / "wall"
    minBlob = 30,
    maxBlob = 2000,
    arMin = 0.55,
    arMax = 1.8,
    minBboxPx = 8,
    maxBboxPx = 80
  } = opts;
  const W = canvas.width;
  const H = canvas.height;
  const data = canvas.getContext("2d").getImageData(0, 0, W, H).data;
  const N = W * H;
  // light[i] = 1 means the pixel is part of background / interior (not wall).
  const light = new Uint8Array(N);
  const v255 = Math.round(darkV * 255);
  for (let i = 0; i < N; i++) {
    const r = data[4 * i];
    const g = data[4 * i + 1];
    const b = data[4 * i + 2];
    const mx = r > g ? r > b ? r : b : g > b ? g : b;
    if (mx > v255) light[i] = 1;
  }
  // Flood-fill light pixels reachable from the image border. Anything reached
  // is the outer background; anything light but unreached is enclosed.
  const reached = new Uint8Array(N);
  const queue = new Int32Array(N);
  let qh = 0;
  let qt = 0;
  const push = idx => {
    if (light[idx] && !reached[idx]) {
      reached[idx] = 1;
      queue[qt++] = idx;
    }
  };
  for (let x = 0; x < W; x++) {
    push(x);
    push((H - 1) * W + x);
  }
  for (let y = 0; y < H; y++) {
    push(y * W);
    push(y * W + W - 1);
  }
  while (qh < qt) {
    const q = queue[qh++];
    const qx = q % W;
    const qy = (q - qx) / W;
    if (qx > 0) push(q - 1);
    if (qx < W - 1) push(q + 1);
    if (qy > 0) push(q - W);
    if (qy < H - 1) push(q + W);
  }
  // Label remaining (enclosed) light pixels into connected components.
  const visited = new Uint8Array(N);
  const points = [];
  const q2 = queue; // reuse
  for (let p = 0; p < N; p++) {
    if (!light[p] || reached[p] || visited[p]) continue;
    let h2 = 0;
    let t2 = 0;
    q2[t2++] = p;
    visited[p] = 1;
    let sx = 0;
    let sy = 0;
    let cnt = 0;
    let mnX = W;
    let mnY = H;
    let mxX = 0;
    let mxY = 0;
    while (h2 < t2) {
      const q = q2[h2++];
      const qx = q % W;
      const qy = (q - qx) / W;
      sx += qx;
      sy += qy;
      cnt++;
      if (qx < mnX) mnX = qx;
      if (qy < mnY) mnY = qy;
      if (qx > mxX) mxX = qx;
      if (qy > mxY) mxY = qy;
      if (qx > 0) {
        const n = q - 1;
        if (light[n] && !reached[n] && !visited[n]) {
          visited[n] = 1;
          q2[t2++] = n;
        }
      }
      if (qx < W - 1) {
        const n = q + 1;
        if (light[n] && !reached[n] && !visited[n]) {
          visited[n] = 1;
          q2[t2++] = n;
        }
      }
      if (qy > 0) {
        const n = q - W;
        if (light[n] && !reached[n] && !visited[n]) {
          visited[n] = 1;
          q2[t2++] = n;
        }
      }
      if (qy < H - 1) {
        const n = q + W;
        if (light[n] && !reached[n] && !visited[n]) {
          visited[n] = 1;
          q2[t2++] = n;
        }
      }
    }
    if (cnt < minBlob || cnt > maxBlob) continue;
    const w = mxX - mnX + 1;
    const h = mxY - mnY + 1;
    const ar = w / h;
    if (ar < arMin || ar > arMax) continue;
    const bboxLong = Math.max(w, h);
    if (bboxLong < minBboxPx || bboxLong > maxBboxPx) continue;
    // Use the bbox center rather than the pixel centroid: the post-rivnut dot
    // inside each circle skews the centroid otherwise.
    points.push({
      x: (mnX + mxX) / 2,
      y: (mnY + mxY) / 2,
      size: cnt,
      w,
      h
    });
  }
  return points;
}

// Median nearest-neighbor distance gives within-row spacing; angle histogram
// of NN bearings gives the field's row orientation.
function estimateGrid(points) {
  const N = points.length;
  if (N < 4) return {
    spacing: 12,
    angle: 0
  };
  // Spatial bucket for fast NN.
  const approxSpacing = (() => {
    const sampleN = Math.min(200, N);
    const ds = [];
    for (let k = 0; k < sampleN; k++) {
      const a = points[k * 9973 % N];
      let best = Infinity;
      for (let j = 0; j < N; j++) {
        if (j === k * 9973 % N) continue;
        const dx = points[j].x - a.x;
        const dy = points[j].y - a.y;
        const d = dx * dx + dy * dy;
        if (d < best) best = d;
      }
      ds.push(Math.sqrt(best));
    }
    ds.sort((a, b) => a - b);
    return ds[Math.floor(ds.length / 2)] || 12;
  })();
  const cell = approxSpacing * 3;
  const buckets = new Map();
  const bkey = (cx, cy) => cx * 1000003 + cy;
  for (let i = 0; i < N; i++) {
    const cx = Math.floor(points[i].x / cell);
    const cy = Math.floor(points[i].y / cell);
    const k = bkey(cx, cy);
    let arr = buckets.get(k);
    if (!arr) {
      arr = [];
      buckets.set(k, arr);
    }
    arr.push(i);
  }
  const dists = [];
  const angles = [];
  const sampleStep = Math.max(1, Math.floor(N / 800));
  for (let i = 0; i < N; i += sampleStep) {
    const px = points[i].x;
    const py = points[i].y;
    const cx = Math.floor(px / cell);
    const cy = Math.floor(py / cell);
    let best = Infinity;
    let bdx = 0;
    let bdy = 0;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const arr = buckets.get(bkey(cx + dx, cy + dy));
        if (!arr) continue;
        for (const j of arr) {
          if (j === i) continue;
          const ddx = points[j].x - px;
          const ddy = points[j].y - py;
          const d = ddx * ddx + ddy * ddy;
          if (d < best) {
            best = d;
            bdx = ddx;
            bdy = ddy;
          }
        }
      }
    }
    if (best === Infinity) continue;
    dists.push(Math.sqrt(best));
    let a = Math.atan2(bdy, bdx);
    while (a < 0) a += Math.PI;
    while (a >= Math.PI) a -= Math.PI;
    angles.push(a);
  }
  dists.sort((a, b) => a - b);
  const spacing = dists[Math.floor(dists.length / 2)] || approxSpacing;
  const BIN = 90;
  const bins = new Array(BIN).fill(0);
  for (const a of angles) {
    const b = Math.min(BIN - 1, Math.floor(a / Math.PI * BIN));
    bins[b]++;
  }
  let peak = 0;
  for (let i = 1; i < BIN; i++) if (bins[i] > bins[peak]) peak = i;
  // Weighted mean ±2 bins for sub-bin accuracy.
  let wsum = 0;
  let asum = 0;
  for (let d = -2; d <= 2; d++) {
    const bi = (peak + d + BIN) % BIN;
    const w = bins[bi];
    const a = (bi + 0.5) / BIN * Math.PI;
    wsum += w;
    asum += w * a;
  }
  const angle = wsum ? asum / wsum : 0;
  return {
    spacing,
    angle
  };
}

// Build a single section from the subset of points inside a user-drawn
// rectangle. Estimates grid (spacing, angle) from those points only, clusters
// them into rows, and produces { x, y, angle, colGap, rowGap, rl, offsets,
// levels } in image coordinates.
function buildSectionFromRect(points, rect, opts = {}) {
  const minX = Math.min(rect.x1, rect.x2);
  const maxX = Math.max(rect.x1, rect.x2);
  const minY = Math.min(rect.y1, rect.y2);
  const maxY = Math.max(rect.y1, rect.y2);
  const inside = points.filter(p => p.x >= minX && p.x <= maxX && p.y >= minY && p.y <= maxY);
  if (inside.length < 4) return null;
  const {
    spacing,
    angle
  } = estimateGrid(inside);
  const cosNA = Math.cos(-angle);
  const sinNA = Math.sin(-angle);
  const rot = inside.map(p => ({
    rx: p.x * cosNA - p.y * sinNA,
    ry: p.x * sinNA + p.y * cosNA
  }));
  rot.sort((a, b) => a.ry - b.ry);
  const rowEps = spacing * 0.55;
  const rowGroups = [];
  let cur = [rot[0]];
  for (let i = 1; i < rot.length; i++) {
    if (rot[i].ry - cur[cur.length - 1].ry > rowEps) {
      rowGroups.push(cur);
      cur = [rot[i]];
    } else cur.push(rot[i]);
  }
  rowGroups.push(cur);
  const colDs = [];
  for (const row of rowGroups) {
    row.sort((a, b) => a.rx - b.rx);
    for (let i = 1; i < row.length; i++) colDs.push(row[i].rx - row[i - 1].rx);
  }
  colDs.sort((a, b) => a - b);
  const colGap = colDs.length ? colDs[Math.floor(colDs.length * 0.3)] : spacing;
  const rowCenters = rowGroups.map(r => r.reduce((a, p) => a + p.ry, 0) / r.length);
  let rowGap = spacing * 2;
  if (rowCenters.length > 1) {
    const gaps = [];
    for (let i = 1; i < rowCenters.length; i++) gaps.push(rowCenters[i] - rowCenters[i - 1]);
    gaps.sort((a, b) => a - b);
    rowGap = gaps[Math.floor(gaps.length / 2)] || rowGap;
  }
  const minRx = Math.min(...rot.map(p => p.rx));
  const minRy = rowCenters[0];
  const rl = [];
  const offsets = [];
  for (const row of rowGroups) {
    const startCol = Math.round((row[0].rx - minRx) / colGap);
    const endCol = Math.round((row[row.length - 1].rx - minRx) / colGap);
    offsets.push(startCol);
    rl.push(endCol - startCol + 1);
  }
  const total = rl.reduce((a, b) => a + b, 0);
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const x = minRx * cosA - minRy * sinA;
  const y = minRx * sinA + minRy * cosA;
  return {
    x,
    y,
    angle,
    colGap,
    rowGap,
    rl,
    offsets,
    levels: new Array(total).fill(0),
    pointCount: inside.length
  };
}

// (Retained but unused by the import flow now that sections are manual.)
function clusterIntoSections(points, opts = {}) {
  if (!points.length) return {
    sections: [],
    spacing: 12,
    angle: 0
  };
  const {
    spacing,
    angle
  } = estimateGrid(points);
  const cosNA = Math.cos(-angle);
  const sinNA = Math.sin(-angle);
  const rot = points.map(p => ({
    rx: p.x * cosNA - p.y * sinNA,
    ry: p.x * sinNA + p.y * cosNA,
    src: p
  }));
  const N = rot.length;
  const parent = new Int32Array(N);
  for (let i = 0; i < N; i++) parent[i] = i;
  const find = x => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  const union = (a, b) => {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) parent[ra] = rb;
  };
  const cell = spacing * 2.5;
  const bk = new Map();
  const k = (cx, cy) => cx * 1000003 + cy;
  for (let i = 0; i < N; i++) {
    const cx = Math.floor(rot[i].rx / cell);
    const cy = Math.floor(rot[i].ry / cell);
    const kk = k(cx, cy);
    let a = bk.get(kk);
    if (!a) {
      a = [];
      bk.set(kk, a);
    }
    a.push(i);
  }
  const maxD2 = spacing * 2.6 * (spacing * 2.6);
  for (let i = 0; i < N; i++) {
    const cx = Math.floor(rot[i].rx / cell);
    const cy = Math.floor(rot[i].ry / cell);
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const arr = bk.get(k(cx + dx, cy + dy));
        if (!arr) continue;
        for (const j of arr) {
          if (j <= i) continue;
          const ax = rot[i].rx - rot[j].rx;
          const ay = rot[i].ry - rot[j].ry;
          if (ax * ax + ay * ay <= maxD2) union(i, j);
        }
      }
    }
  }
  const groups = new Map();
  for (let i = 0; i < N; i++) {
    const r = find(i);
    let g = groups.get(r);
    if (!g) {
      g = [];
      groups.set(r, g);
    }
    g.push(i);
  }
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const sections = [];
  for (const indices of groups.values()) {
    if (indices.length < 6) continue;
    const pts = indices.map(i => rot[i]).sort((a, b) => a.ry - b.ry);
    // Row clustering by ry (gap > 0.55 × spacing breaks a row).
    const rowEps = spacing * 0.55;
    const rowGroups = [];
    let cur = [pts[0]];
    for (let kk = 1; kk < pts.length; kk++) {
      if (pts[kk].ry - cur[cur.length - 1].ry > rowEps) {
        rowGroups.push(cur);
        cur = [pts[kk]];
      } else {
        cur.push(pts[kk]);
      }
    }
    rowGroups.push(cur);
    // Estimate column spacing from intra-row gaps (30th percentile).
    const colDs = [];
    for (const row of rowGroups) {
      row.sort((a, b) => a.rx - b.rx);
      for (let i = 1; i < row.length; i++) colDs.push(row[i].rx - row[i - 1].rx);
    }
    colDs.sort((a, b) => a - b);
    const colGap = colDs.length ? colDs[Math.floor(colDs.length * 0.3)] : spacing;
    // Row spacing from row centers.
    const rowCenters = rowGroups.map(r => r.reduce((a, p) => a + p.ry, 0) / r.length);
    let rowGap = spacing * 2;
    if (rowCenters.length > 1) {
      const gaps = [];
      for (let i = 1; i < rowCenters.length; i++) gaps.push(rowCenters[i] - rowCenters[i - 1]);
      gaps.sort((a, b) => a - b);
      rowGap = gaps[Math.floor(gaps.length / 2)] || rowGap;
    }
    const minRx = Math.min(...pts.map(p => p.rx));
    const minRy = rowCenters[0];
    const rl = [];
    const offsets = [];
    for (let ri = 0; ri < rowGroups.length; ri++) {
      const row = rowGroups[ri];
      const startCol = Math.round((row[0].rx - minRx) / colGap);
      const endCol = Math.round((row[row.length - 1].rx - minRx) / colGap);
      offsets.push(startCol);
      rl.push(endCol - startCol + 1);
    }
    const total = rl.reduce((a, b) => a + b, 0);
    // Section origin in unrotated (image) coords.
    const ox = minRx * cosA - minRy * sinA;
    const oy = minRx * sinA + minRy * cosA;
    sections.push({
      id: 0,
      label: "",
      x: ox,
      y: oy,
      angle,
      colGap,
      rowGap,
      rl,
      offsets,
      levels: new Array(total).fill(0)
    });
  }
  sections.sort((a, b) => a.y - b.y || a.x - b.x);
  sections.forEach((s, i) => {
    s.id = i + 1;
    s.label = `N${i + 1}`;
  });
  return {
    sections,
    spacing,
    angle
  };
}

/* ============================================================
   Per-section 2D grid (free-positioned, rotated)
   ============================================================ */

function Section2D({
  section,
  index,
  activeTask,
  viewMode,
  gridEdit,
  selected,
  onSelect,
  onUpdate,
  onRemove,
  showLabel,
  cellSize,
  zoom,
  moveMode
}) {
  const aLvl = activeTask ? STAGES.find(s => s.key === activeTask)?.level || 0 : 0;
  const editable = activeTask && !viewMode;
  const painting = useRef(false);
  const paintMode = useRef(null);
  const {
    rl,
    offsets,
    levels
  } = section;
  const safeOffsets = offsets && offsets.length === rl.length ? offsets : rl.map(() => 0);
  const minOff = Math.min(0, ...safeOffsets);
  const maxRight = Math.max(...rl.map((l, i) => (safeOffsets[i] || 0) + l));
  const cs = cellSize;
  const colW = section.colGap || cs;
  const rowH = section.rowGap || cs;
  const toggle = useCallback(idx => {
    if (!activeTask || viewMode) return;
    const newLevels = [...levels];
    if (paintMode.current === null) {
      paintMode.current = newLevels[idx] < aLvl ? "add" : "remove";
    }
    newLevels[idx] = paintMode.current === "add" ? aLvl : 0;
    onUpdate({
      levels: newLevels
    });
  }, [activeTask, aLvl, levels, viewMode, onUpdate]);
  useEffect(() => {
    const up = () => {
      painting.current = false;
      paintMode.current = null;
    };
    window.addEventListener("pointerup", up);
    return () => window.removeEventListener("pointerup", up);
  }, []);
  const onCellDown = i => e => {
    if (!activeTask || viewMode) return;
    e.preventDefault();
    e.stopPropagation();
    painting.current = true;
    paintMode.current = null;
    toggle(i);
  };
  const onCellEnter = i => () => {
    if (painting.current && activeTask && !viewMode) toggle(i);
  };

  // Free-2D rendering uses absolute positioning per cell so col/row gaps come
  // from the original drawing rather than CSS flex defaults.
  const cells = [];
  let idx = 0;
  for (let r = 0; r < rl.length; r++) {
    const off = safeOffsets[r] || 0;
    for (let c = 0; c < rl[r]; c++) {
      const i = idx++;
      const lvl = levels[i] || 0;
      let ds = null;
      if (viewMode === "all" || !activeTask && !viewMode) {
        ds = stageByLevel(lvl);
      } else if (activeTask) {
        if (lvl >= aLvl) ds = STAGES.find(s => s.key === activeTask);
      }
      const left = (off - minOff) * colW;
      const top = r * rowH;
      if (ds) {
        const Icon = ICON_MAP[ds.key];
        cells.push( /*#__PURE__*/React.createElement("div", {
          key: i,
          onPointerDown: onCellDown(i),
          onPointerEnter: onCellEnter(i),
          style: {
            position: "absolute",
            left,
            top,
            width: colW,
            height: rowH,
            borderRadius: 1,
            background: `${ds.color}22`,
            border: `0.5px solid ${ds.color}55`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: editable ? "pointer" : "default",
            boxSizing: "border-box"
          }
        }, /*#__PURE__*/React.createElement(Icon, {
          s: Math.max(4, Math.min(colW, rowH) - 3),
          color: ds.color
        })));
      } else {
        cells.push( /*#__PURE__*/React.createElement("div", {
          key: i,
          onPointerDown: onCellDown(i),
          onPointerEnter: onCellEnter(i),
          style: {
            position: "absolute",
            left,
            top,
            width: colW,
            height: rowH,
            borderRadius: 1,
            background: gridEdit ? "#eee8dd" : "#f7f5f2",
            border: gridEdit ? "0.5px solid #d0c8b5" : "0.5px solid #e8e4de",
            cursor: editable ? "pointer" : "default",
            boxSizing: "border-box"
          }
        }));
      }
    }
  }
  const widthPx = (maxRight - minOff) * colW;
  const heightPx = rl.length * rowH;
  const pcts = calcPcts(levels);

  // Section-level drag (translate the whole section in image coords)
  const dragRef = useRef(null);
  const onSectionPointerDown = e => {
    if (!moveMode) return;
    e.preventDefault();
    e.stopPropagation();
    onSelect(section.id);
    dragRef.current = {
      sx: e.clientX,
      sy: e.clientY,
      ox: section.x,
      oy: section.y
    };
    const mv = ev => {
      if (!dragRef.current) return;
      const dx = (ev.clientX - dragRef.current.sx) / zoom;
      const dy = (ev.clientY - dragRef.current.sy) / zoom;
      onUpdate({
        x: dragRef.current.ox + dx,
        y: dragRef.current.oy + dy
      });
    };
    const up = () => {
      dragRef.current = null;
      window.removeEventListener("pointermove", mv);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", mv);
    window.addEventListener("pointerup", up);
  };
  const angleDeg = (section.angle || 0) * 180 / Math.PI;
  const labelOffsetX = -minOff * colW;
  return /*#__PURE__*/React.createElement("div", {
    onPointerDown: onSectionPointerDown,
    onClick: e => {
      if (moveMode) return;
      onSelect(section.id);
    },
    style: {
      position: "absolute",
      left: section.x,
      top: section.y,
      transform: `rotate(${angleDeg}deg)`,
      transformOrigin: `${labelOffsetX}px 0px`,
      cursor: moveMode ? "grab" : "default"
    }
  }, selected && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -2,
      top: -2,
      width: widthPx + 4,
      height: heightPx + 4,
      border: "2px solid #e86a10",
      borderRadius: 3,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: widthPx,
      height: heightPx
    }
  }, cells), showLabel && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: widthPx / 2 - 26,
      top: heightPx / 2 - 9,
      width: 52,
      background: "rgba(100,100,100,.92)",
      color: "#fff",
      textAlign: "center",
      fontFamily: "var(--d)",
      fontSize: 13,
      letterSpacing: ".05em",
      padding: "1px 0",
      pointerEvents: "none",
      borderRadius: 2
    }
  }, section.label), gridEdit && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: widthPx + 6,
      top: -2,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      transform: `rotate(${-angleDeg}deg)`
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onRemove(section.id);
    },
    style: {
      width: 18,
      height: 18,
      borderRadius: 9,
      background: "#dc2626",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      fontSize: 10,
      fontWeight: 700
    },
    title: "Delete section"
  }, "\u2715"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onUpdate({
        angle: (section.angle || 0) + Math.PI / 180
      });
    },
    style: {
      width: 18,
      height: 18,
      borderRadius: 4,
      background: "#fff",
      border: "1px solid #ccc",
      cursor: "pointer",
      fontSize: 11
    },
    title: "Rotate +1\xB0"
  }, "\u21BB"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onUpdate({
        angle: (section.angle || 0) - Math.PI / 180
      });
    },
    style: {
      width: 18,
      height: 18,
      borderRadius: 4,
      background: "#fff",
      border: "1px solid #ccc",
      cursor: "pointer",
      fontSize: 11
    },
    title: "Rotate \u22121\xB0"
  }, "\u21BA")), selected && !gridEdit && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: widthPx + 8,
      top: 0,
      background: "#fff",
      border: "1px solid #e0ddd8",
      borderRadius: 3,
      padding: "4px 6px",
      fontSize: 9,
      fontFamily: "var(--b)",
      color: "#333",
      transform: `rotate(${-angleDeg}deg)`,
      transformOrigin: "0 0",
      whiteSpace: "nowrap",
      boxShadow: "0 1px 4px rgba(0,0,0,.08)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      marginBottom: 2
    }
  }, section.label), /*#__PURE__*/React.createElement("div", null, "Overall ", (pcts._overall || 0).toFixed(1), "%"), /*#__PURE__*/React.createElement("div", null, levels.length, " pos \xB7 ", rl.length, " rows")));
}

/* ============================================================
   2D canvas (positioned + rotated sections, optional backdrop)
   ============================================================ */

function CanvasView({
  sections,
  bgUrl,
  bgWidth,
  bgHeight,
  showBg,
  bgOpacity,
  activeTask,
  viewMode,
  gridEdit,
  selectedId,
  setSelectedId,
  updateSection,
  removeSection,
  cellSize,
  zoom,
  setZoom,
  moveMode
}) {
  const containerRef = useRef(null);
  // Compute bbox of sections
  const bbox = useMemo(() => {
    if (!sections.length) return {
      x: 0,
      y: 0,
      w: 800,
      h: 600
    };
    let mnX = Infinity,
      mnY = Infinity,
      mxX = -Infinity,
      mxY = -Infinity;
    for (const s of sections) {
      const safeOff = s.offsets || s.rl.map(() => 0);
      const minOff = Math.min(0, ...safeOff);
      const maxRight = Math.max(...s.rl.map((l, i) => (safeOff[i] || 0) + l));
      const w = (maxRight - minOff) * (s.colGap || cellSize);
      const h = s.rl.length * (s.rowGap || cellSize);
      const a = s.angle || 0;
      const cs2 = Math.abs(Math.cos(a));
      const sn2 = Math.abs(Math.sin(a));
      const bw = w * cs2 + h * sn2;
      const bh = w * sn2 + h * cs2;
      const x = s.x;
      const y = s.y;
      mnX = Math.min(mnX, x);
      mnY = Math.min(mnY, y);
      mxX = Math.max(mxX, x + bw);
      mxY = Math.max(mxY, y + bh);
    }
    if (bgWidth && bgHeight && showBg) {
      mnX = Math.min(mnX, 0);
      mnY = Math.min(mnY, 0);
      mxX = Math.max(mxX, bgWidth);
      mxY = Math.max(mxY, bgHeight);
    }
    return {
      x: mnX,
      y: mnY,
      w: mxX - mnX,
      h: mxY - mnY
    };
  }, [sections, bgWidth, bgHeight, showBg, cellSize]);
  const padW = bbox.w + 80;
  const padH = bbox.h + 80;
  return /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    onClick: () => setSelectedId(null),
    style: {
      position: "relative",
      width: "100%",
      height: "calc(100vh - 220px)",
      minHeight: 500,
      overflow: "auto",
      background: "#f0ebe2",
      border: "1px solid #e0ddd8",
      borderRadius: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: padW * zoom,
      height: padH * zoom
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: padW,
      height: padH,
      transform: `scale(${zoom})`,
      transformOrigin: "0 0"
    }
  }, bgUrl && showBg && /*#__PURE__*/React.createElement("img", {
    src: bgUrl,
    alt: "Source drawing",
    style: {
      position: "absolute",
      left: 40 - bbox.x,
      top: 40 - bbox.y,
      width: bgWidth,
      height: bgHeight,
      opacity: bgOpacity,
      pointerEvents: "none",
      userSelect: "none"
    },
    draggable: false
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 40 - bbox.x,
      top: 40 - bbox.y
    }
  }, sections.map((s, i) => /*#__PURE__*/React.createElement(Section2D, {
    key: s.id,
    section: s,
    index: i,
    activeTask: activeTask,
    viewMode: viewMode,
    gridEdit: gridEdit,
    selected: selectedId === s.id,
    onSelect: setSelectedId,
    onUpdate: u => updateSection(s.id, u),
    onRemove: removeSection,
    showLabel: true,
    cellSize: cellSize,
    zoom: zoom,
    moveMode: moveMode
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "no-print",
    style: {
      position: "absolute",
      right: 10,
      bottom: 10,
      display: "flex",
      gap: 4,
      background: "#fff",
      border: "1px solid #e0ddd8",
      borderRadius: 4,
      padding: 4,
      boxShadow: "0 1px 4px rgba(0,0,0,.08)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      setZoom(Math.max(0.2, zoom - 0.15));
    },
    style: zoomBtnStyle
  }, "\u2212"), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 36,
      textAlign: "center",
      fontFamily: "var(--b)",
      fontSize: 10,
      padding: "3px 0"
    }
  }, Math.round(zoom * 100), "%"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      setZoom(Math.min(4, zoom + 0.15));
    },
    style: zoomBtnStyle
  }, "+"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      setZoom(1);
    },
    style: {
      ...zoomBtnStyle,
      fontSize: 9
    }
  }, "1:1")));
}
const zoomBtnStyle = {
  width: 22,
  height: 22,
  borderRadius: 3,
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 600,
  outline: "none"
};

/* ============================================================
   Import modal: upload + preview detected points + tune + accept
   ============================================================ */

function ImportModal({
  onClose,
  onAccept
}) {
  const [stage, setStage] = useState("upload"); // upload | outline
  const [canvas, setCanvas] = useState(null);
  const [dataUrl, setDataUrl] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const [darkV, setDarkV] = useState(0.40);
  const [minBlob, setMinBlob] = useState(30);
  const [maxBlob, setMaxBlob] = useState(2000);
  const [points, setPoints] = useState([]);
  const [rects, setRects] = useState([]); // user-drawn axis-aligned rects
  const [draft, setDraft] = useState(null); // in-progress rect while dragging
  const [zoom, setZoom] = useState(1);
  const overlayRef = useRef(null);
  const imgRef = useRef(null);
  const surfaceRef = useRef(null);

  // After the drawing loads, fit it to the available pane width.
  useEffect(() => {
    if (stage !== "outline" || !canvas || !surfaceRef.current) return;
    const w = surfaceRef.current.clientWidth - 4;
    if (w > 0 && canvas.width > w) {
      setZoom(w / canvas.width);
    }
  }, [stage, canvas]);
  const handleFile = async file => {
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const c = await fileToCanvas(file);
      setCanvas(c);
      setDataUrl(c.toDataURL());
      setStage("outline");
      requestAnimationFrame(() => runDetect(c, darkV, minBlob, maxBlob));
    } catch (e) {
      console.error(e);
      setErr(e?.message || "Failed to load file");
    } finally {
      setBusy(false);
    }
  };
  const runDetect = (c, dv, mnB, mxB) => {
    if (!c) return;
    setBusy(true);
    setTimeout(() => {
      try {
        const pts = detectPoints(c, {
          darkV: dv,
          minBlob: mnB,
          maxBlob: mxB
        });
        setPoints(pts);
      } catch (e) {
        console.error(e);
        setErr(e?.message || "Detection failed");
      } finally {
        setBusy(false);
      }
    }, 30);
  };
  const reDetect = () => runDetect(canvas, darkV, minBlob, maxBlob);

  // Redraw overlay (points + drawn rects + draft)
  useEffect(() => {
    if (stage !== "outline" || !overlayRef.current || !canvas) return;
    const oc = overlayRef.current;
    const ctx = oc.getContext("2d");
    oc.width = canvas.width;
    oc.height = canvas.height;
    ctx.clearRect(0, 0, oc.width, oc.height);
    ctx.fillStyle = "rgba(0,160,255,.75)";
    const r = Math.max(1.5, Math.min(canvas.width, canvas.height) / 800);
    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    const drawRect = (rc, color, label) => {
      const x = Math.min(rc.x1, rc.x2);
      const y = Math.min(rc.y1, rc.y2);
      const w = Math.abs(rc.x2 - rc.x1);
      const h = Math.abs(rc.y2 - rc.y1);
      ctx.lineWidth = Math.max(2, canvas.width / 1200);
      ctx.strokeStyle = color;
      ctx.fillStyle = color.replace(/[\d.]+\)$/, "0.10)");
      ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);
      if (label) {
        ctx.fillStyle = color;
        ctx.font = `bold ${Math.max(14, canvas.width / 100)}px sans-serif`;
        ctx.fillText(label, x + 6, y + Math.max(18, canvas.width / 90));
      }
    };
    rects.forEach((rc, i) => drawRect(rc, "rgba(232,106,16,.9)", rc.label || `N${i + 1}`));
    if (draft) drawRect(draft, "rgba(22,163,74,.9)", "");
  }, [stage, canvas, points, rects, draft]);
  const clientToImage = e => {
    const el = imgRef.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const scale = canvas.width / r.width;
    return {
      x: (e.clientX - r.left) * scale,
      y: (e.clientY - r.top) * scale
    };
  };
  const onSurfaceDown = e => {
    if (!canvas) return;
    if (e.button !== 0) return;
    const p = clientToImage(e);
    if (!p) return;
    e.preventDefault();
    setDraft({
      x1: p.x,
      y1: p.y,
      x2: p.x,
      y2: p.y
    });
  };
  const onSurfaceMove = e => {
    if (!draft) return;
    const p = clientToImage(e);
    if (!p) return;
    setDraft({
      ...draft,
      x2: p.x,
      y2: p.y
    });
  };
  const onSurfaceUp = () => {
    if (!draft) return;
    const w = Math.abs(draft.x2 - draft.x1);
    const h = Math.abs(draft.y2 - draft.y1);
    if (w > 10 && h > 10) {
      setRects(r => [...r, {
        ...draft,
        label: `N${r.length + 1}`
      }]);
    }
    setDraft(null);
  };
  const removeRect = idx => setRects(r => r.filter((_, i) => i !== idx));
  const clearRects = () => setRects([]);
  const previewSections = useMemo(() => {
    if (!points.length || !rects.length) return [];
    const out = [];
    rects.forEach((rc, i) => {
      const sec = buildSectionFromRect(points, rc);
      if (sec) {
        out.push({
          ...sec,
          label: rc.label || `N${i + 1}`,
          id: i + 1
        });
      }
    });
    return out;
  }, [points, rects]);
  const accept = () => {
    if (!previewSections.length) return;
    onAccept({
      sections: previewSections,
      bgUrl: dataUrl,
      bgWidth: canvas.width,
      bgHeight: canvas.height
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 1000,
      background: "rgba(0,0,0,.55)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: "#fff",
      borderRadius: 6,
      padding: 14,
      width: "100%",
      maxWidth: 1400,
      height: "94vh",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--d)",
      fontSize: 22,
      color: "#1a1a1a",
      letterSpacing: ".04em"
    }
  }, "Import Drawing"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--b)",
      fontSize: 11,
      color: "#888"
    }
  }, stage === "upload" ? "Upload PDF or image to begin" : "Drag rectangles on the drawing to define each section. Every detected point inside the rectangle becomes a cell."), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      marginLeft: "auto",
      padding: "4px 10px",
      border: "1px solid #ddd",
      background: "#fff",
      borderRadius: 4,
      cursor: "pointer",
      fontSize: 11
    }
  }, "Close")), stage === "upload" && /*#__PURE__*/React.createElement("div", {
    style: {
      border: "2px dashed #ccc",
      borderRadius: 6,
      padding: 40,
      textAlign: "center",
      color: "#666",
      fontFamily: "var(--b)"
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: "sm-file",
    type: "file",
    accept: "application/pdf,image/*",
    onChange: e => handleFile(e.target.files?.[0]),
    style: {
      display: "none"
    }
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "sm-file",
    style: {
      display: "inline-block",
      padding: "10px 18px",
      background: "#e86a10",
      color: "#fff",
      borderRadius: 4,
      cursor: "pointer",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: ".06em",
      fontSize: 12
    }
  }, "Choose PDF or Image"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontSize: 11,
      opacity: .7
    }
  }, "Auto-detects every dark-outlined circular marker (any fill color)."), busy && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, "Loading\u2026"), err && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      color: "#c00"
    }
  }, err)), stage === "outline" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flex: 1,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: surfaceRef,
    style: {
      flex: 1,
      overflow: "auto",
      border: "1px solid #e0ddd8",
      borderRadius: 3,
      background: "#f6f4ef",
      position: "relative",
      cursor: "crosshair",
      userSelect: "none"
    },
    onPointerDown: onSurfaceDown,
    onPointerMove: onSurfaceMove,
    onPointerUp: onSurfaceUp,
    onPointerLeave: onSurfaceUp
  }, dataUrl && canvas && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: canvas.width * zoom,
      height: canvas.height * zoom
    }
  }, /*#__PURE__*/React.createElement("img", {
    ref: imgRef,
    src: dataUrl,
    alt: "src",
    style: {
      display: "block",
      width: canvas.width * zoom,
      height: canvas.height * zoom,
      pointerEvents: "none",
      userSelect: "none"
    },
    draggable: false
  }), /*#__PURE__*/React.createElement("canvas", {
    ref: overlayRef,
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: canvas.width * zoom,
      height: canvas.height * zoom,
      pointerEvents: "none"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 280,
      display: "flex",
      flexDirection: "column",
      gap: 10,
      fontFamily: "var(--b)",
      fontSize: 11,
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#f6f4ef",
      padding: 8,
      borderRadius: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      marginBottom: 4
    }
  }, "Detection"), /*#__PURE__*/React.createElement("div", null, "Points found: ", /*#__PURE__*/React.createElement("b", null, points.length)), /*#__PURE__*/React.createElement("div", null, "Sections drawn: ", /*#__PURE__*/React.createElement("b", null, rects.length)), /*#__PURE__*/React.createElement("div", null, "Cells in sections: ", /*#__PURE__*/React.createElement("b", null, previewSections.reduce((a, s) => a + s.levels.length, 0)))), /*#__PURE__*/React.createElement("details", null, /*#__PURE__*/React.createElement("summary", {
    style: {
      cursor: "pointer",
      fontWeight: 600
    }
  }, "Detection settings"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Darkness threshold (V\u2264)",
    min: 0.20,
    max: 0.70,
    step: 0.02,
    value: darkV,
    onChange: setDarkV
  }), /*#__PURE__*/React.createElement(Slider, {
    label: "Min blob (px)",
    min: 5,
    max: 300,
    step: 1,
    value: minBlob,
    onChange: v => setMinBlob(Math.round(v))
  }), /*#__PURE__*/React.createElement(Slider, {
    label: "Max blob (px)",
    min: 200,
    max: 5000,
    step: 20,
    value: maxBlob,
    onChange: v => setMaxBlob(Math.round(v))
  }), /*#__PURE__*/React.createElement("button", {
    onClick: reDetect,
    disabled: busy,
    style: {
      padding: "6px 10px",
      borderRadius: 4,
      background: "#1a1a1a",
      color: "#fff",
      border: "none",
      cursor: busy ? "wait" : "pointer",
      fontWeight: 600,
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: ".06em"
    }
  }, busy ? "Working…" : "Re-detect"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "Zoom"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setZoom(z => Math.max(0.1, z - 0.1)),
    style: zoomBtnStyle
  }, "\u2212"), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 36,
      textAlign: "center"
    }
  }, Math.round(zoom * 100), "%"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setZoom(z => Math.min(3, z + 0.1)),
    style: zoomBtnStyle
  }, "+"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setZoom(1),
    style: {
      ...zoomBtnStyle,
      fontSize: 9
    }
  }, "1:1")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#f6f4ef",
      padding: 8,
      borderRadius: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      marginBottom: 4,
      display: "flex",
      alignItems: "center"
    }
  }, "Sections", rects.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: clearRects,
    style: {
      marginLeft: "auto",
      fontSize: 9,
      border: "1px solid #ccc",
      background: "#fff",
      padding: "2px 6px",
      borderRadius: 3,
      cursor: "pointer"
    }
  }, "Clear all")), rects.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#888",
      lineHeight: 1.4
    }
  }, "Drag a rectangle on the drawing to add a section. Repeat for each section in the layout."), rects.map((rc, i) => {
    const sec = previewSections.find(s => s.id === i + 1);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 0",
        borderBottom: "1px solid #eee"
      }
    }, /*#__PURE__*/React.createElement("input", {
      value: rc.label,
      onChange: e => setRects(rs => rs.map((r, ix) => ix === i ? {
        ...r,
        label: e.target.value
      } : r)),
      style: {
        width: 60,
        padding: "1px 4px",
        fontSize: 10,
        fontFamily: "var(--d)",
        border: "1px solid #ddd",
        borderRadius: 2
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        color: "#666"
      }
    }, sec ? `${sec.levels.length} cells · ${sec.rl.length} rows` : "—"), /*#__PURE__*/React.createElement("button", {
      onClick: () => removeRect(i),
      style: {
        marginLeft: "auto",
        width: 16,
        height: 16,
        borderRadius: 8,
        background: "#dc2626",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        fontSize: 9,
        fontWeight: 700
      }
    }, "\u2715"));
  })), err && /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#c00"
    }
  }, err), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      flex: 1,
      padding: "8px 12px",
      borderRadius: 4,
      background: "#fff",
      color: "#555",
      border: "1px solid #ccc",
      cursor: "pointer",
      fontWeight: 600
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: accept,
    disabled: !previewSections.length,
    style: {
      flex: 1,
      padding: "8px 12px",
      borderRadius: 4,
      background: previewSections.length ? "#16a34a" : "#aaa",
      color: "#fff",
      border: "none",
      cursor: previewSections.length ? "pointer" : "not-allowed",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: ".06em"
    }
  }, "Accept (", previewSections.length, ")"))))));
}
function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      fontSize: 10,
      color: "#444"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--d)"
    }
  }, typeof value === "number" ? value.toFixed(value < 1 ? 2 : 0) : value)), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(parseFloat(e.target.value)),
    style: {
      width: "100%"
    }
  }));
}

/* ============================================================
   Sidebar: per-section badges/progress
   ============================================================ */

function SectionRowSummary({
  section,
  selected,
  onSelect,
  activeTask,
  setActiveTask
}) {
  const pcts = calcPcts(section.levels);
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => onSelect(section.id),
    style: {
      padding: "6px 8px",
      borderRadius: 4,
      border: selected ? "2px solid #e86a10" : "1px solid #e8e4de",
      background: selected ? "#fff7ee" : "#fff",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--d)",
      fontSize: 16,
      color: "#1a1a1a",
      letterSpacing: ".04em"
    }
  }, section.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--d)",
      fontSize: 13,
      color: "#e86a10",
      marginLeft: "auto"
    }
  }, (pcts._overall || 0).toFixed(1), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "#888",
      fontFamily: "var(--b)"
    }
  }, section.levels.length, " pos \xB7 ", section.rl.length, " rows"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 1,
      marginTop: 2
    }
  }, STAGES.map(st => {
    const Icon = ICON_MAP[st.key];
    const pct = pcts[st.key] || 0;
    const isA = activeTask === st.key;
    return /*#__PURE__*/React.createElement("div", {
      key: st.key,
      onClick: e => {
        e.stopPropagation();
        setActiveTask(st.key);
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "1px 3px",
        borderLeft: `3px solid ${st.color}`,
        background: isA ? `${st.color}15` : "transparent",
        borderRadius: 2
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      s: 9,
      color: st.color
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 8,
        fontFamily: "var(--d)",
        color: "#666",
        letterSpacing: ".05em",
        textTransform: "uppercase"
      }
    }, st.label), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        fontFamily: "var(--d)",
        fontSize: 9,
        color: pct > 0 ? "#1a1a1a" : "#bbb"
      }
    }, pct.toFixed(1), "%"));
  })));
}

/* ============================================================
   Toolbar bits
   ============================================================ */

function FilterBtn({
  stage,
  active,
  onClick
}) {
  const Icon = ICON_MAP[stage.key];
  const isV = active === stage.key;
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => onClick(stage.key),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      padding: "4px 8px",
      borderRadius: 4,
      border: isV ? `2px solid ${stage.color}` : "1px solid #ddd",
      background: isV ? `${stage.color}0a` : "#fff",
      cursor: "pointer",
      outline: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 3,
      background: `${stage.color}18`,
      border: `1px solid ${stage.color}44`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    s: 11,
    color: stage.color
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: isV ? 700 : 500,
      color: isV ? stage.color : "#555",
      fontFamily: "var(--b)",
      textTransform: "uppercase",
      letterSpacing: ".04em"
    }
  }, stage.label));
}

/* ============================================================
   Defaults (used until a drawing is imported)
   ============================================================ */

function initSouth(rl) {
  const t = rl.reduce((a, b) => a + b, 0);
  const p = Math.round(t * 0.84);
  const b = Math.round(t * 0.08);
  return Array.from({
    length: t
  }, (_, i) => i < p ? 2 : i < p + b ? 1 : 0);
}
function buildDefaultSections() {
  const cs = 12;
  const s1Rl = [30, 30, 30, 30, 30, 30, 24, 24, 24, 24, 24];
  const s2Rl = [24, 26, 28, 30, 30, 30, 30, 28, 26, 22];
  return [{
    id: 1,
    label: "PCS001",
    x: 40,
    y: 40,
    angle: 0,
    colGap: cs,
    rowGap: cs,
    rl: s1Rl,
    offsets: [0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3],
    levels: new Array(s1Rl.reduce((a, b) => a + b, 0)).fill(0)
  }, {
    id: 2,
    label: "PCS002",
    x: 40,
    y: 40 + (s1Rl.length + 2) * cs,
    angle: 0,
    colGap: cs,
    rowGap: cs,
    rl: s2Rl,
    offsets: [3, 2, 1, 0, 0, 0, 0, 1, 2, 4],
    levels: initSouth(s2Rl)
  }];
}

/* ============================================================
   Main component
   ============================================================ */

function SiteMap() {
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [viewMode, setViewMode] = useState("all");
  const [gridEdit, setGridEdit] = useState(false);
  const [moveMode, setMoveMode] = useState(false);
  const [importing, setImporting] = useState(false);
  const [sections, setSections] = useState(buildDefaultSections);
  const [bgUrl, setBgUrl] = useState(null);
  const [bgWidth, setBgWidth] = useState(0);
  const [bgHeight, setBgHeight] = useState(0);
  const [showBg, setShowBg] = useState(true);
  const [bgOpacity, setBgOpacity] = useState(0.35);
  const [selectedId, setSelectedId] = useState(null);
  const [zoom, setZoom] = useState(1);
  const nextId = useRef(3);

  // Load persisted state
  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage?.get?.("site-map-v4");
        if (res && res.value) {
          const d = JSON.parse(res.value);
          if (d.sections && Array.isArray(d.sections)) {
            setSections(migrateSections(d.sections));
            nextId.current = d.nextId || d.sections.length + 1;
          }
          if (d.bgUrl) {
            setBgUrl(d.bgUrl);
            setBgWidth(d.bgWidth || 0);
            setBgHeight(d.bgHeight || 0);
          }
        }
      } catch (e) {
        // first load
      }
      setLoaded(true);
      setTimeout(() => setReady(true), 100);
    })();
  }, []);

  // Persist
  const saveTimer = useRef(null);
  useEffect(() => {
    if (!loaded) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await window.storage?.set?.("site-map-v4", JSON.stringify({
          sections,
          nextId: nextId.current,
          bgUrl,
          bgWidth,
          bgHeight
        }));
      } catch (e) {}
    }, 600);
  }, [sections, loaded, bgUrl, bgWidth, bgHeight]);
  const updateSection = useCallback((id, updates) => {
    setSections(prev => prev.map(s => s.id === id ? {
      ...s,
      ...updates
    } : s));
  }, []);
  const removeSection = useCallback(id => {
    setSections(prev => prev.length <= 1 ? prev : prev.filter(s => s.id !== id));
  }, []);
  const addBlankSection = () => {
    const num = String(nextId.current).padStart(3, "0");
    const drl = [20, 20, 20, 20, 20, 20, 20, 20];
    const total = drl.reduce((a, b) => a + b, 0);
    const cs = 12;
    setSections(prev => [...prev, {
      id: nextId.current,
      label: `PCS${num}`,
      x: 60 + prev.length * 30 % 400,
      y: 60 + prev.length * 70 % 300,
      angle: 0,
      colGap: cs,
      rowGap: cs,
      rl: drl,
      offsets: drl.map(() => 0),
      levels: new Array(total).fill(0)
    }]);
    nextId.current++;
  };
  const handleTask = key => {
    if (activeTask === key) {
      setActiveTask(null);
      setViewMode("all");
    } else {
      setActiveTask(key);
      setViewMode(null);
    }
  };
  const goAll = () => {
    setActiveTask(null);
    setViewMode("all");
  };
  const goView = key => {
    setActiveTask(key);
    setViewMode("view");
  };
  const goEdit = key => {
    setActiveTask(key);
    setViewMode(null);
  };
  const exportPDF = () => window.print();
  const onImportAccept = ({
    sections: secs,
    bgUrl: u,
    bgWidth: w,
    bgHeight: h
  }) => {
    // Reassign ids continuing from nextId
    const reIded = secs.map((s, i) => ({
      ...s,
      id: nextId.current + i
    }));
    nextId.current = nextId.current + reIded.length;
    setSections(reIded);
    setBgUrl(u);
    setBgWidth(w);
    setBgHeight(h);
    setShowBg(true);
    setImporting(false);
    setSelectedId(reIded[0]?.id || null);
  };
  const activeStage = STAGES.find(s => s.key === activeTask);
  const isEditing = activeTask && !viewMode;
  const allLevels = sections.flatMap(s => s.levels);
  const totalCells = allLevels.length;
  const overall = totalCells ? allLevels.reduce((a, b) => a + b, 0) / totalCells / 5 * 100 : 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      minHeight: "100vh",
      background: "#fafafa"
    }
  }, /*#__PURE__*/React.createElement("style", null, `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');
        :root { --d: 'Bebas Neue', sans-serif; --b: 'DM Sans', sans-serif; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { font-family: 'DM Sans', sans-serif; }
        @media print {
          .no-print { display: none !important; }
          body, html { background: #fff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page { size: landscape; margin: 8mm; }
        }
      `), /*#__PURE__*/React.createElement("div", {
    className: "no-print",
    style: {
      background: "#1a1a1a",
      padding: "6px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#e86a10",
      fontSize: 14
    }
  }, "\u26A0"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: "#fff",
      fontFamily: "var(--b)",
      letterSpacing: ".06em",
      textTransform: "uppercase"
    }
  }, "Field Reporting \u2014 Site Progress Tracker")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: "#888",
      fontFamily: "var(--b)"
    }
  }, "BORES \u2192 PILES \u2192 POST CAPS \u2192 TORQUE TUBE \u2192 MODULES")), /*#__PURE__*/React.createElement("div", {
    className: "no-print",
    style: {
      padding: "8px 16px",
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      alignItems: "center",
      borderBottom: "1px solid #e0ddd8",
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: goAll,
    style: {
      padding: "5px 14px",
      borderRadius: 4,
      border: viewMode === "all" && !activeTask ? "2px solid #e86a10" : "1px solid #ddd",
      background: viewMode === "all" && !activeTask ? "#e86a10" : "#fff",
      color: viewMode === "all" && !activeTask ? "#fff" : "#555",
      cursor: "pointer",
      fontSize: 10,
      fontWeight: 600,
      outline: "none",
      textTransform: "uppercase",
      letterSpacing: ".06em"
    }
  }, "\uD83D\uDDFA\uFE0F All Tasks"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 22,
      background: "#e0ddd8"
    }
  }), STAGES.map(st => {
    const isV = activeTask === st.key && viewMode === "view";
    const isE = activeTask === st.key && !viewMode;
    return /*#__PURE__*/React.createElement("div", {
      key: st.key,
      style: {
        display: "flex",
        gap: 1
      }
    }, /*#__PURE__*/React.createElement(FilterBtn, {
      stage: st,
      active: isV ? st.key : null,
      onClick: () => goView(st.key)
    }), /*#__PURE__*/React.createElement("button", {
      onClick: () => goEdit(st.key),
      title: `Edit ${st.label}`,
      style: {
        padding: "4px 5px",
        borderRadius: "0 4px 4px 0",
        border: isE ? `2px solid ${st.color}` : "1px solid #ddd",
        borderLeft: "none",
        background: isE ? `${st.color}15` : "#fff",
        cursor: "pointer",
        outline: "none",
        fontSize: 10
      }
    }, "\u270F\uFE0F"));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 22,
      background: "#e0ddd8"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setImporting(true),
    style: {
      padding: "5px 14px",
      borderRadius: 4,
      border: "1px solid #ddd",
      background: "#fff",
      color: "#555",
      cursor: "pointer",
      fontSize: 10,
      fontWeight: 600,
      outline: "none",
      textTransform: "uppercase",
      letterSpacing: ".06em"
    }
  }, "\uD83D\uDCE5 Import Drawing"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setMoveMode(m => !m),
    style: {
      padding: "5px 14px",
      borderRadius: 4,
      border: moveMode ? "2px solid #1a1a1a" : "1px solid #ddd",
      background: moveMode ? "#1a1a1a" : "#fff",
      color: moveMode ? "#fff" : "#555",
      cursor: "pointer",
      fontSize: 10,
      fontWeight: 600,
      outline: "none",
      textTransform: "uppercase",
      letterSpacing: ".06em"
    }
  }, "\u2725 ", moveMode ? "Done Moving" : "Move"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setGridEdit(g => !g),
    style: {
      padding: "5px 14px",
      borderRadius: 4,
      border: gridEdit ? "2px solid #1a1a1a" : "1px solid #ddd",
      background: gridEdit ? "#1a1a1a" : "#fff",
      color: gridEdit ? "#fff" : "#555",
      cursor: "pointer",
      fontSize: 10,
      fontWeight: 600,
      outline: "none",
      textTransform: "uppercase",
      letterSpacing: ".06em"
    }
  }, "\u229E ", gridEdit ? "Done" : "Edit Grid"), /*#__PURE__*/React.createElement("button", {
    onClick: addBlankSection,
    style: {
      padding: "5px 14px",
      borderRadius: 4,
      border: "1px solid #ddd",
      background: "#fff",
      color: "#555",
      cursor: "pointer",
      fontSize: 10,
      fontWeight: 600,
      outline: "none",
      textTransform: "uppercase",
      letterSpacing: ".06em"
    }
  }, "+ Add Section"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 22,
      background: "#e0ddd8"
    }
  }), bgUrl && /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      fontSize: 10,
      fontFamily: "var(--b)",
      color: "#555",
      textTransform: "uppercase",
      letterSpacing: ".06em"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: showBg,
    onChange: e => setShowBg(e.target.checked)
  }), "Backdrop", /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 0,
    max: 1,
    step: 0.05,
    value: bgOpacity,
    onChange: e => setBgOpacity(parseFloat(e.target.value)),
    style: {
      width: 70
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: exportPDF,
    style: {
      marginLeft: "auto",
      padding: "5px 14px",
      borderRadius: 4,
      border: "1px solid #ddd",
      background: "#fff",
      color: "#555",
      cursor: "pointer",
      fontSize: 10,
      fontWeight: 600,
      outline: "none",
      textTransform: "uppercase",
      letterSpacing: ".06em",
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, "\uD83D\uDCC4 Export PDF"), activeStage && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      padding: "4px 12px",
      borderRadius: 20,
      background: `${activeStage.color}10`,
      border: `1px solid ${activeStage.color}33`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: activeStage.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      color: activeStage.color,
      fontFamily: "var(--b)",
      textTransform: "uppercase"
    }
  }, isEditing ? "Editing" : "Viewing", ": ", activeStage.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#999",
      fontFamily: "var(--b)",
      fontWeight: 500,
      textTransform: "uppercase",
      letterSpacing: ".1em"
    }
  }, new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }).toUpperCase()), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 32,
      fontWeight: 400,
      color: "#1a1a1a",
      fontFamily: "var(--d)",
      letterSpacing: ".03em",
      textTransform: "uppercase",
      lineHeight: 1
    }
  }, "Site Progress Map"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 3,
      background: "linear-gradient(90deg, #e86a10, #f5a623)",
      borderRadius: 2,
      marginTop: 4,
      maxWidth: 400
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#1a1a1a",
      borderRadius: 6,
      padding: "8px 14px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "#fff",
      fontFamily: "var(--d)",
      letterSpacing: ".06em",
      textTransform: "uppercase"
    }
  }, "Total Project Progress"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 26,
      color: "#e86a10",
      fontFamily: "var(--d)"
    }
  }, overall.toFixed(2), "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 5,
      background: "#333",
      borderRadius: 3,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      borderRadius: 3,
      width: `${overall}%`,
      background: "linear-gradient(90deg, #e86a10, #f5a623)",
      transition: "width .5s ease"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: "#888",
      fontFamily: "var(--b)",
      textTransform: "uppercase"
    }
  }, sections.length, " sections \xB7 ", totalCells, " pos")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      opacity: ready ? 1 : 0,
      transition: "opacity .4s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 200,
      display: "flex",
      flexDirection: "column",
      gap: 4,
      maxHeight: "calc(100vh - 220px)",
      overflowY: "auto"
    }
  }, sections.map(s => /*#__PURE__*/React.createElement(SectionRowSummary, {
    key: s.id,
    section: s,
    selected: selectedId === s.id,
    onSelect: setSelectedId,
    activeTask: activeTask,
    setActiveTask: handleTask
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(CanvasView, {
    sections: sections,
    bgUrl: bgUrl,
    bgWidth: bgWidth,
    bgHeight: bgHeight,
    showBg: showBg,
    bgOpacity: bgOpacity,
    activeTask: activeTask,
    viewMode: viewMode,
    gridEdit: gridEdit,
    selectedId: selectedId,
    setSelectedId: setSelectedId,
    updateSection: updateSection,
    removeSection: removeSection,
    cellSize: 12,
    zoom: zoom,
    setZoom: setZoom,
    moveMode: moveMode
  })))), importing && /*#__PURE__*/React.createElement(ImportModal, {
    onClose: () => setImporting(false),
    onAccept: onImportAccept
  }));
}

// Migration for sections coming from older storage shapes (v3 etc.)
function migrateSections(arr) {
  const cs = 12;
  let curY = 40;
  return arr.map((s, i) => {
    const rl = s.rl || [];
    const offsets = s.offsets && s.offsets.length === rl.length ? s.offsets : rl.map(() => 0);
    const total = rl.reduce((a, b) => a + b, 0);
    const levels = s.levels && s.levels.length === total ? s.levels : new Array(total).fill(0);
    const colGap = s.colGap || cs;
    const rowGap = s.rowGap || cs;
    const x = typeof s.x === "number" ? s.x : 40;
    const y = typeof s.y === "number" ? s.y : curY;
    const angle = typeof s.angle === "number" ? s.angle : 0;
    curY = y + (rl.length + 2) * rowGap;
    return {
      id: s.id ?? i + 1,
      label: s.label || `N${i + 1}`,
      x,
      y,
      angle,
      colGap,
      rowGap,
      rl,
      offsets,
      levels
    };
  });
}
// bid_export.jsx
// Self-contained export module for the Sun Rise precon bid tool.
//
// Provides two client/internal deliverables for any bid in the `precon_bids`
// shape:
//   - exportBidProposal(bid)   -> branded client-facing proposal (PDF via print)
//   - exportExecutionPlan(bid) -> internal project execution plan (PDF via print)
//
// Default export <BidExportButtons bid={bid} /> renders both buttons.
//
// The bid math is ported 1:1 from the production bid tool so numbers match
// exactly even when this module is used outside that tool. Pass a precomputed
// results object as the 2nd arg to computeBid-consumers to skip recomputation.

/* ----------------------------------------------------------------------------
   Branding (Sun Rise Construction and Development LLC)
---------------------------------------------------------------------------- */

const SRC = {
  legalName: "Sun Rise Construction and Development LLC",
  shortName: "Sun Rise Construction & Development",
  rep: "Kaleb LeBaron",
  repTitle: "Business Development Manager",
  phone: "+1 (619) 870-4491",
  email: "Kaleb.LeBaron@sunriseconstructionco.com",
  address: "12856 N Hwy 183 Ste B PMB 2011, Austin, TX 78750",
  web: "sunriseconstructionco.com",
  tagline: "We Dominate Solar"
};
const BRAND = {
  orange: "#F97316",
  orangeDeep: "#d45808",
  ink: "#0a0a14",
  ink2: "#10101e",
  navy: "#163050",
  navy2: "#234e80",
  cream: "#F5F0EB",
  paper: "#ffffff",
  grayText: "#555",
  line: "#e3ddd4"
};

// SRC logo (sun + solar panel "SRC" mark), inlined so the module is portable.
const SRC_LOGO = "data:image/webp;base64,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";

/* ----------------------------------------------------------------------------
   Bid math (ported from the production tool)
---------------------------------------------------------------------------- */

const DEFAULT_BID = {
  projectName: "",
  projectLocation: "",
  clientName: "",
  clientContact: "",
  bidDate: "",
  systemSizeMW: 5,
  milesFromHQ: 500,
  workdaysInWeek: 5,
  workHoursPerDay: 10,
  apprenticeReqPct: 0.15,
  perDiem: 125,
  perDiemPct: 1,
  wageType: "Union",
  pwMultiplier: 1,
  includeHotelPerDiem: true,
  status: "Draft",
  adminRate: 30,
  generalLaborRate: 25.2,
  generalLaborFringe: 9.85,
  telehandlerOpRate: 34.73,
  telehandlerOpFringe: 12.12,
  pileDriverOpRate: 38.61,
  pileDriverOpFringe: 12.18,
  skidSteerOpRate: 34.73,
  skidSteerOpFringe: 12.12,
  ficaSS: 0.062,
  medical: 0.0145,
  futa: 0.06,
  suta: 0.05,
  workersComp: 0.09,
  umbrella: 0.01,
  genLiability: 0.01,
  payrollService: 0.01,
  pileDriverEquipDaily: 734,
  skidSteerEquipDaily: 145,
  telehandlerEquipDaily: 175,
  companyTruckEquipDaily: 67,
  pileDriverGalHr: 2,
  skidSteerGalHr: 3.2,
  telehandlerGalHr: 1.5,
  companyTruckGalHr: 1.55,
  utvGalHr: 1,
  fuelEfficiency: 0.8,
  dieselPerGallon: 5.089,
  rackingPiles: 2000,
  inverterPiles: 0,
  cabPiles: 10,
  combinerBoxPiles: 20,
  loadBreakPiles: 0,
  estDriveTime: 3,
  estTransitionTime: 3,
  pileEfficiency: 1.1,
  numExcavators: 2,
  pileSkidSteerOps: 1,
  pileGroundMan: 2,
  pileAdditionalLaborers: 5,
  moduleCount: 10000,
  moduleWidth: 47.88,
  calculateByModules: true,
  manualLinearFeet: 40000,
  rackingLfPerHourPerMan: 17,
  rackingEfficiency: 1,
  rackingTotalWorkers: 20,
  rackingGeneralLabor: 8,
  rackingGeneralLaborApp: 7,
  rackingTelehandlerOps: 1,
  rackingSkidSteerOps: 4,
  modulesPerHourPerMan: 13,
  moduleEfficiency: 1,
  moduleTotalWorkers: 12,
  moduleGeneralLabor: 4,
  moduleGeneralLaborApp: 5,
  moduleSkidSteerOps: 3,
  qcPileMultiplier: 0.085,
  qcRackMultiplier: 0.009,
  qcModuleMultiplier: 0.008,
  qcNumMen: 3,
  qcApprentices: 1,
  matHandlCrewSize: 4,
  matHandlAdmin: 1,
  matHandlGeneralLabor: 1,
  matHandlTeleOps: 1,
  matHandlSkidOps: 1,
  gcCartsRate: 52,
  gcCartsQty: 5,
  gcMaintenanceRate: 2000,
  gcSanitaryRate: 4,
  gcSanitaryQty: 4,
  gcSafetyRate: 0.75,
  gcSiteOfficeRate: 2500,
  gcSmallToolsRate: 2.5,
  gcFuelDeliveryRate: 1000,
  gcPileSurveyRate: 6,
  gcAddlMobRate: 1000,
  gcTwistBarsRate: 200,
  gcTwistBarsQty: 2,
  gcPayrollRate: 137.5,
  gcPayrollQty: 6,
  mgmtBurdenMultiplier: 1.3,
  mgmtPerDiem: 135,
  mgmtPctOnSite: 0.89,
  mgmtSuperRate: 57.69,
  mgmtSuperQty: 1,
  mgmtSuperPerDiem: true,
  mgmtForemanRate: 54.68,
  mgmtForemanQty: 1,
  mgmtForemanPerDiem: true,
  mgmtSafetyRate: 30,
  mgmtSafetyQty: 1,
  mgmtSafetyPerDiem: true,
  mobMPH: 40,
  mobCompanyTruckRate: 6.7,
  mobCompanyTruckQty: 1,
  mobTrailerRate: 0.5,
  mobTrailerQty: 1,
  mobRentalEquipRate: 500,
  mobRentalEquipQty: 19,
  mobExtraMobs: 1,
  wasteDumpsterQty: 6,
  wasteDumpsterEmptied: 1,
  wasteDumpsterRate: 1000,
  contingencyPct: 0.03,
  markupPct: 0.2,
  bondPct: 0.02
};

// Day-rate calculator (Union vs Prevailing Wage), ported from the tool.
function dayRate(base, fringe, payrollTaxPct, workHoursPerDay, wageType, pwMultiplier) {
  const OT = workHoursPerDay > 8 ? workHoursPerDay - 8 : 0;
  const burden = base * payrollTaxPct;
  if (wageType === "Prevailing Wage") {
    const r = (base + fringe) * pwMultiplier;
    return r * 8 + r * 1.5 * OT;
  }
  return (base + fringe + burden) * 8 + ((base + burden) * 1.5 + fringe) * OT;
}

// Full bid computation. Returns the same field set as the production tool.
function computeBid(n) {
  const t = {};
  t.systemKW = n.systemSizeMW * 1e3;
  t.systemWDC = n.systemSizeMW * 1e6;
  t.payrollTaxPct = n.ficaSS + n.medical + n.futa + n.suta + n.workersComp + n.umbrella + n.genLiability + n.payrollService;
  [{
    key: "admin",
    base: n.adminRate,
    fringe: 0
  }, {
    key: "generalLabor",
    base: n.generalLaborRate,
    fringe: n.generalLaborFringe
  }, {
    key: "generalLaborApp",
    base: n.generalLaborRate,
    fringe: n.generalLaborFringe
  }, {
    key: "telehandlerOp",
    base: n.telehandlerOpRate,
    fringe: n.telehandlerOpFringe
  }, {
    key: "telehandlerOpApp",
    base: n.telehandlerOpRate,
    fringe: n.telehandlerOpFringe
  }, {
    key: "pileDriverOp",
    base: n.pileDriverOpRate,
    fringe: n.pileDriverOpFringe
  }, {
    key: "pileDriverOpApp",
    base: n.pileDriverOpRate,
    fringe: n.pileDriverOpFringe
  }, {
    key: "skidSteerOp",
    base: n.skidSteerOpRate,
    fringe: n.skidSteerOpFringe
  }, {
    key: "skidSteerOpApp",
    base: n.skidSteerOpRate,
    fringe: n.skidSteerOpFringe
  }].forEach(({
    key,
    base,
    fringe
  }) => {
    t[`${key}DayRate`] = dayRate(base, fringe, t.payrollTaxPct, n.workHoursPerDay, n.wageType, n.pwMultiplier);
    t[`${key}HourlyRate`] = t[`${key}DayRate`] / n.workHoursPerDay;
  });
  const fe = n.fuelEfficiency;
  t.pileDriverFuelPerDay = n.pileDriverGalHr * n.workHoursPerDay * fe * n.dieselPerGallon;
  t.skidSteerFuelPerDay = n.skidSteerGalHr * n.workHoursPerDay * fe * n.dieselPerGallon;
  t.telehandlerFuelPerDay = n.telehandlerGalHr * n.workHoursPerDay * fe * n.dieselPerGallon;
  t.companyTruckFuelPerDay = n.companyTruckGalHr * n.workHoursPerDay * fe * n.dieselPerGallon;
  t.utvFuelPerDay = n.utvGalHr * n.workHoursPerDay * fe * n.dieselPerGallon;
  t.totalPiles = n.rackingPiles + n.inverterPiles + n.cabPiles + n.combinerBoxPiles + n.loadBreakPiles;
  const cyc = n.estDriveTime + n.estTransitionTime;
  t.pileManhours = Math.ceil(cyc * t.totalPiles / 60);
  t.pileAdjustedManhours = Math.round(t.pileManhours / n.pileEfficiency);
  t.pileDaysToComplete = Math.max(1, Math.ceil(Math.ceil(t.pileAdjustedManhours / n.numExcavators) / n.workHoursPerDay));
  t.pilesPerDayPerMachine = t.totalPiles / t.pileDaysToComplete;
  t.pileCalendarDays = Math.ceil(t.pileDaysToComplete * 7 / n.workdaysInWeek);
  t.pileTotalStaff = n.pileSkidSteerOps + n.pileGroundMan + n.pileAdditionalLaborers + n.numExcavators + Math.round(n.pileAdditionalLaborers * n.apprenticeReqPct);
  t.pileTotalManHours = t.pileTotalStaff * t.pileDaysToComplete * n.workHoursPerDay;
  const pileJourney = n.pileAdditionalLaborers + n.pileGroundMan - Math.floor((n.pileAdditionalLaborers + n.pileGroundMan) * n.apprenticeReqPct);
  const pileApp = Math.ceil((n.pileAdditionalLaborers + n.pileGroundMan) * n.apprenticeReqPct);
  t.pileLaborCost = pileJourney * t.generalLaborDayRate * t.pileDaysToComplete + pileApp * t.generalLaborAppDayRate * t.pileDaysToComplete + n.numExcavators * t.pileDriverOpDayRate * t.pileDaysToComplete + n.pileSkidSteerOps * t.skidSteerOpDayRate * t.pileDaysToComplete;
  t.pilePerDiemCost = n.includeHotelPerDiem ? t.pileTotalStaff * n.perDiem * n.perDiemPct * t.pileCalendarDays : 0;
  t.pileEquipRental = n.numExcavators * n.pileDriverEquipDaily * t.pileCalendarDays + n.pileSkidSteerOps * n.skidSteerEquipDaily * t.pileCalendarDays;
  t.pileFuelCost = n.numExcavators * t.pileDriverFuelPerDay * t.pileDaysToComplete + n.pileSkidSteerOps * t.skidSteerFuelPerDay * t.pileDaysToComplete;
  t.pileScopeTotal = t.pileLaborCost + t.pilePerDiemCost + t.pileEquipRental + t.pileFuelCost;
  t.linearFeetRacking = n.calculateByModules ? Math.ceil((n.moduleWidth + 1) * n.moduleCount / 12) : n.manualLinearFeet;
  t.rackingManhours = Math.ceil(t.linearFeetRacking / n.rackingLfPerHourPerMan);
  t.rackingAdjustedManhours = Math.ceil(t.rackingManhours / n.rackingEfficiency);
  t.rackingDaysToComplete = Math.max(1, Math.ceil(Math.ceil(t.rackingAdjustedManhours / n.rackingTotalWorkers) / n.workHoursPerDay));
  t.rackingCalendarDays = Math.ceil(t.rackingDaysToComplete * 7 / n.workdaysInWeek);
  t.rackingManHours = n.rackingTotalWorkers * t.rackingDaysToComplete * n.workHoursPerDay;
  t.rackingLaborCost = n.rackingGeneralLabor * t.generalLaborDayRate * t.rackingDaysToComplete + n.rackingGeneralLaborApp * t.generalLaborAppDayRate * t.rackingDaysToComplete + n.rackingTelehandlerOps * t.telehandlerOpDayRate * t.rackingDaysToComplete + n.rackingSkidSteerOps * t.skidSteerOpDayRate * t.rackingDaysToComplete;
  t.rackingPerDiemCost = n.includeHotelPerDiem ? n.rackingTotalWorkers * n.perDiem * n.perDiemPct * t.rackingCalendarDays : 0;
  t.rackingEquipRental = n.rackingSkidSteerOps * n.skidSteerEquipDaily * t.rackingCalendarDays + n.rackingTelehandlerOps * n.telehandlerEquipDaily * t.rackingCalendarDays + 1 * n.companyTruckEquipDaily * t.rackingCalendarDays;
  t.rackingFuelCost = n.rackingSkidSteerOps * t.skidSteerFuelPerDay * t.rackingDaysToComplete + n.rackingTelehandlerOps * t.telehandlerFuelPerDay * t.rackingDaysToComplete + 1 * t.companyTruckFuelPerDay * t.rackingDaysToComplete;
  t.rackingScopeTotal = t.rackingLaborCost + t.rackingPerDiemCost + t.rackingEquipRental + t.rackingFuelCost;
  t.moduleCount = n.moduleCount;
  t.moduleManhours = Math.ceil(t.moduleCount / n.modulesPerHourPerMan);
  t.moduleAdjustedManhours = Math.ceil(t.moduleManhours / n.moduleEfficiency);
  t.moduleDaysToComplete = Math.max(1, Math.ceil(Math.ceil(t.moduleAdjustedManhours / n.moduleTotalWorkers) / n.workHoursPerDay));
  t.moduleCalendarDays = Math.ceil(t.moduleDaysToComplete * 7 / n.workdaysInWeek);
  t.moduleManHours = n.moduleTotalWorkers * t.moduleDaysToComplete * n.workHoursPerDay;
  t.moduleLaborCost = n.moduleGeneralLabor * t.generalLaborDayRate * t.moduleDaysToComplete + n.moduleGeneralLaborApp * t.generalLaborAppDayRate * t.moduleDaysToComplete + n.moduleSkidSteerOps * t.skidSteerOpDayRate * t.moduleDaysToComplete;
  t.modulePerDiemCost = n.includeHotelPerDiem ? n.moduleTotalWorkers * n.perDiem * n.perDiemPct * t.moduleCalendarDays : 0;
  t.moduleEquipRental = n.moduleSkidSteerOps * n.skidSteerEquipDaily * t.moduleCalendarDays;
  t.moduleFuelCost = n.moduleSkidSteerOps * t.skidSteerFuelPerDay * t.moduleDaysToComplete;
  t.moduleScopeTotal = t.moduleLaborCost + t.modulePerDiemCost + t.moduleEquipRental + t.moduleFuelCost;
  t.qcPileHours = Math.ceil(n.qcPileMultiplier * t.totalPiles);
  t.qcRackingHours = Math.ceil(n.qcRackMultiplier * t.linearFeetRacking);
  t.qcModuleHours = Math.ceil(n.qcModuleMultiplier * t.moduleCount);
  t.qcTotalHours = t.qcPileHours + t.qcRackingHours + t.qcModuleHours;
  t.qcWorkdays = Math.ceil(Math.ceil(t.qcTotalHours / n.qcNumMen) / n.workHoursPerDay);
  t.qcCalendarDays = Math.ceil(t.qcWorkdays * 7 / n.workdaysInWeek);
  t.qcManHours = n.qcNumMen * t.qcWorkdays * n.workHoursPerDay;
  const qcJourney = n.qcNumMen - n.qcApprentices;
  t.qcLaborCost = qcJourney * t.generalLaborDayRate * t.qcWorkdays + n.qcApprentices * t.generalLaborDayRate * t.qcWorkdays;
  t.qcPerDiemCost = n.includeHotelPerDiem ? n.qcNumMen * n.perDiem * n.perDiemPct * t.qcCalendarDays : 0;
  t.qcScopeTotal = t.qcLaborCost + t.qcPerDiemCost;
  t.matHandlWorkDays = t.pileDaysToComplete + 3;
  t.matHandlCalendarDays = Math.ceil(t.matHandlWorkDays * 7 / n.workdaysInWeek);
  t.matHandlManHours = n.matHandlCrewSize * t.matHandlWorkDays * n.workHoursPerDay;
  t.matHandlLaborCost = n.matHandlAdmin * t.adminDayRate * t.matHandlWorkDays + n.matHandlGeneralLabor * t.generalLaborHourlyRate * t.matHandlWorkDays * n.workHoursPerDay + n.matHandlTeleOps * t.telehandlerOpHourlyRate * t.matHandlWorkDays * n.workHoursPerDay + n.matHandlSkidOps * t.skidSteerOpHourlyRate * t.matHandlWorkDays * n.workHoursPerDay;
  t.matHandlPerDiemCost = n.includeHotelPerDiem ? n.matHandlCrewSize * n.perDiem * n.perDiemPct * t.matHandlCalendarDays : 0;
  t.matHandlEquipRental = n.matHandlSkidOps * n.skidSteerEquipDaily * t.matHandlCalendarDays + n.matHandlTeleOps * n.telehandlerEquipDaily * t.matHandlCalendarDays;
  t.matHandlFuelCost = n.matHandlSkidOps * t.skidSteerFuelPerDay * t.matHandlWorkDays + n.matHandlTeleOps * t.telehandlerFuelPerDay * t.matHandlWorkDays;
  t.matHandlScopeTotal = t.matHandlLaborCost + t.matHandlPerDiemCost + t.matHandlEquipRental + t.matHandlFuelCost;
  t.totalCalendarDays = t.pileCalendarDays + t.rackingCalendarDays + t.moduleCalendarDays + 6;
  t.totalWorkDays = t.pileDaysToComplete + t.rackingDaysToComplete + t.moduleDaysToComplete + 4;
  t.totalMonths = t.totalCalendarDays / 30.44;
  t.totalManHoursAll = t.pileTotalManHours + t.rackingManHours + t.moduleManHours + t.qcManHours + t.matHandlManHours;
  t.cartsUtvCost = n.gcCartsRate * n.gcCartsQty * t.totalCalendarDays;
  t.cartsUtvFuelCost = t.utvFuelPerDay * n.gcCartsQty * t.totalWorkDays;
  t.maintenanceCost = n.gcMaintenanceRate * t.totalMonths;
  t.sanitaryCost = n.gcSanitaryRate * n.gcSanitaryQty * t.totalCalendarDays;
  t.safetyCost = n.gcSafetyRate * t.totalManHoursAll;
  t.siteOfficeCost = n.gcSiteOfficeRate * t.totalMonths;
  t.smallToolsCost = n.gcSmallToolsRate * t.totalManHoursAll;
  t.fuelDeliveryCost = n.gcFuelDeliveryRate;
  t.pileSurveyCost = n.gcPileSurveyRate * t.totalPiles;
  t.addlMobSurveyCost = n.gcAddlMobRate;
  t.twistBarsCost = n.gcTwistBarsRate * n.gcTwistBarsQty;
  t.payrollCost = n.gcPayrollRate * n.gcPayrollQty * t.totalWorkDays;
  t.gcTotalCost = t.cartsUtvCost + t.cartsUtvFuelCost + t.maintenanceCost + t.sanitaryCost + t.safetyCost + t.siteOfficeCost + t.smallToolsCost + t.fuelDeliveryCost + t.pileSurveyCost + t.addlMobSurveyCost + t.twistBarsCost + t.payrollCost;
  const mgmt = (rate, qty, calDays, pct, _unused, perDiem) => {
    if (qty === 0) return 0;
    const burdened = rate * n.mgmtBurdenMultiplier;
    const days = Math.ceil(calDays * pct);
    const hrs = 8 + (n.workHoursPerDay - 8) * 1.5;
    const pd = perDiem ? calDays * pct * n.mgmtPerDiem : 0;
    return burdened * qty * days * hrs + pd;
  };
  t.mgmtSuperCost = mgmt(n.mgmtSuperRate, n.mgmtSuperQty, t.totalCalendarDays, n.mgmtPctOnSite, false, n.mgmtSuperPerDiem);
  t.mgmtForemanCost = mgmt(n.mgmtForemanRate, n.mgmtForemanQty, t.totalCalendarDays, n.mgmtPctOnSite, false, n.mgmtForemanPerDiem);
  t.mgmtSafetyCost = mgmt(n.mgmtSafetyRate, n.mgmtSafetyQty, t.totalCalendarDays, n.mgmtPctOnSite, false, n.mgmtSafetyPerDiem);
  t.mgmtTotalCost = t.mgmtSuperCost + t.mgmtForemanCost + t.mgmtSafetyCost;
  t.mobCompanyTruckCost = n.mobCompanyTruckRate * n.mobCompanyTruckQty * (n.milesFromHQ / n.mobMPH);
  t.mobTrailerCost = n.mobTrailerRate * n.mobTrailerQty * (n.milesFromHQ * 2);
  t.mobRentalEquipCost = n.mobRentalEquipRate * n.mobRentalEquipQty * (n.mobExtraMobs + 1);
  t.mobLaborCost = t.generalLaborHourlyRate * (n.milesFromHQ / n.mobMPH);
  t.mobPerDiemCost = n.perDiem * 3;
  t.mobTotalCost = t.mobCompanyTruckCost + t.mobTrailerCost + t.mobRentalEquipCost + t.mobLaborCost + t.mobPerDiemCost;
  t.wasteTotal = n.wasteDumpsterQty * n.wasteDumpsterEmptied * n.wasteDumpsterRate * 2;
  t.totalFuelCost = t.pileFuelCost + t.rackingFuelCost + t.moduleFuelCost + t.matHandlFuelCost + t.cartsUtvFuelCost;
  t.subtotalCost = t.gcTotalCost + t.mgmtTotalCost + t.mobTotalCost + t.wasteTotal + t.matHandlScopeTotal + t.pileScopeTotal + t.qcScopeTotal + t.rackingScopeTotal + t.moduleScopeTotal;
  t.contingencyAmt = t.subtotalCost * n.contingencyPct;
  t.subtotalWithContingency = t.subtotalCost + t.contingencyAmt;
  t.markupAmt = t.subtotalWithContingency * n.markupPct / (1 - n.markupPct);
  t.preBondTotal = t.subtotalWithContingency + t.markupAmt;
  t.bondAmt = t.preBondTotal * n.bondPct;
  t.postBondTotal = t.preBondTotal + t.bondAmt;
  t.dollarPerWatt = t.preBondTotal / t.systemWDC;
  t.dollarPerWattWithBond = t.postBondTotal / t.systemWDC;
  t.totalApprenticeHours = pileApp * t.pileDaysToComplete * n.workHoursPerDay + n.rackingGeneralLaborApp * t.rackingDaysToComplete * n.workHoursPerDay + n.moduleGeneralLaborApp * t.moduleDaysToComplete * n.workHoursPerDay + n.qcApprentices * t.qcWorkdays * n.workHoursPerDay;
  t.apprenticePct = t.totalManHoursAll > 0 ? t.totalApprenticeHours / t.totalManHoursAll : 0;
  t.apprenticeMet = t.apprenticePct >= n.apprenticeReqPct;
  t.manHoursPerMW = t.totalManHoursAll / n.systemSizeMW;
  return t;
}

/* ----------------------------------------------------------------------------
   Formatting helpers
---------------------------------------------------------------------------- */

const money = v => "$" + Number(v || 0).toLocaleString("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
const money0 = v => "$" + Number(v || 0).toLocaleString("en-US", {
  maximumFractionDigits: 0
});
const num = (v, d = 0) => Number(v || 0).toLocaleString("en-US", {
  minimumFractionDigits: d,
  maximumFractionDigits: d
});
const pct = v => (Number(v || 0) * 100).toFixed(1) + "%";
const esc = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const titleDate = () => new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric"
});
const bidNo = bid => "SRC-" + (esc(bid.projectName || "BID").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8) || "BID") + "-" + new Date().getFullYear();

/* ----------------------------------------------------------------------------
   Shared document chrome
---------------------------------------------------------------------------- */

function docHead(title) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>
  <title>${esc(title)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Barlow:wght@300;400;500;600;700&family=Barlow+Condensed:wght@400;500;600;700&display=swap');
    * { margin:0; padding:0; box-sizing:border-box; }
    html,body { font-family:'Barlow',system-ui,sans-serif; color:#1a1a1a; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
    .page { position:relative; width:8.5in; min-height:11in; padding:0.6in 0.7in 0.95in; page-break-after:always; overflow:hidden; background:#fff; }
    .page:last-child { page-break-after:auto; }
    h1,h2,h3,.ops { font-family:'Black Ops One',sans-serif; font-weight:400; letter-spacing:.02em; }
    .accent { color:${BRAND.orange}; }
    .h-section { font-size:30px; text-transform:uppercase; color:${BRAND.ink}; border-bottom:3px solid ${BRAND.orange}; padding-bottom:8px; margin-bottom:22px; display:inline-block; }
    .lead { font-size:14px; line-height:1.6; color:#333; }
    table { width:100%; border-collapse:collapse; font-size:11px; }
    th { background:${BRAND.ink}; color:#fff; text-align:left; padding:7px 9px; font-family:'Barlow Condensed'; text-transform:uppercase; letter-spacing:.04em; font-weight:600; font-size:11px; }
    td { padding:6px 9px; border-bottom:1px solid ${BRAND.line}; }
    tr:nth-child(even) td { background:#faf8f5; }
    .num { text-align:right; font-variant-numeric:tabular-nums; }
    .tot td { background:${BRAND.orange}!important; color:#fff; font-weight:700; font-size:13px; }
    .footer { position:absolute; left:0; right:0; bottom:0; height:0.62in; background:${BRAND.ink}; display:flex; align-items:center; padding:0 0.6in; gap:12px; }
    .footer img { height:30px; width:30px; border-radius:50%; object-fit:cover; background:#fff; }
    .footer .ft { font-family:'Barlow Condensed'; font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:#cbd5e1; }
    .footer .ft b { color:${BRAND.orange}; }
    .footer .pg { margin-left:auto; font-family:'Black Ops One'; color:#fff; font-size:13px; }
    ul.terms { list-style:none; }
    ul.terms > li { font-size:11.5px; line-height:1.5; padding:5px 0 5px 22px; position:relative; border-bottom:1px solid #f0ece4; }
    ul.terms > li:before { content:""; position:absolute; left:4px; top:11px; width:7px; height:7px; background:${BRAND.orange}; border-radius:2px; }
    ul.sub { list-style:none; margin:4px 0 0 18px; }
    ul.sub > li { font-size:10.5px; line-height:1.45; color:#555; padding:2px 0 2px 16px; position:relative; }
    ul.sub > li:before { content:"–"; position:absolute; left:2px; color:${BRAND.orange}; }
    .grid2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
    .card { border:1px solid ${BRAND.line}; border-left:4px solid ${BRAND.orange}; border-radius:4px; padding:12px 14px; }
    .card .k { font-family:'Barlow Condensed'; text-transform:uppercase; letter-spacing:.06em; font-size:11px; color:#888; }
    .card .v { font-family:'Black Ops One'; font-size:22px; color:${BRAND.ink}; margin-top:2px; }
    .kpi { display:flex; gap:10px; flex-wrap:wrap; margin:14px 0; }
    .kpi > div { flex:1; min-width:120px; background:${BRAND.ink}; color:#fff; border-radius:6px; padding:12px 14px; }
    .kpi .k { font-family:'Barlow Condensed'; text-transform:uppercase; font-size:11px; letter-spacing:.06em; color:#9fb0c8; }
    .kpi .v { font-family:'Black Ops One'; font-size:24px; color:${BRAND.orange}; margin-top:3px; }
    @page { size:letter; margin:0; }
    @media print { .noprint{display:none!important;} }
  </style></head><body>`;
}
function footer(bid, page) {
  return `<div class="footer"><img src="${SRC_LOGO}"/><div class="ft"><b>${esc((bid.projectName || "PROJECT").toUpperCase())} PROPOSAL</b> — SUN RISE CONSTRUCTION & DEVELOPMENT LLC</div><div class="pg">${page}</div></div>`;
}
function openPrint(html) {
  const w = window.open("", "_blank");
  if (!w) {
    alert("Allow pop-ups to export the document.");
    return;
  }
  w.document.open();
  w.document.write(html);
  w.document.close();
  // Give fonts/logo a beat to load, then print.
  const go = () => {
    try {
      w.focus();
      w.print();
    } catch (e) {}
  };
  if (w.document.readyState === "complete") setTimeout(go, 600);else w.onload = () => setTimeout(go, 600);
}

/* ----------------------------------------------------------------------------
   Bid Proposal (client-facing)
---------------------------------------------------------------------------- */

function buildProposalHTML(bid, computed) {
  const c = computed || computeBid({
    ...DEFAULT_BID,
    ...bid
  });
  const estNo = bidNo(bid);
  const scopes = [["Pile Installation", c.pileScopeTotal], ["Racking Installation", c.rackingScopeTotal], ["Module Installation", c.moduleScopeTotal], ["Material Handling", c.matHandlScopeTotal], ["Quality Control", c.qcScopeTotal], ["General Conditions", c.gcTotalCost], ["Project Management", c.mgmtTotalCost], ["Mobilization", c.mobTotalCost], ["Waste Management", c.wasteTotal]];
  const scopeRows = scopes.map(([k, v]) => `<tr><td>${k}</td><td class="num">${money(v)}</td></tr>`).join("");
  const breakdown = [["Pile Installation", c.pileLaborCost, c.pileEquipRental, c.pileFuelCost, c.pilePerDiemCost, c.pileScopeTotal], ["Racking Installation", c.rackingLaborCost, c.rackingEquipRental, c.rackingFuelCost, c.rackingPerDiemCost, c.rackingScopeTotal], ["Module Installation", c.moduleLaborCost, c.moduleEquipRental, c.moduleFuelCost, c.modulePerDiemCost, c.moduleScopeTotal], ["Material Handling", c.matHandlLaborCost, c.matHandlEquipRental, c.matHandlFuelCost, c.matHandlPerDiemCost, c.matHandlScopeTotal], ["Quality Control", c.qcLaborCost, 0, 0, c.qcPerDiemCost, c.qcScopeTotal]];
  const breakdownRows = breakdown.map(([k, l, e, f, p, tot]) => `<tr><td>${k}</td><td class="num">${money(l)}</td><td class="num">${money(e)}</td><td class="num">${money(f)}</td><td class="num">${money(p)}</td><td class="num">${money(tot)}</td></tr>`).join("");
  const incMech = ["Provide labor, supervision, tools, equipment & install furnished materials to complete the mechanical scopes of work.", "Pile installation including layout verification, driving, and embedment to project specifications.", "Torque tube, module rail, and tracker mechanical assembly per the racking manufacturer's installation manual.", "Module installation, clamping, and torqueing to manufacturer specification.", "Mechanical scope quality control, inspection, and punch-list completion.", "One (1) mobilization and one (1) demobilization consistent with the proposed schedule basis.", "Material handling directly associated with Sun Rise's mechanical scope: receipt, unloading, staging, and distribution of owner-furnished materials using Sun Rise-provided handling equipment (telehandlers, skid steers, forklifts).", "Required insurance coverage carried by Sun Rise for execution of the scope of work.", "Pile pull testing on approximately 2% of total installed piles, selected by the Owner/EPC — execution and data collection only.", `Work schedule basis: ${bid.workdaysInWeek || 5}-day work week, ${bid.workHoursPerDay || 10}-hour day (${bid.workdaysInWeek || 5}×${bid.workHoursPerDay || 10}).`];
  const excMech = ["Owner-furnished / permanent project materials.", "Civil scope: clearing, grubbing, grading, road construction, dust control, and soil stabilization.", "Electrical scope of any kind (DC/AC), unless explicitly added by contract.", "Site security services, guards, cameras, fencing, lighting, or monitoring for the overall site or laydown areas.", "Schedule changes / acceleration beyond the stated basis: overtime, shift work, or resequencing directed by others.", "Costs and impacts from delays or inefficiencies caused by Owner/EPC deliveries, incomplete kits, access restrictions, or interference by other trades.", "Permits, fees, inspections, or authority requirements not directly tied to Sun Rise's mechanical installation scope.", "Dewatering, water hauling, and water management.", "Standby / idle time caused by delays by others, access restrictions, or inspection delays."];
  const incPre = [`Pre-drilling of approximately ${num(c.totalPiles)} holes for racking, inverter, and combiner foundations in accordance with project plans and specifications.`, "Drilling to required depth and diameter necessary to support pile installation.", "Provision of all drilling rigs, support equipment, operators, and labor required to execute the pre-drill scope.", "Standard tooling, augers, wear parts, and routine maintenance.", "One (1) mobilization and one (1) demobilization of all personnel and equipment, consistent with the proposal pricing.", "Field supervision, coordination, site management, and daily reporting.", "Survey layout and verification for the pre-drill installation only.", "Pre-drilling based on anticipated subsurface conditions consistent with geotechnical reports provided at time of bid."];
  const excPre = ["Over-drilling / depth changes: any drilling beyond specified depths or standard diameters due to design changes, field conditions, or failed inspections.", "Rework / abandoned holes: re-drilling due to design changes, misalignment not caused by Sun Rise, or inspection failures not related to drilling quality.", "Site preparation: clearing & grubbing, grading, road construction, dust control, stabilization of unsuitable soils.", "Water management: dewatering and water hauling.", "Weather delays / force majeure: flooding and extreme conditions.", "Standby / idle time: delays by others, access restrictions, inspection delays.", "Environmental / special requirements: archaeological monitoring and special permitting requirements."];
  const li = arr => arr.map(x => `<li>${esc(x)}</li>`).join("");
  let pageNo = 0;
  const PG = () => ++pageNo;
  return docHead((bid.projectName || "Project") + " — Proposal") + `
  <!-- COVER -->
  <div class="page" style="padding:0;">
    <div style="position:absolute;inset:0;background:
      radial-gradient(120% 90% at 80% -10%, ${BRAND.navy2} 0%, ${BRAND.ink} 55%, #000 100%);"></div>
    <div style="position:absolute;inset:0;background:
      repeating-linear-gradient(115deg, rgba(255,255,255,.03) 0 2px, transparent 2px 26px);"></div>
    <div style="position:absolute;left:0.7in;top:1.3in;right:0.7in;color:#fff;">
      <div style="font-family:'Barlow Condensed';letter-spacing:.35em;color:${BRAND.orange};font-size:14px;text-transform:uppercase;">Mechanical & Pre-Drill Proposal</div>
      <h1 style="font-size:54px;line-height:1.02;margin-top:14px;text-transform:uppercase;color:#fff;">${esc(bid.projectName || "Project Name")}</h1>
      <div style="width:120px;height:5px;background:${BRAND.orange};margin:18px 0;"></div>
      <div style="font-family:'Black Ops One';font-size:22px;color:${BRAND.cream};">SUN RISE CONSTRUCTION<br/>& DEVELOPMENT LLC</div>
      <div style="margin-top:10px;font-family:'Barlow Condensed';letter-spacing:.15em;color:#9fb0c8;font-size:14px;">BID ESTIMATE: ${estNo}</div>
    </div>
    <div style="position:absolute;left:0.7in;bottom:1.2in;color:#cbd5e1;font-size:12px;line-height:1.7;">
      <div style="font-family:'Barlow Condensed';letter-spacing:.2em;color:${BRAND.orange};text-transform:uppercase;margin-bottom:6px;">Report Prepared By</div>
      ${esc(SRC.rep)}<br/>${esc(SRC.repTitle)}<br/>${esc(SRC.legalName)}<br/>${esc(titleDate())}
    </div>
    <img src="${SRC_LOGO}" style="position:absolute;right:0.7in;bottom:1.1in;width:120px;height:120px;border-radius:50%;background:#fff;object-fit:cover;box-shadow:0 0 40px rgba(249,115,22,.4);"/>
  </div>

  <!-- TOC -->
  <div class="page" style="background:${BRAND.ink};color:#fff;">
    <h1 style="font-size:40px;text-transform:uppercase;margin-top:0.3in;">Table of <span class="accent">Contents</span></h1>
    <div style="width:120px;height:4px;background:${BRAND.orange};margin:16px 0 40px;"></div>
    ${[["Company & Contact Overview", "III"], ["Scope of Work & Pricing", "IV"], ["Detailed Price Breakdown", "V"], ["Mechanical Inclusions", "VI"], ["Mechanical Exclusions", "VII"], ["Pre-Drill Inclusions", "VIII"], ["Pre-Drill Exclusions", "IX"], ["Our Commitment", "X"]].map(([t, n]) => `<div style="display:flex;align-items:center;gap:12px;padding:13px 0;border-bottom:1px solid rgba(255,255,255,.12);font-family:'Barlow Condensed';font-size:18px;letter-spacing:.05em;text-transform:uppercase;"><span>${esc(t)}</span><span style="flex:1;border-bottom:1px dotted rgba(255,255,255,.25);margin:0 8px;"></span><span class="accent" style="font-family:'Black Ops One';">${n}</span></div>`).join("")}
    ${footer(bid, "II")}
  </div>

  <!-- COMPANY & CONTACT -->
  <div class="page">
    <h2 class="h-section">Company & Contact Overview</h2>
    <div class="grid2" style="margin-bottom:18px;">
      <div class="card"><div class="k">Bid Prepared By</div>
        <div style="font-family:'Black Ops One';font-size:16px;margin:4px 0 6px;color:${BRAND.ink};">${esc(SRC.legalName)}</div>
        <div style="font-size:12px;line-height:1.7;color:#444;">${esc(SRC.address)}<br/>Rep: ${esc(SRC.rep)} — ${esc(SRC.repTitle)}<br/>Phone: ${esc(SRC.phone)}<br/>Email: ${esc(SRC.email)}</div>
      </div>
      <div class="card"><div class="k">Bid Prepared For</div>
        <div style="font-family:'Black Ops One';font-size:16px;margin:4px 0 6px;color:${BRAND.ink};">${esc(bid.clientName || "Client")}</div>
        <div style="font-size:12px;line-height:1.7;color:#444;">${esc(bid.clientContact || "—")}</div>
      </div>
    </div>
    <div class="card" style="border-left-color:${BRAND.navy};">
      <div class="k">Project</div>
      <div style="font-size:13px;line-height:1.9;color:#333;margin-top:4px;">
        <b>Project Name:</b> ${esc(bid.projectName || "—")}<br/>
        <b>Project Location:</b> ${esc(bid.projectLocation || "—")}<br/>
        <b>Project Size:</b> ${num(bid.systemSizeMW, 2)} MW &nbsp;·&nbsp; <b>Module Count:</b> ${num(c.moduleCount)} &nbsp;·&nbsp; <b>Total Piles:</b> ${num(c.totalPiles)}
      </div>
    </div>
    <div style="margin-top:26px;" class="lead">
      ${esc(SRC.legalName)} is pleased to submit the following proposal for the
      ${esc(bid.projectName || "project")}${bid.projectLocation ? " located in " + esc(bid.projectLocation) : ""}.
      We appreciate this opportunity to serve you and look forward to executing a successful project together.
    </div>
    ${footer(bid, "III")}
  </div>

  <!-- SCOPE & PRICING -->
  <div class="page">
    <h2 class="h-section">Scope of Work & Pricing</h2>
    <div class="lead" style="margin-bottom:16px;">Provide labor, supervision, tools, equipment &amp; install furnished materials to complete the mechanical and pre-drill scopes of work.</div>
    <div class="kpi">
      <div><div class="k">Project Size</div><div class="v">${num(bid.systemSizeMW, 1)} MW</div></div>
      <div><div class="k">$ / Watt</div><div class="v">$${num(c.dollarPerWattWithBond, 3)}</div></div>
      <div><div class="k">Schedule</div><div class="v">${num(c.totalMonths, 1)} mo</div></div>
      <div><div class="k">Man-Hours</div><div class="v">${num(c.totalManHoursAll)}</div></div>
    </div>
    <h3 class="ops" style="font-size:18px;margin:18px 0 8px;text-transform:uppercase;">Pricing Summary</h3>
    <table>
      <tr><th>Scope</th><th class="num">Total</th></tr>
      ${scopeRows}
      <tr><td>Subtotal</td><td class="num">${money(c.subtotalCost)}</td></tr>
      <tr><td>Contingency (${pct(bid.contingencyPct ?? DEFAULT_BID.contingencyPct)})</td><td class="num">${money(c.contingencyAmt)}</td></tr>
      <tr><td>Overhead &amp; Profit</td><td class="num">${money(c.markupAmt)}</td></tr>
      <tr><td>Performance / Payment Bond (${pct(bid.bondPct ?? DEFAULT_BID.bondPct)})</td><td class="num">${money(c.bondAmt)}</td></tr>
      <tr class="tot"><td>Total Contract Price</td><td class="num">${money(c.postBondTotal)}</td></tr>
    </table>
    ${footer(bid, "IV")}
  </div>

  <!-- PRICE BREAKDOWN -->
  <div class="page">
    <h2 class="h-section">Detailed Price Breakdown</h2>
    <table>
      <tr><th>Scope</th><th class="num">Labor</th><th class="num">Equipment</th><th class="num">Fuel</th><th class="num">Per Diem</th><th class="num">Total</th></tr>
      ${breakdownRows}
      <tr><td>General Conditions</td><td class="num" colspan="4"></td><td class="num">${money(c.gcTotalCost)}</td></tr>
      <tr><td>Project Management</td><td class="num" colspan="4"></td><td class="num">${money(c.mgmtTotalCost)}</td></tr>
      <tr><td>Mobilization</td><td class="num" colspan="4"></td><td class="num">${money(c.mobTotalCost)}</td></tr>
      <tr><td>Waste Management</td><td class="num" colspan="4"></td><td class="num">${money(c.wasteTotal)}</td></tr>
      <tr class="tot"><td colspan="5">Direct + Indirect Subtotal</td><td class="num">${money(c.subtotalCost)}</td></tr>
    </table>
    <div class="grid2" style="margin-top:20px;">
      <div class="card"><div class="k">Pre-Drill Holes</div><div class="v">${num(c.totalPiles)}</div></div>
      <div class="card"><div class="k">Linear Feet of Racking</div><div class="v">${num(c.linearFeetRacking)}</div></div>
      <div class="card"><div class="k">Total Calendar Days</div><div class="v">${num(c.totalCalendarDays)}</div></div>
      <div class="card"><div class="k">Apprentice %</div><div class="v">${pct(c.apprenticePct)}</div></div>
    </div>
    ${footer(bid, "V")}
  </div>

  <!-- INCLUSIONS MECH -->
  <div class="page">
    <h2 class="h-section">Mechanical — Inclusions</h2>
    <ul class="terms">${li(incMech)}</ul>
    ${footer(bid, "VI")}
  </div>

  <!-- EXCLUSIONS MECH -->
  <div class="page">
    <h2 class="h-section">Mechanical — Exclusions</h2>
    <ul class="terms">${li(excMech)}</ul>
    ${footer(bid, "VII")}
  </div>

  <!-- INCLUSIONS PRE -->
  <div class="page">
    <h2 class="h-section">Pre-Drill — Inclusions</h2>
    <ul class="terms">${li(incPre)}</ul>
    ${footer(bid, "VIII")}
  </div>

  <!-- EXCLUSIONS PRE -->
  <div class="page">
    <h2 class="h-section">Pre-Drill — Exclusions</h2>
    <ul class="terms">${li(excPre)}</ul>
    ${footer(bid, "IX")}
  </div>

  <!-- COMMITMENT -->
  <div class="page">
    <h2 class="h-section">Our Commitment</h2>
    <div class="lead" style="margin-bottom:16px;">We don't just construct projects; we build outstanding teams, lasting jobs, and a working environment that sends everyone home safe, happy, and fulfilled at the end of each day.</div>
    <div class="lead" style="margin-bottom:16px;">Our strength is in our people. We have a reputation for delivering under high pressure with short deadlines. The moment we take on your project, we are fully committed to over-delivering on our promises and creating a quality project together.</div>
    <div class="lead">Our vision is our guide: we aim to be a leading energy contractor, supporting the nation's largest utility-scale projects with precision, efficiency, and dominance. We are excited to work with partners dedicated to the same vision of a brighter future.</div>
    <div style="margin-top:40px;text-align:center;">
      <img src="${SRC_LOGO}" style="width:90px;height:90px;border-radius:50%;background:#fff;object-fit:cover;"/>
      <div style="font-family:'Black Ops One';font-size:22px;margin-top:12px;color:${BRAND.ink};">${esc(SRC.legalName)}</div>
      <div style="font-family:'Barlow Condensed';letter-spacing:.2em;color:${BRAND.orange};text-transform:uppercase;margin-top:4px;">${esc(SRC.tagline)}</div>
      <div style="font-size:12px;color:#555;margin-top:10px;line-height:1.7;">${esc(SRC.phone)} &nbsp;·&nbsp; ${esc(SRC.email)}<br/>${esc(SRC.address)}</div>
    </div>
    ${footer(bid, "X")}
  </div>
  </body></html>`;
}

/* ----------------------------------------------------------------------------
   Project Execution Plan (internal)
---------------------------------------------------------------------------- */

function buildExecutionPlanHTML(bid, computed) {
  const c = computed || computeBid({
    ...DEFAULT_BID,
    ...bid
  });
  const row = (k, v) => `<tr><td>${esc(k)}</td><td class="num">${v}</td></tr>`;
  const scopePlan = [["Pre-Drill / Pile", c.pileDaysToComplete, c.pileCalendarDays, c.pileTotalStaff, c.pileTotalManHours, c.pileScopeTotal, `${bid.numExcavators} pile-driving rigs + ${bid.pileSkidSteerOps} skid steer op(s), ${bid.pileGroundMan} ground men, ${bid.pileAdditionalLaborers} laborers. ${num(c.pilesPerDayPerMachine, 0)} piles/day/machine across ${num(c.totalPiles)} piles.`], ["Racking", c.rackingDaysToComplete, c.rackingCalendarDays, bid.rackingTotalWorkers, c.rackingManHours, c.rackingScopeTotal, `${bid.rackingTotalWorkers}-person crew at ${bid.rackingLfPerHourPerMan} LF/hr/man over ${num(c.linearFeetRacking)} LF of torque tube.`], ["Module", c.moduleDaysToComplete, c.moduleCalendarDays, bid.moduleTotalWorkers, c.moduleManHours, c.moduleScopeTotal, `${bid.moduleTotalWorkers}-person crew at ${bid.modulesPerHourPerMan} modules/hr/man over ${num(c.moduleCount)} modules.`], ["Material Handling", c.matHandlWorkDays, c.matHandlCalendarDays, bid.matHandlCrewSize, c.matHandlManHours, c.matHandlScopeTotal, `${bid.matHandlCrewSize}-person crew running parallel to pile install (pile days + 3).`], ["Quality Control", c.qcWorkdays, c.qcCalendarDays, bid.qcNumMen, c.qcManHours, c.qcScopeTotal, `${bid.qcNumMen} QC men. ${num(c.qcTotalHours)} QC hours (pile ${num(c.qcPileHours)} / racking ${num(c.qcRackingHours)} / module ${num(c.qcModuleHours)}).`]];
  const scopePlanRows = scopePlan.map(([k, wd, cd, staff, mh, cost, note]) => `<tr><td><b>${k}</b></td><td class="num">${num(wd)}</td><td class="num">${num(cd)}</td><td class="num">${num(staff)}</td><td class="num">${num(mh)}</td><td class="num">${money0(cost)}</td></tr>
     <tr><td colspan="6" style="font-size:10.5px;color:#555;background:#faf8f5;padding-top:0;">${esc(note)}</td></tr>`).join("");
  const equip = [["Pile Driver / Excavator", bid.numExcavators, bid.pileDriverEquipDaily, c.pileDriverFuelPerDay], ["Skid Steer", bid.pileSkidSteerOps + bid.rackingSkidSteerOps + bid.moduleSkidSteerOps + bid.matHandlSkidOps, bid.skidSteerEquipDaily, c.skidSteerFuelPerDay], ["Telehandler", bid.rackingTelehandlerOps + bid.matHandlTeleOps, bid.telehandlerEquipDaily, c.telehandlerFuelPerDay], ["Company Truck", 1, bid.companyTruckEquipDaily, c.companyTruckFuelPerDay], ["UTV / Carts", bid.gcCartsQty, bid.gcCartsRate, c.utvFuelPerDay]];
  const equipRows = equip.map(([k, q, daily, fuel]) => `<tr><td>${k}</td><td class="num">${num(q)}</td><td class="num">${money(daily)}</td><td class="num">${money(fuel)}</td></tr>`).join("");
  const allFields = Object.keys(bid).filter(k => bid[k] !== "" && bid[k] != null);
  const inputRows = allFields.map(k => {
    let v = bid[k];
    if (typeof v === "boolean") v = v ? "Yes" : "No";
    return `<tr><td>${esc(k)}</td><td class="num">${esc(typeof v === "number" ? v.toLocaleString() : v)}</td></tr>`;
  }).join("");
  return docHead((bid.projectName || "Project") + " — Execution Plan") + `
  <div class="page" style="background:${BRAND.ink};color:#fff;padding-top:1.4in;">
    <div style="font-family:'Barlow Condensed';letter-spacing:.35em;color:${BRAND.orange};text-transform:uppercase;font-size:14px;">Internal — Project Execution Plan</div>
    <h1 style="font-size:48px;text-transform:uppercase;margin-top:12px;">${esc(bid.projectName || "Project")}</h1>
    <div style="width:120px;height:5px;background:${BRAND.orange};margin:16px 0;"></div>
    <div style="font-size:13px;color:#cbd5e1;line-height:1.9;">
      ${esc(bid.projectLocation || "")}<br/>
      ${num(bid.systemSizeMW, 2)} MW · ${num(c.totalPiles)} piles · ${num(c.moduleCount)} modules<br/>
      Prepared ${esc(titleDate())} · ${esc(SRC.legalName)}
    </div>
    <div class="kpi" style="margin-top:30px;">
      <div><div class="k">Contract Price</div><div class="v">${money0(c.postBondTotal)}</div></div>
      <div><div class="k">$ / Watt</div><div class="v">$${num(c.dollarPerWattWithBond, 3)}</div></div>
      <div><div class="k">Duration</div><div class="v">${num(c.totalCalendarDays)} d</div></div>
      <div><div class="k">Man-Hours</div><div class="v">${num(c.totalManHoursAll)}</div></div>
    </div>
    ${footer(bid, "1")}
  </div>

  <div class="page">
    <h2 class="h-section">Execution Methodology — How & Where</h2>
    <table>
      <tr><th>Scope</th><th class="num">Work Days</th><th class="num">Cal Days</th><th class="num">Crew</th><th class="num">Man-Hrs</th><th class="num">Cost</th></tr>
      ${scopePlanRows}
      <tr class="tot"><td>Project Total</td><td class="num">${num(c.totalWorkDays)}</td><td class="num">${num(c.totalCalendarDays)}</td><td class="num">—</td><td class="num">${num(c.totalManHoursAll)}</td><td class="num">${money0(c.subtotalCost)}</td></tr>
    </table>
    <p class="lead" style="margin-top:14px;font-size:12px;">Sequence: mobilize → material handling (parallel) → pre-drill / pile install → racking / torque tube → module install → QC &amp; punch → demobilize. Schedule basis ${bid.workdaysInWeek || 5}×${bid.workHoursPerDay || 10}.</p>
    ${footer(bid, "2")}
  </div>

  <div class="page">
    <h2 class="h-section">Manpower & Productivity</h2>
    <table>
      ${row("Total Man-Hours (all scopes)", num(c.totalManHoursAll))}
      ${row("Man-Hours per MW", num(c.manHoursPerMW, 0))}
      ${row("Apprentice Hours", num(c.totalApprenticeHours))}
      ${row("Apprentice %", pct(c.apprenticePct) + (c.apprenticeMet ? " (meets " + pct(bid.apprenticeReqPct ?? DEFAULT_BID.apprenticeReqPct) + ")" : " (below req)"))}
      ${row("Pile crew / day rate", num(c.pileTotalStaff) + " @ " + money(c.generalLaborDayRate))}
      ${row("Pile productivity", num(c.pilesPerDayPerMachine, 0) + " piles/day/machine")}
      ${row("Racking productivity", bid.rackingLfPerHourPerMan + " LF/hr/man")}
      ${row("Module productivity", bid.modulesPerHourPerMan + " modules/hr/man")}
      ${row("General labor day rate", money(c.generalLaborDayRate))}
      ${row("Pile driver op day rate", money(c.pileDriverOpDayRate))}
      ${row("Telehandler op day rate", money(c.telehandlerOpDayRate))}
      ${row("Skid steer op day rate", money(c.skidSteerOpDayRate))}
      ${row("Payroll tax burden", pct(c.payrollTaxPct))}
      ${row("Wage type", esc(bid.wageType || "Union"))}
    </table>
    ${footer(bid, "3")}
  </div>

  <div class="page">
    <h2 class="h-section">Schedule & Mobilization</h2>
    <div class="grid2" style="margin-bottom:16px;">
      <div class="card"><div class="k">Total Calendar Days</div><div class="v">${num(c.totalCalendarDays)}</div></div>
      <div class="card"><div class="k">Total Duration</div><div class="v">${num(c.totalMonths, 1)} mo</div></div>
    </div>
    <table>
      ${row("Pile work / calendar days", num(c.pileDaysToComplete) + " / " + num(c.pileCalendarDays))}
      ${row("Racking work / calendar days", num(c.rackingDaysToComplete) + " / " + num(c.rackingCalendarDays))}
      ${row("Module work / calendar days", num(c.moduleDaysToComplete) + " / " + num(c.moduleCalendarDays))}
      ${row("QC work / calendar days", num(c.qcWorkdays) + " / " + num(c.qcCalendarDays))}
      ${row("Schedule basis", (bid.workdaysInWeek || 5) + " days/wk × " + (bid.workHoursPerDay || 10) + " hr/day")}
      ${row("Drive + transition (min/pile)", num((bid.estDriveTime || 0) + (bid.estTransitionTime || 0)))}
      ${row("Miles from HQ", num(bid.milesFromHQ))}
      ${row("Mobilization total", money(c.mobTotalCost))}
      ${row("Extra mobilizations", num(bid.mobExtraMobs))}
    </table>
    ${footer(bid, "4")}
  </div>

  <div class="page">
    <h2 class="h-section">Equipment & Logistics</h2>
    <table>
      <tr><th>Equipment</th><th class="num">Qty</th><th class="num">Daily Rate</th><th class="num">Fuel / Day</th></tr>
      ${equipRows}
      <tr class="tot"><td colspan="3">Total Fuel Cost (project)</td><td class="num">${money0(c.totalFuelCost)}</td></tr>
    </table>
    <table style="margin-top:16px;">
      ${row("Diesel $/gal", money(bid.dieselPerGallon))}
      ${row("Pile equipment rental", money(c.pileEquipRental))}
      ${row("Racking equipment rental", money(c.rackingEquipRental))}
      ${row("Module equipment rental", money(c.moduleEquipRental))}
      ${row("Material handling rental", money(c.matHandlEquipRental))}
    </table>
    ${footer(bid, "5")}
  </div>

  <div class="page">
    <h2 class="h-section">Safety · QC · Waste · General Conditions</h2>
    <div class="grid2">
      <div class="card"><div class="k">Safety Program</div><div class="v">${money0(c.safetyCost)}</div><div style="font-size:11px;color:#555;margin-top:4px;">@ ${money(bid.gcSafetyRate)}/man-hr · ${bid.mgmtSafetyQty} safety mgr</div></div>
      <div class="card"><div class="k">Quality Control</div><div class="v">${money0(c.qcScopeTotal)}</div><div style="font-size:11px;color:#555;margin-top:4px;">${num(c.qcTotalHours)} hrs · ${bid.qcNumMen} men</div></div>
      <div class="card"><div class="k">Waste Management</div><div class="v">${money0(c.wasteTotal)}</div><div style="font-size:11px;color:#555;margin-top:4px;">${bid.wasteDumpsterQty} dumpsters @ ${money(bid.wasteDumpsterRate)}</div></div>
      <div class="card"><div class="k">General Conditions</div><div class="v">${money0(c.gcTotalCost)}</div><div style="font-size:11px;color:#555;margin-top:4px;">site office, sanitary, tools, survey, payroll</div></div>
    </div>
    <table style="margin-top:18px;">
      ${row("Pile pull testing", "~2% of " + num(c.totalPiles) + " piles")}
      ${row("Site office", money(c.siteOfficeCost))}
      ${row("Sanitary", money(c.sanitaryCost))}
      ${row("Small tools", money(c.smallToolsCost))}
      ${row("Pile survey", money(c.pileSurveyCost))}
      ${row("Payroll service", money(c.payrollCost))}
      ${row("Project management", money(c.mgmtTotalCost))}
    </table>
    ${footer(bid, "6")}
  </div>

  <div class="page">
    <h2 class="h-section">Financial Summary</h2>
    <table>
      ${row("Subtotal (direct + indirect)", money(c.subtotalCost))}
      ${row("Contingency (" + pct(bid.contingencyPct ?? DEFAULT_BID.contingencyPct) + ")", money(c.contingencyAmt))}
      ${row("Overhead & Profit (" + pct(bid.markupPct ?? DEFAULT_BID.markupPct) + ")", money(c.markupAmt))}
      ${row("Pre-Bond Total", money(c.preBondTotal))}
      ${row("Bond (" + pct(bid.bondPct ?? DEFAULT_BID.bondPct) + ")", money(c.bondAmt))}
      ${row("$/Watt (pre-bond)", "$" + num(c.dollarPerWatt, 3))}
      ${row("$/Watt (with bond)", "$" + num(c.dollarPerWattWithBond, 3))}
    </table>
    <table style="margin-top:6px;"><tr class="tot"><td>Total Contract Price</td><td class="num">${money(c.postBondTotal)}</td></tr></table>
    ${footer(bid, "7")}
  </div>

  <div class="page">
    <h2 class="h-section">Bid Inputs (Full Record)</h2>
    <table style="font-size:10px;">${inputRows}</table>
    ${footer(bid, "8")}
  </div>
  </body></html>`;
}

/* ----------------------------------------------------------------------------
   Public API
---------------------------------------------------------------------------- */

function exportBidProposal(bid, computed) {
  openPrint(buildProposalHTML(bid, computed));
}
function exportExecutionPlan(bid, computed) {
  openPrint(buildExecutionPlanHTML(bid, computed));
}
const btnBase = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "9px 16px",
  borderRadius: 6,
  cursor: "pointer",
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: ".06em",
  fontSize: 13,
  border: "none",
  outline: "none"
};
function BidExportButtons({
  bid,
  computed,
  style
}) {
  const c = useMemo(() => computed || computeBid({
    ...DEFAULT_BID,
    ...bid
  }), [bid, computed]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => exportBidProposal(bid, c),
    style: {
      ...btnBase,
      background: BRAND.orange,
      color: "#fff"
    },
    title: "Generate client-facing bid proposal PDF"
  }, "\uD83D\uDCC4 Export Bid Proposal"), /*#__PURE__*/React.createElement("button", {
    onClick: () => exportExecutionPlan(bid, c),
    style: {
      ...btnBase,
      background: BRAND.ink,
      color: "#fff"
    },
    title: "Generate internal project execution plan PDF"
  }, "\uD83D\uDDC2\uFE0F Export Execution Plan"));
}
function __SrcSiteMapTool(props){return React.createElement("div",{style:{position:"fixed",inset:0,zIndex:2000,overflow:"auto",background:"#fafafa"}},React.createElement("button",{onClick:props.onExit,style:{position:"fixed",top:8,right:12,zIndex:3000,padding:"7px 14px",background:"#0a0a14",color:"#fff",border:"none",borderRadius:6,cursor:"pointer",fontFamily:"sans-serif",fontWeight:700,letterSpacing:".04em"}},"← Dashboard"),React.createElement(SiteMap,null));}
window.__SrcSiteMap=__SrcSiteMapTool;
window.__srcExportProposal=function(p,c){try{exportBidProposal(p,c)}catch(e){console.error(e);alert("Export failed: "+e.message)}};
window.__srcExportPlan=function(p,c){try{exportExecutionPlan(p,c)}catch(e){console.error(e);alert("Export failed: "+e.message)}};
}catch(err){console.error("SRC tools init failed",err);}})();
