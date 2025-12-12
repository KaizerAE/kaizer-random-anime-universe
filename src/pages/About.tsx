import React from 'react';
import { Container } from '../components/layout/Container';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const About: React.FC = () => {
  return (
    <Container>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">🎌 Kaizer's Random Anime Universe</h1>
          <p className="text-xl text-gray-400">
            Your personal anime discovery platform
          </p>
        </div>

        {/* About */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">About This Project</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              Kaizer's Random Anime Universe is a modern, feature-rich web application
              designed to help anime enthusiasts discover and manage their anime collection.
              Connected directly to your MyAnimeList profile, it provides a beautiful
              and intuitive interface for browsing, filtering, and randomly selecting
              anime from your personal list.
            </p>
            <p>
              Whether you're looking for your next watch, want to explore your collection,
              or analyze your watching statistics, this application has you covered with
              deep customization options and a sleek, anime-inspired design.
            </p>
          </div>
        </Card>

        {/* Features */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">🎲 Random Selector</h3>
              <p className="text-gray-400 text-sm">
                Pick a random anime with beautiful animations and sound effects
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">📚 Library Browser</h3>
              <p className="text-gray-400 text-sm">
                Browse and filter your complete anime collection
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">📊 Statistics Dashboard</h3>
              <p className="text-gray-400 text-sm">
                Visualize your watching patterns and preferences
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">🎨 Customizable Themes</h3>
              <p className="text-gray-400 text-sm">
                Choose from Light, Dark, or Cyber Neon themes
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">🔍 Advanced Filtering</h3>
              <p className="text-gray-400 text-sm">
                Search by title, genre, status, and more
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">✨ Smooth Animations</h3>
              <p className="text-gray-400 text-sm">
                Powered by Framer Motion for buttery-smooth transitions
              </p>
            </div>
          </div>
        </Card>

        {/* Tech Stack */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Built With</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="primary">React 18</Badge>
            <Badge variant="primary">TypeScript</Badge>
            <Badge variant="primary">Tailwind CSS</Badge>
            <Badge variant="primary">Framer Motion</Badge>
            <Badge variant="secondary">Vite</Badge>
            <Badge variant="secondary">MyAnimeList API</Badge>
            <Badge variant="secondary">React Router</Badge>
            <Badge variant="secondary">Vitest</Badge>
          </div>
        </Card>

        {/* Credits */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Credits</h2>
          <div className="space-y-3 text-gray-300">
            <div>
              <p className="font-semibold">Developer</p>
              <p className="text-sm text-gray-400">KaizerAE</p>
            </div>
            <div>
              <p className="font-semibold">Data Provider</p>
              <p className="text-sm text-gray-400">
                MyAnimeList - The world's largest anime database
              </p>
            </div>
            <div>
              <p className="font-semibold">Version</p>
              <p className="text-sm text-gray-400">1.0.0</p>
            </div>
            <div>
              <p className="font-semibold">License</p>
              <p className="text-sm text-gray-400">MIT License</p>
            </div>
          </div>
        </Card>

        {/* Links */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Links</h2>
          <div className="flex flex-col gap-2">
            <a
              href="https://github.com/KaizerAE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              👨‍💻 GitHub Profile
            </a>
            <a
              href="https://myanimelist.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              🎌 MyAnimeList
            </a>
          </div>
        </Card>
      </div>
    </Container>
  );
};
