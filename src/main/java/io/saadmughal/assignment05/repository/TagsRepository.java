package io.saadmughal.assignment05.repository;

import io.saadmughal.assignment05.entity.Tags;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TagsRepository extends JpaRepository<Tags, Long>, JpaSpecificationExecutor<Tags> {

}