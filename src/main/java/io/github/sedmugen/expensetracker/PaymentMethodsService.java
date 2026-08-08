package io.github.sedmugen.expensetracker.service;

import io.github.sedmugen.expensetracker.dto.PaymentMethodsDTO;
import io.github.sedmugen.expensetracker.entity.PaymentMethods;
import io.github.sedmugen.expensetracker.repository.PaymentMethodsRepository;
import io.github.sedmugen.expensetracker.vo.PaymentMethodsQueryVO;
import io.github.sedmugen.expensetracker.vo.PaymentMethodsUpdateVO;
import io.github.sedmugen.expensetracker.vo.PaymentMethodsVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class PaymentMethodsService {

    @Autowired
    private PaymentMethodsRepository paymentMethodsRepository;

    public Long save(PaymentMethodsVO vO) {
        PaymentMethods bean = new PaymentMethods();
        BeanUtils.copyProperties(vO, bean);

        // Defaults
        if (bean.getArchived() == null) bean.setArchived(false);
        if (bean.getCreatedAt() == null) bean.setCreatedAt(new java.util.Date());
        if (bean.getUpdatedAt() == null) bean.setUpdatedAt(new java.util.Date());

        bean = paymentMethodsRepository.save(bean);
        return bean.getId();
    }

    public void delete(Long id) {
        paymentMethodsRepository.deleteById(id);
    }

    public void update(Long id, PaymentMethodsUpdateVO vO) {
        PaymentMethods bean = requireOne(id);
        BeanUtils.copyProperties(vO, bean);
        paymentMethodsRepository.save(bean);
    }

    public PaymentMethodsDTO getById(Long id) {
        PaymentMethods original = requireOne(id);
        return toDTO(original);
    }

    public Page<PaymentMethodsDTO> query(PaymentMethodsQueryVO vO) {
        org.springframework.data.jpa.domain.Specification<PaymentMethods> spec = (root, query, cb) -> {
            java.util.List<jakarta.persistence.criteria.Predicate> predicates = new java.util.ArrayList<>();
            if (vO.getUserId() != null) {
                predicates.add(cb.equal(root.get("userId"), vO.getUserId()));
            }
            return cb.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };
        return paymentMethodsRepository.findAll(spec, org.springframework.data.domain.Pageable.unpaged()).map(this::toDTO);
    }

    private PaymentMethodsDTO toDTO(PaymentMethods original) {
        PaymentMethodsDTO bean = new PaymentMethodsDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private PaymentMethods requireOne(Long id) {
        return paymentMethodsRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
