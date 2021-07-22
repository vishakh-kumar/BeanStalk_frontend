import { useState } from "react";
import {Router, Switch, Route} from "react-router";
import {createBrowserHistory} from "history";
import "./App.css";
import Homepage from "./views/Homepage/Homepage";
import SignIn from "./views/SignIn/SignIn";
import RoasterSignUp from "./components/RoasterSignUp";
import RoasterSignIn from "./components/RoasterSignIn";
import SearchDisplay from "./views/Search/SearchDisplay";
import RoasterList from "./components/RoasterList";
import RegisterRoaster from "./views/Registrations/RegisterRoaster";
import RegisterUser from "./views/Registrations/RegisterUser";


function App() {
    const [signedInRoaster, setSignedInRoaster] = useState(null);
    var hist = createBrowserHistory();


    return (
        <div className="App">
            <Router history={hist}>
                <Switch>
                    <Route path="/" exact component={Homepage} />
                    <Route path="/signin" exact>
                        <SignIn signIn={(roaster) => setSignedInRoaster(roaster)} />
                    </Route>
                    <Route path="/register/roaster" exact component={RegisterRoaster} />
                    <Route path="/register/user" exact component={RegisterUser} />
                    <Route path="/search" exact component={SearchDisplay} />
                </Switch>
            </Router>
            <RoasterSignUp />
            <RoasterSignIn signIn={(roaster) => setSignedInRoaster(roaster)} />
            {signedInRoaster &&
            <div>
                {signedInRoaster} test
            </div>}
            <RoasterList />
        </div>
    );
}

export default App;
