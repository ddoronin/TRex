import {HttpBag} from "../models/HttpBag";
import {Observable} from "rxjs/Observable";
import {HttpError} from "../models/HttpError";
import {HttpStatus} from "../models/HttpStatus";
import {Subscription} from "rxjs/Subscription";
import {IFragmentState} from "./IFragmentState";
import ReXComponent from "./ReXComponent";

export default abstract class ReXHttpComponent<P, S extends IFragmentState, T> extends ReXComponent<P, S> {
    private subscription: Subscription;

    constructor(props: P) {
        super(props);
    }

    protected abstract sourceData(props: P): Observable<HttpBag<T, HttpError>>

    componentDidMount() {
        this.subscription = this.props$
            .mergeMap(props => this.sourceData(props))
            .map(httpBag => this.renderFragment(httpBag))
            .subscribe(jsxFragment => {
                this.setState({fragment: jsxFragment});
            });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    protected abstract renderPending(): JSX.Element

    protected abstract renderSucceeded(data: T): JSX.Element

    protected abstract renderFailed(error: HttpError): JSX.Element

    renderFragment(httpBag: HttpBag<T, HttpError>): JSX.Element {
        switch (httpBag.status) {
            case HttpStatus.Pending:
                return this.renderPending();

            case HttpStatus.Succeeded:
                return this.renderSucceeded(httpBag.data);

            case HttpStatus.Failed:
                return this.renderFailed(httpBag.error);

            default:
                return null;
        }
    }
}
