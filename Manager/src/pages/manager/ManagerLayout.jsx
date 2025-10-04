import { Outlet, Link, useLocation } from "react-router-dom";
import {
  ClipboardCheck,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
} from "lucide-react";
import { useState } from "react";

const ManagerLayout = () => {
  const location = useLocation();
  const [notifications] = useState(3); // Mock notification count

  const navigation = [
    {
      name: "Approval Queue",
      href: "/approval-queue",
      icon: ClipboardCheck,
      current: location.pathname === "/approval-queue",
    },
    {
      name: "Team Expenses",
      href: "/team-expenses",
      icon: Users,
      current: location.pathname === "/team-expenses",
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3,
      current: location.pathname === "/analytics",
      disabled: true,
    },
  ];

  const handleLogout = () => {
    // Handle logout logic
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-primary-800 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-primary-600 font-bold text-lg">TT</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Tech Titans EM</p>
                <p className="text-xs text-primary-200">Manager Dashboard</p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      ${
                        item.current
                          ? "bg-primary-900 text-white"
                          : "text-primary-200 hover:bg-primary-700 hover:text-white"
                      }
                      ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}
                      group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200
                    `}
                    onClick={
                      item.disabled ? (e) => e.preventDefault() : undefined
                    }
                  >
                    <Icon
                      className="mr-3 flex-shrink-0 h-6 w-6"
                      aria-hidden="true"
                    />
                    {item.name}
                    {item.name === "Approval Queue" && notifications > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User section */}
          <div className="flex-shrink-0 flex border-t border-primary-700 p-4">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Manager"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">John Manager</p>
                <p className="text-xs text-primary-200">Manager</p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-auto flex-shrink-0 p-1 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-800 focus:ring-white"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top navigation */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <Search className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search-field"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent"
                    placeholder="Search expenses, employees..."
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <span className="sr-only">View notifications</span>
                <div className="relative">
                  <Bell className="h-6 w-6" aria-hidden="true" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </div>
              </button>

              <button className="ml-3 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <span className="sr-only">Settings</span>
                <Settings className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ManagerLayout;
