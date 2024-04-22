--changeset bartlomiej_aleksiejczyk:0001-alter-table-add-todo-content context:information-object-hub
ALTER TABLE info_objects 
    ADD todo_content VARCHAR(1000000) 
--rollback ALTER TABLE todo_content;