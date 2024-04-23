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
import org.springframework.web.bind.annotation.*;
import com.example.InformationObjectHub.infoobject.dtos.InfoObjectDTO;
import com.example.InformationObjectHub.infoobject.dtos.InfoObjectResponseDTO;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class InfoObjectRestController {

    private final InfoObjectService infoObjectService;

    @GetMapping
    public ResponseEntity<Page<InfoObjectResponseDTO>> getInfoObjects(
            @RequestParam(required = false) String tag,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "modifiedAt"));

        Page<InfoObjectResponseDTO> infoObjects = InfoObjectMapper
                .toDtoPage(infoObjectService.findAllInfoObjects(tag, pageRequest));
        return ResponseEntity.ok(infoObjects);
    }

    @PostMapping
    public ResponseEntity<String> createInfoObject(
            @Valid @RequestBody InfoObjectDTO infoObjectDTO,
            HttpServletRequest request) {
        String clientIpAddress = request.getRemoteAddr();
        infoObjectService.saveInfoObject(infoObjectDTO, clientIpAddress);
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
    public ResponseEntity<String> deleteInfoObject(@PathVariable Long id) {
        infoObjectService.removeInfoObject(id);
        return new ResponseEntity<>("Info object deleted successfully", HttpStatus.NO_CONTENT);
    }

    @PutMapping("/info-object/{id}")
    public ResponseEntity<String> updateInfoObject(@PathVariable Long id,
            @Valid @RequestBody InfoObjectDTO infoObjectDto) {
        infoObjectService.updateInfoObject(id, infoObjectDto);
        return new ResponseEntity<>("Info object updated successfully", HttpStatus.OK);
    }
}
