import { Sidebar } from '../components/dashboard/Sidebar';
import { TopBar } from '../components/dashboard/TopBar';
import { InventoryStatsCards } from '../components/dashboard/InventoryStatsCards';
import { InventoryTable } from '../components/dashboard/InventoryTable';
import { useEffect, useState } from "react";
import axios from "axios";

export interface InventoryItem {
  _id: string;
  bloodGroup: string;
  unitsAvailable: number;
  pricePerUnit: number;
}

export interface InventorySummary {
  totalUnits: number;
  bloodGroups: number;
  lowStockCount: number;
}

export default function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [summary, setSummary] = useState<InventorySummary>({
    totalUnits: 0,
    bloodGroups: 0,
    lowStockCount: 0,
  });

  const token = localStorage.getItem("token");

  /* ---------- Fetch ---------- */
  const fetchInventory = async () => {
    try {
      const res = await axios.get("/api/inventory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInventory(res.data.inventory);
      setSummary(res.data.summary);
    } catch (err) {
      console.error("Inventory fetch failed", err);
    }
  };

  /* ---------- Update ---------- */
  const handleUpdate = async (
    id: string,
    payload: { unitsAvailable: number; pricePerUnit: number }
  ) => {
    try {
      await axios.put(`/api/inventory/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchInventory(); // refresh
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activePage="inventory" />
      <div className="flex-1 flex flex-col">
        <TopBar title="Blood Inventory Management" />
        <main className="flex-1 overflow-auto p-8 bg-gray-50">
          {/* Page Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Blood Inventory Management
            </h2>
            <p className="text-gray-600">
              Manage available blood units and update price per unit
            </p>
          </div>

          {/* Summary Stats */}
          <InventoryStatsCards summary={summary} />

          {/* Inventory Table */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Inventory Details</h3>
            <InventoryTable 
              inventory={inventory}
              onUpdate={handleUpdate}
            />
          </div>
        </main>
      </div>
    </div>
  );
}