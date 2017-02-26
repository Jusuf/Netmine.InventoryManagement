import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";

@inject(Router)
export class App {
    router: Router;

    constructor() { }

    configureRouter(config, router: Router) {
        this.router = router;

        config.title = "AureliaTSapp";
        config.map([
            //navigation
            { route: ["", "warehouse"], name: "warehouse", moduleId: "./views/warehouse", nav: true, title: "Lager", settings: { icon: "inbox" } },
            { route: "orders", name: "orders", moduleId: "./views/orders", nav: true, title: "Ordrar", settings: { icon: "list-alt" } },
            { route: "transactions", name: "transactions", moduleId: "./views/transactions", nav: true, title: "Transaktioner", settings: { icon: "truck" }  },
            { route: "articles", name: "articles", moduleId: "./views/articles", nav: true, title: "Artiklar", settings: { icon: "tags" } },

            //child nav, settings
            { route: "users", name: "users", moduleId: "./views/users", nav: true, title: "Användare", settings: { icon: "user" } },
            { route: "racks", name: "racks", moduleId: "./views/racks", nav: true, title: "Lagerplatser", settings: { icon: "reorder" } },
            //inventeringslista? länk till xls

            //not on navigation
            { route: "articleDetails/:id", name: "articleDetails", moduleId: "./views/articleDetails", title: "Article details" },
        ]);
    }
}