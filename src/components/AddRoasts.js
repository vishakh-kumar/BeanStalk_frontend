import React from "react";
import { useState } from "react";
import axios from "axios";

const AddRoasts = ({ roaster_id }) => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/roasters/${roaster_id}/roasts`;
    const [newForm, setNewForm] = useState({
        name: "",
        notes: "",
        origin: "",
        description: "",
        published: false,
    });
    const handleAdd = async (event) => {
        let axiosConfig = {
            headers: {
                "Content-Type": "application/json;char=UTF-8",
                "Access-Control-Allow-Origin": `${URL}`,
                withCredentials: "true",
            },
        };
        axios
            .post(
                `${URL}`,
                {
                    roast: {
                        name: newForm.name || undefined,
                        notes: newForm.notes || undefined,
                        origin: newForm.origin || undefined,
                        description: newForm.description || undefined,
                        published: newForm.published || undefined,
                    },
                },
                axiosConfig
            )
            .then((response) => {
                console.log("roasts", response);
            })
            .catch((error) => {
                console.log("roasts", error);
            });
    };
    const handleChange = (event) => {
        setNewForm({ ...newForm, [event.target.name]: event.target.value });
    };
    const handleChecked = (event) => {
        setNewForm({ ...newForm, [event.target.name]: event.target.checked });
    };
    const onSubmit = (event) => {
        event.preventDefault();
        if (!newForm.name) {
            alert("Please Add Roast");
            return;
        }
        handleAdd(newForm);
        setNewForm({
            name: "",
            notes: "",
            origin: "",
            description: "",
            published: false,
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    placeholder="Name of the Roast"
                    name="name"
                    value={newForm.name}
                    onChange={handleChange}
                />
                <label>Notes</label>
                <input
                    type="text"
                    placeholder="Notes in Roast"
                    name="notes"
                    value={newForm.notes}
                    onChange={handleChange}
                />
                <label>Origin</label>
                <input
                    type="text"
                    placeholder="Origin of the Roast"
                    name="origin"
                    value={newForm.origin}
                    onChange={handleChange}
                />
                <label>Description</label>
                <input
                    type="text"
                    placeholder="Desc of the Roast"
                    name="description"
                    value={newForm.description}
                    onChange={handleChange}
                />
                <label>Is it published?</label>
                <input
                    type="checkbox"
                    name="published"
                    value={newForm.published}
                    onChange={handleChecked}
                />
            </div>
            <button type="submit">Add Roast</button>
        </form>
    );
};

export default AddRoasts;
