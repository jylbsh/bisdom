"use client"
import styled from "styled-components"
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import x1 from '../../assets/image/logo.png';
import "./Login.css";
import axios from "axios";

const buttonColor = '#4A52A7';
const Header = styled.header`
display:flex;
justify-content:left;
background-color:${buttonColor};
`
const Logo = styled.img`
width:20vw;
height:auto;
filter: brightness(0) saturate(100%) invert(92%) sepia(93%) saturate(0%) hue-rotate(202deg) brightness(106%) contrast(106%);
`
const StyledLink = styled.a`
color:blue;
cursor:pointer;
text-decoration:underline;
&:hover{
color:green}
&:visited{
color:purple}
`
export const StyledButton = styled.button`
text-align:center;
position:relative;
border-radius: 0.5rem;
height:2rem;
width:10rem;
display:inline-block;
color:white;
border: 1px solid;
background-color: ${buttonColor};
cursor:pointer;
&:hover{
height:2.5rem;
width:11rem;
font-size:1.1rem;
background-color:${buttonColor}56;}
`
const BaseLogoBackground = styled.div`
width:500vw;
height:500vh;
background-size:12rem;
top:0;
left:0;
position:fixed;
background-image:url(${x1});
background-repeat:repeat;
background-position:center;
transform:rotate(45deg) translateX(-700px) translateY(200px);
transform-origin:center;
`
const Wrapper = styled.div`
width:40vw;
height:40vh;
min-width:220px;
max-width:340px;
margin:15vh auto;
border-radius:2rem;
border:2px solid purple;
background-color:white;
display:flex;
flex-direction:column;
gap:8px;
justify-content:center;
align-items:center;
text-align:left;
`
const WrapperInput = styled.div`
width:10rem;
input{
height:1.5rem;
border-radius:0.5rem;}
`

const Login = () => {
    const {isAuthenticated, login, logout} = useAuth();
    const navigate = useNavigate();
    
    // 認証状態が変わったときにリダイレクトする
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // ログイン処理
    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/log-in`, {
                id,
                password,
            });

            if (response.data.authToken) {
                login(response.data.authToken); // 認証状態を更新
                localStorage.setItem("authToken", response.data.authToken); // トークンをローカルストレージに保存
                navigate("/"); // ホームページにリダイレクト
            }
        } catch (err) {
            setError("Invalid username or password."); // エラーメッセージを設定
            console.error("Login error", err);
        }
    };

    // ログアウト処理
    const handleLogout = () => {
        logout(); // 認証状態を更新
        navigate("/login"); // ログインページにリダイレクト
    };

    return (
        <>
            <Header>
                <Logo src={x1}></Logo>
            </Header>
            {!isAuthenticated &&
                <Wrapper>
                    <WrapperInput>
                        <label htmlFor="employee_id">ユーザーID</label>
                        <input type="input" id="employee_id" onChange={(e) => { setId(e.target.value); console.log(id) }}></input>
                    </WrapperInput>
                    <WrapperInput>
                        <label htmlFor="password">パスワード</label>
                        <input type="input" id="password" onChange={(e) => { setPassword(e.target.value) }}></input>
                    </WrapperInput>
                    <StyledButton onClick={handleLogin}>
                        ログイン
                    </StyledButton>
                    <StyledLink onClick={() => { console.log("a") }}>パスワードお忘れですか？</StyledLink>
                </Wrapper>
            }
        </>
    );
}

export default Login;
