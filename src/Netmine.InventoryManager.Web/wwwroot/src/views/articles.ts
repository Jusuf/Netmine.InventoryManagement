import {inject} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";

@inject(HttpClient, json)
export class Articles {
    articles: Array<IArticle>;
    articleName: string;
    articleNumber: number;
    articleId: string;

    constructor(private http: HttpClient) { }

    activate() {
        this.fetchAllArticles();
    }

    saveArticle() {

        const article = {
            Name: this.articleName,
            Number: this.articleNumber,
            Id: this.articleId
        };

        if (article.Id) {
            this.http.fetch("http://localhost:64889/api/article/", {
                method: "put",
                body: json(article)

            }).then(response => {
                this.fetchAllArticles();
                console.log("article edited: ", response);

                this.articleName = "";
                this.articleNumber = null;
                this.articleId = "";
                });
          
        }
        else {
            this.http.fetch("http://localhost:64889/api/article/", {
                method: "post",
                body: json(article)

            }).then(response => {
                this.fetchAllArticles();
                console.log("article added: ", response);
            });
        }
    }

    fetchAllArticles() {
        return this.http.fetch("http://localhost:64889/api/article").
            then(response => response.json()).then(data => {
                this.articles = data;
            });
    }

    deleteArticle(articleId) {
        this.http.fetch(`http://localhost:64889/api/article/${articleId}`,
            { method: "delete" }).then(() => { this.fetchAllArticles(); });
    }

    editArticle(article: IArticle) {
        this.articleName = article.name;
        this.articleNumber = article.number;
        this.articleId = article.id;
    }

    //markTodoItemAsDone(article: IArticle) {
    //    if (article.id)
    //    {
    //        this.http.fetch(`http://localhost:64889/api/todos/${article.id}`,
    //            { method: "put" }).then(() => { this.fetchAllArticles(); });
    //    }
        
    //}
}

export interface IArticle {
    id: string;
    name: string;
    number: number;
}

//activate() {
//    return this.http.fetch("http://localhost:64889/api/values").
//        then(response => response.json()).then(data => {
//            this.values = data;
//        });
//}