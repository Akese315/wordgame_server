import { Player } from "./scripts/player.js";
import {createPoolConnection} from "./database.js";
import { Server } from "socket.io";
import { playerManager } from "./Manager.js";
import {isValidHash} from "./scripts/utils.js"
import http from 'http'
import express from "express";
import history from "connect-history-api-fallback"


const path ='./views/'
const PORT = process.env.SERVER_PORT

const app = express();
app.use(history());
app.use(express.static(path))


const server = http.Server(app);

server.listen(PORT,"0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}.`);
  });

const io = new Server(server, {
    path:"/socket",
    pingTimeout: 3000
});

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





