package io.github.sedmugen.expensetracker.controller;

import io.github.sedmugen.expensetracker.dto.CategoriesDTO;
import io.github.sedmugen.expensetracker.service.CategoriesService;
import io.github.sedmugen.expensetracker.vo.CategoriesQueryVO;
import io.github.sedmugen.expensetracker.vo.CategoriesUpdateVO;
import io.github.sedmugen.expensetracker.vo.CategoriesVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/categories")
public class CategoriesController {

    @Autowired
    private CategoriesService categoriesService;

    @PostMapping
    public String save(@Valid @RequestBody CategoriesVO vO) {
        return categoriesService.save(vO).toString();
    }

    @DeleteMapping("/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") Long id) {
        categoriesService.delete(id);
    }

    @PutMapping("/{id}")
    public void update(@Valid @NotNull @PathVariable("id") Long id,
                       @Valid @RequestBody CategoriesUpdateVO vO) {
        categoriesService.update(id, vO);
    }

    @GetMapping("/{id}")
    public CategoriesDTO getById(@Valid @NotNull @PathVariable("id") Long id) {
        return categoriesService.getById(id);
    }

    @GetMapping
    public Page<CategoriesDTO> query(@Valid CategoriesQueryVO vO) {
        return categoriesService.query(vO);
    }
}
