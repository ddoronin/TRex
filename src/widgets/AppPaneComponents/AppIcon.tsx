import * as React from 'react';
import {App} from "../../models/App";

interface IProps {
    app: App
}

const AppIcon = (props: IProps):JSX.Element => (
    <article>{props.app.name}</article>
);

export default AppIcon;