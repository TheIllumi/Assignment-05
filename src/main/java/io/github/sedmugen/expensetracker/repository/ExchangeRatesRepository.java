package io.github.sedmugen.expensetracker.repository;

import io.github.sedmugen.expensetracker.entity.ExchangeRates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ExchangeRatesRepository extends JpaRepository<ExchangeRates, Long>, JpaSpecificationExecutor<ExchangeRates> {

}