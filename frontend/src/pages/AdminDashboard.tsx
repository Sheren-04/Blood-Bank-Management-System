import { Sidebar } from '../components/dashboard/Sidebar';
import { TopBar } from '../components/dashboard/TopBar';
import { StatsBoxes } from '../components/dashboard/StatsBoxes';
import { RecentRequestsTable } from '../components/dashboard/RecentRequestsTable';

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 overflow-auto p-8">
          <StatsBoxes />
          <RecentRequestsTable />
        </main>
      </div>
    </div>
  );
}
