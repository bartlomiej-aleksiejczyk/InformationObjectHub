--liquibase formatted sql

--changeset bartlomiej_aleksiejczyk:0001-create-drop-sequence
CREATE SEQUENCE info_objects_seq START WITH 1 INCREMENT BY 50;
--rollback DROP SEQUENCE IF EXISTS info_objects_seq;

--changeset bartlomiej_aleksiejczyk:0002-create-table-iinfoobject-links
CREATE TABLE iinfoobject_links (
    infoobject_id BIGINT NOT NULL,
    infoobject_links VARCHAR(255)
);
--rollback DROP TABLE IF EXISTS iinfoobject_links CASCADE;

--changeset bartlomiej_aleksiejczyk:0003-create-table-info-objects
CREATE TABLE info_objects (
    created_at TIMESTAMP(6) NOT NULL,
    id BIGINT NOT NULL,
    modified_at TIMESTAMP(6),
    tag VARCHAR(150),
    content VARCHAR(1000000),
    dialogue_content VARCHAR(1000000),
    author_ip VARCHAR(255),
    topic VARCHAR(255),
    PRIMARY KEY (id)
);
--rollback DROP TABLE IF EXISTS info_objects CASCADE;

--changeset bartlomiej_aleksiejczyk:0004-alter-table-add-fk-iinfoobject-links
ALTER TABLE iinfoobject_links 
    ADD CONSTRAINT FKctydch9p7pea9f2qovwfl9moj 
    FOREIGN KEY (infoobject_id) 
    REFERENCES info_objects;
--rollback ALTER TABLE iinfoobject_links DROP CONSTRAINT IF EXISTS FKctydch9p7pea9f2qovwfl9moj;
