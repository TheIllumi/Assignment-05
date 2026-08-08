package io.github.sedmugen.expensetracker.vo;

import lombok.Data;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.util.Date;

@Data
public class MerchantsVO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotNull(message = "userId can not null")
    private Long userId;

    @NotNull(message = "name can not null")
    private String name;

    private Long categoryId;

    private String address;

    private String phone;

    private String website;

    private Date createdAt;

    private Date updatedAt;

}
