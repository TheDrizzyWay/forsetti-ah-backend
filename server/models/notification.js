module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false
    },
    notification: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    type: {
      allowNull: false,
      type: DataTypes.ENUM('follow', 'article', 'comment', null),
    },
    isSeen: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    typeId: {
      allowNull: true,
      type: DataTypes.UUID,
    },
    articleSlug: {
      allowNull: true,
      type: DataTypes.TEXT,
    }
  }, {});
  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Notification;
};
