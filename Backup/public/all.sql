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

create table cocktails_ingredients
(
    cocktail_id       integer     not null
        constraint cocktails_ingredients_cocktails_cocktail_id_fk
            references cocktails,
    ingredient_id     integer     not null
        constraint cocktails_ingredients_ingredients_ingredient_id_fk
            references ingredients,
    ingredient_amount varchar(32) not null
);

alter table cocktails_ingredients
    owner to postgres;

create table cocktails_tags
(
    cocktail_id integer not null
        constraint cocktails_tags_cocktails_cocktail_id_fk
            references cocktails,
    tag_id      integer not null
        constraint cocktails_tags_tags_tag_id_fk
            references tags
);

alter table cocktails_tags
    owner to postgres;

create sequence cocktails_tags_tag_id_seq
    as integer;

alter sequence cocktails_tags_tag_id_seq owner to postgres;

alter sequence cocktails_tags_tag_id_seq owned by tags.tag_id;

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

create table tags
(
    tag_id   integer default nextval('cocktails_tags_tag_id_seq'::regclass) not null
        constraint tags_pk
            primary key,
    tag_name varchar(32)                                                    not null
);

alter table tags
    owner to postgres;

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

create table usersdetails
(
    id           serial
        primary key,
    user_name    varchar(32) not null,
    user_surname varchar(32) not null
);

alter table usersdetails
    owner to postgres;

