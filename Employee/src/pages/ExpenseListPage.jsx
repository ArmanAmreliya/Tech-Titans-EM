import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import * as Icons from "../components/icons/Icons.jsx";
import ExpenseList from "../components/features/expense/ExpenseList";
import ExpenseService from "../api/expenseService";

// Dummy utility functions
const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

const ExpenseListPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Load expenses from backend
  useEffect(() => {
    const loadExpenses = async () => {
      console.log("[ExpenseListPage] Loading expenses from backend...");
      try {
        setLoading(true);
        setError("");
        
        const response = await ExpenseService.getMyExpenses();
        console.log("[ExpenseListPage] Expenses loaded successfully:", response);
        
        setExpenses(response.expenses || response || []);
      } catch (error) {
        console.error("[ExpenseListPage] Error loading expenses:", error);
        setError(error.message || "Failed to load expenses");
        
        // Fallback to sample data for development
        console.log("[ExpenseListPage] Using fallback sample data");
        setExpenses([
          {
            id: 1,
            title: "Flight to NYC",
            date: "2025-01-15",
            category: "Travel",
            description: "Business trip flight booking",
            amount: 545.50,
            status: "approved",
          },
          {
            id: 2,
            title: "Team Lunch Meeting", 
            date: "2025-01-14",
            category: "Meals",
            description: "Client meeting lunch at downtown restaurant",
            amount: 89.00,
            status: "pending",
          },
          {
            id: 3,
            title: "Figma Pro Subscription",
            date: "2025-01-10",
            category: "Software",
            description: "Annual design software subscription",
            amount: 150.00,
            status: "approved",
          },
          {
            id: 4,
            title: "Uber to Airport",
            date: "2025-01-09",
            category: "Transportation",
            description: "Transportation to airport for business trip",
            amount: 45.25,
            status: "pending",
          },
          {
            id: 5,
            title: "Office Supplies",
            date: "2025-01-08",
            category: "Office Supplies",
            description: "Notebooks, pens, and sticky notes",
            amount: 67.80,
            status: "rejected",
          },
          {
            id: 6,
            title: "Conference Registration",
            date: "2025-01-07",
            category: "Education",
            description: "Professional development conference",
            amount: 299.00,
            status: "approved",
          },
          {
            id: 7,
            title: "Client Dinner",
            date: "2025-01-06",
            category: "Meals",
            description: "Business dinner with potential client",
            amount: 156.75,
            status: "pending",
          },
          {
            id: 8,
            title: "Parking Fee",
            date: "2025-01-05",
            category: "Transportation",
            description: "Downtown parking for client meeting",
            amount: 25.00,
            status: "approved",
          },
        ]);
      } finally {
        setLoading(false);
        console.log("[ExpenseListPage] Loading process completed");
      }
    };

    loadExpenses();
  }, []);

  // Filter expenses based on search and filters
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = 
      expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || expense.status === selectedStatus;
    const matchesCategory = selectedCategory === "all" || 
      expense.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Calculate summary stats
  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const approvedAmount = filteredExpenses
    .filter(expense => expense.status === 'approved')
    .reduce((sum, expense) => sum + expense.amount, 0);
  const pendingAmount = filteredExpenses
    .filter(expense => expense.status === 'pending')
    .reduce((sum, expense) => sum + expense.amount, 0);

  const handleEditExpense = (expense) => {
    console.log("Edit expense:", expense);
    // Navigate to edit page
    navigate(`/expenses/edit/${expense.id}`);
  };

  const handleDeleteExpense = (expenseId) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      setExpenses(prev => prev.filter(expense => expense.id !== expenseId));
    }
  };

  const categories = ["all", "travel", "meals", "software", "transportation", "office supplies", "education"];
  const statuses = ["all", "pending", "approved", "rejected"];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Icons.XIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  My Expenses
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage and track all your submitted expenses
                </p>
              </div>
            </div>
            <Link to="/expenses/new" className="btn-primary">
              <Icons.ExpenseIcon className="w-4 h-4 mr-2" />
              New Expense
            </Link>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Amount</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(totalAmount)}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400">Approved</div>
              <div className="text-xl font-bold text-green-600">
                {formatCurrency(approvedAmount)}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
              <div className="text-xl font-bold text-yellow-600">
                {formatCurrency(pendingAmount)}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Count</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {filteredExpenses.length}
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border dark:border-gray-700 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field w-full"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="input-field"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Expenses List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700">
          <div className="p-6 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold dark:text-white">
              Expenses ({filteredExpenses.length})
            </h2>
          </div>
          <div className="p-6">
            <ExpenseList
              expenses={filteredExpenses}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseListPage;