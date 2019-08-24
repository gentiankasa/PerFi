import { Component, OnInit } from '@angular/core';

import { Transaction } from '../models/transaction';
import { TransactionType } from '../models/transaction-type';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transaction = {
    id: 1,
    type: TransactionType.Expense,
    amount: 12.70,
    description: 'Test transaction',
    transactionDate: new Date(),
    valueDate: new Date()
  };

  constructor() { }

  ngOnInit() {
  }

}
