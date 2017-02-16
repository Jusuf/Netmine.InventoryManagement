import {inject} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";
import {Router} from 'aurelia-router';

@inject(HttpClient, json, Router)
export class Articles {

    router: Router;

    articles: Array<IArticle>;
    articleName: string;
    articleNumber: number;
    articleId: string;


    constructor(private http: HttpClient, json, router: Router) {
        this.router = router;
        }

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
            this.http.fetch("http://localhost:64889/api/warehouse/", {
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
                this.clearArticle();
            });
        }
    }

    fetchAllArticles() {
        return this.http.fetch("http://localhost:64889/api/warehouse").
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
        this.articleName = "";
        this.articleNumber = null;
        this.articleId = "";
    }

    showArticleDetails(articleId) {
        this.router.navigateToRoute("articleDetails", { id: articleId });
    }
   

}

export interface IArticle {
    id: string;
    name: string;
    number: number;
}

