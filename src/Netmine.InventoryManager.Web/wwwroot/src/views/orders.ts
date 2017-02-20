import {inject} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";
import {Router} from 'aurelia-router';

@inject(HttpClient, json, Router)
export class Orders {

    router: Router;
    activeOrders: Array<IOrder>;
    selectedOrder: IOrderDetails;

    constructor(private http: HttpClient, json, router: Router) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('api/');
        });

        this.router = router;
    }

    activate() {
        this.fetchOrdersByStatus(OrderStatus.Active);
    }
    
    fetchOrdersByStatus(status) {
        return this.http.fetch(`order/${status}`).
            then(response => response.json()).then(data => {
                this.activeOrders = data;
            });
    }

    showOrderDetails(order) {
        let id = order.id;
        return this.http.fetch(`order/details/${id}`).
            then(response => response.json()).then(data => {
                this.selectedOrder = data;
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

export interface IOrderDetails {
    id: string;
    userName: string;
    recipientName: string;
    street: string;
    city: string;
    zipCode: string;
    message: string;
}

enum OrderStatus {
    New = 0,
    Active = 1,
    Completed = 2
}

