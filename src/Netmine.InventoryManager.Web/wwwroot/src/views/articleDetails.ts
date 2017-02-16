import {inject} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";

@inject(HttpClient, json)
export class ArticleDetail {

    article: IArticle;

    constructor(private http: HttpClient) { }

    activate(article) {
        this.getArticle(article.id);
    }
   
    getArticle(id) {
        return this.http.fetch(`http://localhost:64889/api/article/${id}`,
            { method: 'get' }).
            then(response => response.json()).then(data => {
                this.article = data;
            });
    }

}

export interface IArticle {
    id: string;
    name: string;
    number: number;
    createdDate: string;
    modifiedDate: string;
}

