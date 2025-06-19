import { useEffect } from "react";

export default function Features() {
  useEffect(() => {
    document.title = "Features | InsightXL";
  }, []);
  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold">Features</h1>
      <p>Explore the key features of InsightXL.</p>
    </div>
  );
}
