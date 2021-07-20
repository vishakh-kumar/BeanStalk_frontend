import {useState} from "react";
import axios from "axios";

export default function RoasterSignIn(props) {
    const [signIn, setSignIn] = useState({
        email: "",
        password: "",
    });

    const handleChange = (name) => (event) => {
        console.log()
        setSignIn({ ...signIn, [name]: event.target.value });
    };

    const handleSignIn = function (event) {
        event.preventDefault();
        let axiosConfig = {
            headers: {
                "Content-Type": "application/json;char=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "withCredentials": "true"
            },
        };
        axios
            .post(
                "https://beanstalk-api.herokuapp.com/sessions",
                {
                    roaster: {
                        email: signIn.email,
                        password: signIn.password,
                    },
                },
                axiosConfig
            )
            .then((response) => {
                console.log("registration res", response);
                props.signIn(response.data.roaster.email);
            })
            .catch((error) => {
                console.log("registration error", error);
            });
    };

    return <form onSubmit={handleSignIn}>
        <input
            type="email"
            name="email"
            placeholder="email"
            value={signIn.email}
            onChange={handleChange("email")}
            required
        />

        <input
            type="password"
            name="password"
            placeholder="Password"
            value={signIn.password}
            onChange={handleChange("password")}
            required
        />

        <button type="submit">Register</button>
    </form>;
}