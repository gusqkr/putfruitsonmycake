package com.example.backend.dto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CakeResponseDTO {
    private String uid;
    private String birthdate;
    private String flavorId;
    private String nickname;

}
