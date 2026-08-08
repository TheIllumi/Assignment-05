package io.github.sedmugen.expensetracker.service;

import io.github.sedmugen.expensetracker.dto.CurrenciesDTO;
import io.github.sedmugen.expensetracker.entity.Currencies;
import io.github.sedmugen.expensetracker.repository.CurrenciesRepository;
import io.github.sedmugen.expensetracker.vo.CurrenciesQueryVO;
import io.github.sedmugen.expensetracker.vo.CurrenciesUpdateVO;
import io.github.sedmugen.expensetracker.vo.CurrenciesVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class CurrenciesService {

    @Autowired
    private CurrenciesRepository currenciesRepository;

    public String save(CurrenciesVO vO) {
        Currencies bean = new Currencies();
        BeanUtils.copyProperties(vO, bean);
        bean = currenciesRepository.save(bean);
        return bean.getCode();
    }

    public void delete(String id) {
        currenciesRepository.deleteById(id);
    }

    public void update(String id, CurrenciesUpdateVO vO) {
        Currencies bean = requireOne(id);
        BeanUtils.copyProperties(vO, bean);
        currenciesRepository.save(bean);
    }

    public CurrenciesDTO getById(String id) {
        Currencies original = requireOne(id);
        return toDTO(original);
    }

    public Page<CurrenciesDTO> query(CurrenciesQueryVO vO) {
        throw new UnsupportedOperationException();
    }

    private CurrenciesDTO toDTO(Currencies original) {
        CurrenciesDTO bean = new CurrenciesDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private Currencies requireOne(String id) {
        return currenciesRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
