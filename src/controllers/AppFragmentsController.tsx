import * as React from "react";
import widgetsFactory, {Widgets} from "../api/widgetFactory";
import {Observable} from "rxjs/Observable";
import {HttpArray} from "./AppController";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observer} from "rxjs/Observer";
import {HttpStatus} from "../models/HttpStatus";

type JSXElementCallback = (props?:any) => JSX.Element;

const renderWidget = (widgetId: Widgets, props?:any) => widgetsFactory.get<JSXElementCallback>(widgetId)(props);

export interface IAppFragmentsController {
    resolve(appId: string, contentId?: string): Observable<HttpArray<JSX.Element>>
}

interface IWidget {
    type: Widgets;
    config?: any;
}

export class AppFragmentsController implements IAppFragmentsController {
    private readonly fragments$: Observable<HttpArray<JSX.Element>> = BehaviorSubject.create();

    resolve(appId: string, contentId?: string) {
        const fetch$ = Observable.create((observer: Observer<HttpArray<JSX.Element>>) => {
            observer.next({status: HttpStatus.Pending, data: null});
            fetch('/api/fragments/')
                .then(res => res.json())
                .then(data => {
                    let widgets: Array<JSX.Element> = null;
                    if (data[appId]) {
                        widgets = data[appId].map((widget: IWidget) => renderWidget(widget.type, widget.config));
                    } else {
                        widgets = Array(<div>No widgets found for "{appId}"</div>);
                    }
                    observer.next({
                        status: HttpStatus.Succeeded,
                        data: widgets
                    });
                })
                .catch(error => {
                    observer.next({
                        status: HttpStatus.Failed, error
                    });
                });
        });
        this.fragments$.subscribe(fetch$);
        return fetch$;
    }
}
