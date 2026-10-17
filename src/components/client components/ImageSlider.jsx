import { RiArrowLeftLine, RiArrowLeftSLine, RiArrowRightLine, RiArrowRightSLine } from "@remixicon/react";
import React from "react";
let images = ["/slider-1.jpeg", "/slider-2.jpeg", "/slider-3.jpg"];

function ImageSlider() {
  const [index, setIndex] = React.useState(0);
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="w-full h-[40vw] max-sm:h-[70vw]  overflow-hidden relative">
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <div className="w-full h-full shrink-0" key={i}>
            <img
              loading="lazy"
              src={img}
              className="w-full h-full object-fit"
              alt={`slide-${i}`}
            />
          </div>
        ))}
      </div>
      <button 
      onClick={() => (setIndex((prev) => (prev + 1) % images.length )) }
      className="right-button absolute top-1/2 right-5 rounded-2xl hover:cursor-pointer  bg-gray-400 ">
        <RiArrowRightSLine color="white" size={40} />
      </button>
      <button 
      onClick={() => (setIndex((prev) => (prev - 1) % images.length )) }
      className="left-button absolute top-1/2 left-5 rounded-2xl hover:cursor-pointer  bg-gray-400 ">
        <RiArrowLeftSLine color="white" size={40} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${i === index ? "bg-neutral-300" : "bg-gray-500"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
