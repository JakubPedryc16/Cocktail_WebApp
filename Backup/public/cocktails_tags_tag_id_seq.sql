create sequence cocktails_tags_tag_id_seq
    as integer;

alter sequence cocktails_tags_tag_id_seq owner to postgres;

alter sequence cocktails_tags_tag_id_seq owned by tags.tag_id;

