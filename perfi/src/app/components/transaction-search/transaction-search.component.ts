import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction/transaction.service';
import { TransactionSearchParam } from '../../models/transaction-search-param';

@Component({
  selector: 'app-transaction-search',
  templateUrl: './transaction-search.component.html',
  styleUrls: ['./transaction-search.component.css']
})
export class TransactionSearchComponent implements OnInit {

  transactions$: Observable<Transaction[]>;
  private searchTerms = new Subject<TransactionSearchParam>();

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactions$ = this.searchTerms.pipe(
      // wait 300ms before considering the term.
      debounceTime(300),
      // ignore new term if same as previous one.
      distinctUntilChanged(),
      // switch to new search observable each time the term changes.
      switchMap((term: TransactionSearchParam) => this.transactionService.searchTransactions(term))
    );
  }

  // Push a search term into the Observable stream
  search(transactionDateFrom: Date, transactionDateTo: Date, valueDateFrom: Date, valueDateTo: Date): void {
    const term: TransactionSearchParam = {
      transactionDateFrom: transactionDateFrom,
      transactionDateTo: transactionDateTo,
      valueDateFrom: valueDateFrom,
      valueDateTo: valueDateTo
    };
    this.searchTerms.next(term);
  }
}
