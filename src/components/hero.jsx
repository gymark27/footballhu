import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Nike1Img from "../assets/hero/nike-phantom-6-low-1.jpg";
import Nike2Img from "../assets/hero/nike-phantom-6-innovation-1.jpg";

export default function Hero() {
  const slides = [
    {
      image: Nike1Img,
      tag: "Speed focus",
      title: "Mercurial moves.",
      text: "Robbanékony sebesség, mikor csak egy érintésed van.",
    },
    {
      image: Nike2Img,
      tag: "Art of control",
      title: "Predator vibes.",
      text: "A tökéletes érintés, amikor minden labda számít.",
    },
  ];

  return (
    <section className="relative border-b border-white/5 px-4 py-8 md:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:gap-10 md:flex-row md:items-center">
        {/* BAL – slider kártya */}
        <div className="w-full md:w-1/2">
          <div className="rounded-3xl bg-black/50 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 2800, disableOnInteraction: false }}
              loop
              pagination={{ clickable: true }}
              spaceBetween={16}
              className="rounded-2xl"
            >
              {slides.map((slide, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="h-[320px] w-full transform object-cover transition-transform duration-700 ease-out hover:scale-105 md:h-[420px]"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-black/75 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-100 backdrop-blur">
                      {slide.tag}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4">
                      <h3 className="text-base md:text-lg font-semibold text-white">
                        {slide.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-200">
                        {slide.text}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* JOBB – szöveg + CTA */}
        <div className="relative w-full space-y-4 md:w-1/2 md:space-y-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400 md:text-xs">
            footballhu • football boots • community
          </p>

          <h1 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-5xl">
            A focicipők világa,
            <span className="block bg-gradient-to-r from-indigo-400 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent">
              egy helyen.
            </span>
          </h1>

          <p className="max-w-md text-sm text-gray-300 sm:text-base">
            Megmutatjuk a pályán látott csukákat, és segítünk megtalálni azt a
            cipőt, ami tényleg illik a játékodhoz. Fókuszban a modellek, a hírek
            és a játékstílusodhoz passzoló ajánlások.
          </p>

          {/* CTA gombok – mobilon kisebbek, egymás mellett */}
          <div className="flex flex-row flex-wrap gap-3 pt-1">
            <Link to="/webshop">
              <button className="rounded-full bg-indigo-500 px-5 py-2 text-xs md:text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition hover:-translate-y-0.5 hover:bg-indigo-400">
                Irány a Webshop
              </button>
            </Link>

            <a href="#feed">
              <button className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-xs md:text-sm font-medium text-gray-100 backdrop-blur transition hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-500/10">
                Legfrissebb hírek &amp; megjelenések
              </button>
            </a>
          </div>

          {/* Infó boxok */}
          <div className="mt-5 grid grid-cols-1 gap-4 text-xs text-gray-300 sm:text-sm md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/50 p-3">
              <p className="text-sm font-semibold text-white">BootsFinder</p>
              <p className="text-gray-400">
                Pár kérdés, és szűkítjük a kört a játékstílusodhoz és
                pályatípusodhoz passzoló csukákra.
              </p>
            </div>
            <div className="rounded-2xl border border-indigo-400/40 bg-gradient-to-br from-indigo-500/25 to-fuchsia-500/15 p-3">
              <p className="text-sm font-semibold text-white">
                Hírek &amp; megjelenések
              </p>
              <p className="text-gray-100">
                Új modellek, innovációk és focicipős bejelentések napról napra.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
