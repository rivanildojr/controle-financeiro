import { Model, DataTypes } from 'sequelize';

class Card extends Model {
  static init(sequelize) {
    super.init(
      {
        numberCard: DataTypes.BIGINT,
        date: DataTypes.DATE,
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

export default Card;
