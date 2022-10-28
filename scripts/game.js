

export default class Game
{
    #gameOwner
    #gamehash;
    playerNumber = 0
    #playerList;
    #hasStarted = false;
    #canJoin = false;
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

    start(userHash)
    {
        if(userHash == this.#gameOwner.getUserHash())
        {
            this.#hasStarted = true;
            this.#canJoin = false;
            let response = new GameResponse();
            response.hasStart = this.#hasStarted;
            this.broadcastCallback(this.#gamehash,response);
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
        console.log(this.#gamehash)        
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
    hasStart;
    playerList;
}