package io.github.sedmugen.expensetracker.repository;

import io.github.sedmugen.expensetracker.entity.Currencies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CurrenciesRepository extends JpaRepository<Currencies, String>, JpaSpecificationExecutor<Currencies> {

}