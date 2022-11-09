import {getValidToken} from './scripts/utils.js'

export class GameManager
{
    #gamesNumber = 0
    #gameList
    io

    constructor(io)
    {
        this.io = io
        this.#gameList = new Map();
    }

    getGamesNumber()
    {
        return this.#gamesNumber;
    }

    addGame(Player, game)
    {
        game.setOwner(Player);
        game.setGameHash(getValidToken(this.#gameList))
        this.#gameList.set(game.getGameHash(), game)
        this.#gamesNumber +=1;
        return game;
    }

    removeGame(gameHash)
    {
        this.#gameList.delete(gameHash);
        this.#gamesNumber -=1;
    }

    findGame(gameHash)
    {   
       
        for(var i = 0; i<this.games.length; i++)
        {
            if(this.games[i].gameHash == gameHash)
            {
                return i;
            }
        }
    }
    getGame(gameHash)
    {       
        return this.#gameList.get(gameHash)       
    }
}

export class ClientManager
{

#playerList;

constructor()
{
    this.#playerList = new Map();
}

addPlayer(player)
{   
    let userHash = getValidToken(this.#playerList);
    player.setUserHash(userHash)
    this.#playerList.set(userHash,player)
}

getPlayer(key)
{      
    return this.#playerList.get(key);        
}

removePlayer(key)
{
    this.#playerList.delete(key)
}

getPlayerBySocket()
{

}

}