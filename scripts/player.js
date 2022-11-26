import Client from './client.js'
import { gameManager } from '../Manager.js';

export class Player extends Client
{
    #pseudo;
    #point;
    #currentRound;
    #gameHash;
    #isReady;
    #finished;

    constructor(socket)
    {
        super(socket);
        this.#point = 0;
        this.#finished = false
        this.setPseudoCallback(this.setPseudo);
        this.setDisconnectCallback(this.disconnect);
        this.setJoinCallback(this.join);
        this.setLaunchCallback(this.launchGame)
        this.setCreateCallback(this.creategame)
        this.setReadyCallback(this.setReady)
        this.setAnswerCallback(this.receiveAnswer)
    }

    launchGame(data)
    {
        let currentGame = this.#getGame(this.#gameHash)           
        let error = currentGame.launch(this.getUserHash(),data.gameMod,data.round, data.jlpt);
        if(typeof(error) !="undefined")
        {
            this.sendError(error)
        }    
    }

    disconnect()
    {   
        let currentGame = this.#getGame()
        if(this.hasGame(currentGame))
        {
            this.#isReady = false;
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

    reconnect(socket)
    {
        this.clientReconnect(socket);
        let currentGame = this.#getGame();
        if(this.hasGame(currentGame))
        {
            if(currentGame.canReconnect(this.getUserHash()))
            {
                currentGame.join(this);
            }
        }
        else
        {
            console.log("Player has no game : redirect to the home.")
        }
    }

    setReady(isReady)
    {
        let currentGame = this.#getGame();
        if(this.hasGame(currentGame))
        {
            this.#isReady = isReady;
            currentGame.setPlayerReady(this.#isReady)
            this.#currentRound = 0;
        }        
    }

    receiveAnswer(answer)
    {   
        if(this.#finished)
        {
            this.sendError("the game is finished for you");
            return;
        }
        let currentGame = this.#getGame();
        currentGame.checkAnswer(answer,this.getUserHash(), this.#currentRound);
        this.#currentRound += 1;
        if(currentGame.getTotalRound() <= this.#currentRound)
        {
            this.#finished = true;
            currentGame.finishGame(this.getUserHash()); 
            this.sendResponse("endGame",{playerFinished : this.#finished});                 
                 
        }else
        {
            let response = currentGame.nextRound(this.#currentRound)
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
            currentGame.join(this.getUserHash());
            this.#gameHash = tempGameHash;
            let playerlist = currentGame.getPlayerList(); 
            let response = {playerList : playerlist};
            this.sendResponse("join", response)                                  
        }
    }

    creategame()
    {
        this.#gameHash = gameManager.addGame(this.getUserHash())
        var currentGame = this.#getGame();
        let playerList = currentGame.getPlayerList();        
        let response = {message:"Game created",gameHash: this.#gameHash, playerList : playerList}        
        this.sendResponse("create", response);
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

    hasFinished()
    {
        return this.#finished;
    }

    hasGame()
    {
        let currentGame = this.#getGame();
        if(typeof(currentGame) == "undefined" || currentGame == null)
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

    #getGame()
    {
        return gameManager.getGame(this.#gameHash);
    }

    getPoint()
    {
        return this.#point;
    }

    getCurrentRound()
    {
        return this.#currentRound;
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