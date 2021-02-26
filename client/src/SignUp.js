import React, {useState} from 'react';
import axios from 'axios';
import style from './SignUp.module.css';

function SignUp() {

  const [email, setEmail] = useState("");
  const emailHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  }

  const [password, setPassword] = useState("");
  const passwordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  }
  const [passwordChk, setPasswordChk] = useState("");
  const passwordChkHandler = (e) => {
    e.preventDefault();
    setPasswordChk(e.target.value);
  }

  const [nickname, setNickname] = useState("");
  const nicknameHandler = (e) => {
    e.preventDefault();
    setNickname(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    var cnt = 0;
    var alertStr = '';
    if (email.length > 40) {
      alertStr += `${++cnt}. 이메일은 40자 이하여야 합니다.\n`;
    }
    var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailFormat.test(email)) {
      alertStr += `${++cnt}. 이메일이 형식에 맞지 않습니다.\n`;
    }
    if (password.length < 8) {
      alertStr += `${++cnt}. 비밀번호는 8자리 이상이어야 합니다.\n`;
    }
    if (password !== passwordChk) {
      alertStr += `${++cnt}. 비밀번호가 맞지 않습니다.\n`;
    }
    if (nickname.length > 12) {
      alertStr += `${++cnt}. 닉네임은 12자 이하여야 합니다.\n`;
    }
    var nicknameFormat = /^[가-힣a-zA-Z]+$/;
    if (!nicknameFormat.test(nickname)) {
      alertStr += `${++cnt}. 닉네임은 한글과 영어로만 이루어져야 합니다.\n`;
    }

    // TODO: post 구현
    if (cnt !== 0) alert(alertStr);
    console.log(`
      이메일: ${email}
      비밀번호: ${password}
      비밀번호 확인: ${passwordChk}
      닉네임: ${nickname}
    `
    );

    axios.post('/register/check', {
      nickname: "lolmc",
      email: "lsh000805@naver.com"
    })

  }
  return (
    <form method="post" className={style.container} onSubmit={submitHandler}>
      <label htmlFor="sign-up-with-email">이메일로 회원가입</label>
      <div>
        <input className={`${style.input} ${style.small}`} type="text" value={email} placeholder="이메일을 입력하세요." id="sign-up-with-email" onChange={emailHandler}></input>
        <button type="button" className={`${style.chk} ${style.button}`}>중복 확인</button>
      </div>
      <label htmlFor="password">비밀번호</label>
      <input className={style.input} type="password" id="password" onChange={passwordHandler}></input>
      <label htmlFor="chk-password">비밀번호 확인</label>
      <input className={style.input} type="password" id="chk-password" onChange={passwordChkHandler}></input>
      <label htmlFor="nickname">닉네임</label>
      <div>
        <input className={`${style.input} ${style.small}`} type="text" id="nickname" onChange={nicknameHandler}></input>
        <button type="button" className={`${style.chk} ${style.button}`}>중복 확인</button>
      </div>

      <button className={style.button}>회원가입</button>
    </form>
  );
}

export default SignUp;