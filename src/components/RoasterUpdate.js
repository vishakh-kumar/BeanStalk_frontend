import { useState } from "react";
import axios from "axios";
import PhotoUpload from "./PhotoUpload";


export default function RoasterUpdate({ roaster }) {
    const [update, setUpdate] = useState({
        email: "",
        img_url: ""
    });

    console.log("is this the real life", roaster)

    const handleUpdate = async () => {
        let axiosConfig = {
            headers: {
                "Content-Type": "application/json;char=UTF-8",
                "Access-Control-Allow-Origin": "https://beanstalk-api.herokuapp.com",

                "withCredentials": "true"
            },
        }
        try {
            await axios.put(`http://localhost:3001/roasters/${roaster.id}`, update, axiosConfig)
                .then(res => console.log(res))
        } catch (e) {
            console.log(e)
        }
    }

    const deleteRoaster = async () => {
        let axiosConfig = {
            headers: {
                "Content-Type": "application/json;char=UTF-8",
                "Access-Control-Allow-Origin": "*",
            },
        };
        try {
            await axios.delete(`https://beanstalk-api.herokuapp.com/roasters/${roaster.id}`, axiosConfig)
                .then(res => console.log(res))
        } catch (e) {
            console.log(e)
        }
    }

    const handleUpdateChange = (event, name) => {
        console.log(event, name)
        setUpdate({ ...update, [name]: event.target.value });
    }

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

            <PhotoUpload urlString={(url) => setUpdate({...update, ["img_url"]: url })} />
            {update.image !== "" && <img src={update.image} />}
            <button onClick={deleteRoaster}>Delete</button>
        </div>
    )
}