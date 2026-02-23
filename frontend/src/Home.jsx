import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const goToCake = () => {
        navigate('/cake');
    }
    return (
        <div style={{textAlign:'center', backgroundColor:'#FFE8D8', height:'852px', width:'393px', backgroundImage:'url(../public/home.png)', backgroundRepeat:'no-repeat'}}>
            <p style={{fontFamily:'Gluten', padding:'80px 40px 30px 30px', fontSize:'20px', fontWeight:'bold'}}>Put Fruits on My Cake</p>
            <p style={{fontSize:'15px', marginTop:'550px', marginBottom:'10px'}}>케이크를 만들고 토핑들을 받아보세요! </p>
            <button onClick={goToCake} style={{backgroundColor:'#C0C0C0', color:'black', padding:'10px 50px', borderRadius:'20px', fontWeight:'bold'}}>케이크 만들기</button>
        </div>
    );
}   
export default Home;