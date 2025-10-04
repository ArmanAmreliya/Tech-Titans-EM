import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  FaFileInvoiceDollar,
  FaSearch,
  FaFilter,
  FaCheck,
  FaTimes,
  FaEye,
  FaDownload,
} from "react-icons/fa";
import {
  fetchAllExpenses,
  overrideExpenseApproval,
  setExpenseStatusFilter,
  setExpenseDateRangeFilter,
} from "../../store/adminSlice";
import AllExpensesTable from "../../components/features/admin/AllExpensesTable";

const AllExpensesPage = () => {
  const dispatch = useDispatch();
  const { expenses, loading, error, filters } = useSelector(
    (state) => state.admin
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [overrideReason, setOverrideReason] = useState("");
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [overrideAction, setOverrideAction] = useState("approve");

  useEffect(() => {
    dispatch(fetchAllExpenses());
  }, [dispatch]);

  useEffect(() => {
    if (error.expenses) {
      toast.error(error.expenses);
    }
  }, [error.expenses]);

  const handleOverrideExpense = (expense, action) => {
    setSelectedExpense(expense);
    setOverrideAction(action);
    setOverrideReason("");
    setShowOverrideModal(true);
  };

  const confirmOverride = async () => {
    if (!overrideReason.trim()) {
      toast.error("Please provide a reason for the override");
      return;
    }

    try {
      await dispatch(
        overrideExpenseApproval({
          expenseId: selectedExpense.id,
          action: overrideAction,
          reason: overrideReason,
        })
      ).unwrap();

      setShowOverrideModal(false);
      setSelectedExpense(null);
      setOverrideReason("");
      toast.success(`Expense ${overrideAction}d successfully!`);
    } catch (error) {
      toast.error("Failed to override expense approval");
    }
  };

  const handleStatusFilterChange = (status) => {
    dispatch(setExpenseStatusFilter(status));
  };

  const handleDateRangeChange = (range) => {
    dispatch(setExpenseDateRangeFilter(range));
  };

  const handleExportExpenses = () => {
    // In a real app, this would generate and download a CSV/Excel file
    toast.success("Expense report exported successfully!");
  };

  // Filter expenses based on search and filters
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filters.expenseStatus === "all" ||
      expense.status.toLowerCase() === filters.expenseStatus.toLowerCase();

    let matchesDateRange = true;
    if (filters.expenseDateRange.start && filters.expenseDateRange.end) {
      const expenseDate = new Date(expense.date);
      const startDate = new Date(filters.expenseDateRange.start);
      const endDate = new Date(filters.expenseDateRange.end);
      matchesDateRange = expenseDate >= startDate && expenseDate <= endDate;
    }

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const expenseStats = {
    total: expenses.length,
    pending: expenses.filter((e) => e.status === "Pending").length,
    approved: expenses.filter((e) => e.status === "Approved").length,
    rejected: expenses.filter((e) => e.status === "Rejected").length,
    totalAmount: expenses.reduce((sum, e) => sum + e.amount, 0),
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">All Expenses</h2>
          <p className="mt-1 text-sm text-gray-500">
            Monitor and manage all company expenses with admin override
            capabilities
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={handleExportExpenses}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaDownload className="mr-2 h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaFileInvoiceDollar className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Expenses
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {expenseStats.total}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-6 w-6 rounded-full bg-yellow-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">⏳</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {expenseStats.pending}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaCheck className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Approved
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {expenseStats.approved}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaTimes className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Rejected
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {expenseStats.rejected}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-indigo-600 text-lg font-bold">$</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Amount
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    ${expenseStats.totalAmount.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={filters.expenseStatus}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <input
              type="date"
              value={filters.expenseDateRange.start || ""}
              onChange={(e) =>
                handleDateRangeChange({
                  ...filters.expenseDateRange,
                  start: e.target.value,
                })
              }
              className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Start date"
            />
          </div>

          <div>
            <input
              type="date"
              value={filters.expenseDateRange.end || ""}
              onChange={(e) =>
                handleDateRangeChange({
                  ...filters.expenseDateRange,
                  end: e.target.value,
                })
              }
              className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="End date"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Showing {filteredExpenses.length} of {expenses.length} expenses
          </span>

          <button
            onClick={() => {
              setSearchQuery("");
              handleStatusFilterChange("all");
              handleDateRangeChange({ start: null, end: null });
            }}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Clear all filters
          </button>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white shadow rounded-lg">
        <AllExpensesTable
          expenses={filteredExpenses}
          loading={loading.expenses}
          onOverrideExpense={handleOverrideExpense}
        />
      </div>

      {/* Override Modal */}
      {showOverrideModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div
                    className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${
                      overrideAction === "approve"
                        ? "bg-green-100"
                        : "bg-red-100"
                    } sm:mx-0 sm:h-10 sm:w-10`}
                  >
                    {overrideAction === "approve" ? (
                      <FaCheck className={`h-6 w-6 text-green-600`} />
                    ) : (
                      <FaTimes className={`h-6 w-6 text-red-600`} />
                    )}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {overrideAction === "approve"
                        ? "Override Approve"
                        : "Override Reject"}{" "}
                      Expense
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        You are about to {overrideAction} the expense from{" "}
                        <strong>{selectedExpense?.employeeName}</strong> for{" "}
                        <strong>
                          ${selectedExpense?.amount.toLocaleString()}
                        </strong>
                        .
                      </p>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Reason for override (required):
                        </label>
                        <textarea
                          value={overrideReason}
                          onChange={(e) => setOverrideReason(e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Please provide a reason for this administrative override..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={confirmOverride}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
                    overrideAction === "approve"
                      ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                      : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                  }`}
                >
                  Confirm{" "}
                  {overrideAction === "approve" ? "Approval" : "Rejection"}
                </button>
                <button
                  onClick={() => setShowOverrideModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllExpensesPage;
