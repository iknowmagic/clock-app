# ReactCraft

```
 ######                              #####
 #     # ######   ##    ####  ##### #     # #####    ##   ###### #####
 #     # #       #  #  #    #   #   #       #    #  #  #  #        #
 ######  #####  #    # #        #   #       #    # #    # #####    #
 #   #   #      ###### #        #   #       #####  ###### #        #
 #    #  #      #    # #    #   #   #     # #   #  #    # #        #
 #     # ###### #    #  ####    #    #####  #    # #    # #        #

```

## Modern React Development Toolkit

ReactCraft is a comprehensive starter kit that combines the latest React ecosystem tools with best practices for building high-quality, maintainable web applications. It provides a robust foundation so you can focus on building your application rather than setting up infrastructure.

## Key Features

- **React 19** - Utilizing the latest React version with improved rendering and hooks
- **TypeScript** - Full type safety for more reliable code and better developer experience
- **Mobile-first Design** - Built with responsive layouts that work across all device sizes
- **Modern Build System**
  - Vite - Lightning-fast development server and optimized production builds
  - Hot Module Replacement (HMR) for quick feedback during development
- **Styling & UI**
  - Tailwind CSS v4 - Utility-first CSS with the latest features
  - DaisyUI - Component library built on Tailwind with theming support
  - Custom theming system with light/dark/system mode detection
  - Framer Motion - Animation library for creating smooth UI transitions
- **State Management & Utilities**
  - Zustand - Lightweight state management without boilerplate
  - React Router v7 - Declarative routing for your application
  - React Icons - Comprehensive icon library
- **Code Quality Tools**
  - ESLint - Static code analysis with modern rules
  - Prettier - Consistent code formatting
  - Husky & lint-staged - Precommit hooks to ensure code quality
  - Commitizen & Commitlint - Standardized commit messages with interactive prompt
- **Testing & Documentation**
  - Vitest - Fast, modern testing framework with JSDOM support
  - Storybook 8 - Component documentation and testing with device viewports
  - Testing Library - User-centric testing utilities
- **Developer Experience**
  - Component generation with Plop
  - Preconfigured VS Code settings and extensions
  - Path aliasing with '@' imports
- **Structured Git Workflow**
  - Tag-centric process with immutable version history
  - Clean branch management with short-lived work branches
  - Helper scripts for branch creation, snapshots, and versioning
  - See [GIT_WORKFLOW.md](./GIT_WORKFLOW.md) for detailed workflow documentation

## Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd reactcraft
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Generate a new component**

   ```bash
   npm run plop
   ```

5. **Create a standardized commit**

   ```bash
   npm run commit
   ```

6. **Run tests**

   ```bash
   npm run test
   ```

7. **Launch Storybook**

   ```bash
   npm run storybook
   ```

8. **Build for production**

   ```bash
   npm run build
   ```

## Project Structure

```
reactcraft/
├── .storybook/          # Storybook configuration
├── .templates/          # Component templates for Plop
├── scripts/             # Git workflow automation helpers
├── src/
│   ├── assets/          # Static assets (images, fonts)
│   ├── components/      # Reusable UI components
│   ├── config/          # Application configuration
│   ├── features/        # Feature-based modules
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Layout components
│   ├── lib/             # Shared libraries and utilities
│   ├── pages/           # Page components
│   ├── store/           # State management (Zustand)
│   ├── stories/         # Additional Storybook stories
│   ├── styles/          # Global styles and Tailwind config
│   ├── utils/           # Utility functions
│   ├── main.tsx         # Application entry point
├── public/              # Static files served by the web server
├── .husky/              # Git hooks configuration
├── .vscode/             # VS Code settings
├── [GIT_WORKFLOW.md](./GIT_WORKFLOW.md)               # Git workflow documentation
```

## Theme System

ReactCraft includes a built-in theme system with:

- Customizable light and dark themes defined in Tailwind
- System preference detection with automatic switching
- Persistent theme selection with localStorage
- Animated theme transitions

## Component Generation

Use the built-in component generator to create new components with a consistent structure:

```bash
npm run plop
```

This creates:

- Component TypeScript file
- TypeScript definitions
- Index file for clean imports
- Unit tests
- Storybook stories

## Git Workflow

ReactCraft implements a tag-centric Git workflow designed for clarity and efficiency:

- **Immutable version history** - Each release is sealed with a `v<semver>` tag that never changes
- **Clean branch management** - Development happens in short-lived `work/b####` branches that disappear after merging
- **Snapshot system** - Optional `snap/YYYY.MM.DD-n-b####` tags provide daily checkpoints when needed
- **Streamlined release process** - Helper scripts automate common Git operations

### Built-in workflow commands:

```bash
npm run branch   # Create next work branch (work/b####)
npm run snap     # Create snapshot of current work
npm run bump:patch|minor|major  # Version bump, tag, and push
```

## Browser Support

ReactCraft is designed to support all modern browsers including:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Contributing

Feel free to fork this repository and submit pull requests. Contributions are welcome!

## License

This project is licensed under the [MIT License](LICENSE).
