import {Observable} from 'rxjs/Observable';
import {Observer} from "rxjs/Observer";
import {App} from '../models/App';
import {HttpBag} from "../models/HttpBag";
import {HttpStatus} from "../models/HttpStatus";
import {Injectable} from "../di/ServiceLocator";

export class IAppController extends Injectable{
    static guid: 'IAppController';
}

export interface IAppController{
    listApps():Observable<HttpBag<Array<App>>>
}

export class AppController implements IAppController {
    listApps() {
        return Observable.create((observer: Observer<HttpBag<Array<App>>>) => {
            observer.next({status: HttpStatus.Pending, data: null});
            setTimeout(() => observer.next({
                status: HttpStatus.Succeeded, data: [
                    {
                        name: 'Mail',
                        image: 'https://www.icloud.com/system/cloudos/17GProject50/cloudos_foundation/17GProject50/en-us/source/resources/images/app_icons/mail_icon@2x.png'
                    },
                    {
                        name: 'Contacts',
                        image: 'https://www.icloud.com/system/cloudos/17GProject50/cloudos_foundation/17GProject50/en-us/source/resources/images/app_icons/contacts_icon@2x.png'
                    },
                    {
                        name: 'Photos',
                        image: 'https://www.icloud.com/system/cloudos/17GProject50/cloudos_foundation/17GProject50/en-us/source/resources/images/app_icons/photos_icon@2x.png'
                    },
                    {
                        name: 'Reminder',
                        image: 'https://www.icloud.com/system/cloudos/17GProject50/cloudos_foundation/17GProject50/en-us/source/resources/images/app_icons/reminders_icon@2x.png'
                    }
                ]
            }), 1000);
        });
    }
}
