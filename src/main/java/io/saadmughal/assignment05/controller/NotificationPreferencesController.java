package io.saadmughal.assignment05.controller;

import io.saadmughal.assignment05.dto.NotificationPreferencesDTO;
import io.saadmughal.assignment05.service.NotificationPreferencesService;
import io.saadmughal.assignment05.vo.NotificationPreferencesQueryVO;
import io.saadmughal.assignment05.vo.NotificationPreferencesUpdateVO;
import io.saadmughal.assignment05.vo.NotificationPreferencesVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/notificationPreferences")
public class NotificationPreferencesController {

    @Autowired
    private NotificationPreferencesService notificationPreferencesService;

    @PostMapping
    public String save(@Valid @RequestBody NotificationPreferencesVO vO) {
        return notificationPreferencesService.save(vO).toString();
    }

    @DeleteMapping("/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") Long id) {
        notificationPreferencesService.delete(id);
    }

    @PutMapping("/{id}")
    public void update(@Valid @NotNull @PathVariable("id") Long id,
                       @Valid @RequestBody NotificationPreferencesUpdateVO vO) {
        notificationPreferencesService.update(id, vO);
    }

    @GetMapping("/{id}")
    public NotificationPreferencesDTO getById(@Valid @NotNull @PathVariable("id") Long id) {
        return notificationPreferencesService.getById(id);
    }

    @GetMapping
    public Page<NotificationPreferencesDTO> query(@Valid NotificationPreferencesQueryVO vO) {
        return notificationPreferencesService.query(vO);
    }
}
