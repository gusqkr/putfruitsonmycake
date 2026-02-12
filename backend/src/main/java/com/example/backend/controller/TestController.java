package com.example.backend.controller;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.google.cloud.firestore.Firestore;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class TestController {
    @Autowired private Firestore firestore;
    @GetMapping("api/hello")
    public String hello(@RequestHeader("Authorization") String header) {
        try {
            String token = header.replace("Bearer ","");
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
            Map<String, Object> user = new HashMap<>();
            String name = decodedToken.getName();
            String email = decodedToken.getEmail();
            String uid = decodedToken.getUid();
            user.put("name", name);
            user.put("email", email);
            user.put("uid", uid);

            firestore.collection("users").document(uid).set(user);

            System.out.println("로그인 유저: "+name);
            return "성공! 환영합니다"+name+"님";
        } catch (Exception e) {
            return "검증 실패: "+e.getMessage();
        }
    }
}
