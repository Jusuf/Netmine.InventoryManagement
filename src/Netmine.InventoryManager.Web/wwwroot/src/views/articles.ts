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

        let article = {
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

                this.clearArticle();
                });
          
        }
        else {
            article.Id = "";
            this.http.fetch("http://localhost:64889/api/article/", {
                method: "post",
                body: json(article)

            }).then(response => {
                this.fetchAllArticles();
                console.log("article added: ", response);
                debugger;
                this.clearArticle();
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

    clearArticle() {
        debugger;
        this.articleName = "";
        this.articleNumber = null;
        this.articleId = "";
    }

}

export interface IArticle {
    id: string;
    name: string;
    number: number;
}

