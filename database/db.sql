CREATE DATABASE database_links;

USE database_links;

-- PROFILES TABLE
CREATE TABLE profiles (
    id int(11) NOT NULL AUTO_INCREMENT,
    type varchar(30) NOT NULL,
    PRIMARY KEY id
);

-- USERS TABLE
CREATE TABLE users(
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    nick VARCHAR(60) NULL,
    logo VARCHAR(30) DEFAULT NULL,
    profile_type INT(11) NOT NULL,
    parent_prof INT(11) NOT NULL,
    PRIMARY KEY id
);
