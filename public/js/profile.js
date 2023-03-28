import "./profile.css"
import { Avatar } from "@mui/material";
import { useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function App() {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    };
    const handleSubmit = () => {
        const imageRef = ref(storage, "image");
        uploadBytes(imageRef, image).then(() => {
            getDownloadURL(imageRef).then((url) => {
                setUrl(url)
            })
                .catch(error => {
                    console.log(error.message, "error image url");
                });
            setImage(null);
                .catch(error => {
                console.log(error.message, "error image url");
            });
    };

    return (
        <div className="App">
            <Avatar src={url} sx={{ width: 100, height: 100 }} />
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default App;


