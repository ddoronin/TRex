import * as React from "react";
import ServiceLocator from '../di/ServiceLocator';
import ContactsWidget from "./ContactsWidget";
import CreditCalculatorWidget from "./CreditCalculator/Widget";

const factory = new ServiceLocator();

export enum Widgets {
    Contacts = 'ContactsWidget',
    CreditCalculator = 'CreditCalculator'
}

(function(api: ServiceLocator) {
    api.bind<JSX.Element>(Widgets.Contacts).to((props?: any) => <ContactsWidget {...props}/>);
    api.bind<JSX.Element>(Widgets.CreditCalculator).to((props?: any) => <CreditCalculatorWidget {...props}/>);
})(factory);

export default factory;