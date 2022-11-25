import Client from './client.js'
import Game from "./game.js";

export class Player extends Client
{
    #pseudo;
    #point;
    #currentRound
    #CurrentGame;
    #isReady;
    #finished;
    #IsGameOwner;
    gameManager;

    constructor(socket,gameManager)
    {
        super(socket);
        this.gameManager = gameManager;
        this.#point = 0;
        this.#finished = false
        this.setPseudoCallback(this.setPseudo);
        this.setDisconnectCallback(this.disconnect);
        this.setJoinCallback(this.join);
        this.setLaunchCallback(this.launchGame)
        this.setCreateCallback(this.creategame)
        this.setReadyCallback(this.setReady)
        this.setAnswerCallback(this.sendAnswer)
    }

    setClientPseudo(pseudo)
    {
        this.#pseudo = pseudo;
    }

    launchGame(data)
    {
        if(this.#IsGameOwner)
        {   
            let error = this.#CurrentGame.launch(this.getUserHash(),data.gameMod,data.round, data.jlpt);
            if(typeof(error) =="undefined")
            {
                this.sendError(error)
            }
        }else
        {
            this.sendError("You are not allowed to start a game")
        }
    }

    disconnect()
    {   
        if(this.#CurrentGame)
        {
            this.#isReady = false;
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
        if(this.hasGame())
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

    setReady(isReady)
    {
        if(this.hasGame())
        {
            this.#CurrentGame.setPlayerReady(this.#isReady)
            this.#isReady = true;
            this.#currentRound = 0;
        }        
    }

    sendAnswer(answer)
    {   
        if(this.#finished)
        {
            this.sendError("the game is finished for you");
            return;
        }
        this.#CurrentGame.checkAnswer(answer,this);
        this.#currentRound += 1;
        if(this.#CurrentGame.getTotalRound() <= this.#currentRound)
        {
            this.#finished = true;
            this.#CurrentGame.finishGame(this.getPseudo()); 
            this.sendResponse("endGame",{playerFinished : this.#finished});                 
                 
        }else
        {
            let response = this.#CurrentGame.nextRound(this.#currentRound)
            this.sendResponse("round", response);
        }      
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
        //console.log("duration createGame : " +(Date.now()-timeStart))  
    }

    creategame()
    {
        var timeStart = Date.now();

        if(this.#IsGameOwner)
        {
            let playerList = this.#CurrentGame.getPlayerList();
            let gameHash = this.#CurrentGame.getGameHash();
            let response = {message:"You already own a game",gameHash: gameHash, playerList : playerList}
            //console.log("duration createGame : " +(Date.now()-timeStart))
            this.sendResponse("create", response);
            return;
        }

        this.#IsGameOwner = true;
        let game = new Game()
        this.#CurrentGame = this.gameManager.addGame(this, game)
        let playerList = this.#CurrentGame.getPlayerList();
        let gameHash = this.#CurrentGame.getGameHash();
        let response = {message:"Game created",gameHash: gameHash, playerList : playerList}
        //console.log("duration createGame : " +(Date.now()-timeStart))
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
        //console.log("duration setPseudo : " +(Date.now()-timeStart))
        this.sendResponse("setPseudo",response)
    }

    hasFinished()
    {
        return this.#finished;
    }

    hasGame()
    {
        if(typeof(this.#CurrentGame) == "undefined" || this.#CurrentGame == null)
        {
            return false;
        } 
        return true;
    }

    increasePoint(newPoint)
    {
        this.#point += newPoint;
    }
    
    getCurrentRound()
    {
        return this.#currentRound;
    }

    getPseudo()
    {
        return this.#pseudo;
    }

    getPoint()
    {
        return this.#point;
    }

    getCurrentRound()
    {
        return this.#currentRound;
    }
}