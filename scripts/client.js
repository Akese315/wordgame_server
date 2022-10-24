export default class Client
{

    gameManager
    #Csocket
    database
    Hash = ""
    Cname =""
    Cgame
    point
    isOwner;
    hashLetterNumber = 43
    ClientAdress;
    

    constructor(socket)
    {
        this.#Csocket = socket;
        this.point = 0
        this.ClientAdress = this.#Csocket.handshake.address;
        this.setDisconnectEvent();
        console.log("a new client is connected : " + this.ClientAdress)
    }

    getHandShake()
    {
        return this.#Csocket.handshake;
    }

    getQuery()
    {
        this.#Csocket.handshake.query;
    }
    
    setDisconnectEvent()
    {
        this.#Csocket.on("disconnect", (reason)=>
        {
            console.log(this.ClientAdress+" s'est déconnecté car : "+reason)
        });
    }

    setPlayerHash(hash)
    {
        this.Hash = hash;
    }

    setClientPseudo(pseudo)
    {
        this.Cname = pseudo;
    }

    getPlayerHash()
    {
        return this.Hash;
    }



}


