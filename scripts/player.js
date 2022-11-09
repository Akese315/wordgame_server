import Client from './client.js'
import Game from "./game.js";

export class Player extends Client
{
    #pseudo;
    #point;
    #CurrentGame;
    #isReady;
    #IsGameOwner;
    gameManager;

    constructor(socket, broadcast,gameManager)
    {
        super(socket, broadcast);
        this.gameManager = gameManager;
        this.#point = 0;

        this.setPseudoCallback(this.setPseudo);
        this.setDisconnectCallback(this.disconnect);
        this.setJoinCallback(this.join);
        this.setStartCallback(this.startGame)
        this.setCreateCallback(this.creategame)
        this.setReadyCallback(this.setReady)
    }

    setClientPseudo(pseudo)
    {
        this.#pseudo = pseudo;
    }

    startGame(data)
    {
        if(this.#IsGameOwner)
        {   
            this.#CurrentGame.start(this.getUserHash(),data.gameMod);
        }else
        {
            this.sendError("You are not allowed to start a game")
        }
    }

    disconnect()
    {   
        if(this.#CurrentGame)
        {
            this.#CurrentGame.leave(this.getUserHash());            
            if(this.getUserHash() == this.#CurrentGame.getOwnerHash())
            {
                if(this.#CurrentGame.getPlayerList().length == 0)
                {
                    console.log(this.gameManager.getGamesNumber());
                    this.gameManager.removeGame(this.#CurrentGame.getGameHash())
                    console.log(this.gameManager.getGamesNumber());
                }else
                {
                    this.#CurrentGame.choseNewOwner();
                }
            }
        }       
        console.log("User disconnected : "+this.getUserHash())
    }

    reconnect()
    {
        if(this.#CurrentGame != "undefined")
        {
            if(this.#CurrentGame.canReconnect(this.getUserHash()))
            {
                this.#CurrentGame.join(this);
            }
        }
        else
        {
            console.log("Player has no game : redirect to the home.")
        }
    }

    setReady()
    {
        this.#isReady = true;
        this.#CurrentGame.start(this)
    }

    join(data)
    {   
        let tempGameHash = data.gameHash;
        let timeStart = Date.now();
        var game =  this.gameManager.getGame(tempGameHash)
        if(!game)
        {
            this.sendError("can't find game")
            return;
        }
        if(game.isJoinable())
        {
            game.join(this);
            this.#IsGameOwner = false;
            this.#CurrentGame = game;
            let playerlist = this.#CurrentGame.getPlayerList(); 
            let response = {playerList : playerlist};
            this.sendResponse("join", response)                                  
        }
        console.log("duration createGame : " +(Date.now()-timeStart))  
    }

    creategame()
    {
        var timeStart = Date.now();

        if(this.#IsGameOwner)
        {
            let playerList = this.#CurrentGame.getPlayerList();
            let gameHash = this.#CurrentGame.getGameHash();
            let response = {message:"You already own a game",gameHash: gameHash, playerList : playerList}
            console.log("duration createGame : " +(Date.now()-timeStart))
            this.sendResponse("create", response);
            return;
        }

        this.#IsGameOwner = true;
        let game = new Game(this.broadcast)
        this.#CurrentGame = this.gameManager.addGame(this, game)
        let playerList = this.#CurrentGame.getPlayerList();
        let gameHash = this.#CurrentGame.getGameHash();
        let response = {message:"Game created",gameHash: gameHash, playerList : playerList}
        console.log("duration createGame : " +(Date.now()-timeStart))
        this.sendResponse("create", response);
    }

    setPseudo(data)
    {
        var timeStart = Date.now();
        let tempPseudo = data.pseudo;

        if(typeof(tempPseudo) =="undefined" || tempPseudo.length > 10)
        {
            this.sendError("pseudo is not valid")
            return;
        }

        this.setClientPseudo(tempPseudo);

        let response = {message : "pseudo has been set", pseudo: this.#pseudo}
        console.log("duration setPseudo : " +(Date.now()-timeStart))
        this.sendResponse("setPseudo",response)
    }

    getPseudo()
    {
        return this.#pseudo;
    }

    getPoint()
    {
        return this.#point;
    }
}