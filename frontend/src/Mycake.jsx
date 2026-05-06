import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import backImg from "./images/back.png";
import "./Mycake.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.js";
import { auth } from "./Login.jsx";

function Mycake() {
  const { sharingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
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
    navigate("/Deco");
  };

  const isGuest = auth.currentUser?.isAnonymous;

  const [nickname, setNickname] = useState("정보 불러오는 중...");
  const [flavorId, setFlavorId] = useState("정보 불러오는 중...");
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "cakes", sharingId);
        getDoc(docRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const nickname = snapshot.data().nickname;
              setNickname(nickname);
              const flavorId = snapshot.data().flavorId;
              setFlavorId(flavorId);
            }
          })
          .catch((error) => {
            console.error("Firestore 에러: ", error);
            setNickname("데이터를 가져오지 못했습니다..");
          });
      } else {
        setNickname("로그인이 필요합니다.");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleShareCopyClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 공유 링크가 복사되었습니다!");
    } catch (error) {
      console.error("클립보드 복사 실패: ", error);
      alert("공유 링크 복사에 실패했습니다.");
    }
  };

  const handleMyCakeCopyClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(
        "클립보드에 내 케이크 링크가 복사되었습니다! 해당 링크가 있어야 다시 이 페이지에 진입하실 수 있습니다.",
      );
    } catch (error) {
      console.error("클립보드 복사 실패: ", error);
      alert("내 케이크 링크 복사에 실패했습니다.");
    }
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${backImg})`,
        position: "relative",
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

      <div className="footer">
        <div className="pagination">
          {`<< ${currentPage} / ${totalPages} >>`}
        </div>

        {isGuest && (
          <button
            style={{
              position: "absolute",
              bottom: "200px",
              right: "10%",
              fontSize: "16px",
              padding: "10px 15px",
              borderRadius: "50px",
              background: "none",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              border: "1px solid #ccc",
              zIndex: 2000, // 다른 요소보다 위에 오도록
              cursor: "pointer",
            }}
            onClick={() => {
              handleMyCakeCopyClipboard(
                `http://localhost:5173/MyCake/${sharingId}`,
              );
            }}
          >
            내 케이크
          </button>
        )}

        <button
          className="Button"
          onClick={() => {
            if (sharingId) {
              handleShareCopyClipboard(
                `http://localhost:5173/birthdayCake/${sharingId}`,
              );
            } else {
              alert("공유할 케이크가 없습니다.");
            }
          }}
        >
          내 케이크 공유하기
        </button>
      </div>
    </div>
  );
}
export default Mycake;
