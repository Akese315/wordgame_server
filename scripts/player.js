import Client from './client.js'
import { gameManager } from '../Manager.js';

export class Player extends Client
{
    #pseudo;
    #gameHash;

    constructor(socket)
    {
        super(socket);
        this.setPseudoCallback(this.setPseudo);
        this.setDisconnectCallback(this.disconnect);
        this.setJoinCallback(this.join);
        this.setLaunchCallback(this.launchGame)
        this.setCreateCallback(this.creategame)
        this.setReadyCallback(this.setReady)
        this.setAnswerCallback(this.receiveAnswer)
        this.restartCallback(this.restart)
    }

    launchGame(data)
    {
        let currentGame = this.#getGame(this.#gameHash)           
        let error = currentGame.launch(this.getUserHash(),data.gameMod,data.round, data.jlpt);
        if(typeof(error) !="undefined")
        {
            this.info(undefined,error)
        }    
    }

    disconnect()
    {   
        let currentGame = this.#getGame()
        if(this.hasGame(currentGame))
        {
            currentGame.leave(this.getUserHash());            
            if(this.getUserHash() == currentGame.getOwnerHash())
            {
                if(currentGame.getPlayerList().length == 0)
                {
                    gameManager.removeGame(this.#gameHash)
                }else
                {
                    currentGame.choseNewOwner();
                }
            }
        }       
        console.log("User disconnected : "+this.getUserAdress())
    }

    restart()
    {
        let currentGame = this.#getGame();
        if(this.hasGame(currentGame))
        {
            currentGame.restart(this.getUserHash())
        }
    }

    reconnect(socket)
    {
        this.clientReconnect(socket);
        let currentGame = this.#getGame();
        if(this.hasGame(currentGame))
        {
            let reconnected = currentGame.reconnect(this.getUserHash(), this.getPseudo());
            if(!reconnected)
            {
                this.#gameHash = undefined;
                this.sendInfo("home","You can't reconnect to the game.")
            }
            else
            {
                this.sendInfo("game","The player has a game, redirect to the game");
            }            
        }
        else
        {
            console.log("Player has no game or ended")
            this.sendInfo("home");
        }
    }

    setReady()
    {
        let currentGame = this.#getGame();
        if(this.hasGame(currentGame))
        {
            if(currentGame.hasStarted())
            {
                let round = currentGame.nextRound(this.getUserHash())
                this.sendResponse("ready",{round : round, started : true})
            }
            else
            {
                currentGame.setPlayerReady()
            }            
        }
        else
        {
            this.sendInfo("home");
        }        
    }

    receiveAnswer(answer)
    {   
        let currentGame = this.#getGame();
        currentGame.checkAnswer(answer,this.getUserHash());
        if(currentGame.hasPlayerFinished(this.getUserHash()))
        {
            this.sendResponse("endGame",{playerFinished : true});              
                 
        }else
        {
            let response = currentGame.nextRound(this.getUserHash())
            this.sendResponse("round", response);
        }      
    }

    join(data)
    {   
        let tempGameHash = data.gameHash;
        var currentGame = gameManager.getGame(tempGameHash);
        if(typeof(currentGame) == "undefined")
        {
            this.sendError("can't find game")
            return;
        }
        if(currentGame.isJoinable())
        {
            currentGame.join(this.getUserHash(), this.getPseudo());
            this.#gameHash = tempGameHash;
            let playerlist = currentGame.getPlayerList(); 
            let response = {playerList : playerlist};
            this.sendResponse("join", response)                                  
        }
    }

    creategame()
    {
        this.#gameHash = gameManager.addGame(this.getUserHash(), this.getPseudo())
        var currentGame = this.#getGame();
        let playerList = currentGame.getPlayerList();        
        let response = {message:"Game created",gameHash: this.#gameHash, playerList : playerList}        
        this.sendResponse("create", response);
        this.sendInfo("lobby");
    }

    setPseudo(data)
    {
        let tempPseudo = data.pseudo;
        if(typeof(tempPseudo) =="undefined" || tempPseudo.length > 10)
        {
            this.sendError("pseudo is not valid")
            return;
        }
        this.#pseudo = tempPseudo;
        let response = {message : "pseudo has been set", pseudo: this.#pseudo}
        this.sendResponse("setPseudo",response)
    }

    hasGame(currentGame)
    {
        if(typeof(currentGame) == "undefined" || currentGame == null)
        {
            return false;
        } 
        return true;
    }

    getPseudo()
    {
        return this.#pseudo;
    }

    #getGame()
    {
        if(typeof(this.#gameHash) =="undefined")
        {
            return;
        }
        return gameManager.getGame(this.#gameHash);
    }

    getPlayerInformation()
    {
        let gameStatus;
        let currentGame = this.#getGame();        
        if(this.hasGame(currentGame))
        {
            gameStatus = currentGame.getGameStatus();
        }
        return{
            pseudo : this.getPseudo(),
            gameStatus : gameStatus
        }
    }
}