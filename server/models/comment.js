const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      // 댓글 내용
      content: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      // 좋아요 수
      like_count: { type: Sequelize.INTEGER }
    }, {
      underscored: true,
      sequelize,
      modelName: 'Comment',
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  }

  static associate(db){
    db.Comment.belongsTo(db.Article, {
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
      allowNull: false
    });
    db.Comment.belongsTo(db.User, {
      foriegnKey: 'writer_id',
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
      allowNull: false
    });
    db.Comment.belongsTo(db.Comment, {
      foriegnKey: 'replied_about',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
      allowNull: true
    });
    // 댓글 좋아요 릴레이션 (유저, 댓글)
    db.Comment.belongsToMany(db.User, {
      through: 'CommentLike',
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION'
    });
  }
}