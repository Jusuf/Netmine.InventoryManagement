import {inject} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";
import {Router} from 'aurelia-router';

@inject(HttpClient, json, Router)
export class Transactions {

    router: Router;

    transactions: Array<ITransaction>;
    racks: Array<IRack>;

    transactionDate: Date;
    articleNumber: string;
    articleName: string;
    batchNumber: string;
    orderNumber: string;
    rackId: string;
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
        this.fetchAllRacks()
        this.fetchAllTransactions();
    }

    saveTransaction() {

        let transaction = {
            id: "",
            date: this.transactionDate,
            articleNumber: this.articleNumber,
            articleName: this.articleName,
            batchNumber: this.batchNumber,
            orderNumber: this.orderNumber,
            rackId: this.rackId,
            amount: this.amount,
            transactionType: 30
        };

        this.http.fetch("transaction/", {
            method: "post",
            body: json(transaction)

        }).then(response => {
            this.fetchAllTransactions();
            console.log("transaction added: ", response);
            this.clearTransaction();
            this.fetchAllRacks();

        });
    }

    fetchAllTransactions() {
        return this.http.fetch("transaction").
            then(response => response.json()).then(data => {
                this.transactions = data;
            });
    }

    fetchAllRacks() {
        return this.http.fetch("rack").
            then(response => response.json()).then(data => {
                this.racks = data;
            });
    }

    clearTransaction() {
        this.transactionDate = new Date();
        this.articleName = "";
        this.articleNumber = "";
        this.batchNumber = "";
        this.orderNumber = "";
        this.amount = 0;
        this.rackId = "";
    }

}

export interface ITransaction {
    id: string;
    articleNumber: string;
    articleName: string;
    batchNumber: string;
    orderNumber: string;
    transactionType: number;
    amount: number;
    rackId: string;
}

export interface IRack {
    id: string;
    name: string;
}

