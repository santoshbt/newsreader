import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http'

@Component({
  selector: 'app-simple-http',
  templateUrl: './simple-http.component.html',
  styleUrls: ['./simple-http.component.css']
})
export class SimpleHTTPComponent {
  data: Object;
  loading: boolean;
  constructor(private http: Http) { }

  makeRequest(): void{
    this.loading = true;
    this.http.request('http://jsonplaceholder.typicode.com/posts/1')
    .subscribe((res: Response) => {
      this.data = res.json();
      this.loading = false;   
    })
  }

  postRequest(): void{
    this.loading = true;
    this.http.post('http://jsonplaceholder.typicode.com/posts',
                      JSON.stringify({
                        body: 'bar',
                        title: 'foo',
                        userId: 1
                      }))
                      .subscribe((res: Response) => {
                        this.data = res.json();
                        this.loading = false;
                      })   
  }
}
