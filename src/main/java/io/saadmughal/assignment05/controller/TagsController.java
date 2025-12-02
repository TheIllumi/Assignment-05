package io.saadmughal.assignment05.controller;

import io.saadmughal.assignment05.dto.TagsDTO;
import io.saadmughal.assignment05.service.TagsService;
import io.saadmughal.assignment05.vo.TagsQueryVO;
import io.saadmughal.assignment05.vo.TagsUpdateVO;
import io.saadmughal.assignment05.vo.TagsVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/tags")
public class TagsController {

    @Autowired
    private TagsService tagsService;

    @PostMapping
    public String save(@Valid @RequestBody TagsVO vO) {
        return tagsService.save(vO).toString();
    }

    @DeleteMapping("/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") Long id) {
        tagsService.delete(id);
    }

    @PutMapping("/{id}")
    public void update(@Valid @NotNull @PathVariable("id") Long id,
                       @Valid @RequestBody TagsUpdateVO vO) {
        tagsService.update(id, vO);
    }

    @GetMapping("/{id}")
    public TagsDTO getById(@Valid @NotNull @PathVariable("id") Long id) {
        return tagsService.getById(id);
    }

    @GetMapping
    public Page<TagsDTO> query(@Valid TagsQueryVO vO) {
        return tagsService.query(vO);
    }
}
