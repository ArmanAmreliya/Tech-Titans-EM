# Tech Titans - Admin Panel

A comprehensive admin panel for managing users, approval rules, and expense oversight in the Tech Titans expense management system.

## Features

### 1. User Management
- **Complete CRUD Operations**: Create, read, update, and delete users
- **Role Management**: Assign users as Employees or Managers
- **Manager-Employee Relationships**: Define reporting hierarchies
- **Search & Filter**: Find users quickly with advanced filtering options
- **Real-time Stats**: View user statistics and distribution

### 2. Approval Rule Configuration
- **Multi-Level Approvals**: Configure sequential approval workflows
- **Conditional Logic**: Set up percentage-based and specific approver rules
- **Flexible Conditions**: Define rules based on amount ranges and expense categories
- **Rule Management**: Create, edit, activate/deactivate approval rules
- **Visual Rule Builder**: Intuitive interface for complex approval logic

### 3. Expense Oversight
- **Global Expense View**: Monitor all company expenses from a central dashboard
- **Advanced Filtering**: Filter by status, date range, employee, and category
- **Admin Override**: Manually approve or reject any expense with reason tracking
- **Approval Flow Tracking**: See the complete approval history for each expense
- **Export Capabilities**: Generate reports for analysis

## Technology Stack

- **Frontend**: React 18 with Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Headless UI for accessible components
- **Icons**: React Icons (Font Awesome)
- **Notifications**: React Hot Toast

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
├── api/                    # API service layer
│   └── adminService.js     # Admin-specific API calls
├── components/             # Reusable components
│   └── features/
│       └── admin/          # Admin-specific components
│           ├── UserTable.jsx
│           ├── UserFormModal.jsx
│           ├── RuleCard.jsx
│           ├── AllExpensesTable.jsx
│           └── RuleBuilder/
│               ├── index.jsx
│               └── SequentialApprovers.jsx
├── pages/                  # Page components
│   └── admin/
│       ├── AdminLayout.jsx
│       ├── UserManagementPage.jsx
│       ├── ApprovalRulesPage.jsx
│       └── AllExpensesPage.jsx
├── store/                  # Redux store
│   ├── store.js
│   └── adminSlice.js
├── App.jsx                 # Main app component
└── main.jsx               # Entry point
```

## Key Components

### UserManagementPage
- Displays all users in a searchable, sortable table
- Provides user creation and editing capabilities
- Shows user statistics and role distribution

### ApprovalRulesPage
- Lists all approval rules with their configurations
- Allows creation of new rules with the rule builder
- Shows rule statistics and active/inactive status

### AllExpensesPage
- Comprehensive view of all company expenses
- Advanced filtering and search capabilities
- Admin override functionality with reason tracking

### RuleBuilder
- Interactive interface for creating approval rules
- Supports sequential, percentage-based, and specific approver rules
- Visual representation of approval flows

## API Integration

The admin panel uses a service layer (`adminService.js`) that can be easily configured to work with your backend API. Currently, it includes mock data for development and testing.

To integrate with your backend:

1. Update the `BASE_URL` in `adminService.js`
2. Replace mock functions with actual API calls
3. Ensure your backend supports the expected data structures

## Authentication & Authorization

The admin panel should be protected with appropriate authentication and authorization mechanisms. Consider implementing:

- Admin-only access controls
- Session management
- Role-based permissions
- Audit logging for admin actions

## Development Guidelines

1. **State Management**: Use Redux Toolkit for complex state management
2. **Forms**: Use React Hook Form with Zod for form validation
3. **Styling**: Follow Tailwind CSS conventions and responsive design
4. **Components**: Keep components focused and reusable
5. **Error Handling**: Implement proper error boundaries and user feedback

## Future Enhancements

- **Advanced Analytics**: Dashboard with charts and metrics
- **Audit Logging**: Track all admin actions for compliance
- **Bulk Operations**: Mass user imports and rule applications
- **Real-time Updates**: WebSocket integration for live updates
- **Advanced Permissions**: Granular admin role permissions

## Contributing

1. Follow the existing code structure and conventions
2. Add proper error handling and loading states
3. Include responsive design considerations
4. Test thoroughly before submitting changes

## License

This project is part of the Tech Titans expense management system.