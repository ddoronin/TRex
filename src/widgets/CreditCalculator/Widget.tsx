import * as React from 'react';
import {IFragmentState} from "../../common/IFragmentState";
import {ICreditCalculatorController} from "./Controller";
import {default as api, Controllers} from "../../api/controllerFactory";

interface IDefaultCalculatorConfig{
    totalAmount?: number
    maturity?: number
    percentage?: number
}

interface IProps extends IDefaultCalculatorConfig{
    title?: string
}

interface IState extends IFragmentState, IDefaultCalculatorConfig{
    fragment: JSX.Element
    totalAmount?: number
    maturity?: number
    percentage?: number
}

interface INumberEvent{
    target: {
        value: number
    }
}

class CreditCalculatorWidget extends React.Component<IProps, IState> {
    private readonly creditCalculatorController:ICreditCalculatorController = api.get(Controllers.CreditCalculator);

    constructor(props: IProps) {
        super(props);
        this.state = {
            fragment: null,
            totalAmount: props.totalAmount,
            maturity: props.maturity,
            percentage: props.percentage
        };

        this.onTotalAmountChange = this.onTotalAmountChange.bind(this);
        this.onMaturityChange = this.onMaturityChange.bind(this);
        this.onPercentageChange = this.onPercentageChange.bind(this);
    }

    onTotalAmountChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({totalAmount: parseInt(event.currentTarget.value, 10)});
    }

    onMaturityChange(event: React.FormEvent<HTMLInputElement>){
        this.setState({maturity: parseInt(event.currentTarget.value, 10)});
    }

    onPercentageChange(event: React.FormEvent<HTMLInputElement>){
        this.setState({percentage: parseFloat(event.currentTarget.value)});
    }

    renderCalculations(){
        if(this.state.totalAmount && this.state.maturity && this.state.percentage){
            const x = this.creditCalculatorController.calculateMonthlyPayment(this.state.totalAmount, this.state.maturity, this.state.percentage);
            const report = this.creditCalculatorController.createPaymentReport(this.state.totalAmount, this.state.maturity, this.state.percentage);
            return (
                <div>
                <p>x = {x.toFixed(2)}</p>
                    <table>
                        {report.payments.map(payment => (
                            <tr>
                                <td>{payment.i}</td>
                                <td>{payment.x.toFixed(2)}</td>
                                <td>{(payment.rest).toFixed(2)}</td>
                                <td>{(payment.restMain * 100).toFixed(2)}</td>
                                <td>{(payment.restPercentage * 100).toFixed(2)}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            );
        }
        return 'No Data';
    }

    render(): JSX.Element {
        return (
            <article>
                <header>
                    <h2>{this.props.title || 'Credit Calculator'}</h2>
                </header>
                <section>
                    <form>
                        <div>
                            <label htmlFor="total-amount">X</label>
                            <input defaultValue={this.state.totalAmount.toString()} name="total-amount" type="number" onChange={this.onTotalAmountChange}/>
                        </div>
                        <div>
                            <label htmlFor="maturity">M</label>
                            <input defaultValue={this.state.maturity.toString()} name="maturity" type="number" onChange={this.onMaturityChange}/>
                        </div>
                        <div>
                            <label htmlFor="percentage">P</label>
                            <input defaultValue={this.state.percentage.toString()} name="percentage" type="number" onChange={this.onPercentageChange}/>
                        </div>
                    </form>
                    {this.renderCalculations()}
                </section>
            </article>
        );
    }
}

export default CreditCalculatorWidget;