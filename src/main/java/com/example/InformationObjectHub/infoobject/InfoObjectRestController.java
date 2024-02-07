package com.example.InformationObjectHub.infoobject;

import jakarta.validation.Valid;

import com.example.InformationObjectHub.infoobject.InfoObjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.validation.BindingResult;
import java.util.HashMap;
import java.util.Map;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class InfoObjectRestController {

    private final InfoObjectService infoObjectService;
    @PostMapping("/api/info-object")
    public ResponseEntity<Object> postInfoObject(@Valid @RequestBody InfoObjectDTO infoObjectDTO,
                                                 BindingResult bindingResult,
                                                 HttpServletRequest request) {
        System.out.println("test");
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage()));
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        System.out.println("test2");

        String clientIpAddress = getClientIp(request);
        infoObjectService.saveInfoObject(infoObjectDTO, clientIpAddress); // Assuming saveInfoObject accepts client IP address as an argument
        Map<String, String> response = new HashMap<>();
        response.put("message", "Info object created successfully!");
        return ResponseEntity.ok(response);
    }

    private String getClientIp(HttpServletRequest request) {
        String remoteAddr = "";

        if (request != null) {
            remoteAddr = request.getHeader("X-FORWARDED-FOR");
            if (remoteAddr == null || "".equals(remoteAddr)) {
                remoteAddr = request.getRemoteAddr();
            }
        }

        return remoteAddr;
    }
}