--changeset bartlomiej_aleksiejczyk:0001-alter-table-add-markdown-content context:information-object-hub
ALTER TABLE info_objects 
    ADD markdown_content VARCHAR(1000000) 
--rollback ALTER TABLE markdown_content;