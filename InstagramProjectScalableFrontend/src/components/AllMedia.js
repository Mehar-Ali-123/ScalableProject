import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_url, server } from "../server"; // Make sure server is correctly pointing to your API base URL

const AllMedia = () => {
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const res = await axios.get(`${server}/get-all-media`);
                if (res.data.success) {
                    const allMedia = res.data.media;

                    // Separate images and videos
                    const imagesArr = allMedia.filter(item => item.fileType == "image");
                    const videosArr = allMedia.filter(item => item.fileType == "video");

                    setImages(imagesArr);
                    setVideos(videosArr);
                    console.log(images, videos)
                } else {
                    alert("Failed to load media.");
                }
            } catch (error) {
                console.error("Error fetching media:", error);
                alert("Error loading media.");
            }
        };

        fetchMedia();
    }, []);
 
    return (
        <div style={{ padding: "20px" }}>
            <h2 style={{ marginBottom: "20px" }}>Images</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
                {images.map((img) => (
                    <div key={img._id} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "10px" }}>
                        <h4>{img.title}</h4>
                        <p>{img.description}</p>
                        <img
                            src={`${backend_url}/${img.file}`}
                            alt={img.title}
                            style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "4px" }}
                        />
                    </div>
                ))}
            </div>

            <h2 style={{ margin: "40px 0 20px" }}>Videos</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
                {videos.map((vid) => (
                    <div key={vid._id} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "10px" }}>
                        <h4>{vid.title}</h4>
                        <p>{vid.description}</p>
                        <video
                            controls
                            src={`${backend_url}/${vid.file}`}
                            style={{ width: "100%", maxHeight: "200px", borderRadius: "4px" }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllMedia;
