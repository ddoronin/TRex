import * as React from 'react';
import {App} from "../../models/App";

interface IProps {
    app: App
}

const AppIcon = (props: IProps): JSX.Element => (
    <article>
        <header>
            <h4 style={{textAlign: 'center', margin: 5}}>{props.app.name}</h4>
        </header>
        <section>
            <img src={props.app.image.toString()} width={142} height={142}/>
        </section>
        <footer/>
    </article>
);

export default AppIcon;