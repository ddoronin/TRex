import ServiceLocator from "./di/ServiceLocator";
import {AppController, IAppController} from "./controllers/AppController";

export const inject = function(api: ServiceLocator) {
    api.bind<IAppController>().to(new AppController());
};