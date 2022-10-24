import Client from "./scripts/client.js";
import Game from "./scripts/game.js";
import Database from "./database.js";
import { Server } from "socket.io";
import { GameManager, ClientManager } from "./Manager.js";
import {Response, isValidHash} from "./scripts/utils.js"


const io = new Server(3000,
    {
        serveClient : false,
        path:"/",
        pingTimeout: 3000
    });
console.log("Launched")

var gameManager = new GameManager(io)
var clientManager = new ClientManager();
var database = new Database();  

async function sendResponse(eventName, socket, response)
{
    socket.emit(eventName,response)
}


async function broadcast(eventName,data)
{
    var response = new Response()
    response.data = data;
    response.status = 200;

    io.sockets.emit(eventName,response)
}

async function join(socket,data)
{   
    var timeStart = Date.now();
    var response = new Response();
    if(!isValidHash(data.userHash))
    {
        response.error = "Non valid userHash";
        response.status = 400;
        sendResponse("join",socket, response)
        return;
    }
    if(!isValidHash(data.gameHash))
    {
        response.error = "Non valid gameHash";
        response.status = 400;
        sendResponse("join",socket, response)
        return;
    }
    var client = clientManager.getPlayer(data.userHash)
    var game = gameManager.getGame(data.gameHash)
    if(!game)
    {
        response.error = "can't find game";
        response.status = 400;
        sendResponse("join",socket, response)
        return;
    }
    if(!client)
    {
        response.error = "can't find player";
        response.status = 400;
        sendResponse("join",socket, response)
        return;
    }
    if(game.isJoinable())
    {
        response.data = { playerList : game.join(client)};
        response.status = 200;
        sendResponse("join",socket, response)
        console.log("duration createGame : " +(Date.now()-timeStart))                        
    }
}



async function creategame(socket, data )
{
    var timeStart = Date.now();
    var response = new Response();
    if(!isValidHash(data.userHash))
    {
        response.error = "Non valid userHash";
        response.status = 400;
        sendResponse("create",socket, response)
        return;
    }
    var client = clientManager.getPlayer(data.userHash)
    if(!client)
    {
        response.error = "can't find player";
        response.status = 400;
        sendResponse("create",socket,response)
    }
    if(client.isOwner)
    {
        
    }
    var game = gameManager.addGame(client, new Game(broadcast))
    response.data = {message:"Game created",gameHash: game.getGameHash(), playerList : game.getPlayerList()}
    response.status = 200;
    console.log("duration createGame : " +(Date.now()-timeStart))
    sendResponse("create",socket, response);
}


async function createUser(socket)
{   
    var timeStart = Date.now();
    var response = new Response();
    var client = null;
    if(isValidHash(socket.handshake.query.userHash))
    {
        client = clientManager.getPlayer(socket.handshake.query.userHash)
    }    
    if(client == null)
    {   
        var player = clientManager.addPlayer(new Client(socket))
        response.data = {userHash :  player.getPlayerHash(), message : "Player created"}
        response.status = 200;
    }else{
        response.data = {message: "Player found"};
        response.status = 200;        
    }
    console.log("duration createUser : " +(Date.now()-timeStart))
    sendResponse("handshakeResponse",socket,response)
}

async function setPseudo(socket, data)
{
    var timeStart = Date.now();
    var client = null;
    var response = new Response();    
    if(isValidHash(data.userHash))
    {
        client = clientManager.getPlayer(data.userHash)
    }
    if(client == null)
    {
        response.error = "Non valid userHash";
        response.status = 400;
        sendResponse("setPseudo",socket,response)
        return;
    }
    if(typeof(data.pseudo) =="undefined" || data.pseudo.length > 10)
    {
        response.error = "pseudo is not valid"
        response.status = 400;
        sendResponse("setPseudo",socket,response)
        return;
    }
    client.setClientPseudo(data.pseudo);
    response.data = {message : "pseudo has been set",pseudo: data.pseudo}
    response.status = 200;
    console.log("duration setPseudo : " +(Date.now()-timeStart))
    sendResponse("setPseudo",socket,response)
}

async function startGame(socket,data)
{
    var timeStart = Date.now();
    console.log(data)
    var response = new Response();  
    response.data = {message : "game starting"}
    response.status = 200;
    console.log("duration setPseudo : " +(Date.now()-timeStart))
    sendResponse("start",socket,response)
}

database.createConnection(()=>
{
    io.on("connection",(socket)=>
    {
        createUser(socket)
        socket.on("join", (data)=>
        {
            join(socket, data);
        });
        socket.on("create", (data)=>
        {
            creategame(socket, data);
        });
        socket.on("setPseudo", (data)=>
        {
            setPseudo(socket, data);
        });
        socket.on("start",(data)=>{
            startGame(socket, data);
        })
    });
});





