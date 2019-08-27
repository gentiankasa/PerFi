import { Component, OnInit } from '@angular/core';

import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction/transaction.service';
import { TransactionType } from 'src/app/models/transaction-type';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions: Transaction[];

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions(): void {
    this.transactionService.getTransactions()
        .subscribe(transactions => this.transactions = transactions);
  }

  add(transactionDate: Date, valueDate: Date, transactionType: number, amount: number, description: string): void {
    description = description.trim();
    const transaction = {
      transactionDate: transactionDate,
      valueDate: valueDate,
      type: transactionType as TransactionType,
      amount: amount,
      description: description
    };
    this.transactionService.addTransaction(transaction as Transaction)
        .subscribe(t => this.transactions.push(t));
  }

  delete(transaction: Transaction): void {
    // this.transactions = this.transactions.filter(t => t !== transaction);
    this.transactionService.deleteTransaction(transaction)
        .subscribe(_ => this.transactions = this.transactions.filter(t => t !== transaction));
  }
}
