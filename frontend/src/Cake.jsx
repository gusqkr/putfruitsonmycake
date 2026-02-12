import React from "react";
function Cake() {
    return (
        <div style={{textAlign:'center', backgroundColor:'#C8A799', height:'852px', width:'393px', backgroundImage:'url(../public/cake.png)', backgroundRepeat:'no-repeat', backgroundPosition:'center'}}>
            <p style={{color:'#6A4444', fontFamily:'emoji', padding:'30px', fontSize:'20px', fontWeight:'bold'}}>Put Fruits on My Cake</p>
            <p style={{backgroundColor:'#A3816E',color:'#4A3C3C', fontSize:'35px', fontWeight:'bolder', margin:'15px 30px', borderRadius:'17px', padding:'10px 0px'}}>CAKE RECIPE</p>
            <p style={{backgroundColor:'#FADCCB',color:'#4A3C3C', fontSize:'20px', fontWeight:'bolder', margin:'0px 30px', borderRadius:'17px', padding:'10px 5px'}}>Step 1 of making a cake</p>
        </div>
    );
}
export default Cake;