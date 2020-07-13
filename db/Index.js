const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('kickstarter', 'postgres', 'postgres', {
  //   host: '127.0.0.1',
  dialect: 'postgres'
});

sequelize.authenticate()
  .then(function(errors) {
    console.log('Connection has been established successfully.')
  })
  .catch(function(errors) {console.log('Unable to connect to the database:', errors)})

const Update = sequelize.define('Update', {
  campaignID: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  updateID: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: true
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

const Comment = sequelize.define('Comment', {
  updateID: {
    type: DataTypes.INTEGER,
    allowNull: true
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