package com.example.InformationObjectHub.infoobject;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.FieldNameConstants;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InfoObjectDTO {
    @NotBlank(message = "Content cannot be empty")
    String content;
    String topic;
    String tag;
}
