package io.saadmughal.assignment05.repository;

import io.saadmughal.assignment05.entity.NotificationPreferences;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface NotificationPreferencesRepository extends JpaRepository<NotificationPreferences, Long>, JpaSpecificationExecutor<NotificationPreferences> {

}