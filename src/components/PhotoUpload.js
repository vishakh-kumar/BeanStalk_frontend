import React from "react";
import { useState } from "react";

const PhotoUpload = ({urlString}) => {
    const [image, setImage] = useState(null);
    const onChange = (e) => {
        console.log(e);
        e.persist();
        setImage(e.target.files[0]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("image", image);

        await fetch(`https://beanstalk-api.herokuapp.com/photos`, {
            header: {
                "Content-Type": "application/json;char=UTF-8",
                "Access-Control-Allow-Origin": "*",
            },
            method: "POST",
            body: form,
        })
            .then((res) => res.json())
            .then((data) => urlString(data.url));
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
        </div>
    );
};

export default PhotoUpload;
