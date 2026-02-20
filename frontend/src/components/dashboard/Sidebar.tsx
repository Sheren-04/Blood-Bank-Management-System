//import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/admin/dashboard' },
  { id: 'donors', label: 'Donors', path: '/admin/donors' },
  { id: 'blood-requests', label: 'Blood Requests', path: '/admin/requests' },
  { id: 'contact-queries', label: 'Contact Queries', path: '/admin/queries' },
  { id: 'inventory', label: 'Inventory', path: '/admin/inventory'},
  { id: 'change-password', label: 'Change Password', path: '/admin/change-password' },
];
interface SidebarProps {
  activePage?: string;
}

export function Sidebar({ activePage }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Use activePage prop if provided, otherwise use location.pathname
  const currentPath = activePage 
    ? menuItems.find(item => item.id === activePage)?.path || location.pathname
    : location.pathname;

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/admin/login');
  };

  
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-300 flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-300">
        <h1 className="text-xl font-bold text-gray-900">BloodLife Admin</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => navigate(item.path)}
                className={`w-full text-left px-4 py-3 rounded transition ${
                  location.pathname === item.path
                    ? 'bg-red-600 text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-300">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
