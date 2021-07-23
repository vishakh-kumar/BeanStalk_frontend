import axios from "axios";
import axiosConfig from "../helpers/axiosConfig";
import React from "react";
import { useEffect, useState } from "react";
import AddRoasts from "../components/AddRoasts";
const RoastsDisplay = ({ roaster_id }) => {
    const [roasts, setRoasts] = useState(null);

    useEffect(() => {
        getRoasts();
    }, [roaster_id]);
    const getRoasts = async () => {
        try {
            await axios.get(process.env.REACT_APP_BACKEND_URL, axiosConfig).then((res) => {
                console.log(res);
                setRoasts(res.data.roast);
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <AddRoasts roaster_id={roaster_id} />
            {roasts ? (
                <ul>
                    <p>
                        {roasts.length
                            ? `Total Roasts associated = ${roasts.length}`
                            : `No Roasts available for this Roaster`}
                    </p>
                    {roasts.map((roast) => (
                        <li key={roast.id}>{roast.name}</li>
                    ))}
                </ul>
            ) : (
                <p>loading</p>
            )}
        </div>
    );
};

export default RoastsDisplay;
