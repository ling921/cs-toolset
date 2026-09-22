(function(){"use strict";const t=self;t.onmessage=l=>{try{const{pattern:a,flags:e,input:r,replacement:g,locale:c}=l.data;if(!/^[dgimsuvy]*$/.test(e)||new Set(e).size!==e.length||e.includes("u")&&e.includes("v")){t.postMessage({error:{en:"Regex flags are invalid or repeated.","zh-CN":"正则标志无效或重复。"}});return}const o=new RegExp(a,e),i=new RegExp(a,e.includes("g")?e:e+"g"),s=[];for(const n of r.matchAll(i))if(s.push({value:n[0],index:n.index,groups:n.groups??{},captures:n.slice(1)}),s.length>=500)break;const p=r.replace(o,g);t.postMessage({text:`${c==="zh-CN"?"匹配结果":"MATCHES"} (${s.length}${s.length===500?"+":""})
${JSON.stringify(s,null,2)}

${c==="zh-CN"?"替换预览":"REPLACEMENT PREVIEW"}
${p}`})}catch{t.postMessage({error:{en:"Regex pattern is invalid.","zh-CN":"正则表达式无效。"}})}}})();
