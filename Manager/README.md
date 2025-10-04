# Manager Dashboard - Tech Titans EM

A comprehensive manager interface for expense approval and team oversight in the Tech Titans Expense Management system.

## 🚀 Features

### 1. Approval Queue Dashboard
- **Pending Approvals Table**: View all expenses awaiting approval with employee details, amounts, and categories
- **Currency Conversion**: Automatic conversion to company default currency (USD)
- **Quick Actions**: Approve or reject expenses with a single click
- **Detailed Review**: Modal view for comprehensive expense details before making decisions
- **Rejection Comments**: Required comment system for expense rejections

### 2. Team Expense History
- **Complete Oversight**: View all team expenses (pending, approved, rejected)
- **Advanced Filtering**: Filter by employee, status, category, date range
- **Export Functionality**: Download expense data as CSV
- **Search Capabilities**: Search across employee names, descriptions, and categories
- **Summary Statistics**: Key metrics and team insights

### 3. Modern UI/UX
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Updates**: Live data updates using Zustand state management
- **Intuitive Navigation**: Clean sidebar navigation with notification badges
- **Visual Feedback**: Toast notifications for all user actions

## 📦 Technology Stack

### Core Dependencies
- **React 18**: Modern React with hooks and functional components
- **React Router DOM**: Client-side routing
- **Vite**: Fast development and build tool
- **Tailwind CSS**: Utility-first CSS framework

### UI Components
- **Lucide React**: Beautiful SVG icons
- **Headless UI**: Accessible component primitives
- **React Hot Toast**: Elegant toast notifications

### State Management
- **Zustand**: Lightweight state management
- **React Hook Form**: Performant form handling
- **Zod**: Schema validation for forms

## 🏗️ Project Structure

```
src/
├── api/
│   └── managerService.js      # API calls and mock data
├── components/
│   └── features/
│       └── manager/
│           ├── ApprovalQueueTable.jsx    # Main approval table
│           ├── ExpenseDetailModal.jsx    # Detailed expense view/actions
│           └── TeamExpensesView.jsx      # Team expense history
├── pages/
│   └── manager/
│       ├── ManagerLayout.jsx             # Main layout with sidebar
│       ├── ApprovalQueuePage.jsx         # Approval dashboard
│       └── TeamExpensesPage.jsx          # Team expenses page
├── store/
│   └── managerSlice.js                   # Zustand store
├── App.jsx                               # Main router setup
├── main.jsx                              # React entry point
└── index.css                             # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Open http://localhost:3002
   - Manager dashboard will be available

### Environment Setup
Make sure the backend server is running on `http://localhost:5000` for API connectivity.

## 🎯 Key Features Breakdown

### Approval Queue Management
- **Real-time Updates**: Automatically refreshes pending approvals
- **Currency Handling**: Displays converted amounts alongside original currency
- **Batch Actions**: Support for bulk approve/reject operations
- **Detailed Reviews**: Comprehensive expense information before approval

### Team Oversight
- **Comprehensive Filtering**: Multi-dimensional filtering system
- **Export Capabilities**: CSV export for reporting and analysis
- **Visual Analytics**: Summary cards with key metrics
- **Historical Tracking**: Complete audit trail of all team expenses

### User Experience
- **Responsive Layout**: Works seamlessly on all device sizes
- **Keyboard Navigation**: Full keyboard accessibility
- **Loading States**: Clear feedback during data operations
- **Error Handling**: Graceful error recovery with user-friendly messages

## 🔧 Configuration

### API Integration
The manager service (`managerService.js`) includes:
- Mock data for development
- Automatic fallback when backend is unavailable
- Currency conversion utilities
- RESTful API integration

### State Management
Zustand store manages:
- Pending approvals list
- Team expenses history
- Filter states
- Loading and error states
- Summary statistics

## 📱 Responsive Design

- **Desktop**: Full sidebar navigation with comprehensive tables
- **Tablet**: Collapsible sidebar with optimized layouts
- **Mobile**: Bottom navigation with swipeable interfaces

## 🔐 Security Features

- **JWT Token Authentication**: Secure API communication
- **Role-based Access**: Manager-specific functionality
- **Data Validation**: Client and server-side validation
- **Audit Trail**: Complete logging of approval actions

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🤝 Integration

### Backend API Endpoints
- `GET /api/manager/pending-approvals` - Fetch pending approvals
- `GET /api/manager/team-expenses` - Fetch team expense history
- `POST /api/manager/approve/:id` - Approve expense
- `POST /api/manager/reject/:id` - Reject expense with reason
- `GET /api/manager/team-members` - Fetch team member list

### Mock Data
Comprehensive mock data is included for development and testing:
- Sample pending approvals with various categories
- Team expense history with different statuses
- Currency conversion examples
- Team member data

## 📊 Analytics & Reporting

- **Summary Statistics**: Real-time calculation of key metrics
- **Spending Insights**: Trend analysis and pattern recognition
- **Export Functions**: CSV download for external analysis
- **Visual Dashboards**: Charts and graphs for data visualization

## 🛠️ Development

### Code Quality
- **ESLint**: Configured for React best practices
- **Prettier**: Automatic code formatting
- **TypeScript Ready**: Easy migration path to TypeScript

### Performance
- **Lazy Loading**: Components loaded on demand
- **Optimized Builds**: Vite for fast development and production builds
- **State Optimization**: Efficient state updates with Zustand

This manager dashboard provides a complete solution for expense approval workflows with a focus on usability, performance, and comprehensive team oversight capabilities.