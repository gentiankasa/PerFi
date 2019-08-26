import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Transaction } from '../../models/transaction';
import { TRANSACTIONS } from '../../mocks/mock-transactions';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private messageService: MessageService) { }

  getTransactions(): Observable<Transaction[]> {
    // TODO: send the message _after_ fetching the transactions
    this.messageService.add('TransactionService: fetched transactions');
    return of(TRANSACTIONS);
  }

  getTransaction(id: number): Observable<Transaction> {
    // TODO: send the message _after_ fetching the transaction
    this.messageService.add(`TransactionService: fetched transaction with id=${id}`);
    return of(TRANSACTIONS.find(transaction => transaction.id === id));
  }
}
