import { useState, useEffect } from "react";
import "./App.css";
import BusinessSignIn from "./components/BusinessSignIn";

function App() {
    const [roastersState, setRoastersState] = useState({ roasters: [] });

    useEffect(() => {
        async function getRoasters() {
            try {
                const roasters = await fetch("http://localhost:3000").then(
                    (response) => response.json()
                );
                setRoastersState({ roasters });
            } catch (error) {
                console.log(error);
            }
        }
        getRoasters();
    }, []);
    async function handleAdd(formInputs) {
        try {
            const roasters = await fetch("http://localhost:3000", {
                method: "POST",
                header: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify(formInputs),
            }).then((res) => res.json());
            setRoastersState({ roasters });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="App">
            <BusinessSignIn handleAdd={handleAdd} />
        </div>
    );
}

export default App;
