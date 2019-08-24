import { TransactionType } from './transaction-type';

export class Transaction {
    id: number;
    transactionDate: Date;
    valueDate: Date;
    type: TransactionType;
    amount: number;
    description: string;
}