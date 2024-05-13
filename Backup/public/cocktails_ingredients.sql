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

