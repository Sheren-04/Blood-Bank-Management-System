import { useState } from 'react';
import { X } from 'lucide-react';

interface InventoryItem {
  id: number;
  bloodGroup: string;
  unitsAvailable: number;
  pricePerUnit: number;
  status: 'In Stock' | 'Low' | 'Out of Stock';
}

const mockInventory: InventoryItem[] = [
  {
    id: 1,
    bloodGroup: 'O+',
    unitsAvailable: 25,
    pricePerUnit: 3000,
    status: 'In Stock',
  },
  {
    id: 2,
    bloodGroup: 'A+',
    unitsAvailable: 10,
    pricePerUnit: 2800,
    status: 'Low',
  },
  {
    id: 3,
    bloodGroup: 'B+',
    unitsAvailable: 5,
    pricePerUnit: 3200,
    status: 'Low',
  },
  {
    id: 4,
    bloodGroup: 'AB+',
    unitsAvailable: 0,
    pricePerUnit: 3500,
    status: 'Out of Stock',
  },
  {
    id: 5,
    bloodGroup: 'O-',
    unitsAvailable: 15,
    pricePerUnit: 3300,
    status: 'In Stock',
  },
  {
    id: 6,
    bloodGroup: 'A-',
    unitsAvailable: 8,
    pricePerUnit: 2900,
    status: 'Low',
  },
  {
    id: 7,
    bloodGroup: 'B-',
    unitsAvailable: 12,
    pricePerUnit: 3100,
    status: 'In Stock',
  },
  {
    id: 8,
    bloodGroup: 'AB-',
    unitsAvailable: 3,
    pricePerUnit: 3600,
    status: 'Low',
  },
];

export function InventoryTable() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [formData, setFormData] = useState({ unitsAvailable: 0, pricePerUnit: 0 });

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setFormData({
      unitsAvailable: item.unitsAvailable,
      pricePerUnit: item.pricePerUnit,
    });
  };

  const handleSave = () => {
    if (!editingItem) return;

    // Update inventory
    setInventory(
      inventory.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              unitsAvailable: formData.unitsAvailable,
              pricePerUnit: formData.pricePerUnit,
              status:
                formData.unitsAvailable === 0
                  ? 'Out of Stock'
                  : formData.unitsAvailable < 10
                  ? 'Low'
                  : 'In Stock',
            }
          : item
      )
    );

    // Close modal
    setEditingItem(null);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setFormData({ unitsAvailable: 0, pricePerUnit: 0 });
  };

  const getStatusBadge = (status: string) => {
    if (status === 'In Stock') {
      return 'bg-green-100 text-green-700';
    } else if (status === 'Low') {
      return 'bg-yellow-100 text-yellow-700';
    } else {
      return 'bg-red-100 text-red-700';
    }
  };

  return (
    <div>
      {/* Table Card */}
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
            {inventory.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">{item.bloodGroup}</td>
                <td className="p-4 text-gray-700">{item.unitsAvailable}</td>
                <td className="p-4 text-gray-700">₹{item.pricePerUnit.toLocaleString()}</td>
                <td className="p-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                      item.status
                    )}`}
                  >
                    {item.status}
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-300">
              <h3 className="text-xl font-bold text-gray-900">Update Inventory</h3>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Blood Group (readonly) */}
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

              {/* Units Available */}
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
                />
              </div>

              {/* Price Per Unit */}
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
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-300">
              <button
                onClick={handleCancel}
                className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
