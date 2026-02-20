import { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "../components/dashboard/Sidebar";
import { TopBar } from "../components/dashboard/TopBar";
import { InventoryStatsCards } from "../components/dashboard/InventoryStatsCards";
import { InventoryTable } from "../components/dashboard/InventoryTable";
import api from '../services/api';

// =====================
// TYPES
// =====================

export interface InventoryItem {  
  _id: string;
  bloodGroup: string;
  unitsAvailable: number;
  pricePerUnit: number;
}

export interface InventorySummary {
  totalUnits: number;
  bloodGroups: number;
  criticalStockCount: number;
}

interface InventoryResponse {
  inventory: InventoryItem[];
  summary: InventorySummary;
}

interface UpdatePayload {
  unitsAvailable: number;
  pricePerUnit: number;
}

// =====================
// COMPONENT
// =====================

export default function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [summary, setSummary] = useState<InventorySummary>({
    totalUnits: 0,
    bloodGroups: 0,
    criticalStockCount: 0,
  });
  const [loading, setLoading] = useState(true);

  // Get token from sessionStorage
  // const token = sessionStorage.getItem("token");

  // =====================
  // FETCH INVENTORY
  // =====================

  const fetchInventory = async () => {
    try {
      setLoading(true);

      const response = await api.get<InventoryResponse>(
        "/inventory"
      );

      setInventory(response.data.inventory);
      setSummary(response.data.summary);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Inventory fetch failed:", error.response?.data);
        console.error("Status:", error.response?.status);
      } else {
        console.error("Inventory fetch failed:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // UPDATE INVENTORY ITEM
  // =====================

  const handleUpdate = async (id: string, payload: UpdatePayload) => {
    try {
      await api.put(
        `/inventory/${id}`,
        payload);

      // Refresh inventory after successful update
      await fetchInventory();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Update failed:", error.response?.data);
        alert(error.response?.data?.message || "Failed to update inventory");
      } else {
        console.error("Update failed:", error);
        alert("Failed to update inventory");
      }
    }
  };

  // =====================
  // FETCH ON MOUNT
  // =====================

  useEffect(() => {
    fetchInventory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =====================
  // RENDER
  // =====================

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

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading inventory...</p>
            </div>
          ) : (
            <>
              {/* Summary Stats */}
              <InventoryStatsCards summary={summary} />

              {/* Inventory Table */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Inventory Details
                </h3>
                <InventoryTable inventory={inventory} onUpdate={handleUpdate} />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
