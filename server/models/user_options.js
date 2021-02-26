const Sequelize = require('sequelize');

module.exports = class UserOptions extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      // 댓글 알림 설정
      comment_notice: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      // 게시글 좋아요 알림 설정
      article_like_notice: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      // 팔로우 알림 설정
      follow_notice: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      // 팔로잉 게시글 등록 알림 설정
      following_article_notice: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    }, {
      sequelize,
      modelName: 'UserOptions',
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
      underscored: true
    })
  }

  static associate(db){
    db.UserOptions.belongsTo(db.User);
  }
}