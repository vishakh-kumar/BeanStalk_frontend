import { useState } from "react";
import {Router, Switch, Route} from "react-router";
import {createBrowserHistory} from "history";
import "./App.css";
import Homepage from "./views/Homepage/Homepage";
import SignIn from "./views/SignIn/SignIn";
import SearchDisplay from "./views/Search/SearchDisplay";
import RoasterDisplay from "./views/RoasterDisplay/RoasterDisplay";
import RegisterRoaster from "./views/Registrations/RegisterRoaster";
import RegisterUser from "./views/Registrations/RegisterUser";
import RoasterAccountSettings from "./views/RoasterAcct/AccountSettings";
import RoasterList from "./components/RoasterList";
import RoasterUpdate from "./components/RoasterUpdate";
import ScrollToTop from "./helpers/ScrollToTop";
import AuthenticationContext from "./AuthenticationContext";


function App() {
    const updateAuthentication = (signedInUser) => {
        setAuthentication(prevState => ({...prevState, signedInUser: signedInUser}))
    }

    const initialAuthentication = {signedInUser: null, updateAuthentication: updateAuthentication};
    const [authentication, setAuthentication] = useState(initialAuthentication);

    var hist = createBrowserHistory();


    return (
        <div className="App">
            <AuthenticationContext.Provider value={authentication}>
            <Router history={hist}>
                <Switch>
                    <ScrollToTop>
                            <Route exact path="/signin" component={SignIn} />
                            <Route exact path="/register/roaster" component={RegisterRoaster} />
                            <Route exact path="/register/user" component={RegisterUser} />
                            <Route path="/roaster/:id" exact>
                                <RoasterDisplay />
                            </Route>
                            <Route exact path="/search" component={SearchDisplay} />
                            <Route exact path="/roaster/:id/settings" component={RoasterAccountSettings} />
                            <Route exact path="/" component={Homepage} />
                    </ScrollToTop>
                </Switch>
            </Router>
            </AuthenticationContext.Provider>
            <RoasterList />
        </div>
    );
}

export default App;
