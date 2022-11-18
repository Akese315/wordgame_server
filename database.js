import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import kanji_jouyou from './kanji/kanji-data/kanji-jouyou.json'assert { type: 'json' };

dotenv.config();  
var MysqlPoolObject
var INSERT_USER_STATEMENT =`INSERT INTO users (userHash,userName) VALUES(?,?)`;
var INSERT_GAME_STATEMENT =`INSERT INTO games (gameHash,ownerHash) VALUES(?,?)`;
var INNER_JOIN_GAME_USER = "SELECT * FROM GAME INNER JOIN B ON A.key = B.key"
var SELECT_WHERE_GAME = "SELECT * FROM users WHERE gameHash=?"
var SELECT_ALL_GAME = "SELECT * FROM games"
var USER_EXISTS = "SELECT * FROM users WHERE userHash =?"
var IS_USER_OWNER = "SELECT gameHash FROM games WHERE ownerHash=?"    
var KANJI_TABLE_EXISTS = "CREATE TABLE IF NOT EXISTS kanjis (id integer PRIMARY KEY AUTO_INCREMENT, kanji VARCHAR(1) CHARACTER SET utf8 COLLATE utf8_general_ci ,reading_on VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci ,reading_kun VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci ,meaning VARCHAR(255),jlpt integer);"
var READING_KUN_TABLE_EXISTS = "CREATE TABLE IF NOT EXISTS readings_kun (id integer PRIMARY KEY AUTO_INCREMENT,reading_kun VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci);"
var READING_ON_TABLE_EXISTS = "CREATE TABLE IF NOT EXISTS readings_on (id integer PRIMARY KEY AUTO_INCREMENT,reading_on VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci);"
var READING_KUN_TO_KANJI_TABLE_EXISTS = "CREATE TABLE IF NOT EXISTS kanjisToReadingsKun(idKanji integer,idReadingKun integer);"
var READING_ON_TO_KANJI_TABLE_EXISTS = "CREATE TABLE IF NOT EXISTS kanjisToReadingsOn(idKanji integer,idReadingOn integer);"
var IS_KANJI_TABLE_EMPTY = "SELECT * FROM kanjis LIMIT 1"
var IS_READINGS_KUN_TABLE_EMPTY = "SELECT * FROM readings_kun LIMIT 1"
var IS_READINGS_ON_TABLE_EMPTY = "SELECT * FROM readings_on LIMIT 1"
var SELECT_THREE_RANDOM_KANJIS = "SELECT meaning, kanji FROM kanjis WHERE jlpt=? ORDER BY RAND() LIMIT ?"
var IS_READING_KUN_ALREADY_SET = "SELECT reading_kun FROM readings_kun where reading_kun=? limit 1"
var IS_READING_ON_ALREADY_SET = "SELECT reading_on FROM readings_on where reading_on=? limit 1"
var INSERT_KANJIS = `INSERT INTO kanjis (kanji,meaning,jlpt) VALUES(?,?,?)`
var INSERT_READING_ON = `INSERT INTO readings_on (reading_on) VALUES (?)`
var INSERT_READING_KUN = `INSERT INTO readings_kun (reading_kun) VALUES (?)`
var INSERT_KANJI_TO_READING_KUN = `INSERT INTO kanjisToReadingsKun (idKanji,idReadingKun) VALUES (?,?)`
var INSERT_KANJI_TO_READING_ON = `INSERT INTO kanjisToReadingsOn (idKanji,idReadingOn) VALUES (?,?)`
var SELECT_KANJI_WHERE = `SELECT id FROM kanjis where kanji=? limit 1`
var SELECT_READING_ON_WHERE = `SELECT id FROM readings_on where reading_on=? LIMIT 1`
var SELECT_READING_KUN_WHERE = `SELECT id FROM readings_kun WHERE reading_kun=? LIMIT 1 `

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
}


export async function getRandomKanjis(connection, limit, jlpt, callback)
{
    var [rows] = await connection.query(SELECT_THREE_RANDOM_KANJIS,[jlpt,limit])
    callback(rows);
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
    if()
    var keys = Object.keys(kanji_jouyou)
    for(let i = 0; i<keys.length; i++)
    {
        let kanji = keys[i];
        var [kanjiResult] = await connection.query(SELECT_KANJI_WHERE,kanji)
        if(kanjiResult.length == 0)
        {
            console.error("Error on kanji : "+kanji+ " at line : "+i);
            continue;
        }
        let kanji_ID = kanjiResult[0].id;
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

async function insertReadingsKun(connection)
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

async function insertReadingsOn(connection)
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

async function insertAllKanjis(connection)
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
        await releaseConnection(connection);
        var nowEnd = Date.now();
        console.log("database is updated or created in : "+((nowEnd-now)/1000)+"s");
        await callback(this);
    });
    
}


