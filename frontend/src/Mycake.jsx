import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backImg from "./images/back.png";
import "./Mycake.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.js";

function Mycake() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 100;

  const decoItems = [
    { id: 1, icon: "🍓" },
    { id: 2, icon: "🍫" },
    { id: 3, icon: "🍪" },
    { id: 4, icon: "🟢" },
    { id: 5, icon: "🫐" },
    { id: 6, icon: "🍦" },
    { id: 7, icon: "🍓" },
  ];

  const goToDeco = () => {
    navigate('/Deco');
  };

  const [nickname, setNickname] = useState("정보 불러오는 중...");
  const [flavorId, setFlavorId] = useState("정보 불러오는 중...");
  useEffect(() => {
  const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, (user) => {

  if (user){
    const docRef = doc(db, "cakes", user.uid);
    getDoc(docRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
            const nickname = snapshot.data().nickname;
            setNickname(nickname);
            const flavorId = snapshot.data().flavorId;
            setFlavorId(flavorId);
    }
  }).catch((error) => {
    console.error("Firestore 에러: ", error);
    setNickname("데이터를 가져오지 못했습니다..");
});
} else {
    setNickname("로그인이 필요합니다.");
} 
});
return () => unsubscribe(); 
}, []);

const [showPopup, setShowPopup] = useState(false);
const togglePopup = (event) => {
  setShowPopup(event.target.value);
};
  
  return (
    <div 
      className="app" 
      style={{ 
        backgroundImage: `url(${backImg})`,
      }}
    >
      <div className="header">
        <h1 className="name">{nickname} 님의 생일 케이크</h1>
        <p className="count">N개의 편지가 도착했어요!</p>
      </div>
      <img width="70%" height="auto" src={`../public/${flavorId}-cake.png`} />

      <button className="nav-btn prev">◀</button>
      <button className="nav-btn next">▶</button>

      <div className="cake-decoration-area">
        {decoItems.map((item, index) => (
          <div key={item.id} className={`deco-item item-${index + 1}`}>
            {item.icon}
          </div>
        ))}
      </div>

      <div className = "footer">
      <div className="pagination" style={{display: showPopup ? "none" : "revert"}}>
        {`<< ${currentPage} / ${totalPages} >>`}
      </div>

      <button className="Button" onClick={togglePopup} value={'false'} style={{display: showPopup ? "none" : "revert"}}>내 케이크 공유하기</button>
      { showPopup ? (
        <div className="popup" style={{backgroundColor:'pink', width:'100%', padding:'10px', paddingBottom:'30px'}}>
          <h2>공유하기</h2>
          <p>공유하기 기능은 현재 준비 중입니다.</p>
          <button onClick={togglePopup}>닫기</button>
        </div>
      ) : null }
      </div>

    </div>
  );
}
export default Mycake;