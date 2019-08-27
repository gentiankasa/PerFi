import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction/transaction.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {

  @Input() transaction: Transaction;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.getTransaction();
  }

  getTransaction(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.transactionService.getTransaction(id)
        .subscribe(transaction => this.transaction = transaction);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.transactionService.updateTransaction(this.transaction)
        .subscribe(() => this.goBack());
  }
}
