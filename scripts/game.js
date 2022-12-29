import { GameMod1,GameMod2,GameMod3 } from './gameMod.js';
import { playerManager } from '../Manager.js';

export default class Game
{
    #gameOwner
    #gameHash;
    playerNumber = 0
    NumberPlayerReady = 0
    #rounds = 1;
    #playerList;
    #deconnectedPlayer
    #started = false;
    #hasEnded = false;
    #canJoin = false;
    #inLobby = true;
    #gameMod = undefined;
   

    constructor(gameHash)
    {
        this.#gameHash = gameHash;
        this.#playerList = new Map();
        this.#deconnectedPlayer = new Map();
    }

    broadCast(event, response)
    {
        for(let playerHash of this.#playerList.keys())
        {
            let player = this.getPlayer(playerHash);
            if(typeof(player) == "undefined")
            {
                console.error("player undefined")
            }
            player.sendResponse(event,response)
        }
    }

    redirectEveryone(where, message)
    {
        for(let playerHash of this.#playerList.keys())
        {
            let player = this.getPlayer(playerHash)
            player.sendInfo(where,message)
        }
    }

    setOwner(playerHash,pseudo)
    {
        this.#gameOwner = playerHash;
        var playerProps = new PlayerProperty();
        playerProps.pseudo = pseudo;
        playerProps.point = 0;
        playerProps.owner = true;
        playerProps.hasFinished = false;
        playerProps.currentRound = 0;
        this.#playerList.set(playerHash, playerProps);
        this.playerNumber += 1
        this.#canJoin = true;
    }

    isJoinable()
    {
        if(this.#canJoin)
        {
            return true;
        }
        return false;
    }

    join(playerHash, pseudo)
    {        
        var playerProps = new PlayerProperty();
        playerProps.pseudo = pseudo;
        playerProps.point = 0;
        playerProps.owner = false;
        playerProps.hasFinished = false;
        playerProps.currentRound = 0;
        this.#playerList.set(playerHash,playerProps);
        this.playerNumber += 1
        this.alterPlayerList();
    }

    launch(playerHash,gameModTemp,roundsTemp,jlptTemp)
    {
        if(playerHash == this.#gameOwner)
        {   
            let error = "";    
            this.#gameMod = this.setGameMod(gameModTemp,jlptTemp,roundsTemp);
            if(typeof(this.#gameMod) =="undefined")
            {
                return "Error no gameMod fit : "+ gameModTemp;
            }
            this.#gameMod.createCardsSet(()=>
            {
                this.#rounds = roundsTemp;
                this.#inLobby = true;
                this.#canJoin = false;
                let response = new GameResponse();
                response.gameMod = gameModTemp;
                this.redirectEveryone("game");
            });
        }
        else
        {
            return "You are not allowed to start a game.";
        }
    }

    start()
    {
        
        this.#started = true;
        var cardSet = this.#gameMod.getCardSet(0);
        var assignment = this.#gameMod.getAssignment(0);
        let response = new GameResponse();
        response.round = {cards : cardSet ,assignment :assignment, round : 0}        
        this.broadCast("ready",response);              
    }

    reLaunch()
    {
        this.#started = false;
        for(let playerHash of this.#playerList.keys())
        {
            let player = this.#playerList.get(playerHash)
            player.point = 0;
        }
        let FormattedList = this.getPlayerList();  
        this.#gameMod.createCardsSet(()=>
        {
            this.broadCast("playerList", {playerList : FormattedList})
            this.redirectEveryone("game");
        });        
    }

    setPlayerReady()
    {  
        this.NumberPlayerReady +=1;
        if(this.NumberPlayerReady == this.playerNumber)
        {
            this.start();
        }                
    }

    checkAnswer(answer, playerHash)
    {
        let player = this.#playerList.get(playerHash);
        if(player.hasFinished)
        {
            return;
        }
        if(this.#gameMod.checkAnswer(answer,player.currentRound))
        {
            player.point +=100;
            player.currentRound +=1;
            this.#playerList.set(playerHash, player)
            let FormattedList = this.getPlayerList()
            this.broadCast("playerList", {playerList : FormattedList})
        }
    }

    nextRound(userHash)
    {
        let round = this.#playerList.get(userHash).currentRound;
        var cardSet = this.#gameMod.getCardSet(round);
        var assignment = this.#gameMod.getAssignment(round);
        let response = new GameResponse();
        response.round = {cards : cardSet ,assignment :assignment, round : round}
        return response;
    }

    finishGame(playerHash)
    {
        let object = this.#playerList.get(playerHash);
        object.hasFinished = true;
        this.#playerList.set(playerHash, object)

        let response = new GameResponse();
        response.playerList = this.getPlayerList();
        response.hasEnded = this.#hasEnded;     
        this.broadCast("playerList", response)      

        if(this.hasEveryoneFinished())
        {
            //quand tout les joueurs ont fini
            this.#hasEnded = true;
            let response = new GameResponse();
            response.rankingList = this.getPlayerPseudo();
            //envoie à tout les joueurs le rankinglist
            this.broadCast("rankingList",response)
        }               
    }

    hasEveryoneFinished()
    {
        for(let player of this.#playerList.keys())
        {
            if(!player.hasFinished)
            {
                return false;
            }
        }
        return true;
    }

    hasPlayerFinished(userHash)
    {
        let player = this.#playerList.get(userHash)
        if(player.currentRound == this.#rounds)
        {
            this.finishGame(userHash)
            return true;
        }
        return false;
    }

    setGameMod(gameMod, rounds, jlpt)
    {
        var gameModObject;
        switch(gameMod)
        {
            case "gameMod1":
                gameModObject = new GameMod1(rounds,jlpt);
                break;
            case "gameMod2":
                gameModObject = new GameMod2(rounds,jlpt);
                break;
            case "gameMod3":
                gameModObject = new GameMod3(rounds,jlpt);
                break;
            default:
                gameModObject = undefined;
        }
        return gameModObject
    }

    canReconnect(userHash)
    {
        let has = this.#deconnectedPlayer.has(userHash)
        if(!has)
        {
            return false;
        }
        return true;
    }

    reconnect(userHash, pseudo)
    {
        if(this.#started)
        {
            if(!this.canReconnect(userHash))
            {
                return false;
            }
            this.#playerList.set(userHash,this.#deconnectedPlayer.get(userHash));
            this.#deconnectedPlayer.delete(userHash);
            this.playerNumber += 1
            this.alterPlayerList();
            return true;
        }
        else
        {
            this.join(userHash, pseudo);
            return true;
        }     
       
    }

    leave(userHash)
    {
        if(this.#started)
        {
            this.#deconnectedPlayer.set(userHash,this.#playerList.get(userHash));
        }
        this.#playerList.delete(userHash)
        this.playerNumber -=1;
        this.alterPlayerList();
    }

    getGameHash()
    {
        return this.#gameHash;
    }

    choseNewOwner()
    {
        this.setOwner(this.#playerList[0]);
    }

    getOwnerHash()
    {
        return this.#gameOwner;
    }

    getTotalRound()
    {
        return this.#rounds;
    }

    getPlayerList()
    {
        var playerListFormatted = [];
        for(let playerHash of this.#playerList.keys())
        {
            let player = this.#playerList.get(playerHash)
            playerListFormatted.push({
                pseudo : player.pseudo, 
                point : player.point,
                hasFinished : player.hasFinished
            })
        }
        return playerListFormatted;
    }

    getPlayerPseudo()
    {
        let playerPseudoList = []
        for(let playerHash of this.#playerList.keys())
        {           
            let player = this.#playerList.get(playerHash)
            playerPseudoList.push(player.pseudo);
        }
        return playerPseudoList;
    }

    alterPlayerList()
    {
        var FormattedList = this.getPlayerList();
        let response = new GameResponse()
        response.playerList = FormattedList;
        this.broadCast("playerList",response)
    }

    getPlayer(playerHash)
    {
            return playerManager.getPlayer(playerHash)
    }

    getGameStatus()
    {
        return {
            hasEnded : this.#hasEnded,
            hasStart : this.#started
         }
    }

    hasStarted()
    {
        return this.started;
    }
}

class GameResponse
{
    playerList;
    round;
    inLobby;
    hasEnded;
    gameMod;
    rankingList;
}

class PlayerProperty
{
    pseudo;
    point;
    hasFinished;
    owner;
    currentRound;
}