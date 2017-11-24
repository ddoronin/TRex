import * as React from 'react';
import {IAppController} from "../controllers/AppController";
import {IApp} from "../models/App";
import {HttpBag} from "../models/HttpBag";
import {HttpStatus} from "../models/HttpStatus";
import {IFragmentState} from '../common/IFragmentState';
import Loading from "./AppPane/Loading";
import Api from "../api/controllerFactory";
import {HttpError} from "../models/HttpError";
import ReXComponent from "../common/ReXComponent";
import {Subscription} from "rxjs/Subscription";

interface IProps {
    appId: string;
}

class Breadcrumbs extends ReXComponent<IProps, IFragmentState> {
    private readonly appController: IAppController = Api.get<IAppController>('IAppController');
    private subscription: Subscription;

    constructor(props: IProps) {
        super(props);

        this.state = {
            fragment: null
        };
    }

    componentDidMount() {
        this.subscription = this.props$
            .mergeMap(props => this.appController.get(props.appId))
            .map(appBag => this.renderFragment(appBag))
            .subscribe(jsxFragment => {
                this.setState({fragment: jsxFragment});
            });
    }

    componentWillUnmount(){
        this.subscription.unsubscribe();
    }

    renderFragment(appBag: HttpBag<IApp, HttpError>): JSX.Element {
        switch (appBag.status) {
            case HttpStatus.Pending:
                return (<Loading/>);

            case HttpStatus.Succeeded:
                return (<span>{appBag.data.name}</span>);

            case HttpStatus.Failed:
                return <div>Failed!</div>

            default:
                return null;
        }
    }

    render(): JSX.Element {
        return (
            <article className="breadcrumbs">
                {this.state.fragment}
            </article>
        );
    }
}

export default Breadcrumbs;