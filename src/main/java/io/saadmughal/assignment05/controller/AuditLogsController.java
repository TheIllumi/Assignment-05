package io.saadmughal.assignment05.controller;

import io.saadmughal.assignment05.dto.AuditLogsDTO;
import io.saadmughal.assignment05.service.AuditLogsService;
import io.saadmughal.assignment05.vo.AuditLogsQueryVO;
import io.saadmughal.assignment05.vo.AuditLogsUpdateVO;
import io.saadmughal.assignment05.vo.AuditLogsVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/auditLogs")
public class AuditLogsController {

    @Autowired
    private AuditLogsService auditLogsService;

    @PostMapping
    public String save(@Valid @RequestBody AuditLogsVO vO) {
        return auditLogsService.save(vO).toString();
    }

    @DeleteMapping("/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") Long id) {
        auditLogsService.delete(id);
    }

    @PutMapping("/{id}")
    public void update(@Valid @NotNull @PathVariable("id") Long id,
                       @Valid @RequestBody AuditLogsUpdateVO vO) {
        auditLogsService.update(id, vO);
    }

    @GetMapping("/{id}")
    public AuditLogsDTO getById(@Valid @NotNull @PathVariable("id") Long id) {
        return auditLogsService.getById(id);
    }

    @GetMapping
    public Page<AuditLogsDTO> query(@Valid AuditLogsQueryVO vO) {
        return auditLogsService.query(vO);
    }
}
