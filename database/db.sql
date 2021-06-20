CREATE DATABASE videoanalytics;

USE videoanalytics;

-- ACCOUNTS TABLE
CREATE TABLE accounts(
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    nick VARCHAR(60) NULL,
    logo VARCHAR(30) DEFAULT NULL,
    PRIMARY KEY (id)
);

-- PROFILES TABLE
CREATE TABLE profiles(
    id INT(11) NOT NULL AUTO_INCREMENT,
    fullname VARCHAR(100) NOT NULL,
    nick VARCHAR(60),
    account_id INT(11) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk__profiles_accounts FOREIGN KEY (account_id) REFERENCES accounts(id)
);

-- GROUPS TABLE
CREATE TABLE groups(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(16) NOT NULL,
    dataset_route VARCHAR(60) NOT NULL,
    account_id INT(11) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk__groups_accounts FOREIGN KEY (account_id) REFERENCES accounts(id)
);

-- CODERS TABLE
CREATE TABLE coders(
    id INT(11) NOT NULL AUTO_INCREMENT,
    coder_img_route VARCHAR(60),
    coder VARCHAR(60),
    profile_id INT(11) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk__coders_profiles FOREIGN KEY (profile_id) REFERENCES profiles(id)
);

-- RELATIONS TABLE - PROFILES AND GROUPS
CREATE TABLE relations(
    id INT(11) NOT NULL AUTO_INCREMENT,
    profile_id INT(11) NOT NULL,
    group_id INT(11) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk__relations_profiles FOREIGN KEY (profile_id) REFERENCES profiles(id),
    CONSTRAINT fk__relations_groups FOREIGN KEY (group_id) REFERENCES groups(id)
);

-- PERMITS TABLE 
CREATE TABLE permits(
    id INT(11) NOT NULL AUTO_INCREMENT,
    account_grant_id INT(11) NOT NULL,
    profile_grant_id INT(11) NOT NULL,
    account_receive_id INT(11) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk__permits_accounts_grant FOREIGN KEY (account_grant_id) REFERENCES accounts(id),
    CONSTRAINT fk__permits_profiles FOREIGN KEY (profile_grant_id) REFERENCES profiles(id),
    CONSTRAINT fk__permits_accounts_receive FOREIGN KEY (account_receive_id) REFERENCES accounts(id)
);


