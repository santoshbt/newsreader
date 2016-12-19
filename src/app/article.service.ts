import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http'
import { Article } from './article';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';

@Injectable()
export class ArticleService {
  private _articles: BehaviorSubject<Article[]> = 
    new BehaviorSubject<Article[]>([])

  public articles: Observable<Article[]> = this._articles.asObservable();

  constructor(
    private http: Http
  ) { }

  public getArticles() : void {
    this._makeHTTPRequest('/v1/articles', 'reddit-r-all')
        .map(json => json.articles)
        .subscribe(articlesJSON => {
          const articles = articlesJSON
          .map(articlejson => Article.fromJSON(articlejson));

         this._articles.next(articles); 
        })
  }

  private _makeHTTPRequest(
    path:string, sourceKey:string
  ) : Observable<any>{
    let params = new URLSearchParams();
    params.set('apiKey', environment.newsApiKey);
    params.set('source', sourceKey);
    // `${baseUrl}/v1/articles?apiKey=${newsApiKey}`
    return this.http 
                .get(`${environment.baseUrl}${path}`, {
                  search: params
                }).map(resp => resp.json());

          }
  }   

  // getArticles() : Promise<Article[]>{
  //   let params = new URLSearchParams();
  //   params.set('apiKey', environment.newsApiKey);
  //   params.set('source', 'reddit-r-all');
  //   // `${baseUrl}/v1/articles?apiKey=${newsApiKey}`
  //   return this.http 
  //               .get(`${environment.baseUrl}/v1/articles`, {
  //                 search: params
  //               })
  //               .toPromise()
  //               .then(resp => resp.json())
  //               .then(json => json.articles)
  //               .then(articles => {
  //                   console.log('json ->', articles);
  //                   return articles
  //                             .map(article => Article.fromJSON(article));                                        
  //               })
  //               .catch(err => {
  //                 console.log('We got an error', err);
  //               })
  // }   
// }
