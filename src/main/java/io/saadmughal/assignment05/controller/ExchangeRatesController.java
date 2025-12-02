package io.saadmughal.assignment05.controller;

import io.saadmughal.assignment05.dto.ExchangeRatesDTO;
import io.saadmughal.assignment05.service.ExchangeRatesService;
import io.saadmughal.assignment05.vo.ExchangeRatesQueryVO;
import io.saadmughal.assignment05.vo.ExchangeRatesUpdateVO;
import io.saadmughal.assignment05.vo.ExchangeRatesVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/exchangeRates")
public class ExchangeRatesController {

    @Autowired
    private ExchangeRatesService exchangeRatesService;

    @PostMapping
    public String save(@Valid @RequestBody ExchangeRatesVO vO) {
        return exchangeRatesService.save(vO).toString();
    }

    @DeleteMapping("/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") Long id) {
        exchangeRatesService.delete(id);
    }

    @PutMapping("/{id}")
    public void update(@Valid @NotNull @PathVariable("id") Long id,
                       @Valid @RequestBody ExchangeRatesUpdateVO vO) {
        exchangeRatesService.update(id, vO);
    }

    @GetMapping("/{id}")
    public ExchangeRatesDTO getById(@Valid @NotNull @PathVariable("id") Long id) {
        return exchangeRatesService.getById(id);
    }

    @GetMapping
    public Page<ExchangeRatesDTO> query(@Valid ExchangeRatesQueryVO vO) {
        return exchangeRatesService.query(vO);
    }
}
