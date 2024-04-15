package com.example.InformationObjectHub.infoobject;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public class InfoObjectServiceTest {

    @Mock
    private InfoObjectRepository infoObjectRepository;

    @InjectMocks
    private InfoObjectService infoObjectService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAllInfoObjectsWithTag() {
        Pageable pageable = Pageable.unpaged();
        InfoObject infoObject = new InfoObject();
        Page<InfoObject> expectedPage = new PageImpl<>(Arrays.asList(infoObject));
        when(infoObjectRepository.findByTag("testTag", pageable)).thenReturn(expectedPage);

        Page<InfoObject> result = infoObjectService.findAllInfoObjects("testTag", pageable);
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(infoObjectRepository).findByTag("testTag", pageable);
    }

    @Test
    public void testFindAllInfoObjectsNoTag() {
        Pageable pageable = Pageable.unpaged();
        InfoObject infoObject = new InfoObject();
        Page<InfoObject> expectedPage = new PageImpl<>(Arrays.asList(infoObject));
        when(infoObjectRepository.findAll(pageable)).thenReturn(expectedPage);

        Page<InfoObject> result = infoObjectService.findAllInfoObjects(null, pageable);
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(infoObjectRepository).findAll(pageable);
    }

    @Test
    public void testFindByIdFound() {
        Long id = 1L;
        Optional<InfoObject> expected = Optional.of(new InfoObject());
        when(infoObjectRepository.findById(id)).thenReturn(expected);

        Optional<InfoObject> result = infoObjectService.findById(id);
        assertTrue(result.isPresent());
        verify(infoObjectRepository).findById(id);
    }

    @Test
    public void testFindByIdNotFound() {
        Long id = 1L;
        when(infoObjectRepository.findById(id)).thenReturn(Optional.empty());

        Optional<InfoObject> result = infoObjectService.findById(id);
        assertFalse(result.isPresent());
        verify(infoObjectRepository).findById(id);
    }

    @Test
    public void testSaveInfoObject() {
        InfoObjectDTO dto = new InfoObjectDTO("Temat", "Treść", "Tag");
        String authorIp = "192.168.21.37";
        InfoObject savedInfoObject = new InfoObject();
        when(infoObjectRepository.save(any(InfoObject.class))).thenReturn(savedInfoObject);

        infoObjectService.saveInfoObject(dto, authorIp);

        verify(infoObjectRepository).save(any(InfoObject.class));
    }

    @Test
    public void testUpdateInfoObjectFound() {
        InfoObjectDTO dto = new InfoObjectDTO("Nowy Temat", "Kontent2", "Tag2");
        Long id = 1L;
        InfoObject existingInfoObject = new InfoObject();
        when(infoObjectRepository.findById(id)).thenReturn(Optional.of(existingInfoObject));
        when(infoObjectRepository.save(any(InfoObject.class))).thenReturn(existingInfoObject);

        infoObjectService.updateInfoObject(id, dto);

        verify(infoObjectRepository).save(existingInfoObject);
        assertEquals("TAG2", existingInfoObject.getTag());
    }

    @Test
    public void testUpdateInfoObjectNotFound() {
        InfoObjectDTO dto = new InfoObjectDTO("Temat3", "Kontnent3", "tag3");
        Long id = 1L;
        when(infoObjectRepository.findById(id)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            infoObjectService.updateInfoObject(id, dto);
        });

        assertEquals("InfoObject with id 1 not found", exception.getMessage());
    }

}
