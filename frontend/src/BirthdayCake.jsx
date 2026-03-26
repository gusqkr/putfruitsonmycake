import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import backImg from "./images/back.png";
import axios from "axios";
import "./BirthdayCake.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import axios from "axios";
import { db } from "./firebase.js";

function BirthdayCake() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 100;
  const { id } = useParams();
  const [cake, setCake] = useState(null);
  const [loading, setLoading] = useState(true);

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
    navigate("/Deco");
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/birthdayCake/${id}`)
      .then((response) => {
        setCake(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 데 실패했습니다.", error);
        alert("존재하지 않는 케이크입니다.");
        navigate("/");
      });
  }, [id, navigate]);

  if (loading) return <div>케이크 정보를 분석 중입니다...</div>;

  const currentLetters = letters.slice(
    (currentPage - 1) * lettersPerPage,
    currentPage * lettersPerPage
  );

  const goToPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${backImg})`,
      }}
    >
      <div className="header">
        <h1 className="name">{cake.nickname}님의 생일 케이크</h1>
        <p className="count">N개의 편지가 도착했어요!</p>
      </div>
      <img width="70%" height="auto" src={`/${cake.flavorId}-cake.png`} />

      <img src="../public/Cake.png" alt="Cake" />

      <button className="nav-btn prev" onClick={goToPrev}>◀</button>
      <button className="nav-btn next" onClick={goToNext}>▶</button>

      <div className="cake-decoration-area">
        {currentLetters.map((letter, index) => (
          <div key={letter.id || index} className={`deco-item item-${index + 1}`}>
            <span style={{fontSize: '30px'}}>
              {letter.ornamentId === 'strawberry' ? '🍓' : 
               letter.ornamentId === 'Dubai' ? '🍫' : '🍎'}
            </span>
            <div className="sender-name">{letter.sender}</div>
          </div>
        ))}
      </div>

      <div className="footer">
        <div className="pagination">
          {`<< ${currentPage} / ${totalPages} >>`}
        </div>

        <button className="Button" onClick={goToDeco}>
          케이크 꾸며주기
        </button>
      </div>
    </div>
  );
}
export default BirthdayCake;
