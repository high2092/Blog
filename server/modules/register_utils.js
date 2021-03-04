const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
  });

module.exports = {
  sendRegisterMail : async (targetEmail, token) => {
    const mailOptions = {
      from: "블로그",
      to: targetEmail,
      subject: "블로그 회원가입 인증 메일입니다.",
      html: `<div>아래 링크로 접속하여 인증해주세요.</div>
        <div>http://localhost:${3000}/auth/?token=${token}</div>`
    };
    try {
      await smtpTransport.sendMail(mailOptions);
      return { success: true, message: "성공적으로 메일이 발송되었습니다." };
    } catch (err) {
      return { success: false, message: err };
    }
  },
  
  testIsValidEmail : (email) => {
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegEx.test(String(email).toLowerCase())){
      return { success: false, message: "올바른 이메일 형식이 아닙니다." };
    }
    return { success: true, message: "사용가능한 이메일입니다." };
  },
  
  testIsValidPassword : (password) => {
    if (password.length < 8) {
      return { success: false, message: "비밀번호는 최소 8글자 이상이어야 합니다." };
    }
    if (password.length > 20) {
      return { success: false, message: "비밀번호는 최대 20글자 이하여야 합니다." };
    }
    let passwordRegEx = /[a-zA-Z0-9!@#$%^&*]$/;
    if (!passwordRegEx.test(password)) {
      return { success: false, message: "비밀번호에는 영문, 숫자, 특수문자(!@#$%^&*)만 포함 가능합니다." };
    }
    return { success: true, message: "사용가능한 비밀번호입니다." };
  },
  
  testIsValidProfileName : (profileName) => {
    if (profileName.length < 1) {
      return { success: false, message: "프로필 이름은 최소 1글자 이상이어야 합니다." };
    }
    if (profileName.length > 12) {
      return { success: false, message: "프로필 이름은 최대 12글자 이하여야 합니다." };
    }
    let profileNameRegEx = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9!@#$%^&*]$/;
    if (!profileNameRegEx.test(profileName)) {
      return { success: false, message: "프로필 이름은 한글, 영문, 숫자, 특수문자(!@#$%^&*)만 포함 가능합니다." };
    }
    return { success: true, message: "사용가능한 프로필 이름입니다." };
  },
  
  createToken : () => {
    let token = "";
    // 0 ~ 9, a ~ z, A ~ Z 범위 설정
    let range = 10 + 26 + 26; 
    for (let i = 0; i < 12; i++){
      // (0, range] 까지 랜덤 값 추출
      let random = Math.floor(Math.random() * range);
      // 36 ~ 61까지 A ~ Z로 설정
      if (random >= 36) {
        token += String.fromCharCode('A'.charCodeAt(0) + random - 36);
      // 10 ~ 35까지 a ~ z로 설정
      } else if(random >= 10) {
        token += String.fromCharCode('a'.charCodeAt(0) + random - 10);
      // 0 ~ 9 까지 0 ~ 9로 설정
      } else {
        token += String(random);
      }
    }
    return token;
  }
}