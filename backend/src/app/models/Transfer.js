import { Model, DataTypes } from 'sequelize';

class Transfer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        numberAccount: DataTypes.INTEGER,
        value: DataTypes.FLOAT,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Account, {
      foreignKey: 'account_sent_id',
      as: 'transfer_sent',
    });
    this.belongsTo(models.Account, {
      foreignKey: 'account_received_id',
      as: 'transfer_receive',
    });
  }
}

export default Transfer;
