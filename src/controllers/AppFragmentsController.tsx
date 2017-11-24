import * as _ from 'lodash';
import * as React from "react";
import widgetsFactory, {Widgets} from "../api/widgetFactory";
import {Observable} from "rxjs/Observable";
import {HttpArray} from "./AppController";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {HttpStatus} from "../models/HttpStatus";
import {Subject} from "rxjs/Subject";

type JSXElementCallback = (props?:any) => JSX.Element;

const renderWidget = (widgetId: Widgets, props?:any) => widgetsFactory.get<JSXElementCallback>(widgetId)(props);

export interface IAppFragmentsController {
    resolve(appId: string, contentId?: string): Observable<HttpArray<JSX.Element>>
}

interface IWidget {
    type: Widgets;
    config?: any;
}

type AppId = string;

export class AppFragmentsController implements IAppFragmentsController {
    private readonly appFragments$ = new Map<AppId, BehaviorSubject<HttpArray<JSX.Element>>>();

    renderWidgetSafe(widget: IWidget, index: number):JSX.Element {
        let jsx = null;
        try {
            jsx = renderWidget(widget.type, {...widget.config, key: `${widget.type}-${index}`});
        } catch (error) {
            console.log(widget, error);
        }
        return jsx;
    }

    fetch(appId: string, subject: Subject<HttpArray<JSX.Element>>) {
        subject.next({status: HttpStatus.Pending, data: null});
        fetch(`/api/fragments/${encodeURIComponent(appId)}`)
            .then(res => res.json())
            .then(data => {
                let widgets: Array<JSX.Element> = null;
                if (!_.isEmpty(data)) {
                    widgets = data.map((widget: IWidget, index: number) => this.renderWidgetSafe(widget, index));
                } else {
                    widgets = Array(<div>No widgets found for "{appId}"</div>);
                }
                subject.next({
                    status: HttpStatus.Succeeded,
                    data: widgets
                });
            })
            .catch(error => {
                subject.next({
                    status: HttpStatus.Failed, error
                });
            });
    }

    resolve(appId: string, contentId?: string) {
        let fragments$ = this.appFragments$.get(appId);
        if (!fragments$) {
            fragments$ = new BehaviorSubject(null);
            this.appFragments$.set(appId, fragments$);
        }
        const currentValue = fragments$.getValue();
        if (currentValue === null || currentValue.status === HttpStatus.Failed) {
            this.fetch(appId, fragments$);
        }
        return fragments$.asObservable();
    }
}
