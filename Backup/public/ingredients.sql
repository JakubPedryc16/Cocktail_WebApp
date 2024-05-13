create table ingredients
(
    ingredient_id    serial
        constraint ingredients_pk
            primary key,
    ingredient_name  varchar(32) not null,
    ingredient_image varchar(32) not null
);

alter table ingredients
    owner to postgres;

