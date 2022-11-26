import kanji_jouyou from '../kanji/kanji-jouyou.json'assert { type: 'json' };
import jlptN5 from '../kanji/vocabulary-jlpt5.json' assert {type : 'json'};
import jlptN4 from '../kanji/vocabulary-jlpt4.json' assert {type : 'json'};
import jlptN3 from '../kanji/vocabulary-jlpt3.json' assert {type : 'json'};
import jlptN2 from '../kanji/vocabulary-jlpt2.json' assert {type : 'json'};
import jlptN1 from '../kanji/vocabulary-jlpt1.json' assert {type : 'json'};

var IS_READING_KUN_ALREADY_SET = "SELECT reading_kun FROM readings_kun where reading_kun=? limit 1"
var IS_READING_ON_ALREADY_SET = "SELECT reading_on FROM readings_on where reading_on=? limit 1"
var INSERT_KANJIS = `INSERT INTO kanjis (kanji,meaning,jlpt) VALUES(?,?,?)`
var INSERT_READING_ON = `INSERT INTO readings_on (reading_on) VALUES (?)`
var INSERT_READING_KUN = `INSERT INTO readings_kun (reading_kun) VALUES (?)`
var INSERT_WORD = `INSERT INTO words (word,meaning,furigana,romaji,jlpt) VALUES (?,?,?,?,?)`;
var INSERT_WORD_TO_KANJI = `INSERT INTO wordsToKanji (idKanji,idWord) VALUES (?,?)`
var INSERT_KANJI_TO_READING_KUN = `INSERT INTO kanjisToReadingsKun (idKanji,idReadingKun) VALUES (?,?)`
var INSERT_KANJI_TO_READING_ON = `INSERT INTO kanjisToReadingsOn (idKanji,idReadingOn) VALUES (?,?)`
var SELECT_KANJI_WHERE = `SELECT id FROM kanjis where kanji=? limit 1`
var SELECT_READING_ON_WHERE = `SELECT id FROM readings_on where reading_on=? LIMIT 1`
var SELECT_READING_KUN_WHERE = `SELECT id FROM readings_kun WHERE reading_kun=? LIMIT 1 `
var SELECT_WORD_WHERE = "SELECT id FROM words where word=? limit 1"
var SELECT_WORDID = "SELECT id, word FROM words;"

export async function insertReadingsToKanjis(connection,isKanjiToReadingKunEmpty,isKanjiToReadingOnEmpty){
    var keys = Object.keys(kanji_jouyou)
    for(let i = 0; i<keys.length; i++)
    {
        let kanji = keys[i];
        var [kanjiResult] = await connection.query(SELECT_KANJI_WHERE,kanji)
        if(kanjiResult.length == 0)
        {
            console.error("Error on kanji : "+kanji+ " at line : "+i);
            return;
        }
        let kanji_ID = kanjiResult[0].id;
        if(isKanjiToReadingKunEmpty)
        {
            var readings_kun_length = kanji_jouyou[keys[i]].readings_kun.length;
            for(let k = 0; k < readings_kun_length;k++)
            {
                var reading_kun_ID;
                var reading_kun = kanji_jouyou[keys[i]].readings_kun[k];
                var [readingKunResult]= await connection.query(SELECT_READING_KUN_WHERE,reading_kun)
                if(readingKunResult.length == 0)
                {
                    console.error("Error when selecting reading kun : "+reading_kun+"on line : "+i)
                    console.error("input "+readingKunResult)
                    continue;
                }
                reading_kun_ID = readingKunResult[0].id;
                await connection.query(INSERT_KANJI_TO_READING_KUN,[kanji_ID, reading_kun_ID])
            }
        }
        if(isKanjiToReadingOnEmpty)
        {
            var readings_on_length = kanji_jouyou[keys[i]].readings_on.length;
            for(let k = 0; k < readings_on_length; k++)
            {
                var reading_on_ID;
                var reading_on = kanji_jouyou[keys[i]].readings_on[k];
                var [readingOnResult]= await connection.query(SELECT_READING_ON_WHERE,reading_on)
                if(readingOnResult.length == 0)
                {
                    console.error("Error when selecting reading on : "+reading_on+"on line : "+i)
                    continue;
                }
                reading_on_ID = readingOnResult[0].id;
                await connection.query(INSERT_KANJI_TO_READING_ON,[kanji_ID, reading_on_ID])
            }  
        }        
    }   
}

export async function insertReadingsKun(connection)
{
    var keys = Object.keys(kanji_jouyou)
    for(let i = 0; i<keys.length; i++)
    {
        let length =  kanji_jouyou[keys[i]].readings_kun.length;
        for(let k = 0; k < length;k++)
        {
            let [rows] = await connection.query(IS_READING_KUN_ALREADY_SET, [kanji_jouyou[keys[i]].readings_kun[k]]);
            if(rows.length == 0)
            {
                let reading_kun = kanji_jouyou[keys[i]].readings_kun[k]               
                await connection.query(INSERT_READING_KUN, reading_kun);
            }            
        }
    }
}

export async function insertReadingsOn(connection)
{
    var keys = Object.keys(kanji_jouyou)
    for(var i = 0; i<keys.length; i++)
    {
        let length =  kanji_jouyou[keys[i]].readings_on.length
        for(var k = 0; k < length;k++)
        {
            var reading_on = kanji_jouyou[keys[i]].readings_on[k];
            var [rows] = await connection.query(IS_READING_ON_ALREADY_SET, reading_on);
            if(rows.length == 0)
            {
                await connection.query(INSERT_READING_ON, reading_on);
            }            
        }
    }
}

export async function insertAllWords(connection)
{
    for(var index = 0; index< jlptN5.length; index ++)
    {
        var object = [
            jlptN5[index].word,
            jlptN5[index].meaning,
            jlptN5[index].furigana,
            jlptN5[index].romaji,
            jlptN5[index].level
        ]
        await connection.query(INSERT_WORD,object);
    }
    for(var index = 0; index< jlptN4.length; index ++)
    {
        var object = [
            jlptN4[index].word,
            jlptN4[index].meaning,
            jlptN4[index].furigana,
            jlptN4[index].romaji,
            jlptN4[index].level
        ]
        await connection.query(INSERT_WORD,object);
    }
    for(var index = 0; index< jlptN3.length; index ++)
    {
        var object = [
            jlptN3[index].word,
            jlptN3[index].meaning,
            jlptN3[index].furigana,
            jlptN3[index].romaji,
            jlptN3[index].level
        ]
        await connection.query(INSERT_WORD,object);
    }
    for(var index = 0; index< jlptN2.length; index ++)
    {
        var object = [
            jlptN2[index].word,
            jlptN2[index].meaning,
            jlptN2[index].furigana,
            jlptN2[index].romaji,
            jlptN2[index].level
        ]
        await connection.query(INSERT_WORD,object);
    }
    for(var index = 0; index< jlptN1.length; index ++)
    {
        var object = [
            jlptN1[index].word,
            jlptN1[index].meaning,
            jlptN1[index].furigana,
            jlptN1[index].romaji,
            jlptN1[index].level
        ]
        await connection.query(INSERT_WORD,object);
    }
}

export async function insertAllKanjiToWord(connection)
{
    var [words] = await connection.query(SELECT_WORDID);
    for(var index = 0; index < words.length; index++)
    {
        const wordArray = words[index].word.split("")
        for(var Windex = 0; Windex < wordArray.length; Windex++)
        {
            var [id] = await connection.query(SELECT_KANJI_WHERE,wordArray[Windex])
            if(id.length == 0)continue;
            await connection.query(INSERT_WORD_TO_KANJI,[id[0].id,words[index].id]);
        }   
    }
}

export async function insertAllKanjis(connection)
{
    var keys = Object.keys(kanji_jouyou)
    for(var i =0; i < keys.length; i++)
    {        
        var meanings = "";
        var kanji = keys[i]
        var jlpt = kanji_jouyou[keys[i]].jlpt_new;

        for(var k = 0; k<kanji_jouyou[keys[i]].meanings.length; k++)
        {
            if(k>0)
            {
                    meanings += ", "
            }
            meanings += kanji_jouyou[keys[i]].meanings[k];
        }
        await connection.query(INSERT_KANJIS,
            [
                kanji,
                meanings,
                jlpt                    
            ])
    }
    
}