import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../api/product";
import usetechhiveStore from "../../store/techhive-store";
import { Loader } from "lucide-react";
// import { Loader } from 'lucide-react';

const Uploadfile = (props) => {
    const { form, setForm } = props;
    const token = usetechhiveStore((state) => state.token)
    const [isLoading, setIsLoading] = useState(false);

    const handleOnChange = (e) => {
        setIsLoading(true)
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
                                setIsLoading(false)
                                toast.success("Upload image Successfully!")
                            })
                            .catch((error) => {
                                console.log(error)
                                setIsLoading(false)
                            })
                    },
                    "base64"
                )
            }
        }
        console.log(e.target.files)
    };
    console.log(form)

    const handleDelete = (public_id) => {
        // console.log(public_id)
        const images = form.images;
        removeFiles(token, public_id)
            .then((res) => {
                const filterImages = images.filter((item) => {
                    console.log(item)
                    // Return only the undeleted public_id
                    return item.public_id !== public_id
                });
                console.log("filterImages", filterImages)
                // send to image []
                setForm({
                    ...form,
                    images: filterImages
                })

                toast.error(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="my-4">

            <div className="flex mx-4 gap-4 my-4">
                {
                    isLoading && <Loader className="w-9 h-9 animate-spin" />
                }

                {/* Image */}
                {
                    form.images.map((item, index) =>
                        <div className="relative" key={index}>
                            <img
                                className="w-55 h-55 hover:scale-104"
                                src={item.url} />
                            <span
                                onClick={() => handleDelete(item.public_id)}
                                className="absolute top-0 right-0 bg-yellow-200 px-3 py-1 rounded-sm">x</span>
                        </div>
                    )
                }
            </div>
            <div>
                <input
                    onChange={handleOnChange}
                    type="file"
                    name="images"
                    multiple
                />
            </div>
        </div >
    )
}
export default Uploadfile