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

