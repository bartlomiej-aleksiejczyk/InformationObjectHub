package com.example.InformationObjectHub.infoobject;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.format.DateTimeFormatter;

@Controller
@RequiredArgsConstructor
public class InfoObjectController {
    private final InfoObjectService infoObjectService;

    @GetMapping("/infoobject")
    public String index(Model model, @RequestParam(required = false) String tag,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "modifiedAt"));
        model.addAttribute("currentDateTime", DateTimeFormatter.ofPattern("y-MM-dd HH:mm:ss")
                .format(java.time.LocalDateTime.now()));
        model.addAttribute("uniqueTags", infoObjectService.findAllUniqueTags());
        model.addAttribute("infoObjectsPage", infoObjectService.findAllInfoObjects(tag, pageable));
        model.addAttribute("infoObjectDto", new InfoObjectDTO());
        model.addAttribute("tag", tag);
        return "infoobjects/index";
    }

    @PostMapping("/info-object")
    public String postInfoObject(@Valid @ModelAttribute("infoObjectDto") InfoObjectDTO infoObjectDTO,
            BindingResult bindingResult,
            RedirectAttributes redirectAttributes,
            HttpServletRequest request) {
        if (bindingResult.hasErrors()) {
            return "infoobjects/info-object-create-update";
        }

        infoObjectService.saveInfoObject(infoObjectDTO, request.getRemoteAddr());
        redirectAttributes.addFlashAttribute("message", "Comment posted successfully!");
        return "redirect:/";
    }

    @PostMapping("/info-object/{id}")
    public String updateInfoObject(@PathVariable Long id,
            @Valid @ModelAttribute("infoObjectDto") InfoObjectDTO infoObjectDto,
            BindingResult result, RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "infoobjects/info-object-create-update";
        }
        infoObjectService.updateInfoObject(id, infoObjectDto);
        redirectAttributes.addFlashAttribute("message", "InfoObject updated successfully!");
        return "redirect:/";
    }

    @DeleteMapping("/info-object/{id}")
    public ResponseEntity<String> deleteInfoObject(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        infoObjectService.removeInfoObject(id);
        return ResponseEntity.ok().body("InfoObject removed successfully!");
    }
}
