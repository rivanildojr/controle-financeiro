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
    this.belongsToMany(models.Account, {
      foreignKey: 'accountReceive_id',
      through: 'transfers',
      as: 'transfersReceive',
    });
  }
}

export default Transfer;
