package com.bulletjournal.repository.models;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@MappedSuperclass
public abstract class NamedModel extends AuditModel {

    @NotBlank
    @Size(min = 1, max = 100)
    @Column
    private String name;

    @NotBlank
    @Size(min = 2, max = 100)
    @Column
    private String owner;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }
}
