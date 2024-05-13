create table users
(
    user_id         serial
        constraint users_pk
            primary key,
    user_details_id integer     not null
        constraint users_user_details_user_details_id_fk
            references user_details,
    user_email      varchar(64) not null
);

alter table users
    owner to postgres;

