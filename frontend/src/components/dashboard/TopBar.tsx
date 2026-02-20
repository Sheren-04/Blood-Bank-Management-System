import { useNavigate } from 'react-router-dom';
interface TopBarProps {
  title?: string;
}

export function TopBar({ title = "Admin Dashboard" }: TopBarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-300 flex items-center justify-between px-8">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <div className="flex items-center gap-4">
        <span className="text-gray-700">Admin</span>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
