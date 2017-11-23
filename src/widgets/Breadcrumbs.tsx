import * as React from 'react';
import {IAppController} from "../controllers/AppController";
import {IApp} from "../models/App";
import {HttpBag} from "../models/HttpBag";
import {HttpStatus} from "../models/HttpStatus";
import {IFragmentState} from '../common/IFragmentState';
import Loading from "./AppPane/Loading";
import Failed from "./AppPane/Failed";
import Api from "../api/controllerFactory";
import {HttpError} from "../models/HttpError";

interface IProps {
    appId: string;
}

class Breadcrumbs extends React.Component<IProps, IFragmentState> {
    private readonly appController: IAppController = Api.get<IAppController>('IAppController');

    constructor(props: IProps) {
        super(props);
        this.state = {
            fragment: null
        }
    }

    componentDidMount() {
        this.getApp();
    }

    getApp() {
        const {
            appId
        } = this.props;

        this.appController
            .get(appId)
            .subscribe(appBag => {
                this.setState({fragment: this.renderFragment(appBag)});
            });
    }

    renderFragment(appBag: HttpBag<IApp, HttpError>): JSX.Element {
        switch (appBag.status) {
            case HttpStatus.Pending:
                return (<Loading/>);

            case HttpStatus.Succeeded:
                return (<span>{appBag.data.name}</span>);

            case HttpStatus.Failed:
                return <Failed retry={this.getApp.bind(this)}/>

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