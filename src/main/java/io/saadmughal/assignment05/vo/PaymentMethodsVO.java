package io.saadmughal.assignment05.vo;

import lombok.Data;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.util.Date;

@Data
public class PaymentMethodsVO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotNull(message = "userId can not null")
    private Long userId;

    @NotNull(message = "name can not null")
    private String name;

    @NotNull(message = "type can not null")
    private String type;

    private String last4;

    private Boolean archived;

    private Date createdAt;

    private Date updatedAt;

}
