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
    #launchCallback
    #disconnectCallback
    #readyCallback
    #answerCallback
    #leaveCallback
    #restartCallback
    #updateRulesCallback


    SET_PSEUDO_EVENT= "player:pseudo";
    JOIN_GAME_EVENT= "game:join";
    CREATE_GAME_EVENT= "game:create";
    UPDATE_RULES_EVENT= "game:rules";
    GAME_EVENT = "game:event";
    ANSWER_GAME_EVENT = "game:answer"

    constructor(socket, broadcast)
    {   
        this.#userSocket = socket;
        this.broadcast = broadcast;
        this.#userAdress = socket.handshake.address;
        this.#setEvent();
        this.#connected();
    }

    #setEvent()
    {
        this.#setJoinEvent()
        this.#setGameEvent();
        this.#setCreateEvent()
        this.#setPseudoEvent()
        this.#setAnswerEvent()
        this.#setDisconnectEvent() 
        this.#setUpdateRulesEvent();       
        this.#setLeaveCallback();
    }

    #setJoinEvent()
    {
        this.#userSocket.on(this.JOIN_GAME_EVENT, (data)=>
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

    #setUpdateRulesEvent()
    {
        this.#userSocket.on(this.UPDATE_RULES_EVENT, (data)=>
        {
            if(typeof(data)!="undefined")
            {
                this.#updateRulesCallback(data)
            }           
        });
    }

    #setCreateEvent()
    {
        this.#userSocket.on(this.CREATE_GAME_EVENT, (data)=>
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

    #setGameEvent()
    {
        this.#userSocket.on(this.GAME_EVENT,(data)=>
        {
            if(typeof(data.event)!="undefined" )
            {                
                if(data.event=="launch"){
                    this.#launchCallback();      
                }
                if(data.event=="ready")
                {
                    this.#readyCallback();
                }
                if(data.event=="restart")
                {
                    this.#restartCallback(data.restart); 
                }
                if( data.event=="timeout")
                {
                
                }
                if( data.event=="leave")
                {
                    this.#leaveCallback()
                }
                          
            }
            

        })
    }

    #setAnswerEvent()
    {
        this.#userSocket.on(this.ANSWER_GAME_EVENT,(data)=>
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

    #setPseudoEvent()
    {
        this.#userSocket.on(this.SET_PSEUDO_EVENT, (data)=>
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
    
    setUpdateRulesCallback(callback)
    {
        this.#updateRulesCallback = callback;
    }

    setReadyCallback(callback)
    {
        this.#readyCallback = callback;
    }

    setJoinCallback(callback)
    {
        this.#joinCallback = callback;
    }
    setLaunchCallback(callback)
    {
        this.#launchCallback = callback;
    }
    
    setRestartCallback(callback)
    {
        this.#restartCallback = callback;
    }

    #setLeaveCallback(callback)
    {
        this.#leaveCallback = callback;
    }

    #connected()
    {
        console.log("User connected : "+this.#userAdress)
    }

    clientReconnect(socket)
    {
        console.log("User has reconnected : "+this.#userAdress)
        this.#setSocket(socket);
        this.#setEvent()
    }

    #setSocket(socket)
    {
        this.#userSocket.disconnect(true);
        this.#userSocket = socket;
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

    getUserAdress()
    {
        return  this.#userAdress;
    }

    sendError(error)
    {
        this.#userSocket.emit("error",error)
    }

    sendInfo(message)
    {
        let info = {message: undefined}
        info.message = message;
        this.#userSocket.emit("info", info)
    }

    sendRedirect(redirect)
    {
        let data = redirect;
        this.#userSocket.emit("redirect", data)  
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


