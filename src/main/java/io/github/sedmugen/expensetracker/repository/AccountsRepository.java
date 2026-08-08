package io.github.sedmugen.expensetracker.repository;

import io.github.sedmugen.expensetracker.entity.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface AccountsRepository extends JpaRepository<Accounts, Long>, JpaSpecificationExecutor<Accounts> {
    List<Accounts> findByUserId(Long userId);
}