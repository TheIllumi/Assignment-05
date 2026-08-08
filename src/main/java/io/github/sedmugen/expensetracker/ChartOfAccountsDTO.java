package io.github.sedmugen.expensetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChartOfAccountsDTO implements Serializable {
    private List<ChartOfAccountItemDTO> assets;
    private List<ChartOfAccountItemDTO> liabilities;
    private List<ChartOfAccountItemDTO> income;
    private List<ChartOfAccountItemDTO> expenses;
    
    private BigDecimal totalAssets;
    private BigDecimal totalLiabilities;
    private BigDecimal netWorth; // Assets - Liabilities
}
