import React, { useEffect, useState } from "react";
import './Deco.css';
import { useNavigate } from "react-router-dom";
import { Letter } from './script.js';
import Strawberry from "./images/Strawberry.png";
import Dubai from "./images/Dubai.png";
import Chocolate from "./images/Chocolate.png";
import Cream from "./images/Cream.png";
import Blueberry from "./images/Blueberry.png";
import shineMuscat from "./images/shinemuscat.png";

function Deco() {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    Letter();
  }, []);

  const goToPaper = () => {
    if (!selectedTheme) {
      alert("데코 디자인을 먼저 선택해 주세요! 🍓");
      return;
    }
    navigate('/Paper', { state: { theme: selectedTheme } });
  };

  const goToBirthdayCake = () => {
    navigate('/birthdayCake');
  };

  const themes = [
    { id: "strawberry", src: Strawberry, name: "딸기" },
    { id: "shineMuscat", src: shineMuscat, name: "샤인머스켓" },
    { id: "Dubai", src: Dubai, name: "두바이 쫀득 쿠키" },
    { id: "chocolate", src: Chocolate, name: "초콜릿" },
    { id: "blueberry", src: Blueberry, name: "블루베리" },
    { id: "cream", src: Cream, name: "생크림" },
  ];

  return (
    <div className="app">
      <div className="title-box">
        데코 디자인을 골라주세요
      </div>
    
      <div className="grid">
        {themes.map((t) => (
          <div 
            key={t.id}
            className={`item ${selectedTheme === t.id ? 'active' : ''}`}
            onClick={() => setSelectedTheme(t.id)}
          >
            
            <div className="icon">
              <img src={t.src}/>
            </div>

            <p>{t.name}</p>
          </div>
        ))}
      </div>

      <div className="bottom-buttons">
        <button className="cancel" onClick={goToBirthdayCake}>취소</button>
        <button className="submit" onClick={goToPaper}>
          편지 쓰러가기
        </button>
      </div>
    </div>
  );
}

export default Deco;