import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import BalanceTransactionService from '../services/BalanceTransactionService';

import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // TODO
    const balanceTransactionService = new BalanceTransactionService(
      transactionsRepository,
    );
    const transactions = balanceTransactionService.execute(); // transactionsRepository.all();
    return response.json(transactions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  const { title, value, type } = request.body;
  try {
    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );
    const transaction = createTransactionService.execute({
      title,
      value,
      type,
    });
    return response.json(transaction);

    // TODO
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
