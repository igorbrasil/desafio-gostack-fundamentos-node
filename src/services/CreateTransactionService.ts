import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    let incomings = 0;
    let outcomings = 0;
    let indexIncoming = 0;
    let indexOutcoming = 0;
    const transactions = this.transactionsRepository.all();

    transactions.forEach(element => {
      if (element.type === 'income') {
        incomings += element.value;
        indexIncoming += 1;
      } else {
        outcomings += element.value;
        indexOutcoming += 1;
      }
    });

    if (type === 'outcome') {
      if (value > incomings - outcomings) {
        throw Error('Saldo insuficiente!');
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
    // TODO
  }
}

export default CreateTransactionService;
