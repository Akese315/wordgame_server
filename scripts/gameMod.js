import { getPoolConnection,releaseConnection, getRandomKanjis} from "../database.js";

export class GameMod1
{
    jlptLevel
    cardNumberByRound = 3
    cards = []
    
    createCardsSet(callback, rounds)
    {
        getPoolConnection((connection)=>
        {
            var cardNumber = this.cardNumberByRound*rounds
            this.cards = getRandomKanjis(connection, cardNumber, 5);
            releaseConnection(connection)
            callback();
        })
    }

    getThreeCard(round)
    {
        if(round > this.cards.length || round < this.cards.length)
        {
            return this.cards[round]
        }        
    }
}

export class GameMod2
{
    getThreeRandomCard()
    {

    }
}

export class GameMod3
{
    getThreeRandomCard()
    {

    }
}