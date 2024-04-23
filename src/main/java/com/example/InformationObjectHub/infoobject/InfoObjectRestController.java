package com.example.InformationObjectHub.infoobject;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.InformationObjectHub.infoobject.dtos.InfoObjectDTO;
import com.example.InformationObjectHub.infoobject.dtos.InfoObjectResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class InfoObjectRestController {

    private final InfoObjectService infoObjectService;

    @Operation(summary = "Get all info objects", description = "Retrieve a page of info objects optionally filtered by tag")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = @Content(mediaType = "application/json", schema = @Schema(implementation = InfoObjectResponseDTO.class)))
    @GetMapping
    public ResponseEntity<Page<InfoObjectResponseDTO>> getInfoObjects(
            @RequestParam(required = false) String tag,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "modifiedAt"));
        Page<InfoObjectResponseDTO> infoObjects = infoObjectService.findAllInfoObjects(tag, pageRequest);
        return ResponseEntity.ok(infoObjects);
    }

    @Operation(summary = "Create a new info object", description = "Creates a new info object and assigns the IP address of the client")
    @ApiResponse(responseCode = "201", description = "Info object created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = InfoObjectResponseDTO.class)))
    @PostMapping
    public ResponseEntity<String> createInfoObject(
            @Valid @RequestBody InfoObjectDTO infoObjectDTO,
            HttpServletRequest request) {
        String clientIpAddress = request.getRemoteAddr();
        infoObjectService.saveInfoObject(infoObjectDTO, clientIpAddress);
        return ResponseEntity.status(HttpStatus.CREATED).body("Info object created successfully!");
    }

    @Operation(summary = "Update an info object", description = "Updates an existing info object")
    @ApiResponse(responseCode = "200", description = "Info object updated successfully")
    @PutMapping("/info-object/{id}")
    public ResponseEntity<String> updateInfoObject(@PathVariable Long id,
            @Valid @RequestBody InfoObjectDTO infoObjectDto) {
        infoObjectService.updateInfoObject(id, infoObjectDto);
        return new ResponseEntity<>("Info object updated successfully", HttpStatus.OK);
    }

    @Operation(summary = "Delete an info object", description = "Deletes an info object by ID")
    @ApiResponse(responseCode = "204", description = "Info object deleted successfully")
    @DeleteMapping("/info-object/{id}")
    public ResponseEntity<String> deleteInfoObject(@PathVariable Long id) {
        infoObjectService.removeInfoObject(id);
        return new ResponseEntity<>("Info object deleted successfully", HttpStatus.NO_CONTENT);
    }
}
