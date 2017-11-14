import {Observable} from 'rxjs/Observable';
import {Observer} from "rxjs/Observer";
import {HttpBag} from "../models/HttpBag";
import {HttpStatus} from "../models/HttpStatus";
import {Contact} from "../models/Contact";

export interface IContactsController{
    listContacts():Observable<HttpBag<Array<Contact>>>
}

export class ContactsController implements IContactsController {
    listContacts() {
        return Observable.create((observer: Observer<HttpBag<Array<Contact>>>) => {
            observer.next({status: HttpStatus.Pending, data: null});
            setTimeout(() => observer.next({
                status: HttpStatus.Succeeded, data: [
                    {
                        firstName: 'Dmitry',
                        lastName: 'Doronin'
                    },
                    {
                        firstName: 'Alice',
                        lastName: 'Scala'
                    },
                    {
                        firstName: 'Bob',
                        lastName: 'Dotty'
                    }
                ]
            }), 1000);
        });
    }
}
