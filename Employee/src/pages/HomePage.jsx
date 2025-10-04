import { useState, useEffect } from "react";
import ExpenseService from "../api/expenseService";

const HomePage = () => {
  const [stats, setStats] = useState({
    totalExpenses: 0,
    monthlyTotal: 0,
    pendingExpenses: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const expenses = await ExpenseService.getExpenses();

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const monthlyExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate.getMonth() === currentMonth &&
          expenseDate.getFullYear() === currentYear
        );
      });

      const monthlyTotal = monthlyExpenses.reduce(
        (sum, expense) => sum + parseFloat(expense.amount),
        0
      );

      setStats({
        totalExpenses: expenses.length,
        monthlyTotal,
        pendingExpenses: expenses.filter(
          (expense) => expense.status === "pending"
        ).length,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to your expense management dashboard
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Expenses</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {stats.totalExpenses}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">This Month</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ${stats.monthlyTotal.toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Pending</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">
            {stats.pendingExpenses}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="/expenses"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h4 className="font-medium text-gray-900">View All Expenses</h4>
            <p className="text-sm text-gray-600">Manage your expense records</p>
          </a>

          <a
            href="/expenses/new"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h4 className="font-medium text-gray-900">Add New Expense</h4>
            <p className="text-sm text-gray-600">Submit a new expense report</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
