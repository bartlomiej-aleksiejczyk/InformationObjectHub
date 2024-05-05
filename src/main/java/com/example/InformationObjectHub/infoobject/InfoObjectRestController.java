package com.example.InformationObjectHub.infoobject;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.InformationObjectHub.infoobject.dtos.InfoObjectDTO;
import com.example.InformationObjectHub.infoobject.dtos.InfoObjectResponseDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
// TODO: Remove @CrossOrigin annotation
@CrossOrigin
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class InfoObjectRestController {
    Logger logger = LoggerFactory.getLogger(InfoObjectRestController.class);

    private final InfoObjectService infoObjectService;

    @Operation(summary = "Get all info objects", description = "Retrieve a page of info objects optionally filtered by tag")
    @ApiResponse(responseCode = "200", description = "Successful operation", content = @Content(mediaType = "application/json", schema = @Schema(implementation = InfoObjectResponseDTO.class)))
    @GetMapping("/info-object")
    public ResponseEntity<Page<InfoObjectResponseDTO>> getInfoObjects(
            @RequestParam(required = false) String tag,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "modifiedAt"));
        Page<InfoObjectResponseDTO> infoObjects = infoObjectService.findAllInfoObjects(tag, pageRequest);
        return ResponseEntity.ok(infoObjects);
    }

    @Operation(summary = "Get all unique tags", description = "Retrieves a list of all unique tags used in InfoObjects")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved all unique tags", content = @Content(mediaType = "application/json", schema = @Schema(implementation = List.class)))
    @GetMapping("/tags")
    public ResponseEntity<List<String>> getAllUniqueTags() {
        List<String> tags = infoObjectService.findAllUniqueTags();
        return ResponseEntity.ok(tags);
    }

    @Operation(summary = "Create a new info object", description = "Creates a new info object and assigns the IP address of the client")
    @ApiResponse(responseCode = "201", description = "Info object created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = InfoObjectResponseDTO.class)))
    @PostMapping("/info-object")
    public ResponseEntity<InfoObjectResponseDTO> createInfoObject(
            @RequestBody String rawBody,
            HttpServletRequest request) {
                logger.info("Received raw JSON: {}", rawBody);
                try {
                    InfoObjectDTO infoObjectDTO = new ObjectMapper().readValue(rawBody, InfoObjectDTO.class);
                    String clientIpAddress = request.getRemoteAddr();
                    InfoObjectResponseDTO infoObject = infoObjectService.saveInfoObject(infoObjectDTO, clientIpAddress);
                    return ResponseEntity.status(HttpStatus.CREATED).body(infoObject);
                } catch (JsonProcessingException e) {
                    logger.error("JSON parsing error", e);
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
                }
    }

    @Operation(summary = "Update an info object", description = "Updates an existing info object")
    @ApiResponse(responseCode = "200", description = "Info object updated successfully")
    @PutMapping("/info-object/{id}")
    public ResponseEntity<InfoObjectResponseDTO> updateInfoObject(@PathVariable Long id,
            @Valid @RequestBody InfoObjectDTO infoObjectDto) {
        InfoObjectResponseDTO infoObject = infoObjectService.updateInfoObject(id, infoObjectDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(infoObject);
    }

    @Operation(summary = "Delete an info object", description = "Deletes an info object by ID")
    @ApiResponse(responseCode = "204", description = "Info object deleted successfully")
    @DeleteMapping("/info-object/{id}")
    public ResponseEntity<String> deleteInfoObject(@PathVariable Long id) {
        infoObjectService.removeInfoObject(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Info object deleted successfully");

    }
}
