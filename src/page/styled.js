import Styled from "styled-components";
import loginBg from "../static/images/login-bg.png";

const LoginPageMain = Styled.div`
    height: 100%;
    min-height: 100vh;
    width: 100%;    
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${loginBg});
`;

const LoginPageFormDiv = Styled.div`
    width: 450px;
    background-color: black;
    padding: 32px;
    border-radius: 16px;
    * {
        color: white !important; 
    }
    .ant-form-item-explain-error{
        color:red !important;
    }
    input{
        color: black !important;
    }
    button{
        padding: 16px;
        margin:16px 0;
        min-width: 90px !important;
    }
    .registerBtn, .loginBtn{
        color: #979797 !important;
        margin-right: 8px;
    }
    .registerBtn:hover, .loginBtn:hover{
       text-decoration: underline;
       color: white !important;
    }
    .img-wrapper{
        text-align:center;
    }
    img{
        max-width: 95%;
        margin: 16px 0;
    }
    .ant-form-item {
        margin: 16px 0 !important;
    }
    .op-area{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
  
`;

export { LoginPageMain, LoginPageFormDiv };
