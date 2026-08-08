package io.github.sedmugen.expensetracker.service;

import io.github.sedmugen.expensetracker.dto.AuditLogsDTO;
import io.github.sedmugen.expensetracker.entity.AuditLogs;
import io.github.sedmugen.expensetracker.repository.AuditLogsRepository;
import io.github.sedmugen.expensetracker.vo.AuditLogsQueryVO;
import io.github.sedmugen.expensetracker.vo.AuditLogsUpdateVO;
import io.github.sedmugen.expensetracker.vo.AuditLogsVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class AuditLogsService {

    @Autowired
    private AuditLogsRepository auditLogsRepository;

    public Long save(AuditLogsVO vO) {
        AuditLogs bean = new AuditLogs();
        BeanUtils.copyProperties(vO, bean);
        bean = auditLogsRepository.save(bean);
        return bean.getId();
    }

    public void delete(Long id) {
        auditLogsRepository.deleteById(id);
    }

    public void update(Long id, AuditLogsUpdateVO vO) {
        AuditLogs bean = requireOne(id);
        BeanUtils.copyProperties(vO, bean);
        auditLogsRepository.save(bean);
    }

    public AuditLogsDTO getById(Long id) {
        AuditLogs original = requireOne(id);
        return toDTO(original);
    }

    public Page<AuditLogsDTO> query(AuditLogsQueryVO vO) {
        throw new UnsupportedOperationException();
    }

    private AuditLogsDTO toDTO(AuditLogs original) {
        AuditLogsDTO bean = new AuditLogsDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private AuditLogs requireOne(Long id) {
        return auditLogsRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
