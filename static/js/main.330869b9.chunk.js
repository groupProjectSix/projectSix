(this["webpackJsonpbackronym-generator"]=this["webpackJsonpbackronym-generator"]||[]).push([[0],{41:function(e,t,a){e.exports=a.p+"static/media/logo.d65b87ef.svg"},42:function(e,t,a){e.exports=a(72)},47:function(e,t,a){},48:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(38),o=a.n(s),c=(a(47),a(16)),l=a(5),i=a(6),u=a(8),p=a(7),m=a(9),d=(a(48),a(10)),h=a(12),f=a(14),E=a.n(f),b=a(17),y=a.n(b),g=a(20),v=a.n(g);a(66);v.a.initializeApp({apiKey:"AIzaSyADqSGWHdf9gZ0cyhUXRzFNUK25bY1bVJw",authDomain:"projectsix-4cd1b.firebaseapp.com",databaseURL:"https://projectsix-4cd1b.firebaseio.com",projectId:"projectsix-4cd1b",storageBucket:"projectsix-4cd1b.appspot.com",messagingSenderId:"210565880710",appId:"1:210565880710:web:273bfb9a63f26bb0056a07"});var w=v.a,k=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(p.a)(t).call(this))).handleFirebaseSubmit=function(){w.database().ref().push({entireWord:e.props.userInputProp,words:e.state.finalWord+""})},e.generateRandomNumber=function(e){return Math.floor(Math.random()*e.length)},e.callToApiFirst=function(t,a){y()({url:"https://api.datamuse.com/words",method:"get",params:{ml:"".concat(t),sp:"".concat(a,"*"),md:"p"}}).then((function(t){if(0===t.data.length)e.setState({thatsNotAWord:!0});else{var a=t.data;e.setState({firstWordArray:a})}})).then((function(){if(!1===e.state.thatsNotAWord){var t=e.generateRandomNumber(e.state.firstWordArray),a=e.state.firstWordArray[t].word,r=[];r.push(a),e.setState({firstSelectedWord:a,finalWord:r})}})).then((function(){return E.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:if(!1!==e.state.thatsNotAWord){t.next=3;break}return t.next=3,E.a.awrap(function(){var t,a,r;return E.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:t=!1,a=function(a){var r;return E.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return a===e.props.spreadLettersProp.length-1&&(t=!0),r=e.callToApiSecond(e.props.spreadLettersProp[a],e.state.finalWord[a]),n.next=4,E.a.awrap(r.then((function(r){r.data.length<2?e.randomWordApiCall(e.props.spreadLettersProp[a],t):e.handleApiData(r,t)})));case 4:case"end":return n.stop()}}))},r=1;case 3:if(!(r<=e.props.spreadLettersProp.length-1)){n.next=9;break}return n.next=6,E.a.awrap(a(r));case 6:r++,n.next=3;break;case 9:case"end":return n.stop()}}))}());case 3:case"end":return t.stop()}}))}))},e.callToApiSecond=function(e,t,a){return new Promise((function(a,r){y()({url:"https://api.datamuse.com/words",method:"get",params:{lc:"".concat(t),sp:"".concat(e,"*"),md:"p"}}).then((function(e){a(e)}))}))},e.randomWordApiCall=function(t,a){y()({url:"https://api.datamuse.com/words",method:"get",params:{sp:"".concat(t,"*"),md:"p"}}).then((function(t){e.handleApiData(t,a)}))},e.handleApiData=function(t,a){var r=[];t.data.map((function(e){r.push(e)}));var n=Object(c.a)(e.state.restOfWordsArray);n.push(r),e.setState({restOfWordsArray:n});var s=[],o=!1,l="",i=["of","and"],u=e.generateRandomNumber(i);s=Object(c.a)(e.state.finalWord);var p=r[e.generateRandomNumber(r)];if(a){var m=r.filter((function(e){return e.tags})).filter((function(e){return"n"===e.tags[0]}));s.push(m[e.generateRandomNumber(m)].word)}else if(p.tags){for(var d=0;d<=p.tags.length;d++)"n"===p.tags[d]&&(o=!0);l=o?"".concat(p.word," ").concat(i[u]):"".concat(p.word),s.push(l)}e.setState({finalWord:s})},e.searchAgain=function(){e.callToApiFirst(e.props.userInputProp,e.props.spreadLettersProp[0])},e.state={lettersToQuery:[],displayedWords:[],firstWordArray:[],firstSelectedWord:"",restOfWordsArray:[],finalWord:[],thatsNotAWord:!1},e}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.callToApiFirst(this.props.userInputProp,this.props.spreadLettersProp[0])}},{key:"render",value:function(){return this.state.thatsNotAWord?n.a.createElement("section",{className:"wordListContainer wrapper"},n.a.createElement("h3",null,"I don't think that's a real word..."),n.a.createElement("button",null,n.a.createElement(d.b,{to:"/projectSix"},"Try Again"))):this.state.finalWord.length===this.props.spreadLettersProp.length?n.a.createElement(n.a.Fragment,null,n.a.createElement("section",{className:"wordListContainer wrapper"},n.a.createElement("h2",null,"You searched the word:"),n.a.createElement("h3",null,this.props.userInputProp),n.a.createElement("h2",null,"Which ",n.a.createElement("em",null,"clearly")," stands for:"),n.a.createElement("ul",{className:"wordChoicesList"},this.state.finalWord.map((function(e,t){return n.a.createElement("li",{key:t},e)}))),n.a.createElement("div",{className:"queryWordsHandlingButton"},n.a.createElement("button",{className:"tryAnotherButton",onClick:this.searchAgain},"Try again"),n.a.createElement("button",{type:"submit",className:"submitWordButton",onClick:this.handleFirebaseSubmit},n.a.createElement(d.b,{to:"/projectSix/SavedBackronym"},"Submit your word"))))):n.a.createElement("section",{className:"wordListContainer wrapper"},n.a.createElement("h3",null,"Generating Backronym..."))}}]),t}(r.Component),j=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(p.a)(t).call(this))).preventDefaultFunction=function(t){t.preventDefault(),e.props.lettersToBeSpreadProp()},e.saveUserInput=function(t){console.log(t.target);var a=t.target.value;e.setState({showErrorMessage:!1},(function(){a.length>=3&&a.length<=6?(e.props.QueryWordResultsProp(a),e.setState({showErrorMessage:!1,displayError:!1})):a.length<3&&(e.setState({showErrorMessage:!0}),console.log("Enter at least 3 characters"))}))},e.displayErrorMessage=function(){e.setState({displayError:!0})},e.state={showErrorMessage:!0,displayError:!1},e}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return n.a.createElement("main",{className:"wrapper homepage"},n.a.createElement("div",{className:"mainTextContainer"},n.a.createElement("h1",null,"You know what's more fun than acronyms?",n.a.createElement("span",{className:"backronyms"},"Backronyms.")),n.a.createElement("p",null,"Enter any word below between three and six letters.",n.a.createElement("br",null),"We\u2019ll work our magic and figure out what it stands for as an acronym.")),n.a.createElement("form",{className:"saveInput"},n.a.createElement("span",{className:"sr-only"},n.a.createElement("label",{htmlFor:"wordInput"},"Enter a Word!")),n.a.createElement("input",{type:"text",placeholder:"type here",id:"wordInput",maxLength:"6",onChange:this.saveUserInput}),n.a.createElement("button",{onClick:this.preventDefaultFunction,type:"submit"},!0===this.state.showErrorMessage?n.a.createElement("span",{onClick:this.displayErrorMessage},"Go"):n.a.createElement(d.b,{to:"projectSix/search"},"Go")),this.state.displayError?n.a.createElement("span",{className:"characterLengthError"},"Please enter a word with at least three letters but no more than six."):null))}}]),t}(r.Component),S=a(41),W=a.n(S),N=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(p.a)(t).call(this))).pullFirebase=function(){w.database().ref().on("value",(function(t){var a=t.val(),r=[];for(var n in a)r.push(a[n]);e.setState({savedBackronyms:r})}))},e.state={savedBackronyms:[]},e}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.pullFirebase()}},{key:"render",value:function(){return console.log(this.state.savedBackronyms),n.a.createElement(n.a.Fragment,null,n.a.createElement("main",{className:"wrapper"},n.a.createElement("div",{className:"hallOfLiteracyFameHeader"},n.a.createElement("h2",null,"Hall of Literacy Fame")),n.a.createElement("div",{className:"resultsContainer"},0!==this.state.savedBackronyms.length?this.state.savedBackronyms.map((function(e){console.log(e);var t=e.words.replace(/[,]/g," ");return console.log(t),n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"resultHeader"},n.a.createElement("h3",null,e.entireWord),n.a.createElement("div",{className:"wordsContainer"},n.a.createElement("p",null,t))))})):n.a.createElement("h3",null,"Waiting for data to load..."))))}}]),t}(r.Component),O=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return n.a.createElement("footer",null,n.a.createElement("p",null," \xa9 Backronym Generator 2019. Created By: "),n.a.createElement("p",null,n.a.createElement("a",{target:"_blank",href:"http://sandy.codes"},"Sandy Pranjic"),n.a.createElement("a",{target:"_blank",href:"http://www.lynsey.codes"},"Lynsey O'Donnell"),n.a.createElement("a",{target:"_blank",href:"http://wadebutler.ca/"},"Wade Butler"),n.a.createElement("a",{target:"_blank",href:"http://www.bethancdavies.com"},"Bethan Davies")))}}]),t}(r.Component),x=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(p.a)(t).call(this))).returnHome=function(t){t.preventDefault(),e.setState({userInput:""}),e.setState({showBackButton:!1}),e.setState({spreadLetters:[]})},e.QueryWordResults=function(t){e.setState({userInput:t})},e.lettersToBeSpread=function(){e.setState({spreadLetters:Object(c.a)(e.state.userInput)})},e.showButton=function(){e.setState({showBackButton:!0})},e.state={userInput:"",spreadLetters:[]},e}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement(d.a,null,n.a.createElement(n.a.Fragment,null,n.a.createElement("header",{className:"wrapper"},n.a.createElement("div",{className:"logoContainer"},n.a.createElement("h1",{className:"sr-only"},"Backronym Generator!"),n.a.createElement("img",{src:W.a})),n.a.createElement("nav",null,n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("div",{className:"navLink"},n.a.createElement(d.b,{to:"/projectSix"},"Home"))),n.a.createElement("li",null,n.a.createElement("div",{className:"navLink"},n.a.createElement(d.b,{to:"/projectSix/SavedBackronym"},"Wall Of Literacy Fame")))))),n.a.createElement(h.a,{exact:!0,path:"/projectSix",render:function(){return n.a.createElement(j,{lettersToBeSpreadProp:e.lettersToBeSpread,QueryWordResultsProp:e.QueryWordResults})}}),n.a.createElement(h.a,{exact:!0,path:"/projectSix/search",render:function(){return n.a.createElement(k,{userInputProp:e.state.userInput,spreadLettersProp:e.state.spreadLetters})}}),n.a.createElement(h.a,{exact:!0,path:"/projectSix/SavedBackronym",render:function(){return n.a.createElement(N,null)}}),n.a.createElement(h.a,{path:"*",render:function(){return n.a.createElement(O,null)}})))}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(n.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[42,1,2]]]);
//# sourceMappingURL=main.330869b9.chunk.js.map