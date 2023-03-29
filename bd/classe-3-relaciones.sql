USE netflix;

CREATE table rel_movies_users(
id INT auto_increment primary key not null ,
fkUsers int,
fkMovies int ,
foreign key (fkUsers) references users (idUser),
foreign key (fkMovies) references movies (idMovies)
);

insert into rel_movies_users (fkUsers, fkMovies) values (1, 1), (1, 2);
select * from rel_movies_users;
insert into rel_movies_users (fkUsers, fkMovies) values (3, 2);

CREATE table rel_movies_actors(
id INT auto_increment primary key not null ,
fkActors int,
fkMovies int ,
foreign key (fkActors) references actors (idActor),
foreign key (fkMovies) references movies (idMovies)
);

insert into rel_movies_actors (fkActors, fkMovies) values (1, 3), (3, 1), (2, 2);