package com.example.InformationObjectHub.infoobject;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.InformationObjectHub.infoobject.dtos.InfoObjectDTO;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class InfoObjectRestController {

    private final InfoObjectService infoObjectService;

    @GetMapping
    public ResponseEntity<Page<InfoObject>> getInfoObjects(
            @RequestParam(required = false) String tag,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "modifiedAt"));
        Page<InfoObject> infoObjects = infoObjectService.findAllInfoObjects(tag, pageRequest);
        return ResponseEntity.ok(infoObjects);
    }

    @PostMapping
    public ResponseEntity<String> createInfoObject(
            @Valid @RequestBody InfoObjectDTO infoObjectDTO,
            HttpServletRequest request) {
        infoObjectService.saveInfoObject(infoObjectDTO, request.getRemoteAddr());
        return ResponseEntity.status(HttpStatus.CREATED).body("Info object created successfully!");
    }

    @PostMapping("/api/info-object")
    public ResponseEntity<Object> postInfoObject(@Valid @RequestBody InfoObjectDTO infoObjectDTO,
            BindingResult bindingResult,
            HttpServletRequest request) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        String clientIpAddress = request.getRemoteAddr();
        infoObjectService.saveInfoObject(infoObjectDTO, clientIpAddress);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Info object created successfully!");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/info-object/{id}")
    public ResponseEntity<String> deleteInfoObject(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        infoObjectService.removeInfoObject(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/info-object/{id}")
    public ResponseEntity<String> updateInfoObject(@PathVariable Long id,
            @Valid @RequestBody InfoObjectDTO infoObjectDto) {
        infoObjectService.updateInfoObject(id, infoObjectDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}