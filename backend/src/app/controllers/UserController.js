import User from '../models/User';
import Account from '../models/Account';
import Card from '../models/Card';

import getRandon from '../../utils/numberGenerator';

export default {
  async index(req, res) {
    try {
      const user = await User.findAll();

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ err: 'Internal server error', error });
    }
  },
  async store(req, res) {
    try {
      const { name, login, password } = req.body;

      const user = await User.create({ name, login, password });

      const account = await Account.create({
        user_id: user.id,
        number_account: getRandon(8),
        agency: getRandon(4),
        balance: 0,
      });

      const card = await Card.create({
        account_id: account.id,
        number_card: getRandon(16),
        date_expire: Date.now(),
      });

      return res.status(201).json({
        id: user.id,
        name: user.name,
        login: user.login,
        account_id: account.id,
        number_account: account.number_account,
        agency: account.agency,
        balance: account.balance,
        number_card: card.number_card,
        date_expire: card.date_expire,
      });
    } catch (error) {
      return res.status(500).json({ err: 'Internal server error' });
    }
  },
};
