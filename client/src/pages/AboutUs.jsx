import React from "react";
import {
  SiFirebase,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiAndroid,
} from "react-icons/si";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-teal-400 text-transparent bg-clip-text">
            Meet Our Team
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Driven by passion. Built with purpose. We're a team committed to
            turning ideas into impactful digital experiences.
          </p>
        </div>

        {/* Team Section */}
        <section className="space-y-10">
          {/* Tarvish Sonkhla */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-md border border-blue-500/10 flex flex-col md:flex-row-reverse items-center md:items-start text-center md:text-left gap-6">
            <img
              src="https://ui-avatars.com/api/?name=Tarvish+Sonkhla&background=1e293b&color=ffffff&size=128"
              alt="Tarvish Sonkhla"
              className="w-32 h-32 rounded-full border-2 border-blue-500"
            />
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-white">
                Tarvish Sonkhla
              </h2>
              <p className="text-gray-300">
                I’m Tarvish Sonkhla, currently pursuing my final year in
                Computer Science Engineering at Punjab University, Chandigarh.
                My focus lies in designing scalable backend architectures and
                building seamless, responsive user interfaces. I believe in
                developing practical digital solutions that not only perform but
                also deliver a refined user experience across diverse platforms.
              </p>
            </div>
          </div>

          {/* Bismay Sarangi */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-md border border-purple-500/10 flex flex-col md:flex-row-reverse items-center md:items-start text-center md:text-left gap-6">
            <img
              src="https://ui-avatars.com/api/?name=Bismay+Sarangi&background=1e293b&color=ffffff&size=128"
              alt="Bismay Sarangi"
              className="w-32 h-32 rounded-full border-2 border-purple-500"
            />
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-white">
                Bismay Sarangi
              </h2>
              <p className="text-gray-300">
                Hello, I'm Bismay Sarangi, a 21-year-old Computer Science
                student from XIM University, Bhubaneswar. I’m deeply curious
                about how technology intersects with human behavior and business
                strategy. My journey in software development revolves around
                building efficient, purpose-driven systems while learning from
                every iteration and collaborating with driven peers.
              </p>
            </div>
          </div>
        </section>

        {/* Application Purpose */}
        <section className="bg-gray-800 rounded-xl p-6 shadow-md border border-teal-500/10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            What We Build
          </h2>
          <p className="text-gray-300">
            Our platform transforms raw data into actionable insights through
            interactive visualizations. Upload your Excel files to dynamically
            preview all your data and generate custom charts that empower you to
            make data-driven decisions.
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-3 space-y-1">
            <li>
              <strong>Dynamic Data Preview:</strong> Instantly view every column
              and row from your Excel file in a responsive preview modal.
            </li>
            <li>
              <strong>Interactive Chart Analysis:</strong> Convert your data
              into interactive charts and graphs using Chart.js, with support
              for Bar, Line, Pie, and Scatter charts.
            </li>
            <li>
              <strong>Real-Time Insights:</strong> Experience immediate visual
              feedback that helps you understand your data at a glance.
            </li>
          </ul>
          <p className="mt-4 text-gray-300">
            Designed with scalability and simplicity in mind, our solution
            streamlines data analytics, making it accessible for both beginners
            and experts.
          </p>

          {/* Technologies Used */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-white mb-3">
              Technology Stack
            </h3>
            <p className="text-gray-400 mb-4">
              We leverage a modern and robust combination of technologies to
              ensure efficient data processing and stunning visualizations.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center text-gray-300">
              <div className="flex flex-col items-center">
                <SiReact className="text-cyan-400 text-3xl" />
                <span>React.js</span>
              </div>
              <div className="flex flex-col items-center">
                <SiTailwindcss className="text-sky-400 text-3xl" />
                <span>Tailwind CSS</span>
              </div>
              <div className="flex flex-col items-center">
                <SiJavascript className="text-yellow-300 text-3xl" />
                <span>JavaScript</span>
              </div>
              <div className="flex flex-col items-center">
                <SiHtml5 className="text-orange-500 text-3xl" />
                <span>HTML5</span>
              </div>
              <div className="flex flex-col items-center">
                <SiCss3 className="text-blue-500 text-3xl" />
                <span>CSS3</span>
              </div>
              <div className="flex flex-col items-center">
                <SiMongodb className="text-green-400 text-3xl" />
                <span>MongoDB</span>
              </div>
              <div className="flex flex-col items-center">
                <SiNodedotjs className="text-green-500 text-3xl" />
                <span>Node.js</span>
              </div>
              <div className="flex flex-col items-center">
                <SiExpress className="text-gray-300 text-3xl" />
                <span>Express.js</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 mt-12">
          Built with purpose, powered by code — Tarvish & Bismay
        </footer>
      </div>
    </div>
  );
}
