import { useState } from 'react';
import { X } from 'lucide-react';
import type { InventoryItem } from '../../pages/InventoryManagement';

interface InventoryTableProps {
  inventory: InventoryItem[];
  onUpdate: (id: string, payload: { unitsAvailable: number; pricePerUnit: number }) => Promise<void>;
}

export function InventoryTable({ inventory, onUpdate }: InventoryTableProps) {
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [formData, setFormData] = useState({ unitsAvailable: 0, pricePerUnit: 0 });
  const [saving, setSaving] = useState(false);

  const safeInventory = inventory ?? [];

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setFormData({
      unitsAvailable: item.unitsAvailable,
      pricePerUnit: item.pricePerUnit,
    });
  };

  const handleSave = async () => {
    if (!editingItem) return;

    try {
      setSaving(true);

      await onUpdate(editingItem._id, {
        unitsAvailable: formData.unitsAvailable,
        pricePerUnit: formData.pricePerUnit,
      });

      setEditingItem(null);
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setFormData({ unitsAvailable: 0, pricePerUnit: 0 });
  };

  // =====================
  // UPDATED STATUS LOGIC
  // =====================
  const getStatus = (
    units: number
  ): 'In Stock' | 'Low' | 'Critical' | 'Out of Stock' => {
    if (units <= 0) return 'Out of Stock';
    if (units <= 5) return 'Critical';
    if (units <= 15) return 'Low';
    return 'In Stock';
  };

  const getStatusBadge = (units: number) => {
    const status = getStatus(units);

    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-700';
      case 'Low':
        return 'bg-yellow-100 text-yellow-700';
      case 'Critical':
        return 'bg-orange-100 text-orange-700';
      case 'Out of Stock':
      default:
        return 'bg-red-100 text-red-700';
    }
  };

  return (
    <div>
      <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-300">
              <th className="text-left p-4 font-semibold text-gray-900">Blood Group</th>
              <th className="text-left p-4 font-semibold text-gray-900">Units Available</th>
              <th className="text-left p-4 font-semibold text-gray-900">Price Per Unit (₹)</th>
              <th className="text-left p-4 font-semibold text-gray-900">Status</th>
              <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {safeInventory.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No inventory data available
                </td>
              </tr>
            ) : (
              safeInventory.map((item) => (
                <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{item.bloodGroup}</td>
                  <td className="p-4 text-gray-700">{item.unitsAvailable}</td>
                  <td className="p-4 text-gray-700">₹{item.pricePerUnit.toLocaleString()}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                        item.unitsAvailable
                      )}`}
                    >
                      {getStatus(item.unitsAvailable)}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-gray-700 hover:text-gray-900 font-medium"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-300">
              <h3 className="text-xl font-bold text-gray-900">Update Inventory</h3>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700"
                disabled={saving}
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Blood Group
                </label>
                <input
                  type="text"
                  value={editingItem.bloodGroup}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 text-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Units Available
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.unitsAvailable}
                  onChange={(e) =>
                    setFormData({ ...formData, unitsAvailable: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Price Per Unit (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.pricePerUnit}
                  onChange={(e) =>
                    setFormData({ ...formData, pricePerUnit: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  disabled={saving}
                />
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-gray-300">
              <button
                onClick={handleCancel}
                className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
