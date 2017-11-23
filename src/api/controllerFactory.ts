import ServiceLocator from '../di/ServiceLocator';

import {AppController, IAppController} from "../controllers/AppController";
import {ContactsController, IContactsController} from "../controllers/ContactsController";
import {ISearchController, SearchController} from "../controllers/SearchController";
import {AppFragmentsController, IAppFragmentsController} from "../controllers/AppFragmentsController";
import {CreditCalculatorController, ICreditCalculatorController} from "../widgets/CreditCalculator/Controller";

const api = new ServiceLocator();

// TODO: This part can be generated on a server side!

export enum Controllers {
    App = 'IAppController',
    Contacts = 'IContactsController',
    Search = 'ISearchController',
    AppFragments = 'IAppFragmentsController',
    CreditCalculator = 'ICreditCalculatorController'
}

(function(api: ServiceLocator) {
    api.bind<IAppController>(Controllers.App).to(new AppController());
    api.bind<IContactsController>(Controllers.Contacts).to(new ContactsController());
    api.bind<ISearchController>(Controllers.Search).to(new SearchController());
    api.bind<IAppFragmentsController>(Controllers.AppFragments).to(new AppFragmentsController());
    api.bind<ICreditCalculatorController>(Controllers.CreditCalculator).to(new CreditCalculatorController());
})(api);

export default api;