import {Observable} from "rxjs/Observable";
import {HttpBag} from "../models/HttpBag";
import {HttpStatus} from "../models/HttpStatus";
import {Observer} from "rxjs/Observer";
import {HttpError} from "../models/HttpError";

export class Asset {
    name: String
    image: String
}

export interface ISearchController{
    search(text: String):Observable<HttpBag<Array<Asset>, HttpError>>
    recent():Observable<HttpBag<Array<Asset>, HttpError>>
}

export class SearchController implements ISearchController {
    search(text: String) {
        return Observable.create((observer: Observer<HttpBag<Array<Asset>, HttpError>>) => {
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

    recent() {
        return Observable.create((observer: Observer<HttpBag<Array<Asset>, HttpError>>) => {
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
                    }
                ]
            }), 1000);
        });
    }
}
