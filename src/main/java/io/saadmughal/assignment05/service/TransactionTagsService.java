package io.saadmughal.assignment05.service;

import io.saadmughal.assignment05.dto.TransactionTagsDTO;
import io.saadmughal.assignment05.entity.TransactionTags;
import io.saadmughal.assignment05.repository.TransactionTagsRepository;
import io.saadmughal.assignment05.vo.TransactionTagsQueryVO;
import io.saadmughal.assignment05.vo.TransactionTagsUpdateVO;
import io.saadmughal.assignment05.vo.TransactionTagsVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class TransactionTagsService {

    @Autowired
    private TransactionTagsRepository transactionTagsRepository;

    public Long save(TransactionTagsVO vO) {
        TransactionTags bean = new TransactionTags();
        BeanUtils.copyProperties(vO, bean);
        bean = transactionTagsRepository.save(bean);
        return bean.getTransactionId();
    }

    public void delete(Long id) {
        transactionTagsRepository.deleteById(id);
    }

    public void update(Long id, TransactionTagsUpdateVO vO) {
        TransactionTags bean = requireOne(id);
        BeanUtils.copyProperties(vO, bean);
        transactionTagsRepository.save(bean);
    }

    public TransactionTagsDTO getById(Long id) {
        TransactionTags original = requireOne(id);
        return toDTO(original);
    }

    public Page<TransactionTagsDTO> query(TransactionTagsQueryVO vO) {
        throw new UnsupportedOperationException();
    }

    private TransactionTagsDTO toDTO(TransactionTags original) {
        TransactionTagsDTO bean = new TransactionTagsDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private TransactionTags requireOne(Long id) {
        return transactionTagsRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
