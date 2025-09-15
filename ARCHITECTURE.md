# MontyCloud Pulse - Application Architecture

## Overview
MontyCloud Pulse is a React-based cloud resource monitoring dashboard built with TypeScript, Material-UI, Highcharts, and Zustand for state management. This document outlines the current component and page architecture with all implemented features.

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
│   │   ├── Chart/
│   │   │   ├── Chart.tsx
│   │   │   └── Chart.styles.ts
│   │   ├── Charts/
│   │   │   ├── CPUTrendChart.tsx
│   │   │   ├── GaugeChart.tsx
│   │   │   ├── MemoryChart.tsx
│   │   │   ├── NetworkTrafficChart.tsx
│   │   │   ├── ServiceDistributionChart.tsx
│   │   │   └── index.ts
│   │   ├── Chip/
│   │   │   ├── Chip.tsx
│   │   │   └── Chip.styles.ts
│   │   ├── EChart/
│   │   │   ├── EChart.tsx
│   │   │   └── EChart.styles.ts
│   │   ├── Notistack/
│   │   │   ├── Notistack.tsx
│   │   │   ├── Notistack.styles.ts
│   │   │   └── Notistack.css
│   │   ├── Progress/
│   │   │   ├── Progress.tsx
│   │   │   └── Progress.styles.ts
│   │   └── index.ts            # Barrel exports
│   └── common/                  # Shared layout components
│       ├── ApplicationHeader/
│       │   ├── ApplicationHeader.tsx
│       │   ├── ApplicationHeader.styles.ts
│       │   └── index.ts
│       ├── DashboardHeader/
│       │   ├── DashboardHeader.tsx
│       │   ├── DashboardHeader.styles.ts
│       │   └── index.ts
│       ├── SidebarLayout/
│       │   ├── SidebarLayout.tsx
│       │   ├── SidebarLayout.styles.ts
│       │   └── index.ts
│       └── index.ts
├── pages/
│   ├── Dashboard/
│   │   ├── components/          # Dashboard-specific components
│   │   │   ├── DashboardGrid/
│   │   │   │   ├── DashboardGrid.tsx
│   │   │   │   └── DashboardGrid.styles.ts
│   │   │   ├── DynamicMetrics/
│   │   │   │   ├── DynamicMetrics.tsx
│   │   │   │   └── DynamicMetrics.styles.ts
│   │   │   ├── MetricCard/
│   │   │   │   ├── MetricCard.tsx
│   │   │   │   └── MetricCard.styles.ts
│   │   │   └── ResponsiveDashboard/
│   │   │       ├── ResponsiveDashboard.tsx
│   │   │       └── ResponsiveDashboard.styles.ts
│   │   ├── Dashboard.tsx
│   │   ├── Dashboard.styles.ts
│   │   └── index.tsx
│   └── Inventory/
│       ├── components/          # Inventory-specific components
│       │   ├── ResourceSelector/
│       │   │   ├── ResourceSelector.tsx
│       │   │   └── ResourceSelector.styles.ts
│       │   └── ResourceTable/
│       │       ├── ResourceTable.tsx
│       │       └── ResourceTable.styles.ts
│       ├── Inventory.tsx
│       ├── Inventory.styles.ts
│       └── index.tsx
├── layout/                      # Application layout
│   ├── Layout/
│   │   ├── Layout.tsx
│   │   └── Layout.styles.ts
│   └── index.ts
├── navigation/                  # Navigation system
│   ├── Navigation/
│   │   ├── Navigation.tsx
│   │   ├── Navigation.styles.ts
│   │   └── index.ts
│   └── index.ts
├── notification/                # Notification system
│   ├── NotificationProvider.tsx
│   ├── notificationService.ts
│   └── index.ts
├── theme/                       # Theme system
│   ├── ThemeToggle/
│   │   ├── ThemeToggle.tsx
│   │   ├── ThemeToggle.styles.ts
│   │   └── index.ts
│   ├── styles/
│   │   └── common.styles.ts
│   ├── darkTheme.ts
│   ├── lightTheme.ts
│   └── index.ts
├── store/                       # Zustand state management
│   ├── resourceStore.ts
│   ├── enhancedResourceStore.ts
│   ├── themeStore.ts
│   └── notificationStore.ts
├── hooks/                       # Custom React hooks
│   └── useTheme.ts
├── dataFactory/                 # Mock data generators
│   ├── mockResources.ts
│   ├── dataGenerator.ts
│   ├── enhancedMockData.ts
│   └── additionalResources.ts
├── types/                       # TypeScript definitions
│   ├── resources.ts
│   ├── common.ts
│   └── navigation.ts
└── utils/                       # Utility functions
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
- **Chart**: Highcharts wrapper component with consistent theming
- **Progress**: Linear and circular progress indicators
- **Chip**: Status indicators with semantic coloring
- **Notistack**: Enhanced notification system integration

### Page-Specific Components
Components organized by page for better maintainability:

#### Dashboard Components (`src/pages/Dashboard/components/`)
- **MetricCard**: Displays key metrics with Highcharts sparklines and trends
- **DashboardGrid**: Grid layout for organizing metric cards with real-time updates
- **ResponsiveDashboard**: Responsive wrapper for mobile-optimized layouts
- **DynamicMetrics**: Dynamic metrics display with real-time updates

#### Inventory Components (`src/pages/Inventory/components/`)
- **ResourceTable**: Advanced table for resource management
- **ResourceSelector**: Multi-select dropdown with search and filtering

### Common Components (`src/components/common/`)
Shared layout components used across the application:
- **ApplicationHeader**: Top navigation bar with notifications and user menu
- **DashboardHeader**: Page-specific header with breadcrumbs and actions
- **SidebarLayout**: Sidebar navigation with tabs and layout structure

### System Components
Components organized by system concern:

#### Layout System (`src/layout/`)
- **Layout**: Main application layout wrapper

#### Navigation System (`src/navigation/`)
- **Navigation**: Primary navigation component with routing logic

#### Theme System (`src/theme/`)
- **ThemeToggle**: Theme switching functionality
- **Theme Configuration**: Light/dark theme definitions

#### Notification System (`src/notification/`)
- **NotificationProvider**: Context provider for notifications
- **NotificationService**: Business logic for notification management

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
  - `resourceStore`: Resource data and operations with real-time updates
  - `themeStore`: Theme and UI preferences with persistence
  - `notificationStore`: Notification state management with Notistack integration
- **Local State**: Component-specific state using React hooks
- **Context**: Shared state for component trees (NotificationProvider)

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
- **Page Components**: Import from `./components/ComponentName/ComponentName`
- **Page-Specific Components**: Import from `../ComponentName/ComponentName`
- **Base Components**: Import from `@/components/base/ComponentName`
- **Common Components**: Import from `@/components/common/ComponentName`
- **System Components**: Import from `@/systemName/ComponentName`
- **Absolute Imports**: Use `@/` prefix for src directory
- **Cross-Page Imports**: Use `../../../OtherPage/components/ComponentName`

## Technology Stack

### Core Technologies
- **React 18**: Component framework with hooks and functional components
- **TypeScript**: Full type safety and enhanced development experience
- **Material-UI (MUI)**: Component library and theming system
- **Zustand**: Lightweight state management with persistence
- **Highcharts**: Interactive data visualization and charts
- **Notistack**: Enhanced notification system
- **React Router**: Client-side routing and navigation

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

## Current Implementation Status

### ✅ Completed Features
1. **Base Component Library**: Fully implemented atomic components
2. **Composite Components**: Complex components using base components
3. **State Management**: Complete Zustand integration with persistence
4. **Data Visualization**: Highcharts integration with responsive design
5. **Notification System**: Notistack integration with real-time alerts
6. **Theme System**: Light/dark mode with smooth transitions
7. **Responsive Design**: Mobile-first approach with breakpoint optimization
8. **Performance**: Vite optimization with code splitting and tree shaking

### 🚀 Production Ready
The application is production-ready with:
- **Build System**: Optimized Vite configuration
- **Type Safety**: Full TypeScript coverage
- **Error Handling**: Comprehensive error boundaries
- **Accessibility**: Material-UI accessibility features
- **Performance**: Optimized bundle size and loading times

### 🔮 Future Enhancements
1. **Testing**: Add comprehensive test coverage (Jest, React Testing Library)
2. **Documentation**: Interactive component documentation (Storybook)
3. **Internationalization**: Multi-language support
4. **Advanced Analytics**: Enhanced usage tracking and insights
5. **Component Library**: Publish base components as reusable library

This architecture provides a scalable, maintainable foundation for the MontyCloud Pulse application while following React and TypeScript best practices. The application successfully demonstrates enterprise-grade cloud monitoring capabilities with modern web technologies.
