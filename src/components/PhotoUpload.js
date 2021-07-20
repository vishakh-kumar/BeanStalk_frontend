import React from "react";
import { useState } from "react";

const PhotoUpload = () => {
    const [image, setImage] = useState(null);
    const [imageString, setImageString] = useState(null);
    const onChange = (e) => {
        console.log(e);
        e.persist();
        setImage(e.target.files[0]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("image", image);

        await fetch(`http://localhost:3000/photos`, {
            header: {
                "Content-Type": "application/json;char=UTF-8",
                "Access-Control-Allow-Origin": "*",
            },
            method: "POST",
            body: form,
        }).then((res) => {
            console.log(res.json());
            setImageString(res.json().secure_url);
        });
    };

    return (
        <div className="form">
            <h1>Upload Image</h1>
            <form onSubmit={onSubmit}>
                <label>Image Upload</label>
                <input type="file" name="image" onChange={onChange} />
                <br />
                <input type="submit" />
            </form>
            {imageString && <img src={imageString}></img>}
        </div>
    );
};

export default PhotoUpload;
