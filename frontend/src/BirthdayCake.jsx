import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import backImg from "./images/back.png";
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

  const [letters, setLetters] = useState([]);
  const [lastTimestamp, setLastTimestamp] = useState(null);
  const pageSize = 7;

  const goToDeco = () => {
    navigate(`/Deco/${id}`);
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

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/letters/${id}/paging`,
          {
            params: {
              lastTimestamp: currentPage > 1 ? lastTimestamp : null,
              size: pageSize,
            },
          },
        );
        setLetters(response.data);
      } catch (error) {
        console.error("편지를 불러오는데 실패했습니다.", error);
      }
    };
    fetchLetters();
  }, [id, currentPage]);

  if (loading) return <div>케이크 정보를 분석 중입니다...</div>;

  const goToPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      fetchLetters(lastTimestamp); // 다음 데이터 호출
    }
  };

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

      {letters.map((letter, index) => {
        // 서버의 ornamentId와 일치하는 아이콘 데이터 찾기
        const iconData = decoItems.find(
          (item) => item.id === letter.ornamentId,
        );

        return (
          <div
            key={letter.id || index}
            // index가 0이면 item-1, 1이면 item-2 클래스가 붙음
            className={`deco-item item-${index + 1}`}
            onClick={() =>
              alert(`${letter.sender}님의 편지: ${letter.content}`)
            }
            style={{ cursor: "pointer" }}
          >
            {iconData ? iconData.icon : "💌"}
          </div>
        );
      })}

      <button className="nav-btn prev" onClick={goToPrev}>
        ◀
      </button>
      <button className="nav-btn next" onClick={goToNext}>
        ▶
      </button>

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
