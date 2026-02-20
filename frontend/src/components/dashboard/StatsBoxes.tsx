import { useEffect, useState } from "react";
import api from '../../services/api';
import axios from "axios";

export function StatsBoxes() {
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalRequests: 0,
    pendingRequests: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // const token = sessionStorage.getItem("token");

        const [donorsRes, requestsRes] = await Promise.all([
          api.get("/donors"),
          api.get("/requests")
        ]);

        setStats({
          totalDonors: donorsRes.data.count || 0,
          totalRequests: requestsRes.data.count || 0,
          pendingRequests: requestsRes.data.count || 0, // You can filter pending later
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  const statsArray = [
    { label: "Total Donors", value: stats.totalDonors },
    { label: "Total Requests", value: stats.totalRequests },
    { label: "Pending Requests", value: stats.pendingRequests },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Statistics</h3>
      <div className="grid grid-cols-3 gap-6">
        {statsArray.map((stat, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 p-6 rounded-lg"
          >
            <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
