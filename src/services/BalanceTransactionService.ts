import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

// interface Balance {
//   transactions: Array<Transaction | Balance>;
// }
interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface BalanceDTO {
  transactions: Array<Transaction>;
  balance: Balance;
}
class BalanceTransactionService {
  private transactionsRepository: TransactionsRepository;

  // private transactions: Array<Transaction | Balance> = [];

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  // public execute(): Array<Transaction | Balance> {
  public execute(): BalanceDTO {
    const transactions: Array<Transaction> = [];
    const balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
    const balanceT = { transactions, balance };

    balanceT.transactions = this.transactionsRepository.all();
    // this.transactions = this.transactionsRepository.all();
    // this.transactions.push(this.transactionsRepository.getBalance());
    balanceT.balance = this.transactionsRepository.getBalance();
    return balanceT;
  }
}
export default BalanceTransactionService;
