import {inject} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";
import {Router} from 'aurelia-router';

@inject(HttpClient, json, Router)
export class Transactions {

    router: Router;

    transactions: Array<ITransaction>;

    transactionDate: Date;
    articleNumber: string;
    articleName: string;
    batchNumber: string;
    orderNumber: string;
    amount: number;

    constructor(private http: HttpClient, json, router: Router) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('api/');
        });

        this.router = router;
    }

    activate() {
        this.fetchAllTransactions();
    }

    saveRack() {

        let transaction = {
            articleNumber: this.articleNumber,
            articleName: this.articleName,
            batchNumber: this.batchNumber,
            orderNumber: this.orderNumber,
            amount: this.amount
        };

        this.http.fetch("transaction/", {
            method: "post",
            body: json(transaction)

        }).then(response => {
            this.fetchAllTransactions();
            console.log("transaction added: ", response);
            this.clearTransaction();
        });
    }

    fetchAllTransactions() {
        return this.http.fetch("transaction").
            then(response => response.json()).then(data => {
                this.transactions = data;
            });
    }

    clearTransaction() {
        this.transactionDate = null;
        this.articleName = "";
        this.articleNumber = "";
        this.batchNumber = "";
        this.amount = 0;
    }

}

export interface ITransaction {
    id: string;
    articleNumber: string;
    articleName: string;
    batchNumber: string;
    orderNumber: string;
    amount: number;
}

export interface IRack {
    id: string;
    name: string;
}

