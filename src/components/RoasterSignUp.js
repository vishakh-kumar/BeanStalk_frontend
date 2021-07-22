import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";


const RoasterSignUp = function () {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        img_url: "",
        password_confirmation: "",
        registrationErrors: "",
    });

    useEffect(() => {
        checkLoginStatus();
    }, [])


    const checkLoginStatus = function () {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/logged_in`, { withCredentials: true })
            .then(response => {
                console.log(response, response.data.logged_in)
                if (response.data.logged_in) {
                    console.log(response.data.roaster.email)
                }
            })
            .catch(error => {
                console.log("check login error", error)
            })
    };

    const handleSubmit = function (event) {
        event.preventDefault();
        let axiosConfig = {
            headers: {
                "Content-Type": "application/json;char=UTF-8",
                "Access-Control-Allow-Origin": `${process.env.REACT_APP_BACKEND_URL}`,
                "withCredentials": "true"
            },
        };
        axios
            .post(
                "http://localhost:3001/registrations",
                {
                    roaster: {
                        email: form.email || undefined,
                        password: form.password || undefined,
                        password_confirmation:
                            form.password_confirmation || undefined,
                    },
                },
                axiosConfig
            )
            .then((response) => {
                console.log("registration res", response);
            })
            .catch((error) => {
                console.log("registration error", error);
            });
    };

    const handleChange = (name) => (event) => {
        setForm({ ...form, [name]: event.target.value });
    };

    const handleLogout = () => {
        let axiosConfig = {
            headers: {
                "Content-Type": "application/json;char=UTF-8",
                "Access-Control-Allow-Origin": `${process.env.REACT_APP_BACKEND_URL}`,
                "withCredentials": "true"
            },
        };
        axios
            .delete(
                `${process.env.REACT_APP_BACKEND_URL}/logout`,
                axiosConfig
            )
            .then((response) => {
                console.log("registration res", response);
            })
            .catch((error) => {
                console.log("registration error", error);
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange("password")}
                    required
                />

                <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Password_confirmation"
                    value={form.password_confirmation}
                    onChange={handleChange("password_confirmation")}
                    required
                />

                <button type="submit">Register</button>
            </form>

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default RoasterSignUp;
