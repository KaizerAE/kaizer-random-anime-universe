import React from 'react';
import { Container } from '../components/layout/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useSettings } from '../contexts/SettingsContext';
import { useTheme } from '../contexts/ThemeContext';

export const Settings: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'cyber') => {
    setTheme(newTheme);
  };

  const handleSoundToggle = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ volume: parseFloat(e.target.value) });
  };

  const handleAnimationToggle = () => {
    updateSettings({ animationsEnabled: !settings.animationsEnabled });
  };

  return (
    <Container>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-gray-400">Customize your anime experience</p>
        </div>

        {/* Theme Settings */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Theme</h2>
          <p className="text-gray-400 mb-4">
            Choose your preferred color scheme
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => handleThemeChange('light')}
              className={`p-4 rounded-lg border-2 transition-all ${
                theme === 'light'
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">☀️</div>
                <p className="font-semibold">Light</p>
                <p className="text-sm text-gray-400">Bright & clean</p>
              </div>
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              className={`p-4 rounded-lg border-2 transition-all ${
                theme === 'dark'
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🌙</div>
                <p className="font-semibold">Dark</p>
                <p className="text-sm text-gray-400">Easy on the eyes</p>
              </div>
            </button>
            <button
              onClick={() => handleThemeChange('cyber')}
              className={`p-4 rounded-lg border-2 transition-all ${
                theme === 'cyber'
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🔋</div>
                <p className="font-semibold">Cyber Neon</p>
                <p className="text-sm text-gray-400">Futuristic vibes</p>
              </div>
            </button>
          </div>
        </Card>

        {/* Sound Settings */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Sound</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Sound Effects</p>
                <p className="text-sm text-gray-400">
                  Play sounds for interactions
                </p>
              </div>
              <button
                onClick={handleSoundToggle}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  settings.soundEnabled ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                    settings.soundEnabled ? 'transform translate-x-7' : ''
                  }`}
                />
              </button>
            </div>

            {settings.soundEnabled && (
              <div>
                <label className="block mb-2">
                  <span className="font-semibold">Volume</span>
                  <span className="ml-2 text-sm text-gray-400">
                    {Math.round(settings.volume * 100)}%
                  </span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}
          </div>
        </Card>

        {/* Animation Settings */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Animations</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Enable Animations</p>
              <p className="text-sm text-gray-400">
                Smooth transitions and effects
              </p>
            </div>
            <button
              onClick={handleAnimationToggle}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                settings.animationsEnabled ? 'bg-blue-500' : 'bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                  settings.animationsEnabled ? 'transform translate-x-7' : ''
                }`}
              />
            </button>
          </div>
        </Card>

        {/* Data Management */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Data Management</h2>
          <div className="space-y-3">
            <Button variant="secondary" className="w-full">
              Clear Cache
            </Button>
            <Button variant="outline" className="w-full">
              Export Settings
            </Button>
            <Button variant="outline" className="w-full">
              Import Settings
            </Button>
          </div>
        </Card>

        {/* About */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <div className="space-y-2 text-sm text-gray-400">
            <p>Kaizer's Random Anime Universe v1.0.0</p>
            <p>Built with React, TypeScript, and Tailwind CSS</p>
            <p>Data provided by MyAnimeList API</p>
          </div>
        </Card>
      </div>
    </Container>
  );
};
