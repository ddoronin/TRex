import * as React from 'react';
import Api from "../api/controllerFactory";
import {IAppFragmentsController} from "../controllers/AppFragmentsController";
import {IFragmentState} from "../common/IFragmentState";
import {HttpBag} from "../models/HttpBag";
import {HttpError} from "../models/HttpError";
import {HttpStatus} from "../models/HttpStatus";
import {Subscription} from "rxjs/Subscription";

interface IProps{
    appId?:string
}

export default class AppPage extends React.Component<IProps, IFragmentState> {
    private readonly appFragmentsController: IAppFragmentsController = Api.get('IAppFragmentsController');
    private subscriptions: Array<Subscription> = [];

    constructor(props: IProps) {
        super(props);

        this.state = {
            fragment: null
        };
    }

    componentDidMount() {
        this.subscriptions.push(
            this.appFragmentsController
                .resolve(this.props.appId)
                .subscribe(widgetsBag => this.setState({fragment: <div>{this.renderFragment(widgetsBag)}</div>}))
        );
    }

    componentWillUnmount() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    renderFragment(widgetsBag: HttpBag<Array<JSX.Element>, HttpError>): JSX.Element {
        switch (widgetsBag.status) {
            case HttpStatus.Pending:
                return <div>Loading...</div>;

            case HttpStatus.Succeeded:
                return (
                    <div>{widgetsBag.data.map(widget =>
                        <div>{widget}</div>)}
                    </div>
                );

            case HttpStatus.Failed:
                return <div>Failed</div>;

            default:
                return null;
        }
    }

    render() {
        return (
            <article className={`app-${this.props.appId}`}>
                <section>
                    {this.state.fragment}
                </section>
            </article>
        );
    }
}
