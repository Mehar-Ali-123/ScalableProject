import React from "react";
import img1 from "../assets/images/9825103.f5ce77f2342e2e390c52.webp";

export default function Illustration() {
  return (
    <section className="bg-white">
      <div className="container mx-auto py-20">
        <div className="flex flex-row justify-center items-center gap-10">
          <picture>
            <source srcSet={img1} type="image/webp" />
            <img
              loading="lazy"
              src={img1}
          alt="carbon-footprint-offset"
              className="w-7/12 text-center"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
