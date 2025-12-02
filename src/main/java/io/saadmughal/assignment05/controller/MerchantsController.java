package io.saadmughal.assignment05.controller;

import io.saadmughal.assignment05.dto.MerchantsDTO;
import io.saadmughal.assignment05.service.MerchantsService;
import io.saadmughal.assignment05.vo.MerchantsQueryVO;
import io.saadmughal.assignment05.vo.MerchantsUpdateVO;
import io.saadmughal.assignment05.vo.MerchantsVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/merchants")
public class MerchantsController {

    @Autowired
    private MerchantsService merchantsService;

    @PostMapping
    public String save(@Valid @RequestBody MerchantsVO vO) {
        return merchantsService.save(vO).toString();
    }

    @DeleteMapping("/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") Long id) {
        merchantsService.delete(id);
    }

    @PutMapping("/{id}")
    public void update(@Valid @NotNull @PathVariable("id") Long id,
                       @Valid @RequestBody MerchantsUpdateVO vO) {
        merchantsService.update(id, vO);
    }

    @GetMapping("/{id}")
    public MerchantsDTO getById(@Valid @NotNull @PathVariable("id") Long id) {
        return merchantsService.getById(id);
    }

    @GetMapping
    public Page<MerchantsDTO> query(@Valid MerchantsQueryVO vO) {
        return merchantsService.query(vO);
    }
}
