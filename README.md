# OpenCode App

A collection of web and mobile applications built with modern technologies.

## Projects

| Project | Description | Technology |
|---------|-------------|------------|
| `notes-app` | Simple note-taking application | Vite + React |
| `sanguo-game` | 三国策略游戏 (Three Kingdoms Strategy Game) | Vite + Vue |
| `habit-tracker` | Habit tracking application | Vite + React |
| `darkworld-game` | 灵魂地图 (Soul Exploration Game) | Vite + React |
| `timer-app` | Simple timer application | Vanilla JS |
| `bookkeeping-app` | Android bookkeeping app | HTML + Capacitor |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- For Android builds: Java JDK 21, Android SDK

### Install Dependencies

```bash
# Install dependencies for each project
cd notes-app && npm install
cd sanguo-game && npm install
cd habit-tracker && npm install
cd darkworld-game && npm install
cd timer-app && npm install
cd bookkeeping-app && npm install
```

### Development

```bash
# Start dev server for a project
cd <project-name>
npm run dev
```

### Build

```bash
# Build for production
cd <project-name>
npm run build
```

### Android Build

For projects with Android support (notes-app, sanguo-game, habit-tracker, darkworld-game, bookkeeping-app):

```bash
cd <project-name>/android
./gradlew assembleDebug
```

APK files will be generated at `android/app/build/outputs/apk/debug/app-debug.apk`

## Repository Structure

```
opencode_app/
├── notes-app/          # Notes application
├── sanguo-game/        # Three Kingdoms game
├── habit-tracker/      # Habit tracking
├── darkworld-game/     # Soul exploration game
├── timer-app/          # Timer application
├── bookkeeping-app/    # Bookkeeping Android app
├── AGENTS.md          # Coding guidelines
└── organize_photos.py # Photo organization utility
```

## License

MIT
