import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private books: any[];
  private authors: any[];
  bookSubject = new Subject<any[]>();
  authorSubject = new Subject<any[]>();
  ruta = environment.baseUrl;

  constructor(public httpc: HttpClient) {
    this.books = [];
    this.authors = [];
   }

   loadBooks(){
    this.httpc.get(this.ruta +'/books').pipe(map((response: any) => {
        this.books = response;      
        this.bookSubject.next(this.books);
    })).subscribe();
  }

  getBooks(){    
    if(this.books.length === 0){
      this.loadBooks();            
    }
    else {
      this.bookSubject.next(this.books);
    }
  }

  readDataBooks(): Observable<any[]> {
    return this.bookSubject.asObservable();
  }

   loadAuthors(){
    this.httpc.get(this.ruta +'/authors').pipe(map((response: any) => {
        this.authors = response;      
        this.authorSubject.next(this.authors);
    })).subscribe();
  }

  getAuthors(){    
    if(this.authors.length === 0){
      this.loadAuthors();            
    }
    else {
      this.authorSubject.next(this.authors);
    }
  }

  readDataAuthors(): Observable<any[]> {
    return this.authorSubject.asObservable();
  }

}

