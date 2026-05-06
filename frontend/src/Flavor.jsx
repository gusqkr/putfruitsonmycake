import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { auth } from "./Login.jsx";
function Flavor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const user = auth.currentUser;
  if (!user) {
    alert("로그인이 필요합니다.");
    return;
  }
  const step1Data = location.state;

  const handleSubmit = (index) => {
    try {
      const updatedData = {
        ...step1Data,
        flavorId: cakeData[index].id,
      };
      navigate(`/birth/${id}`, { state: updatedData });
    } catch (error) {
      console.error("케이크 맛 전송 실패: ", error);
    }
  };

  const cakeData = [
    {
      id: "whipped-cream",
      img_path: "../public/whipped-cream-cake.png",
      flavor: "생크림 케이크",
    },
    {
      id: "chocolate",
      img_path: "../public/chocolate-cake.png",
      flavor: "초코 케이크",
    },
    {
      id: "cheese",
      img_path: "../public/cheese-cake.png",
      flavor: "치즈 케이크",
    },
    {
      id: "matcha",
      img_path: "../public/matcha-cake.png",
      flavor: "말차 케이크",
    },
  ];
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? cakeData.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setIndex((prevIndex) =>
      prevIndex === cakeData.length - 1 ? 0 : prevIndex + 1,
    );
  };
  return (
    <div
      style={{
        backgroundColor: "#C8A799",
        height: "852px",
        width: "393px",
        backgroundImage: "url(../public/cake.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <p
        style={{
          textAlign: "center",
          color: "#6A4444",
          fontFamily: "Gluten",
          padding: "80px 40px 30px 30px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Put Fruits on My Cake
      </p>
      <p
        style={{
          textAlign: "center",
          backgroundColor: "#A3816E",
          color: "#4A3C3C",
          fontFamily: "Gluten",
          fontSize: "35px",
          fontWeight: "bolder",
          margin: "15px 30px",
          borderRadius: "17px",
          paddingTop: "10px",
        }}
      >
        CAKE RECIPE
      </p>
      <div
        style={{
          backgroundColor: "#FADCCB",
          margin: "0px 30px",
          borderRadius: "17px",
          padding: "5px 20px",
          height: "500px",
        }}
      >
        <p
          style={{
            color: "#4A3C3C",
            fontFamily: "Gluten",
            fontSize: "20px",
            fontWeight: "bolder",
            margin: "15px 10px 0 0",
          }}
        >
          Step 2 of making a cake
        </p>
        <hr style={{ border: "1px solid #4A3C3C" }} />
        <div
          style={{ color: "#000000", marginTop: "20px", marginLeft: "10px" }}
        >
          케이크는 무슨 맛으로 할까요?
        </div>
        <div style={{ marginTop: "70px" }}>
          <button
            onClick={handlePrev}
            style={{
              background: "none",
              fontSize: "20px",
              paddingLeft: "5px",
              color: "#584949",
              outline: "none",
            }}
          >
            ◀
          </button>
          <img
            src={cakeData[index].img_path}
            alt={cakeData[index].flavor}
            style={{ width: "190px", height: "auto" }}
          />
          <button
            onClick={handleNext}
            style={{
              background: "none",
              fontSize: "20px",
              paddingRight: "5px",
              color: "#584949",
              outline: "none",
            }}
          >
            ▶
          </button>
        </div>
        <p
          style={{
            textAlign: "center",
            color: "black",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          {cakeData[index].flavor}
        </p>
      </div>
      <div style={{ margin: "20px 30px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            width: "100px",
            marginRight: "10px",
            background: "none",
            border: "1px solid #ffffff",
          }}
        >
          이전
        </button>
        <button
          onClick={() => {
            handleSubmit(index);
          }}
          style={{ width: "220px", background: "#EF5B5B" }}
        >
          다음으로
        </button>
      </div>
    </div>
  );
}
export default Flavor;
