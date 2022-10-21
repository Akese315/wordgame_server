import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

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

    async createConnection(callback)
    {
        this.MysqlObject = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
        console.log("database connected")
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
}