import { Model, DataTypes } from 'sequelize';

class Operation extends Model {
  static init(sequelize) {
    super.init(
      {
        value: DataTypes.FLOAT,
        type: DataTypes.ENUM('withdraw', 'deposit', 'payment'),
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Account, { foreignKey: 'account_id', as: 'account' });
  }
}

export default Operation;
