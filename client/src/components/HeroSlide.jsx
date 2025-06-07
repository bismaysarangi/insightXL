// components/HeroSlide.jsx
import { motion } from "framer-motion";

export function HeroSlide({ title, description, image }) {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.8 }}
      className="grid md:grid-cols-2 gap-10 items-center p-6 md:p-12 rounded-xl bg-gray-800 shadow-lg"
    >
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {title}
        </h1>
        <p className="text-lg text-gray-300 mb-6">{description}</p>

        <button className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-xl shadow-md hover:bg-blue-700 hover:scale-105 transition transform duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400">
          Get Started
        </button>
      </div>

      <div className="flex justify-center ">
        <img
          src={image}
          alt={title}
          className="w-full max-w-xs md:max-w-md lg:max-w-lg max-h-96 object-contain rounded-xl"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}
