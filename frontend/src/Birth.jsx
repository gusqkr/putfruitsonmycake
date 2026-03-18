import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "./firebase.js";
import { useState } from "react";

function Birth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const handleSubmit = async () => {
    const user = auth.currentUser;
    console.log("현재 사용자: ", user);
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      if (
        year < 1900 ||
        year > new Date().getFullYear() ||
        month < 1 ||
        month > 12 ||
        day < 1 ||
        day > 31
      ) {
        alert("올바른 날짜를 입력해주세요.");
        return;
      } else {
        const prevData = location.state;
        const nickname = prevData.nickname;
        const flavorId = prevData.flavorId;

        const birthdate = `${year}-${month}-${day}`;
        const response = await axios.post(
          "http://localhost:8080/api/make-cake",
          {
            uid: user.uid,
            nickname: nickname,
            flavorId: flavorId,
            birthdate: birthdate,
          },
        );
        const generatedId = response.data;
        console.log("생성된 케이크 ID: ", generatedId);
        alert("케이크가 생성되었습니다!");
        navigate("/mycake", { state: { SharingId: generatedId } });
      }
    } catch (error) {
      console.error("생일 등록 실패: ", error);
    }
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
          Step 3 of making a cake
        </p>
        <hr style={{ border: "1px solid #4A3C3C" }} />
        <div
          style={{ color: "#000000", marginTop: "20px", marginLeft: "10px" }}
        >
          생일을 입력해 주세요!
        </div>
        <div style={{ textAlign: "center", marginTop: "70px" }}>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="YYYY"
            required
            style={{
              background: "none",
              color: "#000000",
              border: "none",
              borderBottom: "1px solid #000000",
              outline: "none",
              margin: "15px 0",
              fontSize: "15px",
              paddingLeft: "10px",
            }}
          />
          <input
            type="number"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="MM"
            required
            style={{
              background: "none",
              color: "#000000",
              border: "none",
              borderBottom: "1px solid #000000",
              outline: "none",
              margin: "15px 0",
              fontSize: "15px",
              paddingLeft: "10px",
            }}
          />
          <input
            type="number"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            placeholder="DD"
            required
            style={{
              background: "none",
              color: "#000000",
              border: "none",
              borderBottom: "1px solid #000000",
              outline: "none",
              margin: "15px 25px 25px 25px ",
              fontSize: "15px",
              paddingLeft: "12px",
            }}
          />
        </div>
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
            handleSubmit();
          }}
          style={{ width: "220px", background: "#EF5B5B" }}
        >
          다음으로
        </button>
      </div>
    </div>
  );
}
export default Birth;
