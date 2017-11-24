import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {Observer} from "rxjs/Observer";
import {IApp} from '../models/App';
import {HttpBag} from "../models/HttpBag";
import {HttpError} from "../models/HttpError";
import {HttpStatus} from "../models/HttpStatus";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subject} from "rxjs/Subject";

export type HttpArray<T> = HttpBag<Array<T>, HttpError>
export type HttpItem<T> = HttpBag<T, HttpError>

export interface IAppController {
    get(appId: string): Observable<HttpItem<IApp>>
    list(): Observable<HttpArray<IApp>>
    install(): Observable<HttpArray<IApp>>
    uninstall(): Observable<HttpArray<IApp>>
}

export class AppController implements IAppController {
    private readonly apps$ = new BehaviorSubject(null);

    fetch(subject: Subject<HttpArray<IApp>>) {
        subject.next({status: HttpStatus.Pending, data: null});
        fetch('/api/apps')
            .then(res => res.json())
            .then(data => {
                subject.next({
                    status: HttpStatus.Succeeded, data
                });
            })
            .catch(error => {
                subject.next({
                    status: HttpStatus.Failed, error
                });
            });
    }

    get(appId: string): Observable<HttpItem<IApp>> {
        return this.list()
            .map((apps: HttpArray<IApp>) => ({
                status: apps.status,
                data: apps.status === HttpStatus.Succeeded ? _.find(apps.data, {id: appId}) : null,
                error: apps.error
            }));
    }

    list():Observable<HttpArray<IApp>> {
        const currentValue = this.apps$.getValue();
        if (currentValue === null || currentValue.status === HttpStatus.Failed) {
            this.fetch(this.apps$);
        }
        return this.apps$.asObservable();
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
