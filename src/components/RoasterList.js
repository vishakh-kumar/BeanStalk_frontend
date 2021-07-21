import { useEffect, useState } from "react";
import RoasterUpdate from "./RoasterUpdate";
import axios from "axios";

export default function RoasterList() {
    const [roasterList, setRoasterList] = useState(null);
    const [displayRoaster, setDisplayRoaster] = useState(null);

    useEffect(() => {
        getRoasters();
    }, [])

    const getRoasters = async () => {
        let axiosConfig = {
            headers: {
                "Content-Type": "application/json;char=UTF-8",
                "Access-Control-Allow-Origin": "https://beanstalk-api.herokuapp.com",
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