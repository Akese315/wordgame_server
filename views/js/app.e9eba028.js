(function(){"use strict";var e={1660:function(e,t,n){var a=n(9242),o=n(3396);function s(e,t,n,a,s,r){const i=(0,o.up)("panel_error"),l=(0,o.up)("router-view");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o.Wm)(i,{errorProp:a.error},null,8,["errorProp"]),(0,o.Wm)(l)],64)}var r=n(4870),i=n(2482),l=n(878),u=n(2575),c=n(8829);const d="https://www.kanjiyarou.com";var p=n(2066),m=new WeakMap,h=new WeakMap,g=new WeakMap;class _{constructor(e){(0,l.Z)(this,m,{writable:!0,value:void 0}),(0,i.Z)(this,"gameReference",void 0),(0,i.Z)(this,"isClose",!0),(0,l.Z)(this,h,{writable:!0,value:void 0}),(0,l.Z)(this,g,{writable:!0,value:void 0}),(0,i.Z)(this,"SET_PSEUDO_EVENT","player:pseudo"),(0,i.Z)(this,"JOIN_GAME_EVENT","game:join"),(0,i.Z)(this,"CREATE_GAME_EVENT","game:create"),(0,i.Z)(this,"ROUND_GAME_EVENT","game:round"),(0,i.Z)(this,"UPDATE_RULES_EVENT","game:rules"),(0,i.Z)(this,"GAME_EVENT","game:event"),(0,i.Z)(this,"ANSWER_GAME_EVENT","game:answer"),(0,i.Z)(this,"PLAYER_LIST_EVENT","game:playerList"),this.gameReference=e}openConnection(e,t,n){"undefined"==typeof(0,c.Z)(this,m)&&this.isClose&&((0,u.Z)(this,m,new p.io(d,{path:"/socket",transports:["websocket"],upgrade:!0,query:e})),(0,c.Z)(this,m).on("handshakeResponse",(e=>{t(e)})),(0,c.Z)(this,m).on("connect_error",(e=>{n(e)})),(0,c.Z)(this,m).on("connect",(()=>{this.connected()})),(0,c.Z)(this,m).on("disconnect",(()=>{console.log("disconnect event"),this.disconnected()})),(0,c.Z)(this,m).on("Notification",(()=>{})),(0,c.Z)(this,m).on("error",(e=>{"undefined"!=typeof(0,c.Z)(this,h)&&(0,c.Z)(this,h).call(this,e)})),this.isClose=!1)}closeSocket(){(0,c.Z)(this,m).close(),console.log("socket close by the client")}closeEvents(e){(0,c.Z)(this,m).off(e)}sendRequest(e,t,n){(0,c.Z)(this,m).emit(e,t),this.listenOnce(e,n)}sendData(e,t){(0,c.Z)(this,m).emit(e,t)}listen(e,t){(0,c.Z)(this,m).on(e,(n=>{"undefined"!=typeof t?t(n):(0,c.Z)(this,m).off(e)}))}listenOnce(e,t){(0,c.Z)(this,m).once(e,(e=>{"undefined"!=typeof t&&t(e),"undefined"!=typeof e.redirect&&(0,c.Z)(this,g).call(this,e.redirect)}))}stopListeningGame(e){(0,c.Z)(this,m).off(e)}disconnected(){console.log("Socket closed"),this.closeSocket();var e=alert("you are disconnected from the server");e&&window.close()}connected(){console.log("Connecté")}setRedirectCallback(e){(0,u.Z)(this,g,e)}}class v{constructor(){(0,i.Z)(this,"gameHash",void 0),(0,i.Z)(this,"isOwner",void 0),(0,i.Z)(this,"gameMod",void 0),(0,i.Z)(this,"rounds",void 0),(0,i.Z)(this,"timeout",void 0),(0,i.Z)(this,"currentRound",void 0),(0,i.Z)(this,"jlpt_level",void 0),(0,i.Z)(this,"playerList",void 0),(0,i.Z)(this,"rankingList",void 0),this.playerList=new Array,this.rankingList=new Array,this.rounds=1,this.currentRound=null,this.gameHash="none",this.isOwner="none",this.jlpt_level="none"}setPlayerList(e){this.playerList=e}setRankingList(e){this.rankingList=e}getPlayerList(){return this.playerList}}var b=n(678),w=n(7139);function f(e,t,n,a,s,r){return(0,o.wg)(),(0,o.iD)("div",{id:"panel",style:(0,w.j5)({"background-color":this.background,display:this.display})},[(0,o._)("h1",null,(0,w.zw)(a.message),1)],4)}var k={name:"panel_error",props:{informationProp:String,errorProp:String},setup(e){const t=(0,r.Vh)(e,"errorProp"),n=(0,r.Vh)(e,"informationProp"),a=(0,r.iH)(""),o=(0,r.iH)("none"),s=(0,r.iH)("none");return{error:t,information:n,background:o,display:s,message:a}},watch:{error(){""!=this.error?(this.background="rgba(200,10,10,0.5)",this.message=this.error,this.display="block"):(this.display="none",this.message="")},information(){""!=this.information?(this.background="rgba(0,0,255,0.5)",this.display="block",this.message=this.information):(this.display="none",this.message="")}}},y=n(89);const E=(0,y.Z)(k,[["render",f],["__scopeId","data-v-7c7e0e45"]]);var G=E,W={name:"App",components:{panel_error:G},setup(){const e=(0,r.qj)({pseudo:"none",hash:"none"}),t=(0,r.qj)(new v),n=(0,b.tv)(),a=new _(t),s=(0,r.iH)(""),i=(0,r.iH)("");e.hash=localStorage.getItem("userHash"),e.pseudo=localStorage.getItem("pseudo"),(0,o.JJ)("user",e),(0,o.JJ)("game",t),(0,o.JJ)("backApp",a);const l=t=>{"undefined"!=typeof t.userInformation&&("undefined"!=typeof t.userInformation.pseudo&&(e.pseudo=t.userInformation.pseudo,localStorage.setItem("pseudo",e.pseudo)),"undefined"!=typeof t.userInformation.userHash&&(e.hash=t.userInformation.userHash,localStorage.setItem("userHash",e.hash)))},u=e=>{s.value=e,console.log(e),setTimeout((()=>{s.value=""}),3e3)},c=e=>{i.value=e,setTimeout((()=>{i.value=""}),3e3)},d=e=>{switch(e){case"game":console.log("joined the game"),n.push({path:"/game"});break;case"home":console.log("welcome :)"),n.push({path:"/"});break;case"lobby":console.log("joined the lobby"),n.push({path:"/lobby"});break}},p=e=>{console.error(e.error)};return{user:e,error:s,game:t,backApp:a,redirectCallback:d,openConnectionCallback:l,openConnectionErrorCallback:p,errorCallback:u,infoCallback:c}},mounted(){this.backApp.openConnection({userHash:this.user.hash},this.openConnectionCallback,this.openConnectionErrorCallback),this.backApp.setRedirectCallback(this.redirectCallback),this.backApp.listen("redirect",this.redirectCallback),this.backApp.listen("error",this.errorCallback),this.backApp.listen("info",this.infoCallback)}};const A=(0,y.Z)(W,[["render",s]]);var L=A;const S=e=>((0,o.dD)("data-v-7c9b685e"),e=e(),(0,o.Cn)(),e),V={id:"background"},C={id:"main_card"},T=S((()=>(0,o._)("h1",null,"Welcome to the KanjiYarou!",-1))),Z=S((()=>(0,o._)("h2",null,"ワードゲームへようこそ ",-1))),H=S((()=>(0,o._)("span",{id:"author"},[(0,o._)("a",{href:"https://www.patreon.com/1041uuu",target:"_blank"},[(0,o.Uk)(" wallpaper : "),(0,o._)("br"),(0,o.Uk)("1041uuu")])],-1)));function M(e,t,n,s,r,i){const l=(0,o.up)("WGinput"),u=(0,o.up)("WGbutton"),c=(0,o.up)("WGerror");return(0,o.wg)(),(0,o.iD)("div",V,[(0,o._)("div",C,[T,Z,(0,o._)("form",{onSubmit:t[1]||(t[1]=(0,a.iM)(((...e)=>s.setPseudo&&s.setPseudo(...e)),["prevent"]))},[(0,o.Wm)(l,{modelValue:this.pseudoInput,"onUpdate:modelValue":t[0]||(t[0]=e=>this.pseudoInput=e),wg_placeholder:"Pseudo"},null,8,["modelValue"]),(0,o.Wm)(u,{wg_value:"Create"}),(0,o.Wm)(c,{WG_value:this.errorInput,Bounce:this.bounce},null,8,["WG_value","Bounce"])],32)]),H])}const D={id:"input_wg"};function I(e,t,n,s,r,i){return(0,o.wg)(),(0,o.iD)("div",D,[(0,o.wy)((0,o._)("input",{id:"input","onUpdate:modelValue":t[0]||(t[0]=e=>s.update_wg_value=e),type:"text",onFocus:t[1]||(t[1]=(...e)=>i.onFocus&&i.onFocus(...e)),onBlur:t[2]||(t[2]=(...e)=>i.onBlur&&i.onBlur(...e)),required:""},null,544),[[a.nr,s.update_wg_value]]),(0,o._)("label",{class:(0,w.C_)({input_selected:s.focused}),id:"placeholder"},(0,w.zw)(n.wg_placeholder),3)])}var P={name:"WG_input",props:{wg_placeholder:String,modelValue:String},emits:["update:modelValue"],setup(e,{emit:t}){const n=(0,r.iH)(!1),a=(0,r.iH)(e.modelValue),o=(0,r.Fl)({get(){return a.value},set(e){a.value=e,t("update:modelValue",a.value)}});return""!=a.value&&(n.value=!0),{focused:n,wg_value:a,update_wg_value:o}},methods:{onFocus(){this.focused=!0},onBlur(){""==this.wg_value&&(this.focused=!1)}}};const R=(0,y.Z)(P,[["render",I],["__scopeId","data-v-b0193b0a"]]);var j=R;function N(e,t,n,a,s,r){return(0,o.wg)(),(0,o.iD)("button",{onClick:t[0]||(t[0]=(...e)=>a.clickEvent&&a.clickEvent(...e))},(0,w.zw)(n.wg_value),1)}var O={name:"WG_button",props:{wg_value:String},emits:["clickWG"],setup(e,{emit:t}){const n=()=>{t("clickWG")};return{clickEvent:n}}};const z=(0,y.Z)(O,[["render",N],["__scopeId","data-v-c446e9a6"]]);var U=z;function B(e,t,n,a,s,r){return(0,o.wg)(),(0,o.iD)("label",{class:(0,w.C_)({actived:this.Bounce})},(0,w.zw)(n.WG_value),3)}var F={name:"WG_error",props:{WG_value:String,Bounce:Boolean},data:function(){return{}}};const q=(0,y.Z)(F,[["render",B],["__scopeId","data-v-e96b0624"]]);var x=q,Y={name:"wg_home",components:{WGinput:j,WGbutton:U,WGerror:x},setup(){const e=(0,r.iH)(""),t=(0,r.iH)(""),n=(0,r.iH)(!1),a=(0,o.f3)("user"),s=(0,o.f3)("game"),i=(0,o.f3)("backApp"),l=(0,b.yj)();s.gameHash=l.query.game;const u=()=>{n.value=!0,setTimeout((()=>{n.value=!1}),1e3)},c=e=>{s.playerList=e.playerList,s.gameHash=e.gameHash,s.isOwner=e.isOwner},d=e=>{s.isOwner=e.isOwner,s.playerList=e.playerList},p=e=>{a.pseudo=e.pseudo,localStorage.setItem("pseudo",a.pseudo),"undefined"!=typeof s.gameHash?(console.log("joining..."),i.sendRequest("game:join",{userHash:a.hash,gameHash:s.gameHash},d)):(console.log("creating game..."),i.sendRequest("game:create",{userHash:a.hash},c))},m=()=>{console.log("setting pseudo..."),i.sendRequest("player:pseudo",{pseudo:e.value,userHash:a.hash},p)};return{pseudoInput:e,errorInput:t,backApp:i,bounce:n,user:a,ErrorBounceAnimation:u,setPseudo:m}}};const J=(0,y.Z)(Y,[["render",M],["__scopeId","data-v-7c9b685e"]]);var K=J;const $={id:"main"};function X(e,t,n,a,s,r){const i=(0,o.up)("WG_player_list_container");return(0,o.wg)(),(0,o.iD)("div",$,[(0,o.Wm)(i,{WG_player_list:a.game.playerList},null,8,["WG_player_list"]),((0,o.wg)(),(0,o.j4)((0,o.LL)(a.component),{card_array:a.cards,assignment_string:a.assignment,WG_rankingList:a.game.rankingList,wg_time:a.startupTitle},null,8,["card_array","assignment_string","WG_rankingList","wg_time"]))])}const Q=e=>((0,o.dD)("data-v-4f761398"),e=e(),(0,o.Cn)(),e),ee={id:"player_list_container"},te=Q((()=>(0,o._)("h1",null,"Player List",-1))),ne={id:"container_player"};function ae(e,t,n,a,s,r){const i=(0,o.up)("WG_player_view");return(0,o.wg)(),(0,o.iD)("div",ee,[te,(0,o._)("div",ne,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(this.playerList,((e,t)=>((0,o.wg)(),(0,o.j4)(i,{key:t,WG_pseudo:e.pseudo,WG_point:e.point,WG_hasFinished:e.hasFinished},null,8,["WG_pseudo","WG_point","WG_hasFinished"])))),128))])])}var oe=n.p+"img/carpe_japonaise.e5db5808.jpg";const se=e=>((0,o.dD)("data-v-44a97a2e"),e=e(),(0,o.Cn)(),e),re=se((()=>(0,o._)("img",{src:oe},null,-1)));function ie(e,t,n,a,s,r){return(0,o.wg)(),(0,o.iD)("div",{id:"player_view",class:(0,w.C_)(["defaultStyle",{hasFinishedStyle:this.hasFinished}])},[re,(0,o._)("p",null,(0,w.zw)(this.pseudo),1),(0,o._)("p",null,(0,w.zw)(this.point),1)],2)}var le={name:"WG_player_view",props:{WG_pseudo:String,WG_point:Number,WG_hasFinished:Boolean},setup(e){const t=(0,r.Vh)(e,"WG_pseudo"),n=(0,r.Vh)(e,"WG_point"),a=(0,r.Vh)(e,"WG_hasFinished");return{pseudo:t,point:n,hasFinished:a}}};const ue=(0,y.Z)(le,[["render",ie],["__scopeId","data-v-44a97a2e"]]);var ce=ue,de={name:"WG_player_list_container",components:{WG_player_view:ce},props:{WG_player_list:{type:[Array,Object],required:!0}},setup(e){const t=(0,r.Vh)(e,"WG_player_list"),a=n(5997),o=new Audio;o.src=a;const s=()=>{o.play()};return{player:o,playerList:t,ring:s}},watch:{playerList(){this.ring()}}};const pe=(0,y.Z)(de,[["render",ae],["__scopeId","data-v-4f761398"]]);var me=pe;const he={id:"background"},ge={id:"gameplay"};function _e(e,t,n,a,s,r){const i=(0,o.up)("WG_gameCard");return(0,o.wg)(),(0,o.iD)("div",he,[(0,o._)("div",ge,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(this.cards,((e,t)=>((0,o.wg)(),(0,o.j4)(i,{onSendAnswer:t=>a.sendAnswer(e),key:t,card_value:e},null,8,["onSendAnswer","card_value"])))),128))]),(0,o._)("h1",null,(0,w.zw)(this.assignment),1)])}function ve(e,t,n,a,s,r){return(0,o.wg)(),(0,o.iD)("span",{onClick:t[0]||(t[0]=(...e)=>this.clickEvent&&this.clickEvent(...e)),class:"cardDesign",style:(0,w.j5)({fontSize:n.String_size})},(0,w.zw)(n.card_value),5)}var be={name:"WG_gameCard",props:{Info_value:String,Error_value:String,card_value:String,String_size:{default:"10em",type:String}},emits:["sendAnswer"],setup(e,{emit:t}){const n=()=>{t("sendAnswer")};return{clickEvent:n}}};const we=(0,y.Z)(be,[["render",ve],["__scopeId","data-v-58243bd5"]]);var fe=we,ke={name:"wg_game_mod_1",props:{card_array:{type:[Array,Object]},assignment_string:{type:[String]}},components:{WG_gameCard:fe},unmounted(){this.backApp.closeEvents(this.backApp.ANSWER_GAME_EVENT)},mounted(){this.backApp.listen(this.backApp.ANSWER_GAME_EVENT,this.receiveAnswer)},setup(e){const t=(0,r.Vh)(e,"card_array"),n=(0,r.Vh)(e,"assignment_string"),a=(0,o.f3)("backApp");console.log(n),console.log("This is gamemod1");const s=()=>{},i=e=>{console.log(e),a.sendData(a.ANSWER_GAME_EVENT,{answer:e})};return{cards:t,backApp:a,assignment:n,sendAnswer:i,receiveAnswer:s}}};const ye=(0,y.Z)(ke,[["render",_e],["__scopeId","data-v-44aa383a"]]);var Ee=ye;const Ge={id:"background"},We={id:"gameplay"};function Ae(e,t,n,a,s,r){const i=(0,o.up)("WG_gameCard"),l=(0,o.up)("WG_panelError");return(0,o.wg)(),(0,o.iD)("div",Ge,[(0,o._)("div",We,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(this.cards,((e,t)=>((0,o.wg)(),(0,o.j4)(i,{onSendAnswer:t=>this.sendAnswer(e),key:t,card_value:e,String_size:"3em"},null,8,["onSendAnswer","card_value"])))),128))]),(0,o.Wm)(l,{informationProp:this.infoValue,errorProp:this.errorValue},null,8,["informationProp","errorProp"]),(0,o._)("h1",null,(0,w.zw)(this.assignment),1)])}var Le={name:"wg_game_mod_2",components:{WG_gameCard:fe,WG_panelError:G},setup(){const e=(0,o.f3)("backApp"),t=(0,r.iH)(new Array),n=(0,r.iH)(""),a=(0,r.iH)(""),s=(0,r.iH)("");return{backApp:e,assignment:s,cards:t,errorValue:n,infoValue:a}}};const Se=(0,y.Z)(Le,[["render",Ae],["__scopeId","data-v-5ab9e781"]]);var Ve=Se;const Ce=e=>((0,o.dD)("data-v-3dec75ec"),e=e(),(0,o.Cn)(),e),Te={id:"background"},Ze={id:"endMenu"},He=Ce((()=>(0,o._)("h1",null,"Game Ranking",-1))),Me={id:"rankinglist"},De={id:"menu_button"};function Ie(e,t,n,a,s,r){const i=(0,o.up)("button_wordgame");return(0,o.wg)(),(0,o.iD)("div",Te,[(0,o._)("div",Ze,[He,(0,o._)("div",Me,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(this.rankingList,((e,t)=>((0,o.wg)(),(0,o.iD)("span",{class:"rankPlayer",key:t},(0,w.zw)(t+1)+". "+(0,w.zw)(e),1)))),128))]),(0,o._)("h2",null,(0,w.zw)(this.message),1),(0,o._)("div",De,[(0,o.Wm)(i,{onClick:a.redirectLobby,wg_value:"Lobby"},null,8,["onClick"]),(0,o.Wm)(i,{onClick:a.restart,wg_value:"restart"},null,8,["onClick"])])])])}var Pe={name:"wg_end_game_menu",components:{button_wordgame:U},props:{WG_rankingList:Array},setup(e){const t=(0,r.Vh)(e,"WG_rankingList"),n=(0,o.f3)("backApp");console.log(t);const a=(0,r.iH)("Waiting players to finish...");t.value.length>0&&(a.value="");const s=()=>{a.value=""},i=()=>{console.log("lobby"),n.sendRequest("")},l=()=>{console.log("restart"),n.sendRequest("restart")};return(0,o.YP)(t,s),{rankingList:t,message:a,redirectLobby:i,restart:l}}};const Re=(0,y.Z)(Pe,[["render",Ie],["__scopeId","data-v-3dec75ec"]]);var je=Re;const Ne={id:"background"};function Oe(e,t,n,a,s,r){return(0,o.wg)(),(0,o.iD)("div",Ne,[(0,o._)("h1",null,(0,w.zw)(n.wg_time),1)])}var ze={name:"gameStartup",props:{wg_time:String},startup(){}};const Ue=(0,y.Z)(ze,[["render",Oe],["__scopeId","data-v-f191fa70"]]);var Be=Ue,Fe={name:"wg_game",components:{WG_player_list_container:me,wg_end_game_menu:je,wg_game_mod_1:Ee,wg_game_mod_2:Ve,wg_startup:Be},beforeUnmount(){this.backApp.closeEvents("ready")},setup(){const e=(0,o.f3)("game"),t=(0,o.f3)("backApp"),n=(0,r.iH)(new Array),a=(0,r.iH)(""),s=(0,r.iH)(0),i=(0,r.iH)("Starting...");var l=(0,r.XI)("");l.value=Be;const u=()=>{console.log("game ended"),l.value=je},c=e=>{"gameMod1"==e&&(l.value=Ee),"gameMod2"==e&&(l.value=Ve)},d=e=>{console.log(e),"undefined"!=typeof e.event&&"start"==e.event&&h(),"undefined"!=typeof e.event&&"end"==e.event&&u()},p=t=>{e.playerList=t.playerList},m=e=>{console.log(e),n.value=e.round.cards,a.value=e.round.assignment,s.value=e.round.round},h=()=>{let t=4,n=setInterval((()=>{t--,i.value="Starting in "+t,0==t&&(clearInterval(n),console.log(e.gameMod),c(e.gameMod))}),1e3)};return{backApp:t,cards:n,assignment:a,startupTitle:i,component:l,game:e,nextRound:m,start:h,endGame:u,gameEventHandler:d,updatePlayerList:p}},mounted(){this.backApp.listen(this.backApp.ROUND_GAME_EVENT,this.nextRound),this.backApp.listen(this.backApp.PLAYER_LIST_EVENT,this.updatePlayerList),this.backApp.listen(this.backApp.GAME_EVENT,this.gameEventHandler),this.backApp.sendData(this.backApp.GAME_EVENT,{event:"ready"})},unmounted(){this.backApp.closeEvents(this.backApp.ROUND_GAME_EVENT),this.backApp.closeEvents(this.backApp.PLAYER_LIST_EVENT),this.backApp.closeEvents(this.backApp.GAME_EVENT)}};const qe=(0,y.Z)(Fe,[["render",X],["__scopeId","data-v-4fad56c5"]]);var xe=qe;const Ye=e=>((0,o.dD)("data-v-2e44e0e8"),e=e(),(0,o.Cn)(),e),Je={id:"main"},Ke={id:"background"},$e={key:0,id:"rules"},Xe=Ye((()=>(0,o._)("h1",null,"Rules :",-1))),Qe=Ye((()=>(0,o._)("h2",null," Wait the leader to start the game !",-1))),et={key:1,id:"menu"},tt={id:"parameters_gamemod"},nt={id:"wordsNumber"},at={id:"wordsNumber"},ot={id:"listGameMod"};function st(e,t,n,s,r,i){const l=(0,o.up)("WG_player_list_container"),u=(0,o.up)("WGmultichoice"),c=(0,o.up)("WGprogressBar"),d=(0,o.up)("WGbutton"),p=(0,o.up)("WGbuttonImage");return(0,o.wg)(),(0,o.iD)("div",Je,[(0,o.Wm)(l,{WG_player_list:this.game.playerList},null,8,["WG_player_list"]),(0,o._)("div",Ke,[s.game.isOwner?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("div",$e,[Xe,(0,o._)("ul",null,[(0,o._)("li",null,"JLPT level : "+(0,w.zw)(s.rules.jlptLevel),1),(0,o._)("li",null,"timeout : "+(0,w.zw)(s.rules.timeout),1),(0,o._)("li",null,"rounds : "+(0,w.zw)(s.rules.rounds),1),(0,o._)("li",null,"gameMod : "+(0,w.zw)(s.rules.gameMod),1)]),Qe])),s.game.isOwner?((0,o.wg)(),(0,o.iD)("div",et,[(0,o._)("span",tt,[(0,o._)("button",{id:"parameter_button",onClick:t[0]||(t[0]=(...e)=>s.showParameters&&s.showParameters(...e))},"Settings"),(0,o._)("button",{id:"gamemod_button",onClick:t[1]||(t[1]=(...e)=>s.showGameMod&&s.showGameMod(...e))},"Game mod")]),(0,o._)("div",{id:"sub_menu",style:(0,w.j5)({left:s.width})},[(0,o._)("form",{id:"parameters",onSubmit:t[5]||(t[5]=(0,a.iM)(((...e)=>s.showGameMod&&s.showGameMod(...e)),["prevent"]))},[(0,o.Wm)(u,{modelValue:this.rules.jlptLevel,"onUpdate:modelValue":t[2]||(t[2]=e=>this.rules.jlptLevel=e),WG_choices:this.choices,WG_title:"jlpt level:"},null,8,["modelValue","WG_choices"]),(0,o.Wm)(c,{modelValue:this.progressBarRound,"onUpdate:modelValue":t[3]||(t[3]=e=>this.progressBarRound=e)},null,8,["modelValue"]),(0,o._)("p",nt,"Round number : "+(0,w.zw)(this.rules.rounds=Math.round(parseInt(this.progressBarRound)*this.maxRound/100)),1),(0,o.Wm)(c,{modelValue:this.progressBarTime,"onUpdate:modelValue":t[4]||(t[4]=e=>this.progressBarTime=e)},null,8,["modelValue"]),(0,o._)("p",at,"Timeout/round : "+(0,w.zw)(this.rules.timeout=Math.round(parseInt(this.progressBarTime)*this.maxTimeout/100)),1),(0,o.Wm)(d,{type:"button",onClickWG:s.copyGameHash,wg_value:s.clickToCopy},null,8,["onClickWG","wg_value"]),(0,o.Wm)(d,{wg_value:"next"})],32),(0,o._)("form",{id:"gamemod",onSubmit:t[8]||(t[8]=(0,a.iM)(((...e)=>s.launchGame&&s.launchGame(...e)),["prevent"]))},[(0,o._)("div",ot,[(0,o.Wm)(p,{image_url:s.url1,onClick:t[6]||(t[6]=e=>s.setGame("gameMod1")),game_name:"Choice",background:"1d323c"},null,8,["image_url"]),(0,o.Wm)(p,{image_url:s.url2,onClick:t[7]||(t[7]=e=>s.setGame("gameMod2")),game_name:"Assembly",background:"B0DAEF"},null,8,["image_url"])]),(0,o.Wm)(d,{wg_value:"launch"})],32)],4)])):(0,o.kq)("",!0)])])}const rt={class:"progress-bar"};function it(e,t,n,s,r,i){return(0,o.wg)(),(0,o.iD)("label",rt,[(0,o.wy)((0,o._)("input",{type:"range",min:"1",max:"100","onUpdate:modelValue":t[0]||(t[0]=e=>this.wg_value=e),class:"slider"},null,512),[[a.nr,this.wg_value]])])}var lt={name:"WG_progress_bar",props:{modelValue:String},data:function(){return{wg_value:"0"}},watch:{wg_value:function(){this.$emit("update:modelValue",this.wg_value)}},emits:["update:modelValue"]};const ut=(0,y.Z)(lt,[["render",it],["__scopeId","data-v-63b1d18f"]]);var ct=ut;function dt(e,t,n,a,s,r){return(0,o.wg)(),(0,o.iD)("div",null,[(0,o._)("button",{type:"button",style:(0,w.j5)(a.cssProps)},null,4),(0,o._)("label",null,(0,w.zw)(n.game_name),1)])}var pt={name:"WG_button_image",props:{image_url:String,game_name:String,background:String,modelValue:String},setup(e){var t={"background-image":`url(${e.image_url})`,"background-color":`#${e.background}`};return{cssProps:t}},emits:["update:modelValue"]};const mt=(0,y.Z)(pt,[["render",dt],["__scopeId","data-v-5034f244"]]);var ht=mt;const gt={id:"multichoice"},_t=["value"];function vt(e,t,n,s,r,i){return(0,o.wg)(),(0,o.iD)("div",gt,[(0,o._)("label",null,(0,w.zw)(this.title),1),(0,o.wy)((0,o._)("select",{id:"multichoice","onUpdate:modelValue":t[0]||(t[0]=e=>this.value=e)},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(this.choices,((e,t)=>((0,o.wg)(),(0,o.iD)("option",{value:e,key:t},(0,w.zw)(e),9,_t)))),128))],512),[[a.bM,this.value]])])}var bt={name:"WG_multichoice",props:{WG_title:String,WG_choices:Array},setup(e,{emit:t}){const n=(0,r.Vh)(e,"WG_choices"),a=(0,r.Vh)(e,"WG_title"),s=(0,r.iH)(5),i=()=>{t("update:modelValue",s.value)};return(0,o.YP)(s,i),{choices:n,title:a,value:s}}};const wt=(0,y.Z)(bt,[["render",vt],["__scopeId","data-v-1d7b09f0"]]);var ft=wt,kt=n.p+"img/kanji_game_1.1c1453ab.png",yt=n.p+"img/kanji_game_2.7c7bf368.png",Et={name:"wg_lobby",components:{WG_player_list_container:me,WGbutton:U,WGbuttonImage:ht,WGprogressBar:ct,WGmultichoice:ft},setup(){const e=(0,o.f3)("user"),t=(0,o.f3)("game"),n=(0,r.iH)("1"),a=(0,r.iH)("1"),s=(0,r.qj)({rounds:1,gameMod:"none",timeout:1,jlptLevel:5}),i=(0,r.iH)(60),l=(0,r.iH)(60),u=(0,r.iH)(!1),c=(0,o.f3)("backApp"),d=(0,r.iH)("50%"),p=(0,r.iH)(kt),m=(0,r.iH)(yt),h=(0,r.iH)([1,2,3,4,5]),g=(0,r.iH)("Copy the gameHash");var _=!0;const v=()=>{d.value="50%"},b=()=>{d.value="-50%"},w=()=>{console.log("copybutton");var e="https://www.kanjiyarou.com?game="+t.gameHash;navigator.clipboard.writeText(e),g.value="Copied !",setTimeout((()=>{g.value="Copy the gameHash"}),2e3)},f=e=>{console.log(e)},k=e=>{console.log(e),console.log("The game is starting"),t.gameMod=e},y=e=>{console.log(e),"undefined"!=typeof e.start&&k(e.start)},E=e=>{t.playerList=e.playerList},G=e=>{t.gameMod=e,s.gameMod=e},W=async e=>{t.isOwner&&_&&(_=!1,setTimeout((()=>{console.log("send"),c.sendData(c.UPDATE_RULES_EVENT,e),_=!0}),250))},A=()=>{c.sendData(c.GAME_EVENT,{event:"launch"})},L=e=>{"undefined"!=typeof e.JLPT_level&&(t.jlpt_level=e.JLPT_level,s.jlptLevel=e.JLPT_level),"undefined"!=typeof e.gameMod&&(s.gameMod=e.gameMod,t.gameMod=e.gameMod),"undefined"!=typeof e.timeout&&(t.timeout=e.timeout,s.timeout=e.timeout),"undefined"!=typeof e.rounds&&(s.rounds=e.rounds,t.rounds=e.rounds)};return{progressBarRound:n,progressBarTime:a,maxTimeout:l,maxRound:i,isChecked:u,user:e,game:t,backApp:c,width:d,url1:p,url2:m,choices:h,clickToCopy:g,showParameters:v,showGameMod:b,errorCallback:f,launchGame:A,copyGameHash:w,setGame:G,gameRulesUpdate:L,gameEventCallback:y,updatePlayerList:E,rules:s,sendNewRules:W}},mounted(){this.backApp.listen(this.backApp.UPDATE_RULES_EVENT,this.gameRulesUpdate),this.backApp.listen(this.backApp.PLAYER_LIST_EVENT,this.updatePlayerList),(0,o.YP)(this.rules,(e=>{this.sendNewRules(e)}))},unmounted(){this.backApp.closeEvents(this.backApp.UPDATE_RULES_EVENT),this.backApp.closeEvents(this.backApp.PLAYER_LIST_EVENT)}};const Gt=(0,y.Z)(Et,[["render",st],["__scopeId","data-v-2e44e0e8"]]);var Wt=Gt;const At=e=>((0,o.dD)("data-v-8366cfe2"),e=e(),(0,o.Cn)(),e),Lt={id:"background"},St=At((()=>(0,o._)("h1",null,"Not Found",-1)));function Vt(e,t,n,a,s,r){return(0,o.wg)(),(0,o.iD)("div",Lt,[St,(0,o._)("h2",null,"redirect in "+(0,w.zw)(e.counter)+" secondes",1)])}var Ct={name:"NotFound",data:function(){return{counter:5}},mounted(){this.increment()},methods:{increment(){var e=setInterval((()=>{this.counter--,0==this.counter&&(clearInterval(e),this.$router.push({path:"/"}))}),1e3)}}};const Tt=(0,y.Z)(Ct,[["render",Vt],["__scopeId","data-v-8366cfe2"]]);var Zt=Tt;const Ht=[{path:"/",component:K},{path:"/:pathMatch(.*)*",component:Zt},{path:"/game",component:xe},{path:"/lobby",component:Wt}],Mt=(0,b.p7)({history:(0,b.PO)(),routes:Ht}),Dt=(0,a.ri)(L);Dt.config.unwrapInjectedRef=!0,Dt.use(Mt),Dt.mount("#app")},5997:function(e,t,n){e.exports=n.p+"media/Water_Drop.a509e23f.mp3"}},t={};function n(a){var o=t[a];if(void 0!==o)return o.exports;var s=t[a]={exports:{}};return e[a](s,s.exports,n),s.exports}n.m=e,function(){var e=[];n.O=function(t,a,o,s){if(!a){var r=1/0;for(c=0;c<e.length;c++){a=e[c][0],o=e[c][1],s=e[c][2];for(var i=!0,l=0;l<a.length;l++)(!1&s||r>=s)&&Object.keys(n.O).every((function(e){return n.O[e](a[l])}))?a.splice(l--,1):(i=!1,s<r&&(r=s));if(i){e.splice(c--,1);var u=o();void 0!==u&&(t=u)}}return t}s=s||0;for(var c=e.length;c>0&&e[c-1][2]>s;c--)e[c]=e[c-1];e[c]=[a,o,s]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/"}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,a){var o,s,r=a[0],i=a[1],l=a[2],u=0;if(r.some((function(t){return 0!==e[t]}))){for(o in i)n.o(i,o)&&(n.m[o]=i[o]);if(l)var c=l(n)}for(t&&t(a);u<r.length;u++)s=r[u],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(c)},a=self["webpackChunkkanjiyarou"]=self["webpackChunkkanjiyarou"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(1660)}));a=n.O(a)})();
//# sourceMappingURL=app.e9eba028.js.map