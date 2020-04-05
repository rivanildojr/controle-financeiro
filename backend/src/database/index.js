import Sequelize from 'sequelize';

import User from '../app/models/User';
import Account from '../app/models/Account';
import Card from '../app/models/Card';
import Operation from '../app/models/Operation';
import Transfer from '../app/models/Transfer';

const connection = new Sequelize({
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: 'dbfinancial',
  dialect: 'mysql',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
});

User.init(connection);
Account.init(connection);
Card.init(connection);
Operation.init(connection);
Transfer.init(connection);

User.associate(connection.models);
Account.associate(connection.models);
Card.associate(connection.models);
Operation.associate(connection.models);
Transfer.associate(connection.models);

export default connection;
