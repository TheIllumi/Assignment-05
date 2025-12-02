package io.saadmughal.assignment05.repository;

import io.saadmughal.assignment05.entity.RecurringRules;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RecurringRulesRepository extends JpaRepository<RecurringRules, Long>, JpaSpecificationExecutor<RecurringRules> {

}