import {Observable} from 'rxjs/Observable';
import {Observer} from "rxjs/Observer";
import {App} from '../models/App';
import {HttpBag} from "../models/HttpBag";
import {HttpError} from "../models/HttpError";
import {HttpStatus} from "../models/HttpStatus";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export type HttpArray<T> = HttpBag<Array<T>, HttpError>

export interface IAppController {
    list(): Observable<HttpArray<App>>
    install(): Observable<HttpArray<App>>
    uninstall(): Observable<HttpArray<App>>
}

export class AppController implements IAppController {
    private readonly apps$: Observable<HttpArray<App>> = BehaviorSubject.create();

    list() {
        const fetch$ = Observable.create((observer: Observer<HttpArray<App>>) => {
            observer.next({status: HttpStatus.Pending, data: null});
            fetch('/api/apps')
                .then(res => res.json())
                .then(data => {
                    observer.next({
                        status: HttpStatus.Succeeded, data
                    });
                })
                .catch(error => {
                    observer.next({
                        status: HttpStatus.Failed, error
                    });
                });
        });
        this.apps$.subscribe(fetch$);
        return fetch$;
    }

    install(): Observable<HttpArray<App>> {
        const fetch$ = Observable.create((observer: Observer<HttpArray<App>>) => {
            observer.next({status: HttpStatus.Pending, data: null});
            fetch('/api/apps', {
                method: 'POST',
                headers: [
                    ['Content-Type', 'application/json']
                ],
                body: {}
            })
                .then(res => res.json())
                .then(data => {
                    observer.next({
                        status: HttpStatus.Succeeded, data
                    });
                })
                .catch(error => {
                    observer.next({
                        status: HttpStatus.Failed, error
                    });
                });
        });
        this.apps$.subscribe(fetch$);
        return fetch$;

    }

    uninstall(): Observable<HttpArray<App>> {
        const fetch$ = Observable.create((observer: Observer<HttpArray<App>>) => {
            observer.next({status: HttpStatus.Pending, data: null});
            fetch('/api/apps')
                .then(res => res.json())
                .then(data => {
                    observer.next({
                        status: HttpStatus.Succeeded, data
                    });
                })
                .catch(error => {
                    observer.next({
                        status: HttpStatus.Failed, error
                    });
                });
        });
        this.apps$.subscribe(fetch$);
        return fetch$;
    }

}
