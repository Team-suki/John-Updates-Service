const { Sequelize, DataTypes, Model } = require('sequelize');
const keys = require('./config.js').keys

const sequelize = new Sequelize('kickstarter', keys.username, keys.password, {
  host: keys.host,
  dialect: 'postgres',
});

sequelize.authenticate()
  .then(function(errors) {
    console.log('Connection has been established successfully.')
  })
  .catch(function(errors) {console.log('Unable to connect to the database:', errors)})

const Update = sequelize.define('update', {
  campaignID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  updateID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Update',
});

const Comment = sequelize.define('comment', {
  campaignID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  updateID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  commentID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Comment',
});

Update.associate = () => {
  Update.hasMany(Comment, {foreignKey: 'updateID'})
}
Comment.associate = () => {
  Comment.belongsTo(Update)
}

sequelize.sync();

module.exports.Update = Update;
module.exports.Comment = Comment;