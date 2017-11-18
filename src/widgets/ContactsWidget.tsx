import * as React from 'React';
import Api from "../Api";
import {IContactsController} from "../controllers/ContactsController";
import {IFragmentState} from "../common/IFragmentState";
import {HttpBag} from "../models/HttpBag";
import {Contact} from "../models/Contact";
import {HttpStatus} from "../models/HttpStatus";
import {Subscription} from "rxjs/Subscription";
import {HttpError} from "../models/HttpError";

interface IProps{}

class ContactsWidget extends React.Component<IProps, IFragmentState> {
    private subscription: Subscription;
    private readonly contactsController: IContactsController = Api.get<IContactsController>('IContactsController');

    constructor(props: IProps) {
        super(props);
        this.state = {
            fragment: null
        }
    }

    componentDidMount() {
        this.subscription = this.contactsController
            .listContacts()
            .subscribe(contactsBag => this.setState({fragment: this.renderFragment(contactsBag)}));
    }

    componentWillUnmount(){
        this.subscription.unsubscribe();
    }

    renderFragment(contactBag: HttpBag<Array<Contact>, HttpError>): JSX.Element {
        switch (contactBag.status) {
            case HttpStatus.Pending:
                return <div>Loading</div>;

            case HttpStatus.Succeeded:
                return (
                    <div>{contactBag.data.map(contact =>
                        <div>{contact.firstName} - {contact.lastName}</div>)}
                    </div>
                );

            case HttpStatus.Failed:
                return <div>Failed</div>;

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

export default ContactsWidget;