import { Player } from "./scripts/player.js";
import {createPoolConnection} from "./database.js";
import { Server } from "socket.io";
import { playerManager } from "./Manager.js";
import {isValidHash} from "./scripts/utils.js"



const io = new Server(3000,
    {
        serveClient : false,
        path:"/",
        pingTimeout: 3000
    });
console.log("Launched")

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
        player = playerManager.getPlayer(userHash)
        if(typeof(player) != "undefined")
        {
            player.reconnect(socket);
            var userInformation = player.getPlayerInformation()
        }        
    }    
    if(typeof(player) == "undefined" ||player == null)
    {   
        let player = new Player(socket)
        playerManager.addPlayer(player);
        let userHash = player.getUserHash()
        response = {userHash : userHash, message : "Player created"}
    }else{
        response = {userHash : userHash, userInformation : userInformation, message: "Player found"};        
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





