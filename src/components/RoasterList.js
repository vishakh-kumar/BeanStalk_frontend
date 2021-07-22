import { useEffect, useState } from "react";
import RoasterUpdate from "./RoasterUpdate";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RoasterList() {
    const [roasterList, setRoasterList] = useState(null);
    const [displayRoaster, setDisplayRoaster] = useState(null);

    useEffect(() => {
        getRoasters();
    }, []);
    // Need to fix the access control origin
    const getRoasters = async () => {
        let axiosConfig = {
            headers: {
                "Content-Type": "application/json;char=UTF-8",
                "Access-Control-Allow-Origin": `${process.env.REACT_APP_BACKEND_URL}`,
                withCredentials: "true",
            },
        };
        try {
            await axios
                .get(
                    `${process.env.REACT_APP_BACKEND_URL}/roasters`,
                    axiosConfig
                )
                .then((res) => {
                    console.log(res);
                    setRoasterList(res.data.roaster);
                });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            {roasterList &&
                roasterList.map((roaster, idx) => {
                    return (
                        <div
                            key={roaster.id}
                            onClick={() => {
                                console.log(roasterList, idx, roasterList[idx]);
                                setDisplayRoaster(idx);
                            }}
                        >
                            {roaster.name}
                        </div>
                    );
                })}

            {displayRoaster !== null && (
                <RoasterUpdate roaster={roasterList[displayRoaster]} />
            )}
        </>
    );
}
