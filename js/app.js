const CATS={phones:["Phones","📱","#dfe7ff"],laptops:["Laptops","💻","#e3f3e6"],audio:["Audio","🎧","#ffe9d6"],wearables:["Wearables","⌚","#f3e1f7"],cameras:["Cameras","📷","#fff3c4"]};
const P=[
["phones","Nova X1",699,4.6,"6.4-inch OLED, 50 MP camera, two-day battery."],
["phones","Kite Air 5G",449,4.3,"Light 5G phone with a bright 120 Hz display."],
["phones","Orbit Fold",1199,4.5,"Folding screen that opens to a 7.6-inch tablet."],
["laptops","Slate Pro 14",1299,4.7,"14-inch aluminium laptop, 16 GB RAM, 1 TB SSD."],
["laptops","Breeze 13",799,4.2,"Fanless 13-inch ultrabook for travel and study."],
["laptops","Vector G16",1699,4.6,"16-inch gaming laptop with a 165 Hz screen."],
["audio","Pulse ANC Headphones",249,4.6,"Over-ear noise cancelling, 40-hour battery."],
["audio","Drip Buds",89,4.1,"Compact wireless earbuds with a pocket case."],
["audio","Bar Mini Speaker",129,4.4,"Water-resistant Bluetooth speaker, 18-hour play time."],
["wearables","Tempo Watch S",299,4.5,"Fitness watch with GPS, heart-rate and sleep tracking."],
["wearables","Loop Band 3",59,4.0,"Slim activity band with a 14-day battery."],
["wearables","Halo Ring",279,4.2,"Smart ring that tracks sleep and recovery."],
["cameras","Frame Z50",899,4.7,"Mirrorless 24 MP camera with 4K video."],
["cameras","Snap Go Action",199,4.3,"Waterproof action camera with image stabilization."],
["cameras","Lumen Instant",129,3.9,"Instant print camera with a flash and selfie mirror."]
].map((a,i)=>({id:i+1,cat:a[0],name:a[1],price:a[2],rating:a[3],desc:a[4]}));
const $=s=>document.querySelector(s),app=$("#app");
const ld=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}};
const sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
let cart=ld("tz_cart",{}),wish=ld("tz_wish",[]),f={q:"",cat:"all",max:2000,sort:"pop"};
const $$=n=>"$"+n.toLocaleString("en-US");
const prod=id=>P.find(p=>p.id==id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function counts(){$("#cc").textContent=Object.values(cart).reduce((a,b)=>a+b,0);$("#wc").textContent=wish.length}
function card(p){const c=CATS[p.cat],on=wish.includes(p.id);
return `<article class="card"><button class="heart ${on?"on":""}" data-act="wish" data-id="${p.id}" aria-label="${on?"Remove from":"Add to"} wishlist">${on?"♥":"♡"}</button>
<a class="img" style="background:${c[2]}" href="#/p/${p.id}" aria-label="${esc(p.name)}">${c[1]}</a>
<div class="in"><h3><a href="#/p/${p.id}">${esc(p.name)}</a></h3><div class="mut">${c[0]} · ★ ${p.rating}</div>
<div class="row"><span class="price">${$$(p.price)}</span><button class="btn" data-act="add" data-id="${p.id}">Add to cart</button></div></div></article>`}
function home(){const top=[...P].sort((a,b)=>b.rating-a.rating).slice(0,4);
app.innerHTML=`<section class="hero"><div><h1>Electronics that earn their place on your desk.</h1><p>Phones, laptops, audio and more. Filter by price, sort by rating, and check out in under a minute.</p><p><a class="btn" style="background:var(--hi);color:#111" href="#/shop">Shop all products</a></p></div><div class="big" aria-hidden="true">🎧</div></section>
<h2 class="sec">Shop by category</h2><div class="cats">${Object.entries(CATS).map(([k,c])=>`<a class="cat" href="#/shop/${k}"><span>${c[1]}</span>${c[0]}</a>`).join("")}</div>
<h2 class="sec">Top rated</h2><div class="grid">${top.map(card).join("")}</div>`}
function shop(cat){if(cat)f.cat=cat;else if(f.cat!=="all"&&location.hash==="#/shop")f.cat="all";
app.innerHTML=`<h1>${f.cat==="all"?"All products":CATS[f.cat][0]}</h1>
<div class="tools"><label>Search<input id="fq" type="search" value="${esc(f.q)}" placeholder="Name or keyword"></label>
<label>Category<select id="fc"><option value="all">All</option>${Object.entries(CATS).map(([k,c])=>`<option value="${k}" ${f.cat===k?"selected":""}>${c[0]}</option>`).join("")}</select></label>
<label>Max price: <span id="fmv">${$$(f.max)}</span><input id="fm" type="range" min="50" max="2000" step="50" value="${f.max}"></label>
<label>Sort by<select id="fs">${[["pop","Featured"],["lo","Price: low to high"],["hi","Price: high to low"],["rt","Rating"]].map(o=>`<option value="${o[0]}" ${f.sort===o[0]?"selected":""}>${o[1]}</option>`).join("")}</select></label></div>
<p class="mut" id="fn"></p><div class="grid" id="fg"></div>`;
const upd=()=>{let r=P.filter(p=>(f.cat==="all"||p.cat===f.cat)&&p.price<=f.max&&(p.name+" "+p.desc+" "+CATS[p.cat][0]).toLowerCase().includes(f.q.toLowerCase()));
if(f.sort==="lo")r.sort((a,b)=>a.price-b.price);if(f.sort==="hi")r.sort((a,b)=>b.price-a.price);if(f.sort==="rt")r.sort((a,b)=>b.rating-a.rating);
$("#fn").textContent=r.length+" product"+(r.length==1?"":"s");
$("#fg").innerHTML=r.length?r.map(card).join(""):'<div class="empty" style="grid-column:1/-1">No products match. Try a higher max price or clear the search.</div>'};
$("#fq").oninput=e=>{f.q=e.target.value;upd()};
$("#fc").onchange=e=>{f.cat=e.target.value;upd();document.querySelector("h1").textContent=f.cat==="all"?"All products":CATS[f.cat][0]};
$("#fm").oninput=e=>{f.max=+e.target.value;$("#fmv").textContent=$$(f.max);upd()};
$("#fs").onchange=e=>{f.sort=e.target.value;upd()};upd()}
function detail(id){const p=prod(id);if(!p)return nf();const c=CATS[p.cat],rel=P.filter(x=>x.cat===p.cat&&x.id!==p.id);
app.innerHTML=`<p><a href="#/shop/${p.cat}">← ${c[0]}</a></p><section class="pd"><div class="img" style="background:${c[2]}">${c[1]}</div>
<div><h1>${esc(p.name)}</h1><div class="mut">★ ${p.rating} rating · In stock</div><div class="price">${$$(p.price)}</div><p>${esc(p.desc)}</p>
<ul class="mut"><li>Free shipping over $500</li><li>30-day returns</li><li>1-year warranty</li></ul>
<div class="acts"><button class="btn" data-act="add" data-id="${p.id}">Add to cart</button><button class="btn alt" data-act="wish" data-id="${p.id}">${wish.includes(p.id)?"♥ In wishlist":"♡ Add to wishlist"}</button></div></div></section>
<h2 class="sec">More in ${c[0]}</h2><div class="grid">${rel.map(card).join("")}</div>`}
function wl(){const r=wish.map(prod);app.innerHTML=`<h1>Wishlist</h1>`+(r.length?`<div class="grid" style="margin-top:14px">${r.map(card).join("")}</div>`:`<div class="empty">Your wishlist is empty. Tap the heart on any product to save it.<p><a class="btn" href="#/shop">Browse products</a></p></div>`)}
const tot=()=>Object.entries(cart).reduce((s,[i,q])=>s+prod(i).price*q,0);
function ct(){const e=Object.entries(cart);if(!e.length){app.innerHTML=`<h1>Cart</h1><div class="empty">Your cart is empty.<p><a class="btn" href="#/shop">Browse products</a></p></div>`;return}
const s=tot(),sh=s>500?0:15;
app.innerHTML=`<h1 style="margin-bottom:16px">Cart</h1><div class="two"><div class="tbl">${e.map(([i,q])=>{const p=prod(i);return `<div class="li"><div class="t">${CATS[p.cat][1]}</div><div><a href="#/p/${i}"><b>${esc(p.name)}</b></a><div class="mut">${$$(p.price)} each</div><button class="btn alt" style="padding:2px 8px;margin-top:4px" data-act="rm" data-id="${i}">Remove</button></div>
<div class="qty"><button data-act="dec" data-id="${i}" aria-label="Decrease">−</button><span>${q}</span><button data-act="add" data-id="${i}" aria-label="Increase">+</button></div><b class="tot">${$$(p.price*q)}</b></div>`}).join("")}</div>
<div class="sum"><h2 style="margin-bottom:10px">Summary</h2><div><span>Subtotal</span><span>${$$(s)}</span></div><div><span>Shipping</span><span>${sh?$$(sh):"Free"}</span></div><div><b>Total</b><b>${$$(s+sh)}</b></div><p><a class="btn" style="width:100%;text-align:center" href="#/checkout">Go to checkout</a></p></div></div>`}
function co(){if(!Object.keys(cart).length){location.hash="#/cart";return}const s=tot(),sh=s>500?0:15;
app.innerHTML=`<div class="steps"><span>Cart</span>›<b>Checkout</b>›<span>Confirmation</span></div><h1 style="margin-bottom:16px">Checkout</h1><div class="two">
<form class="f sum" id="cf"><label>Full name<input name="n" required autocomplete="name"></label><label>Email<input name="e" type="email" required autocomplete="email"></label><label>Shipping address<input name="a" required autocomplete="street-address"></label>
<label>Payment method<select name="p"><option>Cash on delivery</option><option>Card (demo)</option><option>UPI (demo)</option></select></label><button class="btn">Place order · ${$$(s+sh)}</button></form>
<div class="sum"><h2 style="margin-bottom:10px">Your items</h2>${Object.entries(cart).map(([i,q])=>`<div><span>${esc(prod(i).name)} × ${q}</span><span>${$$(prod(i).price*q)}</span></div>`).join("")}<div><span>Shipping</span><span>${sh?$$(sh):"Free"}</span></div><div><b>Total</b><b>${$$(s+sh)}</b></div></div></div>`;
$("#cf").onsubmit=e=>{e.preventDefault();const d=new FormData(e.target),id="TZ"+Date.now().toString().slice(-7);
sv("tz_order",{id,name:d.get("n"),email:d.get("e"),addr:d.get("a"),pay:d.get("p"),total:s+sh,items:Object.entries(cart).map(([i,q])=>[prod(i).name,q])});cart={};sv("tz_cart",cart);counts();location.hash="#/done/"+id}}
function done(id){const o=ld("tz_order",null);if(!o||o.id!==id)return nf();
app.innerHTML=`<div class="steps"><span>Cart</span>›<span>Checkout</span>›<b>Confirmation</b></div><div class="sum" style="max-width:560px;margin:0 auto;text-align:center"><div class="ok">✓</div><h1>Order placed</h1><p>Thanks, ${esc(o.name)}. Your order <b>${o.id}</b> will ship to ${esc(o.addr)}. A receipt goes to ${esc(o.email)}.</p>
<div style="text-align:left">${o.items.map(i=>`<div><span>${esc(i[0])} × ${i[1]}</span></div>`).join("")}<div><b>Total (${esc(o.pay)})</b><b>${$$(o.total)}</b></div></div><p><a class="btn" href="#/shop">Continue shopping</a></p></div>`}
const nf=()=>app.innerHTML=`<div class="empty"><h1>Page not found</h1><p><a class="btn" href="#/">Back to home</a></p></div>`;
function route(){const h=location.hash.slice(2).split("/"),r=h[0]||"";window.scrollTo(0,0);
({"":home,shop:()=>shop(h[1]),p:()=>detail(h[1]),wishlist:wl,cart:ct,checkout:co,done:()=>done(h[1])}[r]||nf)();counts()}
document.addEventListener("click",e=>{const b=e.target.closest("[data-act]");if(!b)return;const id=+b.dataset.id,a=b.dataset.act;
if(a==="add")cart[id]=(cart[id]||0)+1;
if(a==="dec"){cart[id]=(cart[id]||1)-1;if(cart[id]<1)delete cart[id]}
if(a==="rm")delete cart[id];
if(a==="wish")wish=wish.includes(id)?wish.filter(x=>x!==id):[...wish,id];
sv("tz_cart",cart);sv("tz_wish",wish);counts();
if(a==="add"&&!location.hash.startsWith("#/cart")){b.textContent="Added ✓";setTimeout(()=>b.textContent="Add to cart",1200)}
else if(a==="wish"&&!/^#\/(wishlist|p\/)/.test(location.hash)){b.classList.toggle("on");b.textContent=b.classList.contains("on")?"♥":"♡"}
else if(a!=="add"||location.hash.startsWith("#/cart"))route()});
$("#sf").onsubmit=e=>{e.preventDefault();f.q=$("#sq").value;f.cat="all";if(location.hash==="#/shop")route();else location.hash="#/shop"};
addEventListener("hashchange",()=>{if(!location.hash.startsWith("#/shop"))$("#sq").value="";route()});route();
