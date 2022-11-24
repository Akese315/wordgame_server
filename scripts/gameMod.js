import { getPoolConnection,releaseConnection, getRandomKanjis,getRandomWords,getWordsRelatedToKanjisID} from "../database.js";


function mixCards(list)
{
    return list.sort(()=>Math.random())
}

function copyArray(array1,array2)
{
    array2.forEach(element => {
        array1.push(element);
    });
}

class GameMod
{
    #DEFAULT_ROUND = 1;
    #MAX_JLPT_LEVEL = 5
    #MIN_JLPT_LEVEL = 1
    #MAX_ROUND = 60
    #MIN_ROUND = 1
    #DEFAULT_JLPT_LEVEL = 5;
    #jlptLevel
    #rounds

    constructor(jlpt, rounds)
    {       
        if(rounds< this.#MIN_ROUND || rounds > this.#MAX_ROUND)
        {
            this.#rounds = this.#DEFAULT_ROUND;
        }else
        {
            this.#rounds = rounds;
        }
        if(jlpt< this.#MIN_JLPT_LEVEL || jlpt > this.#MAX_JLPT_LEVEL)
        {
            this.#jlptLevel = this.#DEFAULT_JLPT_LEVEL;
        }else
        {
            this.#jlptLevel = jlpt;
        }        
    }

    getRounds()
    {
        return this.#rounds;
    }

    getJlptLevel()
    {
        return this.#jlptLevel;
    }
}


export class GameMod1 extends GameMod
{
    CARD_BY_ROUND = 3
    cards = []
    rightAnswers = []
    
    constructor(jlpt, rounds)
    {
       super(jlpt,rounds)
    }
    
    createCardsSet(callback)
    {
        getPoolConnection(async(connection)=>
        {
            let cardNumber = this.CARD_BY_ROUND*this.getRounds();
            this.cards = await getRandomKanjis(connection, cardNumber, this.getJlptLevel());            
            this.generateAnswers()
            releaseConnection(connection)
            callback();                      
        })
    }

    generateAnswers()
    {
        for(let i = 0; i < this.getRounds(); i++)
        {
            this.rightAnswers.push(3*i+Math.floor(Math.random() * 3));
        }
    }

    getCardSet(round)
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
        if(round >= this.getRounds())
        {
            return false;
        }
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

export class GameMod2 extends GameMod
{
    
    CARDS_BY_ROUND = 6;
    RIGHT_CARDS_BY_ROUND = 3;   
    rightAnswers = []
    assignment =[]
    cards = []

    constructor(jlpt, rounds)
    {       
        super(jlpt,rounds)        
    }

    createCardsSet(callback)
    {
        getPoolConnection(async(connection)=>
        {
            await this.setCards(connection)
            await releaseConnection(connection);
            await callback();
        });
    }

    async setCards(connection)
    {
        var rows = await getRandomKanjis(connection,this.getRounds(),this.getJlptLevel());
        this.assignment = rows;
        for(var index = 0; index < rows.length; index++)
        {
            var rightWords = [];
            var randomWords = [];
            var cardsRemaining = 0;
            rightWords = await getWordsRelatedToKanjisID(connection,rows[index].id, this.RIGHT_CARDS_BY_ROUND);
            cardsRemaining = this.CARDS_BY_ROUND - rightWords.length;
            if(cardsRemaining > 0)
            {
                randomWords = await getRandomWords(connection, cardsRemaining, this.getJlptLevel());
            }
            this.rightAnswers = rightWords;
            copyArray(this.cards,rightWords)
            copyArray(this.cards,randomWords)
            mixCards(this.cards);            
        }
    }

    getCardSet(round)
    {
        var cardSet = []
        for(let index = 0; index < 6;index++)
        {
            cardSet.push(this.cards[round*6 + index].romaji)
        }
        return cardSet;
    }

    getAssignment(round)
    {
        return "Trouver les mots ayant le kanji : 「"+this.assignment[round].kanji+"」."
    }
}

export class GameMod3 extends GameMod
{

    constructor(jlpt,rounds)
    {
        super(jlpt, rounds)
    }
    getThreeRandomCard()
    {

    }
}