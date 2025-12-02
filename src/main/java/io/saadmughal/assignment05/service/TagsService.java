package io.saadmughal.assignment05.service;

import io.saadmughal.assignment05.dto.TagsDTO;
import io.saadmughal.assignment05.entity.Tags;
import io.saadmughal.assignment05.repository.TagsRepository;
import io.saadmughal.assignment05.vo.TagsQueryVO;
import io.saadmughal.assignment05.vo.TagsUpdateVO;
import io.saadmughal.assignment05.vo.TagsVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class TagsService {

    @Autowired
    private TagsRepository tagsRepository;

    public Long save(TagsVO vO) {
        Tags bean = new Tags();
        BeanUtils.copyProperties(vO, bean);
        bean = tagsRepository.save(bean);
        return bean.getId();
    }

    public void delete(Long id) {
        tagsRepository.deleteById(id);
    }

    public void update(Long id, TagsUpdateVO vO) {
        Tags bean = requireOne(id);
        BeanUtils.copyProperties(vO, bean);
        tagsRepository.save(bean);
    }

    public TagsDTO getById(Long id) {
        Tags original = requireOne(id);
        return toDTO(original);
    }

    public Page<TagsDTO> query(TagsQueryVO vO) {
        throw new UnsupportedOperationException();
    }

    private TagsDTO toDTO(Tags original) {
        TagsDTO bean = new TagsDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private Tags requireOne(Long id) {
        return tagsRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
