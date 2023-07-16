(function(){"use strict";var e={2772:function(e,n,t){var a=t(9242),o=t(3396);function r(e,n,t,a,r,s){const i=(0,o.up)("router-view");return(0,o.wg)(),(0,o.j4)(i)}var s=t(4870),i=t(2482),u=t(878),l=t(2575),d=t(8829);const c="http://localhost:5000";var p=t(2066),h=new WeakMap,m=new WeakMap,g=new WeakMap,_=new WeakMap,v=new WeakMap,f=new WeakMap,w=new WeakMap,b=new WeakMap;class y{constructor(e){(0,u.Z)(this,h,{writable:!0,value:void 0}),(0,i.Z)(this,"gameReference",void 0),(0,i.Z)(this,"isClose",!0),(0,u.Z)(this,m,{writable:!0,value:void 0}),(0,u.Z)(this,g,{writable:!0,value:void 0}),(0,u.Z)(this,_,{writable:!0,value:void 0}),(0,u.Z)(this,v,{writable:!0,value:void 0}),(0,u.Z)(this,f,{writable:!0,value:void 0}),(0,u.Z)(this,w,{writable:!0,value:void 0}),(0,u.Z)(this,b,{writable:!0,value:void 0}),this.gameReference=e}openConnection(e,n,t){"undefined"==typeof(0,d.Z)(this,h)&&this.isClose&&((0,l.Z)(this,h,new p.io(c,{path:"/",serveClient:!1,transports:["websocket"],upgrade:!0,query:e})),(0,d.Z)(this,h).on("handshakeResponse",(e=>{n(e)})),(0,d.Z)(this,h).on("connect_error",(e=>{t(e)})),(0,d.Z)(this,h).on("connect",(()=>{this.connected()})),(0,d.Z)(this,h).on("disconnect",(()=>{console.log("disconnect event"),this.disconnected()})),(0,d.Z)(this,h).on("notification",(e=>{console.log(e)})),(0,d.Z)(this,h).on("error",(e=>{"undefined"!=typeof(0,d.Z)(this,w)&&(0,d.Z)(this,w).call(this,e)})),(0,d.Z)(this,h).on("info",(e=>{"undefined"!=typeof(0,d.Z)(this,w)?(0,d.Z)(this,b).call(this,e):this.defaultInfoCallback()})),(0,d.Z)(this,h).on("playerList",(e=>{"undefined"!=typeof this.setPlayerList&&this.setPlayerList(e.playerList)})),(0,d.Z)(this,h).on("round",(e=>{"undefined"!=typeof e.round&&"undefined"!=typeof(0,d.Z)(this,f)&&(0,d.Z)(this,f).call(this,e)})),(0,d.Z)(this,h).on("rankingList",(e=>{"undefined"!=typeof e.rankingList&&this.setRankingList(e.rankingList)})),(0,d.Z)(this,h).on("endGame",(e=>{"undefined"!=typeof e.playerFinished&&"undefined"!=typeof(0,d.Z)(this,g)&&(0,d.Z)(this,g).call(this,e)})),(0,d.Z)(this,h).on("launch",(e=>{"undefined"!=typeof(0,d.Z)(this,_)&&(0,d.Z)(this,_).call(this,e.gameMod)})),this.isClose=!1)}closeSocket(){(0,d.Z)(this,h).close(),console.log("socket close by the client")}sendRequest(e,n,t){(0,d.Z)(this,h).emit(e,n),(0,d.Z)(this,h).on(e,(n=>{"undefined"!=typeof t&&t(n),(0,d.Z)(this,h).off(e)}))}defaultInfoCallback(e){alert(e)}setPlayerList(e){this.gameReference.setPlayerList(e)}setRankingList(e){this.gameReference.setRankingList(e)}setStartCallback(e){(0,l.Z)(this,m,e)}setEndGameCallback(e){(0,l.Z)(this,g,e)}setLaunchCallback(e){(0,l.Z)(this,_,e)}setRoundCallback(e){(0,l.Z)(this,f,e)}setErrorCallback(e){(0,l.Z)(this,w,e)}setInfoCallback(e){(0,l.Z)(this,b,e)}stopListeningGame(e){(0,d.Z)(this,h).off(e)}disconnected(){console.log("Socket closed"),this.closeSocket();var e=alert("you are disconnected from the server");e&&window.close()}connected(){console.log("Connecté")}}class k{constructor(){(0,i.Z)(this,"gameHash",void 0),(0,i.Z)(this,"owner",void 0),(0,i.Z)(this,"gameMod",void 0),(0,i.Z)(this,"playerList",void 0),(0,i.Z)(this,"rankingList",void 0),this.playerList=new Array,this.rankingList=new Array,this.gameHash="none",this.owner="none"}setPlayerList(e){this.playerList=e}setRankingList(e){this.rankingList=e}getPlayerList(){return this.playerList}}var W=t(678),G={name:"App",setup(){const e=(0,s.qj)({pseudo:"none",hash:"none"}),n=(0,s.qj)(new k),a=t(5997),r=new y(n);e.hash=localStorage.getItem("userHash");const i=(0,W.tv)();e.pseudo=localStorage.getItem("pseudo"),(0,o.JJ)("user",e),(0,o.JJ)("game",n),(0,o.JJ)("ringAudio",a),(0,o.JJ)("backApp",r);const u=n=>{"undefined"!=typeof n.userHash&&(e.hash=n.userHash,localStorage.setItem("userHash",e.hash)),"undefined"!=typeof n.userInformation&&("undefined"!=typeof n.userInformation.pseudo&&(e.pseudo=n.userInformation.pseudo,localStorage.setItem("pseudo",e.pseudo)),"undefined"!=typeof n.userInformation.gameStatus&&("undefined"!=typeof n.userInformation.gameStatus.hasEnded&&n.userInformation.gameStatus.hasEnded?i.push({path:"/home"}):"undefined"!=typeof n.userInformation.gameStatus.hasStarted&&n.userInformation.gameStatus.hasStarted?i.push({path:"/game"}):i.push({path:"/lobby"})))},l=e=>{console.error(e.error)};return{user:e,game:n,ringAudio:a,backApp:r,openConnectionCallback:u,openConnectionErrorCallback:l}},mounted(){this.backApp.openConnection({userHash:this.user.hash},this.openConnectionCallback,this.openConnectionErrorCallback)}},Z=t(89);const C=(0,Z.Z)(G,[["render",r]]);var H=C;const S=e=>((0,o.dD)("data-v-94e1b8dc"),e=e(),(0,o.Cn)(),e),I={id:"background"},L={id:"main_card"},V=S((()=>(0,o._)("h1",null,"Welcome to the KanjiYarou!",-1))),j=S((()=>(0,o._)("h2",null,"ワードゲームへようこそ ",-1))),M=S((()=>(0,o._)("span",{id:"author"},[(0,o._)("a",{href:"https://www.patreon.com/1041uuu",target:"_blank"},[(0,o.Uk)(" wallpaper : "),(0,o._)("br"),(0,o.Uk)("1041uuu")])],-1)));function P(e,n,t,r,s,i){const u=(0,o.up)("WGinput"),l=(0,o.up)("WGbutton"),d=(0,o.up)("WGerror");return(0,o.wg)(),(0,o.iD)("div",I,[(0,o._)("div",L,[V,j,(0,o._)("form",{onSubmit:n[1]||(n[1]=(0,a.iM)(((...e)=>r.createUser&&r.createUser(...e)),["prevent"]))},[(0,o.Wm)(u,{modelValue:this.pseudoInput,"onUpdate:modelValue":n[0]||(n[0]=e=>this.pseudoInput=e),wg_placeholder:"Pseudo"},null,8,["modelValue"]),(0,o.Wm)(l,{wg_value:"Create"}),(0,o.Wm)(d,{WG_value:this.errorInput,Bounce:this.bounce},null,8,["WG_value","Bounce"])],32)]),M])}var A=t(7139);const D={id:"input_wg"};function R(e,n,t,r,s,i){return(0,o.wg)(),(0,o.iD)("div",D,[(0,o.wy)((0,o._)("input",{id:"input","onUpdate:modelValue":n[0]||(n[0]=e=>r.update_wg_value=e),type:"text",onFocus:n[1]||(n[1]=(...e)=>i.onFocus&&i.onFocus(...e)),onBlur:n[2]||(n[2]=(...e)=>i.onBlur&&i.onBlur(...e)),required:""},null,544),[[a.nr,r.update_wg_value]]),(0,o._)("label",{class:(0,A.C_)({input_selected:r.focused}),id:"placeholder"},(0,A.zw)(t.wg_placeholder),3)])}var B={name:"WG_input",props:{wg_placeholder:String,modelValue:String},emits:["update:modelValue"],setup(e,{emit:n}){const t=(0,s.iH)(!1),a=(0,s.iH)(e.modelValue),o=(0,s.Fl)({get(){return a.value},set(e){a.value=e,n("update:modelValue",a.value)}});return""!=a.value&&(t.value=!0),{focused:t,wg_value:a,update_wg_value:o}},methods:{onFocus(){this.focused=!0},onBlur(){""==this.wg_value&&(this.focused=!1)}}};const z=(0,Z.Z)(B,[["render",R],["__scopeId","data-v-12997b72"]]);var E=z;function T(e,n,t,a,r,s){return(0,o.wg)(),(0,o.iD)("button",null,(0,A.zw)(t.wg_value),1)}var F={name:"WG_button",props:{wg_value:String}};const O=(0,Z.Z)(F,[["render",T],["__scopeId","data-v-6fc644a5"]]);var q=O;function x(e,n,t,a,r,s){return(0,o.wg)(),(0,o.iD)("label",{class:(0,A.C_)({actived:this.Bounce})},(0,A.zw)(t.WG_value),3)}var U={name:"WG_error",props:{WG_value:String,Bounce:Boolean},data:function(){return{}}};const J=(0,Z.Z)(U,[["render",x],["__scopeId","data-v-1f065269"]]);var Y=J,K={name:"wg_home",components:{WGinput:E,WGbutton:q,WGerror:Y},setup(){const e=(0,s.iH)(""),n=(0,s.iH)(""),t=(0,s.iH)(!1),a=(0,o.f3)("user"),r=(0,o.f3)("game"),i=(0,o.f3)("backApp"),u=(0,W.tv)(),l=(0,W.yj)();r.gameHash=l.query.game;const d=()=>{t.value=!0,setTimeout((()=>{t.value=!1}),1e3)},c=e=>{n.value=e,d()},p=()=>{console.log("joined"),u.push({path:"/lobby"})},h=e=>{n.value=e.message,r.playerList=e.playerList,r.gameHash=e.gameHash;var t="http://localhost:8080?game="+r.gameHash;navigator.clipboard.writeText(t),d(),p()},m=e=>{r.setPlayerList(e.playerList),p()},g=e=>{a.pseudo=e.pseudo,localStorage.setItem("pseudo",a.pseudo),n.value=e.message,d(),"undefined"===typeof r.gameHash?(console.log("creating game..."),i.sendRequest("create",{userHash:a.hash},h)):(console.log("joining..."),i.sendRequest("join",{userHash:a.hash,gameHash:r.gameHash},m))},_=()=>{console.log("setting pseudo..."),i.sendRequest("setPseudo",{pseudo:e.value,userHash:a.hash},g)};return i.setErrorCallback(c),{pseudoInput:e,errorInput:n,bounce:t,user:a,router:u,route:l,ErrorBounceAnimation:d,createUser:_,createGame:g,redirectToLobby:p,setGameHash:h}}};const N=(0,Z.Z)(K,[["render",P],["__scopeId","data-v-94e1b8dc"]]);var $=N;const X={id:"main"};function Q(e,n,t,a,r,s){const i=(0,o.up)("WG_player_list_container");return(0,o.wg)(),(0,o.iD)("div",X,[(0,o.Wm)(i,{WG_player_list:a.game.playerList},null,8,["WG_player_list"]),((0,o.wg)(),(0,o.j4)((0,o.LL)(this.component),{WG_rankingList:a.game.rankingList},null,8,["WG_rankingList"]))])}const ee=e=>((0,o.dD)("data-v-7140571c"),e=e(),(0,o.Cn)(),e),ne={id:"player_list_container"},te=ee((()=>(0,o._)("h1",null,"Player List",-1))),ae={id:"container_player"};function oe(e,n,t,a,r,s){const i=(0,o.up)("WG_player_view");return(0,o.wg)(),(0,o.iD)("div",ne,[te,(0,o._)("div",ae,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(this.playerList,((e,n)=>((0,o.wg)(),(0,o.j4)(i,{key:n,WG_pseudo:e.pseudo,WG_point:e.point,WG_hasFinished:e.hasFinished},null,8,["WG_pseudo","WG_point","WG_hasFinished"])))),128))])])}var re=t.p+"img/carpe_japonaise.e5db5808.jpg";const se=e=>((0,o.dD)("data-v-44a97a2e"),e=e(),(0,o.Cn)(),e),ie=se((()=>(0,o._)("img",{src:re},null,-1)));function ue(e,n,t,a,r,s){return(0,o.wg)(),(0,o.iD)("div",{id:"player_view",class:(0,A.C_)(["defaultStyle",{hasFinishedStyle:this.hasFinished}])},[ie,(0,o._)("p",null,(0,A.zw)(this.pseudo),1),(0,o._)("p",null,(0,A.zw)(this.point),1)],2)}var le={name:"WG_player_view",props:{WG_pseudo:String,WG_point:Number,WG_hasFinished:Boolean},setup(e){const n=(0,s.Vh)(e,"WG_pseudo"),t=(0,s.Vh)(e,"WG_point"),a=(0,s.Vh)(e,"WG_hasFinished");return{pseudo:n,point:t,hasFinished:a}}};const de=(0,Z.Z)(le,[["render",ue],["__scopeId","data-v-44a97a2e"]]);var ce=de,pe={name:"WG_player_list_container",components:{WG_player_view:ce},props:{WG_player_list:{type:[Array,Object],required:!0}},setup(e){const n=(0,s.Vh)(e,"WG_player_list"),t=(0,o.f3)("ringAudio"),a=new Audio;a.src=t;const r=()=>{a.play()};return{player:a,playerList:n,ring:r}},watch:{playerList(){this.ring()}}};const he=(0,Z.Z)(pe,[["render",oe],["__scopeId","data-v-7140571c"]]);var me=he;const ge={id:"background"},_e={id:"gameplay"};function ve(e,n,t,a,r,s){const i=(0,o.up)("WG_gameCard"),u=(0,o.up)("WG_panelError");return(0,o.wg)(),(0,o.iD)("div",ge,[(0,o._)("div",_e,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(this.cards,((e,n)=>((0,o.wg)(),(0,o.j4)(i,{onSendAnswer:n=>this.sendAnswer(e),key:n,card_value:e},null,8,["onSendAnswer","card_value"])))),128))]),(0,o.Wm)(u,{informationProp:this.infoValue,errorProp:this.errorValue},null,8,["informationProp","errorProp"]),(0,o._)("h1",null,(0,A.zw)(this.assignment),1)])}function fe(e,n,t,a,r,s){return(0,o.wg)(),(0,o.iD)("span",{onClick:n[0]||(n[0]=(...e)=>this.clickEvent&&this.clickEvent(...e)),class:"cardDesign",style:(0,A.j5)({fontSize:t.String_size})},(0,A.zw)(t.card_value),5)}var we={name:"WG_gameCard",props:{Info_value:String,Error_value:String,card_value:String,String_size:{default:"10em",type:String}},emits:["sendAnswer"],setup(e,{emit:n}){const t=()=>{n("sendAnswer")};return{clickEvent:t}}};const be=(0,Z.Z)(we,[["render",fe],["__scopeId","data-v-58243bd5"]]);var ye=be;const ke=(0,o._)("h1",null,null,-1),We=[ke];function Ge(e,n,t,a,r,s){return(0,o.wg)(),(0,o.iD)("div",{id:"information",style:(0,A.j5)({"background-color":this.background,display:this.display})},We,4)}var Ze={name:"panel_error_wordgame",props:{informationProp:String,errorProp:String},setup(e){const n=(0,s.Vh)(e.errorProp),t=(0,s.Vh)(e.informationProp),a=(0,s.iH)("none"),o=(0,s.iH)("none");return{error:n,information:t,background:a,display:o}},watch:{error(){this.information.value="rgba(255,0,0,0.5)",this.display="block",console.log(this.error),setTimeout((()=>{this.display="none"}),3e3)},information(){this.information.value="rgba(0,0,0,0.5)",this.display="block",console.log(this.information),setTimeout((()=>{this.display="none"}),3e3)}}};const Ce=(0,Z.Z)(Ze,[["render",Ge]]);var He=Ce,Se={name:"wg_game_mod_1",components:{WG_gameCard:ye,WG_panelError:He},setup(){const e=(0,o.f3)("backApp"),n=(0,s.iH)(new Array),t=(0,s.iH)(""),a=(0,s.iH)(""),r=(0,s.iH)("");console.log("This is gamemod1");const i=e=>{t.value=e},u=e=>{a.value=e},l=e=>{n.value=e.round.cards,r.value=e.round.assignment},d=n=>{e.sendRequest("answer",{answer:n})},c=()=>{e.setErrorCallback(i),e.setInfoCallback(u),e.setRoundCallback(l),e.sendRequest("ready",{isReady:!0})};return c(),{cards:n,assignment:r,infoValue:a,errorValue:t,nextRound:l,infoCallback:u,errorCallback:i,setReady:c,sendAnswer:d}}};const Ie=(0,Z.Z)(Se,[["render",ve],["__scopeId","data-v-740a000b"]]);var Le=Ie;const Ve={id:"background"},je={id:"gameplay"};function Me(e,n,t,a,r,s){const i=(0,o.up)("WG_gameCard"),u=(0,o.up)("WG_panelError");return(0,o.wg)(),(0,o.iD)("div",Ve,[(0,o._)("div",je,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(this.cards,((e,n)=>((0,o.wg)(),(0,o.j4)(i,{onSendAnswer:n=>this.sendAnswer(e),key:n,card_value:e,String_size:"3em"},null,8,["onSendAnswer","card_value"])))),128))]),(0,o.Wm)(u,{informationProp:this.infoValue,errorProp:this.errorValue},null,8,["informationProp","errorProp"]),(0,o._)("h1",null,(0,A.zw)(this.assignment),1)])}var Pe={name:"wg_game_mod_2",components:{WG_gameCard:ye,WG_panelError:He},setup(){const e=(0,o.f3)("backApp"),n=(0,s.iH)(new Array),t=(0,s.iH)(""),a=(0,s.iH)(""),r=(0,s.iH)("");console.log("This is gamemod2");const i=e=>e,u=e=>{console.log(e)},l=e=>{n.value=e.round.cards,r.value=e.round.assignment},d=()=>{e.setErrorCallback(i),e.setInfoCallback(u),e.setRoundCallback(l),e.sendRequest("ready",{ready:!0})};return d(),{backApp:e,assignment:r,cards:n,errorValue:t,infoValue:a}}};const Ae=(0,Z.Z)(Pe,[["render",Me],["__scopeId","data-v-9878a592"]]);var De=Ae;const Re=e=>((0,o.dD)("data-v-de03b87e"),e=e(),(0,o.Cn)(),e),Be={id:"background"},ze={id:"endMenu"},Ee=Re((()=>(0,o._)("h1",null,"Game Ranking",-1))),Te={id:"rankinglist"};function Fe(e,n,t,a,r,s){const i=(0,o.up)("button_wordgameVue");return(0,o.wg)(),(0,o.iD)("div",Be,[(0,o._)("div",ze,[Ee,(0,o._)("div",Te,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(this.rankingList,((e,n)=>((0,o.wg)(),(0,o.iD)("span",{class:"rankPlayer",key:n},(0,A.zw)(n+1)+". "+(0,A.zw)(e),1)))),128))]),(0,o._)("h2",null,(0,A.zw)(this.message),1),(0,o._)("div",null,[(0,o.Wm)(i),(0,o.Wm)(i)])])])}var Oe={name:"wg_end_game_menu",components:{button_wordgameVue:q},props:{WG_rankingList:Array},setup(e){const n=(0,s.Vh)(e,"WG_rankingList"),t=(0,s.iH)("Waiting players to finish...");n.value.length>0&&(t.value="");const a=()=>{t.value=""};return(0,o.YP)(n,a),{rankingList:n,message:t}}};const qe=(0,Z.Z)(Oe,[["render",Fe],["__scopeId","data-v-de03b87e"]]);var xe=qe,Ue={name:"wg_game",components:{WG_player_list_container:me,wg_end_game_menu:xe,wg_game_mod_1:Le,wg_game_mod_2:De},setup(){const e=(0,o.f3)("game"),n=(0,o.f3)("backApp");var t=(0,s.XI)("");"gameMod1"==e.gameMod&&(t.value=Le),"gameMod2"==e.gameMod&&(t.value=De);const a=()=>{console.log("game ended"),t.value=xe};return n.setEndGameCallback(a),{backApp:n,component:t,game:e}}};const Je=(0,Z.Z)(Ue,[["render",Q],["__scopeId","data-v-48641f46"]]);var Ye=Je;const Ke={id:"main"},Ne={id:"background"},$e={id:"menu"},Xe={id:"parameters_gamemod"},Qe={id:"wordsNumber"},en={id:"wordsNumber"},nn={id:"listGameMod"};function tn(e,n,t,r,s,i){const u=(0,o.up)("WG_player_list_container"),l=(0,o.up)("WGmultichoice"),d=(0,o.up)("WGprogressBar"),c=(0,o.up)("WGbutton"),p=(0,o.up)("WGbuttonImage");return(0,o.wg)(),(0,o.iD)("div",Ke,[(0,o.Wm)(u,{WG_player_list:this.game.playerList},null,8,["WG_player_list"]),(0,o._)("div",Ne,[(0,o._)("div",$e,[(0,o._)("span",Xe,[(0,o._)("button",{id:"parameter_button",onClick:n[0]||(n[0]=(...e)=>r.showParameters&&r.showParameters(...e))},"Parameters"),(0,o._)("button",{id:"gamemod_button",onClick:n[1]||(n[1]=(...e)=>r.showGameMod&&r.showGameMod(...e))},"Mode de jeu")]),(0,o._)("div",{id:"sub_menu",style:(0,A.j5)({left:r.width})},[(0,o._)("form",{id:"parameters",onSubmit:n[5]||(n[5]=(0,a.iM)(((...e)=>r.showGameMod&&r.showGameMod(...e)),["prevent"]))},[(0,o.Wm)(l,{modelValue:this.jlptLevel,"onUpdate:modelValue":n[2]||(n[2]=e=>this.jlptLevel=e),WG_choices:this.choices,WG_title:"jlpt level:"},null,8,["modelValue","WG_choices"]),(0,o.Wm)(d,{modelValue:this.progressBarRound,"onUpdate:modelValue":n[3]||(n[3]=e=>this.progressBarRound=e)},null,8,["modelValue"]),(0,o._)("p",Qe,"Nombre de round : "+(0,A.zw)(this.round=Math.round(parseInt(this.progressBarRound)*this.maxRound/100)),1),(0,o.Wm)(d,{modelValue:this.progressBarTime,"onUpdate:modelValue":n[4]||(n[4]=e=>this.progressBarTime=e)},null,8,["modelValue"]),(0,o._)("p",en,"Timeout/round : "+(0,A.zw)(this.timeout=Math.round(parseInt(this.progressBarTime)*this.maxTimeout/100)),1),(0,o.Wm)(c,{wg_value:"Suivant"})],32),(0,o._)("form",{id:"gamemod",onSubmit:n[8]||(n[8]=(0,a.iM)(((...e)=>r.startGame&&r.startGame(...e)),["prevent"]))},[(0,o._)("div",nn,[(0,o.Wm)(p,{image_url:r.url1,onClick:n[6]||(n[6]=e=>r.setGame("gameMod1")),game_name:"Choice",background:"1d323c"},null,8,["image_url"]),(0,o.Wm)(p,{image_url:r.url2,onClick:n[7]||(n[7]=e=>r.setGame("gameMod2")),game_name:"Assembly",background:"B0DAEF"},null,8,["image_url"])])],32)],4)])])])}const an={class:"progress-bar"};function on(e,n,t,r,s,i){return(0,o.wg)(),(0,o.iD)("label",an,[(0,o.wy)((0,o._)("input",{type:"range",min:"0",max:"100","onUpdate:modelValue":n[0]||(n[0]=e=>this.wg_value=e),class:"slider"},null,512),[[a.nr,this.wg_value]])])}var rn={name:"WG_progress_bar",props:{modelValue:String},data:function(){return{wg_value:"0"}},watch:{wg_value:function(){this.$emit("update:modelValue",this.wg_value)}},emits:["update:modelValue"]};const sn=(0,Z.Z)(rn,[["render",on],["__scopeId","data-v-d939672e"]]);var un=sn;function ln(e,n,t,a,r,s){return(0,o.wg)(),(0,o.iD)("div",null,[(0,o._)("button",{style:(0,A.j5)(a.cssProps)},null,4),(0,o._)("label",null,(0,A.zw)(t.game_name),1)])}var dn={name:"WG_button_image",props:{image_url:String,game_name:String,background:String,modelValue:String},setup(e){var n={"background-image":`url(${e.image_url})`,"background-color":`#${e.background}`};return{cssProps:n}},emits:["update:modelValue"]};const cn=(0,Z.Z)(dn,[["render",ln],["__scopeId","data-v-00236740"]]);var pn=cn;const hn={id:"multichoice"},mn=["value"];function gn(e,n,t,r,s,i){return(0,o.wg)(),(0,o.iD)("div",hn,[(0,o._)("label",null,(0,A.zw)(this.title),1),(0,o.wy)((0,o._)("select",{id:"multichoice","onUpdate:modelValue":n[0]||(n[0]=e=>this.value=e)},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(this.choices,((e,n)=>((0,o.wg)(),(0,o.iD)("option",{value:e,key:n},(0,A.zw)(e),9,mn)))),128))],512),[[a.bM,this.value]])])}var _n={name:"WG_multichoice",props:{WG_title:String,WG_choices:Array},setup(e,{emit:n}){const t=(0,s.Vh)(e,"WG_choices"),a=(0,s.Vh)(e,"WG_title"),r=(0,s.iH)(5),i=()=>{n("update:modelValue",r.value)};return(0,o.YP)(r,i),{choices:t,title:a,value:r}}};const vn=(0,Z.Z)(_n,[["render",gn],["__scopeId","data-v-09f78d42"]]);var fn=vn,wn=t.p+"img/kanji_game_1.1c1453ab.png",bn=t.p+"img/kanji_game_2.7c7bf368.png",yn={name:"wg_lobby",components:{WG_player_list_container:me,WGbutton:q,WGbuttonImage:pn,WGprogressBar:un,WGmultichoice:fn},setup(){const e=(0,s.iH)("1"),n=(0,s.iH)("1"),t=(0,s.iH)(1),a=(0,s.iH)(1),r=(0,s.iH)(60),i=(0,s.iH)(60),u=(0,s.iH)(!1),l=(0,o.f3)("user"),d=(0,o.f3)("game"),c=(0,o.f3)("backApp"),p=(0,W.tv)(),h=(0,s.iH)("50%"),m=(0,s.iH)(wn),g=(0,s.iH)(bn),_=(0,s.iH)([1,2,3,4,5]),v=(0,s.iH)(5),f=()=>{h.value="50%"},w=()=>{h.value="-50%"},b=e=>{console.log(e)},y=e=>{d.gameMod=e,p.push({path:"/game"})},k=()=>{console.log("The game is starting")},G=e=>{d.gameMod=e},Z=()=>{c.sendRequest("launch",{jlpt:v.value,round:t.value,gameMod:d.gameMod,timeout:a.value,userHash:l.hash},k,b)};return c.setLaunchCallback(y),{progressBarRound:e,progressBarTime:n,round:t,timeout:a,maxTimeout:i,maxRound:r,isChecked:u,user:l,game:d,backApp:c,width:h,url1:m,url2:g,choices:_,jlptLevel:v,showParameters:f,showGameMod:w,errorCallback:b,startGame:Z,setGame:G}}};const kn=(0,Z.Z)(yn,[["render",tn],["__scopeId","data-v-75ab06d0"]]);var Wn=kn;const Gn=e=>((0,o.dD)("data-v-8366cfe2"),e=e(),(0,o.Cn)(),e),Zn={id:"background"},Cn=Gn((()=>(0,o._)("h1",null,"Not Found",-1)));function Hn(e,n,t,a,r,s){return(0,o.wg)(),(0,o.iD)("div",Zn,[Cn,(0,o._)("h2",null,"redirect in "+(0,A.zw)(e.counter)+" secondes",1)])}var Sn={name:"NotFound",data:function(){return{counter:5}},mounted(){this.increment()},methods:{increment(){var e=setInterval((()=>{this.counter--,0==this.counter&&(clearInterval(e),this.$router.push({path:"/"}))}),1e3)}}};const In=(0,Z.Z)(Sn,[["render",Hn],["__scopeId","data-v-8366cfe2"]]);var Ln=In;const Vn=[{path:"/",component:$},{path:"/:pathMatch(.*)*",component:Ln},{path:"/game",component:Ye},{path:"/lobby",component:Wn}],jn=(0,W.p7)({history:(0,W.PO)(),routes:Vn}),Mn=(0,a.ri)(H);Mn.config.unwrapInjectedRef=!0,Mn.use(jn),Mn.mount("#app")},5997:function(e,n,t){e.exports=t.p+"media/Water_Drop.a509e23f.mp3"}},n={};function t(a){var o=n[a];if(void 0!==o)return o.exports;var r=n[a]={exports:{}};return e[a](r,r.exports,t),r.exports}t.m=e,function(){var e=[];t.O=function(n,a,o,r){if(!a){var s=1/0;for(d=0;d<e.length;d++){a=e[d][0],o=e[d][1],r=e[d][2];for(var i=!0,u=0;u<a.length;u++)(!1&r||s>=r)&&Object.keys(t.O).every((function(e){return t.O[e](a[u])}))?a.splice(u--,1):(i=!1,r<s&&(s=r));if(i){e.splice(d--,1);var l=o();void 0!==l&&(n=l)}}return n}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[a,o,r]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var a in n)t.o(n,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:n[a]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){t.p="/"}(),function(){var e={143:0};t.O.j=function(n){return 0===e[n]};var n=function(n,a){var o,r,s=a[0],i=a[1],u=a[2],l=0;if(s.some((function(n){return 0!==e[n]}))){for(o in i)t.o(i,o)&&(t.m[o]=i[o]);if(u)var d=u(t)}for(n&&n(a);l<s.length;l++)r=s[l],t.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return t.O(d)},a=self["webpackChunkkanjiyarou"]=self["webpackChunkkanjiyarou"]||[];a.forEach(n.bind(null,0)),a.push=n.bind(null,a.push.bind(a))}();var a=t.O(void 0,[998],(function(){return t(2772)}));a=t.O(a)})();
//# sourceMappingURL=app.2d308b18.js.map