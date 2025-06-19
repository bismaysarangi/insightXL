import { useEffect } from "react";
function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard | InsightXL";
  }, []);
  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
}

export default Dashboard;
