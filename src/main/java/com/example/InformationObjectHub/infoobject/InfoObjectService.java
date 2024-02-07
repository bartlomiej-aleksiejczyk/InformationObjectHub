package com.example.InformationObjectHub.infoobject;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InfoObjectService {
    private final InfoObjectRepository infoObjectRepository;

    @Transactional(readOnly = true)
    public Page<InfoObject> findAllInfoObjects(String tag, Pageable pageable) {
        if (tag != null && !tag.isEmpty()) {
            return infoObjectRepository.findByTag(tag, pageable);
        } else {
            return infoObjectRepository.findAll(pageable);
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
    public void saveInfoObject(InfoObjectDTO infoObjectDTO, String authorIp) {
        InfoObject infoObject = new InfoObject();
        infoObject.setContent(infoObjectDTO.getContent());
        infoObject.setTopic(infoObjectDTO.getTopic());
        infoObject.setTag(Optional.ofNullable(infoObjectDTO.getTag())
                .map(String::toUpperCase).orElse(null));
        infoObject.setAuthorIp(authorIp);
        infoObjectRepository.save(infoObject);
    }

    @Transactional
    public void updateInfoObject(Long id, InfoObjectDTO infoObjectDTO) {
        Optional<InfoObject> infoObjectOptional = infoObjectRepository.findById(id);
        if (infoObjectOptional.isPresent()) {
            InfoObject existingInfoObject = infoObjectOptional.get();
            existingInfoObject.setContent(infoObjectDTO.getContent());
            existingInfoObject.setTopic(infoObjectDTO.getTopic());
            existingInfoObject.setTag(Optional.ofNullable(infoObjectDTO.getTag())
                    .map(String::toUpperCase).orElse(null));
            // No need to set authorIp for updates
            infoObjectRepository.save(existingInfoObject);
        } else {
            throw new IllegalArgumentException("InfoObject with id " + id + " not found");
        }
    }

    @Transactional
    public void removeInfoObject(Long id) {
        infoObjectRepository.deleteById(id);
    }
}

