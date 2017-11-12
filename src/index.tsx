import * as React from "react";
import * as ReactDOM from "react-dom";

// Inject dependencies
import Api from './Api';
import {inject} from './inject';
inject(Api);

import Weather from "./widgets/Weather";

ReactDOM.render(
    <Weather/>,
    document.getElementById("app")
);
