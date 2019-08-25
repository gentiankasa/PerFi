import { TransactionType } from '../models/transaction-type';
import { Transaction } from '../models/transaction';

export const TRANSACTIONS: Transaction[] = [
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