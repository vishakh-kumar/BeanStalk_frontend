import React from "react";
import { useState } from "react";
import axios from "axios";

const BusinessSignIn = function () {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        img_url: "",
        password_confirmation: "",
        registrationErrors: "",
    });

    const handleSubmit = function (event) {
        let axiosConfig = {
            headers: {
                "Content-Type": "application/json;char=UTF-8",
                "Access-Control-Allow-Origin": "*",
            },
        };
        axios
            .post(
                "http://localhost:3000/registrations",
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
        event.preventDefault();
    };

    const handleChange = (name) => (event) => {
        setForm({ ...form, [name]: event.target.value });
    };

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
                ></input>

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange("password")}
                    required
                ></input>

                <input
                    type="password"
                    name="password_confirmation"
                    palceholder="Password_confirmation"
                    value={form.password_confirmation}
                    onChange={handleChange("password_confirmation")}
                    required
                ></input>

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default BusinessSignIn;
