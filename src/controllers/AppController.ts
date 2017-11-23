import {Observable} from 'rxjs/Observable';
import {Observer} from "rxjs/Observer";
import {IApp} from '../models/App';
import {HttpBag} from "../models/HttpBag";
import {HttpError} from "../models/HttpError";
import {HttpStatus} from "../models/HttpStatus";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export type HttpArray<T> = HttpBag<Array<T>, HttpError>

export interface IAppController {
    list(): Observable<HttpArray<IApp>>
    install(): Observable<HttpArray<IApp>>
    uninstall(): Observable<HttpArray<IApp>>
}

export class AppController implements IAppController {
    private readonly apps$: Observable<HttpArray<IApp>> = BehaviorSubject.create();

    list() {
        const fetch$ = Observable.create((observer: Observer<HttpArray<IApp>>) => {
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

    install(): Observable<HttpArray<IApp>> {
        const fetch$ = Observable.create((observer: Observer<HttpArray<IApp>>) => {
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

    uninstall(): Observable<HttpArray<IApp>> {
        const fetch$ = Observable.create((observer: Observer<HttpArray<IApp>>) => {
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
