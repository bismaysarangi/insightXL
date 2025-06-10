import { useEffect, useRef } from "react";
import { BarChart3 } from "lucide-react";
import gsap from "gsap";

export default function LandingIntro() {
  const textRef = useRef(null);
  const btnRef = useRef(null);
  const graphRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const xLabelRefs = useRef([]);
  const yLabelRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        delay: 0.5,
        duration: 1,
        ease: "power2.out",
      }
    );

    gsap.from(btnRef.current.children, {
      opacity: 1,
      y: 20,
      stagger: 0.2,
      delay: 1.5,
      duration: 1,
      ease: "power3.out",
    });

    gsap.fromTo(
      graphRef.current,
      { scaleY: 0, transformOrigin: "bottom" },
      { scaleY: 1, duration: 2, delay: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      xAxisRef.current,
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 1.5, delay: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      yAxisRef.current,
      { scaleY: 0, transformOrigin: "bottom" },
      { scaleY: 1, duration: 1.5, delay: 1, ease: "power2.out" }
    );

    xLabelRefs.current.forEach((label, i) => {
      gsap.fromTo(
        label,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          delay: 1.6 + i * 0.1,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    });

    yLabelRefs.current.forEach((label, i) => {
      gsap.fromTo(
        label,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          delay: 1.6 + i * 0.1,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    });
  }, []);

  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white h-screen px-8 py-20 flex items-center justify-center">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-center items-start text-left px-6 relative left-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg shadow-xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <a
              href="/"
              className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-300 transition-all duration-300"
            >
              InsightXL
            </a>
          </div>

          {/* Description */}
          <div ref={textRef} className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white drop-shadow-xl">
              Empower Your Data with Effortless Visualization
            </h2>
            <p className="text-white text-lg drop-shadow-md">
              InsightXL helps you convert Excel files into beautiful,
              ready-to-use graphs. Generate bar, line, or pie charts with a few
              clicks — perfect for presentations, reports, or business analysis.
            </p>
          </div>

          {/* Buttons */}
          <div ref={btnRef} className="flex space-x-4 z-10 relative">
            <a
              href="/auth"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-400 hover:to-purple-400 transition duration-300 shadow-lg border border-white"
            >
              Log In to continue
            </a>
          </div>
        </div>

        {/* Animated Graph */}
        <div className="flex-1 flex justify-center items-center px-6">
          <div className="w-96 h-60 relative">
            {/* Y-Axis */}
            <div
              ref={yAxisRef}
              className="absolute left-6 bottom-0 h-[70%] w-px bg-gradient-to-b from-purple-600 to-blue-600"
            ></div>

            {/* Y-Axis Ticks */}
            {[0, 30, 60, 90, 120].map((val, i) => (
              <div
                key={`y-${i}`}
                ref={(el) => (yLabelRefs.current[i] = el)}
                className="absolute left-0 text-xs text-white"
                style={{
                  bottom: `${(val / 120) * 70}%`,
                  transform: "translateY(50%)",
                }}
              >
                {val}
              </div>
            ))}

            {/* X-Axis */}
            <div
              ref={xAxisRef}
              className="absolute left-6 bottom-0 w-[90%] h-px bg-gradient-to-r from-blue-600 to-purple-600"
            ></div>

            {/* Graph Bars */}
            <div
              ref={graphRef}
              className="absolute bottom-0 left-6 w-[90%] h-full flex justify-around items-end"
            >
              {[80, 100, 60, 120, 90].map((h, i) => (
                <div key={i} className="flex flex-col items-center justify-end">
                  <div
                    className="bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-xl"
                    style={{ height: `${h}px`, width: "20px" }}
                  ></div>
                </div>
              ))}
            </div>

            {/* X-Axis Labels */}
            <div className="absolute bottom-[-20px] left-6 w-[90%] flex justify-around items-center">
              {["A", "B", "C", "D", "E"].map((label, i) => (
                <span
                  key={i}
                  ref={(el) => (xLabelRefs.current[i] = el)}
                  className="text-xs text-white"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
