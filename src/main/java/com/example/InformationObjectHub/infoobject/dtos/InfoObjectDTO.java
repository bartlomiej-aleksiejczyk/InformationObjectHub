package com.example.InformationObjectHub.infoobject.dtos;

import java.util.List;

import com.example.InformationObjectHub.infoobject.TodoContent;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InfoObjectDTO {
    String topic;
    String tag;
    String content;
    String markdownContent;
    String dialogueContent;
    List<String> infoobjectLinks;
    List<TodoContent> todoContentList;
}
