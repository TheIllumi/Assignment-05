package io.saadmughal.assignment05.controller;

import io.saadmughal.assignment05.dto.TransactionTagsDTO;
import io.saadmughal.assignment05.service.TransactionTagsService;
import io.saadmughal.assignment05.vo.TransactionTagsQueryVO;
import io.saadmughal.assignment05.vo.TransactionTagsUpdateVO;
import io.saadmughal.assignment05.vo.TransactionTagsVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/transactionTags")
public class TransactionTagsController {

    @Autowired
    private TransactionTagsService transactionTagsService;

    @PostMapping
    public String save(@Valid @RequestBody TransactionTagsVO vO) {
        return transactionTagsService.save(vO).toString();
    }

    @DeleteMapping("/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") Long id) {
        transactionTagsService.delete(id);
    }

    @PutMapping("/{id}")
    public void update(@Valid @NotNull @PathVariable("id") Long id,
                       @Valid @RequestBody TransactionTagsUpdateVO vO) {
        transactionTagsService.update(id, vO);
    }

    @GetMapping("/{id}")
    public TransactionTagsDTO getById(@Valid @NotNull @PathVariable("id") Long id) {
        return transactionTagsService.getById(id);
    }

    @GetMapping
    public Page<TransactionTagsDTO> query(@Valid TransactionTagsQueryVO vO) {
        return transactionTagsService.query(vO);
    }
}
