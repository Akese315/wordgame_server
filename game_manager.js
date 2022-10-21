import Game from './scripts/game.js'

export class Game_Manager
{
    gamesNumber = 0
    games
    io

    constructor(io)
    {
        this.io = io
        this.games = new Array();
    }

    addGame(Player, gameHash)
    {
        var game = new Game(this.io);
        game.setOwner(Player);
        game.setGameHash(gameHash)
        this.games.push(game)
        this.gamesNumber +=1;
        return game;
    }

    removeGame(game)
    {
        var index = this.findGame(game);
        this.games.splice(index);
        this.gamesNumber -=1;
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
        var index = this.findGame(gameHash)
        if(index == -1 || index <0)
        {
            return null;
        }
        return this.games[index];
    }
}