import {useState} from "react";
import axios from "axios";


export default function RoasterUpdate({roaster}) {
    const [update, setUpdate] = useState({
        email: "",
    })

    console.log("is this the real life", roaster)

    const handleUpdate = async () => {
        let axiosConfig = {
            headers: {
                "Content-Type": "application/json;char=UTF-8",
                "Access-Control-Allow-Origin": "*",
            },
        }
        try {
            await axios.put(`https://beanstalk-api.herokuapp.com/roasters/${roaster.id}`, update, axiosConfig)
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
        setUpdate({...update, [name]: event.target.value });
    }

    return (
        <div>
            currently displaying roaster {roaster.email}
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
            <button onClick={deleteRoaster}>Delete</button>
        </div>
    )
}