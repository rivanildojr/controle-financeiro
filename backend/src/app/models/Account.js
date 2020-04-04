import { Model, DataTypes } from 'sequelize';

class Account extends Model {
  static init(sequelize) {
    super.init(
      {
        numberAccount: DataTypes.STRING,
        agency: DataTypes.STRING,
        balance: DataTypes.FLOAT,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Card, { foreignKey: 'account_id', as: 'card' });
    this.hasMany(models.Operation, {
      foreignKey: 'account_id',
      as: 'operations',
    });
    this.belongsToMany(models.Transfer, {
      foreignKey: 'accountSent_id',
      through: 'transfers',
      as: 'transfersSent',
    });
  }
}

export default Account;
