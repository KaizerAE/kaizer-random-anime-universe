import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/helpers';
import { Card } from '../common/Card';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();

  const quickStats = [
    { label: 'Total Anime', value: '847', icon: '📚' },
    { label: 'Completed', value: '523', icon: '✅' },
    { label: 'Watching', value: '42', icon: '👀' },
    { label: 'Plan to Watch', value: '282', icon: '📝' },
  ];

  const quickLinks = [
    { to: '/library?status=watching', label: 'Currently Watching', icon: '▶️' },
    { to: '/library?status=completed', label: 'Completed', icon: '✅' },
    { to: '/library?status=plan_to_watch', label: 'Plan to Watch', icon: '📝' },
    { to: '/stats', label: 'View All Stats', icon: '📊' },
  ];

  return (
    <aside className={cn('space-y-6', className)}>
      {/* Quick Stats Card */}
      <Card variant="gradient">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          📊 Quick Stats
        </h3>
        <div className="space-y-3">
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-gray-800/50"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{stat.icon}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </span>
              </div>
              <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Links Card */}
      <Card variant="bordered">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          🔗 Quick Links
        </h3>
        <div className="space-y-2">
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg transition-all',
                'hover:bg-purple-50 dark:hover:bg-purple-900/20',
                'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
              )}
            >
              <span className="text-lg">{link.icon}</span>
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      </Card>

      {/* Random Tip Card */}
      <Card variant="gradient">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-1">
              Pro Tip
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use the random button to discover hidden gems from your plan to watch list!
            </p>
          </div>
        </div>
      </Card>
    </aside>
  );
};

Sidebar.displayName = 'Sidebar';
