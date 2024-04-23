package com.example.InformationObjectHub.infoobject;

import org.springframework.data.domain.Page;

import com.example.InformationObjectHub.infoobject.dtos.InfoObjectDTO;
import com.example.InformationObjectHub.infoobject.dtos.InfoObjectResponseDTO;

public class InfoObjectMapper {

    public static InfoObjectResponseDTO toDto(InfoObject entity) {
        if (entity == null) {
            return null;
        }
        return new InfoObjectResponseDTO(
                entity.getId(),
                entity.getTopic(),
                entity.getTag(),
                entity.getContent(),
                entity.getInfoobjectLinks(),
                entity.getTodoContentList(),
                entity.getAuthorIp(),
                entity.getCreatedAt(),
                entity.getModifiedAt());
    }

    public static Page<InfoObjectResponseDTO> toDtoPage(Page<InfoObject> entityPage) {
        return entityPage.map(InfoObjectMapper::toDto);
    }
}
