import * as React from 'react';
import Api from "../api/controllerFactory";
import {IContactsController} from "../controllers/ContactsController";
import {IFragmentState} from "../common/IFragmentState";
import {HttpBag} from "../models/HttpBag";
import {Contact} from "../models/Contact";
import {HttpStatus} from "../models/HttpStatus";
import {Subscription} from "rxjs/Subscription";
import {HttpError} from "../models/HttpError";
import {Link} from "react-router-dom";

interface IProps {
    title?: string
}

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
                    <div>
                        {contactBag.data.map((contact, index) =>
                        <div key={index}>{contact.firstName} - {contact.lastName}</div>)}
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
                <header>
                    <Link className="home" to="/contacts">
                        <h2>{this.props.title}</h2>
                    </Link>
                </header>
                <section>
                    {this.state.fragment}
                </section>
            </article>
        );
    }
}

export default ContactsWidget;