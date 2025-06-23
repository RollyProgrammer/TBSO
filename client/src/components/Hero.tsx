import { useEffect, useState } from "react";

export default function Hero() {
  const images = [
    "https://blueskytradingcoal.com/cdn/shop/files/logo_18208a42-5546-48e2-981e-ae693489c5fc.png?height=628&pad_color=ffffff&v=1671990056&width=1200",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Ib9pkZdwKOGqa6CSspK3XT33YPsqEi6ahQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3OkAc7Ysw0W9wCJLkMsZhKCIpDno_1U45PA&s",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const imageUrl = images[index];

  return (
    <div className="relative overflow-hidden h-[400px] sm:h-[600px] lg:h-[700px] w-full">
      {/* Blurred Background */}
      <img
        src={imageUrl}
        alt="Blurred background"
        className="absolute top-0 left-0 w-full h-full object-cover blur-2xl opacity-40 z-0 transition-opacity duration-1000"
      />

      {/* Foreground Image */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <img
          src={imageUrl}
          alt="Foreground logo"
          className="max-h-[80%] max-w-full transition-opacity duration-1000"
        />
      </div>
    </div>
  );
}
