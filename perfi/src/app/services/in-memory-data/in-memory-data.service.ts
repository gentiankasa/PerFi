import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Transaction } from '../../models/transaction';
import { TransactionType } from '../../models/transaction-type';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const transactions = [
      {
        id: 1,
        type: TransactionType.Expense,
        amount: 12.70,
        description: 'Test transaction 1',
        transactionDate: new Date(),
        valueDate: new Date()
      },
      {
        id: 2,
        type: TransactionType.Expense,
        amount: 13.30,
        description: 'Test transaction 2',
        transactionDate: new Date(),
        valueDate: new Date()
      },
      {
        id: 3,
        type: TransactionType.Income,
        amount: 205.00,
        description: 'Test transaction 3',
        transactionDate: new Date(),
        valueDate: new Date()
      }
    ];

    return {transactions};
  }

  // Overrides the genId method to ensure that a transaction always has an ID.
  // If the transactions array is empty, the method below returns the initial
  // number (1). If the transactions array is not empty, the method below 
  // returns the highest transaction id + 1.
  genId(transactions: Transaction[]): number {
    return transactions.length > 0 
         ? Math.max(...transactions.map(transaction => transaction.id)) + 1 
         : 1;
  }
}
