import React, { useState, useEffect } from "react";
import axios from "axios";
import BannerImage from "../assets/images/instagrambanner.png";
import DefaultThumbnail from "../assets/images/defaultThumbnail.jpg";
import { backend_url, server } from "../server";

export default function WatchAndEnjoy() {
  const [activeTab, setActiveTab] = useState("Videos");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axios.get(`${server}/get-all-media`);
        if (res.data.success) {
          const allMedia = res.data.media;

          // Separate images and videos
          const imagesArr = allMedia.filter(item => item.fileType === "image");
          const videosArr = allMedia.filter(item => item.fileType === "video");

          setImages(imagesArr);
          setVideos(videosArr);
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

  const VideoCard = ({ src, thumbnail, title, description }) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleLike = () => {
      setLiked(!liked);
      if (disliked) setDisliked(false);
    };

    const handleDislike = () => {
      setDisliked(!disliked);
      if (liked) setLiked(false);
    };

    const handlePlay = () => {
      setIsPlaying(!isPlaying);
    };

    return (
      <div className="p-4">
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform">
          <div className="relative aspect-video">
            {!isPlaying ? (
              <>
                <img
                  src={thumbnail}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                  <button
                    onClick={handlePlay}
                    className="text-white text-4xl font-semibold"
                  >
                    ▶️
                  </button>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 w-full h-full">
                {typeof src === "string" && src.includes("youtube") ? (
                  <iframe
                    className="w-full h-full"
                    src={`${backend_url}/${src}`}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video className="w-full h-full object-cover" controls autoPlay>
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}
          </div>
          <div className="p-4">
            <p className="text-white text-sm">{description}</p>
            <div className="flex mt-2 space-x-4">
              <button
                onClick={handleLike}
                className={`p-2 rounded-full ${liked ? "bg-green-500" : "bg-gray-700"} hover:bg-green-600 transition-colors`}
              >
                👍
              </button>
              <button
                onClick={handleDislike}
                className={`p-2 rounded-full ${disliked ? "bg-red-500" : "bg-gray-700"} hover:bg-red-600 transition-colors`}
              >
                👎
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PictureCard = ({ src, alt, description }) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const handleLike = () => {
      setLiked(!liked);
      if (disliked) setDisliked(false);
    };

    const handleDislike = () => {
      setDisliked(!disliked);
      if (liked) setLiked(false);
    };

    return (
      <div className="p-4">
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform">
          <div className="relative aspect-video">
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="p-4">
            <p className="text-white text-sm">{description}</p>
            <div className="flex mt-2 space-x-4">
              <button
                onClick={handleLike}
                className={`p-2 rounded-full ${liked ? "bg-green-500" : "bg-gray-700"} hover:bg-green-600 transition-colors`}
              >
                👍
              </button>
              <button
                onClick={handleDislike}
                className={`p-2 rounded-full ${disliked ? "bg-red-500" : "bg-gray-700"} hover:bg-red-600 transition-colors`}
              >
                👎
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section
        className="h-48 md:h-56 lg:h-80 bg-primary bg-opacity-10 mt-12 md:mt-15 lg:mt-0 bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${BannerImage})` }}
      >
      </section>
      <div className="container mx-auto px-4 py-20 pt-10 max-w-6xl">
        <div className="flex justify-center mt-10">
          <ul className="flex list-none flex-row flex-wrap border-2 border-primary rounded-3xl w-auto overflow-hidden text-[9px] sm:text-[15px]">
            <li>
              <button
                className={`block border-transparent px-2 md:px-7 p-3 font-medium leading-tight ${activeTab === "Videos" ? "border-primary bg-primary text-white" : "text-neutral-500 dark:text-white/50"}`}
                onClick={() => setActiveTab("Videos")}
              >
                Videos
              </button>
            </li>
            <li>
              <button
                className={`block border-transparent px-2 md:px-7 p-3 font-medium leading-tight ${activeTab === "Pictures" ? "border-primary bg-primary text-white" : "text-neutral-500 dark:text-white/50"}`}
                onClick={() => setActiveTab("Pictures")}
              >
                Pictures
              </button>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <div className={`${activeTab === "Videos" ? "block opacity-100" : "hidden opacity-0"} transition-opacity duration-150 ease-linear`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
              {videos.map((video, index) => (
                <VideoCard
                  key={index}
                  src={`${backend_url}/${video.file}`}
                  thumbnail={DefaultThumbnail}
                  title={video.title}
                  description={video.description}
                />
              ))}
            </div>
          </div>

          <div className={`${activeTab === "Pictures" ? "block opacity-100" : "hidden opacity-0"} transition-opacity duration-150 ease-linear`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
              {images.map((pic, index) => (
                <PictureCard
                  key={index}
                  // src={pic.src}
                  src={`${backend_url}/${pic.file}`}
                  alt={pic.alt}
                  description={pic.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
