package com.example.InformationObjectHub.infoobject;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.FieldNameConstants;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InfoObjectDTO {
    @NotNull(message = "Content cannot be empty")
    @NotEmpty(message = "Content cannot be empty")
    @NotBlank(message = "Content cannot be empty")
    String content;
    String topic;
    String tag;
}
