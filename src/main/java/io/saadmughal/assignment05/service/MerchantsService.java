package io.saadmughal.assignment05.service;

import io.saadmughal.assignment05.dto.MerchantsDTO;
import io.saadmughal.assignment05.entity.Merchants;
import io.saadmughal.assignment05.repository.MerchantsRepository;
import io.saadmughal.assignment05.vo.MerchantsQueryVO;
import io.saadmughal.assignment05.vo.MerchantsUpdateVO;
import io.saadmughal.assignment05.vo.MerchantsVO;
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
        throw new UnsupportedOperationException();
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
