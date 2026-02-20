import { ClipboardList, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import type { BloodRequest } from '../../pages/BloodRequestsManagement';

interface Props {
  requests: BloodRequest[];
}

export function RequestStatsCards({ requests }: Props) {
  // ✅ New version logic
  const total = requests.length;
  const pending = requests.filter(r => r.status === 'Pending').length;
  const completed = requests.filter(r => r.status === 'Completed').length;
  const critical = requests.filter(
    r => r.urgency === 'Critical' && r.status === 'Pending'
  ).length;

  // ✅ Old UI structure preserved
  const stats = [
    {
      icon: ClipboardList,
      label: 'Total Requests',
      value: total,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: Clock,
      label: 'Pending',
      value: pending,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      badgeColor: 'bg-yellow-100 text-yellow-700',
    },
    {
      icon: CheckCircle,
      label: 'Completed',
      value: completed,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      badgeColor: 'bg-green-100 text-green-700',
    },
    {
      icon: AlertTriangle,
      label: 'Critical Requests',
      value: critical,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      badgeColor: 'bg-red-100 text-red-700',
      isHighlighted: true,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={index}
            className={`bg-white border border-gray-300 rounded-lg p-6 shadow-sm ${
              stat.isHighlighted ? 'bg-red-50 border-red-200' : ''
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}
              >
                <Icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
            </div>

            <p className="text-3xl font-bold text-gray-900 mb-1">
              {stat.value}
            </p>

            <p className="text-sm text-gray-600">{stat.label}</p>

            {stat.badgeColor && (
              <span
                className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${stat.badgeColor}`}
              >
                {stat.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
