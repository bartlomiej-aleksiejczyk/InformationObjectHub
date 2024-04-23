package com.example.InformationObjectHub.infoobject.dtos;

import java.time.LocalDateTime;
import java.util.List;

import com.example.InformationObjectHub.infoobject.TodoContent;

public record InfoObjectResponseDTO(
        Long id,
        String topic,
        String tag,
        String content,
        List<String> infoobjectLinks,
        List<TodoContent> todoContentList,
        String authorIp,
        LocalDateTime createdAt,
        LocalDateTime modifiedAt) {
    public InfoObjectResponseDTO {
        if (id == null) {
            throw new IllegalArgumentException("Id cannot be null");
        }
    }
}
