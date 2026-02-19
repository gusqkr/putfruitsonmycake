import React, { useEffect } from "react";
import './Deco.css';
import { useNavigate } from "react-router-dom";
import { Letter } from './script.js';

function Deco() {
    const navigate = useNavigate();
        const goToPaper = () => {
            navigate('/Paper');
        }

    useEffect(() => {
    Letter();
    }, []);

    return (
        <div>
        <div class="app">
    <div class="title-box">
      데코 디자인을 골라주세요
    </div>

    <div class="grid">
      <div class="item" data-theme="strawberry">
        <div class="icon">🍓</div>
        <p>딸기</p>
      </div>

      <div class="item" data-theme="shineMuscat">
        <div class="icon">🟢</div>
        <p>샤인머스켓</p>
      </div>

      <div class="item" data-theme="Dubai">
        <div class="icon">🍪</div>
        <p>두바이 쫀득 쿠키</p>
      </div>

      <div class="item" data-theme="chocolate">
        <div class="icon">🍫</div>
        <p>초콜릿</p>
      </div>

      <div class="item" data-theme="blueberry">
        <div class="icon">🫐</div>
        <p>블루베리</p>
      </div>

      <div class="item" data-theme="cream">
        <div class="icon">🍦</div>
        <p>생크림</p>
      </div>
    </div>

    <div class="bottom-buttons">
      <button class="cancel">취소</button>
      <button class="submit" id="goLetter" onClick={goToPaper}>편지 쓰러가기</button>
    </div>

  </div>
  <script src="script.js"></script>
  </div>
  
    );
}
export default Deco;