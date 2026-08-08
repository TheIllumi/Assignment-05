package io.github.sedmugen.expensetracker.service;

import io.github.sedmugen.expensetracker.dto.ChartOfAccountItemDTO;
import io.github.sedmugen.expensetracker.dto.ChartOfAccountsDTO;
import io.github.sedmugen.expensetracker.entity.Accounts;
import io.github.sedmugen.expensetracker.entity.Categories;
import io.github.sedmugen.expensetracker.repository.AccountsRepository;
import io.github.sedmugen.expensetracker.repository.CategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChartOfAccountsService {

    @Autowired
    private AccountsRepository accountsRepository;

    @Autowired
    private CategoriesRepository categoriesRepository;

    public ChartOfAccountsDTO getChartOfAccounts(Long userId) {
        // 1. Fetch all accounts and categories
        List<Accounts> userAccounts = accountsRepository.findByUserId(userId);
        List<Categories> userCategories = categoriesRepository.findByUserIdOrUserIdIsNull(userId);

        // 2. Initialize lists
        List<ChartOfAccountItemDTO> assets = new ArrayList<>();
        List<ChartOfAccountItemDTO> liabilities = new ArrayList<>();
        List<ChartOfAccountItemDTO> income = new ArrayList<>();
        List<ChartOfAccountItemDTO> expenses = new ArrayList<>();

        // 3. Process Accounts (Assets & Liabilities)
        // Sort by name for consistent coding
        userAccounts.sort(Comparator.comparing(Accounts::getName));

        int assetCodeCounter = 1001;
        int liabilityCodeCounter = 2001;

        for (Accounts acc : userAccounts) {
            boolean isLiability = isLiabilityAccount(acc.getType());
            
            ChartOfAccountItemDTO item = ChartOfAccountItemDTO.builder()
                    .id(acc.getId())
                    .name(acc.getName())
                    .type(isLiability ? "LIABILITY" : "ASSET")
                    .subType(acc.getType())
                    .balance(acc.getCurrentBalance())
                    .currency(acc.getCurrencyCode())
                    .isSystem(false)
                    .build();

            if (isLiability) {
                item.setCode(String.valueOf(liabilityCodeCounter++));
                liabilities.add(item);
            } else {
                item.setCode(String.valueOf(assetCodeCounter++));
                assets.add(item);
            }
        }

        // 4. Process Categories (Income & Expenses)
        // Sort by name
        userCategories.sort(Comparator.comparing(Categories::getName));

        int incomeCodeCounter = 4001;
        int expenseCodeCounter = 5001;

        for (Categories cat : userCategories) {
            // Skip Transfer category as it's internal movement, but usually COA lists it.
            // We'll classify TRANSFER as Equity or just separate.
            // For standard COA, we focus on Income and Expense types.
            
            if ("INCOME".equalsIgnoreCase(cat.getType())) {
                ChartOfAccountItemDTO item = ChartOfAccountItemDTO.builder()
                        .id(cat.getId())
                        .code(String.valueOf(incomeCodeCounter++))
                        .name(cat.getName())
                        .type("INCOME")
                        .subType("Category")
                        .balance(BigDecimal.ZERO) // Categories don't hold balance
                        .currency("PKR") // Default/Placeholder
                        .isSystem(cat.getUserId() == null)
                        .build();
                income.add(item);
            } else if ("EXPENSE".equalsIgnoreCase(cat.getType())) {
                ChartOfAccountItemDTO item = ChartOfAccountItemDTO.builder()
                        .id(cat.getId())
                        .code(String.valueOf(expenseCodeCounter++))
                        .name(cat.getName())
                        .type("EXPENSE")
                        .subType("Category")
                        .balance(BigDecimal.ZERO)
                        .currency("PKR")
                        .isSystem(cat.getUserId() == null)
                        .build();
                expenses.add(item);
            }
        }

        // 5. Calculate Totals
        BigDecimal totalAssets = assets.stream()
                .map(ChartOfAccountItemDTO::getBalance)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalLiabilities = liabilities.stream()
                .map(ChartOfAccountItemDTO::getBalance)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal netWorth = totalAssets.subtract(totalLiabilities);

        return ChartOfAccountsDTO.builder()
                .assets(assets)
                .liabilities(liabilities)
                .income(income)
                .expenses(expenses)
                .totalAssets(totalAssets)
                .totalLiabilities(totalLiabilities)
                .netWorth(netWorth)
                .build();
    }

    private boolean isLiabilityAccount(String type) {
        return "CREDIT_CARD".equalsIgnoreCase(type) || 
               "LOAN".equalsIgnoreCase(type) || 
               "PAYABLE".equalsIgnoreCase(type);
    }
}
