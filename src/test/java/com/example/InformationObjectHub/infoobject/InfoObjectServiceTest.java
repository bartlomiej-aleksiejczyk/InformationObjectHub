package com.example.InformationObjectHub.infoobject;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.example.InformationObjectHub.infoobject.dtos.InfoObjectDTO;
import com.example.InformationObjectHub.infoobject.dtos.InfoObjectResponseDTO;

class InfoObjectServiceTest {

    @Mock
    private InfoObjectRepository infoObjectRepository;

    @InjectMocks
    private InfoObjectService infoObjectService;

    private MockedStatic<InfoObjectMapper> mockedInfoObjectMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockedInfoObjectMapper = Mockito.mockStatic(InfoObjectMapper.class);
    }

    @AfterEach
    public void tearDown() {
        mockedInfoObjectMapper.close();
    }

    @Test
    void testFindAllInfoObjectsWithTag() {
        Pageable pageable = Pageable.unpaged();
        InfoObject infoObject = new InfoObject();
        InfoObjectResponseDTO dto = new InfoObjectResponseDTO(1L, "topic", "tag", "content", null, null, "127.0.0.1",
                LocalDateTime.now(), LocalDateTime.now());
        Page<InfoObject> entityPage = new PageImpl<>(Arrays.asList(infoObject));
        Page<InfoObjectResponseDTO> dtoPage = new PageImpl<>(Arrays.asList(dto));

        when(infoObjectRepository.findByTag("testTag", pageable)).thenReturn(entityPage);
        mockedInfoObjectMapper.when(() -> InfoObjectMapper.toDtoPage(entityPage)).thenReturn(dtoPage);

        Page<InfoObjectResponseDTO> result = infoObjectService.findAllInfoObjects("testTag", pageable);
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(infoObjectRepository).findByTag("testTag", pageable);
        mockedInfoObjectMapper.verify(() -> InfoObjectMapper.toDtoPage(entityPage));
    }

    @Test
    void testFindAllInfoObjectsNoTag() {
        Pageable pageable = Pageable.unpaged();
        InfoObject infoObject = new InfoObject();
        InfoObjectResponseDTO dto = new InfoObjectResponseDTO(1L, "topic", "tag", "content", null, null, "127.0.0.1",
                LocalDateTime.now(), LocalDateTime.now());
        Page<InfoObject> entityPage = new PageImpl<>(Arrays.asList(infoObject));
        Page<InfoObjectResponseDTO> dtoPage = new PageImpl<>(Arrays.asList(dto));

        when(infoObjectRepository.findAll(pageable)).thenReturn(entityPage);
        mockedInfoObjectMapper.when(() -> InfoObjectMapper.toDtoPage(entityPage)).thenReturn(dtoPage);

        Page<InfoObjectResponseDTO> result = infoObjectService.findAllInfoObjects(null, pageable);
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(infoObjectRepository).findAll(pageable);
        mockedInfoObjectMapper.verify(() -> InfoObjectMapper.toDtoPage(entityPage));
    }

    @Test
    void testFindByIdFound() {
        Long id = 1L;
        Optional<InfoObject> expected = Optional.of(new InfoObject());
        when(infoObjectRepository.findById(id)).thenReturn(expected);

        Optional<InfoObject> result = infoObjectService.findById(id);
        assertTrue(result.isPresent());
        verify(infoObjectRepository).findById(id);
    }

    @Test
    void testFindByIdNotFound() {
        Long id = 1L;
        when(infoObjectRepository.findById(id)).thenReturn(Optional.empty());

        Optional<InfoObject> result = infoObjectService.findById(id);
        assertFalse(result.isPresent());
        verify(infoObjectRepository).findById(id);
    }

    @Test
    void testSaveInfoObject() {
        InfoObjectDTO dto = new InfoObjectDTO("Topic", "Tag", "Content", "Markdown", "Dialogue", null, null);
        String authorIp = "192.168.21.37";
        InfoObject savedInfoObject = new InfoObject();
        when(infoObjectRepository.save(any(InfoObject.class))).thenReturn(savedInfoObject);

        infoObjectService.saveInfoObject(dto, authorIp);

        verify(infoObjectRepository).save(any(InfoObject.class));
    }

    @Test
    void testUpdateInfoObjectFound() {
        InfoObjectDTO dto = new InfoObjectDTO("Topic", "Tag2", "Content", "Markdown", "Dialogue", null, null);
        Long id = 1L;
        InfoObject existingInfoObject = new InfoObject();
        when(infoObjectRepository.findById(id)).thenReturn(Optional.of(existingInfoObject));
        when(infoObjectRepository.save(any(InfoObject.class))).thenReturn(existingInfoObject);

        infoObjectService.updateInfoObject(id, dto);

        verify(infoObjectRepository).save(existingInfoObject);
        assertEquals("TAG2", existingInfoObject.getTag());
    }

    @Test
    void testUpdateInfoObjectNotFound() {
        InfoObjectDTO dto = new InfoObjectDTO("Topic", "Tag", "Content", "Markdown", "Dialogue", null, null);
        Long id = 1L;
        when(infoObjectRepository.findById(id)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            infoObjectService.updateInfoObject(id, dto);
        });

        assertEquals("InfoObject with id 1 not found", exception.getMessage());
    }

}
