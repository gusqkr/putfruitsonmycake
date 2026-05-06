import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase.js";
const firebaseConfig = {
  apiKey: "AIzaSyAEkF0N2V0ddUYUscaAPKVIxIqNeMchwV4",
  authDomain: "putfruitsonmycake.firebaseapp.com",
  projectId: "putfruitsonmycake",
  storageBucket: "putfruitsonmycake.firebasestorage.app",
  messagingSenderId: "451859039394",
  appId: "1:451859039394:web:c976ce86005ef3d0dcc3fb",
  measurementId: "G-ES19PN0S2K",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (loginType) => {
    try {
      await setPersistence(auth, browserLocalPersistence);

      let userCredential;
      let userData = {};

      if (loginType === "google") {
        userCredential = await signInWithPopup(auth, googleProvider);
        const user = userCredential.user;
        const token = await user.getIdToken();

        userData = {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          authType: "google",
        };
        await fetch("http://localhost:8080/api/hello", {
          headers: { Authorization: "Bearer " + token },
        });
      } else {
        userCredential = await signInAnonymously(auth);
        const user = userCredential.user;

        userData = {
          uid: user.uid,
          authType: "guest",
        };
      }
      await setDoc(doc(db, "users", userCredential.user.uid), userData, {
        merge: true,
      });

      console.log(`${loginType} 유저 정보 저장 완료`);
      checkMyCake(userCredential.user.uid, loginType);
    } catch (error) {
      console.error("로그인 중 오류:", error);
    }
  };

  const checkMyCake = async (uid, loginType) => {
    const q = query(collection(db, "cakes"), where("uid", "==", uid), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const myCakeId = querySnapshot.docs[0].id;
      navigate(`/mycake/${myCakeId}`, { state: { authType: loginType } });
    } else {
      const newCakeId = uuidv4();
      navigate(`/cake/${newCakeId}`, { state: { authType: loginType } });
    }
  };
  return (
    <div
      style={{
        padding: "50px",
        textAlign: "center",
        backgroundColor: "#FFE8D8",
        height: "852px",
        width: "393px",
        backgroundImage: "url(../public/login-background.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <h1
        style={{
          color: "black",
          fontFamily: "Gluten",
          paddingBottom: "30px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        Put
        <br />
        Fruits
        <br />
        on
        <br />
        My Cake
      </h1>
      <div
        style={{
          paddingTop: "150px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "330px",
          width: "293px",
        }}
      >
        <button
          style={{
            backgroundColor: "#fede07",
            color: "black",
            margin: "10px",
            padding: "15px 50px",
            fontSize: "16px",
          }}
        >
          카카오톡으로 로그인하기
        </button>
        <br />
        <button
          style={{
            backgroundColor: "white",
            color: "black",
            margin: "10px",
            padding: "15px 70px",
            fontSize: "16px",
          }}
          onClick={() => handleLogin("google")}
        >
          구글로 로그인하기
        </button>
        <br />
        <button
          style={{
            backgroundColor: "#a9a9a9",
            color: "black",
            margin: "10px",
            padding: "15px 50px",
            fontSize: "16px",
          }}
          onClick={() => handleLogin("guest")}
        >
          비회원으로 로그인하기
        </button>
        <br />
        {/* 로그아웃 기능 필요 시 활용 -> <button onClick={() => {auth.signOut(); setUser(null);}} style={{backgroundColor:'#a9a9a9',color:'black',margin:'10px', padding:'15px 50px'}}>로그아웃 하기</button> */}
      </div>
    </div>
  );
}
export default Login;
