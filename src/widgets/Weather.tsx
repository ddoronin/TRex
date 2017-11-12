import * as React from 'React';
import {Observable} from 'rxjs/Observable';
import {Observer} from "rxjs/Observer";

interface IProps {
}

interface IState {
    fragment: JSX.Element
}

interface IWeatherNow {
    status: HttpStatus
}

interface IWeatherController {
    getWeatherNow(): Observable<IWeatherNow>
}

const enum HttpStatus {
    Pending,
    Succeeded,
    Failed
}

class AccuWeatherController implements IWeatherController {
    getWeatherNow() {
        return Observable.create((observer: Observer<IWeatherNow>) => {
            observer.next({status: HttpStatus.Pending});
            setTimeout(() => observer.next({status: HttpStatus.Succeeded}), 1000);
            setTimeout(() => observer.next({status: HttpStatus.Failed}), 2000);
        });
    }
}

class Weather extends React.Component<IProps, IState> {
    private weatherController: IWeatherController;

    constructor(props: IProps) {
        super(props);
        this.state = {
            fragment: this.renderFragment(null)
        };
        this.weatherController = new AccuWeatherController();
    }

    renderFragment(status: HttpStatus): JSX.Element {
        switch (status) {
            case HttpStatus.Pending:
                return (<h1>Loading</h1>);

            case HttpStatus.Succeeded:
                return (<h1>Succeeded</h1>);

            case HttpStatus.Failed:
                return (<h1>Failed</h1>);

            default:
                return (<button onClick={() => this.getWeather()}>Click</button>);
        }
    }

    getWeather() {
        this.weatherController
            .getWeatherNow()
            .subscribe(weather => this.setState({fragment: this.renderFragment(weather.status)}));
    }

    render() {
        return (
            <div>
                <h1>Hey!</h1>
                {this.state.fragment}
            </div>
        );
    }
}

export default Weather;
