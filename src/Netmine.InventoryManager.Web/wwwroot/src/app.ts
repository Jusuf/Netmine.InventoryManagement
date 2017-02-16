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
            { route: ["", "warehouse"], name: "warehouse", moduleId: "./views/warehouse", nav: true, title: "Lager" },
            { route: "articleDetails/:id", name: "articleDetails", moduleId: "./views/articleDetails", title: "Article details" }
        ]);
    }
}