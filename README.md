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
│   │   ├── Chip/       # Status indicators and tags
│   │   ├── Progress/   # Progress bars and indicators
│   │   ├── Chart/      # Highcharts wrapper
│   │   └── Notistack/  # Notification system
│   ├── composite/      # Complex components using base components
│   │   ├── MetricCard/ # Metric display with charts
│   │   ├── DashboardGrid/ # Dashboard layout orchestration
│   │   ├── ResourceTable/ # Advanced resource management
│   │   └── ResponsiveDashboard/ # Responsive dashboard wrapper
│   ├── common/         # Shared components
│   │   ├── Navigation/ # Main navigation
│   │   ├── SidebarLayout/ # Sidebar layout wrapper
│   │   └── ThemeToggle/ # Theme switching
│   ├── layout/         # Layout components
│   └── providers/      # Context providers
├── pages/              # Main page components
│   ├── Dashboard/      # Dashboard page
│   └── Inventory/      # Resource inventory page
├── hooks/              # Custom React hooks
├── store/              # Zustand state management
│   ├── resourceStore.ts # Resource data management
│   ├── themeStore.ts   # Theme state management
│   └── notificationStore.ts # Notification state
├── types/              # TypeScript type definitions
├── data/               # Mock data and generators
├── services/           # Business logic services
└── theme/              # MUI theme configuration
```

## 🎯 Key Components

### Base Components (Atomic Level)
- **Button**: Custom button with loading states and variants
- **Card**: Flexible container with hover effects and size options
- **Chip**: Status indicators with semantic coloring
- **Progress**: Linear and circular progress indicators
- **Chart**: Highcharts wrapper for consistent data visualization
- **Notistack**: Enhanced notification system

### Composite Components
- **MetricCard**: Displays key metrics with sparkline charts and trends
- **DashboardGrid**: Orchestrates multiple metric cards with real-time updates
- **ResourceTable**: Advanced table with filtering, sorting, and resource management
- **ResponsiveDashboard**: Responsive wrapper for mobile-optimized layouts

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
