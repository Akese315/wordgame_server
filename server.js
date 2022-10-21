import Client from "./scripts/client.js";
import Database from "./database.js";
import { Server } from "socket.io";
import { Game_Manager } from "./game_manager.js";

const io = new Server(3000,
    {
        serveClient : false,
        path:"/",
        pingTimeout: 3000
    });
console.log("Launched")

var gameManager = new Game_Manager(io)
var database = new Database();  
database.createConnection(()=>
{
    io.on("connection",(socket)=>{new Client(socket,gameManager,database)})
});





