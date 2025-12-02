package io.saadmughal.assignment05.controller;

import io.saadmughal.assignment05.dto.AttachmentsDTO;
import io.saadmughal.assignment05.service.AttachmentsService;
import io.saadmughal.assignment05.vo.AttachmentsQueryVO;
import io.saadmughal.assignment05.vo.AttachmentsUpdateVO;
import io.saadmughal.assignment05.vo.AttachmentsVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/attachments")
public class AttachmentsController {

    @Autowired
    private AttachmentsService attachmentsService;

    @PostMapping
    public String save(@Valid @RequestBody AttachmentsVO vO) {
        return attachmentsService.save(vO).toString();
    }

    @DeleteMapping("/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") Long id) {
        attachmentsService.delete(id);
    }

    @PutMapping("/{id}")
    public void update(@Valid @NotNull @PathVariable("id") Long id,
                       @Valid @RequestBody AttachmentsUpdateVO vO) {
        attachmentsService.update(id, vO);
    }

    @GetMapping("/{id}")
    public AttachmentsDTO getById(@Valid @NotNull @PathVariable("id") Long id) {
        return attachmentsService.getById(id);
    }

    @GetMapping
    public Page<AttachmentsDTO> query(@Valid AttachmentsQueryVO vO) {
        return attachmentsService.query(vO);
    }
}
