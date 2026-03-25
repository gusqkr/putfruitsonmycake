package com.example.backend.controller;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import com.google.cloud.firestore.Firestore;
import java.util.*;
import java.util.concurrent.ExecutionException;
import com.example.backend.dto.CakeResponseDTO;

@RestController
@RequestMapping("/api/birthdayCake")
@CrossOrigin(origins = "http://localhost:5173")
public class BirthdayCakeController {
    @Autowired
    Firestore firestore;

    @GetMapping("/{id}")
    public ResponseEntity<CakeResponseDTO> getBirthdayCake(@PathVariable("id") String id) {
        try {
            ApiFuture<DocumentSnapshot> future = firestore.collection("cakes").document(id).get();
            DocumentSnapshot document = future.get();

            if (document.exists()){
                CakeResponseDTO cake = document.toObject(CakeResponseDTO.class);
                return ResponseEntity.ok(cake);
            }
            else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}