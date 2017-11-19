import ServiceLocator from './di/ServiceLocator';

import {AppController, IAppController} from "./controllers/AppController";
import {ContactsController, IContactsController} from "./controllers/ContactsController";
import {ISearchController, SearchController} from "./controllers/SearchController";
import {AppFragmentsController, IAppFragmentsController} from "./controllers/AppFragmentsController";
import {CreditCalculatorController, ICreditCalculatorController} from "./widgets/CreditCalculator/Controller";

const api = new ServiceLocator();

export enum Services {
    App = 'IAppController',
    Contacts = 'IContactsController',
    Search = 'ISearchController',
    AppFragments = 'IAppFragmentsController',
    CreditCalculator = 'ICreditCalculatorController'
};

(function(api: ServiceLocator) {
    api.bind<IAppController>(Services.App).to(new AppController());
    api.bind<IContactsController>(Services.Contacts).to(new ContactsController());
    api.bind<ISearchController>(Services.Search).to(new SearchController());
    api.bind<IAppFragmentsController>(Services.AppFragments).to(new AppFragmentsController());
    api.bind<ICreditCalculatorController>(Services.CreditCalculator).to(new CreditCalculatorController());
})(api);

export default api;