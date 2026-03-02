import React, { useEffect, useState } from "react";
import './Deco.css';
import { useNavigate } from "react-router-dom";
import { Letter } from './script.js';

function Deco() {
  const navigate = useNavigate();
  // 사용자가 선택한 테마 아이디를 관리합니다.
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    Letter();
  }, []);

  // '편지 쓰러가기' 버튼 클릭 시 실행
  const goToPaper = () => {
    if (!selectedTheme) {
      alert("데코 디자인을 먼저 선택해 주세요! 🍓");
      return;
    }
    // 선택된 theme 데이터를 state에 담아 Paper 페이지로 이동합니다.
    navigate('/Paper', { state: { theme: selectedTheme } });
  };

  const goToBirthdayCake = () => {
    navigate('/birthdayCake');
  };

  // 테마 리스트 데이터 (CSS 클래스명과 매칭)
  const themes = [
    { id: "strawberry", icon: "🍓", name: "딸기" },
    { id: "shineMuscat", icon: "🟢", name: "샤인머스켓" },
    { id: "Dubai", icon: "🍪", name: "두바이 쫀득 쿠키" },
    { id: "chocolate", icon: "🍫", name: "초콜릿" },
    { id: "blueberry", icon: "🫐", name: "블루베리" },
    { id: "cream", icon: "🍦", name: "생크림" },
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
            <div className="icon">{t.icon}</div>
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