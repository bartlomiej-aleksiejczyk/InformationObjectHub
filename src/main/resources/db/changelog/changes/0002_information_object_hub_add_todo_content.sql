--changeset bartlomiej_aleksiejczyk:0001-alter-table-add-todo-content context:information-object-hub
ALTER TABLE info_objects 
    ADD todo_content VARCHAR(1000000) 
--rollback ALTER TABLE iinfoobject_links DROP CONSTRAINT IF EXISTS FKctydch9p7pea9f2qovwfl9moj;