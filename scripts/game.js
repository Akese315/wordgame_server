export default class Game
{
    gameOwner
    gameHash = "";
    playerNumber = 0
    players = []
    io
    canJoin = false;

    constructor(io)
    {
        this.io = io
        this.setListener();
    }

    setListener()
    {
        this.io.of(this.gameHash).on("",()=>
        {
            
        });
    }

    setOwner(player)
    {
        this.gameOwner = player;
        this.players.push(this.gameOwner)
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
        this.players.push(player);
        this.alterPlayerList();
    }

    getPlayerList()
    {
        var playerListFormatted = [];
        for(var i =0; i<this.players.length; i++)
        {
            playerListFormatted.push({pseudo : this.players[i].Cname, point : this.players[i].point})
        }
        return playerListFormatted;
    }

    setGameHash(gameHash)
    {
        this.gameHash = gameHash;
        console.log(this.gameHash)        
    }


    alterPlayerList()
    {
        var list = this.getPlayerList();
        console.log(list)
        this.io.to(this.gameHash).emit({playerList : list })
        console.log("emitted")
    }
}