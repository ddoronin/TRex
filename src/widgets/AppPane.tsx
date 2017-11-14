import * as React from 'React';
import {IAppController} from "../controllers/AppController";
import {App} from "../models/App";
import {HttpBag} from "../models/HttpBag";
import {HttpStatus} from "../models/HttpStatus";
import {IFragmentState} from '../common/IFragmentState';
import Loading from "./AppPaneComponents/Loading";
import AppIconBag from "./AppPaneComponents/AppIconBag";
import Failed from "./AppPaneComponents/Failed";
import Api from "../Api";

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
            .listApps()
            .subscribe(appsBag => this.setState({fragment: this.renderFragment(appsBag)}));
    }

    componentDidMount() {
        this.listApps();
    }

    renderFragment(appsBag: HttpBag<Array<App>>): JSX.Element {
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
            <article>
                {this.state.fragment}
            </article>
        );
    }
}

export default AppPane;