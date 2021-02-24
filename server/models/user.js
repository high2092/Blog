const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      // ID
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      // 회원 ID
      user_id: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false
      },
      // 회원 비밀번호 (암호화된 값 저장됨, SNS 연동 로그인시에는 NULL 값)
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      // 프로필 이름 (중복 불가, NULL 허용)
      profile_name: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: true,
      },
      // 프로필 사진 URL
      profile_image_URL: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      // 프로필 메시지
      profile_message: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      // 블로그 제목
      blog_title: {
        type: Sequelize.STRING(20),
        allowNull: false,
      }
  }, {
    sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'User',
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  }

  static associate(db){
    db.User.belongsToMany(db.User, {
      foreignKey: 'following_id',
      through: 'Follow'
    });
  }
}