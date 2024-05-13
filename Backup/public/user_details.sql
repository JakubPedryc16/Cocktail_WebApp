create table user_details
(
    user_details_id serial
        constraint user_details_pk
            primary key,
    user_name       varchar(32) not null,
    user_surname    varchar(32) not null
);

alter table user_details
    owner to postgres;

