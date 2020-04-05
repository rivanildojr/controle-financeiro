import Transfer from '../models/Transfer';
import Account from '../models/Account';

export default {
  async index(req, res) {
    try {
      const transfers = await Transfer.findAll();

      return res.status(200).json(transfers);
    } catch (error) {
      return res.status(500).json({ err: 'Internal server error', error });
    }
  },
  async store(req, res) {
    try {
      const { id } = req.params;
      const { name, agency, numberAccount, value } = req.body;

      const accountSent = await Account.findByPk(id);
      const accountReceived = await Account.findOne({
        where: { number_account: numberAccount, agency },
      });

      if (accountSent.balance - value < 0) {
        return res.status(400).json('Operação inválida');
      }

      accountSent.balance -= value;
      await accountSent.save();

      accountReceived.balance += value;
      await accountReceived.save();

      await Transfer.create({
        account_sent_id: id,
        account_received_id: accountReceived.id,
        value,
      });

      return res.status(201).json({ balance: accountSent.balance });
    } catch (error) {
      return res.status(500).json({ err: 'Internal server error', error });
    }
  },
};
