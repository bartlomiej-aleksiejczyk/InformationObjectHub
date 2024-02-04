package com.example.InformationObjectHub.infoobject;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.BindingResult;
import jakarta.validation.Valid;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class InfoObjectController {
    private final InfoObjectService infoObjectService;

    @GetMapping("/")
    public String index(Model model, @RequestParam(required = false) String tag, Pageable pageable) {
        model.addAttribute("infoObjectsPage", infoObjectService.findAllInfoObjects(tag, pageable));
        model.addAttribute("currentDateTime", DateTimeFormatter.ofPattern("Y-MM-dd HH:mm:ss").format(java.time.LocalDateTime.now()));
        model.addAttribute("infoObjectDto", new InfoObjectDTO());
        model.addAttribute("tag", tag);
        return "infoobjects/django-clone"; // Uses src/main/resources/templates/index.html
    }

    @GetMapping("/all/")
    public String all(Model model, @RequestParam(required = false) String tag, Pageable pageable) {
        // Pagination and optional tag filtering logic here
        Page<InfoObject> infoObjectsPage = infoObjectService.findAllInfoObjects(tag, pageable);
        model.addAttribute("infoObjectsPage", infoObjectsPage);
        return "index"; // points to src/main/resources/templates/index.html
    }
    @GetMapping("/info-object")
    public String showInfoObjectForm(Model model) {
        model.addAttribute("infoObjectDto", new InfoObjectDTO());
        return "infoobjects/info-object-create-update"; // Assuming you have a commentForm.html Thymeleaf template
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

    @GetMapping("/info-object/{id}")
    public String showInfoObject(@PathVariable Long id, Model model) {
        Optional<InfoObject> infoObjectOptional = infoObjectService.findById(id);
        if (infoObjectOptional.isPresent()) {
            model.addAttribute("infoObject", infoObjectOptional.get());
            return "infoobjects/info-object-detail";
        } else {
            // Handle the case where the InfoObject is not found
            return "redirect:/";
        }
    }

    @PostMapping("/info-object/edit/{id}")
    public String updateInfoObject(@PathVariable Long id, @Valid @ModelAttribute("infoObjectDto") InfoObjectDTO infoObjectDto,
                                   BindingResult result, RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "infoobjects/info-object-create-update";
        }
        infoObjectService.updateInfoObject(id, infoObjectDto);
        redirectAttributes.addFlashAttribute("message", "InfoObject updated successfully!");
        return "redirect:/";
    }

    @GetMapping("/info-object/delete/{id}")
    public String deleteInfoObject(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        infoObjectService.removeInfoObject(id);
        redirectAttributes.addFlashAttribute("message", "InfoObject removed successfully!");
        return "redirect:/";
    }
}
