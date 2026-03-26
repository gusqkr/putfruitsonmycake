package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import com.google.cloud.firestore.Firestore;
import java.util.*;
import org.springframework.web.bind.annotation.PostMapping;
import com.example.backend.service.LetterService;
import com.example.backend.model.Letter;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class LetterController {

    @Autowired
    private LetterService letterService;

    @PostMapping("/{treeId}")
    public ResponseEntity<String> createLetter(@PathVariable String treeId, @RequestBody Letter letter) {
        try {
            String letterId = letterService.saveLetter(treeId, letter);
            return ResponseEntity.ok("편지가 성공적으로 저장되었습니다. ID: " + letterId);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("저장 실패: " + e.getMessage());
        }
    }
}