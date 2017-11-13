import * as React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
import Home from "./routes/Home";
import Mail from "./routes/Mail";
import Contacts from "./routes/Contacts";
import Photos from "./routes/Photos";
import Reminder from "./routes/Reminder";

const App = () => (
<Router>
    <div>
        <h1><Link to="/">{'<T>Rex'}</Link></h1>
        <hr/>
        <Route exact path="/" component={Home}/>
        <Route path="/mail" component={Mail}/>
        <Route path="/contacts" component={Contacts}/>
        <Route path="/photos" component={Photos}/>
        <Route path="/reminder" component={Reminder}/>
    </div>
</Router>);

export default App;