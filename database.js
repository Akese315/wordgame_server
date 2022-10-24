import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import kanji_jouyou from './kanji/kanji-data/kanji-jouyou.json'assert { type: 'json' };

dotenv.config();  
export default class Database 
{
    MysqlObject
    INSERT_USER_STATEMENT =`INSERT INTO users (userHash,userName) VALUES(?,?)`;
    INSERT_GAME_STATEMENT =`INSERT INTO games (gameHash,ownerHash) VALUES(?,?)`;
    INNER_JOIN_GAME_USER = "SELECT * FROM GAME INNER JOIN B ON A.key = B.key"
    SELECT_WHERE_GAME = "SELECT * FROM users WHERE gameHash=?"
    SELECT_ALL_GAME = "SELECT * FROM games"
    USER_EXISTS = "SELECT * FROM users WHERE userHash =?"
    IS_USER_OWNER = "SELECT gameHash FROM games WHERE ownerHash=?"    
    KANJI_TABLE_EXISTS = "CREATE TABLE IF NOT EXISTS kanjis (id integer PRIMARY KEY AUTO_INCREMENT, kanji VARCHAR(1) CHARACTER SET utf8 COLLATE utf8_general_ci ,reading_on VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci ,reading_kun VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci ,meaning VARCHAR(255),jlpt integer);"
    IS_KANJI_TABLE_EMPTY = "SELECT * FROM kanjis LIMIT 1"
    INSERT_KANJIS = `INSERT INTO kanjis (kanji,reading_on,reading_kun,meaning,jlpt) VALUES(?,?,?,?,?)`

    async createConnection(callback)
    {
        this.MysqlObject = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
        console.log("database connected")
        this.createKanji()
        this.isKanjiTableEmpty();
        callback(this);
    }

    async addUser(name,hash)
    {
        var result = this.isExists(hash)
        if(result != false)
        {
            return result;
        }

        var [row]= this.MysqlObject.query(this.INSERT_USER_STATEMENT,[hash,name]);
        return row;
    }

    async isExists(userHash)
    {
        var [result] =  await this.MysqlObject.query(this.USER_EXISTS,[userHash]);        
        if(result.length == 0)
        {
            return false;
        }
        return result[0];
    }

    async isExistsAndHasGame(userHash)
    {
        if(this.isExists(userHash) ==false)
        {
            return false;
        }
        var [row] = await this.MysqlObject.query(this.IS_USER_OWNER,[userHash])  
        if(row.length ==0)
        {
            return true;
        }
        else
        {
            return row[0];
        }
        
    }

    async addGame(ownerHash,hash)
    {
        var row = await this.MysqlObject.query(this.INSERT_GAME_STATEMENT,[hash,ownerHash]);
        return row;
    }

    async getAllUserOf(game)
    {
        return await this.MysqlObject.query(this.SELECT_WHERE_GAME,[game])
    }

    async getAllGames()
    {
        return await this.MysqlObject.query(this.SELECT_ALL_GAME)
    }

    async createKanji()
    {
        return await this.MysqlObject.query(this.KANJI_TABLE_EXISTS)
    }

    async isKanjiTableEmpty()
    {
        var [rows] = await this.MysqlObject.query(this.IS_KANJI_TABLE_EMPTY);
        //console.log(rows)
        if(rows.length ==0)
        {
            this.insertAllKanjis()
        }
        
    }

    async insertAllKanjis()
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
            await this.MysqlObject.query(this.INSERT_KANJIS,
                [
                    keys[i],
                    reading_on,
                    readings_kun,
                    meanings,
                    jlpt                    
                ])
        }
    }
}