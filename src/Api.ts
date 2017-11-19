import ServiceLocator from './di/ServiceLocator';

import {AppController, IAppController} from "./controllers/AppController";
import {ContactsController, IContactsController} from "./controllers/ContactsController";
import {ISearchController, SearchController} from "./controllers/SearchController";
import {AppFragmentsController, IAppFragmentsController} from "./controllers/AppFragmentsController";

const api = new ServiceLocator();

(function(api: ServiceLocator) {
    api.bind<IAppController>('IAppController').to(new AppController());
    api.bind<IContactsController>('IContactsController').to(new ContactsController());
    api.bind<ISearchController>('ISearchController').to(new SearchController());
    api.bind<IAppFragmentsController>('IAppFragmentsController').to(new AppFragmentsController());
})(api);

export default api;