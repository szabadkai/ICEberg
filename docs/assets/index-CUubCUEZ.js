(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const Ge=globalThis,xt=Ge.ShadowRoot&&(Ge.ShadyCSS===void 0||Ge.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,wt=Symbol(),Nt=new WeakMap;let Qt=class{constructor(e,s,i){if(this._$cssResult$=!0,i!==wt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=s}get styleSheet(){let e=this.o;const s=this.t;if(xt&&e===void 0){const i=s!==void 0&&s.length===1;i&&(e=Nt.get(s)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Nt.set(s,e))}return e}toString(){return this.cssText}};const ls=t=>new Qt(typeof t=="string"?t:t+"",void 0,wt),R=(t,...e)=>{const s=t.length===1?t[0]:e.reduce(((i,r,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[o+1]),t[0]);return new Qt(s,t,wt)},us=(t,e)=>{if(xt)t.adoptedStyleSheets=e.map((s=>s instanceof CSSStyleSheet?s:s.styleSheet));else for(const s of e){const i=document.createElement("style"),r=Ge.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=s.cssText,t.appendChild(i)}},Bt=xt?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let s="";for(const i of e.cssRules)s+=i.cssText;return ls(s)})(t):t;const{is:hs,defineProperty:ps,getOwnPropertyDescriptor:fs,getOwnPropertyNames:ms,getOwnPropertySymbols:gs,getPrototypeOf:bs}=Object,ct=globalThis,jt=ct.trustedTypes,vs=jt?jt.emptyScript:"",ys=ct.reactiveElementPolyfillSupport,je=(t,e)=>t,Xe={toAttribute(t,e){switch(e){case Boolean:t=t?vs:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=t!==null;break;case Number:s=t===null?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch{s=null}}return s}},St=(t,e)=>!hs(t,e),Rt={attribute:!0,type:String,converter:Xe,reflect:!1,useDefault:!1,hasChanged:St};Symbol.metadata??=Symbol("metadata"),ct.litPropertyMetadata??=new WeakMap;let ke=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,s=Rt){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(e,s),!s.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,s);r!==void 0&&ps(this.prototype,e,r)}}static getPropertyDescriptor(e,s,i){const{get:r,set:o}=fs(this.prototype,e)??{get(){return this[s]},set(n){this[s]=n}};return{get:r,set(n){const p=r?.call(this);o?.call(this,n),this.requestUpdate(e,p,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Rt}static _$Ei(){if(this.hasOwnProperty(je("elementProperties")))return;const e=bs(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(je("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(je("properties"))){const s=this.properties,i=[...ms(s),...gs(s)];for(const r of i)this.createProperty(r,s[r])}const e=this[Symbol.metadata];if(e!==null){const s=litPropertyMetadata.get(e);if(s!==void 0)for(const[i,r]of s)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[s,i]of this.elementProperties){const r=this._$Eu(s,i);r!==void 0&&this._$Eh.set(r,s)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const s=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)s.unshift(Bt(r))}else e!==void 0&&s.push(Bt(e));return s}static _$Eu(e,s){const i=s.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return us(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,s,i){this._$AK(e,i)}_$ET(e,s){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){const o=(i.converter?.toAttribute!==void 0?i.converter:Xe).toAttribute(s,i.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,s){const i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const o=i.getPropertyOptions(r),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:Xe;this._$Em=r;const p=n.fromAttribute(s,o.type);this[r]=p??this._$Ej?.get(r)??p,this._$Em=null}}requestUpdate(e,s,i){if(e!==void 0){const r=this.constructor,o=this[e];if(i??=r.getPropertyOptions(e),!((i.hasChanged??St)(o,s)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,s,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,s,{useDefault:i,reflect:r,wrapped:o},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??s??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(s=void 0),this._$AL.set(e,s)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(s){Promise.reject(s)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,o]of i){const{wrapped:n}=o,p=this[r];n!==!0||this._$AL.has(r)||p===void 0||this.C(r,void 0,o,p)}}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),this._$EO?.forEach((i=>i.hostUpdate?.())),this.update(s)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(s)}willUpdate(e){}_$AE(e){this._$EO?.forEach((s=>s.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((s=>this._$ET(s,this[s]))),this._$EM()}updated(e){}firstUpdated(e){}};ke.elementStyles=[],ke.shadowRootOptions={mode:"open"},ke[je("elementProperties")]=new Map,ke[je("finalized")]=new Map,ys?.({ReactiveElement:ke}),(ct.reactiveElementVersions??=[]).push("2.1.1");const $t=globalThis,et=$t.trustedTypes,Mt=et?et.createPolicy("lit-html",{createHTML:t=>t}):void 0,Gt="$lit$",fe=`lit$${Math.random().toFixed(9).slice(2)}$`,Zt="?"+fe,xs=`<${Zt}>`,ve=document,Re=()=>ve.createComment(""),Me=t=>t===null||typeof t!="object"&&typeof t!="function",_t=Array.isArray,ws=t=>_t(t)||typeof t?.[Symbol.iterator]=="function",bt=`[ 	
\f\r]`,Ne=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Lt=/-->/g,Ut=/>/g,ge=RegExp(`>|${bt}(?:([^\\s"'>=/]+)(${bt}*=${bt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),qt=/'/g,Ht=/"/g,Xt=/^(?:script|style|textarea|title)$/i,Ss=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),d=Ss(1),Ce=Symbol.for("lit-noChange"),J=Symbol.for("lit-nothing"),Vt=new WeakMap,be=ve.createTreeWalker(ve,129);function es(t,e){if(!_t(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Mt!==void 0?Mt.createHTML(e):e}const $s=(t,e)=>{const s=t.length-1,i=[];let r,o=e===2?"<svg>":e===3?"<math>":"",n=Ne;for(let p=0;p<s;p++){const h=t[p];let f,I,A=-1,Z=0;for(;Z<h.length&&(n.lastIndex=Z,I=n.exec(h),I!==null);)Z=n.lastIndex,n===Ne?I[1]==="!--"?n=Lt:I[1]!==void 0?n=Ut:I[2]!==void 0?(Xt.test(I[2])&&(r=RegExp("</"+I[2],"g")),n=ge):I[3]!==void 0&&(n=ge):n===ge?I[0]===">"?(n=r??Ne,A=-1):I[1]===void 0?A=-2:(A=n.lastIndex-I[2].length,f=I[1],n=I[3]===void 0?ge:I[3]==='"'?Ht:qt):n===Ht||n===qt?n=ge:n===Lt||n===Ut?n=Ne:(n=ge,r=void 0);const X=n===ge&&t[p+1].startsWith("/>")?" ":"";o+=n===Ne?h+xs:A>=0?(i.push(f),h.slice(0,A)+Gt+h.slice(A)+fe+X):h+fe+(A===-2?p:X)}return[es(t,o+(t[s]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class Le{constructor({strings:e,_$litType$:s},i){let r;this.parts=[];let o=0,n=0;const p=e.length-1,h=this.parts,[f,I]=$s(e,s);if(this.el=Le.createElement(f,i),be.currentNode=this.el.content,s===2||s===3){const A=this.el.content.firstChild;A.replaceWith(...A.childNodes)}for(;(r=be.nextNode())!==null&&h.length<p;){if(r.nodeType===1){if(r.hasAttributes())for(const A of r.getAttributeNames())if(A.endsWith(Gt)){const Z=I[n++],X=r.getAttribute(A).split(fe),de=/([.?@])?(.*)/.exec(Z);h.push({type:1,index:o,name:de[2],strings:X,ctor:de[1]==="."?ks:de[1]==="?"?Cs:de[1]==="@"?Es:dt}),r.removeAttribute(A)}else A.startsWith(fe)&&(h.push({type:6,index:o}),r.removeAttribute(A));if(Xt.test(r.tagName)){const A=r.textContent.split(fe),Z=A.length-1;if(Z>0){r.textContent=et?et.emptyScript:"";for(let X=0;X<Z;X++)r.append(A[X],Re()),be.nextNode(),h.push({type:2,index:++o});r.append(A[Z],Re())}}}else if(r.nodeType===8)if(r.data===Zt)h.push({type:2,index:o});else{let A=-1;for(;(A=r.data.indexOf(fe,A+1))!==-1;)h.push({type:7,index:o}),A+=fe.length-1}o++}}static createElement(e,s){const i=ve.createElement("template");return i.innerHTML=e,i}}function Ee(t,e,s=t,i){if(e===Ce)return e;let r=i!==void 0?s._$Co?.[i]:s._$Cl;const o=Me(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(t),r._$AT(t,s,i)),i!==void 0?(s._$Co??=[])[i]=r:s._$Cl=r),r!==void 0&&(e=Ee(t,r._$AS(t,e.values),r,i)),e}class _s{constructor(e,s){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=s}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:s},parts:i}=this._$AD,r=(e?.creationScope??ve).importNode(s,!0);be.currentNode=r;let o=be.nextNode(),n=0,p=0,h=i[0];for(;h!==void 0;){if(n===h.index){let f;h.type===2?f=new Je(o,o.nextSibling,this,e):h.type===1?f=new h.ctor(o,h.name,h.strings,this,e):h.type===6&&(f=new As(o,this,e)),this._$AV.push(f),h=i[++p]}n!==h?.index&&(o=be.nextNode(),n++)}return be.currentNode=ve,r}p(e){let s=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,s),s+=i.strings.length-2):i._$AI(e[s])),s++}}class Je{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,s,i,r){this.type=2,this._$AH=J,this._$AN=void 0,this._$AA=e,this._$AB=s,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const s=this._$AM;return s!==void 0&&e?.nodeType===11&&(e=s.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,s=this){e=Ee(this,e,s),Me(e)?e===J||e==null||e===""?(this._$AH!==J&&this._$AR(),this._$AH=J):e!==this._$AH&&e!==Ce&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ws(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==J&&Me(this._$AH)?this._$AA.nextSibling.data=e:this.T(ve.createTextNode(e)),this._$AH=e}$(e){const{values:s,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=Le.createElement(es(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(s);else{const o=new _s(r,this),n=o.u(this.options);o.p(s),this.T(n),this._$AH=o}}_$AC(e){let s=Vt.get(e.strings);return s===void 0&&Vt.set(e.strings,s=new Le(e)),s}k(e){_t(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let i,r=0;for(const o of e)r===s.length?s.push(i=new Je(this.O(Re()),this.O(Re()),this,this.options)):i=s[r],i._$AI(o),r++;r<s.length&&(this._$AR(i&&i._$AB.nextSibling,r),s.length=r)}_$AR(e=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class dt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,s,i,r,o){this.type=1,this._$AH=J,this._$AN=void 0,this.element=e,this.name=s,this._$AM=r,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=J}_$AI(e,s=this,i,r){const o=this.strings;let n=!1;if(o===void 0)e=Ee(this,e,s,0),n=!Me(e)||e!==this._$AH&&e!==Ce,n&&(this._$AH=e);else{const p=e;let h,f;for(e=o[0],h=0;h<o.length-1;h++)f=Ee(this,p[i+h],s,h),f===Ce&&(f=this._$AH[h]),n||=!Me(f)||f!==this._$AH[h],f===J?e=J:e!==J&&(e+=(f??"")+o[h+1]),this._$AH[h]=f}n&&!r&&this.j(e)}j(e){e===J?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ks extends dt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===J?void 0:e}}class Cs extends dt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==J)}}class Es extends dt{constructor(e,s,i,r,o){super(e,s,i,r,o),this.type=5}_$AI(e,s=this){if((e=Ee(this,e,s,0)??J)===Ce)return;const i=this._$AH,r=e===J&&i!==J||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==J&&(i===J||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class As{constructor(e,s,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=s,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Ee(this,e)}}const Fs=$t.litHtmlPolyfillSupport;Fs?.(Le,Je),($t.litHtmlVersions??=[]).push("3.3.1");const Is=(t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(r===void 0){const o=s?.renderBefore??null;i._$litPart$=r=new Je(e.insertBefore(Re(),o),o,void 0,s??{})}return r._$AI(t),r};const kt=globalThis;let T=class extends ke{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Is(s,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ce}};T._$litElement$=!0,T.finalized=!0,kt.litElementHydrateSupport?.({LitElement:T});const Ps=kt.litElementPolyfillSupport;Ps?.({LitElement:T});(kt.litElementVersions??=[]).push("4.2.1");const M=t=>(e,s)=>{s!==void 0?s.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)};const Os={attribute:!0,type:String,converter:Xe,reflect:!1,hasChanged:St},Ts=(t=Os,e,s)=>{const{kind:i,metadata:r}=s;let o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),o.set(s.name,t),i==="accessor"){const{name:n}=s;return{set(p){const h=e.get.call(this);e.set.call(this,p),this.requestUpdate(n,h,t)},init(p){return p!==void 0&&this.C(n,void 0,t,p),p}}}if(i==="setter"){const{name:n}=s;return function(p){const h=this[n];e.call(this,p),this.requestUpdate(n,h,t)}}throw Error("Unsupported decorator location: "+i)};function ce(t){return(e,s)=>typeof s=="object"?Ts(t,e,s):((i,r,o)=>{const n=r.hasOwnProperty(o);return r.constructor.createProperty(o,i),n?Object.getOwnPropertyDescriptor(r,o):void 0})(t,e,s)}function y(t){return ce({...t,state:!0,attribute:!1})}let Ds=class extends Event{constructor(e,s,i,r){super("context-request",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=s,this.callback=i,this.subscribe=r??!1}};class zs{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,s=!1){const i=s||!Object.is(e,this.o);this.o=e,i&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(const[s,{disposer:i}]of this.subscriptions)s(this.o,i)},e!==void 0&&(this.value=e)}addCallback(e,s,i){if(!i)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:s});const{disposer:r}=this.subscriptions.get(e);e(this.value,r)}clearCallbacks(){this.subscriptions.clear()}}let Ns=class extends Event{constructor(e,s){super("context-provider",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=s}};class Wt extends zs{constructor(e,s,i){super(s.context!==void 0?s.initialValue:i),this.onContextRequest=r=>{if(r.context!==this.context)return;const o=r.contextTarget??r.composedPath()[0];o!==this.host&&(r.stopPropagation(),this.addCallback(r.callback,o,r.subscribe))},this.onProviderRequest=r=>{if(r.context!==this.context||(r.contextTarget??r.composedPath()[0])===this.host)return;const o=new Set;for(const[n,{consumerHost:p}]of this.subscriptions)o.has(n)||(o.add(n),p.dispatchEvent(new Ds(this.context,p,n,!0)));r.stopPropagation()},this.host=e,s.context!==void 0?this.context=s.context:this.context=s,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new Ns(this.context,this.host))}}function Bs({context:t}){return(e,s)=>{const i=new WeakMap;if(typeof s=="object")return{get(){return e.get.call(this)},set(r){return i.get(this).setValue(r),e.set.call(this,r)},init(r){return i.set(this,new Wt(this,{context:t,initialValue:r})),r}};{e.constructor.addInitializer((n=>{i.set(n,new Wt(n,{context:t}))}));const r=Object.getOwnPropertyDescriptor(e,s);let o;if(r===void 0){const n=new WeakMap;o={get(){return n.get(this)},set(p){i.get(this).setValue(p),n.set(this,p)},configurable:!0,enumerable:!0}}else{const n=r.set;o={...r,set(p){i.get(this).setValue(p),n?.call(this,p)}}}return void Object.defineProperty(e,s,o)}}}const js=Symbol("app-state"),Be=[{name:"Low Priority",range:"0 - 100",priority:"Low",description:"Weak combination of impact, confidence, or ease",example:"Adding fax machine integration to a mobile app",color:"#EF4444",illustration:"tier1"},{name:"Medium Priority",range:"101 - 300",priority:"Medium",description:"Moderate overall score across dimensions",example:"Custom notification sounds per feature",color:"#F59E0B",illustration:"tier2"},{name:"Good Candidate",range:"301 - 500",priority:"Good",description:"Solid opportunity worth considering",example:"Adding bulk actions to admin panel",color:"#3B82F6",illustration:"tier3"},{name:"Strong Contender",range:"501 - 700",priority:"High",description:"High value opportunity with good confidence",example:"Improved search with filters and sorting",color:"#10B981",illustration:"tier4"},{name:"Top Priority",range:"701+",priority:"Critical",description:"Excellent combination of high impact, confidence, and ease",example:"One-click checkout for returning customers",color:"#059669",illustration:"tier5"}];function vt(t){return t<=100?Be[0]:t<=300?Be[1]:t<=500?Be[2]:t<=700?Be[3]:Be[4]}function Rs(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}class Ms{async createSession(e,s,i,r="mean"){return null}async loadSessions(){return[]}async loadSessionWithDetails(e){return null}async addFeaturesToSession(e,s){return[]}async saveSessionScore(e,s,i,r,o,n,p,h,f,I){return null}async updateSessionScore(e,s){return null}async getSessionAggregates(e){return[]}async getFeatureBreakdown(e,s){return null}async updateSessionStatus(e,s){return!1}async deleteSession(e){return!1}async hasUserScoredFeature(e,s,i){return!1}async getUserScore(e,s,i){return null}}const ie=new Ms,Jt="ice-scorecard-data",Kt=100;class Ls{constructor(){this.listeners=new Set,this.isRestoringFromHistory=!1,this.state=this.loadState(),this.initializeHistory(),this.loadScoresFromSupabase(),this.loadSessionsFromSupabase()}async loadScoresFromSupabase(){}async loadSessionsFromSupabase(){try{const e=await ie.loadSessions();e.length>0&&(this.state.sessions=e,this.notify())}catch(e){console.error("Failed to load sessions from Supabase:",e)}}initializeHistory(){window.addEventListener("popstate",e=>{e.state&&e.state.step&&(this.isRestoringFromHistory=!0,this.state.currentStep=e.state.step,this.notify(),this.isRestoringFromHistory=!1)}),window.history.state===null&&window.history.replaceState({step:this.state.currentStep},"",`#${this.state.currentStep}`)}loadState(){try{const e=localStorage.getItem(Jt);if(e){const s=JSON.parse(e);return{currentStep:"landing",featureName:"",scoredBy:"PM",responses:{impact:[],confidence:[],effort:[]},savedScores:s.savedScores||[],toasts:[],sessions:[]}}}catch(e){console.error("Failed to load state from localStorage:",e)}return{currentStep:"landing",featureName:"",scoredBy:"PM",responses:{impact:[],confidence:[],effort:[]},savedScores:[],toasts:[],sessions:[]}}saveState(){try{localStorage.setItem(Jt,JSON.stringify({savedScores:this.state.savedScores}))}catch(e){console.error("Failed to save state to localStorage:",e),e instanceof DOMException&&e.name==="QuotaExceededError"&&alert("Storage quota exceeded. Please clear old scores to continue.")}}getState(){return{...this.state}}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){this.listeners.forEach(e=>e(this.getState()))}setStep(e){this.state.currentStep=e,this.isRestoringFromHistory||window.history.pushState({step:e},"",`#${e}`),this.notify()}setFeatureInfo(e,s){this.state.featureName=e,this.state.scoredBy=s||"PM",this.notify()}setResponse(e,s,i){const r=this.state.responses[e],o=r.findIndex(n=>n.questionId===s);o>=0?r[o].value=i:r.push({questionId:s,value:i}),this.notify()}getResponse(e,s){return this.state.responses[e].find(r=>r.questionId===s)?.value}calculateScore(){const e=this.calculateAverage(this.state.responses.impact),s=this.calculateAverage(this.state.responses.confidence),i=this.calculateAverage(this.state.responses.effort),r=Number((e*s*i).toFixed(2)),o=new Date,n=o.toISOString().split("T")[0],p=o.toTimeString().slice(0,5),h={featureName:this.state.featureName,scoredBy:this.state.scoredBy,impact:Number(e.toFixed(2)),confidence:Number(s.toFixed(2)),effort:Number(i.toFixed(2)),iceScore:r,tier:vt(r),date:n,time:p,responses:{impact:[...this.state.responses.impact],confidence:[...this.state.responses.confidence],effort:[...this.state.responses.effort]}};return this.state.currentScore=h,this.notify(),h}calculateAverage(e){return e.length===0?0:e.reduce((i,r)=>i+r.value,0)/e.length}setJustification(e){this.state.currentScore&&(this.state.currentScore.justification=e,this.notify())}async saveCurrentScore(){if(this.state.currentScore){if(this.state.savedScores.length>=Kt){this.showToast(`Maximum of ${Kt} scores reached. Please clear old scores.`,"error");return}const e={...this.state.currentScore,id:this.generateId(),createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};this.state.savedScores.push(e),this.saveState(),this.notify()}}async updateScore(e,s){const i=this.state.savedScores.findIndex(o=>o.id===e);if(i===-1){console.error(`Score with ID ${e} not found`);return}let r={...this.state.savedScores[i],...s};if(s.impact!==void 0||s.confidence!==void 0||s.effort!==void 0){const o=s.impact??r.impact,n=s.confidence??r.confidence,p=s.effort??r.effort;r.iceScore=Number((o*n*p).toFixed(2)),r.tier=vt(r.iceScore)}r.updatedAt=new Date().toISOString(),this.state.savedScores[i]=r,this.saveState(),this.notify()}async deleteScore(e){const s=this.state.savedScores.findIndex(i=>i.id===e);s!==-1&&(this.state.savedScores.splice(s,1),this.saveState(),this.notify())}generateId(){return`${Date.now()}-${Math.random().toString(36).substr(2,9)}`}async clearAllScores(){this.state.savedScores=[],this.saveState(),this.notify()}resetForNewScore(){this.state.featureName="",this.state.scoredBy="PM",this.state.responses={impact:[],confidence:[],effort:[]},this.state.currentScore=void 0,this.state.currentStep="feature-input",this.notify()}needsJustification(){if(!this.state.currentScore)return!1;const e=this.state.currentScore.iceScore;return e>=701||e<=100}startBatchScoring(e,s){this.state.batchScoring={features:e,currentFeatureIndex:0,scoredBy:s},this.state.scoredBy=s,this.state.currentStep="batch-list",this.notify()}startScoringCurrentBatchFeature(){if(!this.state.batchScoring)return;const e=this.state.batchScoring.features[this.state.batchScoring.currentFeatureIndex];e&&(e.status="in-progress",this.state.featureName=e.name,this.state.scoredBy=this.state.batchScoring.scoredBy,this.state.responses={impact:[],confidence:[],effort:[]},this.state.currentScore=void 0,this.state.currentStep="impact-intro",this.notify())}startScoringBatchFeatureByIndex(e){if(!this.state.batchScoring||e<0||e>=this.state.batchScoring.features.length)return;const s=this.state.batchScoring.features[e];!s||s.status==="completed"||(this.state.batchScoring.currentFeatureIndex=e,s.status="in-progress",this.state.featureName=s.name,this.state.scoredBy=this.state.batchScoring.scoredBy,this.state.responses={impact:[],confidence:[],effort:[]},this.state.currentScore=void 0,this.state.currentStep="impact-intro",this.notify())}skipCurrentBatchFeature(){if(!this.state.batchScoring)return;const e=this.state.batchScoring.features[this.state.batchScoring.currentFeatureIndex];e&&(e.status="skipped",this.moveToNextPendingFeature())}moveToNextPendingFeature(){if(!this.state.batchScoring)return;const e=this.state.batchScoring.features,s=this.state.batchScoring.currentFeatureIndex;for(let i=s+1;i<e.length;i++)if(e[i].status==="pending"){this.state.batchScoring.currentFeatureIndex=i,this.notify();return}for(let i=0;i<s;i++)if(e[i].status==="pending"){this.state.batchScoring.currentFeatureIndex=i,this.notify();return}this.notify()}completeBatchFeature(){if(!this.state.batchScoring)return;const e=this.state.batchScoring.currentFeatureIndex,s=this.state.batchScoring.features[e];s&&(s.status="completed",this.state.currentStep="batch-list",this.moveToNextPendingFeature())}cancelBatchScoring(){this.state.batchScoring=void 0,this.state.currentStep="landing",this.notify()}isBatchScoring(){return!!this.state.batchScoring}showToast(e,s="info",i=4e3){const r=`toast-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,o={id:r,message:e,type:s,duration:i};this.state.toasts.push(o),this.notify(),i>0&&setTimeout(()=>{this.removeToast(r)},i)}removeToast(e){this.state.toasts=this.state.toasts.filter(s=>s.id!==e),this.notify()}showConfirm(e,s,i){return new Promise(r=>{const n={id:`confirm-${Date.now()}`,title:e,message:s,confirmText:i?.confirmText,cancelText:i?.cancelText,type:i?.type,onConfirm:()=>{this.state.confirmDialog=void 0,this.notify(),r(!0)},onCancel:()=>{this.state.confirmDialog=void 0,this.notify(),r(!1)}};this.state.confirmDialog=n,this.notify()})}handleConfirmResponse(e,s){this.state.confirmDialog&&this.state.confirmDialog.id===e&&(s&&this.state.confirmDialog.onConfirm?this.state.confirmDialog.onConfirm():!s&&this.state.confirmDialog.onCancel&&this.state.confirmDialog.onCancel())}async createSession(e,s,i,r="mean"){const o=await ie.createSession(e,s,i,r);return o&&(this.state.sessions.push(o),this.state.currentSession=o,this.notify(),this.showToast("Session created successfully","success")),o}async loadSessionWithDetails(e){const s=await ie.loadSessionWithDetails(e);if(s){const i=this.state.sessions.findIndex(r=>r.id===e);i>=0?this.state.sessions[i]=s:this.state.sessions.push(s),this.state.currentSession=s,this.notify()}return s}async addFeaturesToSession(e,s){const i=await ie.addFeaturesToSession(e,s);return i.length>0&&(this.showToast(`${i.length} features added to session`,"success"),await this.loadSessionWithDetails(e)),i}async saveSessionScore(e,s,i,r,o,n,p,h,f){const I=vt(p);return await ie.saveSessionScore(e,s,i,r,o,n,p,I,h,f)?(this.showToast("Score saved to session","success"),!0):(this.showToast("Failed to save score","error"),!1)}async hasUserScoredFeature(e,s,i){return await ie.hasUserScoredFeature(e,s,i)}async getUserScore(e,s,i){return await ie.getUserScore(e,s,i)}async getFeatureBreakdown(e,s){return await ie.getFeatureBreakdown(e,s)}async updateSessionStatus(e,s){const i=await ie.updateSessionStatus(e,s);if(i){const r=this.state.sessions.find(o=>o.id===e);r&&(r.status=s,this.notify()),this.showToast(`Session marked as ${s}`,"success")}return i}async deleteSession(e){if(!await this.showConfirm("Delete Session","Delete this scoring session? All scores and data will be permanently deleted.",{type:"danger",confirmText:"Delete",cancelText:"Cancel"}))return!1;const i=await ie.deleteSession(e);return i&&(this.state.sessions=this.state.sessions.filter(r=>r.id!==e),this.state.currentSession?.id===e&&(this.state.currentSession=void 0),this.notify(),this.showToast("Session deleted","success")),i}setCurrentSession(e){this.state.currentSession=e,this.notify()}async refreshSessions(){const e=await ie.loadSessions();this.state.sessions=e,this.notify()}}const l=new Ls;var Us=Object.defineProperty,qs=Object.getOwnPropertyDescriptor,lt=(t,e,s,i)=>{for(var r=i>1?void 0:i?qs(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(i?n(e,s,r):n(r))||r);return i&&r&&Us(e,s,r),r};const ue=t=>`/ICEberg/illustrations/${t}`,Hs={landing:{src:ue("landing-illustration.png"),alt:"Product manager at crossroads with multiple priorities"},impact:{src:ue("impact-illustration.png"),alt:"Target with arrows showing impact"},confidence:{src:ue("confidence-illustration.png"),alt:"Magnifying glass examining data and research"},effort:{src:ue("effort-illustration.png"),alt:"Calendar and clock representing time and effort"},tier1:{src:ue("tier1-illustration.png"),alt:"Warning barrier - Low priority zone"},tier2:{src:ue("tier2-illustration.png"),alt:"Later pile - Medium priority"},tier3:{src:ue("tier3-illustration.png"),alt:"Kanban board - Good candidate"},tier4:{src:ue("tier4-illustration.png"),alt:"Thumbs up - Strong contender"},tier5:{src:ue("tier5-illustration.png"),alt:"Rocket launching - Top priority"}};let Ae=class extends T{constructor(){super(...arguments),this.type="landing",this.width="400",this.height="300"}render(){const t=Hs[this.type];return d`
      <img
        src="${t.src}"
        alt="${t.alt}"
        width="${this.width}"
        height="${this.height}"
        loading="lazy"
      />
    `}};Ae.styles=R`
    :host {
      display: block;
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
    }
  `;lt([ce()],Ae.prototype,"type",2);lt([ce()],Ae.prototype,"width",2);lt([ce()],Ae.prototype,"height",2);Ae=lt([M("ice-illustration")],Ae);var Vs=Object.getOwnPropertyDescriptor,Ws=(t,e,s,i)=>{for(var r=i>1?void 0:i?Vs(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=n(r)||r);return r};let yt=class extends T{render(){return d`
            <div class="landing-container">
                <ice-illustration
                    type="landing"
                    width="400"
                    height="300"
                ></ice-illustration>

                <h1>Welcome to ICEberg</h1>

                <p class="subtitle">
                    Make better prioritization decisions with a structured
                    approach to scoring your product features.
                </p>

                <div class="methodology">
                    <h3>What is ICE Scoring?</h3>
                    <div class="methodology-grid">
                        <div class="methodology-item">
                            <span class="methodology-label">Impact:</span>
                            <span class="methodology-desc"
                                >How much will this feature move the
                                needle?</span
                            >
                        </div>
                        <div class="methodology-item">
                            <span class="methodology-label">Confidence:</span>
                            <span class="methodology-desc"
                                >How sure are we that this will work?</span
                            >
                        </div>
                        <div class="methodology-item">
                            <span class="methodology-label">Effort:</span>
                            <span class="methodology-desc"
                                >How much work will this require?</span
                            >
                        </div>
                    </div>
                </div>

                <button
                    class="cta-button"
                    @click=${this.handleStart}
                    aria-label="Start scoring a new feature"
                >
                    Start Scoring
                </button>

                <button
                    class="cta-button"
                    @click=${this.handleBulkUpload}
                    aria-label="Upload multiple features to score"
                    style="background: #10b981;"
                >
                    Bulk Upload Features
                </button>

                ${""}
            </div>
        `}handleStart(){l.setStep("feature-input")}handleBulkUpload(){l.setStep("batch-upload")}handleCreateSession(){l.setStep("session-create")}handleViewSessions(){l.setStep("session-list")}};yt.styles=R`
        :host {
            display: block;
        }

        .landing-container {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
        }

        h1 {
            font-size: 2.5rem;
            font-weight: 700;
            color: #1f2937;
            margin: 0;
        }

        .subtitle {
            font-size: 1.125rem;
            color: #6b7280;
            max-width: 500px;
            line-height: 1.6;
        }

        .methodology {
            background: #f3f4f6;
            border-radius: 0.5rem;
            padding: 1.5rem;
            margin: 1rem 0;
            text-align: left;
            max-width: 600px;
        }

        .methodology h3 {
            font-size: 1.125rem;
            font-weight: 600;
            color: #374151;
            margin: 0 0 1rem 0;
        }

        .methodology-grid {
            display: grid;
            gap: 0.75rem;
        }

        .methodology-item {
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
        }

        .methodology-label {
            font-weight: 600;
            color: #3b82f6;
            min-width: 100px;
        }

        .methodology-desc {
            color: #6b7280;
            flex: 1;
        }

        .cta-button {
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 6px;
            padding: 0.875rem 2.5rem;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        .cta-button:hover {
            background: #2563eb;
        }

        .cta-button:active {
            background: #1d4ed8;
        }

        .cta-button:focus {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
        }

        @media (max-width: 640px) {
            h1 {
                font-size: 1.875rem;
            }

            .subtitle {
                font-size: 1rem;
            }
        }
    `;yt=Ws([M("ice-landing-page")],yt);var Js=Object.defineProperty,Ks=Object.getOwnPropertyDescriptor,ut=(t,e,s,i)=>{for(var r=i>1?void 0:i?Ks(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(i?n(e,s,r):n(r))||r);return i&&r&&Js(e,s,r),r};let Fe=class extends T{constructor(){super(...arguments),this.featureName="",this.scoredBy="PM",this.errors={}}connectedCallback(){super.connectedCallback();const t=l.getState();this.featureName=t.featureName,this.scoredBy=t.scoredBy}render(){return d`
      <div class="input-container">
        <div>
          <h2>Let's Get Started</h2>
          <p class="subtitle">Tell us about the feature you want to score</p>
        </div>

        <div class="form-group">
          <label for="feature-name">
            Feature Name <span class="required">*</span>
          </label>
          <input
            id="feature-name"
            type="text"
            .value=${this.featureName}
            @input=${this.handleFeatureNameInput}
            placeholder="e.g., One-click checkout for returning customers"
            maxlength="100"
            class=${this.errors.featureName?"error":""}
            aria-required="true"
            aria-invalid=${this.errors.featureName?"true":"false"}
            aria-describedby=${this.errors.featureName?"feature-name-error":"feature-name-help"}
          />
          ${this.errors.featureName?d`<span id="feature-name-error" class="error-message">${this.errors.featureName}</span>`:d`<span id="feature-name-help" class="help-text">Maximum 100 characters</span>`}
        </div>

        <div class="form-group">
          <label for="scored-by">Scored By (Optional)</label>
          <input
            id="scored-by"
            type="text"
            .value=${this.scoredBy}
            @input=${this.handleScoredByInput}
            placeholder="PM"
            maxlength="50"
          />
          <span class="help-text">Who is scoring this feature?</span>
        </div>

        <div class="button-group">
          <button class="btn-secondary" @click=${this.handleBack}>
            Back
          </button>
          <button
            class="btn-primary"
            @click=${this.handleNext}
            ?disabled=${!this.isValid()}
          >
            Continue
          </button>
        </div>
      </div>
    `}handleFeatureNameInput(t){const e=t.target;this.featureName=e.value,this.validateFeatureName()}handleScoredByInput(t){const e=t.target;this.scoredBy=e.value||"PM"}validateFeatureName(){return this.featureName.trim()?this.featureName.trim().length<3?(this.errors={featureName:"Feature name must be at least 3 characters"},!1):(this.errors={},!0):(this.errors={featureName:"Feature name is required"},!1)}isValid(){return this.featureName.trim().length>=3&&this.featureName.trim().length<=100}handleBack(){l.setStep("landing")}handleNext(){this.validateFeatureName()&&this.isValid()&&(l.setFeatureInfo(this.featureName.trim(),this.scoredBy.trim()),l.setStep("impact-intro"))}};Fe.styles=R`
    :host {
      display: block;
    }

    .input-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 0.5rem 0;
      text-align: center;
    }

    .subtitle {
      text-align: center;
      color: #6b7280;
      margin-bottom: 2rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    label {
      font-weight: 600;
      color: #374151;
      font-size: 0.875rem;
    }

    .required {
      color: #ef4444;
    }

    input {
      padding: 0.75rem 1rem;
      border: 2px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    input.error {
      border-color: #ef4444;
    }

    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: -0.25rem;
    }

    .help-text {
      color: #6b7280;
      font-size: 0.875rem;
    }

    .button-group {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    button {
      flex: 1;
      padding: 0.875rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: white;
      color: #3b82f6;
      border: 2px solid #3b82f6;
    }

    .btn-secondary:hover {
      background: #eff6ff;
    }

    button:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
  `;ut([y()],Fe.prototype,"featureName",2);ut([y()],Fe.prototype,"scoredBy",2);ut([y()],Fe.prototype,"errors",2);Fe=ut([M("ice-feature-input")],Fe);var Ys=Object.defineProperty,Qs=Object.getOwnPropertyDescriptor,ts=(t,e,s,i)=>{for(var r=i>1?void 0:i?Qs(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(i?n(e,s,r):n(r))||r);return i&&r&&Ys(e,s,r),r};let tt=class extends T{constructor(){super(...arguments),this.section="impact"}render(){const t=this.getContent();return d`
      <div class="break-container">
        <ice-illustration type=${this.section} width="400" height="300"></ice-illustration>

        <div class="step-indicator">${t.step}</div>

        <h2>${t.title}</h2>

        <p class="description">${t.description}</p>

        <div class="button-group">
          <button class="btn-secondary" @click=${this.handleBack}>
            Back
          </button>
          <button class="btn-primary" @click=${this.handleContinue}>
            Continue
          </button>
        </div>
      </div>
    `}getContent(){switch(this.section){case"impact":return{step:"Step 1 of 3",title:"Let's assess the Impact",description:"Impact measures how significantly this feature will move the needle for your users and business. Consider user reach, metric improvement, and strategic alignment."};case"confidence":return{step:"Step 2 of 3",title:"Now let's evaluate Confidence",description:"Confidence reflects how certain we are that this feature will succeed. This includes research validation, past experience, technical proof, and resource availability."};case"effort":return{step:"Step 3 of 3",title:"Finally, let's estimate the Effort",description:"Effort represents the resources and time required to build this feature. Consider development time, team coordination, technical complexity, and dependencies."}}}handleBack(){let t;switch(this.section){case"impact":t="feature-input";break;case"confidence":t="impact-questions";break;case"effort":t="confidence-questions";break}l.setStep(t)}handleContinue(){let t;switch(this.section){case"impact":t="impact-questions";break;case"confidence":t="confidence-questions";break;case"effort":t="effort-questions";break}l.setStep(t)}};tt.styles=R`
    :host {
      display: block;
    }

    .break-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      text-align: center;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
    }

    .description {
      font-size: 1.125rem;
      color: #6b7280;
      max-width: 500px;
      line-height: 1.6;
    }

    .step-indicator {
      background: #eff6ff;
      color: #3b82f6;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .button-group {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
      width: 100%;
      max-width: 400px;
    }

    button {
      flex: 1;
      padding: 0.875rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .btn-secondary {
      background: white;
      color: #3b82f6;
      border: 2px solid #3b82f6;
    }

    .btn-secondary:hover {
      background: #eff6ff;
    }

    button:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
  `;ts([ce()],tt.prototype,"section",2);tt=ts([M("ice-illustration-break")],tt);const Gs={id:"impact",title:"Impact",description:"How significant will the impact of this feature be?",questions:[{id:"impact-reach",text:"What percentage of your user base will this feature affect?",options:[{label:"Less than 5% of users",value:1},{label:"5% - 20% of users",value:3},{label:"20% - 50% of users",value:5},{label:"50% - 80% of users",value:8},{label:"80%+ of users",value:10}]},{id:"impact-metric",text:"What is the expected impact on your primary metric?",helpText:"Consider revenue, retention, engagement, or conversion rate",options:[{label:"Less than 1%",value:1},{label:"1% - 5%",value:3},{label:"5% - 10%",value:5},{label:"10% - 25%",value:8},{label:"25%+",value:10}]},{id:"impact-segment",text:"Which user segment does this primarily serve?",options:[{label:"Edge cases",value:2},{label:"Secondary personas",value:4},{label:"Significant segment",value:6},{label:"Primary personas",value:8},{label:"All core users",value:10}]},{id:"impact-alignment",text:"What is the business priority alignment?",options:[{label:"Nice to have",value:2},{label:"Secondary objectives",value:4},{label:"Quarterly goals",value:6},{label:"Annual OKRs",value:8},{label:"Critical initiative",value:10}]}]},Zs={id:"confidence",title:"Confidence",description:"How confident are we that this feature will succeed?",questions:[{id:"confidence-research",text:"What level of user research supports this?",options:[{label:"No research",value:1,helpText:"Pure hypothesis or internal assumption with no user validation"},{label:"Anecdotal feedback",value:3,helpText:"1-2 individual comments or requests - not representative of broader needs"},{label:"Small survey (less than 10)",value:5,helpText:"Structured feedback from a handful of users or customers"},{label:"Substantial research (10-50)",value:7,helpText:"Validated pattern across multiple users through interviews, surveys, or data"},{label:"Extensive research (50+)",value:10,helpText:"Strong statistical evidence from large sample or repeated validation"}]},{id:"confidence-experience",text:"Have we built something similar before?",options:[{label:"Completely novel",value:2,helpText:"Never built anything like this - uncharted territory for the team"},{label:"Some related experience",value:4,helpText:"Built features in similar domains but not this specific functionality"},{label:"Similar features",value:7,helpText:"Have shipped comparable features with similar complexity"},{label:"Nearly identical",value:9,helpText:"Built almost the exact same thing before, minor variations"},{label:"Exact replica",value:10,helpText:"Literally done this exact implementation previously"}]},{id:"confidence-technical",text:"Is the technical solution proven?",options:[{label:"Theoretical/R&D",value:2,helpText:"Unproven approach - needs research and experimentation"},{label:"Prototyped",value:4,helpText:"Built a rough proof-of-concept but not battle-tested"},{label:"POC working",value:6,helpText:"Working prototype demonstrating core functionality"},{label:"Competitor success",value:8,helpText:"Others have successfully implemented this approach"},{label:"Industry standard",value:10,helpText:"Well-established, proven solution used widely"}]},{id:"confidence-resources",text:"Do we have all required resources and expertise?",options:[{label:"Need hiring",value:2,helpText:"Missing critical skills - must recruit before starting"},{label:"Significant upskilling required",value:4,helpText:"Team needs substantial training or learning to execute"},{label:"Minor gaps",value:6,helpText:"Mostly ready, some learning or external help needed"},{label:"Most expertise available",value:8,helpText:"Team has the necessary skills, minor knowledge gaps"},{label:"All secured",value:10,helpText:"Everything we need is ready and available now"}]}]},Xs={id:"effort",title:"Effort",description:"How much effort will be required to build this feature?",questions:[{id:"effort-time",text:"How many sprints will this require?",helpText:"Assume 2-week sprints",options:[{label:"6+ sprints",value:1},{label:"4-6 sprints",value:3},{label:"2-3 sprints",value:6},{label:"1 sprint",value:9},{label:"Less than 1 sprint",value:10}]},{id:"effort-coordination",text:"How many teams need to be involved?",options:[{label:"4+ teams",value:1},{label:"3 teams",value:3},{label:"2 teams",value:6},{label:"1 team, multiple squads",value:8},{label:"1 squad",value:10}]},{id:"effort-complexity",text:"What is the technical complexity?",options:[{label:"Distributed systems",value:1,helpText:"Multi-region, cross-service coordination, complex infrastructure"},{label:"Multiple services",value:3,helpText:"Changes across 3+ services or systems"},{label:"Backend + Frontend",value:5,helpText:"Full-stack changes with API and UI work"},{label:"Mostly one layer",value:7,helpText:"Primarily frontend OR backend changes"},{label:"Configuration only",value:10,helpText:"No code changes - just settings or feature flags"}]},{id:"effort-dependencies",text:"How many external dependencies exist?",options:[{label:"4+ blocking dependencies",value:1},{label:"3 dependencies",value:3},{label:"1-2 dependencies",value:6},{label:"Soft dependencies only",value:8},{label:"None",value:10}]}]};var er=Object.defineProperty,tr=Object.getOwnPropertyDescriptor,Ct=(t,e,s,i)=>{for(var r=i>1?void 0:i?tr(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(i?n(e,s,r):n(r))||r);return i&&r&&er(e,s,r),r};let Ue=class extends T{constructor(){super(...arguments),this.section="impact",this.responses=new Map}connectedCallback(){super.connectedCallback(),this.loadResponses()}loadResponses(){this.getSectionData().questions.forEach(e=>{const s=l.getResponse(this.section,e.id);s!==void 0&&this.responses.set(e.id,s)})}getSectionData(){switch(this.section){case"impact":return Gs;case"confidence":return Zs;case"effort":return Xs}}getStepIndicator(){switch(this.section){case"impact":return"Impact (1/3)";case"confidence":return"Confidence (2/3)";case"effort":return"Effort (3/3)"}}render(){const t=this.getSectionData(),e=t.questions.every(s=>this.responses.has(s.id));return d`
      <div class="section-container">
        <div class="section-header">
          <div class="step-indicator">${this.getStepIndicator()}</div>
          <h2>${t.title} Questions</h2>
          <p class="description">${t.description}</p>
        </div>

        <div class="questions-list">
          ${t.questions.map(s=>this.renderQuestion(s))}
        </div>

        ${e?"":d`<div class="error-message">Please answer all questions to continue</div>`}

        <div class="button-group">
          <button class="btn-secondary" @click=${this.handleBack}>Back</button>
          <button class="btn-primary" @click=${this.handleNext} ?disabled=${!e}>
            Continue
          </button>
        </div>
      </div>
    `}renderQuestion(t){const e=this.responses.get(t.id);return d`
      <div class="question-card">
        <div class="question-text">${t.text}</div>
        ${t.helpText?d`<div class="help-text">${t.helpText}</div>`:""}

        <div class="options-list" role="radiogroup" aria-label="${t.text}">
          ${t.options.map(s=>d`
              <div class="option-item" title="${s.helpText||""}">
                <label class="option-label">
                  <input
                    type="radio"
                    name="${t.id}"
                    value="${s.value}"
                    .checked=${e===s.value}
                    @change=${()=>this.handleOptionSelect(t.id,s.value)}
                    aria-label="${s.label} - Score: ${s.value}"
                  />
                  <span class="option-content">
                    ${s.label}
                    ${s.helpText?d`<span class="info-icon" title="${s.helpText}">ⓘ</span>`:""}
                  </span>
                  <span class="option-value">${s.value}</span>
                </label>
              </div>
            `)}
        </div>
      </div>
    `}handleOptionSelect(t,e){this.responses.set(t,e),l.setResponse(this.section,t,e),this.requestUpdate()}handleBack(){let t;switch(this.section){case"impact":t="impact-intro";break;case"confidence":t="confidence-intro";break;case"effort":t="effort-intro";break}l.setStep(t)}handleNext(){if(!this.getSectionData().questions.every(i=>this.responses.has(i.id)))return;let s;switch(this.section){case"impact":s="confidence-intro";break;case"confidence":s="effort-intro";break;case"effort":l.calculateScore(),s=l.needsJustification()?"justification":"results";break}l.setStep(s)}};Ue.styles=R`
    :host {
      display: block;
    }

    .section-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .section-header {
      text-align: center;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 0.5rem 0;
    }

    .step-indicator {
      display: inline-block;
      background: #eff6ff;
      color: #3b82f6;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      font-weight: 600;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .description {
      color: #6b7280;
      margin-bottom: 1rem;
    }

    .questions-list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .question-card {
      background: #f9fafb;
      border-radius: 0.75rem;
      padding: 1.5rem;
    }

    .question-text {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }

    .help-text {
      color: #6b7280;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .options-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .option-item {
      position: relative;
    }

    .option-label {
      display: flex;
      align-items: center;
      padding: 1rem;
      background: white;
      border: 2px solid #d1d5db;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .option-label:hover {
      background: #f3f4f6;
      border-color: #9ca3af;
    }

    input[type='radio'] {
      margin-right: 0.75rem;
      width: 1.25rem;
      height: 1.25rem;
      cursor: pointer;
    }

    input[type='radio']:checked + .option-content {
      font-weight: 600;
    }

    .option-label:has(input:checked) {
      background: #eff6ff;
      border-color: #3b82f6;
    }

    .option-content {
      flex: 1;
      color: #374151;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .info-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
      background: #e5e7eb;
      border-radius: 50%;
      font-size: 0.75rem;
      color: #6b7280;
      cursor: help;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .info-icon:hover {
      background: #3b82f6;
      color: white;
      transform: scale(1.1);
    }

    .option-value {
      color: #6b7280;
      font-size: 0.875rem;
      font-weight: 600;
      background: #f3f4f6;
      padding: 0.25rem 0.75rem;
      border-radius: 0.375rem;
    }

    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      text-align: center;
      padding: 1rem;
      background: #fef2f2;
      border-radius: 0.5rem;
      border: 1px solid #fecaca;
    }

    .button-group {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    button {
      flex: 1;
      padding: 0.875rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: white;
      color: #3b82f6;
      border: 2px solid #3b82f6;
    }

    .btn-secondary:hover {
      background: #eff6ff;
    }

    button:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
  `;Ct([ce()],Ue.prototype,"section",2);Ct([y()],Ue.prototype,"responses",2);Ue=Ct([M("ice-question-section")],Ue);var sr=Object.defineProperty,rr=Object.getOwnPropertyDescriptor,Et=(t,e,s,i)=>{for(var r=i>1?void 0:i?rr(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(i?n(e,s,r):n(r))||r);return i&&r&&sr(e,s,r),r};let qe=class extends T{constructor(){super(...arguments),this.justification="",this.error=""}connectedCallback(){super.connectedCallback();const t=l.getState();t.currentScore?.justification&&(this.justification=t.currentScore.justification)}render(){const e=l.getState().currentScore?.iceScore||0,s=e>=7,i=e<=2,r=s?"Explain why this high-value item should be prioritized":"Explain why this item is still being considered",o=this.justification.length,n=o>=20&&o<=500;return d`
      <div class="justification-container">
        <div style="text-align: center;">
          <h2>Justification Required</h2>
          <div class="score-badge ${s?"high":i?"low":""}">
            ICE Score: ${e.toFixed(2)}
          </div>
          <p class="prompt">${r}</p>
        </div>

        <div class="form-group">
          <label for="justification">Your Justification</label>
          <textarea
            id="justification"
            .value=${this.justification}
            @input=${this.handleInput}
            placeholder="Provide a detailed explanation..."
            maxlength="500"
            class=${this.error?"error":""}
            aria-required="true"
            aria-invalid=${this.error?"true":"false"}
            aria-describedby="char-count justification-error"
          ></textarea>

          <div id="char-count" class="char-count ${o<20||o>500?"error":""}">
            ${o} / 500 characters (minimum 20)
          </div>

          ${this.error?d`<span id="justification-error" class="error-message">${this.error}</span>`:""}
        </div>

        <div class="button-group">
          <button class="btn-secondary" @click=${this.handleBack}>Back</button>
          <button class="btn-primary" @click=${this.handleNext} ?disabled=${!n}>
            Continue
          </button>
        </div>
      </div>
    `}handleInput(t){const e=t.target;this.justification=e.value,this.validate()}validate(){const t=this.justification.trim().length;return t<20?(this.error="Please provide at least 20 characters of justification",!1):t>500?(this.error="Justification must not exceed 500 characters",!1):(this.error="",!0)}handleBack(){l.setStep("effort-questions")}handleNext(){this.validate()&&(l.setJustification(this.justification.trim()),l.setStep("results"))}};qe.styles=R`
    :host {
      display: block;
    }

    .justification-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
      text-align: center;
    }

    .prompt {
      text-align: center;
      color: #6b7280;
      font-size: 1.125rem;
      line-height: 1.6;
    }

    .score-badge {
      display: inline-block;
      background: #eff6ff;
      color: #3b82f6;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      font-weight: 700;
      font-size: 1.5rem;
      margin: 1rem 0;
    }

    .score-badge.high {
      background: #d1fae5;
      color: #059669;
    }

    .score-badge.low {
      background: #fee2e2;
      color: #dc2626;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    label {
      font-weight: 600;
      color: #374151;
    }

    textarea {
      padding: 1rem;
      border: 2px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-family: inherit;
      resize: vertical;
      min-height: 150px;
      transition: border-color 0.2s;
    }

    textarea:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    textarea.error {
      border-color: #ef4444;
    }

    .char-count {
      text-align: right;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .char-count.error {
      color: #ef4444;
    }

    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
    }

    .button-group {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    button {
      flex: 1;
      padding: 0.875rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: white;
      color: #3b82f6;
      border: 2px solid #3b82f6;
    }

    .btn-secondary:hover {
      background: #eff6ff;
    }

    button:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
  `;Et([y()],qe.prototype,"justification",2);Et([y()],qe.prototype,"error",2);qe=Et([M("ice-justification-input")],qe);var ir=Object.defineProperty,or=Object.getOwnPropertyDescriptor,ss=(t,e,s,i)=>{for(var r=i>1?void 0:i?or(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(i?n(e,s,r):n(r))||r);return i&&r&&ir(e,s,r),r};let st=class extends T{connectedCallback(){super.connectedCallback();const t=l.getState();this.score=t.currentScore}render(){if(!this.score)return d`<div>No score available</div>`;const t=this.score.tier.color;return d`
      <div class="results-container">
        <h2>Your ICE Score</h2>
        <p class="feature-name">${this.score.featureName}</p>

        <div class="ice-score-display">
          <div class="ice-score-label">Final ICE Score</div>
          <div class="ice-score-value">${this.score.iceScore.toFixed(2)}</div>
        </div>

        <div class="breakdown">
          <div class="breakdown-item">
            <div class="breakdown-label">Impact</div>
            <div class="breakdown-value">${this.score.impact.toFixed(2)}</div>
          </div>
          <div class="breakdown-item">
            <div class="breakdown-label">Confidence</div>
            <div class="breakdown-value">${this.score.confidence.toFixed(2)}</div>
          </div>
          <div class="breakdown-item">
            <div class="breakdown-label">Effort</div>
            <div class="breakdown-value">${this.score.effort.toFixed(2)}</div>
          </div>
        </div>

        <ice-illustration
          type="${this.score.tier.illustration}"
          width="300"
          height="225"
        ></ice-illustration>

        <div class="tier-card" style="border-color: ${t}">
          <div class="tier-name" style="color: ${t}">${this.score.tier.name}</div>
          <div class="tier-priority" style="background: ${t}; color: white;">
            ${this.score.tier.priority} Priority
          </div>
          <div class="tier-description">${this.score.tier.description}</div>
          <div class="tier-example" style="border-color: ${t}">
            <div class="tier-example-label">Example:</div>
            <div>${this.score.tier.example}</div>
          </div>
        </div>

        ${this.score.justification?d`
              <div class="justification-display">
                <div class="justification-label">Justification</div>
                <div class="justification-text">${this.score.justification}</div>
              </div>
            `:""}

        <div class="button-group">
          <button class="btn-primary" @click=${this.handleSave}>
            ${l.isBatchScoring()?"Save & Continue to Next":"Add to Export List"}
          </button>
          ${l.isBatchScoring()?d`
                <button class="btn-tertiary" @click=${this.handleBackToBatch}>
                  Back to Batch List
                </button>
              `:d`
                <button class="btn-secondary" @click=${this.handleScoreAnother}>
                  Score Another Feature
                </button>
                <button class="btn-tertiary" @click=${this.handleViewExport}>
                  View Export List (${l.getState().savedScores.length})
                </button>
              `}
        </div>
      </div>
    `}async handleSave(){const t=l.getState(),e=t.currentSession,s=t.currentSessionFeature;e&&s&&this.score?await l.saveSessionScore(e.id,s.id,this.score.scoredBy,this.score.impact,this.score.confidence,this.score.effort,this.score.iceScore,this.score.justification,this.score.responses)&&(await l.loadSessionWithDetails(e.id),l.setStep("session-dashboard")):l.isBatchScoring()?(l.saveCurrentScore(),l.completeBatchFeature()):(l.saveCurrentScore(),l.showToast("Score saved to export list!","success"))}handleScoreAnother(){l.resetForNewScore()}handleViewExport(){l.setStep("export")}handleBackToBatch(){l.setStep("batch-list")}};st.styles=R`
    :host {
      display: block;
    }

    .results-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      text-align: center;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
    }

    .feature-name {
      font-size: 1.25rem;
      color: #6b7280;
      font-weight: 500;
    }

    .ice-score-display {
      background: #3b82f6;
      color: white;
      padding: 2rem;
      border-radius: 8px;
      width: 100%;
      max-width: 400px;
    }

    .ice-score-label {
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .ice-score-value {
      font-size: 3.5rem;
      font-weight: 700;
      line-height: 1;
    }

    .breakdown {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      width: 100%;
      max-width: 500px;
      margin-top: 1rem;
    }

    .breakdown-item {
      background: white;
      padding: 1rem;
      border-radius: 0.5rem;
      border: 2px solid #e5e7eb;
    }

    .breakdown-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      font-weight: 600;
      color: #6b7280;
      margin-bottom: 0.25rem;
    }

    .breakdown-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1f2937;
    }

    .tier-card {
      width: 100%;
      max-width: 500px;
      padding: 2rem;
      border-radius: 1rem;
      border: 3px solid;
      background: white;
    }

    .tier-name {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .tier-priority {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .tier-description {
      color: #6b7280;
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .tier-example {
      background: #f9fafb;
      padding: 1rem;
      border-radius: 0.5rem;
      border-left: 4px solid;
      font-size: 0.875rem;
    }

    .tier-example-label {
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .justification-display {
      width: 100%;
      max-width: 500px;
      background: #f9fafb;
      padding: 1.5rem;
      border-radius: 0.75rem;
      border: 2px solid #e5e7eb;
      text-align: left;
    }

    .justification-label {
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .justification-text {
      color: #6b7280;
      line-height: 1.6;
    }

    .button-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      max-width: 400px;
      margin-top: 1rem;
    }

    button {
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s, border-color 0.2s;
      border: none;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
    }

    .btn-primary:hover {
      background: #2563eb;
    }

    .btn-secondary {
      background: white;
      color: #3b82f6;
      border: 2px solid #3b82f6;
    }

    .btn-secondary:hover {
      background: #eff6ff;
      border-color: #2563eb;
    }

    .btn-tertiary {
      background: white;
      color: #6b7280;
      border: 1px solid #d1d5db;
    }

    .btn-tertiary:hover {
      background: #f9fafb;
      border-color: #9ca3af;
    }

    button:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    @media (max-width: 640px) {
      .ice-score-value {
        font-size: 3rem;
      }

      .breakdown {
        grid-template-columns: 1fr;
      }
    }
  `;ss([y()],st.prototype,"score",2);st=ss([M("ice-results-screen")],st);var Ze={exports:{}};var nr=Ze.exports,Yt;function ar(){return Yt||(Yt=1,(function(t,e){((s,i)=>{t.exports=i()})(nr,function s(){var i=typeof self<"u"?self:typeof window<"u"?window:i!==void 0?i:{},r,o=!i.document&&!!i.postMessage,n=i.IS_PAPA_WORKER||!1,p={},h=0,f={};function I(a){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(c){var u=mt(c);u.chunkSize=parseInt(u.chunkSize),c.step||c.chunk||(u.chunkSize=null),this._handle=new Pt(u),(this._handle.streamer=this)._config=u}.call(this,a),this.parseChunk=function(c,u){var g=parseInt(this._config.skipFirstNLines)||0;if(this.isFirstChunk&&0<g){let w=this._config.newline;w||(m=this._config.quoteChar||'"',w=this._handle.guessLineEndings(c,m)),c=[...c.split(w).slice(g)].join(w)}this.isFirstChunk&&O(this._config.beforeFirstChunk)&&(m=this._config.beforeFirstChunk(c))!==void 0&&(c=m),this.isFirstChunk=!1,this._halted=!1;var g=this._partialLine+c,m=(this._partialLine="",this._handle.parse(g,this._baseIndex,!this._finished));if(!this._handle.paused()&&!this._handle.aborted()){if(c=m.meta.cursor,g=(this._finished||(this._partialLine=g.substring(c-this._baseIndex),this._baseIndex=c),m&&m.data&&(this._rowCount+=m.data.length),this._finished||this._config.preview&&this._rowCount>=this._config.preview),n)i.postMessage({results:m,workerId:f.WORKER_ID,finished:g});else if(O(this._config.chunk)&&!u){if(this._config.chunk(m,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);this._completeResults=m=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(m.data),this._completeResults.errors=this._completeResults.errors.concat(m.errors),this._completeResults.meta=m.meta),this._completed||!g||!O(this._config.complete)||m&&m.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),g||m&&m.meta.paused||this._nextChunk(),m}this._halted=!0},this._sendError=function(c){O(this._config.error)?this._config.error(c):n&&this._config.error&&i.postMessage({workerId:f.WORKER_ID,error:c,finished:!1})}}function A(a){var c;(a=a||{}).chunkSize||(a.chunkSize=f.RemoteChunkSize),I.call(this,a),this._nextChunk=o?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(u){this._input=u,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(c=new XMLHttpRequest,this._config.withCredentials&&(c.withCredentials=this._config.withCredentials),o||(c.onload=pe(this._chunkLoaded,this),c.onerror=pe(this._chunkError,this)),c.open(this._config.downloadRequestBody?"POST":"GET",this._input,!o),this._config.downloadRequestHeaders){var u,g=this._config.downloadRequestHeaders;for(u in g)c.setRequestHeader(u,g[u])}var m;this._config.chunkSize&&(m=this._start+this._config.chunkSize-1,c.setRequestHeader("Range","bytes="+this._start+"-"+m));try{c.send(this._config.downloadRequestBody)}catch(w){this._chunkError(w.message)}o&&c.status===0&&this._chunkError()}},this._chunkLoaded=function(){c.readyState===4&&(c.status<200||400<=c.status?this._chunkError():(this._start+=this._config.chunkSize||c.responseText.length,this._finished=!this._config.chunkSize||this._start>=(u=>(u=u.getResponseHeader("Content-Range"))!==null?parseInt(u.substring(u.lastIndexOf("/")+1)):-1)(c),this.parseChunk(c.responseText)))},this._chunkError=function(u){u=c.statusText||u,this._sendError(new Error(u))}}function Z(a){(a=a||{}).chunkSize||(a.chunkSize=f.LocalChunkSize),I.call(this,a);var c,u,g=typeof FileReader<"u";this.stream=function(m){this._input=m,u=m.slice||m.webkitSlice||m.mozSlice,g?((c=new FileReader).onload=pe(this._chunkLoaded,this),c.onerror=pe(this._chunkError,this)):c=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var m=this._input,w=(this._config.chunkSize&&(w=Math.min(this._start+this._config.chunkSize,this._input.size),m=u.call(m,this._start,w)),c.readAsText(m,this._config.encoding));g||this._chunkLoaded({target:{result:w}})},this._chunkLoaded=function(m){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(m.target.result)},this._chunkError=function(){this._sendError(c.error)}}function X(a){var c;I.call(this,a=a||{}),this.stream=function(u){return c=u,this._nextChunk()},this._nextChunk=function(){var u,g;if(!this._finished)return u=this._config.chunkSize,c=u?(g=c.substring(0,u),c.substring(u)):(g=c,""),this._finished=!c,this.parseChunk(g)}}function de(a){I.call(this,a=a||{});var c=[],u=!0,g=!1;this.pause=function(){I.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){I.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(m){this._input=m,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){g&&c.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),c.length?this.parseChunk(c.shift()):u=!0},this._streamData=pe(function(m){try{c.push(typeof m=="string"?m:m.toString(this._config.encoding)),u&&(u=!1,this._checkIsFinished(),this.parseChunk(c.shift()))}catch(w){this._streamError(w)}},this),this._streamError=pe(function(m){this._streamCleanUp(),this._sendError(m)},this),this._streamEnd=pe(function(){this._streamCleanUp(),g=!0,this._streamData("")},this),this._streamCleanUp=pe(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function Pt(a){var c,u,g,m,w=Math.pow(2,53),U=-w,te=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,se=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,_=this,B=0,v=0,Y=!1,x=!1,k=[],b={data:[],errors:[],meta:{}};function q(C){return a.skipEmptyLines==="greedy"?C.join("").trim()==="":C.length===1&&C[0].length===0}function L(){if(b&&g&&(re("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+f.DefaultDelimiter+"'"),g=!1),a.skipEmptyLines&&(b.data=b.data.filter(function(D){return!q(D)})),K()){let D=function(V,z){O(a.transformHeader)&&(V=a.transformHeader(V,z)),k.push(V)};var S=D;if(b)if(Array.isArray(b.data[0])){for(var C=0;K()&&C<b.data.length;C++)b.data[C].forEach(D);b.data.splice(0,1)}else b.data.forEach(D)}function E(D,V){for(var z=a.header?{}:[],P=0;P<D.length;P++){var $=P,Q=D[P],Q=((F,N)=>(H=>(a.dynamicTypingFunction&&a.dynamicTyping[H]===void 0&&(a.dynamicTyping[H]=a.dynamicTypingFunction(H)),(a.dynamicTyping[H]||a.dynamicTyping)===!0))(F)?N==="true"||N==="TRUE"||N!=="false"&&N!=="FALSE"&&((H=>{if(te.test(H)&&(H=parseFloat(H),U<H&&H<w))return 1})(N)?parseFloat(N):se.test(N)?new Date(N):N===""?null:N):N)($=a.header?P>=k.length?"__parsed_extra":k[P]:$,Q=a.transform?a.transform(Q,$):Q);$==="__parsed_extra"?(z[$]=z[$]||[],z[$].push(Q)):z[$]=Q}return a.header&&(P>k.length?re("FieldMismatch","TooManyFields","Too many fields: expected "+k.length+" fields but parsed "+P,v+V):P<k.length&&re("FieldMismatch","TooFewFields","Too few fields: expected "+k.length+" fields but parsed "+P,v+V)),z}var j;b&&(a.header||a.dynamicTyping||a.transform)&&(j=1,!b.data.length||Array.isArray(b.data[0])?(b.data=b.data.map(E),j=b.data.length):b.data=E(b.data,0),a.header&&b.meta&&(b.meta.fields=k),v+=j)}function K(){return a.header&&k.length===0}function re(C,E,j,S){C={type:C,code:E,message:j},S!==void 0&&(C.row=S),b.errors.push(C)}O(a.step)&&(m=a.step,a.step=function(C){b=C,K()?L():(L(),b.data.length!==0&&(B+=C.data.length,a.preview&&B>a.preview?u.abort():(b.data=b.data[0],m(b,_))))}),this.parse=function(C,E,j){var S=a.quoteChar||'"',S=(a.newline||(a.newline=this.guessLineEndings(C,S)),g=!1,a.delimiter?O(a.delimiter)&&(a.delimiter=a.delimiter(C),b.meta.delimiter=a.delimiter):((S=((D,V,z,P,$)=>{var Q,F,N,H;$=$||[",","	","|",";",f.RECORD_SEP,f.UNIT_SEP];for(var $e=0;$e<$.length;$e++){for(var oe,De=$[$e],G=0,ne=0,W=0,ee=(N=void 0,new ft({comments:P,delimiter:De,newline:V,preview:10}).parse(D)),le=0;le<ee.data.length;le++)z&&q(ee.data[le])?W++:(oe=ee.data[le].length,ne+=oe,N===void 0?N=oe:0<oe&&(G+=Math.abs(oe-N),N=oe));0<ee.data.length&&(ne/=ee.data.length-W),(F===void 0||G<=F)&&(H===void 0||H<ne)&&1.99<ne&&(F=G,Q=De,H=ne)}return{successful:!!(a.delimiter=Q),bestDelimiter:Q}})(C,a.newline,a.skipEmptyLines,a.comments,a.delimitersToGuess)).successful?a.delimiter=S.bestDelimiter:(g=!0,a.delimiter=f.DefaultDelimiter),b.meta.delimiter=a.delimiter),mt(a));return a.preview&&a.header&&S.preview++,c=C,u=new ft(S),b=u.parse(c,E,j),L(),Y?{meta:{paused:!0}}:b||{meta:{paused:!1}}},this.paused=function(){return Y},this.pause=function(){Y=!0,u.abort(),c=O(a.chunk)?"":c.substring(u.getCharIndex())},this.resume=function(){_.streamer._halted?(Y=!1,_.streamer.parseChunk(c,!0)):setTimeout(_.resume,3)},this.aborted=function(){return x},this.abort=function(){x=!0,u.abort(),b.meta.aborted=!0,O(a.complete)&&a.complete(b),c=""},this.guessLineEndings=function(D,S){D=D.substring(0,1048576);var S=new RegExp(Te(S)+"([^]*?)"+Te(S),"gm"),j=(D=D.replace(S,"")).split("\r"),S=D.split(`
`),D=1<S.length&&S[0].length<j[0].length;if(j.length===1||D)return`
`;for(var V=0,z=0;z<j.length;z++)j[z][0]===`
`&&V++;return V>=j.length/2?`\r
`:"\r"}}function Te(a){return a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function ft(a){var c=(a=a||{}).delimiter,u=a.newline,g=a.comments,m=a.step,w=a.preview,U=a.fastMode,te=null,se=!1,_=a.quoteChar==null?'"':a.quoteChar,B=_;if(a.escapeChar!==void 0&&(B=a.escapeChar),(typeof c!="string"||-1<f.BAD_DELIMITERS.indexOf(c))&&(c=","),g===c)throw new Error("Comment character same as delimiter");g===!0?g="#":(typeof g!="string"||-1<f.BAD_DELIMITERS.indexOf(g))&&(g=!1),u!==`
`&&u!=="\r"&&u!==`\r
`&&(u=`
`);var v=0,Y=!1;this.parse=function(x,k,b){if(typeof x!="string")throw new Error("Input must be a string");var q=x.length,L=c.length,K=u.length,re=g.length,C=O(m),E=[],j=[],S=[],D=v=0;if(!x)return G();if(U||U!==!1&&x.indexOf(_)===-1){for(var V=x.split(u),z=0;z<V.length;z++){if(S=V[z],v+=S.length,z!==V.length-1)v+=u.length;else if(b)return G();if(!g||S.substring(0,re)!==g){if(C){if(E=[],H(S.split(c)),ne(),Y)return G()}else H(S.split(c));if(w&&w<=z)return E=E.slice(0,w),G(!0)}}return G()}for(var P=x.indexOf(c,v),$=x.indexOf(u,v),Q=new RegExp(Te(B)+Te(_),"g"),F=x.indexOf(_,v);;)if(x[v]===_)for(F=v,v++;;){if((F=x.indexOf(_,F+1))===-1)return b||j.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:E.length,index:v}),oe();if(F===q-1)return oe(x.substring(v,F).replace(Q,_));if(_===B&&x[F+1]===B)F++;else if(_===B||F===0||x[F-1]!==B){P!==-1&&P<F+1&&(P=x.indexOf(c,F+1));var N=$e(($=$!==-1&&$<F+1?x.indexOf(u,F+1):$)===-1?P:Math.min(P,$));if(x.substr(F+1+N,L)===c){S.push(x.substring(v,F).replace(Q,_)),x[v=F+1+N+L]!==_&&(F=x.indexOf(_,v)),P=x.indexOf(c,v),$=x.indexOf(u,v);break}if(N=$e($),x.substring(F+1+N,F+1+N+K)===u){if(S.push(x.substring(v,F).replace(Q,_)),De(F+1+N+K),P=x.indexOf(c,v),F=x.indexOf(_,v),C&&(ne(),Y))return G();if(w&&E.length>=w)return G(!0);break}j.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:E.length,index:v}),F++}}else if(g&&S.length===0&&x.substring(v,v+re)===g){if($===-1)return G();v=$+K,$=x.indexOf(u,v),P=x.indexOf(c,v)}else if(P!==-1&&(P<$||$===-1))S.push(x.substring(v,P)),v=P+L,P=x.indexOf(c,v);else{if($===-1)break;if(S.push(x.substring(v,$)),De($+K),C&&(ne(),Y))return G();if(w&&E.length>=w)return G(!0)}return oe();function H(W){E.push(W),D=v}function $e(W){var ee=0;return ee=W!==-1&&(W=x.substring(F+1,W))&&W.trim()===""?W.length:ee}function oe(W){return b||(W===void 0&&(W=x.substring(v)),S.push(W),v=q,H(S),C&&ne()),G()}function De(W){v=W,H(S),S=[],$=x.indexOf(u,v)}function G(W){if(a.header&&!k&&E.length&&!se){var ee=E[0],le=Object.create(null),gt=new Set(ee);let Dt=!1;for(let _e=0;_e<ee.length;_e++){let ae=ee[_e];if(le[ae=O(a.transformHeader)?a.transformHeader(ae,_e):ae]){let ze,zt=le[ae];for(;ze=ae+"_"+zt,zt++,gt.has(ze););gt.add(ze),ee[_e]=ze,le[ae]++,Dt=!0,(te=te===null?{}:te)[ze]=ae}else le[ae]=1,ee[_e]=ae;gt.add(ae)}Dt&&console.warn("Duplicate headers found and renamed."),se=!0}return{data:E,errors:j,meta:{delimiter:c,linebreak:u,aborted:Y,truncated:!!W,cursor:D+(k||0),renamedHeaders:te}}}function ne(){m(G()),E=[],j=[]}},this.abort=function(){Y=!0},this.getCharIndex=function(){return v}}function ds(a){var c=a.data,u=p[c.workerId],g=!1;if(c.error)u.userError(c.error,c.file);else if(c.results&&c.results.data){var m={abort:function(){g=!0,Ot(c.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:Tt,resume:Tt};if(O(u.userStep)){for(var w=0;w<c.results.data.length&&(u.userStep({data:c.results.data[w],errors:c.results.errors,meta:c.results.meta},m),!g);w++);delete c.results}else O(u.userChunk)&&(u.userChunk(c.results,m,c.file),delete c.results)}c.finished&&!g&&Ot(c.workerId,c.results)}function Ot(a,c){var u=p[a];O(u.userComplete)&&u.userComplete(c),u.terminate(),delete p[a]}function Tt(){throw new Error("Not implemented.")}function mt(a){if(typeof a!="object"||a===null)return a;var c,u=Array.isArray(a)?[]:{};for(c in a)u[c]=mt(a[c]);return u}function pe(a,c){return function(){a.apply(c,arguments)}}function O(a){return typeof a=="function"}return f.parse=function(a,c){var u=(c=c||{}).dynamicTyping||!1;if(O(u)&&(c.dynamicTypingFunction=u,u={}),c.dynamicTyping=u,c.transform=!!O(c.transform)&&c.transform,!c.worker||!f.WORKERS_SUPPORTED)return u=null,f.NODE_STREAM_INPUT,typeof a=="string"?(a=(g=>g.charCodeAt(0)!==65279?g:g.slice(1))(a),u=new(c.download?A:X)(c)):a.readable===!0&&O(a.read)&&O(a.on)?u=new de(c):(i.File&&a instanceof File||a instanceof Object)&&(u=new Z(c)),u.stream(a);(u=(()=>{var g;return!!f.WORKERS_SUPPORTED&&(g=(()=>{var m=i.URL||i.webkitURL||null,w=s.toString();return f.BLOB_URL||(f.BLOB_URL=m.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",w,")();"],{type:"text/javascript"})))})(),(g=new i.Worker(g)).onmessage=ds,g.id=h++,p[g.id]=g)})()).userStep=c.step,u.userChunk=c.chunk,u.userComplete=c.complete,u.userError=c.error,c.step=O(c.step),c.chunk=O(c.chunk),c.complete=O(c.complete),c.error=O(c.error),delete c.worker,u.postMessage({input:a,config:c,workerId:u.id})},f.unparse=function(a,c){var u=!1,g=!0,m=",",w=`\r
`,U='"',te=U+U,se=!1,_=null,B=!1,v=((()=>{if(typeof c=="object"){if(typeof c.delimiter!="string"||f.BAD_DELIMITERS.filter(function(k){return c.delimiter.indexOf(k)!==-1}).length||(m=c.delimiter),typeof c.quotes!="boolean"&&typeof c.quotes!="function"&&!Array.isArray(c.quotes)||(u=c.quotes),typeof c.skipEmptyLines!="boolean"&&typeof c.skipEmptyLines!="string"||(se=c.skipEmptyLines),typeof c.newline=="string"&&(w=c.newline),typeof c.quoteChar=="string"&&(U=c.quoteChar),typeof c.header=="boolean"&&(g=c.header),Array.isArray(c.columns)){if(c.columns.length===0)throw new Error("Option columns is empty");_=c.columns}c.escapeChar!==void 0&&(te=c.escapeChar+U),c.escapeFormulae instanceof RegExp?B=c.escapeFormulae:typeof c.escapeFormulae=="boolean"&&c.escapeFormulae&&(B=/^[=+\-@\t\r].*$/)}})(),new RegExp(Te(U),"g"));if(typeof a=="string"&&(a=JSON.parse(a)),Array.isArray(a)){if(!a.length||Array.isArray(a[0]))return Y(null,a,se);if(typeof a[0]=="object")return Y(_||Object.keys(a[0]),a,se)}else if(typeof a=="object")return typeof a.data=="string"&&(a.data=JSON.parse(a.data)),Array.isArray(a.data)&&(a.fields||(a.fields=a.meta&&a.meta.fields||_),a.fields||(a.fields=Array.isArray(a.data[0])?a.fields:typeof a.data[0]=="object"?Object.keys(a.data[0]):[]),Array.isArray(a.data[0])||typeof a.data[0]=="object"||(a.data=[a.data])),Y(a.fields||[],a.data||[],se);throw new Error("Unable to serialize unrecognized input");function Y(k,b,q){var L="",K=(typeof k=="string"&&(k=JSON.parse(k)),typeof b=="string"&&(b=JSON.parse(b)),Array.isArray(k)&&0<k.length),re=!Array.isArray(b[0]);if(K&&g){for(var C=0;C<k.length;C++)0<C&&(L+=m),L+=x(k[C],C);0<b.length&&(L+=w)}for(var E=0;E<b.length;E++){var j=(K?k:b[E]).length,S=!1,D=K?Object.keys(b[E]).length===0:b[E].length===0;if(q&&!K&&(S=q==="greedy"?b[E].join("").trim()==="":b[E].length===1&&b[E][0].length===0),q==="greedy"&&K){for(var V=[],z=0;z<j;z++){var P=re?k[z]:z;V.push(b[E][P])}S=V.join("").trim()===""}if(!S){for(var $=0;$<j;$++){0<$&&!D&&(L+=m);var Q=K&&re?k[$]:$;L+=x(b[E][Q],$)}E<b.length-1&&(!q||0<j&&!D)&&(L+=w)}}return L}function x(k,b){var q,L;return k==null?"":k.constructor===Date?JSON.stringify(k).slice(1,25):(L=!1,B&&typeof k=="string"&&B.test(k)&&(k="'"+k,L=!0),q=k.toString().replace(v,te),(L=L||u===!0||typeof u=="function"&&u(k,b)||Array.isArray(u)&&u[b]||((K,re)=>{for(var C=0;C<re.length;C++)if(-1<K.indexOf(re[C]))return!0;return!1})(q,f.BAD_DELIMITERS)||-1<q.indexOf(m)||q.charAt(0)===" "||q.charAt(q.length-1)===" ")?U+q+U:q)}},f.RECORD_SEP="",f.UNIT_SEP="",f.BYTE_ORDER_MARK="\uFEFF",f.BAD_DELIMITERS=["\r",`
`,'"',f.BYTE_ORDER_MARK],f.WORKERS_SUPPORTED=!o&&!!i.Worker,f.NODE_STREAM_INPUT=1,f.LocalChunkSize=10485760,f.RemoteChunkSize=5242880,f.DefaultDelimiter=",",f.Parser=ft,f.ParserHandle=Pt,f.NetworkStreamer=A,f.FileStreamer=Z,f.StringStreamer=X,f.ReadableStreamStreamer=de,i.jQuery&&((r=i.jQuery).fn.parse=function(a){var c=a.config||{},u=[];return this.each(function(w){if(!(r(this).prop("tagName").toUpperCase()==="INPUT"&&r(this).attr("type").toLowerCase()==="file"&&i.FileReader)||!this.files||this.files.length===0)return!0;for(var U=0;U<this.files.length;U++)u.push({file:this.files[U],inputElem:this,instanceConfig:r.extend({},c)})}),g(),this;function g(){if(u.length===0)O(a.complete)&&a.complete();else{var w,U,te,se,_=u[0];if(O(a.before)){var B=a.before(_.file,_.inputElem);if(typeof B=="object"){if(B.action==="abort")return w="AbortError",U=_.file,te=_.inputElem,se=B.reason,void(O(a.error)&&a.error({name:w},U,te,se));if(B.action==="skip")return void m();typeof B.config=="object"&&(_.instanceConfig=r.extend(_.instanceConfig,B.config))}else if(B==="skip")return void m()}var v=_.instanceConfig.complete;_.instanceConfig.complete=function(Y){O(v)&&v(Y,_.file,_.inputElem),m()},f.parse(_.file,_.instanceConfig)}}function m(){u.splice(0,1),g()}}),n&&(i.onmessage=function(a){a=a.data,f.WORKER_ID===void 0&&a&&(f.WORKER_ID=a.workerId),typeof a.input=="string"?i.postMessage({workerId:f.WORKER_ID,results:f.parse(a.input,a.config),finished:!0}):(i.File&&a.input instanceof File||a.input instanceof Object)&&(a=f.parse(a.input,a.config))&&i.postMessage({workerId:f.WORKER_ID,results:a,finished:!0})}),(A.prototype=Object.create(I.prototype)).constructor=A,(Z.prototype=Object.create(I.prototype)).constructor=Z,(X.prototype=Object.create(X.prototype)).constructor=X,(de.prototype=Object.create(I.prototype)).constructor=de,f})})(Ze)),Ze.exports}var cr=ar();const rs=Rs(cr);function dr(t){const e=t.map(h=>({"Feature Name":h.featureName,Impact:h.impact.toFixed(2),Confidence:h.confidence.toFixed(2),Effort:h.effort.toFixed(2),"ICE Score":h.iceScore.toFixed(2),"Priority Tier":h.tier.priority,Justification:h.justification||"","Scored By":h.scoredBy,Date:h.date,Time:h.time})),s=rs.unparse(e,{quotes:!0,header:!0}),i=new Blob(["\uFEFF"+s],{type:"text/csv;charset=utf-8;"}),n=`ice-scores-${new Date().toISOString().replace(/:/g,"-").split(".")[0]}.csv`,p=document.createElement("a");if(p.download!==void 0){const h=URL.createObjectURL(i);p.setAttribute("href",h),p.setAttribute("download",n),p.style.visibility="hidden",document.body.appendChild(p),p.click(),document.body.removeChild(p),URL.revokeObjectURL(h)}}var lr=Object.defineProperty,ur=Object.getOwnPropertyDescriptor,Se=(t,e,s,i)=>{for(var r=i>1?void 0:i?ur(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(i?n(e,s,r):n(r))||r);return i&&r&&lr(e,s,r),r};let he=class extends T{constructor(){super(...arguments),this.open=!1,this.featureName="",this.scoredBy="",this.justification="",this.errors={}}connectedCallback(){super.connectedCallback(),this.resetForm()}updated(t){t.has("score")&&this.score&&this.resetForm()}resetForm(){this.score&&(this.featureName=this.score.featureName,this.scoredBy=this.score.scoredBy,this.justification=this.score.justification||"")}render(){return!this.open||!this.score?d``:d`
      <div class="modal-overlay" @click=${this.handleOverlayClick}>
        <div class="modal" @click=${t=>t.stopPropagation()}>
          <div class="modal-header">
            <h3>Edit Score</h3>
          </div>

          <div class="modal-body">
            <div class="form-group">
              <label for="feature-name">Feature Name</label>
              <input
                id="feature-name"
                type="text"
                .value=${this.featureName}
                @input=${this.handleFeatureNameInput}
                class=${this.errors.featureName?"error":""}
                maxlength="100"
              />
              ${this.errors.featureName?d`<div class="error-message">${this.errors.featureName}</div>`:""}
            </div>

            <div class="form-group">
              <label for="scored-by">Scored By</label>
              <input
                id="scored-by"
                type="text"
                .value=${this.scoredBy}
                @input=${this.handleScoredByInput}
                maxlength="50"
              />
            </div>

            <div class="form-group">
              <div class="readonly-label">ICE Score Components (Read-only)</div>
              <div class="readonly-field">
                Impact: ${this.score.impact.toFixed(2)} | Confidence:
                ${this.score.confidence.toFixed(2)} | Ease: ${this.score.effort.toFixed(2)} → ICE:
                ${this.score.iceScore.toFixed(2)}
              </div>
              <div class="help-text">
                To change scores, you'll need to score the feature again from scratch
              </div>
            </div>

            <div class="form-group">
              <label for="justification">Justification (Optional)</label>
              <textarea
                id="justification"
                .value=${this.justification}
                @input=${this.handleJustificationInput}
                rows="4"
                maxlength="500"
                placeholder="Add notes or reasoning for this score..."
              ></textarea>
              <div class="help-text">${this.justification.length} / 500 characters</div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn-secondary" @click=${this.handleCancel}>Cancel</button>
            <button class="btn-primary" @click=${this.handleSave}>Save Changes</button>
          </div>
        </div>
      </div>
    `}handleFeatureNameInput(t){const e=t.target;this.featureName=e.value,this.validateFeatureName()}handleScoredByInput(t){const e=t.target;this.scoredBy=e.value||"PM"}handleJustificationInput(t){const e=t.target;this.justification=e.value}validateFeatureName(){if(!this.featureName.trim())return this.errors={...this.errors,featureName:"Feature name is required"},!1;if(this.featureName.trim().length<3)return this.errors={...this.errors,featureName:"Feature name must be at least 3 characters"},!1;const{featureName:t,...e}=this.errors;return this.errors=e,!0}handleOverlayClick(){this.handleCancel()}handleCancel(){this.dispatchEvent(new CustomEvent("close"))}handleSave(){if(this.validateFeatureName()){if(!this.score.id){console.error("Cannot update score without ID");return}l.updateScore(this.score.id,{featureName:this.featureName.trim(),scoredBy:this.scoredBy.trim()||"PM",justification:this.justification.trim()||void 0}),this.dispatchEvent(new CustomEvent("save")),this.dispatchEvent(new CustomEvent("close"))}}};he.styles=R`
    :host {
      display: block;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 1rem;
    }

    .modal {
      background: white;
      border-radius: 8px;
      max-width: 500px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .modal-header h3 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: #1f2937;
    }

    .modal-body {
      padding: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      font-weight: 600;
      color: #374151;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }

    input,
    textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 1rem;
      font-family: inherit;
    }

    input:focus,
    textarea:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    input.error,
    textarea.error {
      border-color: #ef4444;
    }

    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .help-text {
      color: #6b7280;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .readonly-field {
      background: #f9fafb;
      color: #6b7280;
      padding: 0.75rem;
      border-radius: 6px;
      font-size: 0.875rem;
    }

    .readonly-label {
      font-weight: 600;
      color: #6b7280;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.25rem;
    }

    .modal-footer {
      padding: 1.5rem;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
    }

    button {
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s, border-color 0.2s;
      border: none;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
    }

    .btn-primary:hover {
      background: #2563eb;
    }

    .btn-secondary {
      background: white;
      color: #6b7280;
      border: 1px solid #d1d5db;
    }

    .btn-secondary:hover {
      background: #f9fafb;
      border-color: #9ca3af;
    }

    button:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
  `;Se([ce({type:Object})],he.prototype,"score",2);Se([ce({type:Boolean})],he.prototype,"open",2);Se([y()],he.prototype,"featureName",2);Se([y()],he.prototype,"scoredBy",2);Se([y()],he.prototype,"justification",2);Se([y()],he.prototype,"errors",2);he=Se([M("ice-edit-modal")],he);var hr=Object.defineProperty,pr=Object.getOwnPropertyDescriptor,Ke=(t,e,s,i)=>{for(var r=i>1?void 0:i?pr(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(i?n(e,s,r):n(r))||r);return i&&r&&hr(e,s,r),r};let ye=class extends T{constructor(){super(...arguments),this.scores=[],this.sortBy="ice",this.editingScore=null,this.showEditModal=!1}connectedCallback(){super.connectedCallback(),this.loadScores(),l.subscribe(()=>this.loadScores())}loadScores(){this.scores=this.getSortedScores()}getSortedScores(){const t=[...l.getState().savedScores];switch(this.sortBy){case"ice":return t.sort((e,s)=>s.iceScore-e.iceScore);case"date":return t.sort((e,s)=>{const i=new Date(`${e.date} ${e.time}`);return new Date(`${s.date} ${s.time}`).getTime()-i.getTime()});case"name":return t.sort((e,s)=>e.featureName.localeCompare(s.featureName));default:return t}}render(){return d`
      <div class="export-container">
        <h2>Export Your Scores</h2>

        ${this.scores.length>0?this.renderTable():this.renderEmptyState()}

        <div class="button-group">
          ${this.scores.length>0?d`
                <button class="btn-primary" @click=${this.handleExport}>
                  Download CSV (${this.scores.length} items)
                </button>
                <button class="btn-danger" @click=${this.handleClearAll}>Clear All Scores</button>
              `:""}
          <button class="btn-secondary" @click=${this.handleScoreNew}>Score New Feature</button>
        </div>
      </div>

      ${this.showEditModal&&this.editingScore?d`
            <ice-edit-modal
              .score=${this.editingScore}
              .open=${this.showEditModal}
              @close=${this.handleModalClose}
            ></ice-edit-modal>
          `:""}
    `}renderTable(){return d`
      <div class="controls">
        <div class="sort-group">
          <span class="sort-label">Sort by:</span>
          <select @change=${this.handleSortChange} .value=${this.sortBy}>
            <option value="ice">ICE Score (High to Low)</option>
            <option value="date">Date (Newest First)</option>
            <option value="name">Feature Name (A-Z)</option>
          </select>
        </div>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>I</th>
              <th>C</th>
              <th>E</th>
              <th>ICE</th>
              <th>Tier</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${this.scores.map(t=>this.renderScoreRow(t))}
          </tbody>
        </table>
      </div>
    `}renderScoreRow(t){return d`
      <tr>
        <td class="feature-name">${t.featureName}</td>
        <td>${t.impact.toFixed(1)}</td>
        <td>${t.confidence.toFixed(1)}</td>
        <td>${t.effort.toFixed(1)}</td>
        <td class="score-cell" style="color: ${t.tier.color}">${t.iceScore.toFixed(2)}</td>
        <td>
          <span class="tier-badge" style="background: ${t.tier.color}">
            ${t.tier.priority}
          </span>
        </td>
        <td>${t.date}</td>
        <td class="actions">
          <button
            class="btn-icon"
            @click=${()=>this.handleEdit(t)}
            title="Edit score"
          >
            ✏️
          </button>
          <button
            class="btn-icon btn-danger"
            @click=${()=>this.handleDelete(t)}
            title="Delete score"
          >
            🗑️
          </button>
        </td>
      </tr>
    `}renderEmptyState(){return d`
      <div class="empty-state">
        <div class="empty-icon">📊</div>
        <h3>No Scores Yet</h3>
        <p>Score some features to see them here and export to CSV.</p>
      </div>
    `}handleSortChange(t){const e=t.target;this.sortBy=e.value,this.loadScores()}handleExport(){if(this.scores.length===0){l.showToast("No scores to export","warning");return}try{dr(this.scores),l.showToast("Scores exported successfully!","success")}catch(t){console.error("Export failed:",t),l.showToast("Failed to export CSV. Please try again.","error")}}async handleClearAll(){await l.showConfirm("Clear All Scores","Are you sure you want to clear all saved scores? This cannot be undone.",{type:"danger",confirmText:"Clear All",cancelText:"Cancel"})&&(l.clearAllScores(),l.showToast("All scores cleared","success"))}handleScoreNew(){l.resetForNewScore()}handleEdit(t){this.editingScore=t,this.showEditModal=!0}async handleDelete(t){if(!t.id)return;await l.showConfirm("Delete Score",`Delete "${t.featureName}"? This cannot be undone.`,{type:"danger",confirmText:"Delete",cancelText:"Cancel"})&&(l.deleteScore(t.id),l.showToast("Score deleted","success"))}handleModalClose(){this.showEditModal=!1,this.editingScore=null}};ye.styles=R`
    :host {
      display: block;
    }

    .export-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
      text-align: center;
    }

    .controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .sort-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .sort-label {
      font-weight: 600;
      color: #6b7280;
      font-size: 0.875rem;
    }

    select {
      padding: 0.5rem 1rem;
      border: 2px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      cursor: pointer;
      background: white;
    }

    select:focus {
      outline: none;
      border-color: #3b82f6;
    }

    .table-container {
      overflow-x: auto;
      border-radius: 0.75rem;
      border: 2px solid #e5e7eb;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
    }

    th {
      background: #f9fafb;
      padding: 0.75rem 1rem;
      text-align: left;
      font-weight: 600;
      color: #374151;
      font-size: 0.875rem;
      border-bottom: 2px solid #e5e7eb;
    }

    td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #f3f4f6;
      color: #6b7280;
      font-size: 0.875rem;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background: #f9fafb;
    }

    .feature-name {
      font-weight: 600;
      color: #1f2937;
    }

    .score-cell {
      font-weight: 700;
      font-size: 1rem;
    }

    .tier-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: white;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #6b7280;
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    .button-group {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    button {
      padding: 0.875rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .btn-primary {
      background: #10b981;
      color: white;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: white;
      color: #3b82f6;
      border: 2px solid #3b82f6;
    }

    .btn-secondary:hover {
      background: #eff6ff;
    }

    .btn-danger {
      background: white;
      color: #ef4444;
      border: 2px solid #ef4444;
    }

    .btn-danger:hover {
      background: #fef2f2;
    }

    button:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
    }

    .btn-icon {
      background: none;
      border: none;
      padding: 0.25rem 0.5rem;
      cursor: pointer;
      font-size: 1.125rem;
      transition: transform 0.2s;
    }

    .btn-icon:hover {
      transform: scale(1.1);
    }

    .btn-icon:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
      border-radius: 4px;
    }

    @media (max-width: 768px) {
      .controls {
        flex-direction: column;
        align-items: stretch;
      }

      .table-container {
        font-size: 0.75rem;
      }

      th,
      td {
        padding: 0.5rem;
      }

      .button-group {
        flex-direction: column;
      }

      button {
        width: 100%;
      }
    }
  `;Ke([y()],ye.prototype,"scores",2);Ke([y()],ye.prototype,"sortBy",2);Ke([y()],ye.prototype,"editingScore",2);Ke([y()],ye.prototype,"showEditModal",2);ye=Ke([M("ice-export-manager")],ye);var fr=Object.defineProperty,mr=Object.getOwnPropertyDescriptor,is=(t,e,s,i)=>{for(var r=i>1?void 0:i?mr(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(i?n(e,s,r):n(r))||r);return i&&r&&fr(e,s,r),r};let rt=class extends T{render(){const t={success:"✅",error:"❌",info:"ℹ️",warning:"⚠️"};return d`
      <div class="toast ${this.toast.type}">
        <div class="toast-icon">${t[this.toast.type]}</div>
        <div class="toast-message">${this.toast.message}</div>
        <button
          class="toast-close"
          @click=${this.handleClose}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    `}handleClose(){this.dispatchEvent(new CustomEvent("close",{detail:this.toast.id}))}};rt.styles=R`
    :host {
      display: block;
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.5rem;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
      min-width: 300px;
      max-width: 500px;
      border-left: 4px solid;
    }

    .toast.success {
      border-left-color: #10b981;
    }

    .toast.error {
      border-left-color: #ef4444;
    }

    .toast.info {
      border-left-color: #3b82f6;
    }

    .toast.warning {
      border-left-color: #f59e0b;
    }

    .toast-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .toast-message {
      flex: 1;
      color: #1f2937;
      font-size: 0.875rem;
      line-height: 1.4;
    }

    .toast-close {
      background: none;
      border: none;
      color: #6b7280;
      font-size: 1.25rem;
      cursor: pointer;
      padding: 0.25rem;
      line-height: 1;
      flex-shrink: 0;
    }

    .toast-close:hover {
      color: #1f2937;
    }

    @media (max-width: 640px) {
      :host {
        bottom: 1rem;
        right: 1rem;
        left: 1rem;
      }

      .toast {
        min-width: auto;
      }
    }
  `;is([ce({type:Object})],rt.prototype,"toast",2);rt=is([M("ice-toast")],rt);var gr=Object.defineProperty,br=Object.getOwnPropertyDescriptor,os=(t,e,s,i)=>{for(var r=i>1?void 0:i?br(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(i?n(e,s,r):n(r))||r);return i&&r&&gr(e,s,r),r};let it=class extends T{constructor(){super(...arguments),this.toasts=[]}connectedCallback(){super.connectedCallback(),l.subscribe(t=>{this.toasts=t.toasts||[]})}render(){return this.toasts.length===0?d``:d`
      <div class="toast-stack">
        ${this.toasts.map(t=>d`
            <ice-toast
              .toast=${t}
              @close=${()=>this.handleClose(t.id)}
            ></ice-toast>
          `)}
      </div>
    `}handleClose(t){l.removeToast(t)}};it.styles=R`
    :host {
      display: block;
      position: fixed;
      bottom: 0;
      right: 0;
      z-index: 10000;
      pointer-events: none;
    }

    .toast-stack {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 2rem;
      pointer-events: auto;
    }

    @media (max-width: 640px) {
      .toast-stack {
        padding: 1rem;
      }
    }
  `;os([y()],it.prototype,"toasts",2);it=os([M("ice-toast-container")],it);var vr=Object.defineProperty,yr=Object.getOwnPropertyDescriptor,ns=(t,e,s,i)=>{for(var r=i>1?void 0:i?yr(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(i?n(e,s,r):n(r))||r);return i&&r&&vr(e,s,r),r};let ot=class extends T{render(){const t={danger:"⚠️",warning:"⚠️",info:"ℹ️"},e=this.dialog.type||"danger",s=this.dialog.confirmText||"Confirm",i=this.dialog.cancelText||"Cancel";return d`
      <div class="overlay" @click=${this.handleOverlayClick}>
        <div class="dialog" @click=${r=>r.stopPropagation()}>
          <div class="dialog-header">
            <div class="dialog-icon">${t[e]}</div>
            <h3 class="dialog-title">${this.dialog.title}</h3>
          </div>
          <div class="dialog-body">
            <p class="dialog-message">${this.dialog.message}</p>
          </div>
          <div class="dialog-footer">
            <button class="btn-cancel" @click=${this.handleCancel}>
              ${i}
            </button>
            <button class="btn-confirm ${e}" @click=${this.handleConfirm}>
              ${s}
            </button>
          </div>
        </div>
      </div>
    `}handleOverlayClick(){this.handleCancel()}handleConfirm(){this.dispatchEvent(new CustomEvent("confirm",{detail:{id:this.dialog.id,confirmed:!0}}))}handleCancel(){this.dispatchEvent(new CustomEvent("confirm",{detail:{id:this.dialog.id,confirmed:!1}}))}};ot.styles=R`
    :host {
      display: block;
    }

    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 1rem;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .dialog {
      background: white;
      border-radius: 0.75rem;
      max-width: 400px;
      width: 100%;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
      animation: slideUp 0.2s ease-out;
    }

    @keyframes slideUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .dialog-header {
      padding: 1.5rem 1.5rem 1rem 1.5rem;
    }

    .dialog-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      text-align: center;
    }

    .dialog-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 0.5rem 0;
      text-align: center;
    }

    .dialog-body {
      padding: 0 1.5rem 1.5rem 1.5rem;
    }

    .dialog-message {
      color: #6b7280;
      font-size: 0.875rem;
      line-height: 1.5;
      text-align: center;
    }

    .dialog-footer {
      padding: 1rem 1.5rem 1.5rem 1.5rem;
      display: flex;
      gap: 0.75rem;
      justify-content: center;
    }

    button {
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
      flex: 1;
    }

    .btn-confirm {
      background: #ef4444;
      color: white;
    }

    .btn-confirm:hover {
      background: #dc2626;
    }

    .btn-confirm.warning {
      background: #f59e0b;
    }

    .btn-confirm.warning:hover {
      background: #d97706;
    }

    .btn-confirm.info {
      background: #3b82f6;
    }

    .btn-confirm.info:hover {
      background: #2563eb;
    }

    .btn-cancel {
      background: white;
      color: #6b7280;
      border: 2px solid #d1d5db;
    }

    .btn-cancel:hover {
      background: #f9fafb;
      border-color: #9ca3af;
    }

    button:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    @media (max-width: 640px) {
      .dialog-footer {
        flex-direction: column-reverse;
      }

      button {
        width: 100%;
      }
    }
  `;ns([ce({type:Object})],ot.prototype,"dialog",2);ot=ns([M("ice-confirm-dialog")],ot);var xr=Object.defineProperty,wr=Object.getOwnPropertyDescriptor,as=(t,e,s,i)=>{for(var r=i>1?void 0:i?wr(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(i?n(e,s,r):n(r))||r);return i&&r&&xr(e,s,r),r};let nt=class extends T{connectedCallback(){super.connectedCallback(),l.subscribe(t=>{this.dialog=t.confirmDialog})}render(){return this.dialog?d`
      <ice-confirm-dialog
        .dialog=${this.dialog}
        @confirm=${this.handleConfirm}
      ></ice-confirm-dialog>
    `:d``}handleConfirm(t){const{id:e,confirmed:s}=t.detail;l.handleConfirmResponse(e,s)}};nt.styles=R`
    :host {
      display: block;
    }
  `;as([y()],nt.prototype,"dialog",2);nt=as([M("ice-confirm-container")],nt);var Sr=Object.defineProperty,$r=Object.getOwnPropertyDescriptor,Oe=(t,e,s,i)=>{for(var r=i>1?void 0:i?$r(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(i?n(e,s,r):n(r))||r);return i&&r&&Sr(e,s,r),r};let me=class extends T{constructor(){super(...arguments),this.sessionName="",this.sessionDescription="",this.createdBy="",this.aggregationMethod="mean",this.isCreating=!1}render(){const t=this.sessionName.trim()&&this.createdBy.trim();return d`
      <h2>Create Collaborative Session</h2>
      <p class="subtitle">
        Set up a scoring session where multiple team members can score the same features
      </p>

      <form @submit=${this.handleSubmit}>
        <div class="form-group">
          <label for="session-name">
            Session Name
          </label>
          <input
            id="session-name"
            type="text"
            placeholder="e.g., Q1 2025 Product Roadmap"
            .value=${this.sessionName}
            @input=${e=>this.sessionName=e.target.value}
            required
          />
        </div>

        <div class="form-group">
          <label for="created-by">
            Your Name
          </label>
          <input
            id="created-by"
            type="text"
            placeholder="e.g., Jane Smith"
            .value=${this.createdBy}
            @input=${e=>this.createdBy=e.target.value}
            required
          />
          <p class="help-text">This will be used to identify your scores in the session</p>
        </div>

        <div class="form-group">
          <label for="session-description">
            Description <span class="label-optional">(optional)</span>
          </label>
          <textarea
            id="session-description"
            placeholder="Briefly describe what this scoring session is for..."
            .value=${this.sessionDescription}
            @input=${e=>this.sessionDescription=e.target.value}
          ></textarea>
        </div>

        <div class="form-group">
          <label for="aggregation-method">
            Aggregation Method
          </label>
          <select
            id="aggregation-method"
            .value=${this.aggregationMethod}
            @change=${e=>this.aggregationMethod=e.target.value}
          >
            <option value="mean">Mean (Average)</option>
            <option value="median">Median</option>
            <option value="weighted">Weighted Average</option>
            <option value="trimmed">Trimmed Mean</option>
          </select>
          ${this.renderAggregationInfo()}
        </div>

        <div class="button-group">
          <button
            type="button"
            class="btn btn-secondary"
            @click=${this.handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            ?disabled=${!t||this.isCreating}
          >
            ${this.isCreating?"Creating...":"Create Session"}
          </button>
        </div>
      </form>
    `}renderAggregationInfo(){const e={mean:{title:"Mean (Average)",description:"Simple average of all scores. Best for most use cases."},median:{title:"Median",description:"Middle value when sorted. Resistant to outliers."},weighted:{title:"Weighted Average",description:"Weights scores based on confidence levels."},trimmed:{title:"Trimmed Mean",description:"Excludes highest and lowest scores before averaging."}}[this.aggregationMethod];return d`
      <div class="aggregation-info">
        <h4>${e.title}</h4>
        <p>${e.description}</p>
      </div>
    `}async handleSubmit(t){if(t.preventDefault(),!this.sessionName.trim()||!this.createdBy.trim())return;this.isCreating=!0;const e=await l.createSession(this.sessionName.trim(),this.createdBy.trim(),this.sessionDescription.trim()||void 0,this.aggregationMethod);this.isCreating=!1,e&&l.setStep("batch-upload")}handleCancel(){l.setStep("landing")}};me.styles=R`
    :host {
      display: block;
      max-width: 600px;
      margin: 0 auto;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #6b7280;
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .label-optional {
      font-weight: 400;
      color: #9ca3af;
      font-size: 0.875rem;
    }

    input,
    textarea,
    select {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e5e7eb;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-family: inherit;
      transition: border-color 0.2s;
    }

    input:focus,
    textarea:focus,
    select:focus {
      outline: none;
      border-color: #3b82f6;
    }

    textarea {
      resize: vertical;
      min-height: 100px;
    }

    .help-text {
      font-size: 0.875rem;
      color: #6b7280;
      margin-top: 0.5rem;
    }

    .button-group {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn {
      flex: 1;
      padding: 0.875rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: #2563eb;
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: white;
      color: #6b7280;
      border: 2px solid #d1d5db;
    }

    .btn-secondary:hover {
      background: #f9fafb;
    }

    .aggregation-info {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 0.5rem;
      padding: 1rem;
      margin-top: 0.5rem;
    }

    .aggregation-info h4 {
      font-size: 0.875rem;
      font-weight: 600;
      color: #1e40af;
      margin: 0 0 0.5rem 0;
    }

    .aggregation-info p {
      font-size: 0.875rem;
      color: #1e40af;
      margin: 0;
    }

    @media (max-width: 768px) {
      .button-group {
        flex-direction: column;
      }
    }
  `;Oe([y()],me.prototype,"sessionName",2);Oe([y()],me.prototype,"sessionDescription",2);Oe([y()],me.prototype,"createdBy",2);Oe([y()],me.prototype,"aggregationMethod",2);Oe([y()],me.prototype,"isCreating",2);me=Oe([M("ice-session-create")],me);var _r=Object.defineProperty,kr=Object.getOwnPropertyDescriptor,At=(t,e,s,i)=>{for(var r=i>1?void 0:i?kr(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(i?n(e,s,r):n(r))||r);return i&&r&&_r(e,s,r),r};let He=class extends T{constructor(){super(...arguments),this.sessions=[],this.filterStatus="all"}connectedCallback(){super.connectedCallback(),this.loadSessions(),l.subscribe(()=>this.loadSessions())}loadSessions(){const t=l.getState();this.sessions=t.sessions}render(){const t=this.filterStatus==="all"?this.sessions:this.sessions.filter(e=>e.status===this.filterStatus);return d`
      <div class="header">
        <div>
          <h2>Scoring Sessions</h2>
        </div>
        <div class="filter-group">
          <button
            class="filter-btn ${this.filterStatus==="all"?"active":""}"
            @click=${()=>this.filterStatus="all"}
          >
            All
          </button>
          <button
            class="filter-btn ${this.filterStatus==="active"?"active":""}"
            @click=${()=>this.filterStatus="active"}
          >
            Active
          </button>
          <button
            class="filter-btn ${this.filterStatus==="completed"?"active":""}"
            @click=${()=>this.filterStatus="completed"}
          >
            Completed
          </button>
          <button
            class="filter-btn ${this.filterStatus==="archived"?"active":""}"
            @click=${()=>this.filterStatus="archived"}
          >
            Archived
          </button>
        </div>
      </div>

      ${t.length===0?this.renderEmptyState():this.renderSessions(t)}

      <div style="margin-top: 2rem; display: flex; gap: 1rem;">
        <button class="btn btn-primary" @click=${this.handleCreateNew}>
          Create New Session
        </button>
        <button class="btn btn-secondary" @click=${this.handleBack}>
          Back to Home
        </button>
      </div>
    `}renderSessions(t){return d`
      <div class="sessions-list">
        ${t.map(e=>this.renderSessionCard(e))}
      </div>
    `}renderSessionCard(t){const e=new Date(t.created_at),s=new Date(t.updated_at);return d`
      <div class="session-card" @click=${()=>this.handleSessionClick(t)}>
        <div class="session-header">
          <h3 class="session-title">${t.name}</h3>
          <span class="session-status status-${t.status}">
            ${t.status}
          </span>
        </div>
        ${t.description?d`<p class="session-description">${t.description}</p>`:""}
        <div class="session-meta">
          <div class="meta-item">
            <span>👤</span>
            <span>Created by ${t.created_by}</span>
          </div>
          <div class="meta-item">
            <span>📅</span>
            <span>Created ${e.toLocaleDateString()}</span>
          </div>
          <div class="meta-item">
            <span>🔄</span>
            <span>Updated ${s.toLocaleDateString()}</span>
          </div>
          <div class="meta-item">
            <span>📊</span>
            <span>${t.aggregation_method}</span>
          </div>
        </div>
      </div>
    `}renderEmptyState(){const t=this.filterStatus==="all"?"No sessions yet":`No ${this.filterStatus} sessions`;return d`
      <div class="empty-state">
        <h3>${t}</h3>
        <p>Create a collaborative scoring session to get started</p>
      </div>
    `}handleSessionClick(t){l.setCurrentSession(t),l.setStep("session-dashboard")}handleCreateNew(){l.setStep("session-create")}handleBack(){l.setStep("landing")}};He.styles=R`
    :host {
      display: block;
      max-width: 1000px;
      margin: 0 auto;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .filter-group {
      display: flex;
      gap: 0.5rem;
    }

    .filter-btn {
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: 2px solid #e5e7eb;
      background: white;
      color: #6b7280;
    }

    .filter-btn.active {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }

    .filter-btn:hover:not(.active) {
      background: #f9fafb;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
    }

    .btn-primary:hover {
      background: #2563eb;
    }

    .btn-secondary {
      background: white;
      color: #6b7280;
      border: 2px solid #d1d5db;
    }

    .btn-secondary:hover {
      background: #f9fafb;
    }

    .sessions-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .session-card {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 0.75rem;
      padding: 1.5rem;
      transition: all 0.2s;
      cursor: pointer;
    }

    .session-card:hover {
      border-color: #3b82f6;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }

    .session-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 0.75rem;
      gap: 1rem;
    }

    .session-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin: 0;
    }

    .session-status {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      flex-shrink: 0;
    }

    .status-active {
      background: #d1fae5;
      color: #065f46;
    }

    .status-completed {
      background: #dbeafe;
      color: #1e40af;
    }

    .status-archived {
      background: #f3f4f6;
      color: #6b7280;
    }

    .session-description {
      color: #6b7280;
      margin-bottom: 0.75rem;
      line-height: 1.5;
    }

    .session-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #6b7280;
    }

    .empty-state h3 {
      font-size: 1.5rem;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .empty-state p {
      margin-bottom: 1.5rem;
    }

    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        align-items: stretch;
      }

      .filter-group {
        justify-content: center;
      }
    }
  `;At([y()],He.prototype,"sessions",2);At([y()],He.prototype,"filterStatus",2);He=At([M("ice-session-list")],He);var Cr=Object.defineProperty,Er=Object.getOwnPropertyDescriptor,ht=(t,e,s,i)=>{for(var r=i>1?void 0:i?Er(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(i?n(e,s,r):n(r))||r);return i&&r&&Cr(e,s,r),r};let Ie=class extends T{constructor(){super(...arguments),this.loading=!0,this.scorerName=""}connectedCallback(){super.connectedCallback(),this.loadSession()}async loadSession(){const t=l.getState();if(!t.currentSession){this.loading=!1;return}this.loading=!0;const e=await l.loadSessionWithDetails(t.currentSession.id);this.session=e||void 0,this.loading=!1,!this.scorerName&&t.currentSession&&(this.scorerName=t.currentSession.created_by)}render(){return this.loading?d`<div class="loading">Loading session...</div>`:this.session?d`
      <div class="session-header">
        <h2>${this.session.name}</h2>
        <div class="session-meta">
          <div class="meta-item">
            <span class="status-badge status-active">${this.session.status}</span>
          </div>
          <div class="meta-item">
            <span>👤</span>
            <span>Created by ${this.session.created_by}</span>
          </div>
          <div class="meta-item">
            <span>📊</span>
            <span>${this.session.aggregation_method}</span>
          </div>
          <div class="meta-item">
            <span>📝</span>
            <span>${this.session.features.length} features</span>
          </div>
        </div>
        ${this.session.description?d`<p style="color: #6b7280; margin-top: 1rem;">${this.session.description}</p>`:""}
      </div>

      ${this.renderScorerInput()}

      ${this.session.features.length===0?this.renderNoFeatures():d`
            <h3 style="font-size: 1.25rem; font-weight: 600; color: #374151; margin-bottom: 1rem;">
              Features to Score
            </h3>
            <div class="features-grid">
              ${this.session.features.map(t=>this.renderFeatureCard(t))}
            </div>
          `}

      <div class="action-buttons">
        <button class="btn btn-secondary" @click=${this.handleAddFeatures}>
          Add More Features
        </button>
        <button class="btn btn-primary" @click=${this.handleInvite} style="background: #f59e0b;">
          Invite Others
        </button>
        <button class="btn btn-primary" @click=${this.handleVisualize} style="background: #ec4899;">
          Visualize Results
        </button>
        <button class="btn btn-primary" @click=${this.handleExport} style="background: #8b5cf6;">
          Export Results
        </button>
        ${this.session.status==="active"?d`
              <button class="btn btn-primary" @click=${this.handleCompleteSession} style="background: #10b981;">
                Complete Session
              </button>
            `:""}
        ${this.session.status==="completed"?d`
              <button class="btn btn-secondary" @click=${this.handleArchiveSession}>
                Archive Session
              </button>
            `:""}
        <button class="btn btn-secondary" @click=${this.handleBack}>
          Back to Sessions
        </button>
      </div>
    `:this.renderEmptyState()}renderScorerInput(){return d`
      <div class="scorer-input">
        <label for="scorer-name">Your Name (for tracking your scores)</label>
        <input
          id="scorer-name"
          type="text"
          placeholder="Enter your name"
          .value=${this.scorerName}
          @input=${t=>this.scorerName=t.target.value}
        />
      </div>
    `}renderFeatureCard(t){if(!this.session)return"";const e=this.session.aggregates.find(o=>o.feature_id===t.id),i=!!this.session.scores.find(o=>o.feature_id===t.id&&o.scored_by===this.scorerName),r=e&&e.score_count>1;return d`
      <div
        class="feature-card ${i?"scored":""}"
        @click=${()=>this.handleScoreFeature(t)}
      >
        <div class="feature-header">
          <h4 class="feature-title">${t.name}</h4>
          ${e?d`<span class="score-count">👥 ${e.score_count}</span>`:""}
        </div>

        ${t.description?d`<p class="feature-description">${t.description}</p>`:""}

        ${e?this.renderConsensusInfo(e):this.renderNoScores()}

        <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
          ${i?d`<div style="color: #059669; font-size: 0.875rem; font-weight: 600;">
                ✓ You've scored this feature
              </div>`:d`<div style="color: #3b82f6; font-size: 0.875rem; font-weight: 600;">
                Click to score →
              </div>`}

          ${r?d`
                <button
                  @click=${o=>{o.stopPropagation(),this.handleViewBreakdown(t)}}
                  style="
                    padding: 0.5rem 1rem;
                    background: white;
                    color: #3b82f6;
                    border: 2px solid #3b82f6;
                    border-radius: 0.375rem;
                    font-size: 0.875rem;
                    font-weight: 600;
                    cursor: pointer;
                  "
                >
                  View Breakdown
                </button>
              `:""}
        </div>
      </div>
    `}renderConsensusInfo(t){return d`
      <div class="consensus-info">
        <div class="consensus-item">
          <div class="consensus-label">Impact</div>
          <div class="consensus-value">${t.avg_impact.toFixed(1)}</div>
          ${t.impact_stddev?d`<div class="consensus-stddev">±${t.impact_stddev.toFixed(1)}</div>`:""}
        </div>
        <div class="consensus-item">
          <div class="consensus-label">Confidence</div>
          <div class="consensus-value">${t.avg_confidence.toFixed(1)}</div>
          ${t.confidence_stddev?d`<div class="consensus-stddev">±${t.confidence_stddev.toFixed(1)}</div>`:""}
        </div>
        <div class="consensus-item">
          <div class="consensus-label">Effort</div>
          <div class="consensus-value">${t.avg_effort.toFixed(1)}</div>
          ${t.effort_stddev?d`<div class="consensus-stddev">±${t.effort_stddev.toFixed(1)}</div>`:""}
        </div>
        <div class="consensus-item">
          <div class="consensus-label">ICE Score</div>
          <div class="consensus-value">${t.avg_ice_score.toFixed(0)}</div>
          ${t.ice_stddev?d`<div class="consensus-stddev">±${t.ice_stddev.toFixed(0)}</div>`:""}
        </div>
      </div>
    `}renderNoScores(){return d`
      <div style="color: #9ca3af; font-size: 0.875rem; font-style: italic; padding: 1rem 0;">
        No scores yet. Be the first to score this feature!
      </div>
    `}renderNoFeatures(){return d`
      <div class="empty-state">
        <h3>No Features Yet</h3>
        <p>Add features to this session to start collaborative scoring</p>
        <button class="btn btn-primary" @click=${this.handleAddFeatures} style="margin-top: 1rem;">
          Add Features via CSV
        </button>
      </div>
    `}renderEmptyState(){return d`
      <div class="empty-state">
        <h3>No Session Selected</h3>
        <p>Please select a session to view</p>
        <button class="btn btn-primary" @click=${this.handleBack}>
          View Sessions
        </button>
      </div>
    `}handleScoreFeature(t){if(!this.scorerName.trim()){l.showToast("Please enter your name first","warning");return}this.session&&(l.setFeatureInfo(t.name,this.scorerName.trim()),l.getState().currentSessionFeature=t,l.setStep("impact-intro"))}handleAddFeatures(){l.setStep("batch-upload")}handleInvite(){if(!this.session)return;const t=`${window.location.origin}${window.location.pathname}?sessionId=${this.session.id}`;navigator.clipboard.writeText(t).then(()=>{l.showToast("Session link copied to clipboard! Share it with your team.","success",6e3)}).catch(()=>{l.showConfirm("Share Session",`Share this link with your team:

${t}

Session ID: ${this.session.id}`,{confirmText:"OK",cancelText:""})})}handleVisualize(){l.setStep("session-visualize")}handleExport(){l.setStep("session-export")}handleViewBreakdown(t){this.session&&(l.getState().currentSessionFeature=t,l.setStep("feature-breakdown"))}async handleCompleteSession(){if(!this.session)return;await l.showConfirm("Complete Session","Mark this session as completed? You can still view and export results, but scoring will be finalized.",{type:"info",confirmText:"Complete",cancelText:"Cancel"})&&(await l.updateSessionStatus(this.session.id,"completed"),await this.loadSession())}async handleArchiveSession(){if(!this.session)return;await l.showConfirm("Archive Session","Archive this session? It will be moved to archived sessions.",{type:"warning",confirmText:"Archive",cancelText:"Cancel"})&&(await l.updateSessionStatus(this.session.id,"archived"),await this.loadSession())}handleBack(){l.setCurrentSession(void 0),l.setStep("session-list")}};Ie.styles=R`
    :host {
      display: block;
      max-width: 1200px;
      margin: 0 auto;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .session-header {
      margin-bottom: 2rem;
    }

    .session-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      margin-top: 1rem;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-active {
      background: #d1fae5;
      color: #065f46;
    }

    .scorer-input {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: #eff6ff;
      border: 2px solid #bfdbfe;
      border-radius: 0.75rem;
    }

    .scorer-input label {
      display: block;
      font-weight: 600;
      color: #1e40af;
      margin-bottom: 0.5rem;
    }

    .scorer-input input {
      width: 100%;
      max-width: 400px;
      padding: 0.75rem;
      border: 2px solid #93c5fd;
      border-radius: 0.5rem;
      font-size: 1rem;
    }

    .scorer-input input:focus {
      outline: none;
      border-color: #3b82f6;
    }

    .features-grid {
      display: grid;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .feature-card {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 0.75rem;
      padding: 1.5rem;
      transition: all 0.2s;
      cursor: pointer;
    }

    .feature-card:hover {
      border-color: #3b82f6;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }

    .feature-card.scored {
      background: #f0fdf4;
      border-color: #86efac;
    }

    .feature-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .feature-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
      margin: 0;
    }

    .feature-description {
      color: #6b7280;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .consensus-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #e5e7eb;
    }

    .consensus-item {
      text-align: center;
    }

    .consensus-label {
      font-size: 0.75rem;
      color: #6b7280;
      text-transform: uppercase;
      margin-bottom: 0.25rem;
    }

    .consensus-value {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1f2937;
    }

    .consensus-stddev {
      font-size: 0.75rem;
      color: #9ca3af;
    }

    .score-count {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.75rem;
      background: #e0f2fe;
      color: #0c4a6e;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
    }

    .btn-primary:hover {
      background: #2563eb;
    }

    .btn-secondary {
      background: white;
      color: #6b7280;
      border: 2px solid #d1d5db;
    }

    .btn-secondary:hover {
      background: #f9fafb;
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-top: 2rem;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #6b7280;
    }

    .loading {
      text-align: center;
      padding: 4rem 2rem;
      color: #6b7280;
    }

    @media (max-width: 768px) {
      .consensus-info {
        grid-template-columns: repeat(2, 1fr);
      }

      .action-buttons {
        flex-direction: column;
      }
    }
  `;ht([y()],Ie.prototype,"session",2);ht([y()],Ie.prototype,"loading",2);ht([y()],Ie.prototype,"scorerName",2);Ie=ht([M("ice-session-dashboard")],Ie);var Ar=Object.defineProperty,Fr=Object.getOwnPropertyDescriptor,Ft=(t,e,s,i)=>{for(var r=i>1?void 0:i?Fr(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(i?n(e,s,r):n(r))||r);return i&&r&&Ar(e,s,r),r};let Ve=class extends T{constructor(){super(...arguments),this.loading=!0}connectedCallback(){super.connectedCallback(),this.loadSession()}async loadSession(){const t=l.getState();if(!t.currentSession){this.loading=!1;return}this.loading=!0;const e=await l.loadSessionWithDetails(t.currentSession.id);this.session=e||void 0,this.loading=!1}render(){return this.loading?d`<div class="loading">Loading visualizations...</div>`:!this.session||this.session.features.length===0?d`
        <div class="loading">
          <h3>No Data to Visualize</h3>
          <p>Add features and scores to see visualizations</p>
          <button class="btn btn-secondary" @click=${this.handleBack}>Back to Session</button>
        </div>
      `:d`
      <h2>Session Results: ${this.session.name}</h2>

      ${this.renderStatsOverview()}

      <div class="charts-grid">
        ${this.renderIceScoreChart()}
        ${this.renderComponentsComparison()}
        ${this.renderVarianceChart()}
        ${this.renderTierDistribution()}
      </div>

      <div class="action-buttons">
        <button class="btn btn-secondary" @click=${this.handleBack}>
          Back to Session
        </button>
      </div>
    `}renderStatsOverview(){if(!this.session)return"";const t=this.session.features.length,e=this.session.scores.length,s=new Set(this.session.scores.map(r=>r.scored_by)).size,i=t>0?(e/t).toFixed(1):"0";return d`
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">${t}</div>
          <div class="stat-label">Features</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${s}</div>
          <div class="stat-label">Team Members</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${e}</div>
          <div class="stat-label">Total Scores</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${i}</div>
          <div class="stat-label">Avg Scores/Feature</div>
        </div>
      </div>
    `}renderIceScoreChart(){if(!this.session)return"";const t=this.session.features.map(s=>{const i=this.session.aggregates.find(r=>r.feature_id===s.id);return{feature:s,aggregate:i}}).filter(s=>s.aggregate).sort((s,i)=>(i.aggregate?.avg_ice_score||0)-(s.aggregate?.avg_ice_score||0)),e=Math.max(...t.map(s=>s.aggregate?.avg_ice_score||0),1);return d`
      <div class="chart-card">
        <h3 class="chart-title">Average ICE Scores by Feature</h3>
        <div class="bar-chart">
          ${t.map(({feature:s,aggregate:i})=>{const r=i?.avg_ice_score||0,o=r/e*100;return d`
              <div class="bar-item">
                <div class="bar-label">${s.name}</div>
                <div class="bar-container">
                  <div class="bar-fill" style="width: ${o}%">
                    ${r>=100?r.toFixed(0):""}
                  </div>
                </div>
                <div class="bar-value">${r.toFixed(0)}</div>
              </div>
            `})}
        </div>
      </div>
    `}renderComponentsComparison(){if(!this.session)return"";const t=this.session.features.map(e=>{const s=this.session.aggregates.find(i=>i.feature_id===e.id);return{feature:e,aggregate:s}}).filter(e=>e.aggregate);return d`
      <div class="chart-card">
        <h3 class="chart-title">Score Components Breakdown</h3>
        <div class="scatter-plot">
          ${t.map(({feature:e,aggregate:s})=>{const i=this.getTierColor(s?.tier_name||"");return d`
              <div class="scatter-item" style="border-color: ${i}">
                <div class="scatter-name">${e.name}</div>
                <div class="scatter-metrics">
                  <div class="metric-badge">I: ${s?.avg_impact.toFixed(1)}</div>
                  <div class="metric-badge">C: ${s?.avg_confidence.toFixed(1)}</div>
                  <div class="metric-badge">E: ${s?.avg_effort.toFixed(1)}</div>
                </div>
              </div>
            `})}
        </div>
      </div>
    `}renderVarianceChart(){if(!this.session)return"";const t=this.session.features.map(s=>{const i=this.session.aggregates.find(r=>r.feature_id===s.id);return{feature:s,aggregate:i}}).filter(s=>s.aggregate&&s.aggregate.score_count>1).sort((s,i)=>(i.aggregate?.ice_stddev||0)-(s.aggregate?.ice_stddev||0));if(t.length===0)return d`
        <div class="chart-card">
          <h3 class="chart-title">Team Disagreement Analysis</h3>
          <p style="color: #6b7280; text-align: center; padding: 2rem;">
            Need at least 2 scores per feature to show disagreement metrics
          </p>
        </div>
      `;const e=Math.max(...t.map(s=>s.aggregate?.ice_stddev||0),1);return d`
      <div class="chart-card">
        <h3 class="chart-title">Team Disagreement Analysis (Standard Deviation)</h3>
        <div class="variance-chart">
          ${t.map(({feature:s,aggregate:i})=>{const r=i?.ice_stddev||0,o=r/e*100;let n="Low",p="#10b981";return r>150?(n="High",p="#ef4444"):r>75&&(n="Medium",p="#f59e0b"),d`
              <div class="variance-item">
                <div class="variance-label">${s.name}</div>
                <div class="variance-bar-container">
                  <div class="variance-indicator">
                    <div class="variance-marker" style="left: ${o}%"></div>
                  </div>
                  <div class="variance-value" style="color: ${p}">
                    ±${r.toFixed(0)} (${n})
                  </div>
                </div>
              </div>
            `})}
        </div>
      </div>
    `}renderTierDistribution(){if(!this.session)return"";const t={"Low Priority":0,"Medium Priority":0,"Good Candidate":0,"Strong Contender":0,"Top Priority":0};this.session.aggregates.forEach(s=>{t.hasOwnProperty(s.tier_name)&&t[s.tier_name]++});const e={"Low Priority":"#9ca3af","Medium Priority":"#f59e0b","Good Candidate":"#3b82f6","Strong Contender":"#8b5cf6","Top Priority":"#ef4444"};return d`
      <div class="chart-card">
        <h3 class="chart-title">Priority Tier Distribution</h3>
        <div class="tier-distribution">
          ${Object.entries(t).map(([s,i])=>d`
            <div class="tier-box" style="border-color: ${e[s]}; color: ${e[s]}">
              <div class="tier-count">${i}</div>
              <div class="tier-name">${s}</div>
            </div>
          `)}
        </div>
      </div>
    `}getTierColor(t){return{"Low Priority":"#9ca3af","Medium Priority":"#f59e0b","Good Candidate":"#3b82f6","Strong Contender":"#8b5cf6","Top Priority":"#ef4444"}[t]||"#9ca3af"}handleBack(){l.setStep("session-dashboard")}};Ve.styles=R`
    :host {
      display: block;
      max-width: 1400px;
      margin: 0 auto;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 2rem;
      text-align: center;
    }

    .charts-grid {
      display: grid;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .chart-card {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 0.75rem;
      padding: 2rem;
    }

    .chart-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1.5rem;
    }

    .bar-chart {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .bar-item {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .bar-label {
      min-width: 200px;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    .bar-container {
      flex: 1;
      height: 32px;
      background: #f3f4f6;
      border-radius: 0.375rem;
      overflow: hidden;
      position: relative;
    }

    .bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #3b82f6, #2563eb);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 0.5rem;
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      transition: width 0.3s ease;
    }

    .bar-value {
      min-width: 60px;
      text-align: right;
      font-size: 0.875rem;
      font-weight: 600;
      color: #1f2937;
    }

    .scatter-plot {
      display: grid;
      gap: 0.75rem;
    }

    .scatter-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;
      background: #f9fafb;
      border-radius: 0.5rem;
      border-left: 4px solid;
    }

    .scatter-name {
      flex: 1;
      font-weight: 500;
      color: #1f2937;
    }

    .scatter-metrics {
      display: flex;
      gap: 1rem;
      font-size: 0.875rem;
    }

    .metric-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      background: #e0f2fe;
      color: #0c4a6e;
      font-weight: 600;
    }

    .variance-chart {
      display: grid;
      gap: 1rem;
    }

    .variance-item {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .variance-label {
      min-width: 200px;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    .variance-bar-container {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .variance-indicator {
      width: 100%;
      height: 8px;
      background: linear-gradient(90deg, #10b981, #f59e0b, #ef4444);
      border-radius: 4px;
      position: relative;
    }

    .variance-marker {
      position: absolute;
      width: 3px;
      height: 20px;
      background: #1f2937;
      top: -6px;
      transform: translateX(-50%);
    }

    .variance-value {
      min-width: 80px;
      text-align: right;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .tier-distribution {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 1rem;
    }

    .tier-box {
      text-align: center;
      padding: 1.5rem 1rem;
      border-radius: 0.5rem;
      border: 2px solid;
    }

    .tier-count {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .tier-name {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 0.75rem;
      padding: 1.5rem;
      text-align: center;
    }

    .stat-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #6b7280;
      text-transform: uppercase;
      font-weight: 600;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .btn-secondary {
      background: white;
      color: #6b7280;
      border: 2px solid #d1d5db;
    }

    .btn-secondary:hover {
      background: #f9fafb;
    }

    .action-buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 2rem;
    }

    .loading {
      text-align: center;
      padding: 4rem 2rem;
      color: #6b7280;
    }

    @media (max-width: 768px) {
      .bar-label {
        min-width: 120px;
        font-size: 0.75rem;
      }

      .scatter-metrics {
        flex-direction: column;
        gap: 0.5rem;
      }

      .action-buttons {
        flex-direction: column;
      }
    }
  `;Ft([y()],Ve.prototype,"session",2);Ft([y()],Ve.prototype,"loading",2);Ve=Ft([M("ice-session-visualize")],Ve);var Ir=Object.defineProperty,Pr=Object.getOwnPropertyDescriptor,It=(t,e,s,i)=>{for(var r=i>1?void 0:i?Pr(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(i?n(e,s,r):n(r))||r);return i&&r&&Ir(e,s,r),r};let We=class extends T{constructor(){super(...arguments),this.loading=!0}connectedCallback(){super.connectedCallback(),this.loadSession()}async loadSession(){const t=l.getState();if(!t.currentSession){this.loading=!1;return}this.loading=!0;const e=await l.loadSessionWithDetails(t.currentSession.id);this.session=e||void 0,this.loading=!1}render(){return this.loading?d`<div class="loading">Loading session...</div>`:this.session?d`
      <h2>Export Session: ${this.session.name}</h2>

      <div class="export-options">
        ${this.renderExportCard("Consensus Summary","Export aggregated team consensus scores with variance metrics",["Feature names and descriptions","Average scores (Impact, Confidence, Effort, ICE)","Standard deviations","Score counts per feature","Tier assignments"],()=>this.exportConsensus())}

        ${this.renderExportCard("Individual Scores","Export all individual team member scores for detailed analysis",["All scorer names","Individual scores for each feature","Timestamps","Justifications","Per-user tier assignments"],()=>this.exportIndividual())}

        ${this.renderExportCard("Complete Report","Export everything: consensus, individual scores, and variance analysis",["All consensus data","All individual scores","Disagreement metrics","Complete feature breakdown","Session metadata"],()=>this.exportComplete())}
      </div>

      <div class="action-buttons">
        <button class="btn btn-secondary" @click=${this.handleBack}>
          Back to Session
        </button>
      </div>
    `:d`<div class="loading">No session selected</div>`}renderExportCard(t,e,s,i){return d`
      <div class="export-card" @click=${i}>
        <div class="export-title">${t}</div>
        <div class="export-description">${e}</div>
        <button class="btn btn-primary">Export as CSV</button>
        <div class="export-includes">
          <strong>Includes:</strong>
          <ul>
            ${s.map(r=>d`<li>${r}</li>`)}
          </ul>
        </div>
      </div>
    `}exportConsensus(){if(!this.session)return;const t=["Feature Name","Description","Avg Impact","Avg Confidence","Avg Effort","Avg ICE Score","Score Count","Impact StdDev","Confidence StdDev","Effort StdDev","ICE StdDev","Tier","Priority"],e=this.session.features.map(s=>{const i=this.session.aggregates.find(r=>r.feature_id===s.id);return i?[s.name,s.description||"",i.avg_impact.toFixed(2),i.avg_confidence.toFixed(2),i.avg_effort.toFixed(2),i.avg_ice_score.toFixed(2),i.score_count.toString(),i.impact_stddev?.toFixed(2)||"",i.confidence_stddev?.toFixed(2)||"",i.effort_stddev?.toFixed(2)||"",i.ice_stddev?.toFixed(2)||"",i.tier_name,i.tier_priority]:[s.name,s.description||"","","","","","0","","","","","",""]});this.downloadCSV(t,e,`${this.session.name}_consensus.csv`),l.showToast("Consensus data exported!","success")}exportIndividual(){if(!this.session)return;const t=["Feature Name","Scorer","Impact","Confidence","Effort","ICE Score","Tier","Priority","Justification","Scored At"],e=[];this.session.features.forEach(s=>{this.session.scores.filter(r=>r.feature_id===s.id).forEach(r=>{e.push([s.name,r.scored_by,r.impact.toFixed(2),r.confidence.toFixed(2),r.effort.toFixed(2),r.ice_score.toFixed(2),r.tier_name,r.tier_priority,r.justification||"",new Date(r.created_at).toISOString()])})}),this.downloadCSV(t,e,`${this.session.name}_individual_scores.csv`),l.showToast("Individual scores exported!","success")}exportComplete(){if(!this.session)return;const t=["Feature Name","Description","Scorer","Individual Impact","Individual Confidence","Individual Effort","Individual ICE","Individual Tier","Justification","Avg Impact","Avg Confidence","Avg Effort","Avg ICE","Impact StdDev","Confidence StdDev","Effort StdDev","ICE StdDev","Score Count","Consensus Tier","Scored At"],e=[];this.session.features.forEach(s=>{const i=this.session.aggregates.find(o=>o.feature_id===s.id);this.session.scores.filter(o=>o.feature_id===s.id).forEach(o=>{e.push([s.name,s.description||"",o.scored_by,o.impact.toFixed(2),o.confidence.toFixed(2),o.effort.toFixed(2),o.ice_score.toFixed(2),o.tier_name,o.justification||"",i?.avg_impact.toFixed(2)||"",i?.avg_confidence.toFixed(2)||"",i?.avg_effort.toFixed(2)||"",i?.avg_ice_score.toFixed(2)||"",i?.impact_stddev?.toFixed(2)||"",i?.confidence_stddev?.toFixed(2)||"",i?.effort_stddev?.toFixed(2)||"",i?.ice_stddev?.toFixed(2)||"",i?.score_count.toString()||"0",i?.tier_name||"",new Date(o.created_at).toISOString()])})}),this.downloadCSV(t,e,`${this.session.name}_complete_report.csv`),l.showToast("Complete report exported!","success")}downloadCSV(t,e,s){const i=h=>h.includes(",")||h.includes('"')||h.includes(`
`)?`"${h.replace(/"/g,'""')}"`:h,r=[t.map(i).join(","),...e.map(h=>h.map(i).join(","))].join(`
`),o=new Blob([r],{type:"text/csv;charset=utf-8;"}),n=document.createElement("a"),p=URL.createObjectURL(o);n.setAttribute("href",p),n.setAttribute("download",s),n.style.visibility="hidden",document.body.appendChild(n),n.click(),document.body.removeChild(n)}handleBack(){l.setStep("session-dashboard")}};We.styles=R`
    :host {
      display: block;
      max-width: 1200px;
      margin: 0 auto;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 2rem;
      text-align: center;
    }

    .export-options {
      display: grid;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .export-card {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 0.75rem;
      padding: 2rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .export-card:hover {
      border-color: #3b82f6;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }

    .export-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .export-description {
      color: #6b7280;
      margin-bottom: 1rem;
    }

    .export-includes {
      font-size: 0.875rem;
      color: #6b7280;
      margin-top: 1rem;
    }

    .export-includes ul {
      margin: 0.5rem 0 0 0;
      padding-left: 1.5rem;
    }

    .export-includes li {
      margin-bottom: 0.25rem;
    }

    .btn {
      padding: 0.875rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
      width: 100%;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
    }

    .btn-primary:hover {
      background: #2563eb;
    }

    .btn-secondary {
      background: white;
      color: #6b7280;
      border: 2px solid #d1d5db;
    }

    .btn-secondary:hover {
      background: #f9fafb;
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .loading {
      text-align: center;
      padding: 4rem 2rem;
      color: #6b7280;
    }

    @media (max-width: 768px) {
      .action-buttons {
        flex-direction: column;
      }
    }
  `;It([y()],We.prototype,"session",2);It([y()],We.prototype,"loading",2);We=It([M("ice-session-export")],We);var Or=Object.defineProperty,Tr=Object.getOwnPropertyDescriptor,Ye=(t,e,s,i)=>{for(var r=i>1?void 0:i?Tr(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(i?n(e,s,r):n(r))||r);return i&&r&&Or(e,s,r),r};let xe=class extends T{constructor(){super(...arguments),this.loading=!0,this.sessionId="",this.featureId=""}connectedCallback(){super.connectedCallback(),this.loadBreakdown()}async loadBreakdown(){const t=l.getState(),s=window.location.hash.match(/feature-breakdown\/([^/]+)\/([^/]+)/);if(s?(this.sessionId=s[1],this.featureId=s[2]):t.currentSession&&t.currentSessionFeature&&(this.sessionId=t.currentSession.id,this.featureId=t.currentSessionFeature.id),!this.sessionId||!this.featureId){this.loading=!1;return}this.loading=!0;const i=await l.getFeatureBreakdown(this.sessionId,this.featureId);this.breakdown=i||void 0,this.loading=!1}render(){return this.loading?d`<div class="loading">Loading feature breakdown...</div>`:this.breakdown?d`
      <div class="feature-header">
        <h2>${this.breakdown.feature.name}</h2>
        ${this.breakdown.feature.description?d`<p class="feature-description">${this.breakdown.feature.description}</p>`:""}
      </div>

      ${this.renderConsensusSection()}
      ${this.renderVarianceAnalysis()}
      ${this.renderIndividualScores()}

      <div class="action-buttons">
        <button class="btn btn-secondary" @click=${this.handleBack}>
          Back to Session
        </button>
      </div>
    `:this.renderEmptyState()}renderConsensusSection(){if(!this.breakdown)return"";const t=this.breakdown.aggregate;return d`
      <div class="consensus-section">
        <h3 class="consensus-title">
          Team Consensus (${t.score_count} ${t.score_count===1?"score":"scores"})
        </h3>
        <div class="consensus-grid">
          <div class="consensus-item">
            <div class="consensus-label">Impact</div>
            <div class="consensus-value">${t.avg_impact.toFixed(1)}</div>
            ${t.impact_stddev?d`
                  <div class="consensus-stddev">±${t.impact_stddev.toFixed(1)}</div>
                  ${this.renderRange(this.breakdown.individualScores,"impact")}
                `:""}
          </div>
          <div class="consensus-item">
            <div class="consensus-label">Confidence</div>
            <div class="consensus-value">${t.avg_confidence.toFixed(1)}</div>
            ${t.confidence_stddev?d`
                  <div class="consensus-stddev">±${t.confidence_stddev.toFixed(1)}</div>
                  ${this.renderRange(this.breakdown.individualScores,"confidence")}
                `:""}
          </div>
          <div class="consensus-item">
            <div class="consensus-label">Effort</div>
            <div class="consensus-value">${t.avg_effort.toFixed(1)}</div>
            ${t.effort_stddev?d`
                  <div class="consensus-stddev">±${t.effort_stddev.toFixed(1)}</div>
                  ${this.renderRange(this.breakdown.individualScores,"effort")}
                `:""}
          </div>
          <div class="consensus-item">
            <div class="consensus-label">ICE Score</div>
            <div class="consensus-value">${t.avg_ice_score.toFixed(0)}</div>
            ${t.ice_stddev?d`
                  <div class="consensus-stddev">±${t.ice_stddev.toFixed(0)}</div>
                  ${this.renderRange(this.breakdown.individualScores,"ice_score")}
                `:""}
          </div>
        </div>
      </div>
    `}renderRange(t,e){if(t.length===0)return"";const s=t.map(o=>o[e]),i=Math.min(...s),r=Math.max(...s);return d`
      <div class="consensus-range">
        Range: ${i.toFixed(e==="ice_score"?0:1)} - ${r.toFixed(e==="ice_score"?0:1)}
      </div>
    `}renderVarianceAnalysis(){if(!this.breakdown)return"";const t=this.breakdown.aggregate;if(t.score_count<2)return"";const e=(t.impact_stddev||0)/10,s=(t.confidence_stddev||0)/10,i=(t.effort_stddev||0)/10,r=(e+s+i)/3;let o="",n="",p="";return r>.25?(o="variance-high",n="⚠️",p="High Disagreement: Team members have significantly different opinions on this feature. Consider discussing to align understanding."):r>.15?(o="",n="⚡",p="Moderate Disagreement: Some variation in scores. This is normal, but worth reviewing if critical."):(o="variance-low",n="✓",p="Strong Consensus: Team members largely agree on the scoring for this feature."),d`
      <div class="variance-analysis ${o}">
        <h3 class="variance-title">${n} ${p.split(":")[0]}</h3>
        <p style="margin: 0; color: inherit; opacity: 0.9;">
          ${p.split(":")[1]}
        </p>
      </div>
    `}renderIndividualScores(){if(!this.breakdown)return"";const t=this.breakdown.individualScores;if(t.length===0)return d`
        <div class="empty-state">
          <h3>No Scores Yet</h3>
          <p>No one has scored this feature yet</p>
        </div>
      `;const e=[...t].sort((s,i)=>new Date(i.created_at).getTime()-new Date(s.created_at).getTime());return d`
      <div class="scores-section">
        <h3 class="scores-title">
          Individual Scores
          <span class="score-count">(${t.length} total)</span>
        </h3>
        <div class="scores-grid">
          ${e.map(s=>this.renderScoreCard(s))}
        </div>
      </div>
    `}renderScoreCard(t){const e=new Date(t.created_at),s=e.toLocaleDateString()+" "+e.toLocaleTimeString();return d`
      <div class="score-card">
        <div class="score-header">
          <div class="scorer-name">👤 ${t.scored_by}</div>
          <div class="score-date">${s}</div>
        </div>

        <div class="score-metrics">
          <div class="metric-item">
            <div class="metric-label">Impact</div>
            <div class="metric-value">${t.impact.toFixed(1)}</div>
          </div>
          <div class="metric-item">
            <div class="metric-label">Confidence</div>
            <div class="metric-value">${t.confidence.toFixed(1)}</div>
          </div>
          <div class="metric-item">
            <div class="metric-label">Effort</div>
            <div class="metric-value">${t.effort.toFixed(1)}</div>
          </div>
          <div class="metric-item ice-score-highlight">
            <div class="metric-label">ICE Score</div>
            <div class="metric-value">${t.ice_score.toFixed(0)}</div>
          </div>
        </div>

        <div class="score-tier" style="background-color: ${this.getTierColor(t.tier_name)};">
          ${t.tier_name}
        </div>

        ${t.justification?d`
              <div class="justification">
                <div class="justification-label">Justification:</div>
                <div class="justification-text">${t.justification}</div>
              </div>
            `:""}
      </div>
    `}getTierColor(t){return{"Low Priority":"#f3f4f6","Medium Priority":"#fef3c7","Good Candidate":"#dbeafe","Strong Contender":"#e9d5ff","Top Priority":"#fee2e2"}[t]||"#f3f4f6"}renderEmptyState(){return d`
      <div class="empty-state">
        <h3>Feature Not Found</h3>
        <p>Could not load feature breakdown</p>
        <button class="btn btn-secondary" @click=${this.handleBack}>
          Back to Session
        </button>
      </div>
    `}handleBack(){l.setStep("session-dashboard")}};xe.styles=R`
    :host {
      display: block;
      max-width: 1200px;
      margin: 0 auto;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .feature-header {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 2px solid #e5e7eb;
    }

    .feature-description {
      color: #6b7280;
      margin-top: 0.5rem;
      font-size: 1rem;
    }

    .consensus-section {
      background: #eff6ff;
      border: 2px solid #bfdbfe;
      border-radius: 0.75rem;
      padding: 2rem;
      margin-bottom: 2rem;
    }

    .consensus-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e40af;
      margin-bottom: 1.5rem;
    }

    .consensus-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1.5rem;
    }

    .consensus-item {
      text-align: center;
    }

    .consensus-label {
      font-size: 0.75rem;
      color: #1e40af;
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .consensus-value {
      font-size: 2rem;
      font-weight: 700;
      color: #1e40af;
      margin-bottom: 0.25rem;
    }

    .consensus-stddev {
      font-size: 0.875rem;
      color: #3b82f6;
    }

    .consensus-range {
      font-size: 0.75rem;
      color: #6b7280;
      margin-top: 0.25rem;
    }

    .scores-section {
      margin-bottom: 2rem;
    }

    .scores-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #374151;
      margin-bottom: 1rem;
    }

    .score-count {
      color: #6b7280;
      font-size: 0.875rem;
      margin-left: 0.5rem;
    }

    .scores-grid {
      display: grid;
      gap: 1rem;
    }

    .score-card {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 0.75rem;
      padding: 1.5rem;
      transition: all 0.2s;
    }

    .score-card:hover {
      border-color: #3b82f6;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }

    .score-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .scorer-name {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
    }

    .score-date {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .score-metrics {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .metric-item {
      text-align: center;
      padding: 0.75rem;
      background: #f9fafb;
      border-radius: 0.5rem;
    }

    .metric-label {
      font-size: 0.75rem;
      color: #6b7280;
      text-transform: uppercase;
      margin-bottom: 0.25rem;
    }

    .metric-value {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1f2937;
    }

    .ice-score-highlight {
      background: #3b82f6;
      color: white;
    }

    .score-tier {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .justification {
      background: #f9fafb;
      padding: 1rem;
      border-radius: 0.5rem;
      border-left: 4px solid #3b82f6;
    }

    .justification-label {
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
    }

    .justification-text {
      color: #6b7280;
      line-height: 1.6;
      font-size: 0.875rem;
    }

    .variance-analysis {
      background: #fef3c7;
      border: 2px solid #fde68a;
      border-radius: 0.75rem;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }

    .variance-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #92400e;
      margin-bottom: 1rem;
    }

    .variance-high {
      background: #fef2f2;
      border-color: #fecaca;
    }

    .variance-high .variance-title {
      color: #991b1b;
    }

    .variance-low {
      background: #f0fdf4;
      border-color: #bbf7d0;
    }

    .variance-low .variance-title {
      color: #166534;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .btn-secondary {
      background: white;
      color: #6b7280;
      border: 2px solid #d1d5db;
    }

    .btn-secondary:hover {
      background: #f9fafb;
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .loading,
    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #6b7280;
    }

    @media (max-width: 768px) {
      .consensus-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .score-metrics {
        grid-template-columns: repeat(2, 1fr);
      }

      .action-buttons {
        flex-direction: column;
      }
    }
  `;Ye([y()],xe.prototype,"breakdown",2);Ye([y()],xe.prototype,"loading",2);Ye([y()],xe.prototype,"sessionId",2);Ye([y()],xe.prototype,"featureId",2);xe=Ye([M("ice-feature-breakdown")],xe);var Dr=Object.defineProperty,zr=Object.getOwnPropertyDescriptor,cs=(t,e,s,i)=>{for(var r=i>1?void 0:i?zr(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(i?n(e,s,r):n(r))||r);return i&&r&&Dr(e,s,r),r};let at=class extends T{async connectedCallback(){super.connectedCallback(),this.appState=l.getState(),l.subscribe(t=>{this.appState=t})}render(){return d`
      <div class="container">
        ${this.renderProgressBar()}
        <div class="card">
          ${this.renderCurrentStep()}
        </div>
      </div>

      <!-- Toast notifications -->
      <ice-toast-container></ice-toast-container>

      <!-- Confirm dialog -->
      <ice-confirm-container></ice-confirm-container>
    `}renderProgressBar(){const t=["feature-input","impact-intro","impact-questions","confidence-intro","confidence-questions","effort-intro","effort-questions","justification","results"],e=t.indexOf(this.appState.currentStep);if(e===-1)return"";const s=(e+1)/t.length*100;return d`
      <div class="progress-bar" role="progressbar" aria-valuenow="${s}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-fill" style="width: ${s}%"></div>
      </div>
    `}renderCurrentStep(){switch(this.appState.currentStep){case"landing":return d`<ice-landing-page></ice-landing-page>`;case"feature-input":return d`<ice-feature-input></ice-feature-input>`;case"batch-upload":return d`<ice-bulk-upload></ice-bulk-upload>`;case"batch-list":return d`<ice-batch-list></ice-batch-list>`;case"impact-intro":return d`<ice-illustration-break section="impact"></ice-illustration-break>`;case"impact-questions":return d`<ice-question-section section="impact"></ice-question-section>`;case"confidence-intro":return d`<ice-illustration-break section="confidence"></ice-illustration-break>`;case"confidence-questions":return d`<ice-question-section section="confidence"></ice-question-section>`;case"effort-intro":return d`<ice-illustration-break section="effort"></ice-illustration-break>`;case"effort-questions":return d`<ice-question-section section="effort"></ice-question-section>`;case"justification":return d`<ice-justification-input></ice-justification-input>`;case"results":return d`<ice-results-screen></ice-results-screen>`;case"export":return d`<ice-export-manager></ice-export-manager>`;case"session-create":return d`<ice-session-create></ice-session-create>`;case"session-list":return d`<ice-session-list></ice-session-list>`;case"session-dashboard":return d`<ice-session-dashboard></ice-session-dashboard>`;case"session-visualize":return d`<ice-session-visualize></ice-session-visualize>`;case"session-export":return d`<ice-session-export></ice-session-export>`;case"feature-breakdown":return d`<ice-feature-breakdown></ice-feature-breakdown>`;default:return d`<ice-landing-page></ice-landing-page>`}}};at.styles=R`
    :host {
      display: block;
      min-height: 100vh;
      background: #f8fafc;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .card {
      background: white;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      padding: 3rem;
      min-height: 500px;
      display: flex;
      flex-direction: column;
    }

    .progress-bar {
      width: 100%;
      height: 6px;
      background: #e2e8f0;
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 2rem;
    }

    .progress-fill {
      height: 100%;
      background: #3b82f6;
      transition: width 0.3s ease;
    }

    @media (max-width: 640px) {
      .container {
        padding: 1rem 0.5rem;
      }

      .card {
        padding: 1.5rem;
      }
    }
  `;cs([Bs({context:js}),y()],at.prototype,"appState",2);at=cs([M("ice-scorecard-app")],at);var Nr=Object.defineProperty,Br=Object.getOwnPropertyDescriptor,Qe=(t,e,s,i)=>{for(var r=i>1?void 0:i?Br(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(i?n(e,s,r):n(r))||r);return i&&r&&Nr(e,s,r),r};let we=class extends T{constructor(){super(...arguments),this.dragActive=!1,this.uploading=!1,this.error="",this.scoredBy="PM"}render(){return d`
      <div class="upload-container">
        <h2>Bulk Upload Features</h2>
        <p class="description">
          Upload a CSV file with multiple features to score them in batch mode.
        </p>

        ${this.error?d`<div class="error">${this.error}</div>`:""}

        <div class="scorer-input">
          <label for="scorer">Who's scoring?</label>
          <input
            id="scorer"
            type="text"
            placeholder="Enter your name or team"
            .value=${this.scoredBy}
            @input=${this.handleScorerInput}
            maxlength="50"
          />
        </div>

        <div
          class="upload-zone ${this.dragActive?"drag-active":""}"
          @click=${this.handleZoneClick}
          @dragover=${this.handleDragOver}
          @dragleave=${this.handleDragLeave}
          @drop=${this.handleDrop}
        >
          <div class="upload-icon">📁</div>
          <div class="upload-title">
            ${this.uploading?"Processing...":"Drop CSV file here"}
          </div>
          <div class="upload-hint">or click to browse</div>
          <input
            type="file"
            accept=".csv"
            class="file-input"
            @change=${this.handleFileSelect}
            ?disabled=${this.uploading}
          />
        </div>

        <div class="format-example">
          <h3>CSV Format Example:</h3>
          <code>name,description</code>
          <code>"Dark Mode Toggle","Add dark theme option to settings"</code>
          <code>"Export to PDF","Allow users to export reports as PDF"</code>
          <p>
            <strong>Required:</strong> "name" column<br />
            <strong>Optional:</strong> "description" column for additional context
          </p>
        </div>

        <div class="button-group">
          <button class="btn btn-secondary" @click=${this.handleBack}>
            Back to Home
          </button>
        </div>
      </div>
    `}handleScorerInput(t){const e=t.target;this.scoredBy=e.value||"PM"}handleZoneClick(){if(this.uploading)return;this.shadowRoot?.querySelector(".file-input")?.click()}handleDragOver(t){t.preventDefault(),t.stopPropagation(),this.dragActive=!0}handleDragLeave(t){t.preventDefault(),t.stopPropagation(),this.dragActive=!1}handleDrop(t){t.preventDefault(),t.stopPropagation(),this.dragActive=!1;const e=t.dataTransfer?.files;e&&e.length>0&&this.processFile(e[0])}handleFileSelect(t){const s=t.target.files;s&&s.length>0&&this.processFile(s[0])}processFile(t){if(this.error="",!t.name.endsWith(".csv")){this.error="Please upload a CSV file";return}if(!this.scoredBy.trim()){this.error="Please enter your name before uploading";return}this.uploading=!0,rs.parse(t,{header:!0,skipEmptyLines:!0,complete:e=>{this.handleParseComplete(e)},error:e=>{this.error=`Failed to parse CSV: ${e.message}`,this.uploading=!1}})}async handleParseComplete(t){if(this.uploading=!1,!t.data||t.data.length===0){this.error="CSV file is empty";return}const e=t.data[0];if(!e.name&&!e.Name){this.error='CSV must have a "name" column';return}const i=l.getState().currentSession;if(i){const r=t.data.map(n=>({name:(n.name||n.Name||"").trim(),description:(n.description||n.Description||"").trim()||void 0})).filter(n=>n.name.length>0);if(r.length===0){this.error="No valid features found in CSV";return}this.uploading=!0;const o=await l.addFeaturesToSession(i.id,r);this.uploading=!1,o.length>0&&l.setStep("session-dashboard")}else{const r=t.data.map((o,n)=>({id:`batch-${Date.now()}-${n}`,name:(o.name||o.Name||"").trim(),description:(o.description||o.Description||"").trim()||void 0,status:"pending"})).filter(o=>o.name.length>0);if(r.length===0){this.error="No valid features found in CSV";return}l.startBatchScoring(r,this.scoredBy.trim())}}handleBack(){l.setStep("landing")}};we.styles=R`
    :host {
      display: block;
    }

    .upload-container {
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .description {
      color: #6b7280;
      font-size: 1rem;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .scorer-input {
      margin-bottom: 2rem;
    }

    .scorer-input label {
      display: block;
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
      text-align: left;
    }

    .scorer-input input {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 1rem;
    }

    .scorer-input input:focus {
      outline: none;
      border-color: #3b82f6;
    }

    .upload-zone {
      border: 3px dashed #d1d5db;
      border-radius: 1rem;
      padding: 3rem 2rem;
      background: white;
      transition: all 0.3s;
      cursor: pointer;
      margin-bottom: 2rem;
    }

    .upload-zone:hover,
    .upload-zone.drag-active {
      border-color: #3b82f6;
      background: #eff6ff;
    }

    .upload-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .upload-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .upload-hint {
      color: #6b7280;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .file-input {
      display: none;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: #2563eb;
    }

    .btn-secondary {
      background: white;
      color: #6b7280;
      border: 2px solid #d1d5db;
      margin-left: 1rem;
    }

    .btn-secondary:hover {
      background: #f9fafb;
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .error {
      background: #fef2f2;
      border: 2px solid #ef4444;
      color: #dc2626;
      padding: 1rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
    }

    .format-example {
      background: #f9fafb;
      border: 2px solid #e5e7eb;
      border-radius: 0.5rem;
      padding: 1.5rem;
      text-align: left;
      margin-bottom: 2rem;
    }

    .format-example h3 {
      font-size: 1rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.75rem;
    }

    .format-example code {
      display: block;
      background: white;
      padding: 0.75rem;
      border-radius: 0.375rem;
      font-family: monospace;
      font-size: 0.875rem;
      color: #374151;
      margin-bottom: 0.5rem;
      overflow-x: auto;
    }

    .format-example p {
      color: #6b7280;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .button-group {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }

    @media (max-width: 768px) {
      .upload-container {
        padding: 1rem;
      }

      .upload-zone {
        padding: 2rem 1rem;
      }

      .button-group {
        flex-direction: column;
      }

      .btn-secondary {
        margin-left: 0;
        margin-top: 1rem;
      }
    }
  `;Qe([y()],we.prototype,"dragActive",2);Qe([y()],we.prototype,"uploading",2);Qe([y()],we.prototype,"error",2);Qe([y()],we.prototype,"scoredBy",2);we=Qe([M("ice-bulk-upload")],we);var jr=Object.defineProperty,Rr=Object.getOwnPropertyDescriptor,pt=(t,e,s,i)=>{for(var r=i>1?void 0:i?Rr(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(i?n(e,s,r):n(r))||r);return i&&r&&jr(e,s,r),r};let Pe=class extends T{constructor(){super(...arguments),this.features=[],this.currentIndex=0,this.scoredBy="PM"}connectedCallback(){super.connectedCallback(),this.loadBatchData(),l.subscribe(()=>this.loadBatchData())}loadBatchData(){const t=l.getState();t.batchScoring&&(this.features=t.batchScoring.features,this.currentIndex=t.batchScoring.currentFeatureIndex,this.scoredBy=t.batchScoring.scoredBy)}render(){if(this.features.length===0)return this.renderEmptyState();const t=this.features.filter(o=>o.status==="completed").length,e=this.features.filter(o=>o.status==="skipped").length,s=this.features.filter(o=>o.status==="pending").length,i=this.features.length,r=t/i*100;return d`
      <div class="batch-container">
        <h2>Batch Scoring</h2>
        <div class="progress-info">
          ${t} scored · ${e} skipped · ${s} pending
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width: ${r}%"></div>
        </div>

        <div class="feature-list">${this.features.map((o,n)=>this.renderFeatureItem(o,n))}</div>

        <div class="action-buttons">
          ${s===0?d`
                <button class="btn btn-primary" @click=${this.handleViewResults}>
                  View All Results (${t} scored)
                </button>
              `:d`
                <button class="btn btn-primary" @click=${this.handleScoreCurrent}>
                  Score Current Feature
                </button>
              `}
          <button class="btn btn-secondary" @click=${this.handleCancel}>Cancel Batch</button>
        </div>
      </div>
    `}renderFeatureItem(t,e){const s=e===this.currentIndex,i=t.status==="completed",r=t.status==="skipped",o=t.status==="pending",n=o||r,p=s&&o;let h="⏳",f="";return i?(h="✅",f="completed"):r?(h="⏭️",f="skipped"):s&&(h="👉",f="current"),d`
      <div class="feature-item ${f}">
        <div class="feature-status">${h}</div>
        <div class="feature-content">
          <div class="feature-name">${t.name}</div>
          ${t.description?d`<div class="feature-description">${t.description}</div>`:""}
        </div>
        ${n?d`
              <div class="feature-actions">
                <button
                  class="btn btn-primary"
                  @click=${()=>this.handleScoreFeature(e)}
                >
                  ${r?"Re-score":"Score"}
                </button>
                ${p?d`
                      <button
                        class="btn btn-secondary"
                        @click=${this.handleSkip}
                        title="Skip this feature"
                      >
                        Skip
                      </button>
                    `:""}
              </div>
            `:""}
      </div>
    `}renderEmptyState(){return d`
      <div class="empty-state">
        <h3>No features to score</h3>
        <p>Upload a CSV file to start batch scoring.</p>
        <button class="btn btn-primary" @click=${this.handleBack}>Upload Features</button>
      </div>
    `}handleScoreCurrent(){l.startScoringCurrentBatchFeature()}handleScoreFeature(t){l.startScoringBatchFeatureByIndex(t)}handleSkip(){l.skipCurrentBatchFeature(),l.showToast("Feature skipped","info",2e3)}handleViewResults(){l.setStep("export")}async handleCancel(){await l.showConfirm("Cancel Batch Scoring","Cancel batch scoring? All completed scores will be saved, but the batch session will end.",{type:"warning",confirmText:"Cancel Batch",cancelText:"Continue Scoring"})&&(l.cancelBatchScoring(),l.showToast("Batch scoring cancelled","info"))}handleBack(){l.setStep("batch-upload")}};Pe.styles=R`
    :host {
      display: block;
    }

    .batch-container {
      max-width: 800px;
      margin: 0 auto;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.5rem;
      text-align: center;
    }

    .progress-info {
      text-align: center;
      color: #6b7280;
      font-size: 1rem;
      margin-bottom: 2rem;
    }

    .progress-bar-container {
      background: #e5e7eb;
      height: 8px;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 2rem;
    }

    .progress-bar-fill {
      background: #3b82f6;
      height: 100%;
      transition: width 0.3s;
    }

    .feature-list {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 0.75rem;
      overflow: hidden;
      margin-bottom: 2rem;
    }

    .feature-item {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #f3f4f6;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .feature-item:last-child {
      border-bottom: none;
    }

    .feature-item.current {
      background: #eff6ff;
      border-left: 4px solid #3b82f6;
    }

    .feature-item.completed {
      background: #f0fdf4;
    }

    .feature-item.skipped {
      background: #fef3c7;
      opacity: 0.8;
    }

    .feature-status {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .feature-content {
      flex: 1;
      min-width: 0;
    }

    .feature-name {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.25rem;
      word-wrap: break-word;
    }

    .feature-description {
      color: #6b7280;
      font-size: 0.875rem;
      line-height: 1.4;
    }

    .feature-actions {
      display: flex;
      gap: 0.5rem;
      flex-shrink: 0;
    }

    .btn {
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
      white-space: nowrap;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: #2563eb;
    }

    .btn-secondary {
      background: white;
      color: #6b7280;
      border: 2px solid #d1d5db;
    }

    .btn-secondary:hover {
      background: #f9fafb;
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .action-buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .action-buttons .btn {
      padding: 0.875rem 1.5rem;
      font-size: 1rem;
    }

    .empty-state {
      text-align: center;
      padding: 3rem 1rem;
      color: #6b7280;
    }

    @media (max-width: 768px) {
      .batch-container {
        padding: 1rem;
      }

      .feature-item {
        flex-direction: column;
        align-items: flex-start;
      }

      .feature-actions {
        width: 100%;
      }

      .feature-actions .btn {
        flex: 1;
      }

      .action-buttons {
        flex-direction: column;
      }

      .action-buttons .btn {
        width: 100%;
      }
    }
  `;pt([y()],Pe.prototype,"features",2);pt([y()],Pe.prototype,"currentIndex",2);pt([y()],Pe.prototype,"scoredBy",2);Pe=pt([M("ice-batch-list")],Pe);console.log("ICE Scorecard App initialized");
