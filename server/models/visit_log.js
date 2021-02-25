const Sequelize = require('sequelize');

module.exports = class VisitLog extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      // 날짜
      date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
        allowNull: false,
        unique: true
      },
      // 방문 횟수
      visit_count: { type: Sequelize.INTEGER }
    }, {
      sequelize,
      modelName: 'VisitLog',
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
      underscored: true
    });
  }

  static associate(db){
    // user_id: 방문횟수가 기록될 블로그의 주인 ID
    db.VisitLog.belongsTo(db.User, {
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
      allowNull: false
    });
  }
}