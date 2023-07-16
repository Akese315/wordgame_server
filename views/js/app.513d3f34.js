(function(){var e={1536:function(e,t,n){"use strict";var o=n(9242),a=n(3396);function s(e,t,n,o,s,i){const r=(0,a.up)("panel_error"),l=(0,a.up)("router-view");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a.Wm)(r,{errorProp:o.error},null,8,["errorProp"]),(0,a.Wm)(l)],64)}var i=n(4870),r=n(2482),l=n(878),u=n(2575),c=n(8829);const d="https://www.kanjiyarou.com";var p=n(2066),m=new WeakMap,g=new WeakMap,h=new WeakMap;class _{constructor(e){(0,l.Z)(this,m,{writable:!0,value:void 0}),(0,r.Z)(this,"gameReference",void 0),(0,r.Z)(this,"isClose",!0),(0,l.Z)(this,g,{writable:!0,value:void 0}),(0,l.Z)(this,h,{writable:!0,value:void 0}),(0,r.Z)(this,"SET_PSEUDO_EVENT","player:pseudo"),(0,r.Z)(this,"JOIN_GAME_EVENT","game:join"),(0,r.Z)(this,"CREATE_GAME_EVENT","game:create"),(0,r.Z)(this,"ROUND_GAME_EVENT","game:round"),(0,r.Z)(this,"UPDATE_RULES_EVENT","game:rules"),(0,r.Z)(this,"GAME_EVENT","game:event"),(0,r.Z)(this,"ANSWER_GAME_EVENT","game:answer"),(0,r.Z)(this,"PLAYER_LIST_EVENT","game:playerList"),this.gameReference=e}openConnection(e,t,n){"undefined"==typeof(0,c.Z)(this,m)&&this.isClose&&((0,u.Z)(this,m,new p.io(d,{reconnection:!0,reconnectionDelay:3e3,reconnectionAttempts:10,path:"/socket",transports:["websocket"],upgrade:!0,query:e})),(0,c.Z)(this,m).on("handshakeResponse",(e=>{t(e)})),(0,c.Z)(this,m).on("connect_error",(()=>{n("Connnection error")})),(0,c.Z)(this,m).on("connect_failed",(()=>{n("Connection failed")})),(0,c.Z)(this,m).on("connect",(()=>{this.connected()})),(0,c.Z)(this,m).on("reconnection_attempt",(()=>{console.log("attempt to reconnect")})),(0,c.Z)(this,m).on("disconnect",(()=>{console.log("disconnect event")})),(0,c.Z)(this,m).on("Notification",(()=>{})),this.isClose=!1)}closeSocket(){(0,c.Z)(this,m).close(),console.log("socket close by the client")}closeEvents(e){(0,c.Z)(this,m).off(e)}sendRequest(e,t,n){(0,c.Z)(this,m).emit(e,t),this.listenOnce(e,n)}sendData(e,t){(0,c.Z)(this,m).emit(e,t)}listen(e,t){(0,c.Z)(this,m).on(e,(n=>{"undefined"!=typeof t?t(n):(0,c.Z)(this,m).off(e)}))}listenOnce(e,t){(0,c.Z)(this,m).once(e,(e=>{"undefined"!=typeof t&&t(e),"undefined"!=typeof e.redirect&&(0,c.Z)(this,h).call(this,e.redirect)}))}stopListeningGame(e){(0,c.Z)(this,m).off(e)}disconnected(){console.log("Socket closed"),this.closeSocket();var e=alert("you are disconnected from the server");e&&window.close()}connected(){console.log("Connecté")}setRedirectCallback(e){(0,u.Z)(this,h,e)}}class v{constructor(){(0,r.Z)(this,"gameHash",void 0),(0,r.Z)(this,"isOwner",void 0),(0,r.Z)(this,"gameMod",void 0),(0,r.Z)(this,"rounds",void 0),(0,r.Z)(this,"timeout",void 0),(0,r.Z)(this,"currentRound",void 0),(0,r.Z)(this,"jlpt_level",void 0),(0,r.Z)(this,"playerList",void 0),(0,r.Z)(this,"rankingList",void 0),this.playerList=new Array,this.rankingList=new Array,this.rounds=1,this.currentRound=null,this.gameHash="none",this.isOwner="none",this.jlpt_level="none"}setPlayerList(e){this.playerList=e}setRankingList(e){this.rankingList=e}getPlayerList(){return this.playerList}}var f=n(678),w=n(7139);function b(e,t,n,o,s,i){return(0,a.wg)(),(0,a.iD)("div",{id:"panel",style:(0,w.j5)({"background-color":this.background,display:this.display})},[(0,a._)("h1",null,(0,w.zw)(o.message),1)],4)}var k={name:"panel_error",props:{informationProp:String,errorProp:String},setup(e){const t=(0,i.Vh)(e,"errorProp"),n=(0,i.Vh)(e,"informationProp"),o=(0,i.iH)(""),a=(0,i.iH)("none"),s=(0,i.iH)("none");return{error:t,information:n,background:a,display:s,message:o}},watch:{error(){""!=this.error?(this.background="rgba(200,10,10,0.5)",this.message=this.error,this.display="block"):(this.display="none",this.message="")},information(){""!=this.information?(this.background="rgba(0,0,255,0.5)",this.display="block",this.message=this.information):(this.display="none",this.message="")}}},y=n(89);const E=(0,y.Z)(k,[["render",b],["__scopeId","data-v-7c7e0e45"]]);var G=E,W={name:"App",components:{panel_error:G},metaInfo:{title:"d"},setup(){const e=(0,i.qj)({pseudo:"none",hash:"none"}),t=(0,i.qj)(new v),n=(0,f.tv)(),o=new _(t),s=(0,i.iH)(""),r=(0,i.iH)("");e.hash=localStorage.getItem("userHash"),e.pseudo=localStorage.getItem("pseudo"),(0,a.JJ)("user",e),(0,a.JJ)("game",t),(0,a.JJ)("backApp",o);const l=t=>{"undefined"!=typeof t.userInformation&&("undefined"!=typeof t.userInformation.pseudo&&(e.pseudo=t.userInformation.pseudo,localStorage.setItem("pseudo",e.pseudo)),"undefined"!=typeof t.userInformation.userHash&&(e.hash=t.userInformation.userHash,localStorage.setItem("userHash",e.hash)),"undefined"!=typeof t.userInformation.icon&&(e.icon=t.userInformation.icon,localStorage.setItem("icon",e.icon)))},u=e=>{s.value=e,setTimeout((()=>{s.value=""}),3e3)},c=e=>{r.value=e,setTimeout((()=>{r.value=""}),3e3)},d=e=>{switch(e){case"game":console.log("joined the game"),n.push({path:"/game"});break;case"home":console.log("welcome :)"),n.push({path:"/"});break;case"lobby":console.log("joined the lobby"),n.push({path:"/lobby"});break}};return{user:e,error:s,game:t,backApp:o,redirectCallback:d,openConnectionCallback:l,errorCallback:u,infoCallback:c}},mounted(){this.backApp.openConnection({userHash:this.user.hash},this.openConnectionCallback,this.errorCallback),this.backApp.setRedirectCallback(this.redirectCallback),this.backApp.listen("redirect",this.redirectCallback),this.backApp.listen("error",this.errorCallback),this.backApp.listen("info",this.infoCallback)}};const A=(0,y.Z)(W,[["render",s]]);var L=A;const S=e=>((0,a.dD)("data-v-04b4a151"),e=e(),(0,a.Cn)(),e),V={id:"background"},T={id:"main_card"},C=S((()=>(0,a._)("h1",null,"Welcome to the KanjiYarou!",-1))),H=S((()=>(0,a._)("h2",null,"ワードゲームへようこそ ",-1))),I=S((()=>(0,a._)("span",{id:"author"},[(0,a._)("a",{href:"https://www.patreon.com/1041uuu",target:"_blank"},[(0,a.Uk)(" wallpaper : "),(0,a._)("br"),(0,a.Uk)("1041uuu")])],-1)));function Z(e,t,n,s,i,r){const l=(0,a.up)("WGinput"),u=(0,a.up)("WGbutton"),c=(0,a.up)("WGerror");return(0,a.wg)(),(0,a.iD)("div",V,[(0,a._)("div",T,[C,H,(0,a._)("form",{onSubmit:t[1]||(t[1]=(0,o.iM)(((...e)=>s.setPseudo&&s.setPseudo(...e)),["prevent"]))},[(0,a.Wm)(l,{modelValue:this.pseudoInput,"onUpdate:modelValue":t[0]||(t[0]=e=>this.pseudoInput=e),wg_placeholder:"Pseudo"},null,8,["modelValue"]),(0,a.Wm)(u,{wg_value:"Play"}),(0,a.Wm)(c,{WG_value:this.errorInput,Bounce:this.bounce},null,8,["WG_value","Bounce"])],32)]),I])}const M={id:"input_wg"};function D(e,t,n,s,i,r){return(0,a.wg)(),(0,a.iD)("div",M,[(0,a.wy)((0,a._)("input",{id:"input","onUpdate:modelValue":t[0]||(t[0]=e=>s.update_wg_value=e),type:"text",autocomplete:"off",onFocus:t[1]||(t[1]=(...e)=>r.onFocus&&r.onFocus(...e)),onBlur:t[2]||(t[2]=(...e)=>r.onBlur&&r.onBlur(...e)),required:""},null,544),[[o.nr,s.update_wg_value]]),(0,a._)("label",{class:(0,w.C_)({input_selected:s.focused}),id:"placeholder"},(0,w.zw)(n.wg_placeholder),3)])}var P={name:"WG_input",props:{wg_placeholder:String,modelValue:String},emits:["update:modelValue"],setup(e,{emit:t}){const n=(0,i.iH)(!1),o=(0,i.iH)(e.modelValue),a=(0,i.Fl)({get(){return o.value},set(e){o.value=e,t("update:modelValue",o.value)}});return""!=o.value&&(n.value=!0),{focused:n,wg_value:o,update_wg_value:a}},methods:{onFocus(){this.focused=!0},onBlur(){""==this.wg_value&&(this.focused=!1)}}};const j=(0,y.Z)(P,[["render",D],["__scopeId","data-v-cb9b930a"]]);var R=j;function N(e,t,n,o,s,i){return(0,a.wg)(),(0,a.iD)("button",{style:(0,w.j5)({width:n.width}),onClick:t[0]||(t[0]=(...e)=>o.clickEvent&&o.clickEvent(...e))},(0,w.zw)(n.wg_value),5)}var O={name:"WG_button",props:{wg_value:String,width:{default:"100px",type:String}},emits:["clickWG"],setup(e,{emit:t}){const n=()=>{t("clickWG")};return{clickEvent:n}}};const z=(0,y.Z)(O,[["render",N],["__scopeId","data-v-a04c826e"]]);var U=z;function B(e,t,n,o,s,i){return(0,a.wg)(),(0,a.iD)("label",{class:(0,w.C_)({actived:n.Bounce})},(0,w.zw)(n.WG_value),3)}var x={name:"WG_error",props:{WG_value:String,Bounce:Boolean},data:function(){return{}}};const F=(0,y.Z)(x,[["render",B],["__scopeId","data-v-95888db4"]]);var Y=F,q={name:"wg_home",components:{WGinput:R,WGbutton:U,WGerror:Y},setup(){const e=(0,i.iH)(""),t=(0,i.iH)(""),n=(0,i.iH)(!1),o=(0,a.f3)("user"),s=(0,a.f3)("game"),r=(0,a.f3)("backApp"),l=(0,f.yj)();s.gameHash=l.query.game;const u=()=>{n.value=!0,setTimeout((()=>{n.value=!1}),1e3)},c=e=>{s.playerList=e.playerList,s.gameHash=e.gameHash,s.isOwner=e.isOwner},d=e=>{s.isOwner=e.isOwner,s.playerList=e.playerList},p=e=>{o.pseudo=e.pseudo,localStorage.setItem("pseudo",o.pseudo),"undefined"!=typeof s.gameHash?(console.log("joining..."),r.sendRequest("game:join",{userHash:o.hash,gameHash:s.gameHash},d)):(console.log("creating game..."),r.sendRequest("game:create",{userHash:o.hash},c))},m=()=>{console.log("setting pseudo..."),r.sendRequest("player:pseudo",{pseudo:e.value,userHash:o.hash},p)};return{pseudoInput:e,errorInput:t,backApp:r,bounce:n,user:o,ErrorBounceAnimation:u,setPseudo:m}}};const J=(0,y.Z)(q,[["render",Z],["__scopeId","data-v-04b4a151"]]);var K=J;const $={id:"main"},X={id:"game_info"},Q={id:"seconds"},ee={id:"milliseconds"},te={id:"round"};function ne(e,t,n,o,s,i){const r=(0,a.up)("WG_player_list_container");return(0,a.wg)(),(0,a.iD)("div",$,[(0,a.Wm)(r,{WG_player_list:o.game.playerList},null,8,["WG_player_list"]),((0,a.wg)(),(0,a.j4)((0,a.LL)(o.component),{card_array:o.cards,assignment_string:o.assignment,WG_rankingList:o.game.rankingList,wg_time:o.startupTitle},null,8,["card_array","assignment_string","WG_rankingList","wg_time"])),(0,a._)("div",X,[(0,a._)("span",Q,(0,w.zw)(o.timer.seconds)+" :",1),(0,a._)("span",ee,(0,w.zw)(o.timer.milliseconds),1),(0,a._)("span",te,"#"+(0,w.zw)(o.round),1)])])}const oe=e=>((0,a.dD)("data-v-d0fb2aa8"),e=e(),(0,a.Cn)(),e),ae={id:"player_list_container"},se=oe((()=>(0,a._)("h1",null,"Player List",-1))),ie={id:"container_player"},re=oe((()=>(0,a._)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},[(0,a._)("path",{d:"M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"})],-1))),le=[re];function ue(e,t,n,o,s,i){const r=(0,a.up)("WG_player_view");return(0,a.wg)(),(0,a.iD)("div",{id:"container",style:(0,w.j5)({transform:this.position})},[(0,a._)("div",ae,[se,(0,a._)("div",ie,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(this.playerList,((e,t)=>((0,a.wg)(),(0,a.j4)(r,{key:t,WG_pseudo:e.pseudo,WG_point:e.point,WG_hasFinished:e.hasFinished,WG_icon:e.icon},null,8,["WG_pseudo","WG_point","WG_hasFinished","WG_icon"])))),128))])]),(0,a._)("span",{id:"tag",onClick:t[0]||(t[0]=e=>o.showContainer())},le)],4)}const ce=["src"];function de(e,t,n,o,s,i){return(0,a.wg)(),(0,a.iD)("div",{id:"player_view",class:(0,w.C_)(["defaultStyle",{hasFinishedStyle:this.hasFinished}])},[(0,a._)("img",{src:this.icon},null,8,ce),(0,a._)("p",null,(0,w.zw)(this.pseudo),1),(0,a._)("p",null,(0,w.zw)(this.point),1)],2)}var pe={name:"WG_player_view",props:{WG_pseudo:String,WG_point:Number,WG_hasFinished:Boolean,WG_icon:String},setup(e){const t=(0,i.Vh)(e,"WG_pseudo"),o=(0,i.Vh)(e,"WG_point"),a=(0,i.Vh)(e,"WG_icon"),s=(0,i.Vh)(e,"WG_hasFinished"),r=(0,i.iH)(""),l=()=>{console.log(a.value),r.value=n(4548)("./"+a.value+".png")};return{pseudo:t,icon:r,point:o,hasFinished:s,setIcon:l}},mounted(){this.setIcon()}};const me=(0,y.Z)(pe,[["render",de],["__scopeId","data-v-135b82f9"]]);var ge=me,he={name:"WG_player_list_container",components:{WG_player_view:ge},props:{WG_player_list:{type:[Array,Object],required:!0}},setup(e){const t=(0,i.Vh)(e,"WG_player_list"),o=n(5997),a=(0,i.iH)("100%"),s=new Audio;var r=!1;s.src=o;const l=()=>{s.play()},u=()=>{r?(a.value="translateY(-100%)",r=!1):(a.value="translateY(0%)",r=!0)};return{playerList:t,ring:l,position:a,showContainer:u}},watch:{playerList(){this.ring()}}};const _e=(0,y.Z)(he,[["render",ue],["__scopeId","data-v-d0fb2aa8"]]);var ve=_e;const fe={id:"background"},we={id:"gameplay"};function be(e,t,n,o,s,i){const r=(0,a.up)("WG_gameCard");return(0,a.wg)(),(0,a.iD)("div",fe,[(0,a._)("div",we,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(this.cards,((e,t)=>((0,a.wg)(),(0,a.j4)(r,{onSendAnswer:t=>o.sendAnswer(e),key:t,card_value:e},null,8,["onSendAnswer","card_value"])))),128))]),(0,a._)("h1",null,(0,w.zw)(this.assignment),1)])}function ke(e,t,n,o,s,i){return(0,a.wg)(),(0,a.iD)("span",{onClick:t[0]||(t[0]=(...e)=>this.clickEvent&&this.clickEvent(...e)),class:"cardDesign"},[(0,a._)("p",{style:(0,w.j5)({fontSize:n.String_size})},(0,w.zw)(n.card_value),5)])}var ye={name:"WG_gameCard",props:{Info_value:String,Error_value:String,card_value:String,answer:Boolean,String_size:{default:"12vw",type:String}},emits:["sendAnswer"],setup(e,{emit:t}){const n=()=>{t("sendAnswer")};return{clickEvent:n}}};const Ee=(0,y.Z)(ye,[["render",ke],["__scopeId","data-v-89f9691a"]]);var Ge=Ee,We={name:"wg_game_mod_1",props:{card_array:{type:[Array,Object]},assignment_string:{type:[String]}},components:{WG_gameCard:Ge},unmounted(){this.backApp.closeEvents(this.backApp.ANSWER_GAME_EVENT)},mounted(){this.backApp.listen(this.backApp.ANSWER_GAME_EVENT,this.receiveAnswer)},setup(e){const t=(0,i.Vh)(e,"card_array"),n=(0,i.Vh)(e,"assignment_string"),o=(0,a.f3)("backApp");console.log(n),console.log("This is gamemod1");const s=e=>{e.answer?console.log("true"):console.log("false")},r=e=>{console.log(e),o.sendData(o.ANSWER_GAME_EVENT,{answer:e})};return{cards:t,backApp:o,assignment:n,sendAnswer:r,receiveAnswer:s}}};const Ae=(0,y.Z)(We,[["render",be],["__scopeId","data-v-ba31f2e0"]]);var Le=Ae;const Se={id:"background"},Ve={id:"gameplay"};function Te(e,t,n,o,s,i){const r=(0,a.up)("WG_gameCard"),l=(0,a.up)("WG_panelError");return(0,a.wg)(),(0,a.iD)("div",Se,[(0,a._)("div",Ve,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(this.cards,((e,t)=>((0,a.wg)(),(0,a.j4)(r,{onSendAnswer:t=>this.sendAnswer(e),key:t,card_value:e,String_size:"3em"},null,8,["onSendAnswer","card_value"])))),128))]),(0,a.Wm)(l,{informationProp:this.infoValue,errorProp:this.errorValue},null,8,["informationProp","errorProp"]),(0,a._)("h1",null,(0,w.zw)(this.assignment),1)])}var Ce={name:"wg_game_mod_2",components:{WG_gameCard:Ge,WG_panelError:G},setup(){const e=(0,a.f3)("backApp"),t=(0,i.iH)(new Array),n=(0,i.iH)(""),o=(0,i.iH)(""),s=(0,i.iH)("");return{backApp:e,assignment:s,cards:t,errorValue:n,infoValue:o}}};const He=(0,y.Z)(Ce,[["render",Te],["__scopeId","data-v-5ab9e781"]]);var Ie=He;const Ze=e=>((0,a.dD)("data-v-3dec75ec"),e=e(),(0,a.Cn)(),e),Me={id:"background"},De={id:"endMenu"},Pe=Ze((()=>(0,a._)("h1",null,"Game Ranking",-1))),je={id:"rankinglist"},Re={id:"menu_button"};function Ne(e,t,n,o,s,i){const r=(0,a.up)("button_wordgame");return(0,a.wg)(),(0,a.iD)("div",Me,[(0,a._)("div",De,[Pe,(0,a._)("div",je,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(this.rankingList,((e,t)=>((0,a.wg)(),(0,a.iD)("span",{class:"rankPlayer",key:t},(0,w.zw)(t+1)+". "+(0,w.zw)(e),1)))),128))]),(0,a._)("h2",null,(0,w.zw)(this.message),1),(0,a._)("div",Re,[(0,a.Wm)(r,{onClick:o.redirectLobby,wg_value:"Lobby"},null,8,["onClick"]),(0,a.Wm)(r,{onClick:o.restart,wg_value:"restart"},null,8,["onClick"])])])])}var Oe={name:"wg_end_game_menu",components:{button_wordgame:U},props:{WG_rankingList:Array},setup(e){const t=(0,i.Vh)(e,"WG_rankingList"),n=(0,a.f3)("backApp");console.log(t);const o=(0,i.iH)("Waiting players to finish...");t.value.length>0&&(o.value="");const s=()=>{o.value=""},r=()=>{console.log("lobby"),n.sendRequest("")},l=()=>{console.log("restart"),n.sendRequest("restart")};return(0,a.YP)(t,s),{rankingList:t,message:o,redirectLobby:r,restart:l}}};const ze=(0,y.Z)(Oe,[["render",Ne],["__scopeId","data-v-3dec75ec"]]);var Ue=ze;const Be={id:"background"};function xe(e,t,n,o,s,i){return(0,a.wg)(),(0,a.iD)("div",Be,[(0,a._)("h1",null,(0,w.zw)(n.wg_time),1)])}var Fe={name:"gameStartup",props:{wg_time:String},startup(){}};const Ye=(0,y.Z)(Fe,[["render",xe],["__scopeId","data-v-f191fa70"]]);var qe=Ye,Je={name:"wg_game",components:{WG_player_list_container:ve,wg_end_game_menu:Ue,wg_game_mod_1:Le,wg_game_mod_2:Ie,wg_startup:qe},beforeUnmount(){this.backApp.closeEvents("ready")},setup(){const e=(0,a.f3)("game"),t=(0,a.f3)("backApp"),n=(0,i.iH)(new Array),o=(0,i.iH)(""),s=(0,i.iH)(0),r=(0,i.iH)("Starting...");var l=(0,i.XI)(""),u=null;const c=(0,i.iH)(!1),d=(0,i.iH)({seconds:0,milliseconds:0});l.value=qe;const p=()=>{console.log("game ended"),l.value=Ue},m=e=>{"gameMod1"==e&&(l.value=Le),"gameMod2"==e&&(l.value=Ie)},g=e=>{console.log(e),"undefined"!=typeof e.event&&"start"==e.event&&b(),"undefined"!=typeof e.event&&"end"==e.event&&p()},h=t=>{e.playerList=t.playerList},_=()=>{console.log("time reached"),t.sendData(t.GAME_EVENT,{event:"timeout"})},v=()=>{null!=u&&clearInterval(u)},f=()=>{d.value.seconds=e.timeout,u=setInterval((()=>{if(0==d.value.milliseconds){if(d.value.seconds-=1,0==d.value.seconds)return _(),void v();d.value.milliseconds=900}else d.value.milliseconds-=100}),100)},w=e=>{n.value=e.round.cards,o.value=e.round.assignment,s.value=e.round.round,c.value&&(v(),f())},b=()=>{let t=4,n=setInterval((()=>{t--,r.value="Starting in "+t,0==t&&(clearInterval(n),console.log(e.gameMod),m(e.gameMod),f(),c.value=!0,console.log("start"))}),1e3)};return{backApp:t,cards:n,assignment:o,startupTitle:r,component:l,game:e,nextRound:w,start:b,endGame:p,round:s,gameEventHandler:g,updatePlayerList:h,timer:d}},mounted(){this.backApp.listen(this.backApp.ROUND_GAME_EVENT,this.nextRound),this.backApp.listen(this.backApp.PLAYER_LIST_EVENT,this.updatePlayerList),this.backApp.listen(this.backApp.GAME_EVENT,this.gameEventHandler),this.backApp.sendData(this.backApp.GAME_EVENT,{event:"ready"})},unmounted(){this.backApp.closeEvents(this.backApp.ROUND_GAME_EVENT),this.backApp.closeEvents(this.backApp.PLAYER_LIST_EVENT),this.backApp.closeEvents(this.backApp.GAME_EVENT)}};const Ke=(0,y.Z)(Je,[["render",ne],["__scopeId","data-v-4b5de1bf"]]);var $e=Ke;const Xe=e=>((0,a.dD)("data-v-363dab6c"),e=e(),(0,a.Cn)(),e),Qe={id:"main"},et={id:"background"},tt={key:0,id:"rules"},nt=Xe((()=>(0,a._)("h1",null,"Rules :",-1))),ot=Xe((()=>(0,a._)("h2",null," Wait the leader to start the game !",-1))),at={key:1,id:"menu"},st={id:"parameters_gamemod"},it={id:"wordsNumber"},rt={id:"wordsNumber"},lt={id:"listGameMod"};function ut(e,t,n,s,i,r){const l=(0,a.up)("WG_player_list_container"),u=(0,a.up)("WGmultichoice"),c=(0,a.up)("WGprogressBar"),d=(0,a.up)("WGbutton"),p=(0,a.up)("WGbuttonImage");return(0,a.wg)(),(0,a.iD)("div",Qe,[(0,a.Wm)(l,{WG_player_list:this.game.playerList},null,8,["WG_player_list"]),(0,a._)("div",et,[s.game.isOwner?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("div",tt,[nt,(0,a._)("ul",null,[(0,a._)("li",null,"JLPT level : "+(0,w.zw)(s.rules.jlptLevel),1),(0,a._)("li",null,"timeout : "+(0,w.zw)(s.rules.timeout),1),(0,a._)("li",null,"rounds : "+(0,w.zw)(s.rules.rounds),1),(0,a._)("li",null,"gameMod : "+(0,w.zw)(s.rules.gameMod),1)]),ot])),s.game.isOwner?((0,a.wg)(),(0,a.iD)("div",at,[(0,a._)("span",st,[(0,a._)("button",{id:"parameter_button",onClick:t[0]||(t[0]=(...e)=>s.showParameters&&s.showParameters(...e))},"Settings"),(0,a._)("button",{id:"gamemod_button",onClick:t[1]||(t[1]=(...e)=>s.showGameMod&&s.showGameMod(...e))},"Game mode")]),(0,a._)("div",{id:"sub_menu",style:(0,w.j5)({left:s.width})},[(0,a._)("form",{id:"parameters",onSubmit:t[5]||(t[5]=(0,o.iM)(((...e)=>s.showGameMod&&s.showGameMod(...e)),["prevent"]))},[(0,a.Wm)(u,{modelValue:this.rules.jlptLevel,"onUpdate:modelValue":t[2]||(t[2]=e=>this.rules.jlptLevel=e),WG_choices:this.choices,WG_title:"jlpt level:"},null,8,["modelValue","WG_choices"]),(0,a.Wm)(c,{modelValue:this.progressBarRound,"onUpdate:modelValue":t[3]||(t[3]=e=>this.progressBarRound=e)},null,8,["modelValue"]),(0,a._)("p",it,"Round number : "+(0,w.zw)(this.rules.rounds=Math.round(parseInt(this.progressBarRound)*this.maxRound/100)),1),(0,a.Wm)(c,{modelValue:this.progressBarTime,"onUpdate:modelValue":t[4]||(t[4]=e=>this.progressBarTime=e)},null,8,["modelValue"]),(0,a._)("p",rt,"Timeout/round : "+(0,w.zw)(this.rules.timeout=Math.round(parseInt(this.progressBarTime)*this.maxTimeout/100)),1),(0,a.Wm)(d,{wg_value:"next"}),(0,a.Wm)(d,{type:"button",onClickWG:s.copyGameHash,wg_value:s.clickToCopy},null,8,["onClickWG","wg_value"])],32),(0,a._)("form",{id:"gamemod",onSubmit:t[8]||(t[8]=(0,o.iM)(((...e)=>s.launchGame&&s.launchGame(...e)),["prevent"]))},[(0,a._)("div",lt,[(0,a.Wm)(p,{image_url:s.url1,onClick:t[6]||(t[6]=e=>s.setGame("gameMod1")),game_name:"Choice",background:"1d323c"},null,8,["image_url"]),(0,a.Wm)(p,{image_url:s.url2,onClick:t[7]||(t[7]=e=>s.setGame("gameMod2")),game_name:"Assembly",background:"B0DAEF"},null,8,["image_url"])]),(0,a.Wm)(d,{wg_value:"Start"})],32)],4)])):(0,a.kq)("",!0)])])}const ct={class:"progress-bar"};function dt(e,t,n,s,i,r){return(0,a.wg)(),(0,a.iD)("label",ct,[(0,a.wy)((0,a._)("input",{type:"range",min:"1",max:"100","onUpdate:modelValue":t[0]||(t[0]=e=>this.wg_value=e),class:"slider"},null,512),[[o.nr,this.wg_value]])])}var pt={name:"WG_progress_bar",props:{modelValue:String},data:function(){return{wg_value:"0"}},watch:{wg_value:function(){this.$emit("update:modelValue",this.wg_value)}},emits:["update:modelValue"]};const mt=(0,y.Z)(pt,[["render",dt],["__scopeId","data-v-6abad5c3"]]);var gt=mt;function ht(e,t,n,o,s,i){return(0,a.wg)(),(0,a.iD)("div",null,[(0,a._)("button",{type:"button",style:(0,w.j5)(o.cssProps)},null,4),(0,a._)("label",null,(0,w.zw)(n.game_name),1)])}var _t={name:"WG_button_image",props:{image_url:String,game_name:String,background:String,modelValue:String},setup(e){var t={"background-image":`url(${e.image_url})`,"background-color":`#${e.background}`};return{cssProps:t}},emits:["update:modelValue"]};const vt=(0,y.Z)(_t,[["render",ht],["__scopeId","data-v-5034f244"]]);var ft=vt;const wt={id:"multichoice"},bt=["value"];function kt(e,t,n,s,i,r){return(0,a.wg)(),(0,a.iD)("div",wt,[(0,a._)("label",null,(0,w.zw)(this.title),1),(0,a.wy)((0,a._)("select",{id:"multichoice","onUpdate:modelValue":t[0]||(t[0]=e=>this.value=e)},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(this.choices,((e,t)=>((0,a.wg)(),(0,a.iD)("option",{value:e,key:t},(0,w.zw)(e),9,bt)))),128))],512),[[o.bM,this.value]])])}var yt={name:"WG_multichoice",props:{WG_title:String,WG_choices:Array},setup(e,{emit:t}){const n=(0,i.Vh)(e,"WG_choices"),o=(0,i.Vh)(e,"WG_title"),s=(0,i.iH)(5),r=()=>{t("update:modelValue",s.value)};return(0,a.YP)(s,r),{choices:n,title:o,value:s}}};const Et=(0,y.Z)(yt,[["render",kt],["__scopeId","data-v-1d7b09f0"]]);var Gt=Et,Wt=n.p+"img/kanji_game_1.1c1453ab.png",At=n.p+"img/kanji_game_2.7c7bf368.png",Lt={name:"wg_lobby",components:{WG_player_list_container:ve,WGbutton:U,WGbuttonImage:ft,WGprogressBar:gt,WGmultichoice:Gt},setup(){const e=(0,a.f3)("user"),t=(0,a.f3)("game"),n=(0,i.iH)("1"),o=(0,i.iH)("1"),s=(0,i.qj)({rounds:1,gameMod:"none",timeout:1,jlptLevel:5}),r=(0,i.iH)(60),l=(0,i.iH)(60),u=(0,i.iH)(!1),c=(0,a.f3)("backApp"),d=(0,i.iH)("50%"),p=(0,i.iH)(Wt),m=(0,i.iH)(At),g=(0,i.iH)([1,2,3,4,5]),h=(0,i.iH)("Invite Link");var _=!0;const v=()=>{d.value="50%"},f=()=>{d.value="-50%"},w=()=>{console.log("copybutton");var e="https://www.kanjiyarou.com?game="+t.gameHash;navigator.clipboard.writeText(e),h.value="Copied !",setTimeout((()=>{h.value="Invite Link"}),2e3)},b=e=>{console.log(e)},k=e=>{console.log(e),console.log("The game is starting"),t.gameMod=e},y=e=>{console.log(e),"undefined"!=typeof e.start&&k(e.start)},E=e=>{console.log(e.playerList),t.playerList=e.playerList},G=e=>{t.gameMod=e,s.gameMod=e},W=async e=>{t.isOwner&&_&&(_=!1,setTimeout((()=>{console.log("send"),c.sendData(c.UPDATE_RULES_EVENT,e),_=!0}),250))},A=()=>{c.sendData(c.GAME_EVENT,{event:"launch"})},L=e=>{console.log(e),"undefined"!=typeof e.JLPT_level&&(t.jlpt_level=e.JLPT_level,s.jlptLevel=e.JLPT_level),"undefined"!=typeof e.gameMod&&(s.gameMod=e.gameMod,t.gameMod=e.gameMod),"undefined"!=typeof e.timeout&&(t.timeout=e.timeout,s.timeout=e.timeout),"undefined"!=typeof e.rounds&&(s.rounds=e.rounds,t.rounds=e.rounds)};return{progressBarRound:n,progressBarTime:o,maxTimeout:l,maxRound:r,isChecked:u,user:e,game:t,backApp:c,width:d,url1:p,url2:m,choices:g,clickToCopy:h,showParameters:v,showGameMod:f,errorCallback:b,launchGame:A,copyGameHash:w,setGame:G,gameRulesUpdate:L,gameEventCallback:y,updatePlayerList:E,rules:s,sendNewRules:W}},mounted(){this.backApp.listen(this.backApp.UPDATE_RULES_EVENT,this.gameRulesUpdate),this.backApp.listen(this.backApp.PLAYER_LIST_EVENT,this.updatePlayerList),(0,a.YP)(this.rules,(e=>{this.sendNewRules(e)}))},unmounted(){this.backApp.closeEvents(this.backApp.UPDATE_RULES_EVENT),this.backApp.closeEvents(this.backApp.PLAYER_LIST_EVENT)}};const St=(0,y.Z)(Lt,[["render",ut],["__scopeId","data-v-363dab6c"]]);var Vt=St;const Tt=e=>((0,a.dD)("data-v-8366cfe2"),e=e(),(0,a.Cn)(),e),Ct={id:"background"},Ht=Tt((()=>(0,a._)("h1",null,"Not Found",-1)));function It(e,t,n,o,s,i){return(0,a.wg)(),(0,a.iD)("div",Ct,[Ht,(0,a._)("h2",null,"redirect in "+(0,w.zw)(e.counter)+" secondes",1)])}var Zt={name:"NotFound",data:function(){return{counter:5}},mounted(){this.increment()},methods:{increment(){var e=setInterval((()=>{this.counter--,0==this.counter&&(clearInterval(e),this.$router.push({path:"/"}))}),1e3)}}};const Mt=(0,y.Z)(Zt,[["render",It],["__scopeId","data-v-8366cfe2"]]);var Dt=Mt;const Pt=[{path:"/",component:K},{path:"/:pathMatch(.*)*",component:Dt},{path:"/game",component:$e},{path:"/lobby",component:Vt}],jt=(0,f.p7)({history:(0,f.PO)(),routes:Pt}),Rt=(0,o.ri)(L);Rt.config.unwrapInjectedRef=!0,Rt.use(jt),Rt.mount("#app")},4548:function(e,t,n){var o={"./frog.png":9025,"./fugu.png":3850,"./kitsune.png":5134,"./koi.png":3513};function a(e){var t=s(e);return n(t)}function s(e){if(!n.o(o,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return o[e]}a.keys=function(){return Object.keys(o)},a.resolve=s,e.exports=a,a.id=4548},5997:function(e,t,n){"use strict";e.exports=n.p+"media/Water_Drop.a509e23f.mp3"},9025:function(e,t,n){"use strict";e.exports=n.p+"img/frog.b169816c.png"},3850:function(e,t,n){"use strict";e.exports=n.p+"img/fugu.2c53e73d.png"},5134:function(e,t,n){"use strict";e.exports=n.p+"img/kitsune.e88e4c40.png"},3513:function(e,t,n){"use strict";e.exports=n.p+"img/koi.f8c6e36e.png"}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}n.m=e,function(){var e=[];n.O=function(t,o,a,s){if(!o){var i=1/0;for(c=0;c<e.length;c++){o=e[c][0],a=e[c][1],s=e[c][2];for(var r=!0,l=0;l<o.length;l++)(!1&s||i>=s)&&Object.keys(n.O).every((function(e){return n.O[e](o[l])}))?o.splice(l--,1):(r=!1,s<i&&(i=s));if(r){e.splice(c--,1);var u=a();void 0!==u&&(t=u)}}return t}s=s||0;for(var c=e.length;c>0&&e[c-1][2]>s;c--)e[c]=e[c-1];e[c]=[o,a,s]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/"}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var a,s,i=o[0],r=o[1],l=o[2],u=0;if(i.some((function(t){return 0!==e[t]}))){for(a in r)n.o(r,a)&&(n.m[a]=r[a]);if(l)var c=l(n)}for(t&&t(o);u<i.length;u++)s=i[u],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(c)},o=self["webpackChunkkanjiyarou"]=self["webpackChunkkanjiyarou"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(1536)}));o=n.O(o)})();
//# sourceMappingURL=app.513d3f34.js.map