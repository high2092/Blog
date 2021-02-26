const Sequelize = require('sequelize');

module.exports = class Template extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      // 템플릿 제목
      name: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true
      },
      // 템플릿에 저장된 제목
      title: {
        type: Sequelize.STRING(),
        allowNull: false
      },
      // 템플릿에 저장된 글 내용
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
    }, {
      sequelize,
      modelName: 'Template',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  }

  static associate(db){
    // user_id : 템플릿 사용자 ID
    db.Template.belongsTo(db.User, {
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
      allowNull: false
    });
  }
}