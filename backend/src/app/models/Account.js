import { Model, DataTypes } from 'sequelize';

class Account extends Model {
  static init(sequelize) {
    super.init(
      {
        number_account: DataTypes.INTEGER,
        agency: DataTypes.INTEGER,
        balance: DataTypes.FLOAT,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.hasOne(models.Card, { foreignKey: 'account_id', as: 'card' });
    this.hasMany(models.Operation, {
      foreignKey: 'account_id',
      as: 'operations',
    });
    this.hasMany(models.Transfer, {
      foreignKey: 'account_sent_id',
      as: 'transfer_sent',
    });
    this.hasMany(models.Transfer, {
      foreignKey: 'account_received_id',
      as: 'transfer_received',
    });
  }
}

export default Account;
