CREATE DATABASE netflix;
USE netflix;
CREATE TABLE movies (
idMovies INT auto_increment primary key not null unique,
title varchar(45) not null, 
gender varchar(45) not null,
image varchar(1000) not null, 
category varchar(45) not null,
year date
);

CREATE TABLE users(
idUser INT auto_increment primary key not null unique,
user varchar(45) not null unique,
password varchar(45) not null,
name varchar(45) not null,
email varchar(45) not null unique,
plan_details varchar(45) not null
);

CREATE TABLE actors (
idActor INT auto_increment primary key not null unique,
name varchar(45) not null, 
lastname varchar(45) not null, 
country varchar(45) not null, 
birthday date
);

USE netflix;

CREATE TABLE actors (
idActor INT auto_increment primary key not null unique,
name varchar(45) not null, 
lastname varchar(45) not null, 
country varchar(45) not null, 
birthday date
);

INSERT INTO movies (title, gender, image, category, year) VALUES ('Pulp Fiction', 'Crimen', 'https://pics.filmaffinity.com/pulp_fiction-210382116-large.jpg', 'Top 10', '1994-01-01');
INSERT INTO movies (title, gender, image, category, year) VALUES ('La vita è bella', 'Comedia', 'https://pics.filmaffinity.com/la_vita_e_bella-646167341-mmed.jpg', 'Top 10', '1996-01-01' ), ('Forrest Gump', 'Comedia', 'https://pics.filmaffinity.com/forrest_gump-212765827-mmed.jpg', 'Top 10', '1994-01-01');

USE netflix;

INSERT INTO actors (name, lastname, country, birthday) VALUES ('Tom', 'Hanks', 'Estados Unidos', '1956-06-09'), ('Roberto', 'Benigni', 'Italia', '1952-10-27'), ('John', 'Travolta', 'Estados Unidos', '1954-02-18');