package com.example.InformationObjectHub.infoobject;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

import com.example.InformationObjectHub.common.BaseEntity;

@Entity
@Table(name = "info_objects")
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InfoObject extends BaseEntity {
    String authorIp;
    String topic;
    @Column(length = 150)
    String tag;
    @Column(length = 1000000)
    String content;
    @Column(length = 1000000)
    String dialogueContent;
    @ElementCollection
    @CollectionTable(name = "iinfoobject_links", joinColumns = @JoinColumn(name = "infoobject_id"))
    List<String> infoobjectLinks = new ArrayList<>();
    @Column(length = 1000000)
    String todoContent;
}
