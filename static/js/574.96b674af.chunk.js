"use strict";(self.webpackChunktest_task_frontend=self.webpackChunktest_task_frontend||[]).push([[574],{574:(e,t,a)=>{a.r(t),a.d(t,{default:()=>m});var n=a(43),s=a(216);const o=a(213).A.create({baseURL:"http://localhost:8080/api/chats"}),r={form_container:"Modal_form_container__wNgOz",title:"Modal_title__FIU3k",desc:"Modal_desc__CHCCF",form:"Modal_form__JfgAr",input:"Modal_input__OExkN",button:"Modal_button__FF4qH"};var l=a(579);const c=e=>{let{children:t,onClose:a,showModal:s}=e;const o=(0,n.useCallback)((e=>{"Escape"===e.code&&a(),e.currentTarget===e.target&&a()}),[a]);return(0,n.useEffect)((()=>(document.addEventListener("keydown",o),()=>{document.removeEventListener("keydown",o)})),[o]),(0,l.jsx)("div",{className:s?r.backdrop+" "+r.backdropActive:r.backdrop,onClick:o,children:(0,l.jsxs)("div",{className:s?r.modalContent+" "+r.modalContentActive:r.modalContent,children:[(0,l.jsx)("button",{className:r.button,onClick:()=>a()}),t]})})},d=e=>{let{chatId:t,onClose:a}=e;const[s,r]=(0,n.useState)(""),[c,d]=(0,n.useState)("");return(0,l.jsxs)("form",{onSubmit:async e=>{e.preventDefault();try{await(async(e,t)=>{const{data:a}=await o.put(`/${e}`,t);return a})(t,{firstName:s,lastName:c}),r(""),d("")}catch(a){console.error(a)}},children:[(0,l.jsx)("input",{type:"text",value:s,onChange:e=>r(e.target.value),placeholder:"First Name"}),(0,l.jsx)("input",{type:"text",value:c,onChange:e=>d(e.target.value),placeholder:"Last Name"}),(0,l.jsx)("button",{type:"submit",children:"Send"})]})},i=()=>{const[e,t]=(0,n.useState)([]),[a,r]=(0,n.useState)(""),[i,u]=(0,n.useState)(!1),[h,m]=(0,n.useState)(!1),[_,x]=(0,n.useState)(null),C=(0,s.Zp)();(0,n.useEffect)((()=>{(async()=>{try{const e=await(async()=>{const{data:e}=await o.get("/");return e})();t(e)}catch(e){console.error(e)}})()}),[i]);const p=async e=>{try{await(async e=>{const{data:t}=await o.delete(`/${e}`);return t})(e),u(!i)}catch(t){console.error(t)}},j=()=>{m(!1),x(null),u(!i)},v=e.filter((e=>e.firstName.toLowerCase().includes(a.toLowerCase())||e.lastName.toLowerCase().includes(a.toLowerCase())));return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("input",{type:"text",value:a,onChange:e=>{r(e.target.value)}}),(0,l.jsxs)("ul",{children:[v.map((e=>(0,l.jsxs)("li",{onClick:()=>{return t=e._id,console.log(t),void C(`/chat/${t}`);var t},children:[e.firstName," ",e.lastName,(0,l.jsx)("button",{onClick:()=>{return t=e._id,x(t),void m(!0);var t},children:"Edit"}),(0,l.jsx)("button",{onClick:()=>p(e._id),children:"Delete"})]},e._id))),h&&(0,l.jsx)(c,{onClose:j,showModal:h,children:(0,l.jsx)(d,{chatId:_,onClose:j})})]})]})},u=()=>(0,l.jsx)("div",{children:"filter"}),h=()=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(u,{}),(0,l.jsx)(i,{})]}),m=()=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(h,{}),(0,l.jsx)("div",{children:(0,l.jsx)(s.sv,{})})]})}}]);
//# sourceMappingURL=574.96b674af.chunk.js.map