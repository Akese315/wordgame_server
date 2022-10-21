CREATE DATABASE IF NOT EXISTS wordgame;

USE wordgame;

CREATE TABLE users (
    id integer PRIMARY KEY AUTO_INCREMENT,
    userHash VARCHAR(43),
    userName VARCHAR(10),
    gameHash VARCHAR(43),
    createdAt DATETIME NOT NULL DEFAULT NOW()
);

CREATE TABLE games (
    id integer PRIMARY KEY AUTO_INCREMENT,
    gameHash VARCHAR(43),
    ownerHash VARCHAR(43),
    createdAt DATETIME NOT NULL DEFAULT NOW()
);

INSERT INTO games (gameHash, ownerHash) VALUES (100000, 1234);

INSERT INTO users (userHash,userName, gameHash) VALUES (1234, "Axel",100000);

INSERT INTO users (userHash,userName, gameHash) VALUES (1111, "nina",100000);

INSERT INTO users (userHash,userName, gameHash) VALUES (2222, "alain",100000);

SELECT * FROM users RIGHT JOIN games ON games.gameHash = users.gameHash WHERE games.gameHash IS NULL;