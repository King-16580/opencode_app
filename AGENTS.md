# AGENTS.md - Guidelines for Agentic Coding Agents

This file provides standardized commands and code style guidelines for agentic coding agents working in the opencode_app repository. Follow these guidelines to ensure consistency across all projects.

## 📁 Repository Structure

This is a multi-project repository containing 5 independent applications:
- `notes-app/` - Simple notes taking app
- `sanguo-game/` - 三国策略游戏 (Three Kingdoms Strategy Game)
- `habit-tracker/` - Habit tracking application
- `darkworld-game/` - 灵魂地图 (Dark World - Soul Exploration Game)
- `timer-app/` - Simple timer application

Each project is self-contained with its own package.json, assets, and build configuration.

## 🔧 Build, Lint & Test Commands

### Common Commands (across most projects)

| Command | Purpose | Projects |
|---------|---------|----------|
| `npm run dev` | Start development server with hot reload | notes-app, sanguo-game, habit-tracker, darkworld-game |
| `npm run build` | Create production build | notes-app, sanguo-game, habit-tracker, darkworld-game |
| `npm run preview` | Preview production build locally | notes-app, sanguo-game, habit-tracker, darkworld-game |
| `npm test` | Run tests | timer-app (currently just a placeholder) |

### Project-Specific Details

#### notes-app, sanguo-game, habit-tracker, darkworld-game
These four projects use Vite as their build tool and share identical scripts:
- `dev`: `vite` - starts development server
- `build`: `vite build` - creates production bundle in `/dist`
- `preview`: `vite preview` - serves built application locally

#### timer-app
Minimal project with only a test script:
- `test`: `echo "Error: no test specified" && exit 1` (placeholder)

### Android Build Commands
For generating APK files (requires Java JDK and Android SDK):
```bash
# From each project's android/ directory
./gradlew assembleDebug  # Debug build
./gradlew assembleRelease # Release build
```

APK files are generated at: `android/app/build/outputs/apk/debug/app-debug.apk`

### Running Single Tests
Currently, only timer-app has a test command (placeholder):
```bash
cd timer-app
npm test
```

For future test implementation, follow these patterns:
- Unit tests: Place in `__tests__` or `*.test.js` files
- Use Vitest or Jest for testing framework
- Run single test: `npx vitest run path/to/test.test.js --test-name="test name"`

## 🎨 Code Style Guidelines

### JavaScript/TypeScript

#### Formatting
- Use 2-space indentation (not tabs)
- Maximum line length: 100 characters
- Trailing commas in multi-line objects/arrays
- Semicolons: Required (do not rely on ASI)
- Quotes: Single quotes for strings, template literals for interpolation
- Arrow functions: Use implicit return for simple functions, explicit return for complex

#### Imports & Exports
- ES6 module syntax only (`import`/`export`)
- Group imports: 1) External libraries 2) Internal modules 3) Parent/internal imports
- No wildcard imports (`import * as`) unless necessary
- Named imports preferred over default when possible
- Export structure: Named exports for utilities, default for main components

#### Naming Conventions
- Variables/functions: camelCase
- Classes/Components: PascalCase
- Constants: UPPER_SNAKE_CASE
- Files: kebab-case (.js, .ts, .jsx, .tsx)
- CSS classes: kebab-case
- Private properties/methods: Prefix with underscore (_)

#### Types & Data Structures
- Prefer TypeScript when adding new logic (migrate existing JS gradually)
- Use interfaces for object shapes, types for unions/maps
- Avoid `any` type; use `unknown` when type is truly uncertain
- Define explicit return types for functions
- Use enum for fixed sets of related constants

#### Error Handling
- Always handle promises with `.catch()` or try/catch
- Never leave empty catch blocks
- Log errors appropriately for debugging
- Throw specific error types rather than generic Error
- Validate inputs at function boundaries

#### React/Vue Specific (if applicable)
- Functional components preferred over class components
- Hooks rules: Only call hooks at top level, only in React functions
- Keep components small and focused
- Use props drilling sparingly; consider context for deep trees
- Keys in lists should be stable and predictable

### HTML/CSS

#### HTML
- Use semantic elements when possible (header, nav, main, section, article, footer)
- Close all tags (self-closing tags: `<br />`, `<img />`, etc.)
- Quote all attribute values
- Use lowercase for tag names and attributes
- Indent nested elements (2 spaces)

#### CSS/SCSS
- BEM naming convention for components: `block__element--modifier`
- Mobile-first media queries
- Use CSS custom properties (variables) for theme values
- Avoid `!important` except for specific cases
- Organize styles: 1) Reset/base 2) Layout 3) Components 4) Utilities
- Use flexbox/grid for layout, avoid floats when possible
- Optimize for performance: will-change, contain, etc.

## 📱 Platform-Specific Guidelines

### Capacitor/Android Projects
- Keep web assets in `/dist` after build
- Capacitor configuration in `capacitor.config.json`
- Android-specific code in `android/app/src/main/`
- Follow Android Java/Kotlin conventions for native code
- Test on multiple screen sizes and orientations
- Request permissions at runtime when needed
- Handle Android lifecycle events properly

### Performance Considerations
- Lazy load images and components when possible
- Minimize DOM manipulation in loops
- Use requestAnimationFrame for animations
- Debounce/throttle frequent events (resize, scroll)
- Optimize bundle size: code-splitting, dynamic imports
- Compress assets and enable gzip on server

## 🔍 Code Quality

### Best Practices
- Write self-documenting code with clear function/variable names
- Keep functions small and focused (single responsibility principle)
- Avoid deep nesting (>3 levels considered for refactoring)
- Use early returns to reduce nesting
- Comment why, not what (unless complex algorithm)
- Remove commented-out code and console.log statements before commit
- Handle edge cases: null, undefined, empty arrays, zero values

### Testing Guidelines
When adding tests:
- Test one thing per test case
- Use descriptive test names: `should do X when Y`
- Mock external dependencies
- Test both success and failure paths
- Keep tests fast and isolated
- Aim for 80%+ coverage on critical logic

## 🚦 Workflow Recommendations

1. **Before coding**: Check existing patterns in similar files
2. **While coding**: Follow the established style in the file you're editing
3. **Before committing**: 
   - Run linter if available
   - Ensure code follows guidelines above
   - Test changes manually
   - Write meaningful commit messages
4. **For Android builds**: Test APK on emulator/device before considering complete

## 📚 Resources

- Vite Documentation: https://vitejs.dev/
- Capacitor Documentation: https://capacitorjs.com/
- Android Development: https://developer.android.com/
- JavaScript Standard Style: https://standardjs.com/
- BEM Methodology: http://getbem.com/

---

*Last Updated: March 25, 2026*
*Generated for opencode_app repository*