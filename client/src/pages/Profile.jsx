import { useEffect } from "react";

export default function Profile() {
  useEffect(() => {
    document.title = "Profile | InsightXL";
  }, []);
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-semibold mb-2">User Profile</h1>
      <p className="text-gray-300">
        Manage your account information, settings, and preferences from this
        page.
      </p>
    </div>
  );
}
