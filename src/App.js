import { useState } from "react";
import "./App.css";
import RoasterSignUp from "./components/RoasterSignUp";
import RoasterSignIn from "./components/RoasterSignIn";
import RoasterList from "./components/RoasterList";

function App() {
    const [signedInRoaster, setSignedInRoaster] = useState(null);

    return (
        <div className="App">
            <RoasterSignUp />
            <RoasterSignIn signIn={(roaster) => setSignedInRoaster(roaster)} />
            {signedInRoaster && <div>{signedInRoaster} test</div>}
            <RoasterList />
        </div>
    );
}

export default App;
