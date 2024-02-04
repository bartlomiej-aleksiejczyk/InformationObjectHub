package com.example.InformationObjectHub.infoobject;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InfoObjectRepository extends JpaRepository<InfoObject, Long> {
    Page<InfoObject> findByTag(String tag, Pageable pageable);
}