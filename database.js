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
var IS_KANJI_TABLE_EMPTY = "SELECT * FROM kanjis LIMIT 1"
var SELECT_THREE_RANDOM_KANJIS = "SELECT meaning, kanji FROM kanjis WHERE jlpt=? ORDER BY RAND() LIMIT ?"
var INSERT_KANJIS = `INSERT INTO kanjis (kanji,reading_on,reading_kun,meaning,jlpt) VALUES(?,?,?,?,?)`

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

async function createKanji(connection)
{
    return await connection.query(KANJI_TABLE_EXISTS);
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
        insertAllKanjis()
    }        
}

async function insertAllKanjis(connection)
{
    var keys = Object.keys(kanji_jouyou)
    for(var i =0; i < keys.length; i++)
    {
        var reading_on = "";
        var readings_kun = "";
        var meanings = "";
        var jlpt = kanji_jouyou[keys[i]].jlpt_new;
        for(var k = 0; k < kanji_jouyou[keys[i]].readings_on.length;k++)
        {
            if(k>0)
            {
                    reading_on += ", "
            }
            reading_on += kanji_jouyou[keys[i]].readings_on[k];
        }
        for(var k = 0; k < kanji_jouyou[keys[i]].readings_kun.length;k++)
        {                
            if(k>0)
            {
                    readings_kun += ", "
            }
            readings_kun += kanji_jouyou[keys[i]].readings_kun[k];
        }
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
                keys[i],
                reading_on,
                readings_kun,
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
    getPoolConnection((connection)=>
    {
        createKanji(connection)
        isKanjiTableEmpty(connection);
        releaseConnection(connection)
        callback(this);
    });
    
}


