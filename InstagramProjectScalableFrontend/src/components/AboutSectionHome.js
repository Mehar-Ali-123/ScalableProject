import React from "react";
import { LiaSlideshare } from "react-icons/lia";
import { GrGrow } from "react-icons/gr";

export default function AboutSectionHome() {
  return (
    <>
      <section className="">
        <div className="container px-5 pb-10 pt-16 mx-auto">
          <div className="flex flex-wrap w-full mb-0 flex-col items-center text-center pb-14">
            <h2 className=" text-[#101110] md:text-[2rem] leading-[30px] md:leading-[50px] text-center uppercase">
              Your Action Matters – Be Part of It
            </h2>
          </div>
          <div className="  flex justify-center ">
            <div className="  w-[95%] lg:w-[70%] grid grid-cols-1 md:grid-cols-3  place-items-center gap-10">
              <div className="  duration-300 font-mono text-white group hover:text-primary cursor-pointer relative overflow-hidden bg-primary w-28 h-48 dark:bg-[#22272B] rounded-3xl p-4 hover:w-80 hover:h-80   hover:bg-[#0C0C0C]">
                <h3 className="text-xl text-center">Stay informed</h3>
                <div className="gap-4 relative">
                  <br />
                  <br />
                  <h4 className="font-sans duration-300 absolute left-1/2 -translate-x-1/2 text-5xl text-center  group-hover:-translate-y-8 group-hover:scale-150  group-hover:mt-6 ">
                    <svg
                      className="fill-white"
                      xmlns="http://www.w3.org/2000/svg"
                      width="38"
                      height="38"
                      enable-background="new 0 0 48 48"
                      viewBox="0 0 48 48"
                      id="stay-at-home"
                    >
                      <path d="M39 12.27c-.198 0-.395-.059-.564-.175l-5-3.42C33.163 8.489 33 8.18 33 7.85V3.5C33 1.57 34.57 0 36.5 0S40 1.57 40 3.5v7.77c0 .371-.205.711-.533.884C39.32 12.232 39.16 12.27 39 12.27zM35 7.323l3 2.052V3.5C38 2.673 37.327 2 36.5 2S35 2.673 35 3.5V7.323zM26 41H16c-.552 0-1-.447-1-1s.448-1 1-1h8.829c-.413-1.164-1.525-2-2.829-2h-6c-.552 0-1-.447-1-1s.448-1 1-1h6c2.757 0 5 2.243 5 5C27 40.553 26.552 41 26 41z"></path>
                      <path
                        d="M27,46H16c-0.552,0-1-0.447-1-1s0.448-1,1-1h10.783l9.469-4.304C36.707,39.489,37,39.033,37,38.534
        c0-0.442-0.213-0.833-0.585-1.072c-0.371-0.239-0.815-0.271-1.219-0.089l-7.783,3.537C27.284,40.97,27.143,41,27,41h-3
        c-0.552,0-1-0.447-1-1s0.448-1,1-1h2.783l7.585-3.447c1.018-0.464,2.188-0.379,3.128,0.228C38.438,36.386,39,37.415,39,38.534
        c0,1.282-0.754,2.453-1.92,2.982l-9.666,4.394C27.284,45.97,27.143,46,27,46z"
                      ></path>
                      <path d="M16 48H6c-.552 0-1-.447-1-1V34c0-.553.448-1 1-1h10c.552 0 1 .447 1 1v13C17 47.553 16.552 48 16 48zM7 46h8V35H7V46zM40.93 18.16c-.601 0-1.195-.187-1.72-.542L24 7.211 8.794 17.615C7.854 18.26 6.643 18.331 5.635 17.8 4.626 17.269 4 16.23 4 15.09c0-1.014.5-1.959 1.338-2.527L23.435.175c.341-.233.79-.233 1.13 0l18.1 12.39C43.5 13.131 44 14.076 44 15.09 44 16.783 42.623 18.16 40.93 18.16zM24 5c.197 0 .395.058.564.175l15.77 10.79C41.008 16.418 42 16.012 42 15.09c0-.345-.177-.679-.461-.872L24 2.212 6.465 14.215C6.177 14.411 6 14.745 6 15.09c0 .402.212.753.567.94.354.186.764.163 1.097-.065L23.436 5.175C23.605 5.058 23.803 5 24 5z"></path>
                      <path
                        d="M23.998,33c-0.253,0-0.507-0.096-0.701-0.287l-8.493-8.356C13.641,23.211,13,21.688,13,20.064
        c0-1.623,0.641-3.146,1.804-4.292C15.966,14.63,17.507,14,19.143,14s3.177,0.63,4.338,1.773l0.517,0.508l0.517-0.508
        c2.392-2.354,6.285-2.354,8.677,0h0C34.358,16.92,35,18.444,35,20.064s-0.642,3.145-1.809,4.292l-8.492,8.356
        C24.505,32.904,24.251,33,23.998,33z M19.143,16c-1.108,0-2.15,0.426-2.936,1.199C15.429,17.964,15,18.982,15,20.064
        c0,1.083,0.429,2.101,1.207,2.866l7.792,7.666l7.791-7.666C32.57,22.162,33,21.144,33,20.064c0-1.08-0.43-2.098-1.211-2.866
        c0,0,0,0,0,0c-1.618-1.594-4.253-1.594-5.871,0l-1.218,1.198c-0.389,0.383-1.014,0.383-1.402,0l-1.218-1.198
        C21.293,16.426,20.25,16,19.143,16z"
                      ></path>
                    </svg>
                  </h4>
                </div>
                <div className="invisible group-hover:visible absolute duration-300 -left-64 mt-14 group-hover:left-0 p-5 w-full text-center">
                  <p className="text-md text-white" >
                    🔥 Insta-updates on what's new & trending – straight to your feed! Never miss the latest.
                  </p>
                </div>
              </div>
              <div className="duration-300 font-mono text-white group hover:text-primary cursor-pointer relative overflow-hidden bg-primary w-28 h-48 dark:bg-[#22272B] rounded-3xl p-4 hover:w-80 hover:h-80    hover:bg-[#0C0C0C]">
                <h3 className="text-xl text-center"> Engage & share</h3>
                <div className="gap-4 relative">
                  <br />
                  <br />
                  <h4 className="font-sans duration-300 absolute left-1/2 -translate-x-1/2 text-5xl text-center  group-hover:-translate-y-8 group-hover:scale-150  group-hover:mt-6 ">
                    <LiaSlideshare
                      width="38"
                      height="38"
                      className="fill-white"
                    />
                  </h4>
                </div>
                <div className="invisible group-hover:visible absolute duration-300 -left-64 mt-14 group-hover:left-0 p-5 w-full text-center">
                  <p className="text-md text-white" >
                    ✨ Your insta-source for exclusive drops & trending faves – delivered directly! Stay in the know.
                  </p>
                </div>
              </div>
              <div className="duration-300 font-mono text-white group hover:text-primary cursor-pointer relative overflow-hidden bg-primary w-28 h-48 dark:bg-[#22272B] rounded-3xl p-4 hover:w-80 hover:h-80    hover:bg-[#0C0C0C]">
                <h3 className="text-xl text-center"> Grow with us</h3>
                <div className="gap-4 relative">
                  <br />
                  <br />
                  <h4 className="font-sans duration-300 absolute left-1/2 -translate-x-1/2 text-5xl text-center  group-hover:-translate-y-8 group-hover:scale-150    group-hover:mt-2 ">
                    <GrGrow className="fill-white w-10 h-10" />
                  </h4>
                </div>
                <div className="invisible group-hover:visible absolute duration-300 -left-64 mt-7 group-hover:left-0 p-5 w-full text-center">
                  <p className="text-md text-white" >
                    🎬 Level up your feed! Insta-updates on all the must-see releases. Stay ahead of the curve.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className=" mt-16  text-md md:text-2xl max-w-4xl mx-auto text-center text-[#101110]">
            We believe change isn’t just needed—it’s happening. Be part of the movement toward a greener future, one step at a time.
          </p>
        </div>
      </section>
    </>
  );
}
