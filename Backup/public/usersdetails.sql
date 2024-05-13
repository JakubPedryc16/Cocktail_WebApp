create table usersdetails
(
    id           serial
        primary key,
    user_name    varchar(32) not null,
    user_surname varchar(32) not null
);

alter table usersdetails
    owner to postgres;

