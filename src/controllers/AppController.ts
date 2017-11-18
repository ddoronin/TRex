import {Observable} from 'rxjs/Observable';
import {Observer} from "rxjs/Observer";
import {App} from '../models/App';
import {HttpBag} from "../models/HttpBag";
import {HttpError} from "../models/HttpError";
import {HttpStatus} from "../models/HttpStatus";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export type HttpArray<T> = HttpBag<Array<T>, HttpError>

export interface IAppController {
    listApps(): Observable<HttpArray<App>>
}

export class AppController implements IAppController {
    private readonly apps$: Observable<HttpArray<App>> = BehaviorSubject.create();

    listApps() {
        const fetch$ = Observable.create((observer: Observer<HttpArray<App>>) => {
            observer.next({status: HttpStatus.Pending, data: null});
            fetch('/api/apps')
                .then(res => res.json())
                .then(apps => {
                    observer.next({
                        status: HttpStatus.Succeeded, data: apps
                    });
                })
                .catch(error => {
                    observer.next({
                        status: HttpStatus.Failed, error
                    });
                })
        });
        this.apps$.subscribe(fetch$);
        return fetch$;
    }
}
