import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import ExpenseService from "../api/expenseService";
import { useTheme } from "../contexts/ThemeContext";
import {
  FaTachometerAlt,
  FaReceipt,
  FaSun,
  FaMoon,
  FaCheckCircle,
  FaClock,
  FaChartLine,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaEdit,
  FaPlus,
} from "react-icons/fa";
import { formatCurrency } from "../utils/currency";
import { formatDate } from "../utils/formatDate";
import useAuth from "../hooks/useAuth";

// --- Sub-components ---

const Sidebar = ({ navigation, logout, sidebarOpen, setSidebarOpen, user }) => (
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
              <span className="text-white font-bold text-sm">TT</span>
            </div>
            <span className="text-lg font-semibold dark:text-white">
              Tech Titans EM
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaTimes />
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
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium dark:text-white truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.role
                  ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                  : "Employee"}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="nav-link w-full nav-link-inactive"
          >
            <FaSignOutAlt />
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
          <FaBars />
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
          {theme === "dark" ? <FaSun /> : <FaMoon />}
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
            <FaChartLine className="w-4 h-4 text-green-500 mr-1" />
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
                    <FaEdit />
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
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalExpenses: 484.5,
    approvedExpenses: 245.5,
    pendingExpenses: 89.0,
  });
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      date: "2025-01-15",
      category: "Travel",
      description: "Flight to NYC",
      amount: 245.5,
      status: "approved",
    },
    {
      id: 2,
      date: "2025-01-14",
      category: "Meals",
      description: "Team lunch",
      amount: 89.0,
      status: "pending",
    },
    {
      id: 3,
      date: "2025-01-10",
      category: "Software",
      description: "Figma subscription",
      amount: 150.0,
      status: "rejected",
    },
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { theme, toggleTheme } = useTheme();
  // Temporary auth commented out
  // const { logout } = useAuth();

  const filteredExpenses = expenses.filter(
    (expense) =>
      (selectedCategory === "all" ||
        expense.category.toLowerCase() === selectedCategory) &&
      expense.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigation = [
    { name: "Dashboard", href: "/", icon: FaTachometerAlt, current: true },
    {
      name: "My Expenses",
      href: "/expenses",
      icon: FaReceipt,
      current: false,
    },
    {
      name: "Submit Expense",
      href: "/expenses/new",
      icon: FaPlus,
      current: false,
    },
  ];
  const categories = ["all", "travel", "meals", "software", "office"];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        navigation={navigation}
        logout={logout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={user}
      />
      <div className="lg:ml-64">
        <Header
          setSidebarOpen={setSidebarOpen}
          toggleTheme={toggleTheme}
          theme={theme}
        />
        <main className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Total Expenses"
              value={stats.totalExpenses}
              icon={FaTachometerAlt}
              trend="12%"
            />
            <StatCard
              title="Approved"
              value={stats.approvedExpenses}
              icon={FaCheckCircle}
            />
            <StatCard
              title="Pending"
              value={stats.pendingExpenses}
              icon={FaClock}
            />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field sm:max-w-xs"
              />
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`category-filter ${
                      selectedCategory === cat
                        ? "category-filter-active"
                        : "category-filter-inactive"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <ExpensesTable expenses={filteredExpenses} />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
