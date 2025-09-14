# Component Mapping - MontyCloud Pulse

## Application Component Architecture Map

This document provides a comprehensive mapping of all components in the MontyCloud Pulse application with current implementation status and features.

## 📁 Directory Structure

```
src/
├── components/
│   ├── base/                    # Atomic/Base Components ✅ IMPLEMENTED
│   │   ├── Button/              # Custom button with loading states
│   │   ├── Card/                # Flexible card container
│   │   ├── Chip/                # Status indicators and tags
│   │   ├── Progress/            # Progress bars and indicators
│   │   ├── Chart/               # Highcharts wrapper
│   │   ├── Notistack/           # Notification system
│   │   └── index.ts             # Barrel exports
│   ├── composite/               # Complex/Composite Components ✅ IMPLEMENTED
│   │   ├── MetricCard/          # Metric display with charts
│   │   ├── DashboardGrid/       # Dashboard layout orchestration
│   │   ├── ResourceTable/       # Advanced resource management
│   │   ├── ResponsiveDashboard/ # Responsive dashboard wrapper
│   │   └── index.ts             # Barrel exports
│   ├── common/                  # Shared components ✅ IMPLEMENTED
│   │   ├── Navigation/          # Main navigation
│   │   ├── SidebarLayout/       # Sidebar layout wrapper
│   │   └── ThemeToggle/         # Theme switching
│   ├── layout/                  # Layout Components ✅ IMPLEMENTED
│   │   ├── Layout/              # Main application layout
│   │   └── index.ts             # Barrel exports
│   └── providers/               # Context Providers ✅ IMPLEMENTED
│       └── NotificationProvider.tsx
├── pages/                       # Page Components ✅ IMPLEMENTED
│   ├── Dashboard/               # Dashboard page
│   └── Inventory/               # Resource inventory page
├── store/                       # Zustand State Management ✅ IMPLEMENTED
│   ├── resourceStore.ts         # Resource data management
│   ├── themeStore.ts           # Theme state management
│   └── notificationStore.ts    # Notification state
├── hooks/                       # Custom React Hooks ✅ IMPLEMENTED
│   └── useTheme.ts             # Theme management hook
├── services/                    # Business Logic ✅ IMPLEMENTED
│   └── notificationService.ts  # Notification service
├── data/                        # Mock Data Generators ✅ IMPLEMENTED
│   ├── mockResources.ts        # Resource mock data
│   ├── dataGenerator.ts        # Data generation utilities
│   └── enhancedMockData.ts     # Enhanced mock data
├── types/                       # TypeScript Definitions ✅ IMPLEMENTED
│   ├── resources.ts            # Resource type definitions
│   ├── common.ts               # Common type definitions
│   └── navigation.ts           # Navigation type definitions
└── theme/                       # MUI Theme Configuration ✅ IMPLEMENTED
    ├── lightTheme.ts           # Light theme configuration
    └── darkTheme.ts            # Dark theme configuration
```

## 🧱 Base Components (Atomic Level)

### Button (`src/components/base/Button/`)
**Purpose**: Reusable button component with consistent styling and behavior
- **Props**: `loading`, `size`, `fullWidth`, extends MUI ButtonProps
- **Variants**: small, medium, large
- **Features**: Loading state with spinner, hover animations
- **Used by**: DashboardGrid, ResourceTable, other composite components

### Card (`src/components/base/Card/`)
**Purpose**: Container component for content with consistent styling
- **Props**: `variant`, `size`, `interactive`, `children`
- **Variants**: default, outlined, elevated
- **Sizes**: small, medium, large
- **Features**: Hover effects for interactive cards
- **Used by**: MetricCard, ResourceTable summary cards

### Chip (`src/components/base/Chip/`)
**Purpose**: Status indicators and tags with semantic coloring
- **Props**: `color`, `status`, extends MUI ChipProps
- **Statuses**: running, stopped, warning, error, pending, terminated
- **Features**: Automatic color mapping based on status
- **Used by**: ResourceTable for status display

### Progress (`src/components/base/Progress/`)
**Purpose**: Progress indicators for loading and metrics
- **Types**: Linear, Circular
- **Props**: `type`, `value`, `variant`, `color`, `size`, `showValue`, `label`
- **Features**: Threshold-based coloring, value display
- **Used by**: MetricCard for threshold bars, ResourceTable for metrics

### Chart (`src/components/base/Chart/`)
**Purpose**: Highcharts wrapper for consistent chart rendering
- **Props**: `options`, `height`, `width`, `callback`
- **Features**: Type-safe Highcharts integration, responsive sizing, theme integration
- **Used by**: MetricCard for sparklines, DashboardGrid for trend charts
- **Status**: ✅ IMPLEMENTED with full Highcharts integration

## 🏗️ Composite Components (Complex Level)

### MetricCard (`src/components/composite/MetricCard/`)
**Purpose**: Display key metrics with visualizations and trends
- **Built with**: Card, Progress, Chart base components
- **Props**: `data` (MetricCardData), `size`
- **Features**: 
  - Sparkline charts using Highcharts
  - Threshold progress bars
  - Trend indicators
  - Live data indicators
  - Additional info display
- **Used by**: DashboardGrid
- **Data**: MetricCardData interface from types/resources
- **Status**: ✅ IMPLEMENTED with full Highcharts integration

### DashboardGrid (`src/components/composite/DashboardGrid/`)
**Purpose**: Layout and orchestration of multiple metric cards
- **Built with**: MetricCard, Button base components
- **Features**:
  - Real-time data updates
  - Error handling and loading states  
  - Organized sections (Status, Performance, Types)
  - Responsive grid layout
- **Used by**: Dashboard page
- **Data**: useResourceStore for metrics data
- **Status**: ✅ IMPLEMENTED with real-time updates

### ResourceTable (`src/components/composite/ResourceTable/`)
**Purpose**: Advanced table for resource management and filtering
- **Built with**: Card, Chip, Progress base components
- **Features**:
  - Advanced filtering and search
  - Sortable columns
  - Summary statistics cards
  - Resource status visualization
  - Action buttons
- **Used by**: Inventory page, Navigation component
- **Data**: useResourceStore for resources data
- **Status**: ✅ IMPLEMENTED with advanced filtering

## 🏠 Layout Components

### Layout (`src/components/layout/Layout/`)
**Purpose**: Main application layout wrapper
- **Props**: `children`, `headerContent`
- **Features**:
  - App bar with branding
  - Theme toggle integration
  - Responsive container
- **Used by**: All page components

## 📄 Page Components

### Dashboard (`src/pages/Dashboard/`)
**Structure**:
- `index.tsx` - Clean export interface
- `Dashboard.tsx` - Main page component
- `Dashboard.styles.ts` - Page-specific styles

**Purpose**: Main dashboard view
- **Built with**: Layout, DashboardGrid
- **Features**: Real-time metrics overview

### Inventory (`src/pages/Inventory/`)
**Structure**:
- `index.tsx` - Clean export interface  
- `Inventory.tsx` - Main page component
- `Inventory.styles.ts` - Page-specific styles

**Purpose**: Resource inventory management
- **Built with**: Layout, ResourceTable
- **Features**: Resource filtering and management

## 🔗 Component Relationships

### Dependency Flow
```
Pages
  ├── Dashboard
  │   └── uses Layout + DashboardGrid
  │       └── DashboardGrid uses MetricCard
  │           └── MetricCard uses Card + Progress + Chart
  └── Inventory
      └── uses Layout + ResourceTable
          └── ResourceTable uses Card + Chip + Progress
```

### Data Flow
```
Zustand Stores (resourceStore, themeStore)
    ↓
Page Components (Dashboard, Inventory)
    ↓
Composite Components (DashboardGrid, ResourceTable, MetricCard)
    ↓
Base Components (Card, Button, Chip, Progress, Chart)
    ↓
MUI Components + Custom Styling
```

## 📋 Import Patterns

### Base Components
```typescript
import { Button, Card, Chip } from '@/components/base';
// or
import { Button } from '@/components/base/Button/Button';
```

### Composite Components
```typescript
import { MetricCard, DashboardGrid } from '@/components/composite';
// or
import { MetricCard } from '@/components/composite/MetricCard/MetricCard';
```

### Pages
```typescript
import { Dashboard } from '@/pages/Dashboard';
import { Inventory } from '@/pages/Inventory';
```

## 🎨 Styling Architecture

### Style Files
- Each component has its own `.styles.ts` file
- Styles use MUI's `sx` prop pattern
- Consistent theming across all components

### Theme Integration
- All components respect MUI theme
- Dark/light mode support
- Consistent color palette usage

## 🔄 Common Components (Implemented)

### Common Components (`src/components/common/`)
These components are fully implemented and integrated:

- `Navigation.tsx` - Main navigation component ✅ IMPLEMENTED
- `SidebarLayout.tsx` - Sidebar layout wrapper ✅ IMPLEMENTED
- `ThemeToggle.tsx` - Theme switching component ✅ IMPLEMENTED
- `ApplicationHeader.tsx` - Application header component ✅ IMPLEMENTED
- `DashboardHeader.tsx` - Dashboard-specific header ✅ IMPLEMENTED

**Status**: All common components are fully implemented and integrated with the base component system.

## 📊 Usage Statistics

### Most Reused Base Components
1. **Card** - Used in MetricCard, ResourceTable summaries
2. **Progress** - Used in MetricCard, ResourceTable metrics
3. **Chip** - Used in ResourceTable status display
4. **Button** - Used across multiple composite components

### Component Complexity
- **Base**: 6 components (simple, reusable) ✅ IMPLEMENTED
- **Composite**: 4 components (complex, feature-rich) ✅ IMPLEMENTED
- **Layout**: 1 component (structural) ✅ IMPLEMENTED
- **Pages**: 2 components (orchestration) ✅ IMPLEMENTED
- **Common**: 5 components (shared functionality) ✅ IMPLEMENTED
- **Providers**: 1 component (context management) ✅ IMPLEMENTED

## 🎉 Implementation Status: COMPLETE

### ✅ All Components Implemented
- **Base Components**: 6/6 implemented with full functionality
- **Composite Components**: 4/4 implemented with advanced features
- **Layout Components**: 1/1 implemented with responsive design
- **Page Components**: 2/2 implemented with full routing
- **Common Components**: 5/5 implemented with shared functionality
- **Providers**: 1/1 implemented with context management

### 🚀 Production Ready Features
- **Real-time Updates**: Zustand state management with automatic refresh
- **Data Visualization**: Highcharts integration with responsive charts
- **Notification System**: Notistack integration with real-time alerts
- **Theme Support**: Light/dark mode with smooth transitions
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Performance**: Vite optimization with code splitting and tree shaking

This architecture provides a solid foundation for scalable React development with clear separation of concerns and maximum reusability. All components are production-ready and fully integrated.
