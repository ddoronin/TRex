import * as React from "react";
import ServiceLocator from '../di/ServiceLocator';
import ContactsWidget from "../widgets/ContactsWidget";
import CreditCalculatorWidget from "../widgets/CreditCalculator/Widget";

const factory = new ServiceLocator();

// TODO: this part should be generated on a server side!

export enum Widgets {
    Contacts = 'ContactsWidget',
    CreditCalculator = 'CreditCalculator'
}

(function(api: ServiceLocator) {
    api.bind<JSX.Element>(Widgets.Contacts).to((props?: any) => <ContactsWidget {...props}/>);
    api.bind<JSX.Element>(Widgets.CreditCalculator).to((props?: any) => <CreditCalculatorWidget {...props}/>);
})(factory);

export default factory;