import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "./firebase.js";
import { useState } from "react";

function Birth() {
    const [year, setYear] = useState('2026');
    const [month, setMonth] = useState('1');
    const [day, setDay] = useState('1');

    const handleSubmit = async () => {
        const user = auth.currentUser;
        console.log("현재 사용자: ", user);
        if (!user) {
            alert("로그인이 필요합니다.");
            return;
        }
        try {
            const birthdate = `${year}-${month}-${day}`;
            const response = await axios.post('http://localhost:8080/api/make-cake/birth', {
                uid : user.uid,
                birthdate :birthdate});
            if (response.data === "OK"){
                alert(birthdate + "로 생일이 등록되었습니다!");
            }
        } catch (error) {
            console.error("생일 등록 실패: ", error);
        }
    }

    const navigate = useNavigate();
        //const goToFlavor = () => {
           // navigate('/flavor'); }
    return (
        <div style={{ backgroundColor:'#C8A799', height:'852px', width:'393px', backgroundImage:'url(../public/cake.png)', backgroundRepeat:'no-repeat', backgroundPosition:'center'}}>
            <p style={{textAlign:'center',color:'#6A4444', fontFamily:'Gluten', padding:'80px 40px 30px 30px', fontSize:'20px', fontWeight:'bold'}}>Put Fruits on My Cake</p>
            <p style={{textAlign:'center',backgroundColor:'#A3816E',color:'#4A3C3C', fontFamily:'Gluten', fontSize:'35px', fontWeight:'bolder', margin:'15px 30px', borderRadius:'17px', paddingTop:'10px'}}>CAKE RECIPE</p>
            <div style={{backgroundColor:'#FADCCB', margin:'0px 30px', borderRadius:'17px', padding:'5px 20px', height:'500px'}}>
                <p style={{color:'#4A3C3C', fontFamily:'Gluten', fontSize:'20px', fontWeight:'bolder', margin:'15px 10px 0 0'}}>Step 3 of making a cake</p>
                <hr style={{border:'1px solid #4A3C3C'}} />
                <div style={{color:'#000000', marginTop:'20px', marginLeft:'10px'}}>생일을 입력해 주세요!</div>
                <div style={{textAlign:'center', marginTop:'70px'}}>
                    <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="YYYY" required style={{background:'none', color:'#000000', border:'none', borderBottom:'1px solid #000000', outline:'none', margin:'15px 0', fontSize:'15px', paddingLeft:'10px'}} />
                    <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="MM" required style={{background:'none', color:'#000000', border:'none', borderBottom:'1px solid #000000', outline:'none', margin:'15px 0', fontSize:'15px', paddingLeft:'10px'}} />
                    <input type="text" value={day} onChange={(e) => setDay(e.target.value)} placeholder="DD" required style={{background:'none', color:'#000000', border:'none', borderBottom:'1px solid #000000', outline:'none', margin:'15px 25px 25px 25px ', fontSize:'15px', paddingLeft:'12px'}} />
                </div>
            </div>
            <div style={{margin:'20px 30px'}}>
                <button onClick={() => navigate(-1)} style={{width:'100px', marginRight:'10px', background:'none', border:'1px solid #ffffff'}}>이전</button>
                <button onClick={() => {handleSubmit();}} style={{width:'220px', background:'#EF5B5B'}}>다음으로</button>
            </div>
        </div>
    );
}
export default Birth;