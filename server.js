import { Player } from "./scripts/player.js";
import {createPoolConnection} from "./database.js";
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

async function broadcast(eventName,data)
{

    io.sockets.emit(eventName,data)
}

async function createUser(socket)
{   
    var player = null;
    let response;
    let userHash = socket.handshake.query.userHash;
    if(isValidHash(userHash))
    {
        player = clientManager.getPlayer(userHash)
        if(typeof(player) != "undefined")
        {
            player.reconnect();
        }        
    }    
    if(typeof(player) == "undefined" ||player == null)
    {   
        let player = new Player(socket,gameManager)
        clientManager.addPlayer(player);
        let userHash = player.getUserHash()
        response = {userHash : userHash, message : "Player created"}
    }else{
        response = {userHash : userHash, message: "Player found"};        
    }
    socket.emit("handshakeResponse",response);
}

createPoolConnection(()=>
{
    io.on("connection",(socket)=>
    {
        createUser(socket)        
    });
});





