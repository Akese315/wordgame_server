import { GameMod1,GameMod2,GameMod3 } from './gameMod.js';
import { playerManager } from '../Manager.js';

export default class Game
{
    #gameOwner
    #gameHash;
    playerNumber = 0
    NumberPlayerReady = 0
    
    #playerList;
    #deconnectedPlayer
    #started = false;
    #hasEnded = false;
    #canJoin = false;
    #inLobby = true;
    #gameMod = undefined
    #rules   


    constructor(gameHash)
    {
        this.#gameHash = gameHash;
        this.#playerList = new Map();
        this.#deconnectedPlayer = new Map();
        this.#rules = new Rules();
    }

    broadCast(event, response,except)
    {
        for(let playerHash of this.#playerList.keys())
        {
            if(except == playerHash)continue;

            let player = this.getPlayer(playerHash);
            if(typeof(player) == "undefined")
            {
                console.error("player undefined")
            }
            player.sendResponse(event,response)
        }
    }

    redirectEveryone(where, message)
    {
        for(let playerHash of this.#playerList.keys())
        {
            let player = this.getPlayer(playerHash)
            player.sendRedirect(where);
            player.sendInfo(message);            
        }
    }

    setOwner(playerHash,pseudo,icon)
    {
        this.#gameOwner = playerHash;
        var playerProps = new PlayerProperty();
        playerProps.pseudo = pseudo;
        playerProps.point = 0;
        playerProps.owner = true;
        playerProps.hasFinished = false;
        playerProps.currentRound = 0;
        playerProps.icon = icon;
        this.#playerList.set(playerHash, playerProps);
        this.playerNumber += 1
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

    join(playerHash, pseudo,icon)
    {        
        var playerProps = new PlayerProperty();
        playerProps.pseudo = pseudo;
        playerProps.point = 0;
        playerProps.owner = false;
        playerProps.hasFinished = false;
        playerProps.currentRound = 0;
        playerProps.icon = icon;
        this.#playerList.set(playerHash,playerProps);
        this.playerNumber += 1
        this.alterPlayerList();
    }

    launch(playerHash)
    {
        this.NumberPlayerReady = 0;
        if(!this.isOwner(playerHash))
        {   
            return "you are not allowed to launch"
        }
         
        this.#gameMod = this.setGameMod(this.#rules.gameMod,this.#rules.jlptLevel,this.#rules.rounds);
        if(typeof(this.#gameMod) =="undefined")
        {
            return "Error no gameMod fit : "+ this.#rules.gameMod;
        }
        this.#gameMod.createCardsSet(()=>
        {
            this.redirectEveryone("game");
        });
    }

    start()
    {
        
        this.#started = true;
        var cardSet = this.#gameMod.getCardSet(0);
        var assignment = this.#gameMod.getAssignment(0);
        let response = new GameResponse();
        response.round = {cards : cardSet ,assignment :assignment, round : 0}     
        this.broadCast("game:event",{event: "start"});     
        this.broadCast("game:round",response);              
    }

    reLaunch()
    {
        this.#started = false;
        for(let playerHash of this.#playerList.keys())
        {
            let player = this.#playerList.get(playerHash)
            player.point = 0;
        }
        let FormattedList = this.getPlayerList();  
        this.#gameMod.createCardsSet(()=>
        {
            this.broadCast("playerList", {playerList : FormattedList,redirect : "game" })
        });        
    }

    setPlayerReady()
    {  
        this.NumberPlayerReady +=1;
        if(this.NumberPlayerReady == this.playerNumber)
        {
            this.start();
        }                
    }

    checkAnswer(answer, playerHash)
    {
        let player = this.#playerList.get(playerHash);
        if(player.hasFinished)
        {
            return;
        }
        if(this.#gameMod.checkAnswer(answer,player.currentRound))
        {
            player.point +=100;            
            player.currentRound +=1;
            this.#playerList.set(playerHash, player)
            let FormattedList = this.getPlayerList()
            this.broadCast("game:playerList", {playerList : FormattedList})
            return true;
        }else
        {
            player.currentRound +=1;
            return false;
        }
       
    }

    nextRound(userHash)
    {
        let round = this.#playerList.get(userHash).currentRound;
        var cardSet = this.#gameMod.getCardSet(round);
        var assignment = this.#gameMod.getAssignment(round);
        let response = new GameResponse();
        response.round = {cards : cardSet ,assignment :assignment, round : round}
        return response;
    }

    testRules(rules)
    {
        if(
           typeof(rules.jlptLevel) == "undefined" 
            || typeof(rules.jlptLevel) != "number" 
            || rules.jlptLevel <0 
            || rules.jlptLevel >5)
        {
            return "The rule : jlpt isn't correct";
        }
        if(typeof(rules.gameMod) == "undefined"||typeof(rules.gameMod) != "string")
        {
            return "The rule : gameMod isn't correct";
        }
        if(typeof(rules.rounds) == "undefined"
            || typeof(rules.rounds) != "number" 
            || rules.rounds <0 
            || rules.rounds >60)
        {
            return "The rule : rounds isn't correct";
        }
        if(typeof(rules.timeout) == "undefined" 
            || typeof(rules.timeout) != "number" 
            || rules.timeout <0 
            || rules.timeout >60)
        {
            return "The rule : timeout isn't correct";
        }

        this.#rules.jlptLevel = rules.jlptLevel;
        this.#rules.rounds = rules.rounds;
        this.#rules.gameMod = rules.gameMod;
        this.#rules.timeout = rules.timeout;     

    }

    finishGame(playerHash)
    {
        let object = this.#playerList.get(playerHash);
        object.hasFinished = true;
        this.#playerList.set(playerHash, object)

        let response = new GameResponse();
        response.playerList = this.getPlayerList();
        response.hasEnded = this.#hasEnded;     
        this.broadCast("game:playerList", response)      
        
        if(this.hasEveryoneFinished())
        {
            //quand tout les joueurs ont fini
            this.#hasEnded = true;
            let response = new GameResponse();
            response.rankingList = this.getPlayerPseudo();
            //envoie à tout les joueurs le rankinglist
            this.broadCast("game:rankingList",response)
        }               
    }

    hasEveryoneFinished()
    {
        for(let player of this.#playerList.values())
        {
            if(!player.hasFinished)
            {
                return false;
            }
        }
        return true;
    }

    hasPlayerFinished(userHash)
    {
        let player = this.#playerList.get(userHash)
        if(player.currentRound == this.#rules.rounds)
        {
            this.finishGame(userHash)
            return true;
        }
        return false;
    }

    setGameMod(gameMod, rounds, jlpt)
    {
        var gameModObject;
        switch(gameMod)
        {
            case "gameMod1":
                gameModObject = new GameMod1(rounds,jlpt);
                break;
            case "gameMod2":
                gameModObject = new GameMod2(rounds,jlpt);
                break;
            case "gameMod3":
                gameModObject = new GameMod3(rounds,jlpt);
                break;
            default:
                gameModObject = undefined;
        }
        return gameModObject
    }

    canReconnect(userHash)
    {
        let has = this.#deconnectedPlayer.has(userHash)
        if(!has)
        {
            return false;
        }
        return true;
    }

    updateRules(userHash, rules)
    {
        if(!this.isOwner(userHash))
        {
            return "you are not allowed to change rules";
        }

        var error = this.testRules(rules)
        if(typeof(error) != "undefined")
        {
            return error;
        }

        this.broadCast("game:rules",this.#rules);

    }

    reconnect(userHash, pseudo)
    {
        if(this.#started)
        {
            if(!this.canReconnect(userHash))
            {
                return false;
            }
            this.#playerList.set(userHash,this.#deconnectedPlayer.get(userHash));
            this.#deconnectedPlayer.delete(userHash);
            this.playerNumber += 1
            this.alterPlayerList();
            return true;
        }
        else
        {
            this.join(userHash, pseudo);
            return true;
        }     
       
    }

    isOwner(userHash)
    {
        if(userHash == this.#gameOwner)
        {
            return true;
        }else
        {
            false
        }
    }

    leave(userHash)
    {
        if(this.#started)
        {
            this.#deconnectedPlayer.set(userHash,this.#playerList.get(userHash));
        }
        this.#playerList.delete(userHash)
        this.playerNumber -=1;
        this.alterPlayerList();
    }

    getGameHash()
    {
        return this.#gameHash;
    }

    choseNewOwner()
    {
        this.setOwner(this.#playerList[0]);
    }

    getOwnerHash()
    {
        return this.#gameOwner;
    }

    getTotalRound()
    {
        return this.#rules.rounds;
    }

    getPlayerList()
    {
        var playerListFormatted = [];
        for(let playerHash of this.#playerList.keys())
        {
            let player = this.#playerList.get(playerHash)
            playerListFormatted.push({
                pseudo : player.pseudo, 
                point : player.point,
                hasFinished : player.hasFinished,
                icon : player.icon
            })
        }
        console.log()
        return playerListFormatted;
    }

    getPlayerPseudo()
    {
        let playerPseudoList = []
        for(let playerHash of this.#playerList.keys())
        {           
            let player = this.#playerList.get(playerHash)
            playerPseudoList.push(player.pseudo);
        }
        return playerPseudoList;
    }

    alterPlayerList()
    {
        var FormattedList = this.getPlayerList();
        let response = new GameResponse()
        response.playerList = FormattedList;
        this.broadCast("game:playerList",response)
    }

    getPlayer(playerHash)
    {
            return playerManager.getPlayer(playerHash)
    }

    getGameStatus()
    {
        return {
            hasEnded : this.#hasEnded,
            hasStart : this.#started,
            playerList : this.getPlayerList()
         }
    }

    hasStarted()
    {
        return this.started;
    }
}

class GameResponse
{
    playerList;
    round;
    inLobby;
    hasEnded;
    gameMod;
    rankingList;
    redirect;
}

class PlayerProperty
{
    pseudo;
    point;
    hasFinished;
    owner;
    currentRound;
    icon;
}

class Rules
{
    rounds = 1;
    gameMod = "none";
    timeout = 10;
    jlptLevel = 5;
}