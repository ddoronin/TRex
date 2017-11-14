import ServiceLocator from "./di/ServiceLocator";
import {AppController, IAppController} from "./controllers/AppController";
import {ContactsController, IContactsController} from "./controllers/ContactsController";

export const inject = function(api: ServiceLocator) {
    api.bind<IAppController>('IAppController').to(new AppController());
    api.bind<IContactsController>('IContactsController').to(new ContactsController());
};