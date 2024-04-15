package com.example.InformationObjectHub.infoobject;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class InfoObjectRestController {

    private final InfoObjectService infoObjectService;

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
    public String updateInfoObject(@PathVariable Long id,
            @Valid @RequestBody InfoObjectDTO infoObjectDto,
            BindingResult result, RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "infoobjects/info-object-create-update";
        }
        infoObjectService.updateInfoObject(id, infoObjectDto);
        redirectAttributes.addFlashAttribute("message", "InfoObject updated successfully!");
        return "redirect:/";
    }
}