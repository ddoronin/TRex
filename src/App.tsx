import * as React from 'react'
import {
    HashRouter as Router,
    Link,
    Route
} from "react-router-dom";

import Home from "./routes/Home";
import SearchWidget from "./widgets/SearchWidget";
import AppPage from "./routes/AppPage";
import widgetFactory from "./api/widgetFactory";

interface IRoute<T> {
    match: {
        path: string,
        params: T
    }
}

interface IAppParams {
    appId?: string
}

const App = () => (
<Router>
    <article className="application">
        <header>
            <SearchWidget/>
            <div className="edit-pane">
                <Route exact path="/:appId" component={(route: IRoute<IAppParams>) =>
                    <Link to={`/edit/${route.match.params.appId}`}>Edit</Link>}
                />
                <Route exact path="/edit/:appId" component={(route: IRoute<IAppParams>) =>
                    <Link to={`/${route.match.params.appId}`}>Save</Link>}
                />
            </div>
        </header>
        <Route exact path="/edit/:appId" component={(route: IRoute<IAppParams>) =>
            <section className="widget-list-pane">Widgets: {widgetFactory.list().join(', ')}</section>
        }/>
        <section>
            <Route exact path="/" component={Home}/>
            <Route exact path="/:appId" component={(route: IRoute<IAppParams>) => <AppPage appId={route.match.params.appId}/>}/>
            <Route exact path="/edit/:appId" component={(route: IRoute<IAppParams>) =>
                <div className="edit-mode">
                    <AppPage appId={route.match.params.appId}/>
                </div>
            }/>
        </section>
        <footer></footer>
    </article>
</Router>);

export default App;