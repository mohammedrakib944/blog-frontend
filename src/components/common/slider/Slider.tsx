"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./slider.css";

interface SliderProps {
  postItem: any[];
  delay: number;
}

const Slider: React.FC<SliderProps> = ({ postItem, delay }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % postItem.length);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [postItem, isPaused]);

  return (
    <div
      className="slider h-[300px] relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full h-full flex items-end p-8 absolute bg-gradient-to-t from-blue-900 to-transparent">
        <div>
          <span className="badge badge-primary mb-2">
            {postItem[currentSlide].category}
          </span>
          <h2 className="text-white hover:underline cursor-pointer">
            {postItem[currentSlide].title}
          </h2>
          <p className="text-gray-300 text-xs mt-2">
            <span className="font-bold hover:underline cursor-pointer">
              {postItem[currentSlide].author}
            </span>{" "}
            - <span>{postItem[currentSlide].date}</span>
          </p>
        </div>
      </div>
      <Image
        className="w-full"
        src={postItem[currentSlide].image}
        alt={`Slide ${currentSlide}`}
      />
      <div className="pagination-dots">
        {postItem.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
