# Fb Browser

A modern, lightweight desktop web browser built with Electron, React, and TypeScript. Features a clean interface with custom window controls and integrated search functionality.

## Features

- **Custom Window Controls**: Frameless window with custom minimize, maximize, and close buttons
- **Integrated Search**: Built-in search bar with support for DuckDuckGo and Google search engines
- **Navigation Controls**: Back, forward, reload, and home buttons
- **WebView Integration**: Secure web browsing with isolated context
- **Modern UI**: Clean, dark-themed interface built with Tailwind CSS
- **Cross-Platform**: Supports Windows, macOS, and Linux
- **System Tray**: Minimizes to system tray for quick access

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Desktop Framework**: Electron 30
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: Bun

## Prerequisites

- Node.js (v16 or higher)
- Bun package manager
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/NeelFrostrain/PROJECT_FB
cd project-fb
```

2. Install dependencies:
```bash
bun install
```

## Development

Start the development server:
```bash
bun run dev
```

This will start both the Vite development server and Electron in development mode with hot reload.

## Building

### Development Build
```bash
bun run build
```

### Production Build
The build process will:
1. Compile TypeScript
2. Build the React application
3. Package the Electron application
4. Create platform-specific installers

## Project Structure

```
project-fb/
├── electron/                 # Electron main process files
│   ├── main.ts              # Main Electron process
│   ├── preload.ts           # Preload script
│   └── electron-env.d.ts    # Electron type definitions
├── src/                     # React application source
│   ├── components/          # React components
│   │   ├── ui/             # UI components
│   │   ├── TopBar.tsx      # Application top bar
│   │   ├── Webview.tsx     # Web browser component
│   │   └── ...
│   ├── store/              # Zustand state management
│   ├── lib/                # Utility functions
│   ├── App.tsx             # Main React component
│   └── main.tsx            # React entry point
├── public/                 # Static assets
├── dist/                   # Built React application
├── dist-electron/          # Built Electron files
└── release/                # Built application packages
```

## Configuration

### Search Engine
You can configure the default search engine in `src/appConfig.json`:
```json
{
  "app": {
    "engine": "duckduckgo"  // or "google"
  }
}
```

### Electron Builder
Application packaging is configured in `electron-builder.json5` with settings for:
- Windows (NSIS installer)
- macOS (DMG)
- Linux (AppImage)

## Features in Detail

### Custom Window Controls
- Frameless window design
- Custom title bar with navigation and search
- Minimize, maximize, and close functionality
- Window dragging support

### Web Navigation
- Back/forward navigation with state tracking
- URL bar with search functionality
- Home button to return to search engine
- Reload functionality with loading states

### Security
- Context isolation enabled
- Node integration disabled in renderer
- Sandboxed renderer process
- Secure preload script communication

## Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run lint` - Run ESLint
- `bun run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Electron](https://electronjs.org/)
- UI components from [Lucide React](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- State management with [Zustand](https://github.com/pmndrs/zustand)
