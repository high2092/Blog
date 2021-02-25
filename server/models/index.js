const Sequelize = require('sequelize');
const Article = require('./article');
const Category = require('./category');
const Comment = require('./comment');
const HashTag = require('./hash_tag');
const Template = require('./template');
const UserOptions = require('./user_options');
const User = require('./user');
const VisitLog = require('./visit_log');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Article = Article;
db.Category = Category;
db.Comment = Comment;
db.HashTag = HashTag;
db.Template = Template;
db.UserOptions = UserOptions;
db.User = User;
db.VisitLog = VisitLog;

Article.init(sequelize);
Category.init(sequelize);
Comment.init(sequelize);
HashTag.init(sequelize);
Template.init(sequelize);
UserOptions.init(sequelize);
User.init(sequelize);
VisitLog.init(sequelize);

Article.associate(db);
Category.associate(db);
Comment.associate(db);
HashTag.associate(db);
Template.associate(db);
UserOptions.associate(db);
User.associate(db);
VisitLog.associate(db);

module.exports = db;
