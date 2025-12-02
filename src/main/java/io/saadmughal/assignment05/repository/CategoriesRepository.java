package io.saadmughal.assignment05.repository;

import io.saadmughal.assignment05.entity.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface CategoriesRepository extends JpaRepository<Categories, Long>, JpaSpecificationExecutor<Categories> {

    /**
     * Find category by ID
     * @param id Category ID
     * @return Optional containing category if found
     */
    Optional<Categories> findById(Long id);
}