import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.js";
import "./Paper.css";
import strawberry from "./images/Strawberry.png";
import Dubai from "./images/Dubai.png";
import chocolate from "./images/Chocolate.png";
import cream from "./images/Cream.png";
import blueberry from "./images/Blueberry.png";
import shineMuscat from "./images/shinemuscat.png";
import { Letter } from "./script.js";

function Paper() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [ownerNickname, setOwnerNickname] = useState("정보 불러오는 중...");
  const theme = location.state?.theme || "strawberry";

  const [sender, setSender] = useState("");
  const [content, setContent] = useState("");
  const maxLength = 850;

  const handleSave = async () => {
    if (!sender || !content) {
      alert("닉네임과 내용을 모두 입력해주세요!");
      return;
    }

    const letterData = {
      sender: sender,
      content: content,
      ornamentId: theme,
    };

    try {
      await axios.post(`http://localhost:8080/${sender}`, letterData);
      alert("편지가 성공적으로 저장되었습니다!");
      navigate(`/birthdayCake/${id}`);
    } catch (error) {
      console.error("편지 저장 에러:", error);
      alert("서버 연결에 실패했습니다.");
    }
  };

  useEffect(() => {
    Letter();
  }, []);

  const goToDeco = () => {
    navigate(`/Deco/${id}`);
  };

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
    shineMuscat: shineMuscat,
  };

  const docRef = doc(db, "cakes", id);
  getDoc(docRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const ownerNickname = snapshot.data().nickname;
        setOwnerNickname(ownerNickname);
      }
    })
    .catch((error) => {
      console.error("Firestore 에러: ", error);
      setOwnerNickname("데이터를 가져오지 못했습니다..");
    });

  return (
    <div className={`app ${theme}`}>
      <div className="header">
        <p style={{ textAlign: "left", fontSize: "25px" }}>
          {ownerNickname}님에게
          <br />
          축하의 메세지를 남겨주세요!
        </p>
      </div>

      <div className="sticker">
        <img src={themeImg[theme]} />
      </div>

      <div className="card-background">
        <div className="card">
          <span className="from-label">from.</span>
          <textarea
            className="from-input"
            placeholder="닉네임을 입력하세요"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          ></textarea>

          <div className="divider"></div>

          <textarea
            className="letter-input"
            maxLength={maxLength}
            placeholder="편지를 작성하세요"
            value={content}
            onChange={handleContentChange}
          ></textarea>

          <div className="count">
            {content.length} / {maxLength}
          </div>
        </div>

        <div className="buttons">
          <button className="cancel" onClick={goToDeco}>
            취소
          </button>
          <button className="submit" onClick={handleSave}>
            작성 완료
          </button>
        </div>
      </div>

      <script src="script.js"></script>
    </div>
  );
}

export default Paper;
