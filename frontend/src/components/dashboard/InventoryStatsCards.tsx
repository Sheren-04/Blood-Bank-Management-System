import { Package, Droplet, AlertTriangle, DollarSign } from 'lucide-react';
import type { InventorySummary } from '../../pages/InventoryManagement';

// =====================
// PROPS INTERFACE
// =====================

interface InventoryStatsCardsProps {
  summary: InventorySummary;
}

// =====================
// COMPONENT
// =====================

export function InventoryStatsCards({ summary }: InventoryStatsCardsProps) {
  const totalUnits = summary?.totalUnits ?? 0;
  const bloodGroups = summary?.bloodGroups ?? 0;
  const criticalStockCount = summary?.criticalStockCount ?? 0;

  // ---- UPDATED STATUS LOGIC ----
  // 0 → No Alerts
  // 1-2 → Low
  // 3+ → Critical
  const getStockAlertStatus = (count: number): string => {
    if (count === 0) return 'No Alerts';
    if (count <= 2) return 'Low';
    return 'Critical';
  };

  const criticalStockStatus = getStockAlertStatus(criticalStockCount);

  // Keep same average logic (no UI change)
  const averagePrice =
    totalUnits > 0
      ? Math.round((totalUnits * 3000) / totalUnits)
      : 0;

  const stats = [
    {
      icon: Package,
      label: 'Total Units Available',
      value: `${totalUnits} Units`,
    },
    {
      icon: Droplet,
      label: 'Blood Groups',
      value: `${bloodGroups} Types`,
    },
    {
      icon: AlertTriangle,
      label: 'Critical Stock Alerts',
      value: `${criticalStockCount} (${criticalStockStatus})`,
    },
    {
      icon: DollarSign,
      label: 'Average Price',
      value: `₹${averagePrice.toLocaleString()}`,
    },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Inventory Summary</h3>
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-red-600" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
