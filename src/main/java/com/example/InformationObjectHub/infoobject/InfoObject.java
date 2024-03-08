package com.example.InformationObjectHub.infoobject;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import com.example.InformationObjectHub.common.BaseEntity;

@Entity
@Table(name = "info_objects")
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InfoObject extends BaseEntity {
    private String authorIp;
    private String topic;
    @Column(length = 150)
    private String tag;
    @Column(length = 100000)
    private String content;
}
