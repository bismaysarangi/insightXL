import { useEffect } from "react";

export default function History() {
  useEffect(() => {
    document.title = "History | InsightXL";
  }, []);
  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold">History</h1>
      <p>View your upload and analysis history.</p>
    </div>
  );
}
