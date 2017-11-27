import * as React from 'react';
import {IAppController} from "../controllers/AppController";
import {IApp} from "../models/App";
import {IFragmentState} from '../common/IFragmentState';
import Loading from "./AppPane/Loading";
import Api from "../api/controllerFactory";
import {HttpError} from "../models/HttpError";
import ReXHttpComponent from "../common/ReXHttpComponent";

interface IProps {
    appId: string;
}

class Breadcrumbs extends ReXHttpComponent<IProps, IFragmentState, IApp> {
    private readonly appController: IAppController = Api.get<IAppController>('IAppController');

    constructor(props: IProps) {
        super(props);

        this.state = {
            fragment: null
        };
    }

    sourceData(props: IProps) {
        return this.appController.get(props.appId);
    }

    protected renderPending(): JSX.Element {
        return (<Loading/>);
    }

    protected renderSucceeded(app: IApp): JSX.Element {
        return (<span>{app.name}</span>);
    }

    protected renderFailed(error: HttpError): JSX.Element {
        return <div>Failed!</div>
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