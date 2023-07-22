import Game from './scripts/game.js'
import {getValidToken} from './scripts/utils.js'

class GameManager
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

    addGame(playerHash, pseudo,icon)
    {  
        var gameHash = getValidToken(this.#gameList);
        var game = new Game(gameHash);  
        game.setOwner(playerHash,pseudo,icon);        
        this.#gameList.set(gameHash, game)
        this.#gamesNumber +=1;
        return gameHash;
    }

    removeGame(gameHash)
    {
        var game = this.#gameList.get(gameHash);
        game = undefined;
        this.#gameList.delete(gameHash);
        this.#gamesNumber -=1;
        console.log("%cGame : " + gameHash + " has been deleted", "color: #bada55");
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

class ClientManager
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

getPlayer(playerHash)
{      
    return this.#playerList.get(playerHash);        
}

removePlayer(key)
{
    this.#playerList.delete(key)
}

getPlayerBySocket()
{

}

}


export var gameManager = new GameManager()
export var playerManager = new ClientManager();