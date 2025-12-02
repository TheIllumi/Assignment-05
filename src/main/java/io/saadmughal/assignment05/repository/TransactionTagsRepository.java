package io.saadmughal.assignment05.repository;

import io.saadmughal.assignment05.entity.TransactionTags;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TransactionTagsRepository extends JpaRepository<TransactionTags, Long>, JpaSpecificationExecutor<TransactionTags> {

}