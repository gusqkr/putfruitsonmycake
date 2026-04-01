package com.example.backend.model;

import lombok.Data;

@Data
public class Letter {
    private String sender;
    private String content;
    private String ornamentId;
    private int order;
}
