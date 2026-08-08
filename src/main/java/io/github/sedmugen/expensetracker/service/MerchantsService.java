package io.github.sedmugen.expensetracker.service;

import io.github.sedmugen.expensetracker.dto.MerchantsDTO;
import io.github.sedmugen.expensetracker.entity.Merchants;
import io.github.sedmugen.expensetracker.repository.MerchantsRepository;
import io.github.sedmugen.expensetracker.vo.MerchantsQueryVO;
import io.github.sedmugen.expensetracker.vo.MerchantsUpdateVO;
import io.github.sedmugen.expensetracker.vo.MerchantsVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class MerchantsService {

    @Autowired
    private MerchantsRepository merchantsRepository;

    public Long save(MerchantsVO vO) {
        Merchants bean = new Merchants();
        BeanUtils.copyProperties(vO, bean);
        
        // Defaults
        if (bean.getCreatedAt() == null) bean.setCreatedAt(new java.util.Date());
        if (bean.getUpdatedAt() == null) bean.setUpdatedAt(new java.util.Date());

        bean = merchantsRepository.save(bean);
        return bean.getId();
    }

    public void delete(Long id) {
        merchantsRepository.deleteById(id);
    }

    public void update(Long id, MerchantsUpdateVO vO) {
        Merchants bean = requireOne(id);
        BeanUtils.copyProperties(vO, bean);
        merchantsRepository.save(bean);
    }

    public MerchantsDTO getById(Long id) {
        Merchants original = requireOne(id);
        return toDTO(original);
    }

    public Page<MerchantsDTO> query(MerchantsQueryVO vO) {
        org.springframework.data.jpa.domain.Specification<Merchants> spec = (root, query, cb) -> {
            java.util.List<jakarta.persistence.criteria.Predicate> predicates = new java.util.ArrayList<>();
            if (vO.getUserId() != null) {
                predicates.add(cb.equal(root.get("userId"), vO.getUserId()));
            }
            return cb.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };
        return merchantsRepository.findAll(spec, org.springframework.data.domain.Pageable.unpaged()).map(this::toDTO);
    }

    private MerchantsDTO toDTO(Merchants original) {
        MerchantsDTO bean = new MerchantsDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private Merchants requireOne(Long id) {
        return merchantsRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
