# MontyCloud Pulse Dashboard

A modern, responsive React-based dashboard for monitoring cloud resources with real-time notifications and interactive data visualizations.

## 🚀 Features

- **Responsive Dashboard**: Clean, modern interface that works across all devices
- **Real-time Monitoring**: Live updates for cloud resource status and metrics
- **Interactive Visualizations**: Dynamic charts for CPU, memory, and resource usage
- **Smart Notifications**: Real-time alert system with dismissible notifications
- **Advanced Filtering**: Search and filter resources by status, region, account, and more
- **Dual Theme Support**: Toggle between light and dark modes
- **Professional UI**: Built with Material-UI for enterprise-grade aesthetics

## 🛠 Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Material-UI (MUI)** for consistent, accessible UI components
- **MUI X Charts** for data visualization
- **Zustand** for lightweight state management
- **Notistack** for enhanced notifications
- **ESLint + Prettier** for code quality

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
├── components/          # Reusable UI components
├── pages/              # Main page components
├── hooks/              # Custom React hooks
├── store/              # Zustand state management
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── theme/              # MUI theme configuration
└── data/               # Mock data and generators
```

## 🎯 Key Components

- **Dashboard**: Main overview with key metrics
- **ResourceList**: Filterable list of cloud resources
- **Charts**: Interactive data visualizations
- **NotificationCenter**: Real-time alert management
- **ThemeToggle**: Light/dark mode switcher

## 📈 Performance

- Optimized bundle size with tree shaking
- Lazy loading for route-based code splitting
- Efficient re-renders with proper React patterns
- Responsive images and assets


## 📄 License

MIT License - see LICENSE file for details.
