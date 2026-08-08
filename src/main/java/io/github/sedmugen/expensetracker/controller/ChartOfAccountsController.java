package io.github.sedmugen.expensetracker.controller;

import io.github.sedmugen.expensetracker.dto.ChartOfAccountsDTO;
import io.github.sedmugen.expensetracker.service.ChartOfAccountsService;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("/chartOfAccounts")
public class ChartOfAccountsController {

    @Autowired
    private ChartOfAccountsService chartOfAccountsService;

    @GetMapping
    public ResponseEntity<ChartOfAccountsDTO> getChartOfAccounts(@RequestParam @NotNull Long userId) {
        return ResponseEntity.ok(chartOfAccountsService.getChartOfAccounts(userId));
    }
}
