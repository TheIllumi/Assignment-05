package io.github.sedmugen.expensetracker.controller;

import io.github.sedmugen.expensetracker.dto.CurrenciesDTO;
import io.github.sedmugen.expensetracker.service.CurrenciesService;
import io.github.sedmugen.expensetracker.vo.CurrenciesQueryVO;
import io.github.sedmugen.expensetracker.vo.CurrenciesUpdateVO;
import io.github.sedmugen.expensetracker.vo.CurrenciesVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/currencies")
public class CurrenciesController {

    @Autowired
    private CurrenciesService currenciesService;

    @PostMapping
    public String save(@Valid @RequestBody CurrenciesVO vO) {
        return currenciesService.save(vO).toString();
    }

    @DeleteMapping("/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") String id) {
        currenciesService.delete(id);
    }

    @PutMapping("/{id}")
    public void update(@Valid @NotNull @PathVariable("id") String id,
                       @Valid @RequestBody CurrenciesUpdateVO vO) {
        currenciesService.update(id, vO);
    }

    @GetMapping("/{id}")
    public CurrenciesDTO getById(@Valid @NotNull @PathVariable("id") String id) {
        return currenciesService.getById(id);
    }

    @GetMapping
    public Page<CurrenciesDTO> query(@Valid CurrenciesQueryVO vO) {
        return currenciesService.query(vO);
    }
}
