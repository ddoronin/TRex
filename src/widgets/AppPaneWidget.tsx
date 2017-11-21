import * as React from 'react';
import {IAppController} from "../controllers/AppController";
import {App} from "../models/App";
import {HttpBag} from "../models/HttpBag";
import {HttpStatus} from "../models/HttpStatus";
import {IFragmentState} from '../common/IFragmentState';
import Loading from "./AppPane/Loading";
import AppIconBag from "./AppPane/AppIconBag";
import Failed from "./AppPane/Failed";
import Api from "../api/controllerFactory";
import {HttpError} from "../models/HttpError";

interface IProps{}

class AppPane extends React.Component<IProps, IFragmentState> {
    private readonly appController: IAppController = Api.get<IAppController>('IAppController');

    constructor(props: IProps) {
        super(props);
        this.state = {
            fragment: null
        }
    }

    listApps() {
        this.appController
            .list()
            .subscribe(appsBag => this.setState({fragment: this.renderFragment(appsBag)}));
    }

    componentDidMount() {
        this.listApps();
    }

    renderFragment(appsBag: HttpBag<Array<App>, HttpError>): JSX.Element {
        switch (appsBag.status) {
            case HttpStatus.Pending:
                return (<Loading/>);

            case HttpStatus.Succeeded:
                return <AppIconBag apps={appsBag.data}/>;

            case HttpStatus.Failed:
                return <Failed retry={this.listApps.bind(this)}/>

            default:
                return null;
        }
    }

    render(): JSX.Element {
        return (
            <article className="app-pane-widget">
                {this.state.fragment}
            </article>
        );
    }
}

export default AppPane;