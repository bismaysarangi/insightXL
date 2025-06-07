import { useState, useEffect } from "react";
import { HeroSlide } from "./HeroSlide";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Versatile Chart Options",
    description: "InsightXL offers multiple chart types, including bar, line, and pie charts, giving you flexibility to choose the best visualization for your data insights.",
    image: "/src/assets/chart.png",
  },
  {
    title: "User-Friendly Interface",
    description: "No complex steps required—create graphs from Excel effortlessly using Powerdrill’s intuitive interface, making it accessible for users of all skill levels.",
    image: "/src/assets/interface.png",
  },
  {
    title: "Efficient Data Visualization",
    description: "Easily create bar, line, and pie charts from Excel to enhance your data presentation, making it more understandable and visually appealing for all audiences.",
    image: "/src/assets/graph.png",
  },
  {
    title: "Streamlined Process",
    description: "With Powerdrill, generating professional charts from Excel is simple and fast, saving you time and effort for more critical analysis tasks.",
    image: "/src/assets/process.png",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden group">
      <div className="relative w-full max-w-7xl mx-auto px-6">
        
        {/* Features Heading */}
        <h4 className="text-4xl font-bold text-white text-center mb-8">
          Features
        </h4>

        {/* Hero Slide */}
        <HeroSlide
          title={slides[currentSlide].title}
          description={slides[currentSlide].description}
          image={slides[currentSlide].image}
        />

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 opacity-0 group-hover:opacity-100 transition duration-300">
          <button
            onClick={prevSlide}
            className="bg-white text-gray-800 shadow-md rounded-full p-2 hover:bg-gray-200 transition"
          >
            <ChevronLeft size={28} />
          </button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 opacity-0 group-hover:opacity-100 transition duration-300">
          <button
            onClick={nextSlide}
            className="bg-white text-gray-800 shadow-md rounded-full p-2 hover:bg-gray-200 transition"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </section>
  );
}
