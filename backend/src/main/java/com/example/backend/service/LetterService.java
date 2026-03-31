package com.example.backend.service; // 본인의 실제 패키지 경로로 확인하세요!

import com.example.backend.model.Letter; // Letter 클래스가 있는 위치
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.api.core.ApiFuture;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

@Service
public class LetterService {

    String treeId;
    public List<Map<String, Object>> getAllLetters() throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        List<Map<String, Object>> letterList = new ArrayList<>();

        ApiFuture<QuerySnapshot> future = db.collection("cakes")
                .get();

        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document : documents) {
            treeId = document.getId();
            Map<String, Object> data = document.getData();
            letterList.add(data);
        }
        return letterList;
    }

    public String saveLetter(Letter letter) throws Exception {
        Firestore db = FirestoreClient.getFirestore();

        Map<String, Object> data = new HashMap<>();
        data.put("sender", letter.getSender());
        data.put("content", letter.getContent());
        data.put("ornamentId", letter.getOrnamentId());
        data.put("timestamp", System.currentTimeMillis());

        // Firestore 저장 로직
        var result = db.collection("trees")
                .document(treeId)
                .collection("letters")
                .add(data);

        return result.get().getId();
    }
}