import * as React from "react";
import * as ReactDOM from "react-dom";

// Inject dependencies
import Api from './Api';
import {inject} from './inject';
inject(Api);

import App from './App';

ReactDOM.render(
    <App/>,
    document.getElementById("app")
);
