import * as React from 'react';
import {App} from "../../models/App";
import {AppIcon} from "./AppIcon";
import {Link} from "react-router-dom";

interface IProps{
    apps: Array<App>
}

const AppIconBag = (props: IProps):JSX.Element => (
    <ul className="app-list">
        {props.apps.map(app =>{
            return (
                <li className="app-list-item" key={app.name.toString()}>
                    <Link to={`/${app.name.toLowerCase()}`}><AppIcon app={app}/></Link>
                </li>
            );
        })}
    </ul>
);

export default AppIconBag;