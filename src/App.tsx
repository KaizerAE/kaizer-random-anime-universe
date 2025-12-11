import { Routes, Route } from 'react-router-dom';
import { useAtom } from 'jotai';
import { themeAtom } from './store/settings';
import PageLayout from './components/layout/PageLayout';
import Home from './pages/Home';
import Library from './pages/Library';
import Stats from './pages/Stats';
import Settings from './pages/Settings';
import About from './pages/About';
import { useEffect } from 'react';

function App() {
  const [theme] = useAtom(themeAtom);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
