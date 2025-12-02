package io.saadmughal.assignment05.service;

import io.saadmughal.assignment05.dto.CategoriesDTO;
import io.saadmughal.assignment05.entity.Categories;
import io.saadmughal.assignment05.repository.CategoriesRepository;
import io.saadmughal.assignment05.vo.CategoriesQueryVO;
import io.saadmughal.assignment05.vo.CategoriesUpdateVO;
import io.saadmughal.assignment05.vo.CategoriesVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class CategoriesService {

    @Autowired
    private CategoriesRepository categoriesRepository;

    public Long save(CategoriesVO vO) {
        Categories bean = new Categories();
        BeanUtils.copyProperties(vO, bean);
        bean = categoriesRepository.save(bean);
        return bean.getId();
    }

    public void delete(Long id) {
        categoriesRepository.deleteById(id);
    }

    public void update(Long id, CategoriesUpdateVO vO) {
        Categories bean = requireOne(id);
        BeanUtils.copyProperties(vO, bean);
        categoriesRepository.save(bean);
    }

    public CategoriesDTO getById(Long id) {
        Categories original = requireOne(id);
        return toDTO(original);
    }

    public Page<CategoriesDTO> query(CategoriesQueryVO vO) {
        throw new UnsupportedOperationException();
    }

    private CategoriesDTO toDTO(Categories original) {
        CategoriesDTO bean = new CategoriesDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private Categories requireOne(Long id) {
        return categoriesRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
