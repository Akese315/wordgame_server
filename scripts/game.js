import { GameMod1,GameMod2,GameMod3 } from './gameMod.js';

export default class Game
{
    #gameOwner
    #gamehash;
    playerNumber = 0
    playerReady = 0
    rounds = 1;
    #playerList;
    #hasStarted = false;
    #hasLaunched = false;
    #canJoin = false;
    #gameMod;
    broadcastCallback
    #deconnectedPlayer

    constructor(broadcastCallback)
    {
        this.#playerList = new Array();
        this.#deconnectedPlayer = new Array();
        this.broadcastCallback = broadcastCallback;
    }

    setOwner(player)
    {
        this.#gameOwner = player;
        this.#playerList.push(this.#gameOwner)
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
        this.alterPlayerList();
    }

    launch(userHash,gameMod)
    {
        if(userHash == this.#gameOwner.getUserHash())
        {
            this.#hasLaunched = true;
            this.#canJoin = false;
            this.#gameMod = this.setGameMod(gameMod);
            this.#gameMod.createCardsSet(()=>
            {
                console.log(this.#gameMod.getThreeCard(1))
                let response = new GameResponse();
                response.hasLaunched = this.#hasLaunched;
                this.broadcastCallback(this.#gamehash,response);
            },this.rounds);
        }
    }

    start()
    {
        this.#hasStarted = true;
        var firstCardSet = this.#gameMod.getThreeCard(1);
        let response = new GameResponse();
        response.hasStarted = this.#hasStarted;
        response.cards = firstCardSet;
        this.broadcastCallback(this.#gamehash,response);
    }

    setPlayerReady()
    {
        this.playerReady +=1;
        if(this.playerReady == this.playerNumber)
        {
            this.start()
        }
    }

    setGameMod(gameMod)
    {
        switch(gameMod)
        {
            case "gameMod1":
                return new GameMod1();
            case "gameMod1":
                return new GameMod2();
            case "gameMod1":
                return new GameMod3();
        }
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

    getPlayerList()
    {
        var playerListFormatted = [];
        for(var i =0; i<this.#playerList.length; i++)
        {
            playerListFormatted.push({pseudo : this.#playerList[i].getPseudo(), point : this.#playerList[i].getPoint()})
        }
        return playerListFormatted;
    }

    setGameHash(gamehash)
    {
        this.#gamehash = gamehash;
        //console.log(this.#gamehash)        
    }


    alterPlayerList()
    {
        var list = this.getPlayerList();
        let response = new GameResponse()
        response.playerList = list;
        this.broadcastCallback(this.#gamehash,response)
    }
}

class GameResponse
{
    hasLaunched;
    playerList;
    cards;
    hasStarted;
}