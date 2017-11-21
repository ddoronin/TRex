import * as React from 'react'
import {
    HashRouter as Router,
    Route
} from "react-router-dom";

import Home from "./routes/Home";
import Mail from "./routes/Mail";
import Contacts from "./routes/Contacts";
import Photos from "./routes/Photos";
import Reminder from "./routes/Reminder";

import SearchWidget from "./widgets/SearchWidget";
import AppPage from "./routes/AppPage";

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
        </header>
        <section>
            <Route exact path="/" component={Home}/>
            <Route path="/apps" component={(route: IRoute<any>) => {
                return (
                    <div className="app-container">
                        <Route exact path={route.match.path} component={() => (<h1>hey</h1>)}/>
                        <Route path={`${route.match.path}/:appId`}
                               component={(route: IRoute<IAppParams>) => <AppPage appId={route.match.params.appId}/>}
                        />
                    </div>
                );
            }}/>
            <Route exact path="/mail" component={Mail}/>
            <Route exact path="/contacts" component={Contacts}/>
            <Route exact path="/photos" component={Photos}/>
            <Route exact path="/reminder" component={Reminder}/>
        </section>
        <footer></footer>
    </article>
</Router>);

export default App;