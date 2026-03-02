package com.example.backend.controller;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.SetOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import com.google.cloud.firestore.Firestore;
import java.util.*;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CakeController {

    @Autowired
    private Firestore firestore;

    @PostMapping("/api/make-cake/nickname")
    public String cake(@RequestBody Map<String, Object> data) {
        try{
            String uid = (String)data.get("uid");
            if (uid == null || uid.equals("")) {
                return "Invalid uid";
            }
            firestore.collection("cakes").document(uid).set(data, SetOptions.merge());
            System.out.println("데이터 저장 완료");
            return "OK";
        }catch (Exception e){
            System.err.println("저장 중 에러 발생: " + e.getMessage());
            return "ERROR";
        }
    }

    @PostMapping("/api/make-cake/flavor")
    public String flavor(@RequestBody Map<String, Object> data) {
        try{
            String uid = (String)data.get("uid");
            if (uid == null || uid.equals("")) {
                return "Invalid uid";
            }
            firestore.collection("cakes").document(uid).set(data, SetOptions.merge());
            System.out.println("데이터 저장 완료");
            return "OK";
        }catch (Exception e){
            System.err.println("저장 중 에러 발생: " + e.getMessage());
            return "ERROR";
        }
    }

    @PostMapping("/api/make-cake/birth")
    public String birth(@RequestBody Map<String, Object> data) {
        try{
            String uid = (String)data.get("uid");
            if (uid == null || uid.equals("")) {
                return "Invalid uid";
            }
            firestore.collection("cakes").document(uid).set(data, SetOptions.merge());
            System.out.println("데이터 저장 완료");
            return "OK";
        }catch (Exception e){
            System.err.println("저장 중 에러 발생: " + e.getMessage());
            return "ERROR";
        }
    }
}
