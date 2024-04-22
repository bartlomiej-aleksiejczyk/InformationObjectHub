package com.example.InformationObjectHub.infoobject.dtos;

import lombok.*;
import lombok.experimental.FieldDefaults;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InfoObjectDTO {
    String content;
    String topic;
    String tag;

}
