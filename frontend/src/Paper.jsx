import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Paper.css';
import strawberry from "./images/Strawberry.png";
import Dubai from "./images/Dubai.png";
import chocolate from "./images/Chocolate.png";
import cream from "./images/Cream.png";
import blueberry from "./images/Blueberry.png";
import shineMuscat from "./images/shinemuscat.png";
import { Letter } from './script.js';

function Paper() {
  const location = useLocation();
  const navigate = useNavigate();
  // Deco 컴포넌트에서 navigate로 보낸 theme 값을 가져옵니다.
  const theme = location.state?.theme || "strawberry"; 

  useEffect(() => {
    Letter();
  }, []);

  const goToDeco = () => {
    navigate('/Deco');
  };

  const goToBirthdayCake = () => {
    navigate('/birthdayCake');
  };

  const [content, setContent] = useState("");
  const maxLength = 850;

  const handleContentChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setContent(e.target.value);
    }
  };

  const themeImg = {
    strawberry: strawberry,
    Dubai: Dubai,
    chocolate: chocolate,
    cream: cream,
    blueberry: blueberry,
    shineMuscat: shineMuscat
  };
  

  return (
    <div className={`app ${theme}`}>
      <div className="header">
        <p style={{textAlign: "left", fontSize: "25px"}}>(트리 생성자 닉네임)님에게<br/>축하의 메세지를 남겨주세요!</p>
      </div>

      <div className="sticker">
          <img src={themeImg[theme]}/>
      </div>


      <div className="card-background">
        <div className="card">
          <span className="from-label">from.
          </span>
          <textarea
            className="from-input"
            placeholder="닉네임을 입력하세요"
          ></textarea>

          <div className="divider"></div>


          <textarea
            className="letter-input"
            maxLength={maxLength}
            placeholder="편지를 작성하세요"
            value={content}
            onChange={handleContentChange}
          ></textarea>

          <div className="count">{content.length} / {maxLength}</div>
        </div>

        <div className="buttons">
          <button className="cancel" onClick={goToDeco}>취소</button>
          <button className="submit" onClick={goToBirthdayCake}>작성 완료</button>
        </div>
      </div>

      <script src="script.js"></script>
    </div>
  );
}

export default Paper;