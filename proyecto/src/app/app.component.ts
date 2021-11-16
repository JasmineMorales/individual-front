import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'proyecto';
  books: any;
  authors: any;

  constructor(public appService: AppService){
  }


  ngOnInit(): void {
    this.appService.readDataAuthors().subscribe(data => {
      this.authors = data;    
    });
    this.appService.getAuthors(); 

    this.appService.readDataBooks().subscribe(data => {
      this.books = data;  
    });
    this.appService.getBooks(); 
  }
}
