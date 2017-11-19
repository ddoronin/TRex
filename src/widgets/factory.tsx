import * as React from "react";
import ServiceLocator from '../di/ServiceLocator';
import ContactsWidget from "./ContactsWidget";

const factory = new ServiceLocator();

export enum Widgets {
    Contacts = 'ContactsWidget'
}

(function(api: ServiceLocator) {
    api.bind<JSX.Element>(Widgets.Contacts).to((props?:any) =><ContactsWidget {...props}/>);
})(factory);

export default factory;