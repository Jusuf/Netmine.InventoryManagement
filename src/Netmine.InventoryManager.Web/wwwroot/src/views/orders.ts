import {inject} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";
import {Router} from 'aurelia-router';

@inject(HttpClient, json, Router)
export class Orders {

    router: Router;
    orders: Array<IOrder>;
    activeOrders: Array<IOrder>;

    constructor(private http: HttpClient, json, router: Router) {
        this.router = router;
    }

    activate() {
        this.fetchOrdersByStatus(OrderStatus.Active);
    }

    fetchOrdersByStatus(status) {
        status = 1;
        return this.http.fetch(`http://localhost:64889/api/order/${status}`).
            then(response => response.json()).then(data => {
                this.activeOrders = data;
            });
    }
}

export interface IOrder {
    id: string;
    status: number;
    message: string;
    createdById: string;
    recipientId: string;
}

enum OrderStatus {
    New = 0,
    Active = 1,
    Completed = 2
}

