import { Package, Droplet, AlertTriangle, DollarSign } from 'lucide-react';

const stats = [
  {
    icon: Package,
    label: 'Total Units Available',
    value: '120 Units',
  },
  {
    icon: Droplet,
    label: 'Blood Groups',
    value: '8 Types',
  },
  {
    icon: AlertTriangle,
    label: 'Low Stock Alerts',
    value: '2',
  },
  {
    icon: DollarSign,
    label: 'Average Price',
    value: '₹3000',
  },
];

export function InventoryStatsCards() {
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
