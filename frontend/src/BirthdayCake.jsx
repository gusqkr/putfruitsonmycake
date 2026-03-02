import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backImg from "./back.png";
import "./BirthdayCake.css";

function BirthdayCake() {
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

  return (
    <div 
      className="app" 
      style={{ 
        backgroundImage: `url(${backImg})`,
      }}
    >
      <div className="header">
        <h1 className="name">(생성자) 님의 생일 케이크</h1>
        <p className="count">N개의 편지가 도착했어요!</p>
      </div>
      <img src="../public/Cake.png" />

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
      <div className="pagination">
        {`<< ${currentPage} / ${totalPages} >>`}
      </div>

      <button className="Button" onClick={goToDeco}>케이크 꾸며주기</button>
      </div>

    </div>
  );
}
export default BirthdayCake;