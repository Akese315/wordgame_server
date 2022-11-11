import { GameMod1,GameMod2,GameMod3 } from './gameMod.js';

export default class Game
{
    #gameOwner
    #gamehash;
    playerNumber = 0
    NumberPlayerReady = 0
    #rounds = 1;
    #playerList;
    #hasStarted = false;
    #hasLaunched = false;
    #hasEnded = false;
    #canJoin = false;
    #gameMod;
    #deconnectedPlayer
    #rankingList

    constructor()
    {
        this.#playerList = new Array();
        this.#deconnectedPlayer = new Array();
        this.#rankingList = new Array();
    }

    broadCast(event, response)
    {
        for(let i = 0; i<this.#playerList.length; i++)
        {
            this.#playerList[i].sendResponse(event,response)
        }
    }

    setOwner(player)
    {
        this.#gameOwner = player;
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

    join(player)
    {
        this.#playerList.push(player);
        this.playerNumber += 1
        this.alterPlayerList();
    }

    launch(userHash,gameMod, round)
    {

        if(userHash == this.#gameOwner.getUserHash())
        {
            this.#rounds = round;
            this.#hasLaunched = true;
            this.#canJoin = false;
            this.#gameMod = this.setGameMod(gameMod);
            this.#gameMod.createCardsSet(()=>
            {
                let response = new GameResponse();
                response.hasLaunched = this.#hasLaunched;
                response.gameMod = gameMod;
                this.broadCast("launch",response);
            },this.#rounds);
        }
    }

    start()
    {
        this.#hasStarted = true;
        var firstCardSet = this.#gameMod.getThreeCard(0);
        var assignment = this.#gameMod.getAssignment(0);
        let response = new GameResponse();
        response.hasStarted = this.#hasStarted;        
        response.round = {cards : firstCardSet ,assignment :assignment}
        this.broadCast("round",response);
    }

    setPlayerReady(isAlreadyReady)
    {
        if(!isAlreadyReady)
        {
            this.NumberPlayerReady +=1;
            if(this.NumberPlayerReady == this.playerNumber)
            {
                this.start()
            }
        }        
    }

    checkAnswer(answer, player)
    {
        if(this.#gameMod.checkAnswer(answer, player.getCurrentRound()))
        {
            player.increasePoint(100);
            let playerlist = this.getPlayerList()
            this.broadCast("playerList", {playerList : playerlist})
        }
    }

    nextRound(round)
    {
        var cardSet = this.#gameMod.getThreeCard(round);
        var assignment = this.#gameMod.getAssignment(round);
        let response = new GameResponse();
        response.round = {cards : cardSet ,assignment :assignment}
        return response;
    }

    finishGame(name)
    {
        this.#rankingList.push(name);
        if(this.#rankingList.length == this.#playerList.length)
        {
            //quand tout les joueurs ont fini
            this.#hasEnded = true;
            let response = new GameResponse();
            response.rankingList = this.#rankingList;
            response.hasEnded = this.#hasEnded;
            this.broadCast("endGame",response)
        }else
        {
            //quand il reste encore des joueur
            let response = new GameResponse();
            response.playerList = this.getPlayerList();
            response.hasEnded = this.#hasEnded;  
            this.broadCast("playerList", response)          
        }
        
    }

    setGameMod(gameMod)
    {
        var gameModObject;
        switch(gameMod)
        {
            case "gameMod1":
                gameModObject = new GameMod1();
                break;
            case "gameMod1":
                gameModObject = new GameMod2();
                break;
            case "gameMod1":
                gameModObject = new GameMod3();
                break;
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
        if(this.#hasLaunched)
        {
            this.#deconnectedPlayer.push(userHash);
        }
        let index = this.getIndexByHash(userHash, this.#playerList)
        this.#playerList.splice(index,1)
        this.alterPlayerList();
    }

    getGameHash()
    {
        return this.#gamehash;
    }

    choseNewOwner()
    {
        this.setOwner(this.#playerList[0]);
    }

    getOwnerHash()
    {
        return this.#gameOwner.getUserHash();
    }

    getIndexByHash(hash,list)
    {
        for(var i = 0; i<list.length; i++ )
        {
            if(hash == list[i].getUserHash())
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
            playerListFormatted.push({
                pseudo : this.#playerList[i].getPseudo(), 
                point : this.#playerList[i].getPoint(),
                hasFinished : this.#playerList[i].hasFinished()
            })
        }
        return playerListFormatted;
    }

    setGameHash(gamehash)
    {
        this.#gamehash = gamehash;     
    }


    alterPlayerList()
    {
        var list = this.getPlayerList();
        let response = new GameResponse()
        response.playerList = list;
        this.broadCast("playerList",response)
    }
}

class GameResponse
{
    hasLaunched;
    playerList;
    round;
    hasStarted;
    hasEnded;
    gameMod;
    rankingList;
}