import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store/store';
import AdminLayout from './pages/admin/AdminLayout';
import UserManagementPage from './pages/admin/UserManagementPage';
import ApprovalRulesPage from './pages/admin/ApprovalRulesPage';
import AllExpensesPage from './pages/admin/AllExpensesPage';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          
          <Routes>
            <Route path="/" element={<AdminLayout />}>
              <Route index element={<Navigate to="/users" replace />} />
              <Route path="users" element={<UserManagementPage />} />
              <Route path="approval-rules" element={<ApprovalRulesPage />} />
              <Route path="expenses" element={<AllExpensesPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/users" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;