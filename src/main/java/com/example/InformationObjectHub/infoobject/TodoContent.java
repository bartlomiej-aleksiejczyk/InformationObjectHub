package com.example.InformationObjectHub.infoobject;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TodoContent {
    String content;
    Long id;
    Boolean isDone;
}
