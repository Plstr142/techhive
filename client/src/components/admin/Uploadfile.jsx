import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { uploadFiles } from "../../api/product";
import usetechhiveStore from "../../store/techhive-store";

const Uploadfile = (props) => {
    const { form, setForm } = props;
    const token = usetechhiveStore((state) => state.token)
    const [isLoading, setIsLoading] = useState(false);
    const handleOnChange = (e) => {
        const files = e.target.files;
        if (files) {
            setIsLoading(true);
            let allFiles = form.images; // [] empty array
            for (let i = 0; i < files.length; i++) {
                // console.log(files[i]);

                // Check validate file type
                const file = files[i];
                if (!file.type.startsWith("image/")) {
                    toast.error(`File ${file.name} is not an image!`)
                    continue;
                }

                // Image Resize
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        // console.log("data", data)
                        // endpoint Backend
                        uploadFiles(token, data)
                            // server response to client
                            .then((res) => {
                                console.log(res)

                                allFiles.push(res.data)
                                setForm({
                                    ...form,
                                    images: allFiles
                                })
                                toast.success("Upload image Successfully!")
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    },
                    "base64"
                )
            }
        }
        console.log(e.target.files)
    };

    return (
        <div>
            <input
                onChange={handleOnChange}
                type="file"
                name="images"
                multiple
            />
        </div>
    )
}
export default Uploadfile