(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{3835:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return m}});var r=n(885),o=n(7294),i=n(2982),a=n(1818),c=n(5893),u=function(e){var t=e.input,n=e.isCommand,r=e.isError,o=e.hasBuffer;return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{children:[n&&(0,c.jsx)("div",{id:"query",children:"C:\\Users\\Guest>"}),(0,c.jsx)("span",{className:!n&&r?"error":"",children:t})]}),o&&(0,c.jsx)("div",{})]})},s=function(e){var t=e.input,n=e.isError,r=e.hasBuffer;return(0,c.jsxs)(c.Fragment,{children:[t.map((function(e,t){return(0,c.jsx)(u,{input:e,isError:n},t)})),r&&(0,c.jsx)("div",{})]})},l=function(e){var t=e.input,n=e.theme;return(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{id:"query",children:"C:\\Users\\Guest>"}),(0,c.jsx)("span",{children:t}),(0,c.jsx)("div",{id:"cursor",style:n})]})},f=function(e){var t=e.theme,n=e.fieldHistory,r=e.setFieldHistory,a=e.userInput,f=e.setIsMobile,d=e.handleTyping,p=e.handleContextMenuPaste;return(0,o.useEffect)((function(){var e,t;"undefined"===typeof window.orientation&&-1===navigator.userAgent.indexOf("IEMobile")||(f(!0),r((function(e){return[].concat((0,i.Z)(e),[{isCommand:!0},{text:"Unfortunately due to this application being an 'input-less' environment, mobile is not supported. I'm working on figuring out how to get around this, so please bear with me! In the meantime, come on back if you're ever on a desktop.",isError:!0,hasBuffer:!0}])}))),null===(e=document)||void 0===e||null===(t=e.querySelector("#useless-btn"))||void 0===t||t.addEventListener("click",(function(){r((function(e){return[].concat((0,i.Z)(e),[{isCommand:!0},{text:"SYS >> That button doesn't do anything.",hasBuffer:!0}])}))}))}),[]),(0,o.useEffect)((function(){var e=document.querySelector("#field");e.scrollTop=e.scrollHeight}),[n]),(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)("div",{id:"field",className:"#333444"===t.app.backgroundColor?"dark":"light",style:t.field,onKeyDown:function(e){return d(e)},tabIndex:0,onContextMenu:function(e){return p(e)},children:[n.map((function(e,t){var n=e.text,r=e.isCommand,o=e.isError,i=e.hasBuffer;return Array.isArray(n)?(0,c.jsx)(s,{input:n,isError:o,hasBuffer:i},t):(0,c.jsx)(u,{input:n,isCommand:r,isError:o,hasBuffer:i},t)})),(0,c.jsx)(l,{input:a,theme:t.cursor})]})})},d=[{command:"help",purpose:"Provides help information for Profile Terminal commands."},{command:"start",purpose:"Launches a specified URL in a new tab or separate window.",help:["START <URL>","Launches a specified URL in a new tab or separate window.","","URL......................The website you want to open."]},{command:"cls",purpose:"Clears the screen."},{command:"ref",purpose:"Reference source code"},{command:"exit",purpose:"Quits the Profile Terminal and returns to Jacob's portfolio page."},{command:"about",isMain:!0,purpose:"Displays basic information about Jacob."},{command:"experience",isMain:!0,purpose:"Displays information about Jacob's experience."},{command:"skills",isMain:!0,purpose:"Displays information about Jacob's skills as a developer."},{command:"contact",isMain:!0,purpose:"Displays contact information for Jacob."}],p=function(e){var t=e.theme,n=e.setTheme,r=(0,o.useState)(!1),u=r[0],s=r[1],l=(0,o.useState)("Profile Terminal"),p=l[0],m=l[1],h=(0,o.useState)([]),g=h[0],v=h[1],x=(0,o.useState)(0),y=x[0],w=x[1],b=(0,o.useState)([{text:"Profile Terminal"},{text:"Type HELP to see the full list of commands.",hasBuffer:!0}]),C=b[0],E=b[1],T=(0,o.useState)(""),k=T[0],j=T[1],L=(0,o.useState)(!1),Z=(L[0],L[1]),P=function(e){try{var t=(0,a.ku)(e);throw isNaN(t)||E((function(e){return[].concat((0,i.Z)(e),[{text:t}])})),Error}catch(u){var n=e.toLowerCase().trim().split(" "),r=n[0],o=n.slice(1).filter((function(e){return"-"!==e[0]})),c=n.slice(1).filter((function(e){return"-"===e[0]}));return!d.some((function(e){return e.command===r}))&&E((function(t){return[].concat((0,i.Z)(t),[A("nr",e)])})),B(r,o,c)}},B=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];if("help"===e){if(t.length){t.length>1&&E((function(e){return[].concat((0,i.Z)(e),[A("bp",{cmd:"HELP",noAccepted:1})])}));var o=d.filter((function(e){return e.help}));return o.filter((function(e){return e.command===t[0]})).length?E((function(e){return[].concat((0,i.Z)(e),[{text:o.filter((function(e){return e.command===t[0]}))[0].help,hasBuffer:!0}])})):d.filter((function(e){return e.command===t[0]})).length&&E((function(e){return[].concat((0,i.Z)(e),[{text:["No additional help needed for ".concat(d.filter((function(e){return e.command===t[0]}))[0].command.toUpperCase()),d.filter((function(e){return e.command===t[0]}))[0].purpose],hasBuffer:!0}])})),E((function(e){var n;return[].concat((0,i.Z)(e),[A("up",null===(n=t[0])||void 0===n?void 0:n.toUpperCase())])}))}return E((function(e){return[].concat((0,i.Z)(e),[{text:["Main commands:"].concat((0,i.Z)(d.sort((function(e,t){return e.command.localeCompare(t.command)})).filter((function(e){return e.isMain})).map((function(e){var t=e.command,n=e.purpose;return"".concat(t.toUpperCase()).concat(Array.from({length:15-t.length},(function(e){return"."})).join("")).concat(n)}))),["","All commands:"],(0,i.Z)(d.sort((function(e,t){return e.command.localeCompare(t.command)})).map((function(e){var t=e.command,n=e.purpose;return"".concat(t.toUpperCase()).concat(Array.from({length:15-t.length},(function(e){return"."})).join("")).concat(n)}))),["","For help about a specific command, type HELP <CMD>, e.g. HELP PROJECT."]),hasBuffer:!0}])}))}if("cls"===e)return E([]);if("start"===e)return 1===t.length?(E((function(e){return[].concat((0,i.Z)(e),[{text:"Launching ".concat(t[0],"..."),hasBuffer:!0}])})),void window.open(/http/i.test(t[0])?t[0]:"https://".concat(t[0]))):E((function(e){return[].concat((0,i.Z)(e),[A("bp",{cmd:"START",noAccepted:1})])}));if("date"===e)return E((function(e){return[].concat((0,i.Z)(e),[{text:"The current date is: ".concat(new Date(Date.now()).toLocaleDateString()),hasBuffer:!0}])}));if("ref"===e)return E((function(e){return[].concat((0,i.Z)(e),[{text:"Reference source code",hasBuffer:!0}])})),void window.open("https://codepen.io/HuntingHawk/full/rNaEZxW");if("theme"===e){if(1===r.length&&["-d","-dark","-l","-light"].some((function(e){return e===r[0]}))){var a="-d"===r[0]||"-dark"===r[0]?"dark":"light";return E((function(e){return[].concat((0,i.Z)(e),[{text:"Set the theme to ".concat(a.toUpperCase()," mode"),hasBuffer:!0}])})),void n(a)}return E((function(e){return[].concat((0,i.Z)(e),[A(r.length?"bf":"nf","THEME")])}))}if("exit"===e)return window.location.href="https://github.com/L4zy-p";if("time"===e)return E((function(e){return[].concat((0,i.Z)(e),[{text:"The current time is: ".concat(new Date(Date.now()).toLocaleTimeString()),hasBuffer:!0}])}));if("about"===e)return E((function(e){return[].concat((0,i.Z)(e),[{text:["Hey there!","My name is L4zy-p.","Anime and Mange lover","My birthday is May 30th.","Type CONTACT if you'd like to get in touch - otherwise I hope you enjoy using the rest of the app!"],hasBuffer:!0}])}));if("experience"===e)return E((function(e){return[].concat((0,i.Z)(e),[{text:["Experience:","Open Source Technology","Frontend Developer","Jun 2018 - Present","","Tovho System","PHP Web Developer","Aug 2017 - Apr 2018","","Intelligent Millionaire","Game Developer","Aug 2016 - Dec 2016 (Internship)",""],hasBuffer:!0}])}));if("skills"===e)return E((function(e){return[].concat((0,i.Z)(e),[{text:["Tool & Languages","Typescript","JavaScript","","Next","React",""],hasBuffer:!0}])}));if("contact"===e)return E((function(e){return[].concat((0,i.Z)(e),[{text:["Email: hemhongsa.p94@gmail.com","Website: https://l4zy-p.github.io/terminal-profile/","LinkedIn: -","GitHub: @L4zy-p"],hasBuffer:!0}])}));if("projects"===e)return E((function(e){return[].concat((0,i.Z)(e),[{text:["To view any of these projects live or their source files, type PROJECT <TITLE>, e.g. PROJECT terminal profile.","","terminal profile","Built with React & Next","How to create terminal with react",""],hasBuffer:!0}])}));if("project"===e){if(1===t.length){var c,u,s=[{title:"terminal profile",live:"https://github.com/L4zy-p/terminal-profile"}];return E((function(e){return[].concat((0,i.Z)(e),[{text:"Launching ".concat(t[0],"..."),hasBuffer:!0}])})),void window.open(null===(c=s.filter((function(e){return e.title===t[0]})))||void 0===c||null===(u=c[0])||void 0===u?void 0:u.live)}return E((function(e){return[].concat((0,i.Z)(e),[A("bp",{cmd:"PROJECT",noAccepted:1})])}))}return"title"===e?(E((function(e){return[].concat((0,i.Z)(e),[{text:"Set the Profile Terminal title to ".concat(t.length>0?t.join(" "):"<BLANK>"),hasBuffer:!0}])})),void m(t.length>0?t.join(" "):"")):void 0},A=function(e,t){var n={text:"",isError:!0,hasBuffer:!0};return"nr"===e?n.text="".concat(t," : The term or expression '").concat(t,"' is not recognized. Check the spelling and try again. If you don't know what commands are recognized, type HELP."):"nf"===e?n.text="The ".concat(t," command requires the use of flags. If you don't know what flags can be used, type HELP ").concat(t,"."):"bf"===e?n.text="The flags you provided for ".concat(t," are not valid. If you don't know what flags can be used, type HELP ").concat(t,"."):"bp"===e?n.text="The ".concat(t.cmd," command requires ").concat(t.noAccepted," parameter(s). If you don't know what parameters to use, type HELP ").concat(t.cmd,"."):"up"===e&&(n.text="The command ".concat(t," is not supported by the HELP utility.")),n};return(0,c.jsxs)(c.Fragment,{children:[!u&&(0,c.jsx)("div",{className:"text-header-title",children:"Welcome to My Profile"}),(0,c.jsxs)("div",{id:"terminal",style:u?{height:"100vh",width:"100vw",maxWidth:"100vw"}:t.terminal,children:[(0,c.jsxs)("div",{id:"window",style:t.window,children:[(0,c.jsx)("button",{className:"btn red",onClick:function(){return window.location.href="https://github.com/L4zy-p"}}),(0,c.jsx)("button",{id:"useless-btn",className:"btn yellow"}),(0,c.jsx)("button",{className:"btn green",onClick:function(){s(!u);var e=document.querySelector("#field");null===e||void 0===e||e.focus()}}),(0,c.jsx)("span",{id:"title",style:{color:t.window.color},children:p})]}),(0,c.jsx)(f,{theme:t,fieldHistory:C,setFieldHistory:E,userInput:k,setIsMobile:Z,handleTyping:function(e){e.preventDefault();var t=e.key,n=e.ctrlKey,r=e.altKey;if(![].concat((0,i.Z)(Array.from({length:12},(function(e,t){return"F".concat(t+1)}))),["ContextMenu","Meta","NumLock","Shift","Control","Alt","CapsLock","Tab","ScrollLock","Pause","Insert","Home","PageUp","Delete","End","PageDown"]).some((function(e){return e===t}))&&!n&&!r)if("Backspace"===t)j(k.slice(0,-1));else if("Escape"===t)j("");else if("ArrowUp"===t||"ArrowLeft"===t){y>=g.length||(w(y+1),j(g[y-1]))}else if("ArrowDown"===t||"ArrowRight"===t){0===y||(w(y-1),j(g[y-1]||""))}else"Enter"===t?k.length?(v(""===k?g:[k,g]),w(0),E((function(e){return[].concat((0,i.Z)(e),[{text:k,isCommand:!0}])})),j(""),P(k)):E((function(e){return[].concat((0,i.Z)(e),[{isCommand:!0}])})):(w(0),j(k+t))},handleContextMenuPaste:function(e){e.preventDefault(),"clipboard"in navigator&&navigator.clipboard.readText().then((function(e){j("".concat(k).concat(e))}))}})]}),!u&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{className:"tags-title",children:"CLICK FAST COMMAND LIST \ud83d\ude80"}),(0,c.jsx)("ul",{className:"tags",children:null===d||void 0===d?void 0:d.map((function(e,t){return(0,c.jsx)("li",{children:(0,c.jsx)("span",{onClick:function(){return t=null===e||void 0===e?void 0:e.command,v(""===t?g:[t,g]),w(0),E((function(e){return[].concat((0,i.Z)(e),[{text:t,isCommand:!0}])})),j(""),void P(t);var t},children:null===e||void 0===e?void 0:e.command})},t)}))})]})]})},m=function(){var e=o.useState("dark"),t=(0,r.Z)(e,2),n=t[0],i=t[1],a="dark"===n?{app:{backgroundColor:"#2d2f58"},window:{backgroundColor:"#140e48",color:"#F4F4F4"},field:{backgroundColor:"#1d1d26",color:"#F4F4F4",fontWeight:"normal"},cursor:{animation:"1.02s blink-dark step-end infinite"}}:{app:{backgroundColor:"#ACA9BB"},window:{backgroundColor:"#5F5C6D",color:"#E3E3E3"},field:{backgroundColor:"#E3E3E3",color:"#474554",fontWeight:"bold"},cursor:{animation:"1.02s blink-light step-end infinite"}};return(0,c.jsx)("div",{id:"app",style:a.app,children:(0,c.jsx)(p,{theme:a,setTheme:i})})}},5301:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(3835)}])},5042:function(){}},function(e){e.O(0,[210,774,888,179],(function(){return t=5301,e(e.s=t);var t}));var t=e.O();_N_E=t}]);