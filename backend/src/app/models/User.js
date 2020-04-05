import { Model, DataTypes } from 'sequelize';

import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        login: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
        hooks: {
          beforeSave: async (user) => {
            if (user.password) {
              user.password = await bcrypt.hash(user.password, 10);
            }
          },
        },
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Account, { foreignKey: 'user_id', as: 'accounts' });
  }
}

export default User;
