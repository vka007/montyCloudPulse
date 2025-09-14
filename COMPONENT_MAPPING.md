# Component Mapping - MontyCloud Pulse

## Application Component Architecture Map

This document provides a comprehensive mapping of all components in the MontyCloud Pulse application after the refactoring.

## 📁 Directory Structure

```
src/
├── components/
│   ├── base/                    # Atomic/Base Components
│   ├── composite/               # Complex/Composite Components  
│   ├── layout/                  # Layout Components
│   └── common/                  # Legacy common components (to be refactored)
└── pages/                       # Page Components
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
- **Features**: Type-safe Highcharts integration, responsive sizing
- **Used by**: MetricCard for sparklines

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

## 🔄 Legacy Components (To Be Refactored)

### Common Components (`src/components/common/`)
These components are still using the old structure and should be refactored:

- `Navigation.tsx` - Main navigation component
- `SidebarLayout.tsx` - Sidebar layout wrapper
- `ProfessionalHeader.tsx` - Header component
- `DashboardHeader.tsx` - Dashboard-specific header
- `ThemeToggle.tsx` - Theme switching component

**Next Steps**: These should be moved to appropriate folders (layout or composite) and refactored to use base components.

## 📊 Usage Statistics

### Most Reused Base Components
1. **Card** - Used in MetricCard, ResourceTable summaries
2. **Progress** - Used in MetricCard, ResourceTable metrics
3. **Chip** - Used in ResourceTable status display
4. **Button** - Used across multiple composite components

### Component Complexity
- **Base**: 5 components (simple, reusable)
- **Composite**: 3 components (complex, feature-rich)
- **Layout**: 1 component (structural)
- **Pages**: 2 components (orchestration)

This architecture provides a solid foundation for scalable React development with clear separation of concerns and maximum reusability.
