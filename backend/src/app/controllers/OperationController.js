import Operation from '../models/Operation';
import Account from '../models/Account';

export default {
  async index(req, res) {
    try {
      const operantions = await Operation.findAll();

      return res.status(200).json(operantions);
    } catch (error) {
      return res.status(500).json({ err: 'Internal server error', error });
    }
  },
  async store(req, res) {
    try {
      const { id } = req.params;
      const { type = 'withdraw' } = req.query;
      let { value } = req.body;

      const account = await Account.findByPk(id);

      if (type !== 'deposit') {
        if (account.balance - value < 0) {
          return res.status(400).json('Operação inválida');
        }
        value = -value;
      }

      account.balance += value;
      await account.save();

      const operation = await Operation.create({
        account_id: account.id,
        value,
        type,
      });

      return res.status(201).json({ balance: account.balance });
    } catch (error) {
      return res.status(500).json({ err: 'Internal server error', error });
    }
  },
};
