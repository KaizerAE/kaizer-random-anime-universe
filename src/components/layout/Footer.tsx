import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/KaizerAE', icon: '🐙' },
    { label: 'MAL', href: 'https://myanimelist.net/profile/KaizerAE', icon: '📺' },
    { label: 'Twitter', href: 'https://twitter.com/KaizerAE', icon: '🐦' },
  ];

  const footerLinks = [
    { to: '/about', label: 'About' },
    { to: '/privacy', label: 'Privacy' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎌</span>
              <h3 className="font-bold text-gray-900 dark:text-white">
                Kaizer's Anime Universe
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your personal anime discovery platform. Explore, track, and enjoy anime from KaizerAE's curated collection.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 dark:text-white">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  title={link.label}
                >
                  <span className="text-xl">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>
              © {currentYear} Kaizer's Anime Universe. All rights reserved.
            </p>
            <p>
              Made with ❤️ by{' '}
              <a
                href="https://github.com/KaizerAE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
              >
                KaizerAE
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
