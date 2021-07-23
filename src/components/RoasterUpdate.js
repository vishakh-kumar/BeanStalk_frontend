import { useState } from "react";
import axios from "axios";
import axiosConfig from "../helpers/axiosConfig";
import PhotoUpload from "./PhotoUpload";
import RoastsDisplay from "../pages/RoastDisplay";

export default function RoasterUpdate({ roaster }) {
    const [update, setUpdate] = useState({
        email: "",
        img_url: "",
    });

    console.log("is this the real life", roaster);

    const handleUpdate = async () => {
        try {
            await axios
                .put(
                    `https://beanstalk-api.herokuapp.com/roasters/${roaster.id}`,
                    update,
                    axiosConfig
                )
                .then((res) => console.log(res));
        } catch (e) {
            console.log(e);
        }
    };

    const deleteRoaster = async () => {
        try {
            await axios
                .delete(
                    `https://beanstalk-api.herokuapp.com/roasters/${roaster.id}`,
                    axiosConfig
                )
                .then((res) => console.log(res));
        } catch (e) {
            console.log(e);
        }
    };

    const handleUpdateChange = (event, name) => {
        console.log(event, name);
        setUpdate({ ...update, [name]: event.target.value });
    };

    return (
        <div>
            currently displaying roaster {roaster.email}
            <img src={roaster.img_url} alt="Roaster Image" />
            <form onSubmit={handleUpdate}>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={update.email}
                    onChange={(e) => handleUpdateChange(e, "email")}
                    required
                />
            </form>
            <PhotoUpload
                urlString={(url) => setUpdate({ ...update, ["img_url"]: url })}
            />
            {update.image !== "" && <img src={update.image} />}
            <RoastsDisplay roaster_id={roaster.id} />
            <button onClick={deleteRoaster}>Delete</button>
        </div>
    );
}
