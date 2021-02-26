const Sequelize = require('sequelize');

module.exports = class AuthToken extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      // 회원 ID (이메일)
      userID: {
        type: Sequelize.STRING(40),
        unique: true,
        allowNull: false
      },
      // 회원 비밀번호 (암호화된 값 저장됨, SNS 연동 로그인시에는 NULL 값)
      password: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      // 프로필 이름
      profileName: {
        type: Sequelize.STRING(12),
        unique: true,
        allowNull: false
      },
      token: {
        type: Sequelize.STRING(40),
        unique: true,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'AuthToken',
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  }
}