import * as React from 'react'
import {
    HashRouter as Router,
    Link,
    Route
} from "react-router-dom";

import Home from "./routes/Home";
import AppPage from "./routes/AppPage";
import WidgetListPane from "./widgets/WidgetListPane";
import {IAppParams, IRoute} from "./common/routeUtils";
import Breadcrumbs from "./widgets/Breadcrumbs";

const App = () => (
    <Router>
        <article className="application">
            <header>
                <h1>
                    <Link to="/">
                        <i className="fa fa-paw" aria-hidden="true"/>
                    </Link>
                    <Route exact path="(/edit)?/:appId" component={(route: IRoute<IAppParams>) =>
                        <Breadcrumbs appId={route.match.params.appId}/>
                    }/>
                </h1>
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
                <WidgetListPane/>
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
            <footer/>
        </article>
    </Router>);

export default App;