import {inject} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";

@inject(HttpClient, json)
export class Articles {
    articles: Array<IArticle>;
    articleName: string;
    articleNumber: number;

    constructor(private http: HttpClient) { }

    activate() {
        this.fetchAllArticles();
    }

    addNewArticle() {
        const newArticle = {
            Name: this.articleName,
            Number: this.articleNumber
        };
        this.http.fetch("http://localhost:64889/api/article/", {
            method: "post",
            body: json(newArticle)

        }).then(response => {
            this.fetchAllArticles();
            console.log("article added: ", response);
        });
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

    //markTodoItemAsDone(todoItem: ITodoItem) {
    //    if (todoItem.isCompleted) return;
    //    this.http.fetch(`http://localhost:64889/api/todos/${todoItem.id}`,
    //        { method: "put" }).then(() => { this.fetchAllTodoItems(); });
    //}
}

export interface IArticle {
    id: string;
    name: string;
    number: string;
}

//activate() {
//    return this.http.fetch("http://localhost:64889/api/values").
//        then(response => response.json()).then(data => {
//            this.values = data;
//        });
//}