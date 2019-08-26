import { Component, OnInit } from '@angular/core';

import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions(): void {
    this.transactionService.getTransactions()
        .subscribe(transactions => this.transactions = transactions.slice(0, 4));
  }
}
