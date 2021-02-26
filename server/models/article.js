const Sequelize = require('sequelize');

module.exports = class Article extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      // 게시글 제목
      title: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      // 게시글 내용
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // 비공개 여부
      optionPublic: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      // 예약발행 시간
      reservedAT: {
        type: Sequelize.DATE,
        allowNull: true
      },
      // 좋아요 수
      likeCount: { type: Sequelize.INTEGER }
    }, {
      sequelize,
      modelName: 'Article',
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  }

  static associate(db){
    // author_id : 작성자 ID
    db.Article.belongsTo(db.User, {
      foriegnKey: 'authorID',
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
      allowNull: false
    });
    // category_id : 포함된 카테고리 ID
    db.Article.belongsTo(db.Category, {
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
      allowNull: true
    });
    // 게시글 좋아요 릴레이션 (유저, 게시글)
    db.Article.belongsToMany(db.User, {
      through: 'ArticleLike',
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION'
    });
    // 게시글 태그 릴레이션 (태그, 게시글)
    db.Article.belongsToMany(db.HashTag, {
      through: 'ARTICLE_TAG_RELATION',
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION'
    });
  }
}