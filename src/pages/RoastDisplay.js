import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import AddRoasts from "../components/AddRoasts";
const RoastsDisplay = ({ roaster_id }) => {
    const [roasts, setRoasts] = useState(null);
    useEffect(() => {
        getRoasts();
    }, [roaster_id]);
    const URL = `${process.env.REACT_APP_BACKEND_URL}/roasters/${roaster_id}/roasts`;
    const getRoasts = async () => {
        let axiosConfig = {
            headers: {
                "Content-Type": "application/json;char=UTF-8",
                "Access-Control-Allow-Origin": `${process.env.REACT_APP_BACKEND_URL}`,
                withCredentials: "true",
            },
        };
        try {
            await axios.get(URL, axiosConfig).then((res) => {
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
