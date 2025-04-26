import React from "react";
import banner from "../../../assets/banner2.jpg"

const Banner = () => {
  return (
    <>
      <div
        className="hero h-screen"
        style={{
          backgroundImage:
            `url(${banner})`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Elme Hakikat</h1>
            <p className="mb-5 text-xl">
            If Allah intends goodness for someone, he gives him understanding of the religion. <br /> Sahih al-Bukhari 71
            </p>
            <button className="btn btn-primary bg-[#00B67A] border-none outline-none ">Explore</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
