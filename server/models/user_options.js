const Sequelize = require('sequelize');

module.exports = class UserOptions extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      // 댓글 알림 설정
      commentNotice: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      // 게시글 좋아요 알림 설정
      articleLikeNotice: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      // 팔로우 알림 설정
      followNotice: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      // 팔로잉 게시글 등록 알림 설정
      followingArticleNotice: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    }, {
      sequelize,
      modelName: 'UserOptions',
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_general_ci'
    })
  }

  static associate(db){
    db.UserOptions.belongsTo(db.User);
  }
}