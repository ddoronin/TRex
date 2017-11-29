import * as React from 'react';
import ReXHttpComponent from '../../common/ReXHttpComponent';
import { IFragmentState } from '../../common/IFragmentState';
import { Weblog, IWeblogController } from '../../controllers/WeblogController';
import Api, { Controllers } from '../../api/controllerFactory';
import { HttpError } from '../../models/HttpError';

interface IProps{
}

class WeblogListWidget extends ReXHttpComponent<IProps, IFragmentState, Array<Weblog>> {
    private readonly weblogController: IWeblogController = Api.get<IWeblogController>(Controllers.Weblogs);

    constructor(props: IProps) {
        super(props);

        this.state = {
            fragment: null
        };
    }

    sourceData(props: IProps) {
        return this.weblogController.list();
    }

    protected renderPending(): JSX.Element {
        return (<span>Loading...</span>);
    }

    protected renderSucceeded(weblogs: Array<Weblog>): JSX.Element {
        return (<article>
            <header>Weblogs:</header>
            <section>
                {
                    weblogs.map(weblog => (
                        <article key={weblog.blogId}>
                            <header>{weblog.title}</header>
                            <section>
                                <p>{weblog.body}</p>
                            </section>
                        </article>
                    ))
                }
            </section>
        </article>);
    }

    protected renderFailed(error: HttpError): JSX.Element {
        return <div>Failed!</div>
    }

    render(): JSX.Element {
        return (
            <article className="weblogs">
                {this.state.fragment}
            </article>
        );
    }
}

export default WeblogListWidget;