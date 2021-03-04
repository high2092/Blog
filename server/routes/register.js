const express = require('express');
const bcrypt = require('bcrypt');
const { User, AuthToken } = require('../models');
const registerUtils = require('../modules/register_utils');

const router = express.Router();


router.post('/check/token', async (req, res, next) => {
  const { token } = req.body;
  try {
    const userInform = await AuthToken.findOne({ where: { token }});
    // DB에 해당 토큰 값이 없을 경우
    if (!userInform) {
      return res.send({ success: false, message: "존재하지 않는 토큰값입니다."});
    } else {
      User.create
    }

    return res.send({ success: true, message: "성공적으로 회원가입 되었습니다." });
  } catch (err) {
    console.error(err); 
    next(err);
    return res.send({ success: false, message: err });
  }
});

router.post('/check', async (req, res, next) => {
  console.log(req.body);
  const { email, password, profileName } = req.body;
  try {
    const checkEmailUserExist = await User.findOne({ where: { userID: email }});
    const checkProfileNameUserExist = await User.findOne({ where: { profileName }});
    // 이미 동일 이메일 사용자가 존재할 경우
    if (checkEmailUserExist) {
      return res.send({ success: false, message: "이미 가입된 이메일 주소입니다."});
    // 이미 동일 프로필 이름 사용자가 존재할 경우
    } else if (checkProfileNameUserExist) {
      return res.send({ success: false, message: "이미 사용중인 닉네임입니다."});
    }
    // 비밀번호 암호화
    const hash = await bcrypt.hash(password, 12);
    // 인증 토큰 값 생성
    const token = registerUtils.createToken();
    // 중복된 토큰 값이 있을 경우 토큰 재생성
    while (await AuthToken.findOne({ where: { token }})) {
      token = registerUtils.createToken();
    }
    let authTokenRow = {
      userID: email,
      password: hash,
      profileName,
      token
    };
    /* AuthToken에 이미 userID로 토큰 값을 발급 받았었을 경우엔 정보(비밀번호, 프로필 이름, 토큰값) 업데이트,
    처음 발급받는 것이라면 새로 추가 */
    await AuthToken
    .findOne({ where: { userID: email }})
    .then(row => {
        // update
        if (row){
          console.log(row);
          return row.update(authTokenRow);
        }
        // insert
        return AuthToken.create(authTokenRow);
    });
    let sendingMail = await registerUtils.sendRegisterMail(email, token);
    if (sendingMail.success == false) {
      return res.send(sendingMail);
    } else {
      return res.send({ success: true, message: "성공적으로 인증 메일을 발송하였습니다." });
    }
  } catch (err) {
    console.error(err); 
    next(err);
    return res.send({ success: false, message: err });
  }
});

router.post('/check/email', async (req, res, next) => {
  const { email } = req.body;
  try {
    const checkEmailUserExist = await User.findOne({ where: { userID: email }});
    // 이미 동일 이메일 사용자가 존재할 경우
    if (checkEmailUserExist) {
      return res.send({ success: false, message: "이미 가입된 이메일 주소입니다."});
    }
    return res.send({ success: true, message: "사용 가능한 이메일입니다." });
  } catch (err) {
    console.error(err); 
    next(err);
    return res.send({ success: false, message: err });
  }
});

router.post('/check/profile-name', async (req, res, next) => {
  const { profileName } = req.body;
  try {
    const checkProfileNameUserExist = await User.findOne({ where: { profileName }});
    // 이미 동일 이메일 사용자가 존재할 경우
    if (checkProfileNameUserExist) {
      return res.send({ success: false, message: "이미 사용중인 프로필 이름입니다."});
    }
    return res.send({ success: true, message: "사용 가능한 프로필 이름입니다." });
  } catch (err) {
    console.error(err); 
    next(err);
    return res.send({ success: false, message: err });
  }
});

module.exports = router;