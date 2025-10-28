# Fluidium

Fluidium is an interactive virtual lab for engineering education, starting with fluid mechanics.  It allows students to visualize and experiment with engineering principles in real time using interactive simulations.  This updated version includes a refreshed UI/UX with dark mode support, improved controls, and enhanced animations.

## Features

- **Interactive simulations** of fluid mechanics experiments such as Bernoulli’s theorem, Venturi flow, Reynolds number and more.
- **Responsive interface** that adapts to any screen size and supports both light and dark themes.
- **Real‑time data visualization** using dynamic charts and tables.
- **Parameter control** sliders with immediate feedback.
- **Data export** to CSV and JSON for lab reports.
- **Modular architecture** built with React, Vite, Tailwind CSS, Framer Motion and Recharts.
- **One‑click deployment** to Netlify using the included `netlify.toml` configuration.

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

The project can be deployed to Netlify or any static hosting service by uploading the contents of the `dist` folder.

## File Structure

```
updated_fluidium/
├── index.html           # Main HTML entry point
├── package.json         # Project metadata and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration with dark mode
├── netlify.toml         # Netlify build settings
├── src/
│   ├── main.jsx         # Application entry with ErrorBoundary and context provider
│   ├── App.jsx          # Root component with layout
│   ├── context/         # Global state management
│   ├── components/      # UI components (Navbar, Sidebar, SimulationArea, etc.)
│   ├── styles/          # Tailwind and theme CSS files
│   └── utils/           # Utility functions (data export)
└── public/
    └── logo192.png      # App logo used for PWA and sharing
```