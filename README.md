# MontyCloud Pulse Dashboard

A modern, responsive React-based dashboard for monitoring cloud resources with real-time notifications and interactive data visualizations. Built with TypeScript, Material-UI, and Highcharts for enterprise-grade cloud monitoring.

## 🚀 Features

- **📊 Real-time Dashboard**: Live monitoring of cloud resources with dynamic metrics
- **📈 Interactive Visualizations**: Highcharts-powered charts for CPU, memory, and resource trends
- **🔔 Smart Notifications**: Real-time alert system with Notistack integration
- **🔍 Advanced Filtering**: Search and filter resources by type, status, region, and account
- **🌓 Dual Theme Support**: Seamless light/dark mode toggle with Material-UI theming
- **📱 Responsive Design**: Mobile-first approach that works across all devices
- **⚡ Performance Optimized**: Fast loading with Vite build system and code splitting
- **🎨 Professional UI**: Enterprise-grade interface with consistent Material Design

## 🛠 Tech Stack

- **React 18** with TypeScript for type-safe development
- **Vite** for lightning-fast development and optimized production builds
- **Material-UI (MUI)** for consistent, accessible UI components and theming
- **Highcharts** for interactive data visualizations and charts
- **Zustand** for lightweight, efficient state management
- **Notistack** for enhanced notification system
- **React Router** for client-side routing and navigation
- **ESLint + Prettier** for code quality and formatting

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd montyCloudPulse

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Design Philosophy

This dashboard follows Material Design principles with:
- **Clean, minimalist interface** focusing on data clarity
- **Consistent spacing and typography** for professional appearance
- **Accessible color schemes** supporting both light and dark themes
- **Responsive grid layouts** adapting to any screen size
- **Intuitive navigation** with clear visual hierarchy

## 📊 Mock Data

The application uses simulated cloud resource data including:
- EC2 instances, RDS databases, Lambda functions, S3 buckets
- Real-time metrics (CPU, memory, disk usage)
- Status indicators (running, stopped, warning, error)
- Regional and account-based organization
- Simulated alert notifications

## 🔧 Development

```bash
# Run with type checking
npm run type-check

# Lint code
npm run lint

# Format code
npm run format

# Run tests (when implemented)
npm run test
```

## 🚀 Deployment

This application is optimized for deployment on:
- **Vercel**
- **Netlify**

## 📁 Project Structure

```
src/
├── components/
│   ├── base/           # Atomic, reusable UI components
│   │   ├── Button/     # Custom button with loading states
│   │   ├── Card/       # Flexible card container
│   │   ├── Chart/      # Highcharts wrapper
│   │   ├── Charts/     # Chart components collection
│   │   ├── Chip/       # Status indicators and tags
│   │   ├── EChart/     # ECharts wrapper
│   │   ├── Notistack/  # Notification system
│   │   └── Progress/   # Progress bars and indicators
│   └── common/         # Shared layout components
│       ├── ApplicationHeader/ # Top navigation with notifications
│       ├── DashboardHeader/   # Page-specific headers
│       └── SidebarLayout/     # Sidebar layout wrapper
├── pages/              # Main page components
│   ├── Dashboard/      # Dashboard page
│   │   └── components/ # Dashboard-specific components
│   │       ├── DashboardGrid/ # Dashboard layout orchestration
│   │       ├── DynamicMetrics/ # Dynamic metrics display
│   │       ├── MetricCard/    # Metric display with charts
│   │       └── ResponsiveDashboard/ # Responsive dashboard wrapper
│   └── Inventory/      # Resource inventory page
│       └── components/ # Inventory-specific components
│           ├── ResourceSelector/ # Multi-select dropdown
│           └── ResourceTable/   # Advanced resource management
├── layout/             # Application layout system
├── navigation/         # Navigation system
├── notification/       # Notification system
├── theme/              # Theme system with ThemeToggle
├── hooks/              # Custom React hooks
├── store/              # Zustand state management
│   ├── resourceStore.ts # Resource data management
│   ├── enhancedResourceStore.ts # Enhanced resource data
│   ├── themeStore.ts   # Theme state management
│   └── notificationStore.ts # Notification state
├── dataFactory/        # Mock data and generators
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🎯 Key Components

### Base Components (Atomic Level)
- **Button**: Custom button with loading states and variants
- **Card**: Flexible container with hover effects and size options
- **Chart**: Highcharts wrapper for consistent data visualization
- **Charts**: Collection of specialized chart components (CPU, Memory, Network, etc.)
- **Chip**: Status indicators with semantic coloring
- **EChart**: ECharts wrapper for advanced visualizations
- **Progress**: Linear and circular progress indicators
- **Notistack**: Enhanced notification system

### Page-Specific Components
#### Dashboard Components
- **MetricCard**: Displays key metrics with sparkline charts and trends
- **DashboardGrid**: Orchestrates multiple metric cards with real-time updates
- **ResponsiveDashboard**: Responsive wrapper for mobile-optimized layouts
- **DynamicMetrics**: Dynamic metrics display with real-time updates

#### Inventory Components
- **ResourceTable**: Advanced table with filtering, sorting, and resource management
- **ResourceSelector**: Multi-select dropdown with search and filtering

### Common Components (Shared Layout)
- **ApplicationHeader**: Top navigation with notifications and user menu
- **DashboardHeader**: Page-specific headers with breadcrumbs and actions
- **SidebarLayout**: Sidebar navigation with tabs and layout structure

### System Components
- **Layout**: Main application layout wrapper
- **Navigation**: Primary navigation component with routing logic
- **ThemeToggle**: Theme switching functionality
- **NotificationProvider**: Context provider for notifications

### Page Components
- **Dashboard**: Main overview with real-time metrics and performance indicators
- **Inventory**: Comprehensive resource management with advanced filtering

## 📈 Performance & Features

### Performance Optimizations
- **Bundle Optimization**: Tree shaking and code splitting for minimal bundle size
- **Lazy Loading**: Route-based code splitting for faster initial loads
- **Efficient Rendering**: Optimized React patterns with proper memoization
- **Real-time Updates**: Efficient state management with Zustand

### Current Features
- ✅ **Real-time Dashboard**: Live metrics with automatic updates
- ✅ **Interactive Charts**: Highcharts integration with responsive design
- ✅ **Notification System**: Real-time alerts with Notistack
- ✅ **Theme Support**: Light/dark mode with Material-UI theming
- ✅ **Responsive Design**: Mobile-first approach with breakpoint optimization
- ✅ **Resource Management**: Advanced filtering and search capabilities
- ✅ **TypeScript**: Full type safety throughout the application


## 📄 License

MIT License - see LICENSE file for details.
