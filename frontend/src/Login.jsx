import { useEffect, useState } from "react";
import {initializeApp} from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, browserSessionPersistence } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.js";
const firebaseConfig = {
  apiKey: "AIzaSyAEkF0N2V0ddUYUscaAPKVIxIqNeMchwV4",
  authDomain: "putfruitsonmycake.firebaseapp.com",
  projectId: "putfruitsonmycake",
  storageBucket: "putfruitsonmycake.firebasestorage.app",
  messagingSenderId: "451859039394",
  appId: "1:451859039394:web:c976ce86005ef3d0dcc3fb",
  measurementId: "G-ES19PN0S2K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

function Login() {
    const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    setPersistence(auth, browserSessionPersistence).then(() => {
      return signInWithPopup(auth, googleProvider).then((result) => {
    setUser(result.user);
    return result.user.getIdToken().then((token)=> {
      alert(token);
      fetch('http://localhost:8080/api/hello',{
      headers: {
        'Authorization': 'Bearer '+token}
    }).then(res => res.text()).then(data => alert(data));
    console.log("로그인 성공!");
    const uid = result.user.uid;
    const docRef = doc(db, "cakes", uid);
    getDoc(docRef).then((docSnap) =>
    {if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.nickname && data.flavorId && data.birthdate) {
        navigate('/mycake'); // 생성된 케이크 화면으로 수정하기
      } else {
    navigate('/home');
    }} else {
    navigate('/home');}
  
  });

     } )});
    
  }).catch((error)=> {
    console.error("로그인 실패: ",error);
  });};
return (
  <div style={{padding:'50px', textAlign:'center', backgroundColor:'#FFE8D8', height:'852px', width:'393px', backgroundImage:'url(../public/login-background.png)', backgroundRepeat:'no-repeat', backgroundPosition:'center'}}>
    <h1 style={{color:'black', fontFamily:'Gluten', paddingBottom:'30px', backgroundRepeat:'no-repeat', backgroundPosition:'center'}}>Put<br />Fruits<br />on<br />My Cake</h1>
    <div style={{paddingTop:'150px', display:'flex',flexDirection:'column', alignItems:'center', height:'330px', width:'293px'}}>
      <button style={{backgroundColor:'#fede07',color:'black', margin:'10px', padding:'15px 50px', fontSize:'16px'}}>카카오톡으로 로그인하기</button>
      <br />
      <button style={{backgroundColor:'white',color:'black',margin:'10px', padding:'15px 70px', fontSize:'16px'}} onClick={handleLogin}>구글로 로그인하기</button>
      <br />
      <button style={{backgroundColor:'#a9a9a9',color:'black',margin:'10px', padding:'15px 50px', fontSize:'16px'}}>비회원으로 로그인하기</button>
      <br />
      {/* 로그아웃 기능 필요 시 활용 -> <button onClick={() => {auth.signOut(); setUser(null);}} style={{backgroundColor:'#a9a9a9',color:'black',margin:'10px', padding:'15px 50px'}}>로그아웃 하기</button> */}
    </div>
    
  </div>
);
}
export default Login;