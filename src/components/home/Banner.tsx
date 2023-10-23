import React from "react";
import Slider from "../common/slider/Slider";
import Mac1 from "@/assets/Banner/mac.jpg";
import Mac2 from "@/assets/Banner/macbook.jpg";
import Iphone from "@/assets/Banner/iphone.jpg";

const Data = [
  {
    id: 1,
    image: Mac1,
    title: "Apple MacBook Air 13.3-Inch Retina ",
    author: "Tomal Kazi",
    category: "Laptop",
    date: "12 Sep 2023",
  },
  {
    id: 2,
    image: Mac2,
    title:
      "Apple MacBook Air 13.3-Inch Retina Display 8-core Apple M1 chip with 8GB RAM",
    author: "Shohanur Rahman",
    category: "Technology",
    date: "11 June 2023",
  },
  {
    id: 1,
    image: Iphone,
    title: "Iphone 15 pro max",
    author: "Tomal Kazi",
    category: "Phone",
    date: "14 Sep 2023",
  },
];

const Banner = () => {
  return (
    <div className="w-full overflow-hidden bg-white mb-3 rounded-md border">
      <Slider postItem={Data} delay={2500} />
    </div>
  );
};

export default Banner;
