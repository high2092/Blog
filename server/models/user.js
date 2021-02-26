const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize){
    return super.init({
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
      // 프로필 이름
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
      },
      /* 연동된 SNS
      - local: 기본 회원가입으로 생성된 계정
      - facebook: 페이스북 연동으로 생성된 계정
      - google: 구글 연동으로 생성된 계정
      */
      provider: {
        type: Sequelize.STRING(15),
        allowNull: false
      }
    }, {
      sequelize,
      underscored: true,
      modelName: 'User',
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  }

  static associate(db){
    // 팔로우 릴레이션 (유저, 유저)
    db.User.belongsToMany(db.User, {
      foreignKey: 'follower_id',
      as: "Following",
      through: 'Follow'
    });
    // 팔로우 릴레이션 (유저, 유저)
    db.User.belongsToMany(db.User, {
      foreignKey: 'following_id',
      as: "Follower",
      through: 'Follow'
    });
    // 댓글 좋아요 릴레이션 (유저, 댓글)
    db.User.belongsToMany(db.Comment, {
      through: 'CommentLike',
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION'
    });
    // 게시글 좋아요 릴레이션 (유저, 게시글)
    db.User.belongsToMany(db.Article, {
      through: 'ArticleLike',
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION'
    });
    db.User.hasOne(db.UserOptions);
    db.User.hasMany(db.Comment);
    db.User.hasMany(db.Article);
    db.User.hasMany(db.Category);
    db.User.hasMany(db.Template);
    db.User.hasMany(db.VisitLog);
  }
}