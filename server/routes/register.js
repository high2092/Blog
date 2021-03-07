const express = require('express');
const bcrypt = require('bcrypt');
const cryptoRandomString = require('crypto-random-string');
const { User, AuthToken } = require('../models');
const registerUtils = require('../modules/register_utils');
const redis = require('redis');

const client = redis.createClient();

const router = express.Router();

router.post('/check/token', async (req, res, next) => {
  const { token, profileName } = req.body;
  try {
    const userInform = await client.get(token)
    // DB에 해당 토큰 값이 없을 경우
    if (!userInform) {
      return res.send({ success: false, message: "존재하지 않는 토큰 값입니다."});
    } else {
      const user = await User.create({...userInform, profileName});
      return res.send({ success: true, message: "성공적으로 회원가입 되었습니다." });
    }
  } catch (err) {
    console.error(err); 
    next(err);
    return res.send({ success: false, message: err });
  }
});

router.post('/check', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const resultEmailTest = await registerUtils.checkIsAvailableEmail(email);
    const resultPasswordTest = await registerUtils.checkIsAvailablePassword(password);
    // 사용 불가한 이메일일 경우
    if (resultEmailTest.success === false) {
      return res.send(resultEmailTest);
    // 사용 불가한 비밀번호일 경우
    } else if ( resultPasswordTest.success === false) {
      return res.send(resultPasswordTest);
    } else {
      // 비밀번호 암호화
      const hash = await bcrypt.hash(password, 12);
      // 인증 토큰 값 생성
      const token = cryptoRandomString({length: 10, type: 'url-safe'});;

      let authTokenRow = {
        userID: email,
        password: hash,
        token
      };
      // 토큰 값을 Key로 하여 인증 회원가입 정보 값 redis에 저장 (24시간 뒤 만료)
      client.hmset(token, authTokenRow);
      client.expire(token, parseInt((+new Date)/1000) + 86400);

      let sendingMail = await registerUtils.sendRegisterMail(email, token);
      if (sendingMail.success === false) {
        return res.send(sendingMail);
      } else {
        return res.send({ success: true, message: "성공적으로 인증 메일을 발송하였습니다." });
      }
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
    const resultEmailTest = await registerUtils.checkIsAvailableEmail(email);
    return res.send(resultEmailTest);
  } catch (err) {
    console.error(err); 
    next(err);
    return res.send({ success: false, message: err });
  }
});

module.exports = router;