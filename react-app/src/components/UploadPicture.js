import React, {useState} from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";


const UploadPicture = () => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    console.log('--------------------------------')
    console.log('--------------------------------')
    console.log('--------------------------------')
    useEffect(() => {
      console.log(image)
    }, [image]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch('/api/images', {
            method: "POST",
            body: formData,
        });
        // console.log(await res.json())
        let errorMessage = await res.json()
        console.log(errorMessage)
        console.log('await json')
        console.log('await json')
        console.log('await json')
        console.log('await json')
        if (res.ok) {
            await res.json();
            setImageLoading(false);
            // history.push("/images");
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <form>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            <button type="button" onClick={handleSubmit}>Submit</button>
            {(imageLoading)&& <p>Loading...</p>}
        </form>
    )
}

export default UploadPicture;
