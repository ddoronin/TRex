import * as React from 'react';
import Api from "../Api";
import {IAppFragmentsController} from "../controllers/AppFragmentsController";

interface IProps{
    appId?:string
}

const appFragmentsController: IAppFragmentsController = Api.get('IAppFragmentsController');

const AppPage = (props: IProps) => (
    <article className={`app-${props.appId}`}>
        <section>
            {appFragmentsController.resolve(props.appId).map((fragment, index) => {
                return (<div key={index} className="fragment">{fragment}</div>);
            })}
        </section>
    </article>
);

export default AppPage;
