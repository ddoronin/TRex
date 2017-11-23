import * as React from 'react'
import {
    HashRouter as Router,
    Link,
    Route
} from "react-router-dom";
import Home from "./routes/Home";
import AppPage from "./routes/AppPage";
import {IAppParams, IRoute} from "./common/routeUtils";

const App = () => (
<Router>
    <article className="application">
        <header>
            <h1>
                <Link to="/">
                    <i className="fa fa-paw" aria-hidden="true"/>
                </Link>
            </h1>
        </header>
        <section>
            <Route exact path="/" component={Home}/>
            <Route exact path="/:appId" component={(route: IRoute<IAppParams>) => <AppPage appId={route.match.params.appId}/>}/>
        </section>
        <footer/>
    </article>
</Router>);

export default App;