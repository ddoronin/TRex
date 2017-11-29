import { HttpBag } from "../models/HttpBag";
import { Observable } from "rxjs/Observable";
import { HttpError } from "../models/HttpError";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { PromiseObservable } from "rxjs/observable/PromiseObservable"
import { HttpStatus } from "../models/HttpStatus";
import { Subject } from "rxjs/Subject";

export class Weblog{
    constructor(public blogId: string, public title: string, public body: string){
    }
}

export interface IWeblogController{
    list():Observable<HttpBag<Array<Weblog>, HttpError>>
}

export class WeblogController implements IWeblogController{
    private readonly weblogs$ = new BehaviorSubject(null);

    fetch(subject: Subject<HttpBag<Array<Weblog>, HttpError>>) {
        subject.next({status: HttpStatus.Pending, data: null});
        fetch('/api/blogs')
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

    list():Observable<HttpBag<Array<Weblog>, HttpError>>{
        const currentValue = this.weblogs$.getValue();
        if (currentValue === null || currentValue.status === HttpStatus.Failed) {
            this.fetch(this.weblogs$);
        }
        return this.weblogs$.asObservable();
    }
}

