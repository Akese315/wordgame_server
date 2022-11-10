import { getPoolConnection,releaseConnection, getRandomKanjis} from "../database.js";

export class GameMod1
{
    jlptLevel
    cardNumberByRound = 3
    cards = []
    rightAnswers = []
    rounds = 1;
    
    
    createCardsSet(callback, rounds)
    {
        this.rounds = rounds;
        getPoolConnection((connection)=>
        {
            var cardNumber = this.cardNumberByRound*this.rounds
            getRandomKanjis(connection, cardNumber, 5,(rows)=>
            {
                this.generateAnswers()
                this.cards = rows;
                releaseConnection(connection)
                callback();
            });            
        })
    }

    generateAnswers()
    {
        for(let i = 0; i < this.rounds; i++)
        {
            this.rightAnswers.push(3*i+Math.floor(Math.random() * 3));
        }
    }

    getThreeCard(round)
    {
        if(round > this.cards.length || round < this.cards.length)
        {
            return [this.cards[3*round].kanji,this.cards[3*round+1].kanji,this.cards[3*round+2].kanji ]
        }        
    }

    getAssignment(round)
    {
        return "Trouver le kanji : 「"+this.cards[this.rightAnswers[round]].meaning+"」."
    }

    checkAnswer(answer, round)
    {
        if(answer == this.cards[this.rightAnswers[round]].kanji)
        {
            return true;
        }
        else
        {
            return false;
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