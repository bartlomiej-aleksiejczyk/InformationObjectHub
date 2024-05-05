package com.example.InformationObjectHub.infoobject;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.InformationObjectHub.infoobject.dtos.InfoObjectDTO;
import com.example.InformationObjectHub.infoobject.dtos.InfoObjectResponseDTO;

import java.util.ArrayList;
import java.util.List;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InfoObjectService {
    private final InfoObjectRepository infoObjectRepository;

    @Transactional(readOnly = true)
    public Page<InfoObjectResponseDTO> findAllInfoObjects(String tag, Pageable pageable) {
        if (tag != null && !tag.isEmpty()) {
            return InfoObjectMapper.toDtoPage(infoObjectRepository.findByTag(tag, pageable));
        } else {
            return InfoObjectMapper.toDtoPage(infoObjectRepository.findAll(pageable));
        }
    }

    @Transactional(readOnly = true)
    public Optional<InfoObject> findById(Long id) {
        return infoObjectRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<String> findAllUniqueTags() {
        return infoObjectRepository.findDistinctTags();
    }

    @Transactional
    public InfoObjectResponseDTO saveInfoObject(InfoObjectDTO infoObjectDTO, String authorIp) {
        InfoObject infoObject = new InfoObject();
    
        Optional.ofNullable(infoObjectDTO.getTodoContentList())
            .ifPresent(list -> System.out.println(list));
    
        infoObject.setContent(infoObjectDTO.getContent());
        infoObject.setTopic(infoObjectDTO.getTopic());
        infoObject.setTag(Optional.ofNullable(infoObjectDTO.getTag()).map(String::toUpperCase).orElse(null));
        
        infoObject.setMarkdownContent(Optional.ofNullable(infoObjectDTO.getMarkdownContent()).orElse(null));
        infoObject.setDialogueContent(Optional.ofNullable(infoObjectDTO.getDialogueContent()).orElse(null));
    
        infoObject.setInfoobjectLinks(Optional.ofNullable(infoObjectDTO.getInfoobjectLinks())
                                              .map(ArrayList::new)
                                              .orElseGet(ArrayList::new));
        infoObject.setTodoContentList(Optional.ofNullable(infoObjectDTO.getTodoContentList())
                                              .map(ArrayList::new)
                                              .orElseGet(ArrayList::new));
    
        infoObject.setAuthorIp(authorIp);
    
        return InfoObjectMapper.toDto(infoObjectRepository.save(infoObject));
    }
    
    

    @Transactional
    public InfoObjectResponseDTO updateInfoObject(Long id, InfoObjectDTO infoObjectDTO) {
        Optional<InfoObject> infoObjectOptional = infoObjectRepository.findById(id);
        if (infoObjectOptional.isPresent()) {
            InfoObject existingInfoObject = infoObjectOptional.get();
            existingInfoObject.setContent(infoObjectDTO.getContent());
            existingInfoObject.setTopic(infoObjectDTO.getTopic());
            existingInfoObject.setTag(Optional.ofNullable(infoObjectDTO.getTag())
                    .map(String::toUpperCase).orElse(null));
            return InfoObjectMapper.toDto(infoObjectRepository.save(existingInfoObject));
        } else {
            throw new IllegalArgumentException("InfoObject with id " + id + " not found");
        }
    }

    @Transactional
    public void removeInfoObject(Long id) {
        infoObjectRepository.deleteById(id);
    }
}
