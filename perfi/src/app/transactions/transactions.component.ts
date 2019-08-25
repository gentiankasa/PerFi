import { Component, OnInit } from '@angular/core';

import { TRANSACTIONS } from '../mocks/mock-transactions';
import { Transaction } from '../models/transaction';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions = TRANSACTIONS;
  selectedTransaction: Transaction;

  constructor() { }

  ngOnInit() {
  }

  onSelect(transaction: Transaction) {
    this.selectedTransaction = transaction;
  }
}
