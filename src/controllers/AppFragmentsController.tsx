import * as React from "react";
import widgetsFactory, {Widgets} from "../widgets/factory";

type JSXElementCallback = (props?:any) => JSX.Element;
const renderWidget = (widgetId: Widgets, props?:any) => widgetsFactory.get<JSXElementCallback>(widgetId)(props);

export interface IAppFragmentsController {
    resolve(appId: string, contentId?: string): Array<JSX.Element>
}

export class AppFragmentsController implements IAppFragmentsController {
    resolve(appId: string, contentId?: string) {
        switch (appId) {
            case 'contacts':
                return new Array<JSX.Element>(
                    renderWidget(Widgets.Contacts)
                );

            default:
                return new Array<JSX.Element>(
                    <div>Not Found</div>
                );
        }
    }
}
