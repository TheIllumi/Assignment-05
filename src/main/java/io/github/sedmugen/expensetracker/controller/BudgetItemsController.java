package io.github.sedmugen.expensetracker.controller;

import io.github.sedmugen.expensetracker.dto.BudgetItemsDTO;
import io.github.sedmugen.expensetracker.service.BudgetItemsService;
import io.github.sedmugen.expensetracker.vo.BudgetItemsQueryVO;
import io.github.sedmugen.expensetracker.vo.BudgetItemsUpdateVO;
import io.github.sedmugen.expensetracker.vo.BudgetItemsVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/budgetItems")
public class BudgetItemsController {

    @Autowired
    private BudgetItemsService budgetItemsService;

    @PostMapping
    public String save(@Valid @RequestBody BudgetItemsVO vO) {
        return budgetItemsService.save(vO).toString();
    }

    @DeleteMapping("/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") Long id) {
        budgetItemsService.delete(id);
    }

    @PutMapping("/{id}")
    public void update(@Valid @NotNull @PathVariable("id") Long id,
                       @Valid @RequestBody BudgetItemsUpdateVO vO) {
        budgetItemsService.update(id, vO);
    }

    @GetMapping("/{id}")
    public BudgetItemsDTO getById(@Valid @NotNull @PathVariable("id") Long id) {
        return budgetItemsService.getById(id);
    }

    @GetMapping
    public Page<BudgetItemsDTO> query(@Valid BudgetItemsQueryVO vO) {
        return budgetItemsService.query(vO);
    }
}
