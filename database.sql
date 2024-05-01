CREATE DATABASE IF NOT EXISTS brawlnet;

USE brawlnet;

CREATE TABLE IF NOT EXISTS user (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(500) NOT NULL,
    email VARCHAR(255) NOT NUll,
    tel VARCHAR(255) DEFAULT NULL,
    created DATETIME DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rarity (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS gadgets (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    icon VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS starpower (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    icon VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS equipment (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    icon VARCHAR(255) NOT NULL,
    fk_rarity BIGINT(20) NOT NULL,
    CONSTRAINT fk_equipment_rarity FOREIGN KEY (fk_rarity) REFERENCES rarity(id)
);

CREATE TABLE IF NOT EXISTS skins (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS brawler (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    fk_rarity BIGINT(20) NOT NULL,
    fk_skin BIGINT(20) DEFAULT 1,
    CONSTRAINT fk_brawler_rarity FOREIGN KEY (fk_rarity) REFERENCES rarity(id),
    CONSTRAINT fk_brawler_skins FOREIGN KEY (fk_skin) REFERENCES skins(id)
);

CREATE TABLE IF NOT EXISTS brawler_starpower (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    fk_brawler BIGINT(20) NOT NULL,
    fk_starpower BIGINT(20) NOT NULL,
    CONSTRAINT fk_brawler_starpower_brawler FOREIGN KEY (fk_brawler) REFERENCES brawler(id),
    CONSTRAINT fk_brawler_starpower_starpower FOREIGN KEY (fk_starpower) REFERENCES starpower(id)
);

CREATE TABLE IF NOT EXISTS brawler_gadget (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    fk_brawler BIGINT(20) NOT NULL,
    fk_gadget BIGINT(20) NOT NULL,
    CONSTRAINT fk_brawler_gadget_brawler FOREIGN KEY (fk_brawler) REFERENCES brawler(id),
    CONSTRAINT fk_brawler_gadget_gadget FOREIGN KEY (fk_gadget) REFERENCES gadgets(id)
);

CREATE TABLE IF NOT EXISTS brawler_equipment (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    fk_brawler BIGINT(20) NOT NULL,
    fk_equipment BIGINT(20) NOT NULL,
    CONSTRAINT fk_brawler_equipment_brawler FOREIGN KEY (fk_brawler) REFERENCES brawler(id),
    CONSTRAINT fk_brawler_equipment_equipment FOREIGN KEY (fk_equipment) REFERENCES equipment(id)
);

CREATE TABLE IF NOT EXISTS brawler_skins (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    fk_brawler BIGINT(20) NOT NULL,
    fk_skin BIGINT(20) NOT NULL,
    CONSTRAINT fk_brawler_skins_brawler FOREIGN KEY (fk_brawler) REFERENCES brawler(id),
    CONSTRAINT fk_brawler_skins_skins FOREIGN KEY (fk_skin) REFERENCES skins(id)
);
