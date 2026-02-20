import type { QuerySummary } from '../../pages/ContactQueriesManagement';

interface QueryStatsCardsProps {
  summary: QuerySummary;
}

export function QueryStatsCards({ summary }: QueryStatsCardsProps) {
  const stats = [
    { label: 'Total Messages', value: summary?.total ?? 0 },
    { label: 'New', value: summary?.new ?? 0 },
    { label: 'Replied', value: summary?.replied ?? 0 },
    { label: 'Closed', value: summary?.closed ?? 0 },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm"
        >
          <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
          <p className="text-sm text-gray-600">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
