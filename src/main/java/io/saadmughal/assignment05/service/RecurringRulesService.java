package io.saadmughal.assignment05.service;

import io.saadmughal.assignment05.dto.RecurringRulesDTO;
import io.saadmughal.assignment05.entity.RecurringRules;
import io.saadmughal.assignment05.repository.RecurringRulesRepository;
import io.saadmughal.assignment05.vo.RecurringRulesQueryVO;
import io.saadmughal.assignment05.vo.RecurringRulesUpdateVO;
import io.saadmughal.assignment05.vo.RecurringRulesVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class RecurringRulesService {

    @Autowired
    private RecurringRulesRepository recurringRulesRepository;

    public Long save(RecurringRulesVO vO) {
        RecurringRules bean = new RecurringRules();
        BeanUtils.copyProperties(vO, bean);
        bean = recurringRulesRepository.save(bean);
        return bean.getId();
    }

    public void delete(Long id) {
        recurringRulesRepository.deleteById(id);
    }

    public void update(Long id, RecurringRulesUpdateVO vO) {
        RecurringRules bean = requireOne(id);
        BeanUtils.copyProperties(vO, bean);
        recurringRulesRepository.save(bean);
    }

    public RecurringRulesDTO getById(Long id) {
        RecurringRules original = requireOne(id);
        return toDTO(original);
    }

    public Page<RecurringRulesDTO> query(RecurringRulesQueryVO vO) {
        throw new UnsupportedOperationException();
    }

    private RecurringRulesDTO toDTO(RecurringRules original) {
        RecurringRulesDTO bean = new RecurringRulesDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private RecurringRules requireOne(Long id) {
        return recurringRulesRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
