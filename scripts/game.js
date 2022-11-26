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
    #hasStarted = false;
    #hasEnded = false;
    #canJoin = false;
    #inLobby = true;
    #gameMod;
    #deconnectedPlayer
    #rankingList

    constructor(gameHash)
    {
        this.#gameHash = gameHash;
        this.#playerList = new Array();
        this.#deconnectedPlayer = new Array();
        this.#rankingList = new Array();
    }

    broadCast(event, response)
    {
        for(let i = 0; i<this.#playerList.length; i++)
        {
            let player = this.getPlayer(this.#playerList[i])
            player.sendResponse(event,response)
        }
    }

    setOwner(playerHash)
    {
        this.#gameOwner = playerHash;
        this.#playerList.push(this.#gameOwner)
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

    join(playerHash)
    {        
        this.#playerList.push(playerHash);
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
                let response = new GameResponse();
                this.#rounds = roundsTemp;
                this.#inLobby = true;
                this.#canJoin = false;
                response.gameMod = gameModTemp;
                this.broadCast("launch",response);
            });
        }
        else
        {
            return "You are not allowed to start a game.";
        }
    }

    start()
    {
        this.#hasStarted = true;
        var firstCardSet = this.#gameMod.getCardSet(0);
        var assignment = this.#gameMod.getAssignment(0);
        let response = new GameResponse();       
        response.round = {cards : firstCardSet ,assignment :assignment}
        this.broadCast("round",response);
    }

    setPlayerReady()
    {  
        this.NumberPlayerReady +=1;
        if(this.NumberPlayerReady == this.playerNumber)
        {
            this.start();
        }                
    }

    checkAnswer(answer, playerHash, round)
    {
        let player = this.getPlayer(playerHash);
        if(this.#gameMod.checkAnswer(answer, round))
        {
            player.increasePoint(100);
            let FormattedList = this.getPlayerList()
            this.broadCast("playerList", {playerList : FormattedList})
        }
    }

    nextRound(round)
    {
        var cardSet = this.#gameMod.getCardSet(round);
        var assignment = this.#gameMod.getAssignment(round);
        let response = new GameResponse();
        response.round = {cards : cardSet ,assignment :assignment}
        return response;
    }

    finishGame(playerHash)
    {
        this.#rankingList.push(playerHash);
        //envoie des update sur les player
        let response = new GameResponse();
        response.playerList = this.getPlayerList();
        response.hasEnded = this.#hasEnded;     
        this.broadCast("playerList", response)      
        // ça je touche pas //
        if(this.#rankingList.length == this.#playerList.length)
        {
            //quand tout les joueurs ont fini
            this.#hasEnded = true;
            let response = new GameResponse();
            response.rankingList = this.getPlayerPseudo(this.#rankingList);
            //envoie à tout les joueurs le rankinglist
            this.broadCast("rankingList",response)
        }               
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
        let index =  this.#deconnectedPlayer.indexOf(userHash)
        if(index!= -1)
        {
            return false;
        }
        this.#deconnectedPlayer.splice(index,1);
        return true;
    }

    leave(userHash)
    {
        if(this.#hasStarted)
        {
            this.#deconnectedPlayer.push(userHash);
        }
        let index = this.getIndexByHash(userHash, this.#playerList)
        this.#playerList.splice(index,1)
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

    getIndexByHash(hash,list)
    {
        for(var i = 0; i<list.length; i++ )
        {
            if(hash == list[i])
            {
                return i;
            }
        }
        return null;
    }

    getTotalRound()
    {
        return this.#rounds;
    }

    getPlayerList()
    {
        var playerListFormatted = [];
        for(var i =0; i<this.#playerList.length; i++)
        {
            let player = this.getPlayer(this.#playerList[i])
            playerListFormatted.push({
                pseudo : player.getPseudo(), 
                point : player.getPoint(),
                hasFinished : player.hasFinished()
            })
        }
        return playerListFormatted;
    }

    getPlayerPseudo(list)
    {
        let playerPseudoList = []
        for(let i = 0; i < list.length; i++)
        {
            let player = this.getPlayer(list[i]);
            if(typeof(player)=="undefined")
            {
                continue;
            }
            playerPseudoList.push(player.getPseudo());
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
            hasStart : this.#hasStarted
         }
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