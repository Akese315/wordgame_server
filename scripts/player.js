import Client from './client.js'
import { gameManager } from '../Manager.js';

export class Player extends Client
{
    #pseudo;
    #icon;
    #MAX_ICON = 4;
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
        this.setRestartCallback(this.restart)
        this.setUpdateRulesCallback(this.updateRules)
        this.setLeaveCallback(this.leave_game)
        //set randomly an icon

        this.setRandIcon();

        //when a player is created by default it sends him to the home
        this.sendRedirect("/home");
    }

    launchGame()
    {
        let currentGame = this.#getGame(this.#gameHash)           
        let error = currentGame.launch(this.getUserHash());
        if(typeof(error) !="undefined")
        {   
            this.sendError(error)
        }    
    }

    disconnect()
    {   
        this.leave_game()
        console.log("User disconnected : "+this.getUserAdress())
    }

    leave_game()
    {
        //disconnect the user
        let currentGame = this.#getGame()
        //get the game object
        if(this.hasGame(currentGame))
        {
            //check if the game exists
            currentGame.leave(this.getUserHash()); 
            //inform to the game that the user            
            if(this.getUserHash() == currentGame.getOwnerHash())
            {
                //if the player is the game owner then remove the game
                // or choose a new owner
                if(currentGame.getPlayerList().length == 0)
                {
                    //if there is no player left then 
                    gameManager.removeGame(this.#gameHash)
                    //remove the game from the game manager
                }else
                {
                    currentGame.choseNewOwner();
                    //select the next user to be the new owner
                }
            }
        }

        this.sendRedirect("/home");
    }

    restart()
    {
        //get the game object
        let currentGame = this.#getGame(); 
        // check if the user is owner or not
        //and if player came back to lobby
        if(this.hasGame(currentGame))
        {
            currentGame.restart(this.getUserHash());
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
                this.sendRedirect("/home");
                this.sendInfo("You can't reconnect to the game.");
            }
            else
            {
                this.sendRedirect("/game");
                this.sendInfo("The player has a game, redirect to the game");
            }            
        }
        else
        {
            this.sendRedirect("/home");
            this.sendInfo("Player has no game or ended");
        }
    }

    setReady()
    {
        let currentGame =   this.#getGame();
        if(this.hasGame(currentGame))
        {
            if(currentGame.hasStarted())
            {
            // let round = currentGame.nextRound(this.getUserHash())
            // this.sendResponse("ready",{round : round, started : true})                
            }
            else
            {
                currentGame.setPlayerReady()
            }            
        }
        else
        {
            this.sendRedirect("/home");
        }        
    }

    updateRules(data)
    {
        let currentGame = this.#getGame();
        if(this.hasGame(currentGame))
        {
            var error = currentGame.updateRules(this.getUserHash(), data);
            if(typeof(error)!="undefined" || error != null)
            {
                this.sendError(error);
            }
        }
    }

    setRandIcon()
    {
        let iconIndex = Math.floor(Math.random() * this.#MAX_ICON);
        switch(iconIndex)
        {
            case 0 :
                this.#icon = "koi";
                break;
            case 1 :
                this.#icon = "kitsune";
                break;
            case 2 :
                this.#icon = "fugu";
            case 3 :
                this.#icon = "frog"
                break;
            default :
                this.#icon = undefined;
        }
    }

    receiveAnswer(answer)
    {   
        console.log(answer)
        let currentGame = this.#getGame();
        var correctAnswer = currentGame.checkAnswer(answer,this.getUserHash());
        if(correctAnswer)
        {
            this.sendResponse(this.ANSWER_GAME_EVENT, {answer : true});
        }else
        {
            this.sendResponse(this.ANSWER_GAME_EVENT, {answer : false});
        }
        if(currentGame.hasPlayerFinished(this.getUserHash()))
        {
            this.sendResponse("game:event",{event : "end"});              
                 
        }else
        {
            let response = currentGame.nextRound(this.getUserHash())
            this.sendResponse("game:round", response);
        }      
    }

    timeoutReached()
    {
        
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
            //join the game
            currentGame.join(this.getUserHash(), this.getPseudo(), this.#icon);
            this.#gameHash = tempGameHash;
            //set the gameHash

            let playerlist = currentGame.getPlayerList();           
            let redirect = "";

            if(currentGame.getGameStatus().hasStart)
            {
                redirect = "/game";
            }else
            {
                redirect = "/lobby";
            }   

            let response = {playerList : playerlist, isOwner : false, redirect : redirect};
            this.sendResponse("game:join", response);               
        }
    }

    creategame()
    {
        console.log(this.#icon)
        this.#gameHash = gameManager.addGame(this.getUserHash(), this.getPseudo(), this.#icon)
        var currentGame = this.#getGame();
        let playerList = currentGame.getPlayerList();        
        let response = 
        {
            message:"Game created",
            isOwner : true,
            gameHash: this.#gameHash,
            playerList : playerList,
            redirect : "/lobby"
        }        
        this.sendResponse("game:create", response);
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
        this.sendResponse(this.SET_PSEUDO_EVENT,response)
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
        let pseudo = this.#pseudo;
        let icon = this.#icon
        let userHash = this.getUserHash();
        let currentGame = this.#getGame();   
        if(this.hasGame(currentGame))
        {
            gameStatus = currentGame.getGameStatus();
        }
        return{
            pseudo : pseudo,
            gameStatus : gameStatus,
            userHash : userHash,
            icon :icon
        }
    }
}