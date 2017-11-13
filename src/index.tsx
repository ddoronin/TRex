import * as React from "react";
import * as ReactDOM from "react-dom";

// Inject dependencies
import Api from './Api';
import {inject} from './inject';
inject(Api);

import AppPane from "./widgets/AppPane";

ReactDOM.render(
    <AppPane/>,
    document.getElementById("app")
);
