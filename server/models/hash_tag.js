const Sequelize = require('sequelize');

module.exports = class HashTag extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      // 태그 이름
      tagName: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      // 모든 유저들의 게시글에 태그 사용된 총 합 횟수
      tagUsedCount: {
        type: Sequelize.INTEGER,
      }
    }, {
      sequelize,
      modelName: 'HashTag',
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  }

  static associate(db){
    // 게시글 태그 릴레이션 (태그, 게시글)
    db.HashTag.belongsToMany(db.Article, {
      through: 'ARTICLE_TAG_RELATION',
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION'
    });
  }
}