import * as React from 'react';
import {IApp} from "../../models/App";

interface IProps {
    app: IApp
}

export const AppIcon = (props: IProps): JSX.Element => (
    <article className="app-icon">
        <header>
            <h4 style={{textAlign: 'center', margin: 5}}>{props.app.name}</h4>
        </header>
        <section>
            <img src={props.app.image.toString()} width={142} height={142}/>
        </section>
        <footer/>
    </article>
);
