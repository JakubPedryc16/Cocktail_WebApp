create table tags
(
    tag_id   integer default nextval('cocktails_tags_tag_id_seq'::regclass) not null
        constraint tags_pk
            primary key,
    tag_name varchar(32)                                                    not null
);

alter table tags
    owner to postgres;

