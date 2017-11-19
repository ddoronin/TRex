export interface ICreditCalculatorController {
    calculateMonthlyPayment(amount: number, maturity: number, percentage: number):number
    createPaymentReport(amount: number, maturity: number, percentage: number): IPaymentReport
}

interface IPaymentReport{
    payments: Array<{
        i: number,
        x: number,
        rest: number,
        restMain: number,
        restPercentage: number
    }>
}

export class CreditCalculatorController implements ICreditCalculatorController {
    calculateMonthlyPayment(amount: number, maturity: number, percentage: number): number {
        const k = 1 + percentage / 12;
        let s = 0;
        let a = 1;
        for(let i = 0; i < maturity; i++) {
            a /= k;
            s += a;
        }
        return amount / s;
    }

    createPaymentReport(amount: number, maturity: number, percentage: number): IPaymentReport {
        const report:IPaymentReport = {
            payments: []
        };

        const k = 1 + percentage / 12;
        const x = this.calculateMonthlyPayment(amount, maturity, percentage);

        const a = [k];
        for(let i = 1; i <= maturity; i++) {
            a[i] = a[i - 1] * k;
        }

        const s = new Array<number>();
        for(let i = 0; i < maturity; i++) {
            let summa = 0;

            for(let j = 1; j <= i; j++) {
                summa += a[i - j];
            }
            s[i] = amount * a[i] - x * summa;
            report.payments.push({
                i: i + 1,
                x,
                rest: s[i],
                restMain: (amount - s[i]) / amount,
                restPercentage: (s[i] - (amount - x)) / amount
            });
        }

        return report;
    }
}
