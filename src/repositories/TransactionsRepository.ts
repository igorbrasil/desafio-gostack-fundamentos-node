import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
    // TODO
  }

  private balance = {
    income: 0,
    outcome: 0,
    total: 0,
  };

  public getBalance(): Balance {
    const incomings: Array<number> = [];
    const outcomings: Array<number> = [];
    let indexIncoming = 0;
    let indexOutcoming = 0;

    this.transactions.forEach(element => {
      if (element.type === 'income') {
        incomings[indexIncoming] = element.value;
        indexIncoming += 1;
      } else {
        outcomings[indexOutcoming] = element.value;
        indexOutcoming += 1;
      }
    });

    this.balance.income = incomings.reduce(
      (acumulador, valorAtual) => acumulador + valorAtual,
      0,
    ); // this.transactions.reduce('income', income);
    this.balance.outcome = outcomings.reduce(
      (acumulador, valorAtual) => acumulador + valorAtual,
      0,
    );
    this.balance.total = this.balance.income - this.balance.outcome;
    return this.balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
    // TODO
  }
}

export default TransactionsRepository;
