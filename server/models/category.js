const Sequelize = require('sequelize');

module.exports = class Category extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      // 카테고리 이름
      name: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true
      }
    }, {
      sequelize,
      modelName: 'Category',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
      underscored: true
    });
  }

  static associate(db){
    // author_id : 작성자 ID
    db.Category.belongsTo(db.User, {
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
      allowNull: false
    });
    // default_template_id : 카테고리 기본 템플릿 ID
    db.Category.belongsTo(db.Template, {
      foreignKey: 'default_template_id',
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
      allowNull: true
    });
  }
}