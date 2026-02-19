import React, { useEffect, useState } from "react";
import './Paper.css';
import { Letter } from './script.js';


function Paper() {
  const [theme, setTheme] = useState(""); // 테마를 저장할 상태

  useEffect(() => {
    // 1. URL에서 테마 파라미터 가져오기
    const params = new URLSearchParams(window.location.search);
    const themeParam = params.get("theme");

    if (themeParam) {
      setTheme(themeParam); // 가져온 테마를 상태에 저장
    }

    Letter();
  }, []);

    return (
        <div>
            <div className={`app ${theme}`}>
    <div class="header">
      <p style="text-align: left; font-size: 25px;">(트리 생성자 닉네임)님에게<br/>축하의 메세지를 남겨주세요!</p>
    </div>

    <div class="card">
      <div class="from-section">
        <span class="from-label">from.</span>

        <textarea
          class="from-input"
          placeholder="닉네임을 입력하세요"
        ></textarea>

        <div class="divider"></div>
      </div>


      <textarea
        class="letter-input"
        maxlength="850"
        placeholder="편지를 작성하세요"
      ></textarea>

      <div class="count">0 / 850</div>
    </div>

    <div class="buttons">
      <button class="cancel">취소</button>
      <button class="submit">작성 완료</button>
    </div>
  </div>

  <script src="script.js"></script>
    </div>
        
)}
export default Paper;