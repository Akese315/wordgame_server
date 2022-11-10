import {isValidHash, Response} from "./utils.js"
export default class Client
{

    #userSocket
    #userHash = ""
    #userAdress = ""
    #HASH_LENGTH_ALLOWED = 43
    #pseudoCallback
    #createCallback
    #joinCallback
    #startCallback
    #disconnectCallback
    #readyCallback
    #answerCallback

    constructor(socket, broadcast)
    {   
        this.#userSocket = socket;
        this.broadcast = broadcast;
        this.#userAdress = socket.handshake.address;
        this.#setJoinEvent()
        this.#setCreateEvent()
        this.#setPseudoEvent()
        this.#setStartEvent()
        this.#setReadyEvent()
        this.#setAnswerEvent()
        this.#setDisconnectEvent()
       
        this.#connected();
    }

    #setJoinEvent()
    {
        this.#userSocket.on("join", (data)=>
        {   
            if(this.checkHash(data.userHash) || this.checkHash(data.gameHash))
            {
                this.#joinCallback(data);
            }else
            {
                this.sendError("Non valid userHash")
            }            
        });
    }

    #setCreateEvent()
    {
        this.#userSocket.on("create", (data)=>
        {
            if(this.checkHash(data.userHash))
            {
                this.#createCallback();
            }
            else
            {
                this.sendError("Non valid userHash")
            } 
        });
    }

    #setAnswerEvent()
    {
        this.#userSocket.on("answer",(data)=>
        {            
            if(typeof(data.answer) != "undefined" || data.answer != "")
            {
                this.#answerCallback(data.answer); 
            }else
            {
                this.sendError("Non valid answer")
            }                       
        })
    }

    #setReadyEvent()
    {
        this.#userSocket.on("ready",(data)=>
        {            
            this.#readyCallback(data.isReady);            
        })
    }

    #setPseudoEvent()
    {
        this.#userSocket.on("setPseudo", (data)=>
        {
            if(this.checkHash(data.userHash))
            {
                this.#pseudoCallback(data);
            }else
            {
                 this.sendError("Non valid userHash")
            } 
        });
    }

    #setStartEvent()
    {
        this.#userSocket.on("start",(data)=>
        {
            if(this.checkHash(data.userHash))
            {
                this.#startCallback(data);
            }else
            {
                 this.sendError("Non valid userHash")
            }
        })
    }


    #setDisconnectEvent()
    {
        this.#userSocket.on("disconnect",()=>
        {            
            this.#disconnectCallback()
        })
    }
    
    setDisconnectCallback(callback)
    {
        this.#disconnectCallback = callback;
    } 

    setPseudoCallback(callback)
    {
        this.#pseudoCallback = callback;
    } 

    setAnswerCallback(callback)
    {
        this.#answerCallback = callback;
    } 
    
    setCreateCallback(callback)
    {
        this.#createCallback = callback;
    }

    setReadyCallback(callback)
    {
        this.#readyCallback = callback;
    }

    setJoinCallback(callback)
    {
        this.#joinCallback = callback;
    }
    setStartCallback(callback)
    {
        this.#startCallback = callback;
    }

    #connected()
    {
        console.log("User connected : "+this.#userAdress)
    }

    getHandShake()
    {
        return this.#userSocket.handshake;
    }

    getQuery()
    {
        this.#userSocket.handshake.query;
    }

    setUserHash(hash)
    {
        this.#userHash = hash;
    }    

    getUserHash()
    {
        return this.#userHash;
    }

    sendError(error)
    {
        this.#userSocket.emit("error",error)
    }

    sendResponse(eventName,dataObject)
    {
        this.#userSocket.emit(eventName,dataObject)
    }

    checkHash(userHash)
    {
        if(!isValidHash(userHash))
        {
            return false
        }
        //console.log(this.#userHash);
        if(userHash != this.#userHash)
        {
            return false;
        }
        return true;
    }



}


