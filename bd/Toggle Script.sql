SELECT * FROM movies;

SELECT title, gender, year FROM movies WHERE year > 1990;

SELECT title, category FROM movies WHERE category LIKE '%Top 10%';

UPDATE movies SET year = 1997 WHERE idMovies = 2;

SELECT * FROM actors;

SELECT name, lastname, birthday FROM actors WHERE birthday BETWEEN '1950-01-01' AND '1960-12-31';

SELECT name, lastname, country FROM actors WHERE country IN ('Estados Unidos');

SELECT user, name, plan_details FROM users WHERE plan_details = 'Standard';

DELETE FROM users WHERE name LIKE 'M%'; 

ALTER TABLE `netflix`.`actors` 
ADD COLUMN `image` VARCHAR(1000) NULL AFTER `birthday`;
