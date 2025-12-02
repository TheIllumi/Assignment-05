package io.saadmughal.assignment05.service;

import io.saadmughal.assignment05.dto.NotificationPreferencesDTO;
import io.saadmughal.assignment05.entity.NotificationPreferences;
import io.saadmughal.assignment05.repository.NotificationPreferencesRepository;
import io.saadmughal.assignment05.vo.NotificationPreferencesQueryVO;
import io.saadmughal.assignment05.vo.NotificationPreferencesUpdateVO;
import io.saadmughal.assignment05.vo.NotificationPreferencesVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class NotificationPreferencesService {

    @Autowired
    private NotificationPreferencesRepository notificationPreferencesRepository;

    public Long save(NotificationPreferencesVO vO) {
        NotificationPreferences bean = new NotificationPreferences();
        BeanUtils.copyProperties(vO, bean);
        bean = notificationPreferencesRepository.save(bean);
        return bean.getId();
    }

    public void delete(Long id) {
        notificationPreferencesRepository.deleteById(id);
    }

    public void update(Long id, NotificationPreferencesUpdateVO vO) {
        NotificationPreferences bean = requireOne(id);
        BeanUtils.copyProperties(vO, bean);
        notificationPreferencesRepository.save(bean);
    }

    public NotificationPreferencesDTO getById(Long id) {
        NotificationPreferences original = requireOne(id);
        return toDTO(original);
    }

    public Page<NotificationPreferencesDTO> query(NotificationPreferencesQueryVO vO) {
        throw new UnsupportedOperationException();
    }

    private NotificationPreferencesDTO toDTO(NotificationPreferences original) {
        NotificationPreferencesDTO bean = new NotificationPreferencesDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private NotificationPreferences requireOne(Long id) {
        return notificationPreferencesRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
