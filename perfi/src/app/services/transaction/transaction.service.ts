import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Transaction } from '../../models/transaction';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  // URL to web api
  private transactionsUrl = 'api/transactions';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  // Get transaction from the server
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionsUrl)
               .pipe(
                 tap(_ => this.log('fetched transactions')),
                 catchError(this.handleError<Transaction[]>('getTransactions', []))
               );
  }

  // Get transaction by id. Will 404 if id not found
  getTransaction(id: number): Observable<Transaction> {
    const url = `${this.transactionsUrl}/${id}`;
    return this.http.get<Transaction>(url)
               .pipe(
                 tap(_ => this.log(`fetched transaction with id=${id}`)),
                 catchError(this.handleError<Transaction>(`getTransaction id=${id}`))
               );
  }

  // PUT: Update the transaction on the server
  updateTransaction(transaction: Transaction): Observable<any> {
    return this.http.put(this.transactionsUrl, transaction, this.httpOptions)
               .pipe(
                 tap(_ => this.log(`updated transaction id=${transaction.id}`)),
                 catchError(this.handleError<any>('updateTransaction'))
               );
  }

  // POST: Add a new transaction on the server
  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.transactionsUrl, transaction, this.httpOptions)
               .pipe(
                 tap((newTransaction: Transaction) => this.log(`added transaction w/ id=${newTransaction.id}`)),
                 catchError(this.handleError<Transaction>('addTransaction'))
               );
  }

  // DELETE: delete the transaction from the server
  deleteTransaction(transaction: Transaction | number) {
    const id = typeof transaction === 'number' 
             ? transaction 
             : transaction.id;
    const url = `${this.transactionsUrl}/${id}`;
    return this.http.delete<Transaction>(url, this.httpOptions)
               .pipe(
                 tap(_ => this.log(`deleted transaction w/ id=${id}`)),
                 catchError(this.handleError<Transaction>('deleteTransaction'))
               );
  }

  private log(message: string): void {
    this.messageService.add(`TransactionService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to the remote logging infrastructure
      console.error(error);   // log to console for now

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}
