(this.webpackJsonpchemistry=this.webpackJsonpchemistry||[]).push([[0],{101:function(e,t,n){},13:function(e,t,n){"use strict";n.d(t,"b",(function(){return j})),n.d(t,"a",(function(){return o}));var i=n(46),c=n(91),a=n(94),s=n(95),r=n(71),l=n(92),j=function(){function e(t){Object(r.a)(this,e),this.melting=void 0,this.boiling=void 0,this.melting=t.melting,this.boiling=t.boiling}return Object(l.a)(e,[{key:"getTemps",value:function(){return[this.melting,this.melting,this.boiling,this.boiling]}}]),e}(),o=function(e){Object(c.a)(n,e);var t=Object(a.a)(n);function n(){var e;Object(r.a)(this,n);for(var c=arguments.length,a=new Array(c),s=0;s<c;s++)a[s]=arguments[s];return e=t.call.apply(t,[this].concat(a)),Error.captureStackTrace&&Error.captureStackTrace(Object(i.a)(e),n),e.name="MissingInformationError",e}return n}(Object(s.a)(Error))},177:function(e,t,n){},178:function(e,t,n){},183:function(e,t,n){"use strict";n.r(t);var i=n(3),c=n(0),a=n.n(c),s=n(18),r=n.n(s),l=(n(101),n(23)),j=n(6),o=n(38);function b(){var e=Object(c.useState)(!1),t=Object(l.a)(e,2),n=t[0],a=t[1],s=Object(c.useState)(!1),r=Object(l.a)(s,2),b=r[0],u=r[1];return Object(i.jsxs)(j.o,{type:"dark",theme:"primary",expand:"md",children:[Object(i.jsx)(o.b,{to:"/",className:"navbar-brand",children:"Saumya's Chemistry Toolbox"}),Object(i.jsx)(j.p,{onClick:function(){a(!n)}}),Object(i.jsx)(j.d,{open:n,navbar:!0,children:Object(i.jsxs)(j.l,{navbar:!0,children:[Object(i.jsx)(j.m,{children:Object(i.jsx)(o.b,{className:"nav-link active",to:"/calculators/specific-heat",children:"Specific Heat"})}),Object(i.jsx)(j.m,{children:Object(i.jsx)(j.n,{to:"/calculators/physics/range",children:"Projectile Range"})}),Object(i.jsxs)(j.e,{open:b,toggle:function(){u(!b)},children:[Object(i.jsx)(j.h,{nav:!0,caret:!0,children:"Dropdown"}),Object(i.jsxs)(j.g,{children:[Object(i.jsx)(j.f,{children:"Action"}),Object(i.jsx)(j.f,{children:"Another action"}),Object(i.jsx)(j.f,{children:"Something else here"})]})]})]})})]})}n(177),n(178),n(179),n(180);var u=n(9),h=n(13),d=n(93);function O(e,t,n,c){var a=Object(d.a)(n[0],n[1],c.grams,new h.b(t),e,c.grams/c.molar);return a.error?Object(i.jsx)(j.a,{theme:"danger",children:a.error}):Object(i.jsx)("div",{children:a.energy})}function g(){var e=Object(c.useState)({solid:null,fusion:null,liquid:null,vaporization:null,gas:null}),t=Object(l.a)(e,2),n=t[0],a=t[1],s=function(e,t){var i={};Object.assign(i,n),i[e]=t,a(i)},r=Object(c.useState)({melting:null,boiling:null}),o=Object(l.a)(r,2),b=o[0],u=o[1],h=function(e,t){var n={};Object.assign(n,b),n[e]=t,u(n)},d=Object(c.useState)([null,null]),g=Object(l.a)(d,2),m=g[0],x=g[1],f=function(e,t){var n={};Object.assign(n,m),n[e]=t,x(n)},p=Object(c.useState)({grams:null,molar:null}),v=Object(l.a)(p,2),y=v[0],w=v[1],S=function(e,t){var n={};Object.assign(n,y),n[e]=t,w(n)},N=Object(c.useState)({}),k=Object(l.a)(N,2);k[0],k[1];return Object(i.jsxs)("div",{className:"container pt-5",children:[Object(i.jsx)("h1",{children:"Energy Calculator"}),Object(i.jsx)("hr",{}),Object(i.jsx)(j.b,{className:"my-2",children:Object(i.jsxs)(j.c,{className:"row",children:[Object(i.jsx)("h3",{children:"Specific Heats"}),Object(i.jsx)("div",{className:"col mx-2",children:Object(i.jsxs)(j.i,{children:[Object(i.jsxs)(j.j,{children:[Object(i.jsx)("label",{children:"Solid"}),Object(i.jsx)(j.k,{value:n.solid,onChange:function(e){return s("solid",e.target.value)},type:"number",id:"#solid",placeholder:"Solid"})]}),Object(i.jsxs)(j.j,{children:[Object(i.jsx)("label",{children:"Liquid"}),Object(i.jsx)(j.k,{value:n.liquid,onChange:function(e){return s("liquid",e.target.value)},type:"number",placeholder:"Liquid"})]}),Object(i.jsxs)(j.j,{children:[Object(i.jsx)("label",{children:"Gas"}),Object(i.jsx)(j.k,{value:n.gas,onChange:function(e){return s("gas",e.target.value)},type:"number",placeholder:"Gas"})]})]})}),Object(i.jsx)("div",{className:"col mx-2",children:Object(i.jsxs)(j.i,{children:[Object(i.jsxs)(j.j,{children:[Object(i.jsx)("label",{children:"Fusion"}),Object(i.jsx)(j.k,{value:n.fusion,onChange:function(e){return s("fusion",e.target.value)},type:"number",placeholder:"Liquid"})]}),Object(i.jsxs)(j.j,{children:[Object(i.jsx)("label",{children:"Vaporization"}),Object(i.jsx)(j.k,{value:n.vaporization,onChange:function(e){return s("vaporization",e.target.value)},type:"number",placeholder:"Vaporization"})]})]})})]})}),Object(i.jsx)(j.b,{className:"my-2",children:Object(i.jsxs)(j.c,{children:[Object(i.jsx)("h3",{children:"Phase Changes"}),Object(i.jsxs)(j.i,{className:"row",children:[Object(i.jsxs)(j.j,{className:"col mx-2",children:[Object(i.jsx)("label",{children:"Melting"}),Object(i.jsx)(j.k,{value:b.melting,onChange:function(e){return h("melting",e.target.value)},type:"number",placeholder:"Melting"})]}),Object(i.jsxs)(j.j,{className:"col mx-2",children:[Object(i.jsx)("label",{children:"Boiling"}),Object(i.jsx)(j.k,{value:b.boiling,onChange:function(e){return h("boiling",e.target.value)},type:"number",placeholder:"Boiling"})]})]})]})}),Object(i.jsx)(j.b,{className:"my-2",children:Object(i.jsxs)(j.c,{children:[Object(i.jsx)("h3",{children:"Mass"}),Object(i.jsxs)(j.i,{className:"row",children:[Object(i.jsxs)(j.j,{className:"col mx-2",children:[Object(i.jsx)("label",{children:"Grams"}),Object(i.jsx)(j.k,{value:y.grams,onChange:function(e){return S("grams",e.target.value)},type:"number",placeholder:"Grams"})]}),Object(i.jsxs)(j.j,{className:"col mx-2",children:[Object(i.jsx)("label",{children:"Molar"}),Object(i.jsx)(j.k,{value:y.molar,onChange:function(e){return S("molar",e.target.value)},type:"number",placeholder:"Molar"})]})]})]})}),Object(i.jsx)(j.b,{className:"my-2",children:Object(i.jsxs)(j.c,{children:[Object(i.jsx)("h3",{children:"Temperature Change"}),Object(i.jsxs)(j.i,{className:"row",children:[Object(i.jsxs)(j.j,{className:"col mx-2",children:[Object(i.jsx)("label",{children:"Starting"}),Object(i.jsx)(j.k,{value:m[0],onChange:function(e){return f("0",e.target.value)},type:"number",placeholder:"Starting"})]}),Object(i.jsxs)(j.j,{className:"col mx-2",children:[Object(i.jsx)("label",{children:"Molar"}),Object(i.jsx)(j.k,{value:m[1],onChange:function(e){return f("1",e.target.value)},type:"number",placeholder:"Ending"})]})]})]})}),Object(i.jsx)("div",{className:"container py-4 ",children:O(n,b,m,y)})]})}var m=function(){return Object(i.jsx)("div",{className:"App",children:Object(i.jsx)("header",{className:"App-header",children:Object(i.jsxs)(o.a,{children:[Object(i.jsx)(b,{}),Object(i.jsxs)(u.c,{children:[Object(i.jsx)(u.a,{path:"/calculators/specific-heat",children:Object(i.jsx)(g,{})}),Object(i.jsx)(u.a,{path:"users"}),Object(i.jsx)(u.a,{path:"/"})]})]})})})},x=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,186)).then((function(t){var n=t.getCLS,i=t.getFID,c=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),i(e),c(e),a(e),s(e)}))};r.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(m,{})}),document.getElementById("root")),x()},93:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return c}));var i=n(13);function c(e,t,n,c,a,s){if(e===t)return{energy:0};var r;if(e<t)r=1;else{r=-1;var l=[t,e];e=l[0],t=l[1]}var j=c.getTemps();j.push(e,t),j.sort();var o=j.indexOf(e),b=j.indexOf(t),u=j.slice(o,b+1);try{return{energy:r*function e(r){if(r[1]===t){var l;if(j[b+1]===c.melting){if(!a.solid)throw new i.a("Specific heat missing for solid state");l=a.solid}else if(j[b+1]===c.boiling){if(!a.liquid)throw new i.a("Specific heat missing for liquid state");l=a.liquid}else{if(!a.gas)throw new i.a("Specific heat missing for gas state");l=a.gas}return l*n*(r[1]-r[0])}if(r[0]!==r[1]){var o;if(r[1]===c.melting){if(!a.solid)throw new i.a("Specific heat missing for solid state");o=a.solid}else if(r[1]===c.boiling){if(!a.liquid)throw new i.a("Specific heat missing for liquid state");o=a.liquid}else{if(!a.gas)throw new i.a("Specific heat missing for gas state");o=a.gas}return o*n*(r[1]-r[0])+e(r.slice(1))}if(!s)throw new i.a("Molar mass missing for substance");var u;if(r[0]===c.melting){if(!a.fusion)throw new i.a("Specific heat missing for fusion transition");u=a.fusion}else{if(!a.vaporization)throw new i.a("Specific heat missing for vaporization transition");u=a.vaporization}return 1e3*u*n/s+e(r.slice(1))}(u)}}catch(h){return{error:h.message}}}n.c[n.s]===e&&(console.log("================================\n"),console.log(c(140,-30,36.04,new i.b({melting:0,boiling:100}),{solid:2.06,fusion:6.01,liquid:4.18,vaporization:40.7,gas:1.87},18.02)))}).call(this,n(181)(e))}},[[183,1,2]]]);
//# sourceMappingURL=main.1820c6e1.chunk.js.map