import mysql from 'mysql2/promise'
import {
    insertReadingsToKanjis,
    insertReadingsKun,
    insertReadingsOn,
    insertAllKanjis,
    insertAllWords,
    insertAllKanjiToWord
} from './scripts/database_tools.js'
import dotenv from 'dotenv'


dotenv.config();  
var MysqlPoolObject
const INSERT_USER_STATEMENT =`INSERT INTO users (userHash,userName) VALUES(?,?)`;
const INSERT_GAME_STATEMENT =`INSERT INTO games (gameHash,ownerHash) VALUES(?,?)`;
const INNER_JOIN_GAME_USER = "SELECT * FROM GAME INNER JOIN B ON A.key = B.key"
const SELECT_WHERE_GAME = "SELECT * FROM users WHERE gameHash=?"
const SELECT_ALL_GAME = "SELECT * FROM games"
const USER_EXISTS = "SELECT * FROM users WHERE userHash =?"
const IS_USER_OWNER = "SELECT gameHash FROM games WHERE ownerHash=?"    
const KANJI_TABLE_EXISTS = "CREATE TABLE IF NOT EXISTS kanjis (id integer PRIMARY KEY AUTO_INCREMENT, kanji VARCHAR(1) CHARACTER SET utf8 COLLATE utf8_general_ci ,reading_on VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci ,reading_kun VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci ,meaning VARCHAR(255),jlpt integer);"
const READING_KUN_TABLE_EXISTS = "CREATE TABLE IF NOT EXISTS readings_kun (id integer PRIMARY KEY AUTO_INCREMENT,reading_kun VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci);"
const WORD_TABLE_EXISTS = "CREATE TABLE IF NOT EXISTS words(id integer PRIMARY KEY AUTO_INCREMENT,word VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci,meaning VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci, furigana VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci, romaji VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci, jlpt integer NOT NULL);"
const READING_ON_TABLE_EXISTS = "CREATE TABLE IF NOT EXISTS readings_on (id integer PRIMARY KEY AUTO_INCREMENT,reading_on VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci);"
const READING_KUN_TO_KANJI_TABLE_EXISTS = "CREATE TABLE IF NOT EXISTS kanjisToReadingsKun(idKanji integer,idReadingKun integer);"
const READING_ON_TO_KANJI_TABLE_EXISTS = "CREATE TABLE IF NOT EXISTS kanjisToReadingsOn(idKanji integer,idReadingOn integer);"
const WORD_TO_KANJI_EXISTS = "CREATE TABLE IF NOT EXISTS wordsToKanji(idKanji integer,idWord integer);"
const IS_KANJI_TABLE_EMPTY = "SELECT * FROM kanjis LIMIT 1"
const IS_READINGS_KUN_TABLE_EMPTY = "SELECT * FROM readings_kun LIMIT 1"
const IS_READINGS_ON_TABLE_EMPTY = "SELECT * FROM readings_on LIMIT 1"
const IS_KANJI_TO_READING_KUN_EMPTY = "SELECT * FROM kanjisToReadingsKun limit 1"
const IS_KANJI_TO_READING_ON_EMPTY = "SELECT * FROM kanjisToReadingsOn limit 1"
const IS_WORDS_EMPTY = "SELECT * FROM words limit 1"
const IS_WORD_TO_KANJI_EMPTY = "SELECT * FROM wordsToKanji limit 1"
const SELECT_RANDOM_WORD = "SELECT * FROM words WHERE jlpt=? ORDER BY RAND() LIMIT ?"
const SELECT_RANDOM_KANJIS = "SELECT * FROM kanjis WHERE jlpt=? ORDER BY RAND() LIMIT ?;"
const SELECT_WORDS_RELATED_TO_KANJISID = "select * from wordsToKanji inner join words ON wordsToKanji.idWord = words.id where idKanji=? LIMIT ?;"
const SELECT_WORDS_RELATED_TO_KANJIS = "select W.meaning, W.word from wordsToKanji WtK JOIN (select id from kanjis where jlpt=? ORDER BY RAND() LIMIT 1)  K ON WtK.idKanji = K.id JOIN words W ON WtK.idWord = W.id LIMIT ?;"


const total_kanji_rows = 2136;

async function addUser(name,hash, connection)
{
    var result = isExists(hash)
    if(result != false)
    {
        return result;
    }

    var [row]= connection.query(INSERT_USER_STATEMENT,[hash,name]);
    return row;
}

async function isExists(userHash, connection)
{
    var [result] =  await connection.query(USER_EXISTS,[userHash]);        
    if(result.length == 0)
    {
        return false;
    }
    return result[0];
}

async function isExistsAndHasGame(userHash)
{
    if(isExists(userHash) ==false)
    {
        return false;
    }
    var [row] = await connection.query(IS_USER_OWNER,[userHash])  
    if(row.length ==0)
    {
        return true;
    }
    else
    {
        return row[0];
    }        
}

async function addGame(ownerHash,hash,connection)
{
    var row = await connection.query(INSERT_GAME_STATEMENT,[hash,ownerHash]);
    return row;
}

async function getAllUserOf(game,connection)
{
    return await connection.query(SELECT_WHERE_GAME,[game])
}

async function getAllGames(connection)
{
    return await connection.query(SELECT_ALL_GAME)
}

async function createAlltable(connection)
{
    await connection.query(KANJI_TABLE_EXISTS);
    await connection.query(READING_KUN_TABLE_EXISTS);
    await connection.query(READING_ON_TABLE_EXISTS);
    await connection.query(READING_KUN_TO_KANJI_TABLE_EXISTS);
    await connection.query(READING_ON_TO_KANJI_TABLE_EXISTS);
    await connection.query(WORD_TABLE_EXISTS);
    await connection.query(WORD_TO_KANJI_EXISTS);
}


export async function getRandomKanjis(connection, limit, jlpt)
{
    var rowslen = 0;
    var myarray = new Array()
    var delta = limit - rowslen;
    while(delta != 0)
    {
        var [rows] = await connection.query(SELECT_RANDOM_KANJIS,[jlpt,delta])
        myarray = myarray.concat(rows)
        delta = limit - myarray.length;
    }
    return myarray;
}

export async function getRandomWords(connection, limit,jlpt )
{
    var [rows] = await connection.query(SELECT_RANDOM_WORD,[jlpt, limit]);
    return rows;
}

export async function getRandomWordsWithKanjis(connection, limit, jlpt)
{
    var array = new Array()
    for(var i  = 0; i < limit; i++)
    {
        var [rows] = await connection.query(SELECT_WORDS_RELATED_TO_KANJIS, [jlpt, 3,])
        if (rows.length != 3 )
        {
            i--;
        }
        else
        {
            array.push(rows)
        }
    }
    return array;
}

export async function getWordsRelatedToKanjisID(connection,id,limit)
{
    var [rows] = await connection.query(SELECT_WORDS_RELATED_TO_KANJISID, [id,limit])
    if(rows.length < 2)
    {
        return null;
    }
    else
    {
        return rows;
    }
}

async function isKanjiTableEmpty(connection)
{
    
    var [rows] = await connection.query(IS_KANJI_TABLE_EMPTY);
    if(rows.length ==0)
    {
        await insertAllKanjis(connection)
    }        
}

async function isKanjiToReadingEmpty(connection)
{
    var isKanjiToReadingKunEmpty = true;
    var isKanjiToReadingOnEmpty = true;
    var [rowsReadingOn] = await connection.query(IS_KANJI_TO_READING_ON_EMPTY);    
    if(rowsReadingOn.length !=0)
    {
        isKanjiToReadingKunEmpty = false;
    }
    var [rowsReadingKun] = await connection.query(IS_KANJI_TO_READING_KUN_EMPTY);    
    if(rowsReadingKun.length !=0)
    {
        isKanjiToReadingOnEmpty = false;
    }
    if(isKanjiToReadingKunEmpty||isKanjiToReadingOnEmpty)
    {
        insertReadingsToKanjis(connection,isKanjiToReadingKunEmpty,isKanjiToReadingOnEmpty)
    } 
}

async function isWordToKanjiEmpty(connection)
{
    var [rowsWords] = await connection.query(IS_WORD_TO_KANJI_EMPTY);  
    if(rowsWords.length == 0)
    {
        await insertAllKanjiToWord(connection);
    }
}

async function isWordEmpty(connection)
{
    var [rowsWords] = await connection.query(IS_WORDS_EMPTY);  
    if(rowsWords.length == 0)
    {
       await insertAllWords(connection);
    }
}




async function isReadingTableEmpty(connection)
{
    
    var [rows] = await connection.query(IS_READINGS_KUN_TABLE_EMPTY);
    if(rows.length ==0)
    {
        await insertReadingsKun(connection);
    }        
    var [rows] = await connection.query(IS_READINGS_ON_TABLE_EMPTY);
    if(rows.length == 0)
    {
        await insertReadingsOn(connection);
    }
}



export function releaseConnection(connection)
{
    connection.release();
}

export function getPoolConnection(callback)
{
    MysqlPoolObject.getConnection().then((connection)=>
    {
        callback(connection)
    }).catch((error)=>
    {
        console.error(error)
    })
}

export async function createPoolConnection(callback)
{   
    console.log(process.env.MYSQL_PASSWORD)
    console.log(process.env.MYSQL_USER)
    MysqlPoolObject = mysql.createPool(
        {
                connectionLimit : 100,
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE
        }
    )

    console.log("database connected")
    getPoolConnection(async(connection)=>
    {
        
        var now = Date.now();
        await createAlltable(connection);
        await isKanjiTableEmpty(connection);
        await isReadingTableEmpty(connection);
        await isKanjiToReadingEmpty(connection);
        await isWordEmpty(connection);
        await isWordToKanjiEmpty(connection);
        await releaseConnection(connection);
        var nowEnd = Date.now();
        console.log("database is updated or created in : "+((nowEnd-now)/1000)+"s");
        await callback(this);
    });
    
}


