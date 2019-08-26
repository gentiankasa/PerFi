import { Component, OnInit } from '@angular/core';

import { TRANSACTIONS } from '../../mocks/mock-transactions';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction/transaction.service';

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
}
