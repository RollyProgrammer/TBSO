import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div>
        {/* Top Progress Bar */}
        <div className="fixed left-0 w-full z-50 top-[calc(92px+3rem)] sm:top-[calc(2.5rem+3rem)]">
          <LinearProgress
            sx={{
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": { backgroundColor: "black" },
            }}
          />
        </div>

        {/* Loading Text */}
        <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-sm sm:text-base">Loading About Page...</div>
      </div>
    );
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 py-15">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl uppercase font-bold mb-8 sm:mb-10">About Us</h1>
        <p className="mb-4 text-sm sm:text-base text-gray-700">Welcome to our online store! We are dedicated to providing you with the best shopping experience.</p>
        <p className="mb-4 text-sm sm:text-base text-gray-700">Our team is passionate about curating a wide range of products that cater to your needs and preferences.</p>
        <p className="mb-4 text-sm sm:text-base text-gray-700">Thank you for choosing us, and we look forward to serving you!</p>
      </div>
    </section>
  );
}
