!function(t){var e={};function o(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=7)}({0:function(t,e,o){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}o.d(e,"d",function(){return r}),o.d(e,"a",function(){return a}),o.d(e,"b",function(){return u}),o.d(e,"c",function(){return i});var r=function(t){if(!t||"object"!==n(t))throw c("Todo not saved/updated, was not a JSON object"),Error("Todos NOT saved/updated, was not a JSON object");try{localStorage.setItem("todos",JSON.stringify(t))}catch(t){return[]}},a=function(){return{searchText:"",hideCompleted:!1,sortType:""}},u=function(){var t=localStorage.getItem("todos");return null!==t?JSON.parse(t):(console.info("No todos available in storage"),[])},i=function(t){for(var e=arguments.length,o=new Array(e>1?e-1:0),n=1;n<e;n++)o[n-1]=arguments[n];var r=document.getElementById("alertMsg");r.setAttribute("class","alert alert-success"),r.innerHTML="".concat(t),setTimeout(function(){r.setAttribute("class",""),r.innerHTML=""},1500),o&&(console.log("redirecting"),console.log(o),setTimeout(function(){return location.assign("".concat(o))},1550))},c=function(t){var e=document.getElementById("alertMsg");e.setAttribute("class","alert alert-danger"),e.innerHTML="".concat(t),setTimeout(function(){e.setAttribute("class",""),e.innerHTML=""},1500)}},7:function(t,e,o){"use strict";o.r(e);var n=o(0),r=document.querySelector("#editTodoInput"),a=location.hash.substring(1),u=Object(n.b)(),i=u.find(function(t){return t.id===a});void 0===i&&location.assign("/"),r.value=i.body,document.getElementById("updateTodoForm").addEventListener("submit",function(t){t.preventDefault();var e=t.target.elements.editTodoInput.value;e?c(e):(console.warn("No Todo was provided, please type a todo before adding."),alert("No Todo was provided, please type a todo before adding."))}),window.addEventListener("storage",function(t){if("todos"===t.key){u=JSON.parse(t.newValue),console.log("e.key",t.key),console.log("allTodos",u);var e=u.find(function(t){return t.id===a});void 0===e&&location.assign("/"),r.value=e.body}});var c=function(t){var e,o,r={id:"".concat(i.id),body:t,completed:i.completed,completedAt:i.completedAt||null,createdAt:i.createdAt,updatedAt:Date.now()};e=i.id,o=u.filter(function(t){return t&&e?t.id!==e:(console.error("Todo not available"),alert("Todo not available"),null)}),u=o,Object(n.d)(u),u.push(r),Object(n.d)(u),Object(n.c)('"'.concat(t,'" was updated!'),"/")}}});
//# sourceMappingURL=edit-bundle.js.map