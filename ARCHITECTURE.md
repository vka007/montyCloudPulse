# MontyCloud Pulse - Application Architecture

## Overview
MontyCloud Pulse is a React-based cloud resource monitoring dashboard built with TypeScript, Material-UI, and Zustand for state management. This document outlines the refactored component and page architecture.

## Architecture Principles

### Component Structure
- **Base Components**: Atomic, reusable UI elements (buttons, inputs, cards, etc.)
- **Composite Components**: Complex components built using base components
- **Page Components**: Top-level components that combine multiple composite components

### File Organization
```
src/
├── components/
│   ├── base/                    # Atomic components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.styles.ts
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   │   └── Card.styles.ts
│   │   └── ...
│   ├── composite/               # Complex components
│   │   ├── MetricCard/
│   │   │   ├── MetricCard.tsx
│   │   │   └── MetricCard.styles.ts
│   │   ├── ResourceTable/
│   │   │   ├── ResourceTable.tsx
│   │   │   └── ResourceTable.styles.ts
│   │   └── ...
│   └── layout/                  # Layout components
│       ├── Layout/
│       │   ├── Layout.tsx
│       │   └── Layout.styles.ts
│       └── ...
└── pages/
    ├── Dashboard/
    │   ├── index.tsx           # Main entry point
    │   ├── Dashboard.tsx       # Page component
    │   └── Dashboard.styles.ts
    └── ...
```

## Component Hierarchy

### Base Components
These are the fundamental building blocks used throughout the application:

#### UI Elements
- **Button**: Custom button component with variants and states
- **Card**: Base card component for containing content
- **Input**: Form input components (text, select, etc.)
- **Icon**: Icon wrapper component for consistent styling
- **Progress**: Loading and progress indicators
- **Chip**: Status and category chips
- **Tooltip**: Information tooltips

#### Data Display
- **Table**: Base table component with sorting and filtering
- **Chart**: Chart wrapper components (using Highcharts)
- **List**: List display components
- **Typography**: Text components with consistent styling

### Composite Components
Built using base components to create more complex functionality:

#### Dashboard Components
- **MetricCard**: Displays key metrics with charts and trends
- **DashboardGrid**: Grid layout for organizing metric cards
- **StatusOverview**: Resource status summary component
- **PerformanceMetrics**: Performance monitoring widgets

#### Inventory Components
- **ResourceTable**: Advanced table for resource management
- **FilterPanel**: Search and filtering interface
- **ResourceDetails**: Detailed resource information display

#### Layout Components
- **Layout**: Main application layout wrapper
- **Navigation**: Primary navigation component
- **Header**: Application header with branding and controls
- **Sidebar**: Collapsible sidebar navigation

### Page Components
Top-level components that combine multiple composite components:

#### Dashboard Page
- **index.tsx**: Entry point that imports and renders Dashboard component
- **Dashboard.tsx**: Main dashboard page combining:
  - StatusOverview
  - PerformanceMetrics
  - DashboardGrid

#### Inventory Page
- **index.tsx**: Entry point that imports and renders Inventory component
- **Inventory.tsx**: Resource inventory page combining:
  - FilterPanel
  - ResourceTable
  - ResourceDetails

## Component Communication

### Props Flow
- Base components receive minimal, focused props
- Composite components orchestrate data flow between base components
- Page components manage application-level state and data fetching

### State Management
- **Zustand Stores**: Global application state
  - `resourceStore`: Resource data and operations
  - `themeStore`: Theme and UI preferences
- **Local State**: Component-specific state using React hooks
- **Context**: Shared state for component trees when needed

## Styling Strategy

### Material-UI Integration
- Leverages MUI's theming system for consistent design
- Custom theme files for light/dark mode support
- Component-specific style files using MUI's `sx` prop pattern

### Style File Structure
Each component folder contains:
- `ComponentName.tsx`: React component
- `ComponentName.styles.ts`: MUI styles object export

Example:
```typescript
// Button.styles.ts
export const buttonStyles = {
  root: {
    borderRadius: 2,
    textTransform: 'none',
    // ... other styles
  },
  primary: {
    // primary variant styles
  },
  secondary: {
    // secondary variant styles
  }
};
```

## Data Flow

### Resource Management
1. **Data Sources**: Mock data generators and API simulators
2. **Store Layer**: Zustand stores manage global state
3. **Component Layer**: Components consume store data via hooks
4. **UI Layer**: Base components render the final UI

### Real-time Updates
- Resource store manages real-time data updates
- Components subscribe to store changes
- Automatic re-rendering on data updates

## Development Guidelines

### Component Development
1. Start with base components for reusable elements
2. Build composite components using base components
3. Create page components that orchestrate the user experience
4. Each component should have a single responsibility
5. Use TypeScript interfaces for prop definitions

### File Naming
- Components: PascalCase (e.g., `MetricCard.tsx`)
- Styles: PascalCase with `.styles.ts` suffix
- Pages: PascalCase with `index.tsx` as entry point

### Import Strategy
- Page components import from `./ComponentName`
- Composite components import from `@/components/base/`
- Base components import only external dependencies
- Absolute imports using `@/` prefix for src directory

## Technology Stack

### Core Technologies
- **React 18**: Component framework
- **TypeScript**: Type safety and development experience
- **Material-UI (MUI)**: Component library and theming
- **Zustand**: State management
- **Highcharts**: Data visualization (as per user preference)

### Development Tools
- **Vite**: Build tool and development server
- **ESLint**: Code linting
- **Prettier**: Code formatting

## Performance Considerations

### Component Optimization
- Use React.memo for expensive components
- Implement proper dependency arrays in useEffect
- Lazy load page components with React.Suspense

### Bundle Optimization
- Tree shaking for unused code elimination
- Code splitting at page level
- Optimized imports from large libraries

## Future Enhancements

### Planned Improvements
1. **Component Library**: Publish base components as reusable library
2. **Testing**: Add comprehensive test coverage
3. **Documentation**: Interactive component documentation
4. **Accessibility**: WCAG compliance improvements
5. **Internationalization**: Multi-language support

This architecture provides a scalable, maintainable foundation for the MontyCloud Pulse application while following React and TypeScript best practices.
