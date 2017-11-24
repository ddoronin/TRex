import * as React from "react";
import ServiceLocator from '../di/ServiceLocator';
import ContactsWidget from "../widgets/ContactsWidget";
import CreditCalculatorWidget from "../widgets/CreditCalculator/Widget";
import AppPane from "../widgets/AppPaneWidget";
import Breadcrumbs from "../widgets/Breadcrumbs";
import SearchWidget from "../widgets/SearchWidget";
import WidgetListPane from "../widgets/WidgetListPane";

const factory = new ServiceLocator();

// TODO: this part should be generated on a server side!

export enum Widgets {
    Contacts = 'Contacts',
    CreditCalculator = 'CreditCalculator',
    AppPane = 'AppPane',
    BreadCrumbs = 'Breadcrumbs',
    Search = 'Search',
    Widgets = 'WidgetPane'
}

(function(api: ServiceLocator) {
    api.bind<JSX.Element>(Widgets.Contacts).to((props?: any) => <ContactsWidget {...props}/>);
    api.bind<JSX.Element>(Widgets.CreditCalculator).to((props?: any) => <CreditCalculatorWidget {...props}/>);
    api.bind<JSX.Element>(Widgets.AppPane).to((props?: any) => <AppPane {...props}/>);
    api.bind<JSX.Element>(Widgets.BreadCrumbs).to((props?: any) => <Breadcrumbs {...props}/>);
    api.bind<JSX.Element>(Widgets.Search).to((props?: any) => <SearchWidget {...props}/>);
    api.bind<JSX.Element>(Widgets.Widgets).to((props?: any) => <WidgetListPane {...props}/>);
})(factory);

export default factory;