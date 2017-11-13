import * as React from 'react';
import {App} from "../../models/App";
import AppIcon from "./AppIcon";

interface IProps{
    apps: Array<App>
}

const AppIconBag = (props: IProps):JSX.Element => (
    <ul>
        {props.apps.map(app =>{
            return (
                <li key={app.name.toString()}>
                    <AppIcon app={app}/>
                </li>
            );
        })}
    </ul>
);

export default AppIconBag;