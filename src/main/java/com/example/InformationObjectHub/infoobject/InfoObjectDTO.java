package com.example.InformationObjectHub.infoobject;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InfoObjectDTO {
    @Size(min = 2, message = "Bajo jajo")
    @NotBlank(message = "Content cannot be empty")
    String content;
    @NotBlank(message = "Content cannot be empty")
    String topic;
    String tag;
}
