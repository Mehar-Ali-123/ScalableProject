import { useEffect } from "react";
import MissionImg from "../assets/images/instalogo.png"; 
import AOS from "aos";
import "aos/dist/aos.css";

export default function OurMission(props) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  return (
    <>
      <section className="text-gray-600 bg-[#f7f7f7]">
        <div className="container mx-auto flex px-5 py-6 md:py-16 flex-col items-center">
          <div className="flex flex-col md:flex-row items-center text-center gap-20 mx-auto max-w-5xl rounded-lg bg-white p-8">
            <div className="z-10">
              <p className="text-lg md:text-2xl mb-4 text-gray-600 text-start">
              Netflix is the world's leading streaming entertainment service, offering a wide variety of award-winning TV shows, movies, documentaries, and more — all available to watch anytime, anywhere. 
              </p> 
            </div>
            <picture>
              <source srcSet={MissionImg} type="image/webp" />
              <img
                data-aos="zoom-in"
                className="object-contain rounded w-44 h-44"
                alt="hero"
                src={MissionImg}
              />
            </picture>
          </div>
        </div>
      </section>
    </>
  );
}
