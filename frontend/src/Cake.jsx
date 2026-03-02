import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { auth } from "./Login.jsx";

function Cake() {



    const [name, setName] = useState('');

    const handleSubmit = async () => {
        const user = auth.currentUser;
        console.log("현재 사용자: ", user);
        if (!user) {
            alert("로그인이 필요합니다.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/make-cake/nickname', {
                uid : user.uid,
                nickname :name});
            if (response.data === "OK"){
                alert(name + " 제빵사님! 환영합니다.");
            }
        } catch (error) {
            console.error("제빵사 이름 저장 실패: ", error);
        }
    }
    const navigate = useNavigate();
        const goToFlavor = () => {
            navigate('/flavor'); }
    return (
        <div style={{ backgroundColor:'#C8A799', height:'852px', width:'393px', backgroundImage:'url(../public/cake.png)', backgroundRepeat:'no-repeat', backgroundPosition:'center'}}>
            <p style={{textAlign:'center',color:'#6A4444', fontFamily:'Gluten', padding:'80px 40px 30px 30px', fontSize:'20px', fontWeight:'bold'}}>Put Fruits on My Cake</p>
            <p style={{textAlign:'center',backgroundColor:'#A3816E',color:'#4A3C3C', fontFamily:'Gluten', fontSize:'35px', fontWeight:'bolder', margin:'15px 30px', borderRadius:'17px', paddingTop:'10px'}}>CAKE RECIPE</p>
            <div style={{backgroundColor:'#FADCCB', margin:'0px 30px', borderRadius:'17px', padding:'5px 20px', height:'500px'}}>
                <p style={{color:'#4A3C3C', fontFamily:'Gluten', fontSize:'20px', fontWeight:'bolder', margin:'15px 10px 0 0'}}>Step 1 of making a cake</p>
                <hr style={{border:'1px solid #4A3C3C'}}/>
                <div style={{color:'#000000', marginTop:'20px', marginLeft:'10px'}}>제빵사님, 이름을 알려주세요!</div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{background:'none', color:'#000000', border:'none', borderBottom:'1px solid #000000', outline:'none', marginTop:'20px', marginLeft:'10px'}} />
            </div>
            <div style={{margin:'20px 30px'}}>
                <button onClick={() => navigate(-1)} style={{width:'100px', marginRight:'10px', background:'none', border:'1px solid #ffffff'}}>이전</button>
                <button onClick={() => { handleSubmit(); goToFlavor(); }} style={{width:'220px', background:'#EF5B5B'}}>다음으로</button>
            </div>
        </div>
    );
}
export default Cake;