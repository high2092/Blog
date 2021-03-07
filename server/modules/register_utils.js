const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { User } = require('../models');

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
  
  checkIsAvailableEmail : async (email) => {
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegEx.test(String(email).toLowerCase())){
      return { success: false, message: "올바른 이메일 형식이 아닙니다." };
    }
    const checkEmailUserExist = await User.findOne({ where: { userID: email }});
    // 이미 동일 이메일 사용자가 존재할 경우
    if (checkEmailUserExist) {
      return { success: false, message: "이미 가입된 이메일 주소입니다." };
    }
    return { success: true, message: "사용가능한 이메일입니다." };
  },
  
  checkIsAvailablePassword : async (password) => {
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
  
  // checkIsAvailableProfileName : async (profileName) => {
  //   if (profileName.length < 1) {
  //     return { success: false, message: "프로필 이름은 최소 1글자 이상이어야 합니다." };
  //   }
  //   if (profileName.length > 12) {
  //     return { success: false, message: "프로필 이름은 최대 12글자 이하여야 합니다." };
  //   }
  //   let profileNameRegEx = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9!@#$%^&*]$/;
  //   if (!profileNameRegEx.test(profileName)) {
  //     return { success: false, message: "프로필 이름은 한글, 영문, 숫자, 특수문자(!@#$%^&*)만 포함 가능합니다." };
  //   }
  //   const checkProfileNameUserExist = await User.findOne({ where: { profileName }});
  //   // 이미 동일 프로필 이름 사용자가 존재할 경우
  //   if (checkProfileNameUserExist) {
  //     return { success: false, message: "이미 사용중인 닉네임입니다."};
  //   }
  //   return { success: true, message: "사용가능한 프로필 이름입니다." };
  // },
}