export interface ArticleJSON{
  title: string;
  description: string;
  urlToImage: string;
  votes: number;
  publishedAt: Date;
  author: string;
}

export class Article {
  public publishedAt: Date;

  // Article.fromJSON
  static fromJSON(json : ArticleJSON) :  Article {
    let article = Object.create(Article.prototype);    
    return Object.assign(article, json, {
      votes: json.votes ? json.votes : 0,
      imageUrl : json.urlToImage,
      publichedAt: json.publishedAt ? new Date(json.publishedAt) : new Date()
    });
  } 

  constructor(public title:string, 
              public description:string,
              public imageUrl:string,
              public votes?: number) {
                  this.votes = votes || 0,
                  this.publishedAt = new Date();
            }         
 
  public voteUp(): void {
    this.votes = this.votes + 1;
  }

  public voteDown(): void{
    this.votes = this.votes - 1;
  }
}
