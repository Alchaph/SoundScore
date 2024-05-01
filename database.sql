CREATE DATABASE IF NOT EXISTS sound;

USE sound;

CREATE TABLE IF NOT EXISTS genres (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS artists (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(2000) NOT NULL,
    image VARCHAR(255) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(500) NOT NULL,
    email VARCHAR(255) NOT NUll,
    tel VARCHAR(255) DEFAULT NULL,
    created DATETIME DEFAULT NOW(),
    fk_artist BIGINT(20) DEFAULT NULL,
    CONSTRAINT fk_users_artists FOREIGN KEY (fk_artist) REFERENCES artists(id)
);

CREATE TABLE IF NOT EXISTS songs (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    link VARCHAR(1000) NOT NULL,
    fk_genre BIGINT(20) NOT NULL,
    fk_artist BIGINT(20) NOT NULL,
    CONSTRAINT fk_posts_genre FOREIGN KEY (fk_genre) REFERENCES genres(id),
    CONSTRAINT fk_posts_artist FOREIGN KEY (fk_artist) REFERENCES artists(id)
);

CREATE TABLE IF NOT EXISTS posts (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    likes BIGINT(20) NOT NULL,
    dislikes BIGINT(20) NOT NULL,
    fk_user BIGINT(20) NOT NULL,
    fk_song BIGINT(20) DEFAULT NULL,
    fk_artist BIGINT(20) DEFAULT NULL,
    fk_genre BIGINT(20) DEFAULT NULL,
    CONSTRAINT fk_posts_users FOREIGN KEY (fk_user) REFERENCES users(id),
    CONSTRAINT fk_posts_songs FOREIGN KEY (fk_song) REFERENCES songs(id),
    CONSTRAINT fk_posts_artists FOREIGN KEY (fk_artist) REFERENCES artists(id),
    CONSTRAINT fk_posts_genre FOREIGN KEY (fk_genre) REFERENCES genres(id)
);

CREATE TABLE IF NOT EXISTS comments (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    message VARCHAR(2000) NOT NULL,
    fk_post BIGINT(20) NOT NULL,
    fk_user BIGINT(20) NOT NULL,
    CONSTRAINT fk_comments_posts FOREIGN KEY (fk_post) REFERENCES posts(id),
    CONSTRAINT fk_comments_user FOREIGN KEY (fk_user) REFERENCES users(id)
);
