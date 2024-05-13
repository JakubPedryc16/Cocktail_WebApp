create table cocktails
(
    cocktail_id    serial
        constraint cocktails_pk
            primary key,
    user_id        integer     not null
        constraint cocktails_users_user_id_fk
            references users,
    cocktail_name  varchar(32) not null,
    cocktail_image varchar(32) not null
);

alter table cocktails
    owner to postgres;

