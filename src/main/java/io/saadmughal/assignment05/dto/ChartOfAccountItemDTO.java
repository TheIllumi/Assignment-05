package io.saadmughal.assignment05.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChartOfAccountItemDTO implements Serializable {
    private Long id;
    private String code;
    private String name;
    private String type; // ASSET, LIABILITY, INCOME, EXPENSE
    private String subType; // Bank, Credit Card, etc.
    private BigDecimal balance; // Current balance for Assets/Liabilities
    private String currency;
    private Boolean isSystem; // If it's a system default account/category
}
