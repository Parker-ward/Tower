import{_ as v,r as g,w as f,b as h,d as n,e as u,l as _,P as m,E as y,c as r,a as t,t as i,F as p,f as k,o as l,A as a,p as E,g as b,u as w}from"./index.a54307ea.js";const A={setup(){w();const e=g({});f(()=>{a.account.id&&(e.value={...a.account})});async function d(){try{await u.getMytickets()}catch(c){_.error(c),m.error(c.message)}}return h(()=>{d()}),{tickets:n(()=>a.tickets),myEvents:n(()=>a.myEvents),editable:e,account:n(()=>a.account),async editAccount(){try{const c=e.value;await u.editAccount(c)}catch(c){_.error(c),m.error(c.message)}}}},components:{EventCard:y}},I=e=>(E("data-v-a5dba52e"),e=e(),b(),e),S={class:"about text-center"},x=["src"],M={class:"container-fluid"},P={class:"row"},B=I(()=>t("div",{class:"col-12"},[t("h1",null,"My Tickets:")],-1)),D={class:"col-md-3"},F=["src","alt","title"];function C(e,d,c,s,L,N){return l(),r(p,null,[t("div",S,[t("h1",null,"Welcome "+i(s.account.name),1),t("img",{class:"rounded",src:s.account.picture,alt:""},null,8,x),t("p",null,i(s.account.email),1)]),t("div",M,[t("div",P,[B,(l(!0),r(p,null,k(s.myEvents,o=>(l(),r("div",D,[t("div",null,[t("img",{class:"img-fluid rounded ticketImg",src:o.event.coverImg,alt:o.event.name+" picture",title:o.event.name},null,8,F),t("p",null,i(o.event.name),1)])]))),256))])])],64)}const T=v(A,[["render",C],["__scopeId","data-v-a5dba52e"]]);export{T as default};