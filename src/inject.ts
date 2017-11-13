import Api from './Api';
import ServiceLocator from "./di/ServiceLocator";
import {AppController, IAppController} from "./controllers/AppController";

export const inject = function(api: ServiceLocator){
    Api.bind<IAppController>('IAppController').to(new AppController());
};