import {Observable} from 'rxjs/Observable';
import {Observer} from "rxjs/Observer";
import {App} from '../models/App';
import {HttpBag} from "../models/HttpBag";
import {HttpStatus} from "../models/HttpStatus";

export interface IAppController{
    listApps():Observable<HttpBag<Array<App>>>
}

export class AppController implements IAppController {
    listApps() {
        return Observable.create((observer: Observer<HttpBag<Array<App>>>) => {
            observer.next({status: HttpStatus.Pending, data: null});
            setTimeout(() => observer.next({
                status: HttpStatus.Succeeded, data: [
                    {name: 'Mail'},
                    {name: 'Contacts'},
                    {name: 'Calendar'},
                    {name: 'Photos'},
                    {name: 'Reminders'}
                ]
            }), 1000);
        });
    }
}
