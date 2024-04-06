package com.example.InformationObjectHub.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CommonController {

    @GetMapping("/")
    public String index() {
        return "redirect:/infoobject";

    }
}