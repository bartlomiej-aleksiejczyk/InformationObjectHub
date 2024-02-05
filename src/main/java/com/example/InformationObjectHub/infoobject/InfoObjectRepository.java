package com.example.InformationObjectHub.infoobject;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InfoObjectRepository extends JpaRepository<InfoObject, Long> {
    Page<InfoObject> findByTag(String tag, Pageable pageable);
    @Query("SELECT DISTINCT i.tag FROM InfoObject i WHERE i.tag IS NOT NULL AND i.tag <> ''")
    List<String> findDistinctTags();
}