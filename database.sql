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

CREATE TABLE IF NOT EXISTS kanjis (
    id integer PRIMARY KEY AUTO_INCREMENT,
    kanji VARCHAR(1) CHARACTER SET utf8 COLLATE utf8_general_ci,
    meaning VARCHAR(255),
    jlpt integer
);

CREATE TABLE IF NOT EXISTS readings_on (
    id integer PRIMARY KEY AUTO_INCREMENT,
    reading_on VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci,
);

CREATE TABLE IF NOT EXISTS readings_kun (
    id integer PRIMARY KEY AUTO_INCREMENT,
    reading_kun VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci
);

CREATE TABLE IF NOT EXISTS kanjisToReadingsKun(
    idKanji integer,
    idReadingKun integer
);

CREATE TABLE IF NOT EXISTS kanjisToReadingsOn(
    idKanji integer,
    idReadingOn integer
);

CREATE TABLE IF NOT EXISTS words(
    id integer PRIMARY KEY AUTO_INCREMENT,
    word VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci,
    meaning VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci,
    furigana VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci,
    romaji VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci,
    jlpt integer NOT NULL
);

CREATE TABLE IF NOT EXISTS wordsToKanji(
    idKanji integer,
    idWord integer
);

DROP TABLE readings_on,readings_kun,kanjisToReadingsKun,kanjisToReadingsOn, kanjis;

INSERT INTO games (gameHash, ownerHash) VALUES (100000, 1234);

INSERT INTO users (userHash,userName, gameHash) VALUES (1234, "Axel",100000);

INSERT INTO users (userHash,userName, gameHash) VALUES (2222, "alain",100000);

SELECT * FROM users RIGHT JOIN games ON games.gameHash = users.gameHash WHERE games.gameHash IS NULL;


/*

SELECT W.word
FROM WordsToKanji AS WT
JOIN kanjis AS K ON WT.KanjiID = K.ID
JOIN words AS W ON WT.WordID = W.ID
WHERE K.ID IN (
    SELECT KanjiID
    FROM wordsToKanji
    WHERE WordID = (
        SELECT ID
        FROM Words
        WHERE Word = 'votre_mot'
    )
);

*/