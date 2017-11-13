import * as React from 'react';
import {App} from "../../models/App";
import AppIcon from "./AppIcon";
import {Link} from "react-router-dom";

interface IProps{
    apps: Array<App>
}

const AppIconBag = (props: IProps):JSX.Element => (
    <ul>
        {props.apps.map(app =>{
            return (
                <li style={{display: 'inline-block', margin: 10, padding: 10}} key={app.name.toString()}>
                    <Link to={`/${app.name.toLowerCase()}`}><AppIcon app={app}/></Link>
                </li>
            );
        })}
    </ul>
);

export default AppIconBag;