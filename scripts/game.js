

export default class Game
{
    gameOwner
    #gamehash;
    playerNumber = 0
    #playerList;
    canJoin = false;
    broadcastCallback

    constructor(broadcastCallback)
    {
        this.#playerList = new Array();
        this.broadcastCallback = broadcastCallback;
    }

    setOwner(player)
    {
        this.gameOwner = player;
        this.#playerList.push(this.gameOwner)
        this.canJoin = true;
    }

    isJoinable()
    {
        if(this.canJoin)
        {
            return true;
        }
        return false;
    }

    join(player)
    {
        this.#playerList.push(player);
        this.alterPlayerList();
        return this.getPlayerList();
    }

    getGameHash()
    {
        return this.#gamehash;
    }

    getPlayerList()
    {
        var playerListFormatted = [];
        for(var i =0; i<this.#playerList.length; i++)
        {
            playerListFormatted.push({pseudo : this.#playerList[i].Cname, point : this.#playerList[i].point})
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
        this.broadcastCallback(this.#gamehash,{playerList : list})
    }
}