# 🎌 Kaizer's Random Anime Universe

> A stylish, feature-rich anime dashboard powered by MyAnimeList - Pick random anime from KaizerAE's list with beautiful UI/UX, statistics, and deep customization.

![Built with React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.18-FF0055)

## 🌟 Overview

This project connects to **KaizerAE**'s MyAnimeList profile and provides:
- **Random Anime Selector** - Pick a random anime with a beautiful animated card
- **Full Library Browser** - Browse, filter, and search your entire anime list
- **Statistics Dashboard** - Visualize your anime watching patterns with charts
- **Customizable Themes** - Light/Dark/Cyber Neon themes with glassmorphism design
- **Settings Panel** - Control animations, filters, and appearance

### MyAnimeList Profile
- **Username**: KaizerAE
- **Profile**: [https://myanimelist.net/profile/KaizerAE](https://myanimelist.net/profile/KaizerAE)
- **API**: Uses Jikan v4 API (no authentication required)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/KaizerAE/kaizer-random-anime-universe.git
cd kaizer-random-anime-universe

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run test     # Run tests
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

## 📁 Project Structure

```
kaizer-random-anime-universe/
├── src/
│   ├── api/              # Jikan API client
│   │   └── malClient.ts
│   ├── components/
│   │   ├── ui/          # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Tabs.tsx
│   │   │   └── ...
│   │   ├── layout/      # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── PageLayout.tsx
│   │   └── anime/       # Anime-specific components
│   │       ├── AnimeCard.tsx
│   │       ├── AnimeGrid.tsx
│   │       └── AnimeDetailModal.tsx
│   ├── features/
│   │   ├── random/      # Random anime selector
│   │   ├── library/     # Library browser
│   │   ├── stats/       # Statistics dashboard
│   │   └── settings/    # Settings panel
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   │   ├── Home.tsx
│   │   ├── Library.tsx
│   │   ├── Stats.tsx
│   │   ├── Settings.tsx
│   │   └── About.tsx
│   ├── store/           # Jotai atoms for global state
│   ├── styles/          # Global styles
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static assets
│   └── sounds/          # Sound effects (optional)
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.cjs
├── .prettierrc
└── README.md
```

## 🎨 Features

### 1. Random Anime Selector (Home Page)
- Large glowing "Pick Random Anime" button
- Animated anime card with:
  - Cover image
  - Title
  - Score, type, episodes
  - Genre badges
  - Synopsis with expand/collapse
  - Direct link to MAL
- Recent picks history strip
- Filter options (Completed only, Plan to Watch, etc.)

### 2. Library Browser
- Responsive grid of anime cards
- Filters:
  - Status (Watching, Completed, On-Hold, Dropped, Plan to Watch)
  - Type (TV, Movie, OVA, etc.)
  - Search by title
- Sort options (title, score, last updated)
- Detail modal on card click

### 3. Statistics Dashboard
- Status distribution pie chart
- Type distribution bar chart
- Score distribution histogram
- Top 10 genres
- Total episodes watched
- All powered by Recharts

### 4. Settings
- Theme selector (Light/Dark/Cyber Neon)
- Animation intensity control
- Enable/disable background GIFs
- NSFW content filter
- Sound effects toggle

### 5. About Page
- Project explanation
- Links to MAL profile and repo
- Credits and tech stack info

## 🛠️ Tech Stack

### Core
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### Styling
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- Glassmorphism design with neon gradients

### State Management
- **Jotai** - Atomic state management
- **TanStack Query** - Data fetching and caching

### Data Visualization
- **Recharts** - Chart library

### Routing
- **React Router** - Client-side routing

### Testing
- **Vitest** - Test runner
- **React Testing Library** - Component testing

### Code Quality
- **ESLint** - Linting
- **Prettier** - Code formatting

## 🎭 Design Philosophy

### Anime Aesthetics
- Dark neon gradient backgrounds (purple/blue/pink)
- Glassmorphism cards with blur and transparency
- Anime GIF decorations (tastefully placed)
- Rounded corners and generous spacing
- Glowing borders on interactive elements

### Animations
- Page transitions with Framer Motion
- Floating/bobbing hero title
- Button hover and tap effects
- Card entrance animations
- Respect animation intensity settings

### Anime GIFs Used
- Hero section: `https://media.giphy.com/media/11kEuHSQAXXiGQ/giphy.gif`
- Random button mascot: `https://media.giphy.com/media/SDogLD4FOZMM8/giphy.gif`
- Background overlay: `https://media.giphy.com/media/l0ExncehJzexFpRHq/giphy.gif`
- Footer/stats: `https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif`
- Library decorations: More GIFs available in spec

## 🔌 API Integration

### Jikan v4 API
Base URL: `https://api.jikan.moe/v4`

**Key Endpoints:**
```
GET /users/KaizerAE/animelist
```

**Important Notes:**
- API is rate-limited (be respectful)
- Cache responses in localStorage
- Use TanStack Query for efficient data fetching
- Handle pagination (load all pages, not just first)

### Data Structure
Each anime entry includes:
- `mal_id` - MyAnimeList ID
- `title` - Anime title
- `images` - Cover images
- `score` - User score
- `status` - Watching status
- `type` - TV, Movie, OVA, etc.
- `episodes` - Episode count
- `genres` - Genre list
- `synopsis` - Description

## 🧪 Testing

Run tests:
```bash
npm run test
```

Test coverage includes:
- Random anime selection logic
- Filter functionality
- Stats calculations
- Component rendering

## 📦 Building for Production

```bash
npm run build
```

Output will be in `dist/` directory.

### Deployment Options
- **GitHub Pages** - Free hosting for static sites
- **Vercel** - Zero-config deployments
- **Netlify** - Continuous deployment

## 🔧 Configuration Files

The repository includes:
- ✅ `package.json` - Dependencies and scripts
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `vite.config.ts` - Vite and Vitest setup
- ⏳ `tailwind.config.js` - Tailwind customization
- ⏳ `postcss.config.js` - PostCSS setup
- ⏳ `.eslintrc.cjs` - ESLint rules
- ⏳ `.prettierrc` - Prettier configuration
- ⏳ `tsconfig.node.json` - Node TypeScript config

## 🎯 Next Steps

To complete this project, you need to:

1. **Create remaining config files**:
   - tailwind.config.js
   - postcss.config.js
   - .eslintrc.cjs
   - .prettierrc
   - tsconfig.node.json

2. **Set up src directory structure**:
   - Create all folders and files as shown in Project Structure
   - Implement Jikan API client
   - Build UI component library
   - Create page components
   - Implement features (random, library, stats, settings)

3. **Add public assets**:
   - index.html with proper meta tags
   - Sound effects (optional)

4. **Implement features per specification**:
   - Follow the detailed requirements in the original prompt
   - Use provided GIF URLs
   - Implement all animations
   - Add LocalStorage caching

5. **Set up GitHub Actions**:
   - Create `.github/workflows/ci.yml`
   - Run lint, test, and build on PR/push

6. **Add screenshots to README**:
   - Home page with random selector
   - Library with filters
   - Stats dashboard
   - Settings panel

## 📝 Customization

### Change MAL Username
Edit `src/api/malClient.ts` and change the username constant.

### Adjust Theme Colors
Modify `tailwind.config.js` to customize the color palette.

### Add New Anime GIFs
Add URLs to the appropriate component files.

## 📄 License

MIT License - feel free to use this project for learning or personal use.

## 🙏 Credits

- **MyAnimeList** - Anime data source
- **Jikan API** - Unofficial MAL API
- **KaizerAE** - Project owner and MAL user
- Built with modern React ecosystem

## 🔗 Links

- [MyAnimeList Profile](https://myanimelist.net/profile/KaizerAE)
- [Jikan API Documentation](https://docs.api.jikan.moe/)
- [Repository](https://github.com/KaizerAE/kaizer-random-anime-universe)

---

**Note**: This is a fan project and is not affiliated with or endorsed by MyAnimeList.
