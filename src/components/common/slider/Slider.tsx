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
      className="slider w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full flex justify-around">
        <Image
          className="max-w-[400px] max-h-[300px] object-cover border-r"
          src={postItem[currentSlide].image}
          alt={`Slide ${currentSlide}`}
        />
        <div className="w-[600px] p-4">
          <span className="badge badge-primary mb-2">
            {postItem[currentSlide].category}
          </span>
          <h2 className="text-gray-700 hover:underline cursor-pointer">
            {postItem[currentSlide].title}
          </h2>
          <p className="text-gray-700 text-xs mt-2">
            <span className="font-bold hover:underline cursor-pointer">
              {postItem[currentSlide].author}
            </span>{" "}
            - <span>{postItem[currentSlide].date}</span>
          </p>
        </div>
        <div className="pagination-dots">
          {postItem.map((_, index) => (
            <span
              key={index}
              className={`dot bg-primary ${
                index === currentSlide ? "active" : ""
              }`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
