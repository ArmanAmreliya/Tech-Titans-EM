import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import ExpenseService from "../api/expenseService";
import { useTheme } from "../contexts/ThemeContext";
import * as Icons from "../components/icons/Icons.jsx";
// import { formatCurrency } from "../utils/currency";
// import { formatDate } from "../utils/formatDate";
// import useAuth from "../hooks/useAuth";
// import React, { useState } from "react";
import { FaMoon, FaSun, FaSignOutAlt, FaPlus, FaChevronDown, FaChevronUp, FaPaperclip } from "react-icons/fa";

// Dummy utility functions for standalone component
const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
// Temporary auth function commented out for now
// const useAuth = () => ({ logout: () => console.log("Logged out") });

// --- Sub-components ---

const Sidebar = ({ navigation, logout, sidebarOpen, setSidebarOpen }) => (
  <>
    {sidebarOpen && (
      <div
        className="fixed inset-0 mobile-overlay z-40 lg:hidden"
        onClick={() => setSidebarOpen(false)}
      />
    )}
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 sidebar-transition z-50 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">FT</span>
            </div>
            <span className="text-lg font-semibold dark:text-white">
              FinTrack
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Icons.XIcon />
          </button>
        </div>
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Navigation
            </p>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${
                  item.current ? "nav-link-active" : "nav-link-inactive"
                }`}
              >
                <item.icon />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>
        <div className="border-t dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                D
              </span>
            </div>
            <div>
              <p className="text-sm font-medium dark:text-white truncate">
                Demo User
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Employee
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              console.log("Logout clicked - auth temporarily disabled")
            }
            className="nav-link w-full nav-link-inactive"
            // Temporary placeholder - replace with actual logout when auth is implemented
          >
            <Icons.LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </>
);

const Header = ({ setSidebarOpen, toggleTheme, theme }) => (
  <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-4 py-4 sticky top-0 z-30">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-md text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Icons.MenuIcon />
        </button>
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track and manage your expenses
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Icons.SunIcon /> : <Icons.MoonIcon />}
        </button>
        <Link to="/expenses/new" className="btn-primary">
          + Submit Expense
        </Link>
      </div>
    </div>
  </header>
);

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border dark:border-gray-700 card-hover">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <p className="text-2xl font-bold dark:text-white">
          {formatCurrency(value)}
        </p>
        {trend && (
          <div className="flex items-center mt-2">
            <Icons.TrendUpIcon className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-500 font-medium">{trend}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              vs last month
            </span>
          </div>
        )}
      </div>
      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
        <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      </div>
    </div>
  </div>
);

const ExpensesTable = ({ expenses }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden">
    <div className="p-6 border-b dark:border-gray-700">
      <h2 className="text-lg font-semibold dark:text-white">Recent Expenses</h2>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-700/50">
          <tr>
            <th className="table-header">Date</th>
            <th className="table-header">Category</th>
            <th className="table-header">Description</th>
            <th className="table-header">Amount</th>
            <th className="table-header">Status</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y dark:divide-gray-700">
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-8 text-gray-500">
                No expenses found.
              </td>
            </tr>
          ) : (
            expenses.map((expense) => (
              <tr key={expense.id} className="table-row">
                <td className="table-cell font-medium">
                  {formatDate(expense.date)}
                </td>
                <td className="table-cell">
                  <span className="category-badge">{expense.category}</span>
                </td>
                <td
                  className="table-cell max-w-xs truncate"
                  title={expense.description}
                >
                  {expense.description}
                </td>
                <td className="table-cell font-semibold">
                  {formatCurrency(expense.amount)}
                </td>
                <td className="table-cell">
                  <span
                    className={`status-badge ${"status-" + expense.status}`}
                  >
                    {expense.status}
                  </span>
                </td>
                <td className="table-cell">
                  <button className="icon-button" title="Edit">
                    <Icons.EditIcon />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

// --- Main Page Component ---
const HomePage = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const expenses = [
    {
      date: "2025-01-15",
      category: "Travel",
      description: "Flight to NYC for client meeting",
      amount: "245.50",
      status: "Approved",
      merchant: "Delta Airlines",
      transactionId: "exp-1",
    },
    {
      date: "2025-01-14",
      category: "Meals",
      description: "Team lunch during conference",
      amount: "89.00",
      status: "Pending",
      merchant: "McDonald's",
      transactionId: "exp-2",
    },
    {
      date: "2025-01-10",
      category: "Software",
      description: "Annual Figma subscription",
      amount: "150.00",
      status: "Rejected",
      merchant: "Figma",
      transactionId: "exp-3",
    },
  ];

  return (
    <div className={darkMode ? "bg-gray-950 text-white min-h-screen" : "bg-gray-100 text-gray-900 min-h-screen"}>
      {/* Sidebar */}
      <div className="flex">
        <aside className={`w-64 h-screen p-5 pt-10 ${darkMode ? "bg-gray-900" : "bg-white shadow"} border-r border-gray-700 border-opacity-20 relative`}>
          <div className="flex items-center gap-2 pb-6 border-b border-gray-700 border-opacity-20 relative">
            <div className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">FT</span>
            </div>
            <h2 className="font-bold text-lg">
              <span className="text-indigo-500">Fin</span>Track
            </h2>
          </div>
          <nav>
            <div data-replit-metadata="client/src/components/AppSidebar.tsx:80:8" data-component-name="SidebarGroup" data-slot="sidebar-group" data-sidebar="group" class="relative flex w-full min-w-0 flex-col p-2 pb-100 border-b border-gray-700 border-opacity-20"><div data-replit-metadata="client/src/components/AppSidebar.tsx:81:10" data-component-name="SidebarGroupLabel" data-slot="sidebar-group-label" data-sidebar="group-label" class="text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&amp;&gt;svg]:h-4 [&amp;&gt;svg]:w-4 [&amp;&gt;svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0">Navigation</div><div data-replit-metadata="client/src/components/AppSidebar.tsx:82:10" data-component-name="SidebarGroupContent" data-slot="sidebar-group-content" data-sidebar="group-content" class="w-full text-sm"><ul data-replit-metadata="client/src/components/AppSidebar.tsx:83:12" data-component-name="SidebarMenu" data-slot="sidebar-menu" data-sidebar="menu" class="flex w-full min-w-0 flex-col gap-1"><li data-replit-metadata="client/src/components/AppSidebar.tsx:85:14" data-component-name="SidebarMenuItem" data-slot="sidebar-menu-item" data-sidebar="menu-item" class="group/menu-item relative"><a data-replit-metadata="client/src/components/AppSidebar.tsx:91:20" data-component-name="a" href="/dashboard" data-slot="sidebar-menu-button" data-sidebar="menu-button" data-size="default" data-active="false" class="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:w-8! group-data-[collapsible=icon]:h-8! group-data-[collapsible=icon]:p-2! [&amp;&gt;span:last-child]:truncate [&amp;&gt;svg]:size-4 [&amp;&gt;svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm" data-testid="nav-dashboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house w-4 h-4" data-replit-metadata="client/src/components/AppSidebar.tsx:92:22" data-component-name="item.icon"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg><span data-replit-metadata="client/src/components/AppSidebar.tsx:93:22" data-component-name="span">Dashboard</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right ml-auto w-4 h-4 opacity-50" data-replit-metadata="client/src/components/AppSidebar.tsx:94:22" data-component-name="ChevronRight"><path d="m9 18 6-6-6-6"></path></svg></a></li><li data-replit-metadata="client/src/components/AppSidebar.tsx:85:14" data-component-name="SidebarMenuItem" data-slot="sidebar-menu-item" data-sidebar="menu-item" class="group/menu-item relative"><a data-replit-metadata="client/src/components/AppSidebar.tsx:91:20" data-component-name="a" href="/expenses" data-slot="sidebar-menu-button" data-sidebar="menu-button" data-size="default" data-active="false" class="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:w-8! group-data-[collapsible=icon]:h-8! group-data-[collapsible=icon]:p-2! [&amp;&gt;span:last-child]:truncate [&amp;&gt;svg]:size-4 [&amp;&gt;svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm" data-testid="nav-my-expenses"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text w-4 h-4" data-replit-metadata="client/src/components/AppSidebar.tsx:92:22" data-component-name="item.icon"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg><span data-replit-metadata="client/src/components/AppSidebar.tsx:93:22" data-component-name="span">My Expenses</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right ml-auto w-4 h-4 opacity-50" data-replit-metadata="client/src/components/AppSidebar.tsx:94:22" data-component-name="ChevronRight"><path d="m9 18 6-6-6-6"></path></svg></a></li></ul></div></div>
          </nav>

          {/* Bottom User Section */}
          <div className="absolute bottom-5 left-5">
            <p className="font-medium">Demo User</p>
            <p className="text-sm text-gray-400">Employee</p>
            <button className="flex items-center gap-2 mt-2 text-red-400 hover:text-red-600">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Header with Theme Toggle */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold">Home</h2>
            <div className="flex gap-4 items-center">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white flex items-center gap-2">
                <FaPlus /> Submit Expense
              </button>
            </div>
          </div>

          <p className="text-gray-400 mb-6">Track and manage your expenses</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className={`${darkMode ? "bg-gray-900" : "bg-white shadow"} p-6 rounded-xl border border-gray-700 border-opacity-20`}>
              <h3 className="text-gray-400">Total Expenses</h3>
              <p className="text-3xl font-bold">$484.50</p>
              <span className="text-green-400 text-sm">↑ 12%</span>
            </div>
            <div className={`${darkMode ? "bg-gray-900" : "bg-white shadow"} p-6 rounded-xl border border-gray-700 border-opacity-20`}>
              <h3 className="text-gray-400">Approved</h3>
              <p className="text-3xl font-bold">$245.50</p>
            </div>
            <div className={`${darkMode ? "bg-gray-900" : "bg-white shadow"} p-6 rounded-xl border border-gray-700 border-opacity-20`}>
              <h3 className="text-gray-400">Pending</h3>
              <p className="text-3xl font-bold">$89.00</p>
            </div>
          </div>

          {/* Recent Expenses */}
          {/* <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text w-5 h-5" data-replit-metadata="client/src/pages/EmployeeDashboard.tsx:94:12" data-component-name="FileText"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
            Recent Expenses
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm border-collapse">
              <thead>
                <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                  <th className="p-3">Date</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp, index) => (
                  <tr
                    key={index}
                    className={`${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
                  >
                    <td className="p-3">{exp.date}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 rounded bg-gray-600 text-white text-xs">
                        {exp.category}
                      </span>
                    </td>
                    <td className="p-3">{exp.description}</td>
                    <td className="p-3">USD {exp.amount}</td>
                    <td className="p-3">
                      {exp.status === "Approved" && (
                        <span className="text-green-400 font-medium">● {exp.status}</span>
                      )}
                      {exp.status === "Pending" && (
                        <span className="text-yellow-400 font-medium">● {exp.status}</span>
                      )}
                      {exp.status === "Rejected" && (
                        <span className="text-red-400 font-medium">● {exp.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
          <div className="overflow-x-auto">
      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className="bg-gray-800 text-gray-300">
            <th className="p-3"></th>
            <th className="p-3">Date</th>
            <th className="p-3">Category</th>
            <th className="p-3">Description</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp, index) => (
            <React.Fragment key={index}>
              {/* Main Row */}
              <tr
                className="cursor-pointer hover:bg-gray-700 transition"
                onClick={() => toggleRow(index)}
              >
                <td className="p-3 w-10">
                  {expandedRow === index ? (
                    <FaChevronUp className="text-gray-400" />
                  ) : (
                    <FaChevronDown className="text-gray-400" />
                  )}
                </td>
                <td className="p-3">{exp.date}</td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded bg-gray-600 text-white text-xs">
                    {exp.category}
                  </span>
                </td>
                <td className="p-3">{exp.description}</td>
                <td className="p-3 font-medium">USD {exp.amount}</td>
                <td className="p-3">
                  {exp.status === "Approved" && (
                    <span className="bg-green-900 text-green-400 px-1 py-1 w-1xl rounded text-xs flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                      Approved
                    </span>
                  )}
                  {exp.status === "Pending" && (
                    <span className="bg-yellow-900 text-yellow-400 px-2 py-1 rounded text-xs">
                      Pending
                    </span>
                  )}
                  {exp.status === "Rejected" && (
                    <span className="bg-red-900 text-red-400 px-2 py-1 rounded text-xs">
                      Rejected
                    </span>
                  )}
                </td>
                <td className="p-3">
                  <FaPaperclip className="text-gray-400 hover:text-indigo-400 cursor-pointer" />
                </td>
              </tr>

              {/* Expanded Row */}
              {expandedRow === index && (
                <tr className="bg-gray-900 text-gray-300">
                  <td></td>
                  <td colSpan="6" className="p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <p>
                        Merchant:{" "}
                        <span className="font-semibold">{exp.merchant}</span>
                      </p>
                      <p>
                        Transaction ID:{" "}
                        <span className="font-mono">{exp.transactionId}</span>
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
