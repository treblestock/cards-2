import{p as o}from"./index-B_DcgIix.js";const r="cardSets",c="cardSet_",g=o("cardSets",{state:()=>({cardSets:{}}),getters:{},actions:{getCardSetsNames(){const t=localStorage.getItem(r);return t?JSON.parse(t):[]},updateCardSetsNames(t){const e=JSON.stringify(t);localStorage.setItem(r,e)},getCardSetLocalStorageKey(t){return c+t},loadCardSetsFromLocalStorage(){const t=this.getCardSetsNames();for(const e of t){const a=this.getCardSetLocalStorageKey(e),s=localStorage.getItem(a),S=JSON.parse(s);this.cardSets[e]=S}},createCardSet(t,e){this.cardSets[t]=e;const a=this.getCardSetsNames();a.push(t),this.updateCardSetsNames(a);const s=this.getCardSetLocalStorageKey(t);localStorage.setItem(s,JSON.stringify(e))}},onRegister(){this.loadCardSetsFromLocalStorage()}});export{g as u};
