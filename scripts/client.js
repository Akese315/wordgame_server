import generateToken from './utils.js'

export default class Client
{

    gameManager
    Csocket
    database
    Hash = ""
    Cname =""
    Cgame
    point
    hashLetterNumber = 43
    ClientAdress;
    

    constructor(socket,gameManager,database)
    {
        this.Csocket = socket;
        this.database = database;
        this.gameManager = gameManager;
        this.point = 0
        this.ClientAdress = this.Csocket.handshake.address;
        this.setDisconnectEvent();
        this.setUserListener();
        this.setGameListener();
        this.setJoinListener();
        console.log("a new client is connected : " + this.ClientAdress)
    }

    
    setDisconnectEvent()
    {
        this.Csocket.on("disconnect", (reason)=>
        {
            console.log(this.ClientAdress+" s'est déconnecté car : "+reason)
        });
    }

    setGameListener()
    {
        this.Csocket.on("game", (message)=>
        {
            this.createGame(message,(response)=>
            {
                this.Csocket.emit("game",response)
            })                       
        });
    }


    setUserListener()
    {
        this.Csocket.on("user", (message)=>
        {            
            this.createUser(message,(response)=>
            {               
                this.Csocket.emit("user",response)
            });                          
        })
    }

    setJoinListener()
    {
        this.Csocket.on("join",(message)=>
        {
            this.joinGame(message,(response)=>
            {
                this.Csocket.emit("join",response)
            });           
        })
    }

    async findAvailableToken(hash)
    {
        hash = await generateToken();
        var result = await this.database.isExists(hash);
        while(result)
        {
            hash = await generateToken();
            result = await this.database.isExists(hash);
        }
        return hash;
    }

    async checkToken(hash)
    {
        if(typeof(hash) == "undefined" || hash == "none" || hash.length != this.hashLetterNumber)
        {
            //si le hash est vide
            hash =  await this.findAvailableToken(hash)
        }
        else
        {
            if(!this.database.isExists(hash))
            {
                hash = await this.findAvailableToken(hash)
            }
        }
        return hash;
    }

    async createUser(message,callback)
    {
        var response = new Response();
        this.Cname = message.name;
        this.Hash = await this.checkToken(message.userHash);                
        if(typeof(this.Cname) == "undefined" || this.Cname.length >10)
        {
            response.error  = "Pseudo is too long or doesn't exist.";
            response.status = 400
            callback(response);
            return;
        }

        //verifie si l'utilisateur existe 
        await this.database.addUser(this.Cname, this.Hash);
        response.data = {message: "User created", userHash : this.Hash, pseudo : this.Cname};
        response.status = 200;
    
        callback(response);  
        return; 
    }

    async createGame(message, callback)
    {   
        var response = new Response();
        if(typeof(message.userHash)=="undefined" ||message.userHash.length != this.hashLetterNumber)
        {
            response.error = "userHash is required."
            response.status = 400;
            callback(response);
            return;
        }
        var result = await this.database.isExistsAndHasGame(message.userHash)
        if(result==false)
        {
            response.error = "user does not exist."
            response.status = 400;
            callback(response);
            return;
        }
        if(result == true)
        {
            //si le joueur existe mais n'est pas encore propriétaire
           var gameHash = await generateToken();
           var addResult = await this.database.addGame(this.Hash,gameHash);
           //console.log(addResult)
           this.Cgame = this.gameManager.addGame(this,gameHash)
           response.data = {message:"Game created",gameHash: this.Cgame.gameHash}
           response.status = 200;
           callback(response);
           return;
        }
        //Si le joueur est propriétaire d'une partie
        this.Cgame = this.gameManager.getGame(result[0]);
        if(this.Cgame == null)
        {
            this.Cgame = this.gameManager.addGame(this.Hash,result[0])
        }
        response.data = {message:"Game found",gameHash: result[0]}
        response.status = 200;
        callback(response);
        return;
    }

    joinGame(request,callback)
    {
        var response = new Response();        
        if(typeof(request.gameHash)=="undefined" || request.gameHash.length != 43)
        {
            response.error = "gameHash is undefined or invalid"
            response.status = 400
            callback(response);
            return;
        }
        var tempGame = this.gameManager.getGame(request.gameHash);
        if(this.canJoin(tempGame,response) == false)
        {
            response.status = 400
            callback(response);
            return;
        }
        this.Cgame = tempGame;
        this.Cgame.join(this)
        response.data = {playerList : this.Cgame.getPlayerList()};       
        callback(response)
    }

    canJoin(game,response)
    {   
        if(typeof(this.Hash)=="undefined" || this.Hash.length != 43)
        {   
            response.error = "The user is not define. Refresh to recreate a player."
            return false
        }      
        if(game == null)
        {
            response.error = "The game doesn't exist."
            return false;
        }
        if(!game.isJoinable())
        {
            response.error = "You can't join this game."
            return false
        }  
        return true;
    }


    
}

class Response
{
    error
    data
    status
}

