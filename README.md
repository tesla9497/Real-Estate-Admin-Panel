# Real Estate Admin Panel

A modern, responsive web application for managing real estate properties, agents, and business operations. Built with Next.js 15, React 19, and TypeScript, featuring a beautiful UI with Tailwind CSS and comprehensive functionality for real estate professionals.

## 🚀 Features

### 📊 Dashboard

- **Analytics Overview**: Real-time metrics and KPIs
- **Summary Cards**: Total properties, agents, revenue, and growth rate
- **Interactive Charts**: Visual representation of business data
- **Trend Indicators**: Performance tracking with positive/negative trends

### 🏠 Properties Management

- **Property Listing**: Comprehensive property database with search and filtering
- **Advanced Search**: Filter by location and property type
- **Add Properties**: Modal forms for property management
- **Status Tracking**: Monitor available, sold, and pending properties
- **Revenue Analytics**: Track total revenue from property sales

### 👥 Agents Management

- **Agent Database**: Complete agent profiles and information
- **Role-based Filtering**: Filter agents by role and responsibilities
- **Search Functionality**: Find agents by name or email
- **Add New Agents**: Streamlined agent onboarding process

### ⚙️ Settings & Configuration

- **Profile Management**: Update personal information and contact details
- **Notification Preferences**: Customize notification settings
- **Security Settings**: Password updates and security configurations

### 🎨 User Experience

- **Responsive Design**: Mobile-first approach with responsive layouts
- **Modern UI Components**: Beautiful, accessible interface components
- **Intuitive Navigation**: Sidebar navigation with clear hierarchy
- **Form Validation**: Comprehensive form validation with error handling

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **State Management**: React Hooks
- **Forms**: Formik + Yup validation
- **Tables**: TanStack React Table
- **Charts**: Recharts
- **Icons**: Lucide React
- **Theming**: next-themes
- **Utilities**: clsx, class-variance-authority, tailwind-merge

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.17 or later
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd real-estate-admin
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory (if needed for future API integrations):

```bash
# .env.local
NEXT_PUBLIC_API_URL=your_api_url_here
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 5. Build for Production

```bash
npm run build
# or
yarn build
```

### 6. Start Production Server

```bash
npm start
# or
yarn start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard page
│   ├── properties/        # Properties management
│   ├── agents/           # Agents management
│   └── settings/         # User settings
├── components/            # Reusable UI components
│   ├── custom/           # Feature-specific components
│   ├── layout/           # Layout components
│   ├── theme/            # Theme-related components
│   └── ui/               # Base UI components
├── data/                 # Mock data files
├── hooks/                # Custom React hooks
├── providers/            # Context providers
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── validations/          # Form validation schemas
```

## 🎯 Key Components

### Layout Components

- **MainLayout**: Main application layout with sidebar and header
- **Sidebar**: Navigation sidebar with menu items
- **Header**: Top header with theme toggle and user info

### UI Components

- **Button**: Versatile button component with variants
- **Modal**: Reusable modal dialog component
- **Table**: Data table with sorting and filtering
- **Form Components**: Input, select, textarea with validation
- **Cards**: Summary cards for displaying metrics

### Custom Components

- **SummaryCard**: Metric display with icons and trends
- **DashboardCharts**: Interactive charts and graphs
- **PropertiesTable**: Property listing with actions
- **AgentsTable**: Agent management table
- **Forms**: Add/edit forms for properties and agents

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚧 Development Notes

- The application currently uses mock data stored in JSON files
- All forms include proper validation using Yup schemas
- Components are built with accessibility in mind
- The UI follows modern design principles with Tailwind CSS
- TypeScript provides full type safety throughout the application

## 🔮 Future Enhancements

- **API Integration**: Connect to real backend services
- **Authentication**: User login and role-based access control
- **Real-time Updates**: Live data synchronization
- **Advanced Analytics**: More detailed reporting and insights
- **Mobile App**: React Native companion application
- **Multi-tenancy**: Support for multiple real estate agencies

---

**Thank you for reviewing this project!**

Built with ❤️ using Next.js, React, and TypeScript
