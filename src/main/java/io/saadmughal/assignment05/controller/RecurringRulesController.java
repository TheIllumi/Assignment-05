package io.saadmughal.assignment05.controller;

import io.saadmughal.assignment05.dto.RecurringRulesDTO;
import io.saadmughal.assignment05.service.RecurringRulesService;
import io.saadmughal.assignment05.vo.RecurringRulesQueryVO;
import io.saadmughal.assignment05.vo.RecurringRulesUpdateVO;
import io.saadmughal.assignment05.vo.RecurringRulesVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/recurringRules")
public class RecurringRulesController {

    @Autowired
    private RecurringRulesService recurringRulesService;

    @PostMapping
    public String save(@Valid @RequestBody RecurringRulesVO vO) {
        return recurringRulesService.save(vO).toString();
    }

    @DeleteMapping("/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") Long id) {
        recurringRulesService.delete(id);
    }

    @PutMapping("/{id}")
    public void update(@Valid @NotNull @PathVariable("id") Long id,
                       @Valid @RequestBody RecurringRulesUpdateVO vO) {
        recurringRulesService.update(id, vO);
    }

    @GetMapping("/{id}")
    public RecurringRulesDTO getById(@Valid @NotNull @PathVariable("id") Long id) {
        return recurringRulesService.getById(id);
    }

    @GetMapping
    public Page<RecurringRulesDTO> query(@Valid RecurringRulesQueryVO vO) {
        return recurringRulesService.query(vO);
    }
}
