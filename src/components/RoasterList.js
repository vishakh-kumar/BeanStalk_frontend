import { useEffect, useState } from "react";
import RoasterUpdate from "./RoasterUpdate";
import axios from "axios";

export default function RoasterList() {
    const [roasterList, setRoasterList] = useState(null);
    const [displayRoaster, setDisplayRoaster] = useState(null);

    useEffect(() => {
        getRoasters();
    }, [])
    // Need to fix the access control origin
    const getRoasters = async () => {
        let axiosConfig = {
            headers: {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*",
                "withCredentials": "true"
            },
        };
        try {
            axios.get('https://beanstalk-api.herokuapp.com/roasters', axiosConfig)
                .then(res => {
                    console.log(res)
                    setRoasterList(res.data.roaster)
                })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            {roasterList && (
                roasterList.map((roaster, idx) => {
                    return <div
                        key={roaster.id}
                        onClick={() => {
                            console.log(roasterList, idx, roasterList[idx])
                            setDisplayRoaster(idx)
                        }}
                    >
                        {roaster.email}
                    </div>
                })
            )}

            {displayRoaster !== null && <RoasterUpdate roaster={roasterList[displayRoaster]} />}
        </>
    )
}